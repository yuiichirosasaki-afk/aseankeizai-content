#!/usr/bin/env python3
"""記事JSONを公開ルールに照らして検査する。

使い方: python3 scripts/validate.py articles/2026-11-18 [ほかのディレクトリやファイル]
ファイルごとに OK か問題の一覧を出す。1つでも問題があれば終了コード1。

分量は日本語なので単語では数えられない。すべて「タグを除いた文字数」で数える。
"""
import difflib, html, json, re, sys
from datetime import datetime, timedelta, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TAX = json.loads((ROOT / "taxonomy.json").read_text(encoding="utf-8"))
COUNTRIES = {c["name"] for c in TAX["countries"]}
CATEGORIES = {c["name"] for c in TAX["categories"]}
TYPES = {"news", "analysis", "explainer"}
REQUIRED = ["slug", "title", "country", "category", "articleType", "lead",
            "summaryHtml", "bodyHtml", "sources", "seoTitle", "seoDescription",
            "publishAt", "language"]
ALLOWED_TAGS = {"p", "ul", "ol", "li", "h3", "strong", "em", "a"}
JST = timezone(timedelta(hours=9))

LEFTOVERS = ("insufficient", "todo", "tbd", "lorem")
CURRENCIES = ("ルピア", "ドン", "バーツ", "ペソ", "リンギット", "ドル")
MONEY = re.compile(r"[0-9０-９][0-9０-９,.，．兆億万千百]*\s*(?:" + "|".join(CURRENCIES) + ")")
BUDDHIST = re.compile(r"(?<![0-9])25[0-9]{2}(?![0-9])")
EMPTY_H3 = re.compile(r"<h3[^>]*>\s*</h3>", re.I)


def text(h):
    """タグを除いた素の文。"""
    return html.unescape(re.sub(r"<[^>]+>", " ", h or "")).strip()


def chars(h):
    """タグと空白を除いた文字数。"""
    return len(re.sub(r"\s+", "", text(h)))


def known_articles(exclude):
    """ほかの記事の (slug, title, publishAt)。"""
    out = []
    for p in (ROOT / "articles").glob("*/*.json"):
        if p.resolve() == exclude.resolve():
            continue
        try:
            a = json.loads(p.read_text(encoding="utf-8"))
            t = datetime.fromisoformat(a["publishAt"])
        except Exception:
            continue
        out.append((p.stem, a.get("title", ""), t))
    return out


