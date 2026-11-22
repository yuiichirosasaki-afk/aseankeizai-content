#!/usr/bin/env python3
"""展示会データ（trade-shows/events.json）の検査。

サイトの「展示会」タブ（https://aseankeizai.jp/trade-shows/）は、このファイルを GitHub から
直接読んで表示する。壊れたデータを push すると、サイトは直前に読めたデータを出し続ける
（そのまま古くなる）ので、push する前に必ずこれを通す。

    python3 scripts/validate_trade_shows.py            # 検査だけ
    python3 scripts/validate_trade_shows.py --prune    # 終了から60日を過ぎた展示会を消してから検査

すべて OK なら終了コード 0。
"""
import datetime as dt
import json
import re
import sys
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PATH = ROOT / "trade-shows" / "events.json"
FIELDS = [
    "製造・機械", "食品・飲料", "建設・インフラ", "エネルギー・環境", "医療・医薬", "物流・運輸",
    "自動車・部品", "IT・電子", "化学・素材", "農業・畜産", "生活用品・繊維・美容", "印刷・包装", "総合・その他",
]
SOURCE_TYPES = {
    "organizer": "主催者の公式サイト",
    "venue": "会場の公式の催事予定",
    "press": "主催者の発表（プレスリリース）",
    "jmesse": "JETRO J-messe",
}
REQUIRED = ["id", "name", "country", "city", "start", "end", "field", "source", "sourceType", "checked"]
URL = re.compile(r"^https?://[^\s]+$")
AGGREGATORS = re.compile(r"10times|showsbee|expomap|eventseye|tradefairdates|cantonfair|expolume|luminik|ntradeshows|clocate|2exhibitions|tradeindia|expofp", re.I)


def today_jst():
    return dt.datetime.now(dt.timezone(dt.timedelta(hours=9))).date()


def main():
    prune = "--prune" in sys.argv
    data = json.loads(PATH.read_text(encoding="utf-8"))
    countries = [c["slug"] for c in json.loads((ROOT / "taxonomy.json").read_text(encoding="utf-8"))["countries"]]
    events = data.get("events")
    errors = []
    if not isinstance(events, list):
        print("NG: events が配列ではない")
        return 1

    today = today_jst()
    if prune:
        before = len(events)
        events = [e for e in events if dt.date.fromisoformat(e["end"]) >= today - dt.timedelta(days=60)]
        data["events"] = events
        print(f"prune: {before - len(events)} 件を削除（終了から60日超）")

    ids = Counter(e.get("id") for e in events)
    for i, e in enumerate(events):
        tag = f"[{i}] {e.get('name', '?')}"
        for k in REQUIRED:
            if not e.get(k):
                errors.append(f"{tag}: {k} が空")
        if ids[e.get("id")] > 1:
            errors.append(f"{tag}: id が重複（{e.get('id')}）")
        if e.get("country") not in countries:
            errors.append(f"{tag}: country が taxonomy.json に無い（{e.get('country')}）")
        if e.get("field") not in FIELDS:
            errors.append(f"{tag}: field が一覧に無い（{e.get('field')}）")
        if e.get("sourceType") not in SOURCE_TYPES:
            errors.append(f"{tag}: sourceType が不正（{e.get('sourceType')}）")
        for k in ("url", "source"):
            v = e.get(k)
            if v and not URL.match(v):
                errors.append(f"{tag}: {k} がURLでない")
        if e.get("source") and AGGREGATORS.search(e["source"]):
            errors.append(f"{tag}: 出典が一覧サイト（{e['source']}）。主催者・会場の公式で確かめる")
        try:
            s = dt.date.fromisoformat(e["start"])
            en = dt.date.fromisoformat(e["end"])
            if en < s:
                errors.append(f"{tag}: 終了日が開始日より前")
            if (en - s).days > 14:
                errors.append(f"{tag}: 会期が15日以上（日付の誤りの疑い）")
            if s.year > today.year + 3:
                errors.append(f"{tag}: {s.year}年は先すぎる（仏暦のままでは？ 西暦＝仏暦−543）")
        except Exception:
            errors.append(f"{tag}: start/end が YYYY-MM-DD でない")
        text = " ".join(str(e.get(k, "")) for k in ("name", "note", "venue", "city"))
        if re.search(r"25\d\d", text):
            errors.append(f"{tag}: 2500年代の年が残っている（仏暦）")
        if re.search(r"TODO|insufficient|TBA|TBD|未定", text, re.I):
            errors.append(f"{tag}: 作業用・未定の言葉が残っている")

    if errors:
        for m in errors:
            print("NG:", m)
        print(f"{len(errors)} 件の問題")
        return 1

    if prune:
        data["updated"] = today.isoformat()
        PATH.write_text(json.dumps(data, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")

    upcoming = [e for e in events if dt.date.fromisoformat(e["end"]) >= today]
    by = Counter(e["country"] for e in upcoming)
    print("OK", len(events), "件（今後:", len(upcoming), "件）", " / ".join(f"{c} {by.get(c, 0)}" for c in countries))
    return 0


if __name__ == "__main__":
    sys.exit(main())
