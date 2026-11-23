#!/usr/bin/env python3
"""feed.json を WordPress に取り込む（Review の Wix ジョブ importReviewFeed と同じ役)。
slug で上書き。publishAt で future / publish を決める。IMPORT_MODE=draft なら必ず下書き。"""
import hashlib, html, json, os, sys, time
from datetime import datetime, timedelta, timezone
from pathlib import Path
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

ROOT = Path(__file__).resolve().parent.parent
API = os.environ['WP_URL'].rstrip('/') + '/wp-json/wp/v2'
S = requests.Session()
# サイトは同時アクセスが重なると 503 を返す（記事の中身の問題ではない）。
# 429/502/503/504 は 4→8→16→32秒あけて最大5回やり直す。POST も含める（上書きは slug で冪等）。
_retry = Retry(total=5, backoff_factor=2, status_forcelist=(429, 502, 503, 504),
               allowed_methods=None, respect_retry_after_header=True, raise_on_status=False)
S.mount('https://', HTTPAdapter(max_retries=_retry))
S.mount('http://', HTTPAdapter(max_retries=_retry))
S.auth = (os.environ['WP_USER'], os.environ['WP_APP_PASSWORD'])
S.headers['User-Agent'] = 'aseankeizai-content-import'
DRAFT = os.environ.get('IMPORT_MODE', '').strip() == 'draft'
JST = timezone(timedelta(hours=9))


def _load_publish_from():
    """公開モード（IMPORT_MODE が draft 以外）のときの「切り替え時刻」を返す。
    環境変数 PUBLISH_FROM か config/publish_from.txt（1行・ISO形式。時刻だけならJST）。
    この時刻より前の publishAt の記事は、公開モードでも下書きのまま（並行稼働中の古い下書きを誤って出さない）。
    どちらも無ければ None。"""
    raw = os.environ.get('PUBLISH_FROM', '').strip()
    f = ROOT / 'config' / 'publish_from.txt'
    if not raw and f.exists():
        lines = f.read_text(encoding='utf-8').strip().splitlines()
        raw = lines[0].strip() if lines else ''
    if not raw:
        return None
    dt = datetime.fromisoformat(raw)
    return dt if dt.tzinfo else dt.replace(tzinfo=JST)


PUBLISH_FROM = None
if not DRAFT:
    PUBLISH_FROM = _load_publish_from()
    if PUBLISH_FROM is None:
        # 切り替え時刻が決まっていないのに公開モードにすると、古い下書きまで出かねない。安全側に倒す
        print('WARNING: IMPORT_MODE が draft ではないが publish_from が未設定のため、下書きとして取り込む', file=sys.stderr)
        DRAFT = True


def decide_status(when, now):
    """記事の公開状態を決める。draft／future（予約）／publish（即公開）。"""
    if DRAFT:
        return 'draft'
    if PUBLISH_FROM and when < PUBLISH_FROM.astimezone(timezone.utc):
        return 'draft'
    return 'future' if when > now else 'publish'


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
    """タグIDを返す。1つのタグで失敗しても、そのタグだけ飛ばして記事の取り込みは続ける。"""
    ids = []
    for n in names:
        try:
            r = S.get(f'{API}/tags', params={'search': n, 'per_page': 100}).json()
            hit = None
            if isinstance(r, list):
                hit = next((t['id'] for t in r if html.unescape(t['name']) == n), None)
            if hit is None:
                resp = S.post(f'{API}/tags', json={'name': n})
                body = resp.json()
                if isinstance(body, dict) and 'id' in body:
                    hit = body['id']
                elif isinstance(body, dict) and body.get('code') == 'term_exists':
                    # すでにあるタグ：応答の data.term_id にIDが入っている
                    hit = (body.get('data') or {}).get('term_id')
                else:
                    print(f'tag skipped: {n} ({resp.status_code} {resp.text[:120]})', file=sys.stderr)
            if hit is not None:
                ids.append(hit)
        except Exception as e:  # noqa: BLE001
            print(f'tag skipped: {n} ({e})', file=sys.stderr)
    return ids


def media_id(a):
    url = a.get('heroImage')
    if not url:
        return None
    name = f'{a["slug"]}.png'
    try:
        found = S.get(f'{API}/media', params={'search': a['slug'], 'per_page': 5}).json()
        if isinstance(found, list):
            for m in found:
                if m.get('source_url', '').endswith(name):
                    return m['id']
        img = requests.get(url, timeout=60)
        img.raise_for_status()
        r = S.post(f'{API}/media', data=img.content, headers={
            'Content-Type': 'image/png', 'Content-Disposition': f'attachment; filename="{name}"'})
        if r.status_code == 403:
            # サイトの防御（WAF）が生のバイナリ送信を弾く場合があるので、フォーム形式で一度だけ送り直す
            r = S.post(f'{API}/media', files={'file': (name, img.content, 'image/png')})
        if r.status_code >= 300:
            print(f'image skipped: {a["slug"]} ({r.status_code} {r.text[:120]})', file=sys.stderr)
            return None
        return r.json()['id']
    except Exception as e:  # noqa: BLE001
        # 画像が付かなくても記事（下書き）は作る。画像は次回以降の実行でやり直す
        print(f'image skipped: {a["slug"]} ({e})', file=sys.stderr)
        return None


