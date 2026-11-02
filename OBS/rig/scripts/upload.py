"""Task 9: resumable, unlisted YouTube upload, then confirmation that it arrived whole."""
import re
import time
from pathlib import Path

import rig_state as rs
from obs_client import read_env

SCOPES = [
    "https://www.googleapis.com/auth/youtube.upload",
    "https://www.googleapis.com/auth/youtube.readonly",
]
TOKEN_URI = "https://oauth2.googleapis.com/token"
CHUNK = 16 * 1024 * 1024
# While a session records, stay well under the measured 42 MB/s.
RECORDING_BYTES_PER_SECOND = 10 * 1024 * 1024
PROCESSING_LIMIT = 4 * 3600
POLL_EVERY = 30


class NotSetUp(Exception):
    """The Google sign-in hasn't been done yet."""


def service():
    from google.oauth2.credentials import Credentials
    from googleapiclient.discovery import build

    env = read_env()
    needed = ("YOUTUBE_CLIENT_ID", "YOUTUBE_CLIENT_SECRET", "YOUTUBE_REFRESH_TOKEN")
    if not all(env.get(key) for key in needed):
        raise NotSetUp("YouTube sign-in isn't set up yet")
    credentials = Credentials(
        None,
        refresh_token=env["YOUTUBE_REFRESH_TOKEN"],
        client_id=env["YOUTUBE_CLIENT_ID"],
        client_secret=env["YOUTUBE_CLIENT_SECRET"],
        token_uri=TOKEN_URI,
        scopes=SCOPES,
    )
    return build("youtube", "v3", credentials=credentials, cache_discovery=False)


def upload_video(path: Path, title: str, description: str, progress=lambda _: None) -> str:
    from googleapiclient.errors import HttpError
    from googleapiclient.http import MediaFileUpload

    media = MediaFileUpload(str(path), mimetype="video/mp4", chunksize=CHUNK, resumable=True)
    request = service().videos().insert(
        part="snippet,status",
        body={
            "snippet": {"title": title[:100], "description": description, "categoryId": "28"},
            "status": {"privacyStatus": "unlisted", "selfDeclaredMadeForKids": False},
        },
        media_body=media,
    )
    response = None
    failures = 0
    while response is None:
        began = time.monotonic()
        try:
            status, response = request.next_chunk()
            failures = 0
        except (HttpError, OSError) as error:
            transient = not isinstance(error, HttpError) or error.resp.status >= 500
            failures += 1
            if not transient or failures > 8:
                raise
            time.sleep(min(2**failures, 60))
            continue
        if status:
            progress(status.progress())
        if rs.controller_pid():
            spare = CHUNK / RECORDING_BYTES_PER_SECOND - (time.monotonic() - began)
            if spare > 0:
                time.sleep(spare)
    return response["id"]


def _seconds(iso: str) -> float:
    """YouTube durations look like PT1H15M3S, and P0D while a new upload processes."""
    found = re.fullmatch(r"P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?", iso)
    if not found:
        raise ValueError(f"YouTube gave a duration the rig can't read: {iso!r}")
    days, hours, minutes, seconds = (int(v or 0) for v in found.groups())
    return days * 86400 + hours * 3600 + minutes * 60 + seconds


def wait_until_ready(video_id: str, local_seconds: float, progress=lambda _: None) -> float:
    """Return YouTube's duration once processing is done and it matches the local file."""
    client = service()
    deadline = time.monotonic() + PROCESSING_LIMIT
    while time.monotonic() < deadline:
        items = client.videos().list(
            part="status,contentDetails,processingDetails", id=video_id
        ).execute()["items"]
        if not items:
            raise RuntimeError(f"YouTube can't find video {video_id}")
        item = items[0]
        state = item["status"].get("uploadStatus")
        if state in ("failed", "rejected", "deleted"):
            raise RuntimeError(f"YouTube says {state} for {video_id}")
        finished = item.get("processingDetails", {}).get("processingStatus") == "succeeded"
        online = _seconds(item["contentDetails"].get("duration", "PT0S"))
        if state == "processed" and (finished or online > 0):
            # YouTube reports whole seconds, rounded down, so allow for that.
            if abs(online - local_seconds) <= 1.5:
                return online
            raise RuntimeError(
                f"YouTube has {online:.0f} s and the local file has {local_seconds:.0f} s"
            )
        progress(state or "waiting")
        time.sleep(POLL_EVERY)
    raise TimeoutError(f"YouTube was still processing {video_id} after 4 hours")
