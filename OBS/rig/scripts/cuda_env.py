"""Make the pip-installed CUDA libraries findable by CTranslate2 on Windows."""
import os
import sys
from pathlib import Path


def add_cuda_libs() -> None:
    """Call this before importing faster_whisper."""
    nvidia = Path(sys.prefix) / "Lib" / "site-packages" / "nvidia"
    dirs = [nvidia / name / "bin" for name in ("cublas", "cudnn", "cuda_nvrtc")]
    os.environ["PATH"] = os.pathsep.join([*map(str, dirs), os.environ.get("PATH", "")])
    for d in dirs:
        os.add_dll_directory(str(d))