def check(path):
    errs = []
    try:
        a = json.loads(path.read_text(encoding="utf-8"))
    except Exception as e:
        return [f"JSONとして読めない: {e}"]

    for k in REQUIRED:
        if not a.get(k):
            errs.append(f"{k} がない")
    if errs:
        return errs

    # slug
    if a["slug"] != path.stem:
        errs.append("slug がファイル名と違う")
    if not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", a["slug"]) or len(a["slug"]) > 80:
        errs.append("slug の形式")

    others = known_articles(path)
    if a["slug"] in {s for s, _, _ in others}:
        errs.append("slug が既にある")

    # 分類
    if a["country"] not in COUNTRIES:
        errs.append(f"country {a['country']!r} が taxonomy.json にない")
    if a["category"] not in CATEGORIES:
        errs.append(f"category {a['category']!r} が taxonomy.json にない")
    if a["articleType"] not in TYPES:
        errs.append(f"articleType {a['articleType']!r}")
    if a["language"] != "ja":
        errs.append("language は ja")

    # 文字数
    if not (25 <= len(a["title"]) <= 50):
        errs.append(f"title {len(a['title'])}字（25〜50字）")
    if not (100 <= len(a["lead"]) <= 200):
        errs.append(f"lead {len(a['lead'])}字（100〜200字）")
    if len(a["seoTitle"]) > 32:
        errs.append(f"seoTitle {len(a['seoTitle'])}字 > 32")
    if len(a["seoDescription"]) > 120:
        errs.append(f"seoDescription {len(a['seoDescription'])}字 > 120")
    if "<" in a["lead"] or "&" in a["lead"]:
        errs.append("lead はタグなしの素の文")

    # 公開時刻
    try:
        dt = datetime.fromisoformat(a["publishAt"])
        if dt.utcoffset() is None or dt.utcoffset().total_seconds() != 9 * 3600:
            errs.append("publishAt は +09:00")
    except Exception:
        errs.append("publishAt が ISO 形式でない")

    # 出典
    src = a["sources"]
    if not isinstance(src, list) or len(src) < 2:
        errs.append("出典は2件以上")
        src = src if isinstance(src, list) else []
    for s in src:
        for k in ("name", "title", "url", "date"):
            if not s.get(k):
                errs.append(f"出典に {k} がない")
        if s.get("url") and not s["url"].startswith("http"):
            errs.append("出典の url")

    body = " ".join(a.get(k, "") for k in ("summaryHtml", "bodyHtml"))
    plain = text(body)
    whole = plain + " " + a["title"] + " " + a["lead"]

    # 許可タグとインライン style
    for tag in re.findall(r"<\s*/?\s*([a-zA-Z0-9]+)", body):
        if tag.lower() not in ALLOWED_TAGS:
            errs.append(f"<{tag}> は使えない")
            break
    if "style=" in body:
        errs.append("インライン style は使えない")
    if re.search(r"<h[12]\b", body, re.I):
        errs.append("<h1> <h2> は使えない")

    # 解説の分量
    if chars(a["bodyHtml"]) < 600:
        errs.append(f"bodyHtml {chars(a['bodyHtml'])}字（600字以上）")
    if len(re.findall(r"<h3\b", a["bodyHtml"], re.I)) < 2:
        errs.append("bodyHtml に <h3> が2つ以上必要")
    if chars(a["bodyHtml"]) <= chars(a["summaryHtml"]):
        errs.append("bodyHtml が summaryHtml より短い")

    # 引用
    quotes = re.findall(r"「([^」]+)」", plain)
    for q in quotes:
        if len(q) >= 50:
            errs.append(f"引用が長い（{len(q)}字、50字未満）")
    en_quotes = re.findall(r"[\"“]([^\"”]{3,})[\"”]", plain)
    for q in en_quotes:
        if len(q.split()) >= 15:
            errs.append(f"英語の引用が長い（{len(q.split())}語、15語未満）")
    if len(quotes) + len(en_quotes) > len(src):
        errs.append(f"引用{len(quotes) + len(en_quotes)}か所に対し出典{len(src)}件")

    # 仏暦
    for y in BUDDHIST.findall(whole):
        errs.append(f"仏暦の年が残っている（{y} → 西暦{int(y) - 543}）")
        break

    # 円換算
    m = MONEY.search(whole)
    if m and "円" not in whole:
        errs.append(f"外貨（{m.group(0)}）に円換算がない")

    # 作業の残り
    low = whole.lower()
    for w in LEFTOVERS:
        if w in low:
            errs.append(f"作業用の言葉が残っている（{w}）")
            break
    if EMPTY_H3.search(body):
        errs.append("中身のない <h3> がある")

    # 重複（直近30日のタイトルと照合）
    try:
        mine = datetime.fromisoformat(a["publishAt"])
    except Exception:
        mine = datetime.now(JST)
    for _, title, t in others:
        if not title or abs((mine - t).days) > 30:
            continue
        r = difflib.SequenceMatcher(None, a["title"], title).ratio()
        if r >= 0.8:
            errs.append(f"直近30日の記事とタイトルがほぼ同じ（一致率{r:.2f}）: {title}")
            break

    return errs


def main():
    files = []
    for arg in sys.argv[1:] or ["articles"]:
        p = Path(arg)
        files += sorted(p.rglob("*.json")) if p.is_dir() else [p]
    bad = 0
    for f in files:
        e = check(f)
        print(f"{f}: {'OK' if not e else '; '.join(e)}")
        bad += bool(e)
    sys.exit(1 if bad else 0)


if __name__ == "__main__":
    main()
