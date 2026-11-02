"""Task 8: /process. Join, transcribe, upload and file every finished session.

rig.py launches this detached, so a long upload can't tie up the control session. Each
step is recorded in session.json when it finishes, so a rerun picks up at the first
unfinished step and never repeats an upload (R19). A voice says when it's done.
"""
import json
import logging
import os
import re
import shutil
import subprocess
import sys
import time
from datetime import datetime
from pathlib import Path

import numpy as np

import clock
import obs_client as oc
import rig_state as rs
import upload
from controller import alert
from cuda_env import add_cuda_libs

MODEL = "large-v3-turbo"  # 29x real time. large-v3 managed 4.2x, under the 5x needed.
COMPUTE = "float16"
PID_FILE = rs.RUN / "process.pid"
STATUS_FILE = rs.RUN / "process_status.txt"
REPORT_FILE = rs.RUN / "process_report.md"
LOG_FILE = rs.RUN / "process.log"
FFPROBE = oc.FFMPEG.with_name("ffprobe.exe")
MIC_TRACK = 1  # OBS track 2, counted from 0.
PARAGRAPH_GAP = 2.0
PARAGRAPH_SECONDS = 60.0
ALIGN_SECONDS = 60
ALIGN_SEARCH = 15
ALIGN_TRIM = 3  # The recorders outlast OBS at both ends, so match on the file's middle.
ALIGN_RATE = 8000
ALIGN_MIN_SCORE = 0.15
MIN_GAP_TO_PATCH = 1.0
# 2 Nov 2026: YouTube hadn't allowed long uploads yet, so Alex chose to keep sessions on D:
# only. Sessions are filed without a YouTube link. Set True to upload again.
UPLOAD_TO_YOUTUBE = False

report: list[str] = []
model_cache = {}


def say(line: str) -> None:
    logging.info(line)
    STATUS_FILE.write_text(line, encoding="utf-8")


def ffmpeg(*args: str) -> None:
    subprocess.run(
        [str(oc.FFMPEG), "-hide_banner", "-loglevel", "error", "-y", *args],
        check=True, capture_output=True, creationflags=oc.NO_WINDOW,
    )


def seconds(path: Path) -> float:
    """A file's length. Files cut off by a crash store none, so decode those."""
    out = subprocess.run(
        [str(FFPROBE), "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0",
         "--", str(path)],
        capture_output=True, text=True, creationflags=oc.NO_WINDOW,
    ).stdout.strip()
    try:
        return float(out)
    except ValueError:
        pass
    decoded = subprocess.run(
        [str(oc.FFMPEG), "-v", "quiet", "-nostats", "-i", str(path), "-f", "null", "-",
         "-progress", "pipe:1"],
        capture_output=True, text=True, creationflags=oc.NO_WINDOW,
    )
    times = re.findall(r"out_time_us=(\d+)", decoded.stdout)
    return int(times[-1]) / 1e6 if times else 0.0


def whisper():
    if "model" not in model_cache:
        add_cuda_libs()
        from faster_whisper import WhisperModel

        model_cache["model"] = WhisperModel(
            MODEL, device="cuda", compute_type=COMPUTE, download_root=str(oc.RIG / "models")
        )
    return model_cache["model"]


def transcribe_file(path: Path) -> list[dict]:
    segments, _ = whisper().transcribe(
        str(path), language="en", word_timestamps=True, vad_filter=True,
        condition_on_previous_text=False, hallucination_silence_threshold=2.0,
    )
    lines = []
    for s in segments:
        lines += split_at_pauses({
            "start": round(s.start, 3),
            "end": round(s.end, 3),
            "text": s.text.strip(),
            "words": [
                {"word": w.word.strip(), "start": round(w.start, 3), "end": round(w.end, 3)}
                for w in (s.words or [])
            ],
        })
    return lines


def split_at_pauses(line: dict) -> list[dict]:
    """Whisper can join words from either side of a long silence into one line.

    In S06, one line ran 96 s across 87 s of typing, so the transcript put words said at
    3:00 at 1:30. Start a new line wherever the words stop for over PARAGRAPH_GAP.
    """
    words = line["words"]
    parts = [words[:1]] if words else []
    for word in words[1:]:
        if word["start"] - parts[-1][-1]["end"] > PARAGRAPH_GAP:
            parts.append([])
        parts[-1].append(word)
    if len(parts) < 2:
        return [line]
    return [
        {"start": part[0]["start"], "end": part[-1]["end"],
         "text": " ".join(w["word"] for w in part), "words": part}
        for part in parts
    ]


