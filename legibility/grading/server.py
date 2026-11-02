"""Blind grading booth for the rig's video moments.

Serves index.html, the clips and a tiny append-only grades API on 127.0.0.1.
The page only ever sees order, id, prague, group and clip for each moment.

    python -I server.py [--port 8765] [--open] [--grades PATH] [--moments PATH] [--clips DIR]

grades.jsonl is append-only, one JSON object per line:
    {"action": "grade", "id", "grade": "Y"|"M"|"N", "note", "watched", "speed", "ts", "cid"}
    {"action": "undo", "ts", "cid", "undid"}
An undo removes the most recent grade still standing; a later grade of the same id replaces
an earlier one (the same replay as grades_lib.py). "cid" is the page's id for the action, so a
retried request is never written twice. The file is never rewritten or truncated.
"""
import argparse
import json
import os
import re
import sys
import threading
import time
import webbrowser
from datetime import datetime
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit

HERE = Path(__file__).resolve().parent
BLIND_FIELDS = ("order", "id", "prague", "group", "clip")
GRADES_OK = ("Y", "M", "N")
CLIP_RE = re.compile(r"^/clips/([A-Za-z0-9][A-Za-z0-9_.-]{0,80})\.mp4$")
FRESH_SECONDS = 3.0      # a clip modified this recently is still being written: report it missing
CHUNK = 256 * 1024
MAX_BODY = 64 * 1024


