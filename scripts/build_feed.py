#!/usr/bin/env python3
"""articles/ から feed.json を作り直す（publishAt の直近30日、新しい順）。"""
import json
from pathlib import Path
from datetime import datetime, timedelta, timezone

ROOT = Path(__file__).resolve().parent.parent
JST = timezone(timedelta(hours=9))
DAYS = 30

now = datetime.now(JST)
items = []
for p in (ROOT / "articles").glob("*/*.json"):
    a = json.loads(p.read_text(encoding="utf-8"))
    if datetime.fromisoformat(a["publishAt"]) >= now - timedelta(days=DAYS):
        items.append(a)
items.sort(key=lambda a: a["publishAt"], reverse=True)
feed = {"generatedAt": now.isoformat(timespec="seconds"), "site": "東南アジア経済新聞", "articles": items}
(ROOT / "feed.json").write_text(json.dumps(feed, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"feed.json: {len(items)} articles")