def audit():
    """読み取りだけ。feed の各記事が WordPress にどういう状態で入っているかを表示する（何も書き換えない）。"""
    feed = json.loads((ROOT / 'feed.json').read_text(encoding='utf-8'))
    counts = {}
    problems = []
    for a in feed['articles']:
        r = S.get(f'{API}/posts', params={'slug': a['slug'], 'status': 'any', 'context': 'edit',
                                          '_fields': 'id,status,date_gmt,featured_media,categories,tags'})
        try:
            body = r.json()
        except ValueError:
            body = None
        if not isinstance(body, list):
            print(f'AUDIT ERROR {a["slug"]}: {r.status_code} {r.text[:80]}')
            problems.append((a['slug'], 'lookup-error'))
            continue
        if not body:
            print(f'AUDIT MISSING {a["slug"]}')
            problems.append((a['slug'], 'missing'))
            continue
        p = body[0]
        counts[p['status']] = counts.get(p['status'], 0) + 1
        flags = []
        if not p.get('featured_media'):
            flags.append('no-image')
        if len(p.get('categories') or []) < 2:
            flags.append('categories<2')
        if p['status'] != 'draft':
            flags.append('NOT-DRAFT')
        for f in flags:
            problems.append((a['slug'], f))
        print(f'AUDIT {p["status"]} img={"Y" if p.get("featured_media") else "N"} cats={len(p.get("categories") or [])} '
              f'tags={len(p.get("tags") or [])} {a["publishAt"][:16]} {a["slug"]}' + (f'  <{",".join(flags)}>' if flags else ''))
        time.sleep(0.3)
    kinds = {}
    for _, k in problems:
        kinds[k] = kinds.get(k, 0) + 1
    print(f'AUDIT SUMMARY total={len(feed["articles"])} status={counts} problems={kinds}')


def main():
    if '--audit' in sys.argv:
        audit()
        return
    feed = json.loads((ROOT / 'feed.json').read_text(encoding='utf-8'))
    now = datetime.now(timezone.utc)
    done = 0
    failed = []
    for a in feed['articles']:
        try:
            done += import_one(a, now)
        except Exception as e:  # noqa: BLE001
            # 1本の失敗で、後ろの記事の取り込みを止めない
            print(f'FAILED {a.get("slug")}: {e}', file=sys.stderr)
            failed.append(a.get('slug'))
    print(f'{done} posts created or updated, {len(failed)} failed')
    if failed:
        sys.exit(1)  # 失敗した記事があれば実行を赤にする（ただし他の記事は取り込み済み）


def import_one(a, now):
    """1本を取り込み、作成・更新したら1、何もしなければ0を返す。失敗したら例外を投げる。"""
    body = render(a)
    digest = hashlib.sha256(json.dumps(a, ensure_ascii=False, sort_keys=True).encode()).hexdigest()[:16]
    marker = f'<!-- feed:{digest} -->'
    when = datetime.fromisoformat(a['publishAt']).astimezone(timezone.utc)
    status = decide_status(when, now)
    old = S.get(f'{API}/posts', params={'slug': a['slug'], 'status': 'any', 'context': 'edit'}).json()
    if not isinstance(old, list):
        raise RuntimeError(f'posts lookup failed: {str(old)[:200]}')
    if old and marker in old[0]['content']['raw']:
        p = old[0]
        # 中身は取り込み済み。切り替え後に、公開してよい記事（publish_from 以後）がまだ下書きなら、予約・公開に上げる
        if p['status'] == 'draft' and status != 'draft':
            r = S.post(f'{API}/posts/{p["id"]}', json={'status': status, 'date_gmt': when.strftime('%Y-%m-%dT%H:%M:%S')})
            if r.status_code >= 300:
                raise RuntimeError(f'promote {r.status_code} {r.text[:300]}')
            print('promoted', a['slug'], status)
            time.sleep(1)
            return 1
        # 前回、画像だけ付かなかった記事なら、画像をやり直す
        if not p.get('featured_media') and a.get('heroImage'):
            m = media_id(a)
            if m and S.post(f'{API}/posts/{p["id"]}', json={'featured_media': m}).status_code < 300:
                print('image attached', a['slug'])
                return 1
        return 0
    post = {
        'slug': a['slug'], 'title': a['title'], 'content': body + marker, 'excerpt': a['lead'],
        'status': status, 'date_gmt': when.strftime('%Y-%m-%dT%H:%M:%S'),
        'categories': [i for i in (CAT.get(a['country']), CAT.get(a['category'])) if i],
        'tags': tag_ids(a.get('tags', [])),
    }
    if old:
        p = old[0]
        if p['status'] == 'publish' and status != 'publish':
            post['status'] = 'publish'
        if not p.get('featured_media'):
            m = media_id(a)
            if m:
                post['featured_media'] = m
        r = S.post(f'{API}/posts/{p["id"]}', json=post)
    else:
        m = media_id(a)
        if m:
            post['featured_media'] = m
        r = S.post(f'{API}/posts', json=post)
    if r.status_code >= 300:
        raise RuntimeError(f'{r.status_code} {r.text[:300]}')
    print('upserted', a['slug'], post['status'])
    time.sleep(1)  # 続けて叩くと自分で503を誘発する
    return 1


if __name__ == '__main__':
    main()
