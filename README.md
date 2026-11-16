# 東南アジア経済新聞 記事フィード

Claude の定期タスクが記事を書いて `articles/YYYY-MM-DD/<slug>.json` に置き、`feed.json` にまとめて push します。
GitHub Actions（`wp-import`）が毎時 `feed.json` を読み、WordPress（https://aseankeizai.jp ）へ slug で上書き投稿します。
各記事は `publishAt` の時刻に公開されます（未来なら予約投稿）。
記事の手順とルールは `CLAUDE.md` が正です。