class Store:
    """The moments list and the grades log, guarded by one lock."""

    def __init__(self, moments_path: Path, grades_path: Path, clips_dir: Path):
        self.moments_path = moments_path
        self.grades_path = grades_path
        self.clips_dir = clips_dir.resolve()
        self.lock = threading.Lock()
        self._moments = None
        self._moments_mtime = None

    # ---------- moments ----------
    def moments(self) -> list:
        """Reload moments.json whenever it changes on disk (it is built in parallel)."""
        try:
            mtime = self.moments_path.stat().st_mtime
        except FileNotFoundError:
            return []
        if self._moments is None or mtime != self._moments_mtime:
            try:
                data = json.loads(self.moments_path.read_text(encoding="utf-8"))
            except (OSError, ValueError):
                return self._moments or []
            data = sorted(data, key=lambda m: m.get("order", 0))
            self._moments, self._moments_mtime = data, mtime
        return self._moments

    def blind_moments(self) -> list:
        return [{k: m.get(k) for k in BLIND_FIELDS} for m in self.moments()]

    # ---------- grades log ----------
    def _events(self) -> list:
        events = []
        if not self.grades_path.exists():
            return events
        with open(self.grades_path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if not line:
                    continue
                try:
                    events.append(json.loads(line))
                except ValueError:
                    continue
        return events

    @staticmethod
    def _replay(events: list) -> list:
        stack = []
        for ev in events:
            action = ev.get("action", "grade")
            if action == "undo":
                if stack:
                    stack.pop()
            elif action == "grade" and ev.get("grade") in GRADES_OK and ev.get("id"):
                stack.append(ev)
        return stack

    def _append(self, record: dict) -> None:
        line = json.dumps(record, ensure_ascii=False)
        self.grades_path.parent.mkdir(parents=True, exist_ok=True)
        with open(self.grades_path, "ab") as f:
            # Never glue a new record onto a torn last line.
            if f.tell() > 0:
                with open(self.grades_path, "rb") as r:
                    r.seek(-1, os.SEEK_END)
                    if r.read(1) != b"\n":
                        f.write(b"\n")
            f.write(line.encode("utf-8") + b"\n")
            f.flush()
            os.fsync(f.fileno())

    def state(self, events=None) -> dict:
        events = self._events() if events is None else events
        stack = self._replay(events)
        grades = {}
        for ev in stack:
            grades[ev["id"]] = {"grade": ev["grade"], "note": ev.get("note", "")}
        next_order = None
        for m in self.moments():
            if m.get("id") not in grades:
                next_order = m.get("order")
                break
        return {
            "grades": grades,
            "next_order": next_order,
            "history": [{"id": ev["id"], "grade": ev["grade"], "note": ev.get("note", "")} for ev in stack],
            "total": len(self.moments()),
        }

    def grade(self, body: dict) -> dict:
        ids = {m.get("id") for m in self.moments()}
        mid = body.get("id")
        if mid not in ids:
            raise ValueError("unknown moment id")
        grade = body.get("grade")
        if grade not in GRADES_OK:
            raise ValueError("grade must be Y, M or N")
        note = body.get("note") or ""
        if not isinstance(note, str):
            raise ValueError("note must be a string")
        note = note.strip()[:2000]
        watched = _num(body.get("watched"), 0.0)
        speed = _num(body.get("speed"), 1.0)
        cid = str(body.get("cid") or "")[:64]
        with self.lock:
            events = self._events()
            if cid and any(ev.get("cid") == cid for ev in events):
                return {"ok": True, "duplicate": True, "state": self.state(events)}
            record = {
                "action": "grade",
                "id": mid,
                "grade": grade,
                "note": note,
                "watched": round(max(0.0, watched), 2),
                "speed": speed,
                "ts": _now(),
            }
            if cid:
                record["cid"] = cid
            self._append(record)
            events.append(record)
            return {"ok": True, "state": self.state(events)}

    def undo(self, body: dict) -> dict:
        cid = str(body.get("cid") or "")[:64]
        with self.lock:
            events = self._events()
            if cid and any(ev.get("cid") == cid for ev in events):
                return {"ok": True, "duplicate": True, "undid": None, "state": self.state(events)}
            stack = self._replay(events)
            undid = stack[-1]["id"] if stack else None
            record = {"action": "undo", "ts": _now()}
            if cid:
                record["cid"] = cid
            if undid:
                record["undid"] = undid
            self._append(record)
            events.append(record)
            return {"ok": True, "undid": undid, "state": self.state(events)}

    # ---------- clips ----------
    def clip_path(self, name: str):
        """The clip file for /clips/<name>.mp4, or None. Only files directly inside clips/."""
        candidate = (self.clips_dir / f"{name}.mp4").resolve()
        if candidate.parent != self.clips_dir or not candidate.is_file():
            return None
        try:
            if time.time() - candidate.stat().st_mtime < FRESH_SECONDS:
                return None
        except OSError:
            return None
        return candidate


def _num(value, default: float) -> float:
    try:
        v = float(value)
    except (TypeError, ValueError):
        return default
    return v if v == v and abs(v) != float("inf") else default


def _now() -> str:
    return datetime.now().astimezone().isoformat(timespec="milliseconds")


def make_handler(store: Store, index_path: Path):
    class Handler(BaseHTTPRequestHandler):
        server_version = "GradingBooth/1"
        protocol_version = "HTTP/1.1"

        def log_message(self, fmt, *args):  # quiet: no per-request lines
            pass

        def log_error(self, fmt, *args):
            sys.stderr.write("[grading] " + (fmt % args) + "\n")

        # ---------- helpers ----------
        def _send_json(self, obj, status=HTTPStatus.OK):
            data = json.dumps(obj, ensure_ascii=False).encode("utf-8")
            self.send_response(status)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(data)))
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            if self.command != "HEAD":
                self.wfile.write(data)

        def _send_error_text(self, status, text):
            data = (text + "\n").encode("utf-8")
            self.send_response(status)
            self.send_header("Content-Type", "text/plain; charset=utf-8")
            self.send_header("Content-Length", str(len(data)))
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            if self.command != "HEAD":
                self.wfile.write(data)

        def _read_json(self):
            try:
                length = int(self.headers.get("Content-Length") or 0)
            except ValueError:
                length = 0
            if length <= 0 or length > MAX_BODY:
                return {}
            raw = self.rfile.read(length)
            try:
                body = json.loads(raw.decode("utf-8"))
            except ValueError:
                raise ValueError("body is not JSON")
            if not isinstance(body, dict):
                raise ValueError("body must be a JSON object")
            return body

        # ---------- routes ----------
        def do_HEAD(self):
            self.do_GET()

        def do_GET(self):
            path = unquote(urlsplit(self.path).path)
            if path in ("/", "/index.html"):
                return self._serve_index()
            if path == "/api/moments":
                return self._send_json(store.blind_moments())
            if path == "/api/state":
                return self._send_json(store.state())
            if path == "/favicon.ico":
                self.send_response(HTTPStatus.NO_CONTENT)
                self.send_header("Content-Length", "0")
                self.end_headers()
                return
            if path.startswith("/clips/"):
                m = CLIP_RE.match(path)
                clip = store.clip_path(m.group(1)) if m else None
                if clip is None:
                    return self._send_error_text(HTTPStatus.NOT_FOUND, "clip not cut yet")
                return self._serve_clip(clip)
            return self._send_error_text(HTTPStatus.NOT_FOUND, "not found")

        def do_POST(self):
            path = urlsplit(self.path).path
            try:
                body = self._read_json()
                if path == "/api/grade":
                    return self._send_json(store.grade(body))
                if path == "/api/undo":
                    return self._send_json(store.undo(body))
            except ValueError as e:
                return self._send_json({"ok": False, "error": str(e)}, HTTPStatus.BAD_REQUEST)
            except OSError as e:
                self.log_error("could not write the grades log: %s", e)
                return self._send_json({"ok": False, "error": "could not write the grades log"},
                                       HTTPStatus.INTERNAL_SERVER_ERROR)
            return self._send_error_text(HTTPStatus.NOT_FOUND, "not found")

        def _serve_index(self):
            try:
                data = index_path.read_bytes()
            except OSError:
                return self._send_error_text(HTTPStatus.NOT_FOUND, "index.html is missing")
            self.send_response(HTTPStatus.OK)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(data)))
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            if self.command != "HEAD":
                self.wfile.write(data)

        def _serve_clip(self, clip: Path):
            size = clip.stat().st_size
            start, end = 0, size - 1
            status = HTTPStatus.OK
            rng = self.headers.get("Range")
            if rng:
                m = re.fullmatch(r"\s*bytes=(\d*)-(\d*)\s*", rng)
                if not m or (m.group(1) == "" and m.group(2) == ""):
                    return self._range_not_satisfiable(size)
                if m.group(1) == "":            # suffix range: the last N bytes
                    n = int(m.group(2))
                    if n == 0:
                        return self._range_not_satisfiable(size)
                    start = max(0, size - n)
                else:
                    start = int(m.group(1))
                    if m.group(2) != "":
                        end = min(int(m.group(2)), size - 1)
                if start >= size or start > end:
                    return self._range_not_satisfiable(size)
                status = HTTPStatus.PARTIAL_CONTENT
            length = end - start + 1
            self.send_response(status)
            self.send_header("Content-Type", "video/mp4")
            self.send_header("Accept-Ranges", "bytes")
            self.send_header("Content-Length", str(length))
            self.send_header("Cache-Control", "no-cache")
            if status == HTTPStatus.PARTIAL_CONTENT:
                self.send_header("Content-Range", f"bytes {start}-{end}/{size}")
            self.end_headers()
            if self.command == "HEAD":
                return
            try:
                with open(clip, "rb") as f:
                    f.seek(start)
                    left = length
                    while left > 0:
                        buf = f.read(min(CHUNK, left))
                        if not buf:
                            break
                        self.wfile.write(buf)
                        left -= len(buf)
            except (ConnectionError, BrokenPipeError):
                pass  # the browser cancels range requests all the time while seeking

        def _range_not_satisfiable(self, size: int):
            self.send_response(HTTPStatus.REQUESTED_RANGE_NOT_SATISFIABLE)
            self.send_header("Content-Range", f"bytes */{size}")
            self.send_header("Content-Length", "0")
            self.end_headers()

    return Handler


