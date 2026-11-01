"""Task 2 done-check: transcribe a known clip on CUDA and score it against its script.

Usage: python test_whisper.py <audio file> <script text file> [model]
"""
import difflib
import re
import subprocess
import sys
import time
from pathlib import Path

from cuda_env import add_cuda_libs

add_cuda_libs()
from faster_whisper import WhisperModel  # noqa: E402

MODELS = Path(__file__).resolve().parent.parent / "models"


def vram_used_mib() -> int:
    out = subprocess.check_output(
        ["nvidia-smi", "--query-gpu=memory.used", "--format=csv,noheader,nounits"],
        text=True,
    )
    return int(out.strip())


def words(text: str) -> list[str]:
    return re.findall(r"[a-z0-9']+", text.lower())


def main() -> int:
    audio, script = sys.argv[1], Path(sys.argv[2]).read_text(encoding="utf-8")
    name = sys.argv[3] if len(sys.argv) > 3 else "small"

    before = vram_used_mib()
    model = WhisperModel(
        name, device="cuda", compute_type="float16", download_root=str(MODELS)
    )
    loaded = vram_used_mib()

    start = time.perf_counter()
    segments, info = model.transcribe(audio, word_timestamps=True, vad_filter=True)
    text = " ".join(s.text.strip() for s in segments)
    elapsed = time.perf_counter() - start

    score = difflib.SequenceMatcher(None, words(script), words(text)).ratio()
    print(f"model: {name}, device: {model.model.device}, float16")
    print(f"audio: {info.duration:.1f} s, transcribed in {elapsed:.1f} s")
    print(f"speed: {info.duration / elapsed:.1f}x real time")
    print(f"VRAM: {before} MiB before, {loaded} MiB with model loaded")
    print(f"word match against script: {score:.1%}")
    print(f"text: {text}")
    return 0 if model.model.device == "cuda" and score > 0.9 else 1


if __name__ == "__main__":
    sys.exit(main())