def wait_for_gpu(name: str) -> None:
    """R14: never start GPU transcription while a session is recording."""
    if rs.controller_pid():
        report.append(f"- {name}: transcription waited for the current recording to stop.")
    while rs.controller_pid():
        say(f"{name}: waiting for the recording to stop before transcribing")
        time.sleep(15)


def alignment(track: np.ndarray, reference: np.ndarray) -> tuple[int, float]:
    """Find where track sits inside reference. Returns the offset and a 0-1 score."""
    size = len(track) + len(reference)
    a = np.fft.rfft(reference - reference.mean(), size)
    b = np.fft.rfft(track - track.mean(), size)
    correlation = np.fft.irfft(a * np.conj(b), size)
    usable = correlation[: max(len(reference) - len(track), 1)]
    offset = int(np.argmax(np.abs(usable)))
    norm = np.linalg.norm(track) * np.linalg.norm(reference[offset: offset + len(track)])
    return offset, float(abs(usable[offset]) / norm) if norm else 0.0


def pcm(path: Path, start: float, length: float, map_arg: str) -> np.ndarray:
    raw = subprocess.run(
        [str(oc.FFMPEG), "-hide_banner", "-loglevel", "quiet", "-ss", f"{max(start, 0):.3f}",
         "-t", f"{length:.3f}", "-i", str(path), "-map", map_arg, "-ac", "1",
         "-ar", str(ALIGN_RATE), "-f", "f32le", "-"],
        capture_output=True, creationflags=oc.NO_WINDOW,
    ).stdout
    return np.frombuffer(raw, dtype=np.float32)