class QuietServer(ThreadingHTTPServer):
    daemon_threads = True

    def handle_error(self, request, client_address):
        exc = sys.exc_info()[1]
        if isinstance(exc, (ConnectionError, BrokenPipeError)):
            return
        super().handle_error(request, client_address)


def main() -> None:
    ap = argparse.ArgumentParser(description="Blind grading booth for the rig's video moments.")
    ap.add_argument("--port", type=int, default=8765)
    ap.add_argument("--open", action="store_true", help="open the page in the default browser")
    ap.add_argument("--grades", type=Path, default=HERE / "grades.jsonl")
    ap.add_argument("--moments", type=Path, default=HERE / "moments.json")
    ap.add_argument("--clips", type=Path, default=HERE / "clips")
    args = ap.parse_args()

    store = Store(args.moments.resolve(), args.grades.resolve(), args.clips)
    try:
        httpd = QuietServer(("127.0.0.1", args.port), make_handler(store, HERE / "index.html"))
    except OSError as e:
        sys.exit(f"Could not listen on 127.0.0.1:{args.port} ({e}). Is the booth already running?")

    url = f"http://127.0.0.1:{args.port}/"
    n = len(store.moments())
    print(f"Grading booth: {url}")
    print(f"  {n} moments, grades go to {store.grades_path}")
    print("  Close this window or press Ctrl+C to stop.")
    sys.stdout.flush()
    if args.open:
        threading.Timer(0.3, lambda: webbrowser.open(url)).start()
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        httpd.server_close()


if __name__ == "__main__":
    main()
