#!/usr/bin/env python3
"""直近30日の記事（重複防止）と、直近7日の国別・分野別の本数（今回の狙いを決める）を表示する。"""
import json
from collections import Counter
from pathlib import Path
from datetime import datetime, timedelta, timezone

ROOT = Path(__file__).resolve().parent.parent
JST = timezone(timedelta(hours=9))
now = datetime.now(JST)
tax = json.loads((ROOT / "taxonomy.json").read_text(encoding="utf-8"))
rows, by_country, by_category = [], Counter(), Counter()
for p in (ROOT / "articles").glob("*/*.json"):
    a = json.loads(p.read_text(encoding="utf-8"))
    t = datetime.fromisoformat(a["publishAt"])
    if t >= now - timedelta(days=30):
        rows.append((a["publishAt"][:10], a.get("country", ""), a.get("category", ""),
                     a.get("title", ""), ", ".join(a.get("tags", [])[:5])))
    if t >= now - timedelta(days=7):
        by_country[a.get("country", "")] += 1
        by_category[a.get("category", "")] += 1
for r in sorted(rows, reverse=True):
    print(" | ".join(r))
print(f"（直近30日で {len(rows)} 本）\n")
print("直近7日の国別（少ない順）:")
print("  " + ", ".join(f"{c['name']} {by_country[c['name']]}"
                       for c in sorted(tax["countries"], key=lambda c: by_country[c["name"]])))
print("直近7日の分野別（少ない順）:")
print("  " + ", ".join(f"{c['name']} {by_category[c['name']]}"
                       for c in sorted(tax["categories"], key=lambda c: by_category[c["name"]])))
