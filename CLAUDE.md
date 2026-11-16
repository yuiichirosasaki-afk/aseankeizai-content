# 東南アジア経済新聞 — 記事作成の手順書

このリポジトリは東南アジア経済新聞（https://aseankeizai.jp ）の記事フィードです。GitHub
Actions が毎時 `feed.json` を読み、WordPress に予約投稿します。各記事は `publishAt` の時
刻に公開されます。

読者は東南アジアで仕事をする日本人ビジネスパーソン（駐在員、経営者、投資・進出の担当者）。文
体は日本の経済紙のように、である調で簡潔に。煽らない。

人の確認はありません。誰も承認せず、誰にも通知されません。品質と法的な安全は、以下のルールと
`validate.py` だけで守ります。

## 実行手順（1回ごと）

1. `python3 scripts/recent_slugs.py` — 直近30日の記事（重複防止）と、直近7日の国別・
分野別の本数を表示する。
2. 直近48時間のニュースを調べる。国は `taxonomy.json` の `countries`、分野は
`categories`。直近7日で本数の少ない国・分野を優先するが、ニュースの質が先。日系企業に関わる
話題は優先度を上げる。
    WebSearch（現地語・英語・日本語）と WebFetch で元の記事を必ず開いて読む。一次情報（政
府、中央銀行、統計局、証券取引所、企業の発表）を優先し、信頼できる報道機関を少なくとも1つ併
用する。
    主な報道機関：インドネシア（Kontan、Bisnis.com、Katadata、CNBC Indonesia、The
Jakarta Post）、ベトナム（VnExpress、Tuoi Tre、VietnamPlus）、タイ（Bangkok Post、
The Nation、Prachachat）、フィリピン（BusinessWorld、Philippine Daily Inquirer、
PhilStar）、マレーシア（The Edge、The Star、New Straits Times）、シンガポール（The
Business Times、The Straits Times、CNA）、地域全体（Reuters、Nikkei Asia、
DealStreetAsia）。
3. 1回の実行で最大 **5本**書く。同じ回で同じ国×分野を重ねない。ルールを満たすニュースがな
ければ、書ける本数だけでよい。枠を埋めるためにニュースを作らない。
4. 各記事を `articles/YYYY-MM-DD/<slug>.json`（日付は公開日、JST）に
`schema/article.schema.json` のとおり保存する。
5. `python3 scripts/make_images.py articles/YYYY-MM-DD` — 図版
（`images/<slug>.png`）を作り `heroImage` を入れる。
6. `python3 scripts/validate.py articles/YYYY-MM-DD` — すべて OK になるまで直す。
直せない記事は削除する。
7. `python3 scripts/build_feed.py` — `feed.json` を作り直す。
8. `images/` を含めて `main` に commit・push。メッセージは `Articles YYYY-MM-DD HH:MM
(n)`。メッセージ、Slack、メールは送らない。

## 記事の形式

- `articleType`：`news`（ニュース＋背景）、`analysis`（解説を厚く）、`explainer`（制度
や市場の解説）。標準は `news`。
- `country`：`taxonomy.json` の `countries` から1つ。複数国にまたがる話題は `ASEAN`。
- `category`：`taxonomy.json` の `categories` から1つ。
- `title`：具体的で、数字か固有名詞を含む。25〜50字。疑問形だけの見出しや煽りは禁止。
- `lead`：2〜3文、100〜200字。何が起き、なぜ重要か。
- `summaryHtml`（要点）：`<ul><li>` で事実を3〜5点。すべて出典にある事実を自分の言葉で。
- `bodyHtml`（本文）：`<h3>` の小見出しを2〜4つ。背景、数字の比較、日系企業への影響、今後
の見通し。推測は「とみられる」「注目される」などと明示する。600字以上。
- `dataFigure` / `dataLabel` / `dataSource`：図版に載せる数字1つ（例：「5.1%」「7〜9
月期のGDP成長率」「インドネシア中央統計局、2026年11月5日」）。`dataFigure` は10字以内。
- `chart`（任意）：時系列や比較が出典にあるとき
`{"bars": [{"label": "7-9月", "value": 5.1, "display": "5.1%"}]}`。2〜6本、label 6字以
内、display 8字以内。値はすべて出典にあるもの。
- `sources`：2〜5件 `{name, title, url, date}`。実際に開いたURLだけ。
- `seoTitle` 32字以内、`seoDescription` 120字以内。
- `slug`：英小文字のキーワードをハイフンでつなぐ、80字以内、重複不可（例：indonesia-
gdp-q3-2026-5-1-percent）。
- `publishAt`：JST（+09:00）。実行時刻から30分以降、同じ回の記事は30分間隔でずらす。強い
記事を先に。
- `tags`：3〜8個（企業名、人名、制度名など）。
- HTML は `p, ul, ol, li, h3, strong, em, a` だけ。インラインの `style`、画像、
`<h1>` `<h2>` は使わない。

## 編集ルール（過去の事故から）

1. **仏暦**：タイの元記事の年は仏暦のことがある。西暦＝仏暦−543 に直す。2500年代の年を記
事に残さない。
2. **円換算**：外貨の金額には初出で円換算を付ける（例：「50兆ルピア（約4,700億円）」）。レー
トは開いた出典や公表レートのものを使い、「約」を付ける。
3. **未完成の残り**：「insufficient」「TODO」などの作業用の言葉や、空の小見出しを残さな
い。
4. **重複**：直近30日に書いた出来事は、大きな新展開がない限り書かない。書く場合は続報とし
て新しい事実を中心にする。
5. **固有名詞**：企業名・人名は初出で現地語または英語の表記を併記する。

## 公開ルール（必ず守る）

1. **事実は出典からだけ**。数字、日付、人名、企業名、発言は、開いた出典にあるものだけ。出典
どうしが食い違う場合はそう書く。保存前にもう一度照らし合わせる。
2. **引用は短く**。直接引用は1出典につき1か所、短く（日本語なら50字未満、原文なら15語未
満）。それ以外は自分の言葉で書き、元記事の構成をなぞらない。
3. **自分の解説が半分以上**（`bodyHtml` が `summaryHtml` より長い）。
4. **情報漏えいの被害企業**は、企業自身か当局が認めた場合だけ名前を出す。それ以外は「ある〇
〇業の企業」とし、主張の出どころを書く。
5. **名誉毀損をしない**。裁判所・当局・本人が述べた範囲を超えて、犯罪や不正を断定しない。
6. **投資助言をしない**。個別銘柄の売買を勧めない。
7. **政治的な意見を書かない**。政策は中立に、ビジネスへの影響として伝える。

## コスト

1本あたりの検索は3〜6回。引用する記事だけを開く。1回の実行は5本まで。
