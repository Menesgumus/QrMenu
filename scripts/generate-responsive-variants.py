#!/usr/bin/env python3
"""
Generate responsive WebP variants from existing local menu images without upscaling
and without altering crop framing across breakpoints:
  - icon/<slug>.webp: 144x144 (only for the 11 category covers, downscaled from grid/ 480x480)
  - card/<slug>.webp: 360x360 (all 69 items, downscaled from grid/ 480x480)
  - card-lg/<slug>.webp: up to 720x720 (square crop matched to grid/ extracted from full/, never upscaled)
  - detail-md/<slug>.webp: width=640 preserving exact natural aspect ratio of full/ (when full_w >= 800)
"""

from __future__ import annotations

import os
from pathlib import Path
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
IMG_DIR = ROOT / "public" / "images" / "menu"
FULL_DIR = IMG_DIR / "full"
GRID_DIR = IMG_DIR / "grid"

ICON_DIR = IMG_DIR / "icon"
CARD_DIR = IMG_DIR / "card"
CARD_LG_DIR = IMG_DIR / "card-lg"
DETAIL_MD_DIR = IMG_DIR / "detail-md"

CATEGORY_COVER_SLUGS = {
    "truflu-yumurta.webp",
    "sade-kruvasan.webp",
    "izgara-sebze-focaccia.webp",
    "balkabagi-kinoa-kasesi.webp",
    "mantarli-rigatoni.webp",
    "yerli-peynir-tabagi.webp",
    "flat-white.webp",
    "iced-latte.webp",
    "rize-siyah-cay.webp",
    "reyhanli-gazoz.webp",
    "bask-cheesecake.webp",
}


def find_matching_square_crop(im_f: Image.Image, im_g: Image.Image) -> tuple[int, int, int]:
    """
    If grid/ differs meaningfully from a naive center-square crop of full/,
    locate the exact square region in full/ whose normalized appearance matches grid/.
    """
    fw, fh = im_f.size
    m = min(fw, fh)
    left0, top0 = (fw - m) // 2, (fh - m) // 2
    center_mae = float(
        np.mean(
            np.abs(
                np.asarray(
                    im_f.crop((left0, top0, left0 + m, top0 + m)).resize((480, 480), Image.Resampling.LANCZOS),
                    dtype=np.float32,
                )
                - np.asarray(im_g, dtype=np.float32)
            )
        )
    )
    if center_mae <= 5.5:
        return left0, top0, m

    scale = 180.0 / m
    sw, sh = max(1, int(round(fw * scale))), max(1, int(round(fh * scale)))
    f_arr = np.asarray(im_f.resize((sw, sh), Image.Resampling.BILINEAR), dtype=np.float32)
    g_s = np.asarray(im_g.resize((64, 64), Image.Resampling.BILINEAR), dtype=np.float32)
    g_n = (g_s - g_s.mean()) / (g_s.std() + 1e-5)

    best = (-1.0, left0, top0, m)
    # Coarse search across scale factors & positions
    for frac in [0.76, 0.80, 0.84, 0.88, 0.92, 0.96, 1.0]:
        sz = int(round(m * frac))
        dsz = max(8, int(round(sz * scale)))
        if dsz > sw or dsz > sh:
            continue
        sx = max(1, (sw - dsz) // 18)
        sy = max(1, (sh - dsz) // 18)
        for l_s in range(0, sw - dsz + 1, sx):
            for t_s in range(0, sh - dsz + 1, sy):
                patch = Image.fromarray(f_arr[t_s : t_s + dsz, l_s : l_s + dsz].astype(np.uint8)).resize(
                    (64, 64), Image.Resampling.BILINEAR
                )
                p = np.asarray(patch, dtype=np.float32)
                pn = (p - p.mean()) / (p.std() + 1e-5)
                corr = float(np.mean(pn * g_n))
                if corr > best[0]:
                    l = max(0, min(fw - sz, int(round(l_s / scale))))
                    t = max(0, min(fh - sz, int(round(t_s / scale))))
                    best = (corr, l, t, sz)

    # Fine refinement around best
    _, bl, bt, bsz = best
    best_fine = (best[0], bl, bt, bsz)
    for dfrac in (-0.03, -0.015, 0.0, 0.015, 0.03):
        sz = min(m, max(480, int(round(bsz + m * dfrac))))
        for dl in range(-24, 25, 6):
            for dt in range(-24, 25, 6):
                l = max(0, min(fw - sz, bl + dl))
                t = max(0, min(fh - sz, bt + dt))
                p = np.asarray(
                    im_f.crop((l, t, l + sz, t + sz)).resize((64, 64), Image.Resampling.BILINEAR),
                    dtype=np.float32,
                )
                pn = (p - p.mean()) / (p.std() + 1e-5)
                corr = float(np.mean(pn * g_n))
                if corr > best_fine[0]:
                    best_fine = (corr, l, t, sz)

    return best_fine[1], best_fine[2], best_fine[3]


def main() -> None:
    for d in (ICON_DIR, CARD_DIR, CARD_LG_DIR, DETAIL_MD_DIR):
        d.mkdir(parents=True, exist_ok=True)

    full_files = sorted(f for f in os.listdir(FULL_DIR) if f.endswith(".webp"))
    print(f"Processing {len(full_files)} images...")

    for fname in full_files:
        im_f = Image.open(FULL_DIR / fname).convert("RGB")
        im_g = Image.open(GRID_DIR / fname).convert("RGB")
        fw, fh = im_f.size

        # 1. icon/ (144x144 for the 11 category covers, exact framing from grid/)
        if fname in CATEGORY_COVER_SLUGS:
            icon = im_g.resize((144, 144), Image.Resampling.LANCZOS)
            icon.save(ICON_DIR / fname, "WEBP", quality=82, method=6)

        # 2. card/ (360x360, exact framing from grid/)
        card = im_g.resize((360, 360), Image.Resampling.LANCZOS)
        card.save(CARD_DIR / fname, "WEBP", quality=82, method=6)

        # 3. card-lg/ (up to 720x720 from full/, NEVER upscaled, crop-matched to grid/)
        cl, ct, csz = find_matching_square_crop(im_f, im_g)
        target_lg = min(720, csz)
        # Only emit card-lg when strictly larger than grid/ 480px
        if target_lg > 480:
            crop_lg = im_f.crop((cl, ct, cl + csz, ct + csz)).resize(
                (target_lg, target_lg), Image.Resampling.LANCZOS
            )
            crop_lg.save(CARD_LG_DIR / fname, "WEBP", quality=83, method=6)

        # 4. detail-md/ (width=640 natural aspect ratio, only when full_w >= 800 to avoid pointless duplicates)
        if fw >= 800:
            dh = int(round(fh * 640 / fw))
            detail_md = im_f.resize((640, dh), Image.Resampling.LANCZOS)
            detail_md.save(DETAIL_MD_DIR / fname, "WEBP", quality=84, method=6)

    for label, d in [
        ("icon", ICON_DIR),
        ("card", CARD_DIR),
        ("card-lg", CARD_LG_DIR),
        ("detail-md", DETAIL_MD_DIR),
    ]:
        files = sorted(f for f in os.listdir(d) if f.endswith(".webp"))
        total_kb = sum((d / f).stat().st_size for f in files) / 1024.0
        print(f"  {label:10s}: {len(files):2d} files, total {total_kb:7.1f} KiB")


if __name__ == "__main__":
    main()
