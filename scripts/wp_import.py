#!/usr/bin/env python3
"""feed.json を WordPress に取り込む（Review の Wix ジョブ importReviewFeed と同じ役)。
slug で上書き。publishAt で future / publish を決める。IMPORT_MODE=draft なら必ず下書き。"""
import hashlib, html, json, os, sys
from datetime import datetime, timezone
from pathlib import Path
import requests

ROOT = Path(__file__).resolve().parent.parent
API = os.environ['WP_URL'].rstrip('/') + '/wp-json/wp/v2'
S = requests.Session()
S.auth = (os.environ['WP_USER'], os.environ['WP_APP_PASSWORD'])
S.headers['User-Agent'] = 'aseankeizai-content-import'
DRAFT = os.environ.get('IMPORT_MODE', '').strip() == 'draft'
TAX = json.loads((ROOT / 'taxonomy.json').read_text(encoding='utf-8'))
CAT = {c['name']: c.get('wpCategoryId') for c in TAX['countries'] + TAX['categories']}


def render(a):
    src = ''.join(
        f'<li>{html.escape(s["name"])}「<a href="{html.escape(s["url"])}"'
        f' rel="nofollow noopener" target="_blank">{html.escape(s["title"])}</a>」'
        f'（{html.escape(s["date"])}）</li>' for s in a['sources'])
    return (f'<p class="lead">{html.escape(a["lead"])}</p>'
            f'<h2>要点</h2>{a["summaryHtml"]}'
            f'{a["bodyHtml"]}'
            f'<h2>出典</h2><ul class="sources">{src}</ul>')


def tag_ids(names):
    ids = []
    for n in names:
        r = S.get(f'{API}/tags', params={'search': n, 'per_page': 100}).json()
        hit = next((t['id'] for t in r if html.unescape(t['name']) == n), None)
        if hit is None:
            hit = S.post(f'{API}/tags', json={'name': n}).json()['id']
        ids.append(hit)
    return ids


def media_id(a):
    url = a.get('heroImage')
    if not url:
        return None
    name = f'{a["slug"]}.png'
    found = S.get(f'{API}/media', params={'search': a['slug'], 'per_page': 5}).json()
    for m in found:
        if m.get('source_url', '').endswith(name):
            return m['id']
    img = requests.get(url, timeout=60)
    img.raise_for_status()
    r = S.post(f'{API}/media', data=img.content, headers={
        'Content-Type': 'image/png', 'Content-Disposition': f'attachment; filename="{name}"'})
    r.raise_for_status()
    return r.json()['id']


def main():
    feed = json.loads((ROOT / 'feed.json').read_text(encoding='utf-8'))
    now = datetime.now(timezone.utc)
    done = 0
    for a in feed['articles']:
        body = render(a)
        digest = hashlib.sha256(json.dumps(a, ensure_ascii=False, sort_keys=True).encode()).hexdigest()[:16]
        marker = f'<!-- feed:{digest} -->'
        when = datetime.fromisoformat(a['publishAt']).astimezone(timezone.utc)
        status = 'draft' if DRAFT else ('future' if when > now else 'publish')
        post = {
            'slug': a['slug'], 'title': a['title'], 'content': body + marker, 'excerpt': a['lead'],
            'status': status, 'date_gmt': when.strftime('%Y-%m-%dT%H:%M:%S'),
            'categories': [i for i in (CAT.get(a['country']), CAT.get(a['category'])) if i],
            'tags': tag_ids(a.get('tags', [])),
        }
        old = S.get(f'{API}/posts', params={'slug': a['slug'], 'status': 'any', 'context': 'edit'}).json()
        if old:
            p = old[0]
            if marker in p['content']['raw']:
                continue
            if p['status'] == 'publish' and status != 'publish':
                post['status'] = 'publish'
            r = S.post(f'{API}/posts/{p["id"]}', json=post)
        else:
            m = media_id(a)
            if m:
                post['featured_media'] = m
            r = S.post(f'{API}/posts', json=post)
        if r.status_code >= 300:
            print(a['slug'], r.status_code, r.text[:300], file=sys.stderr)
            continue
        done += 1
        print('upserted', a['slug'], post['status'])
    print(f'{done} posts created or updated')


if __name__ == '__main__':
    main()
