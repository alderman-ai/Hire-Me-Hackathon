"""Task 9: the one-time Google sign-in. Run it once, with client_secret.json in rig\\.

It opens the browser for the sign-in, keeps the result in rig\\.env, and prints the
channel name so you can confirm it's the right one. Tokens are never printed.
"""
import json
import sys

import obs_client as oc
import upload

SECRET_FILE = oc.RIG / "client_secret.json"


def main() -> int:
    from google_auth_oauthlib.flow import InstalledAppFlow

    if not SECRET_FILE.exists():
        print(f"Put the downloaded file here first: {SECRET_FILE}")
        return 1
    flow = InstalledAppFlow.from_client_secrets_file(str(SECRET_FILE), scopes=upload.SCOPES)
    credentials = flow.run_local_server(
        port=0, prompt="select_account consent", access_type="offline",
        success_message="Signed in. You can close this tab.",
    )
    client = json.loads(SECRET_FILE.read_text(encoding="utf-8"))["installed"]
    oc.write_env_value("YOUTUBE_CLIENT_ID", client["client_id"])
    oc.write_env_value("YOUTUBE_CLIENT_SECRET", client["client_secret"])
    oc.write_env_value("YOUTUBE_REFRESH_TOKEN", credentials.refresh_token)

    channels = upload.service().channels().list(part="snippet", mine=True).execute()
    items = channels.get("items", [])
    if not items:
        print("Signed in, but that account has no YouTube channel, so uploads will fail. "
              "Run this again and pick the account or channel you upload to.")
        return 1
    for channel in items:
        print(f"Signed in. Uploads will go to the channel: {channel['snippet']['title']}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