class Job:
    def __init__(self, record: Path):
        self.record = record
        self.session = rs.load_json(record)
        self.id = self.session["id"]
        self.folder = self.session["folder"]
        self.video_dir = rs.TO_PROCESS / self.folder
        self.data_dir = record.parent
        self.video = self.video_dir / f"{self.id}.mp4"
        self.final_video = rs.UPLOADED / f"{self.id}.mp4"
        self.webcam_dir = self.video_dir / "webcam"
        self.final_webcam = rs.UPLOADED / f"{self.id}_webcam"
        self.transcript_dir = self.data_dir / "transcript"
        self.audio_dir = self.data_dir / "audio"
        self.mic = self.audio_dir / f"{self.id}_mic.m4a"

    def save(self) -> None:
        rs.save_json(self.record, self.session)

    @property
    def timeline(self) -> list[dict]:
        return self.session["clock_map"]

    @property
    def start(self) -> float:
        return self.timeline[0]["wall_start"]

    @property
    def end(self) -> float:
        return self.timeline[-1]["wall_end"]

    @property
    def h0(self) -> float:
        return self.session["hackathon_start"]

    def h(self, video: float) -> str:
        return clock.hackathon(clock.video_to_wall(self.timeline, video), self.h0)

    # Steps

    def join(self) -> None:
        """R21: one session video, with no re-encoding."""
        parts = sorted(self.video_dir.glob("20*.mp4"))
        if not parts:
            raise RuntimeError(f"no OBS files in {self.video_dir}")
        lengths = [seconds(p) for p in parts]
        listing = self.video_dir / "join.txt"
        listing.write_text(
            "".join("file '{}'\n".format(p.as_posix().replace("'", r"'\''")) for p in parts),
            encoding="utf-8",
        )
        partial = self.video_dir / f"{self.id}.partial.mp4"
        ffmpeg("-f", "concat", "-safe", "0", "-i", str(listing), "-map", "0", "-c", "copy",
               str(partial))
        joined, total = seconds(partial), sum(lengths)
        if abs(joined - total) > 2:
            raise RuntimeError(f"join came to {joined:.1f} s from {total:.1f} s of parts")
        partial.replace(self.video)
        listing.unlink()
        self.session["files"] = [
            {"name": p.name, "seconds": round(s, 3)} for p, s in zip(parts, lengths)
        ]
        self.session["video_seconds"] = round(joined, 3)
        self.session["clock_map"] = clock.build_map(
            self.session["spans"], list(zip(parts, lengths))
        )

    def audio(self) -> None:
        """R15: the transcript comes from the video's own mic track, so times can't drift."""
        self.audio_dir.mkdir(exist_ok=True)
        ffmpeg("-i", str(self.video), "-map", f"0:a:{MIC_TRACK}", "-c", "copy", str(self.mic))

    def transcribe(self) -> None:
        wait_for_gpu(self.id)
        started = time.monotonic()
        lines = transcribe_file(self.mic)
        took = time.monotonic() - started
        self.transcript_dir.mkdir(exist_ok=True)
        rs.save_json(self.transcript_dir / f"{self.id}.json", lines)
        (self.transcript_dir / f"{self.id}.srt").write_text(self.srt(lines), encoding="utf-8")
        (self.transcript_dir / f"{self.id}.md").write_text(self.markdown(lines), encoding="utf-8")
        speed = self.session["video_seconds"] / took if took else 0
        report.append(f"- {self.id}: transcribed at {speed:.1f}x real time.")

    def srt(self, lines: list[dict]) -> str:
        blocks = []
        for number, line in enumerate(lines, 1):
            span = (f"{clock.timecode(line['start'], True)} --> "
                    f"{clock.timecode(line['end'], True)}")
            blocks.append(f"{number}\n{span}\n{line['text']}\n")
        return "\n".join(blocks)

    def markdown(self, lines: list[dict]) -> str:
        """Timestamped paragraphs, broken at pauses in speech or after a minute."""
        out = [f"# {self.id}\n"]
        paragraph, started = [], None
        previous_end = 0.0

        def flush():
            if paragraph:
                out.append(f"**{self.h(started)}** ({clock.timecode(started)}) "
                           + " ".join(paragraph) + "\n")

        for line in lines:
            pause = line["start"] - previous_end > PARAGRAPH_GAP
            long = started is not None and line["start"] - started > PARAGRAPH_SECONDS
            if paragraph and (pause or long):
                flush()
                paragraph, started = [], None
            if started is None:
                started = line["start"]
            paragraph.append(line["text"])
            previous_end = line["end"]
        flush()
        return "\n".join(out)

    def patch_gaps(self) -> None:
        """R15: fill OBS crash gaps from the backup. These lines have no video to link to."""
        patches = []
        entries = self.timeline
        for before, after in zip(entries, entries[1:]):
            gap_start, gap_end = before["wall_end"], after["wall_start"]
            if before["ended_by"] != "crash" or gap_end - gap_start < MIN_GAP_TO_PATCH:
                continue
            for flac in sorted((self.data_dir / "audio-backup").glob("backup_*.flac")):
                found = re.search(r"(\d{8})_(\d{6})", flac.name)
                begins = datetime.strptime(found[0], "%Y%m%d_%H%M%S").timestamp()
                length = seconds(flac)
                start = max(gap_start, begins)
                stop = min(gap_end, begins + length)
                if stop - start < MIN_GAP_TO_PATCH:
                    continue
                clip = self.audio_dir / f"gap_{int(start)}.wav"
                ffmpeg("-ss", f"{start - begins:.3f}", "-t", f"{stop - start:.3f}",
                       "-i", str(flac), "-ac", "1", "-ar", "16000", str(clip))
                wait_for_gpu(self.id)
                for line in transcribe_file(clip):
                    patches.append({**line, "wall_offset": start})
                clip.unlink()
        rs.save_json(self.transcript_dir / f"{self.id}_backup.json", patches)
        if patches:
            report.append(f"- {self.id}: {len(patches)} lines came from the backup audio.")

    def claude_logs(self) -> None:
        """R17: logs active during the session, leaving out the OBS control session.

        The skills live in OBS\\.claude, so the control session runs from OBS or OBS\\rig.
        """
        target = self.data_dir / "claude-code"
        root = Path.home() / ".claude" / "projects"
        copied = 0
        for project in root.iterdir():
            if not project.is_dir() or project.name.endswith(("-OBS", "-OBS-rig")):
                continue
            for log in project.rglob("*.jsonl"):
                info = log.stat()
                if info.st_mtime >= self.start and info.st_ctime <= self.end:
                    destination = target / project.name / log.relative_to(project)
                    destination.parent.mkdir(parents=True, exist_ok=True)
                    shutil.copy2(log, destination)
                    copied += 1
        report.append(f"- {self.id}: copied {copied} Claude Code logs.")

    def webcam(self) -> None:
        """R28: pin each webcam file to the wall clock using its Wave:3 audio."""
        entries = []
        for path in sorted(self.webcam_dir.glob("webcam_*.mkv")):
            found = re.search(r"(\d{8})_(\d{6})", path.name)
            named = datetime.strptime(found[0], "%Y%m%d_%H%M%S").timestamp()
            length = seconds(path)
            entry = {"name": path.name, "seconds": round(length, 3), "wall_start": named,
                     "aligned": False, "score": 0.0}
            video_at = clock.wall_to_video(self.timeline, named + ALIGN_SEARCH / 3)
            if video_at is not None and length > 2 * ALIGN_TRIM + 2:
                sample = min(ALIGN_SECONDS, length - 2 * ALIGN_TRIM)
                track = pcm(path, ALIGN_TRIM, sample, "0:a:0")
                reference = pcm(self.video, video_at - ALIGN_SEARCH, sample + 2 * ALIGN_SEARCH,
                                f"0:a:{MIC_TRACK}")
                if len(track) and len(reference) > len(track):
                    offset, score = alignment(track, reference)
                    entry["score"] = round(score, 3)
                    if score >= ALIGN_MIN_SCORE:
                        reference_start = max(video_at - ALIGN_SEARCH, 0)
                        wall = clock.video_to_wall(
                            self.timeline, reference_start + offset / ALIGN_RATE
                        )
                        entry.update(wall_start=round(wall - ALIGN_TRIM, 3), aligned=True)
            entries.append(entry)
        self.session["webcam"] = entries
        rough = sum(not e["aligned"] for e in entries)
        if rough:
            report.append(f"- {self.id}: {rough} of {len(entries)} webcam files are aligned "
                          "only to the nearest second.")

    def title(self) -> str:
        first = self.h(0)[:7]
        last = self.h(self.session["video_seconds"])[:7]
        return f"Hackathon {self.id} · {first}–{last}"

    def send(self) -> None:
        last = {"percent": -10}

        def progress(fraction: float) -> None:
            percent = int(fraction * 100)
            if percent >= last["percent"] + 10:
                last["percent"] = percent
                say(f"{self.id}: uploading, {percent}% done")

        self.session["youtube_id"] = upload.upload_video(
            self.video, self.title(), f"Raw footage, session {self.id}.", progress
        )

    def verify(self) -> None:
        """R26: the video only moves once YouTube has all of it."""
        self.session["youtube_seconds"] = upload.wait_until_ready(
            self.session["youtube_id"], self.session["video_seconds"],
            lambda state: say(f"{self.id}: YouTube is processing ({state})"),
        )

    def move(self) -> None:
        """R26: leave nothing behind in To process."""
        rs.UPLOADED.mkdir(parents=True, exist_ok=True)
        shutil.move(str(self.video), str(self.final_video))
        if self.webcam_dir.exists():
            shutil.move(str(self.webcam_dir), str(self.final_webcam))
        for name in self.session["files"]:
            (self.video_dir / name["name"]).unlink(missing_ok=True)
        self.video_dir.rmdir()

    def file(self) -> None:
        """Write the manifest and this session's searchable lines."""
        final_dir = rs.PROCESSED / self.folder
        rs.PROCESSED.mkdir(parents=True, exist_ok=True)
        self.session["state"] = "filed"
        self.save()
        self.data_dir.rename(final_dir)
        self.data_dir = final_dir
        self.record = final_dir / "session.json"
        self.transcript_dir = final_dir / "transcript"

        entries = self.timeline
        total = self.session["video_seconds"]
        moment = lambda video: {  # noqa: E731
            "video": round(video, 3),
            "wall": rs.stamp(clock.video_to_wall(entries, video)),
            "hackathon": self.h(video),
        }
        breaks = [
            {
                "kind": "crash" if before["ended_by"] == "crash" else "pause",
                "video_offset": before["video_end"],
                "wall_start": rs.stamp(before["wall_end"]),
                "wall_end": rs.stamp(after["wall_start"]),
                "seconds": round(after["wall_start"] - before["wall_end"], 1),
            }
            for before, after in zip(entries, entries[1:])
        ]
        rs.save_json(final_dir / "manifest.json", {
            "id": self.id,
            "folder": self.folder,
            "start": moment(0),
            "end": moment(total),
            "video_seconds": total,
            "pauses": [b for b in breaks if b["kind"] == "pause"],
            "gaps": breaks and [b for b in breaks if b["kind"] == "crash"],
            "recorder_gaps": self.session["gaps"],
            "clock_map": entries,
            "files": self.session["files"],
            "video": str(self.final_video),
            "webcam_folder": str(self.final_webcam),
            "webcam": self.session.get("webcam", []),
            "transcript": {
                kind: str(self.transcript_dir / f"{self.id}.{kind}")
                for kind in ("json", "srt", "md")
            },
            "youtube_id": self.session.get("youtube_id"),
            "hackathon_start": self.h0,
        })

        lines = []
        youtube = self.session.get("youtube_id")
        for number, line in enumerate(rs.load_json(self.transcript_dir / f"{self.id}.json"), 1):
            lines.append(self.line(f"{self.id}-{number:04d}", line, youtube))
        backup = rs.load_json(self.transcript_dir / f"{self.id}_backup.json", [])
        for number, line in enumerate(backup, 1):
            lines.append(self.backup_line(f"{self.id}-B{number:03d}", line))
        with (final_dir / "segments.jsonl").open("w", encoding="utf-8") as out:
            for line in lines:
                out.write(json.dumps(line, ensure_ascii=False) + "\n")

    def line(self, segment_id: str, line: dict, youtube: str | None) -> dict:
        entries = self.timeline
        start, end = line["start"], line["end"]
        return {
            "segment_id": segment_id, "session": self.id, "source": "video",
            "youtube_id": youtube, "video_path": str(self.final_video),
            "video_start": start, "video_end": end,
            "wall_start": rs.stamp(clock.video_to_wall(entries, start)),
            "wall_end": rs.stamp(clock.video_to_wall(entries, end)),
            "hackathon_start": self.h(start), "hackathon_end": self.h(end),
            "text": line["text"], "words": line["words"],
        }

    def backup_line(self, segment_id: str, line: dict) -> dict:
        wall_start = line["wall_offset"] + line["start"]
        wall_end = line["wall_offset"] + line["end"]
        return {
            "segment_id": segment_id, "session": self.id, "source": "backup",
            "youtube_id": None, "video_path": None, "video_start": None, "video_end": None,
            "wall_start": rs.stamp(wall_start), "wall_end": rs.stamp(wall_end),
            "hackathon_start": clock.hackathon(wall_start, self.h0),
            "hackathon_end": clock.hackathon(wall_end, self.h0),
            "text": line["text"], "words": line["words"],
        }

    def steps(self):
        steps = [
            ("join", self.join), ("audio", self.audio), ("transcribe", self.transcribe),
            ("patch_gaps", self.patch_gaps), ("claude_logs", self.claude_logs),
            ("webcam", self.webcam), ("upload", self.send), ("verify", self.verify),
            ("move", self.move), ("file", self.file),
        ]
        if not UPLOAD_TO_YOUTUBE:
            steps = [s for s in steps if s[0] not in ("upload", "verify")]
        return steps

    def run(self) -> bool:
        for name, step in self.steps():
            if name in self.session["steps"]:
                continue
            say(f"{self.id}: {name}")
            step()
            self.session["steps"][name] = rs.stamp(time.time())
            self.save()
        if "upload" not in self.session["steps"]:
            report.append(f"- {self.id}: kept on D: only, not uploaded to YouTube.")
        return True


