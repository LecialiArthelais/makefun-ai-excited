#!/usr/bin/env python3
"""Rebuild entry.png from the approved v24 artwork.

Takes the wide webp master, converts it to plain RGB, scales it down to
the 1024x683 frame the competition wants, and writes it out as a
quality-92 JPEG. The destination is the approved v24 image the user
signed off on, resized for the competition frame — nothing in the
picture itself is changed.
"""

from pathlib import Path

from PIL import Image

MASTER = Path(
    "/home/hatch/workspace/makefun/ai-excited-01/entry/"
    "media-generation-ai-excited-pool-gathering-v24-0-7b469da9-458b-478f-a46d-785107a3d051.webp"
)
DESTINATION = Path("/home/hatch/workspace/makefun/ai-excited-01/repo/entry.png")
FRAME = (1024, 683)
QUALITY = 92


def rebuild() -> None:
    with Image.open(MASTER) as artwork:
        frame = artwork.convert("RGB").resize(FRAME, Image.LANCZOS)
    frame.save(DESTINATION, "JPEG", quality=QUALITY)
    print(f"Wrote {DESTINATION} ({FRAME[0]}x{FRAME[1]}, quality {QUALITY}).")


if __name__ == "__main__":
    rebuild()
