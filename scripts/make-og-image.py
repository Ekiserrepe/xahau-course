#!/usr/bin/env python3
"""
Regenerate public/og.png — the 1200x630 card link previews use.

Social platforms don't render SVG, so the wordmark is rasterised (via macOS
qlmanage) and the card is composed with Pillow using the real brand font.

    python3 scripts/make-og-image.py

Needs: Pillow, network access for the Onest webfont, and macOS for qlmanage.
Only run it when the card's design or copy changes; the PNG is committed.
"""

import pathlib
import subprocess
import sys
import tempfile
import urllib.request

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / 'public' / 'og.png'

# Onest, the brand face — same family the site loads from Google Fonts.
FONTS = {
    'regular': 'https://fonts.gstatic.com/s/onest/v11/gNMZW3F-SZuj7zOT0IfSjTS16cPh9R-Zsg.ttf',
    'bold': 'https://fonts.gstatic.com/s/onest/v11/gNMZW3F-SZuj7zOT0IfSjTS16cPhdRiZsg.ttf',
}
MONO = '/System/Library/Fonts/Menlo.ttc'

W, H = 1200, 630
INK = (15, 35, 40)
DIM = (45, 62, 68)
MUTE = (85, 96, 104)
GREEN = (0, 122, 40)
LINE = (205, 215, 220)
CANVAS = (247, 247, 247)

KICKER = 'A BASIC XAHAU COURSE'
TITLE = ['Learn to build on', 'Xahau']
SUBTITLE = 'From your first wallet to your first Hook.'
CHIPS = ['12 Modules', '63 Lessons', '8 Languages', 'MIT · Open Source']


def tracked(draw, xy, text, font, fill, tracking=0.0):
    """Pillow has no letter-spacing, so place each glyph by hand."""
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        x += draw.textlength(ch, font=font) + tracking
    return x


def load_wordmark(tmp):
    """qlmanage renders the SVG onto white; turn that into a clean alpha mask."""
    subprocess.run(
        ['qlmanage', '-t', '-s', '1400', str(ROOT / 'public' / 'xahau-logo.svg'), '-o', tmp],
        check=True, capture_output=True,
    )
    raw = Image.open(pathlib.Path(tmp) / 'xahau-logo.svg.png').convert('L')
    alpha = raw.point(lambda v: 255 - v)          # black ink -> opaque
    mark = Image.new('RGBA', raw.size, INK + (0,))
    mark.putalpha(alpha)
    return mark.crop(alpha.getbbox())


def main():
    tmp = tempfile.mkdtemp()

    faces = {}
    for name, url in FONTS.items():
        path = pathlib.Path(tmp) / f'{name}.ttf'
        path.write_bytes(urllib.request.urlopen(url).read())
        faces[name] = path

    f_title = ImageFont.truetype(str(faces['bold']), 78)
    f_sub = ImageFont.truetype(str(faces['regular']), 27)
    f_kick = ImageFont.truetype(MONO, 17)
    f_chip = ImageFont.truetype(MONO, 16)

    img = Image.new('RGB', (W, H), CANVAS)

    # Card, with the brand's soft lift underneath it
    pad, radius = 40, 30
    box = (pad, pad, W - pad, H - pad)
    shadow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(shadow).rounded_rectangle(
        (box[0] + 6, box[1] + 14, box[2] + 6, box[3] + 16), radius, fill=(15, 35, 40, 38)
    )
    img.paste(Image.alpha_composite(img.convert('RGBA'), shadow.filter(ImageFilter.GaussianBlur(18))).convert('RGB'))
    ImageDraw.Draw(img).rounded_rectangle(box, radius, fill=(255, 255, 255))

    d = ImageDraw.Draw(img)
    x0, y = pad + 62, pad + 58

    mark = load_wordmark(tmp)
    mark = mark.resize((236, max(1, round(236 * mark.height / mark.width))), Image.LANCZOS)
    img.paste(mark, (x0, y), mark)

    # "| Learn" lockup, matching the site header
    lx = x0 + mark.width + 18
    d.line([(lx, y - 2), (lx, y + mark.height + 2)], fill=LINE, width=2)
    f_brand = ImageFont.truetype(str(faces['bold']), 26)
    d.text((lx + 18, y - 6), 'Learn', font=f_brand, fill=MUTE)

    # Kicker with its pip
    y += 108
    d.ellipse((x0, y + 7, x0 + 9, y + 16), fill=GREEN)
    tracked(d, (x0 + 22, y), KICKER, f_kick, MUTE, tracking=2.6)

    # Headline
    y += 44
    for line in TITLE:
        d.text((x0 - 3, y), line, font=f_title, fill=INK)
        y += 82

    # Subtitle
    y += 26
    d.text((x0, y), SUBTITLE, font=f_sub, fill=DIM)

    # Chips
    cy = H - pad - 92
    cx = x0
    for chip in CHIPS:
        w = d.textlength(chip, font=f_chip) + 36
        d.rounded_rectangle((cx, cy, cx + w, cy + 40), 20, outline=LINE, width=2)
        d.text((cx + 18, cy + 11), chip, font=f_chip, fill=MUTE)
        cx += w + 12

    img.save(OUT, 'PNG', optimize=True)
    print(f'wrote {OUT.relative_to(ROOT)} ({OUT.stat().st_size // 1024} KB)')


if __name__ == '__main__':
    sys.exit(main())
