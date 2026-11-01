"""The background controller for one session.

/start launches this detached, so closing Claude Code never stops a recording (R6).
It holds pause state and the watchdog, and writes session.json as it goes.

Each unbroken stretch of recording is one span. Pauses and crash gaps are the spaces
between spans, which keeps video time, wall-clock time and hackathon time exact (R20).
"""
import logging
import os
import subprocess
import sys
import time
import traceback

import obs_client as oc
import preflight
import recorders
import rig_state as rs

TICK = 0.25
WATCHDOG_EVERY = 10
SAVE_EVERY = 10


def alert(text: str) -> None:
    """Toast plus voice. The voice gets through when a full-screen app hides the toast."""
    script = (
        f"Import-Module BurntToast; New-BurntToastNotification -Text 'Capture rig','{text}'; "
        "Add-Type -AssemblyName System.Speech; "
        f"(New-Object System.Speech.Synthesis.SpeechSynthesizer).Speak('{text}')"
    )
    subprocess.Popen(
        ["powershell", "-NoProfile", "-Command", script],
        creationflags=recorders.NO_WINDOW,
        stdin=subprocess.DEVNULL, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
    )


class Controller:
    def __init__(self, folder: str):
        self.folder = folder
        self.video_dir = rs.TO_PROCESS / folder
        self.live_dir = rs.LIVE / folder
        self.record_path = self.live_dir / "session.json"
        self.backup_dir = self.live_dir / "audio-backup"
        self.webcam_dir = self.video_dir / "webcam"
        self.session = rs.load_json(self.record_path)
        self.client = None
        self.backup = None
        self.webcam = None
        self.last_good = time.time()

    # The session record

    def save(self) -> None:
        self.session["elapsed_seconds"] = round(self.elapsed(), 1)
        rs.save_json(self.record_path, self.session)

    def elapsed(self) -> float:
        total = 0.0
        for span in self.session["spans"]:
            total += (span["end"] or time.time()) - span["start"]
        return total

    def open_span(self, epoch: float) -> None:
        self.session["spans"].append(
            {"start": epoch, "start_local": rs.stamp(epoch),
             "end": None, "end_local": None, "ended_by": None}
        )

    def close_span(self, epoch: float, reason: str) -> None:
        spans = self.session["spans"]
        if spans and spans[-1]["end"] is None:
            spans[-1].update(end=epoch, end_local=rs.stamp(epoch), ended_by=reason)

    def log_gap(self, source: str, start: float, end: float) -> None:
        self.session["gaps"].append(
            {"source": source, "start": start, "start_local": rs.stamp(start),
             "end": end, "end_local": rs.stamp(end), "seconds": round(end - start, 1)}
        )

    # OBS

    def ensure_obs(self) -> None:
        """Get a working OBS. One that's running but won't answer gets replaced.

        That covers any dialog or hang, not only the ones known about today.
        """
        if oc.is_running():
            try:
                self.client = oc.wait_for_websocket(limit=15)
                return
            except TimeoutError:
                logging.warning("OBS is running but not answering, so replacing it")
                oc.kill()
                time.sleep(1)
        oc.launch("--profile", oc.PROFILE, "--collection", oc.COLLECTION)
        self.client = oc.wait_for_websocket()

    def reconnect(self) -> None:
        """OBS may have restarted since the last request."""
        try:
            self.client.get_record_status()
        except Exception:
            self.ensure_obs()

    def start_recording(self) -> None:
        """Start OBS recording and open a span at the moment OBS reports it began."""
        self.client.set_record_directory(self.video_dir.as_posix())
        self.client.start_record()
        deadline = time.monotonic() + 20
        while True:
            status = self.client.get_record_status()
            if status.output_active:
                break
            if time.monotonic() > deadline:
                raise RuntimeError("OBS didn't start recording")
            time.sleep(0.05)
        self.open_span(time.time() - status.output_duration / 1000)
        self.last_good = time.time()

    def obs_healthy(self) -> bool:
        try:
            return oc.is_running() and self.client.get_record_status().output_active
        except Exception:
            return False

    # The ffmpeg recorders

    def begin_webcam(self):
        return recorders.start_webcam(self.webcam_dir, self.live_dir / "webcam.log")

    def start_recorders(self) -> None:
        self.backup = recorders.start_backup(self.backup_dir)
        self.webcam = self.begin_webcam()
        now = time.time()
        for name, proc in (("backup", self.backup), ("webcam", self.webcam)):
            self.session["recorder_runs"].append(
                {"source": name, "pid": proc.pid, "start": now, "start_local": rs.stamp(now)}
            )

    def stop_recorders(self) -> None:
        recorders.stop(self.backup)
        recorders.stop(self.webcam)
        self.backup = self.webcam = None

    # Commands

    def start(self) -> None:
        self.ensure_obs()
        ok, lines = preflight.run(self.client)
        self.session["preflight"] = lines
        if not ok:
            self.session["state"] = "blocked"
            self.save()
            return
        self.start_recorders()
        self.start_recording()
        self.session["hackathon_start"] = rs.hackathon_start(self.session["spans"][0]["start"])
        self.session["state"] = "recording"
        self.save()

    def toggle_pause(self) -> str:
        self.reconnect()
        if self.session["state"] == "recording":
            self.client.pause_record()
            self.close_span(time.time(), "pause")
            self.stop_recorders()
            self.session["state"] = "paused"
            self.save()
            return "Paused. Type /pause again to resume."

        self.start_recorders()
        status = self.client.get_record_status()
        if status.output_active:
            self.client.resume_record()
            self.open_span(time.time())
        else:
            self.start_recording()
        self.last_good = time.time()
        self.session["state"] = "recording"
        self.save()
        return "Resumed."

    def stop(self) -> str:
        now = time.time()
        warning = ""
        try:
            self.reconnect()
            if self.client.get_record_status().output_active:
                self.client.stop_record()
            deadline = time.monotonic() + 30
            while self.client.get_record_status().output_active and time.monotonic() < deadline:
                time.sleep(0.2)
        except Exception:
            logging.exception("couldn't stop OBS cleanly")
            warning = " OBS wasn't answering, so its last file may need checking."
        finally:
            self.close_span(now, "stop")
            self.stop_recorders()
            self.session.update(state="stopped", stopped=now, stopped_local=rs.stamp(now))
            self.save()
        minutes = self.elapsed() / 60
        return f"Stopped {self.session['id']} after {minutes:.0f} minutes of recording.{warning}"

    def handle_commands(self) -> bool:
        """Answer one waiting command. Returns False once the session has ended."""
        request = rs.load_json(rs.COMMAND_FILE)
        if request is None:
            return True
        rs.COMMAND_FILE.unlink(missing_ok=True)
        command = request["command"]
        try:
            message = self.toggle_pause() if command == "pause" else self.stop()
            reply = {"id": request["id"], "ok": True, "message": message}
        except Exception as error:
            logging.exception("command %s failed", command)
            reply = {"id": request["id"], "ok": False, "message": str(error)}
        rs.save_json(rs.REPLY_FILE, reply)
        return self.session["state"] in ("recording", "paused")

    # The watchdog (R12)

    def recover_obs(self) -> None:
        gap_start = self.last_good
        alert("Recording stopped. Restarting it now.")
        self.close_span(gap_start, "crash")
        self.ensure_obs()
        self.start_recording()
        self.log_gap("obs", gap_start, time.time())
        self.save()
        logging.info("OBS recovered after %.1f s", time.time() - gap_start)

    def recover_recorder(self, name: str) -> None:
        alert(f"The {name} recorder stopped. Restarting it now.")
        started = time.time()
        if name == "backup":
            self.backup = recorders.start_backup(self.backup_dir)
            proc = self.backup
        else:
            self.webcam = self.begin_webcam()
            proc = self.webcam
        now = time.time()
        self.session["recorder_runs"].append(
            {"source": name, "pid": proc.pid, "start": now, "start_local": rs.stamp(now)}
        )
        self.log_gap(name, self.last_good, started)
        self.save()

    def watchdog(self) -> None:
        if self.session["state"] != "recording":
            if not oc.is_running():
                self.ensure_obs()
            return
        # Recorders first, so a stuck OBS can't keep them down.
        if self.backup.poll() is not None:
            self.recover_recorder("backup")
        if self.webcam.poll() is not None:
            self.recover_recorder("webcam")
        if not self.obs_healthy():
            self.recover_obs()
        self.last_good = time.time()

    def run(self) -> None:
        self.start()
        if self.session["state"] != "recording":
            return
        next_watch = time.monotonic() + WATCHDOG_EVERY
        next_save = time.monotonic() + SAVE_EVERY
        while True:
            if not self.handle_commands():
                return
            now = time.monotonic()
            if now >= next_watch:
                try:
                    self.watchdog()
                except Exception:
                    logging.exception("watchdog pass failed, will retry")
                next_watch = time.monotonic() + WATCHDOG_EVERY
            if now >= next_save:
                self.save()
                next_save = now + SAVE_EVERY
            time.sleep(TICK)


def main() -> int:
    folder = sys.argv[1]
    rs.RUN.mkdir(parents=True, exist_ok=True)
    logging.basicConfig(
        filename=rs.LOG_FILE, level=logging.INFO,
        format="%(asctime)s %(levelname)s %(message)s",
    )
    rs.PID_FILE.write_text(str(os.getpid()), encoding="utf-8")
    controller = Controller(folder)
    try:
        controller.run()
        return 0
    except Exception:
        logging.error("controller failed:\n%s", traceback.format_exc())
        controller.session["state"] = "failed"
        controller.session["error"] = traceback.format_exc(limit=1).strip()[-300:]
        controller.save()
        alert("The rig controller has failed. Check the recording.")
        return 1
    finally:
        rs.PID_FILE.unlink(missing_ok=True)


if __name__ == "__main__":
    sys.exit(main())