def write_indexes() -> None:
    """R18: rebuilt from the session folders, so a rerun gives the same files."""
    manifests = [rs.load_json(p) for p in sorted(rs.PROCESSED.glob("S*/manifest.json"))]
    with (rs.PROCESSED / "segments.jsonl").open("w", encoding="utf-8") as out:
        for path in sorted(rs.PROCESSED.glob("S*/segments.jsonl")):
            out.write(path.read_text(encoding="utf-8"))
    index = [
        {
            "id": m["id"], "folder": m["folder"], "start": m["start"], "end": m["end"],
            "video_seconds": m["video_seconds"], "video": m["video"],
            "youtube_id": m["youtube_id"],
            "youtube_url": f"https://youtu.be/{m['youtube_id']}" if m["youtube_id"] else None,
            "transcript": m["transcript"],
        }
        for m in manifests
    ]
    rs.save_json(rs.PROCESSED / "index.json", index)
    rows = ["# Sessions\n", "| Session | Starts | Ends | Minutes | YouTube | Transcript |",
            "| --- | --- | --- | --- | --- | --- |"]
    for entry in index:
        link = f"[watch]({entry['youtube_url']})" if entry["youtube_url"] else "not uploaded"
        rows.append(
            f"| {entry['id']} | {entry['start']['hackathon']} | {entry['end']['hackathon']} | "
            f"{entry['video_seconds'] / 60:.0f} | {link} | {entry['transcript']['md']} |"
        )
    (rs.PROCESSED / "index.md").write_text("\n".join(rows) + "\n", encoding="utf-8")


