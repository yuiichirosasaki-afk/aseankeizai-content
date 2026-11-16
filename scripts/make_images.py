#!/usr/bin/env python3
"""記事ごとに図版（1600x900 PNG）を作る。

使い方: python3 scripts/make_images.py articles/2026-11-18 [ほかのディレクトリやファイル]
記事JSONごとに images/<slug>.png を書き、JSON の "heroImage" を設定する。

デザインは Review の図版と同じ（紺のカード、分類ラベル、大きな数字 dataFigure、
説明 dataLabel、出典 dataSource）。記事に "chart": {"bars": [...]} があれば右に棒グラフ、
dataFigure が百分率だけなら右にドーナツを描く。

日本語は単語の区切りで折り返せないので、折り返しは文字単位で行う。
"""
import json, re, sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
FONTS = ROOT / 'assets' / 'fonts'
# 作ったリポジトリに合わせる。コミット済みの images/ を raw で参照する。
RAW = 'https://raw.githubusercontent.com/yuiichirosasaki-afk/aseankeizai-content/main/images/'

SERIF_BOLD = 'NotoSerifJP-Bold.ttf'
SANS = 'NotoSansJP-Regular.ttf'
SANS_BOLD = 'NotoSansJP-Bold.ttf'

W, H = 1600, 900
NAVY = (11, 42, 74)
PALE = (201, 214, 232)
LIGHT = (227, 234, 243)
BAR = (143, 176, 221)
WHITE = (255, 255, 255)

# 行頭に置かない文字
NO_START = '、。，．）」』】〉》”’・ーぁぃぅぇぉっゃゅょゎァィゥェォッャュョヮ！？'


def font(name, size):
    return ImageFont.truetype(str(FONTS / name), size)


def wrap(draw, s, fnt, max_w):
    """文字単位で折り返す。英数字の連なりは途中で切らない。"""
    lines, cur = [], ''
    tokens = re.findall(r'[0-9A-Za-z][0-9A-Za-z.,%\-]*|\s+|.', s or '')
    for tok in tokens:
        if tok.isspace():
            if cur:
                cur += ' '
            continue
        t = cur + tok
        if draw.textlength(t, font=fnt) <= max_w or not cur:
            cur = t
        else:
            if tok and tok[0] in NO_START:
                cur = t
            else:
                lines.append(cur.rstrip())
                cur = tok
    if cur.strip():
        lines.append(cur.rstrip())
    return lines


def render(a, out):
    img = Image.new('RGB', (W, H), NAVY)
    d = ImageDraw.Draw(img)
    pad = 96
    bars = (a.get('chart') or {}).get('bars') or []
    left_w = 760 if bars else W - 2 * pad

    cat = f"{a.get('country', '')}　·　{a.get('category', '')}"
    d.text((pad, pad), cat, font=font(SANS_BOLD, 30), fill=PALE)

    fig = a.get('dataFigure') or ''
    size = 230
    while size > 90 and d.textlength(fig, font=font(SERIF_BOLD, size)) > left_w:
        size -= 6
    f_big = font(SERIF_BOLD, size)
    label_f = font(SANS, 36)
    label_lines = wrap(d, a.get('dataLabel') or '', label_f, min(left_w, 720))[:4]
    src_f = font(SANS, 24)
    src_lines = wrap(d, '出典: ' + (a.get('dataSource') or ''), src_f, left_w)[:2]

    src_h = len(src_lines) * 34
    label_h = len(label_lines) * 50
    big_box = d.textbbox((0, 0), fig, font=f_big)
    big_h = big_box[3] - big_box[1]
    y_src = H - pad - src_h
    y_label = y_src - 56 - label_h
    y_big = y_label - 28 - big_h
    d.text((pad, y_big - big_box[1]), fig, font=f_big, fill=WHITE)
    for i, line in enumerate(label_lines):
        d.text((pad, y_label + i * 50), line, font=label_f, fill=LIGHT)
    for i, line in enumerate(src_lines):
        d.text((pad, y_src + i * 34), line, font=src_f, fill=PALE)

    pct = None
    if not bars:
        m = re.fullmatch(r'\s*(\d+(?:[.,]\d+)?)\s*%\s*', fig)
        if m:
            pct = float(m.group(1).replace(',', '.'))
    if pct is not None and 0 < pct <= 100:
        r, cx, cy, wdt = 250, W - pad - 270, H // 2 + 20, 70
        box = [cx - r, cy - r, cx + r, cy + r]
        d.arc(box, 0, 360, fill=(37, 72, 110), width=wdt)
        d.arc(box, -90, -90 + 360 * pct / 100, fill=WHITE, width=wdt)

    if bars:
        area_x0, area_x1 = W - pad - 600, W - pad
        area_top, area_bottom = pad + 120, H - pad - 50
        n = len(bars)
        gap = 28
        bw = (area_x1 - area_x0 - gap * (n - 1)) / n
        vmax = max(b['value'] for b in bars) or 1
        vf = font(SANS_BOLD, 30)
        lf = font(SANS, 26)
        for i, b in enumerate(bars):
            x0 = area_x0 + i * (bw + gap)
            h = max(6, (area_bottom - area_top - 50) * b['value'] / vmax)
            y0 = area_bottom - h
            color = WHITE if i == n - 1 else BAR
            d.rectangle([x0, y0, x0 + bw, area_bottom], fill=color)
            disp = b.get('display') or str(b['value'])
            tw = d.textlength(disp, font=vf)
            d.text((x0 + (bw - tw) / 2, y0 - 44), disp, font=vf, fill=WHITE)
            lab = b.get('label') or ''
            lw = d.textlength(lab, font=lf)
            d.text((x0 + (bw - lw) / 2, area_bottom + 14), lab, font=lf, fill=PALE)

    out.parent.mkdir(parents=True, exist_ok=True)
    img.save(out, 'PNG', optimize=True)


def main():
    files = []
    for arg in sys.argv[1:] or ['articles']:
        p = Path(arg)
        files += sorted(p.rglob('*.json')) if p.is_dir() else [p]
    for f in files:
        a = json.loads(f.read_text(encoding='utf-8'))
        if not a.get('dataFigure'):
            print(f'{f}: dataFigure がないので作らない')
            continue
        out = ROOT / 'images' / f"{a['slug']}.png"
        render(a, out)
        a['heroImage'] = RAW + out.name
        f.write_text(json.dumps(a, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
        print(f'{f}: {out.relative_to(ROOT)}')


if __name__ == '__main__':
    main()
