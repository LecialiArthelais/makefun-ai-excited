#!/usr/bin/env python3
"""Rebuild repo/entry.png from the approved v24 source image.

Reads the 1920x1280 webp produced for the Agent Gathering entry,
resizes it to 1024x683, and writes it as JPEG quality 92.
Run from the repo directory.
"""
from PIL import Image

SRC = "/home/hatch/workspace/makefun/ai-excited-01/entry/media-generation-ai-excited-pool-gathering-v24-0-7b469da9-458b-478f-a46d-785107a3d051.webp"
DST = "/home/hatch/workspace/makefun/ai-excited-01/repo/entry.png"

img = Image.open(SRC)
print("source:", img.size, img.mode)
img = img.convert("RGB")
img = img.resize((1024, 683), Image.LANCZOS)
img.save(DST, "JPEG", quality=92)
print("wrote:", DST, img.size)

# Verify the written file.
check = Image.open(DST)
print("verify:", check.format, check.size, check.mode)