def pending() -> list[Path]:
    records = []
    for path in sorted(rs.LIVE.glob("S*/session.json")):
        session = rs.load_json(path)
        if session["state"] in ("stopped", "failed") and session["spans"]:
            records.append(path)
    return records


def main() -> int:
    """Launch the detached worker, or say what it's doing."""
    pid = None
    try:
        pid = int(PID_FILE.read_text(encoding="utf-8"))
    except (FileNotFoundError, ValueError):
        pass
    if pid and rs.pid_alive(pid):
        status = STATUS_FILE.read_text(encoding="utf-8") if STATUS_FILE.exists() else ""
        print(f"Already processing. {status}")
        return 0
    waiting = pending()
    if not waiting:
        print("Nothing to process.")
        return 0
    rs.RUN.mkdir(parents=True, exist_ok=True)
    pythonw = Path(sys.executable).with_name("pythonw.exe")
    subprocess.Popen(
        [str(pythonw), str(Path(__file__).resolve()), "--worker"],
        creationflags=0x00000008 | 0x00000200,  # Detached, in its own process group.
        stdin=subprocess.DEVNULL, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
        cwd=str(Path(__file__).resolve().parent), close_fds=True,
    )
    names = ", ".join(rs.load_json(p)["id"] for p in waiting)
    print(f"Processing {names} in the background. A voice will tell you when it's finished.")
    return 0


def worker() -> int:
    rs.RUN.mkdir(parents=True, exist_ok=True)
    logging.basicConfig(
        filename=LOG_FILE, level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s"
    )
    PID_FILE.write_text(str(os.getpid()), encoding="utf-8")
    finished, problems = [], 0
    tried = set()
    try:
        while True:
            waiting = [p for p in pending() if p.parent.name not in tried]
            if not waiting:
                break
            record = waiting[0]
            tried.add(record.parent.name)
            job = Job(record)
            try:
                job.run()
                finished.append(job.id)
            except upload.NotSetUp as error:
                problems += 1
                report.append(f"- {job.id}: stopped before upload. {error}.")
            except Exception as error:
                problems += 1
                logging.exception("%s failed", job.id)
                report.append(f"- {job.id}: stopped with an error: {error}")
        if rs.PROCESSED.exists():
            write_indexes()
        names = ", ".join(finished) or "nothing"
        REPORT_FILE.write_text(
            f"# Process report\n\nFinished: {names}\n\n" + "\n".join(report) + "\n",
            encoding="utf-8",
        )
        say(f"Finished: {names}")
        alert("Processing finished." if not problems else "Processing finished with problems.")
        return 0 if not problems else 1
    finally:
        PID_FILE.unlink(missing_ok=True)


if __name__ == "__main__":
    sys.exit(worker() if "--worker" in sys.argv else main())
