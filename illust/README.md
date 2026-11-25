# 記事イラスト

記事ごとに、内容を表すフラットなイラスト（1200×630）を描いてアイキャッチにする。
2026-11-25 に佐々木さんが承認したテイスト（日経風の落ち着いた配色、紺・赤・金）。

## 流れ

1. 記事を書いたら、`illust/scenes/<slug>.js` に場面を書く（下の形式）。
2. `node scripts/make_illust.js articles/YYYY-MM-DD` — `images/illust/<slug>.png` を作り、記事の
   `heroImage` をイラストに差し替える。**必ず `make_images.py` のあとに実行する。**
3. できた PNG を Read で開いて目で確かめる（はみ出し・重なり・意味の取り違え）。おかしければ直して 2 に戻る。
4. 場面が書けない・変換できない記事は、`make_images.py` の図版のまま出してよい（記事は止めない）。

## 守ること

- **実在の人物の顔や似顔絵を描かない。** 人物は `person()`（顔のない記号）だけ。
- **企業のロゴ・商標・キャラクターを描かない。** 企業は建物・製品・記号で表す。
- **数字と文字を画像に入れない。** 本文と食い違わないため。`make_illust.js` が数字・3字以上の文字を止める。
  記号は `tag()` の「%」だけ使ってよい。量の違い（増えた・減った・何本中何本）は棒・コインの山・並べた四角の数で表す。
- 記事の事実と逆の絵にしない（下落の記事に上向きの矢印、など）。
- 左上の分類ラベル（国｜分野）は `make_illust.js` が記事から自動で付ける。場面では書かない。
- 国旗は記事の当事国だけ。

## 場面ファイルの形式

```js
// illust/scenes/<slug>.js
module.exports = (L, a) => ({          // L = 部品集（lib.js）、a = 記事JSON
  sun: [1060, 140, 60],                 // 任意：太陽 [x, y, 半径]
  top: '#F7F1E6', bot: '#EBDCC2',       // 任意：空のグラデーション
  body: L.hills(470) + L.ground(470) + L.factory(80, 530, 1.3),
});
```

`body` は SVG の文字列。後に書いたものが手前に重なる（背景 → 地面 → 主役 → 前景の順に書く）。
座標は左上が (0,0)、右下が (1200,630)。左上 (40,40)〜(480,90) はラベルが乗るので空けておく。

見本：`illust/examples.js`（既存記事30本に付けた場面）。似た話題があれば組み立てをまねる。

## 部品（x, y は足元の位置、s は倍率）

背景・地面
- `hills(y, 色)` 遠くの山並み / `ground(y, 色)` 地面（y から下を塗る）/ `floor(y)` 室内の床色
- `sea(y, [[x,y,長さ],…])` 海と波線 / `waves([...])` 波線だけ / `clouds([[x,y,s],…])`

都市・国
- `skyline(国, x, y, s, 色)` 国の目印。国は `'my'`ツインタワー `'sg'`マリーナ地区 `'id'`モナス `'vn'`高層ビル `'ph'`ビル群 `'th'`寺院の屋根
- `blocks(x, y, [[dx, 幅, 高さ, 色?],…], 色)` 窓のあるビル群
- `flag(国, x, y, s, ポールの長さ | false)` 国旗。`id my sg th vn ph us cn fr no la`。false ならポールなし

エネルギー・産業
- `pylon(x,y,s)` 送電鉄塔 / `wire([x1,y1],[x2,y2],たるみ)` 電線 / `turbine(x,y,s)` 風車 / `solar(x,y,幅)` 太陽光パネル
- `factory(x,y,s,窓の色)` 工場（煙つき）/ `gasPlant(x,y,s)` 火力発電所 / `bess(x,y,s)` 蓄電池コンテナ
- `flng(x,y,s)` 洋上LNG設備 / `bulb(x,y,s)` 電球 / `pump(x,y,s)` 給油機（葉の印＝バイオ燃料）/ `bolt(x,y,s,点灯)` 電気の丸印

物流・交通
- `cship(x,y,s,向き)` コンテナ船（向き 1=右, -1=左）/ `lng(x,y,s)` LNG船 / `train(x,y,s,両数)` 貨物列車 / `track(y)` 線路
- `crane(x,y,s,色)` ガントリークレーン / `plane(x,y,s)` 飛行機 / `parcel(x,y,s,色)` 段ボール / `car(x,y,s,色,EVなら true)` / `charger(x,y,s)` 充電器

金融・経済
- `bank(x,y,s)` 中央銀行・取引所の建物 / `board(x,y,幅,高さ,[0〜1の値…],色,{dash:[予測…],dcol,total})` 折れ線のボード
- `candles(x,y,幅,高さ,[[始,終],…])` ローソク足（値は0〜1）/ `bars(x,足元y,幅,[0〜1…],[色…],高さ)` 棒グラフ
- `pie(x,y,半径,割合,色)` 円グラフ / `coins(x,y,枚数,s)` コインの山 / `note(x,y,s,角度,色)` 紙幣
- `safe(x,y,s)` 金庫 / `bell(x,y,s)` 上場の鐘 / `tag(x,y,s,角度)` 「%」の値札 / `arrow(x,y,s,'up'|'down'|'left'|'right',色)` 太い矢印
- `thermo(x,y,s,0〜1)` 温度計（物価）/ `sprout(x,y,s)` 芽（成長）

文書・制度・IT
- `doc(x,y,s,角度,行数,[強調する行…])` 書類 / `stamp(x,y,s)` 承認印 / `gavel(x,y,s)` 木づち / `env(x,y,s)` 封筒 / `warn(x,y,s)` 注意の標識
- `barrier(x,y,幅)` 遮断機（規制・禁止）/ `magnifier(x,y,s)` 虫めがね（調査）
- `chip(x,y,s)` 半導体 / `rack(x,y,s)` サーバーラック / `brain(x,y,s)` AI / `phone(x,y,s,中身のSVG)` スマホ / `signal(x,y,半径,色)` 通信の丸印 / `tower(x,y,s)` 通信塔

人・街
- `person(x,y,s,服の色,帽子の色?)` 人物記号 / `stall(x,y,s,色)` 屋台 / `shop(x,y,s,色)` 店舗 / `house(x,y,s,明かり)` 家 / `palm(x,y,s)` ヤシ
- `route([[始点],[制御点],[終点]],色,矢印)` 点線の流れ / `merge([a],[b],[合流点],色)` 2本が1本に合流

色は `L.C`（`navy red gold teal blue deep green dgreen gray`）。部品が足りなければ `L.g(x,y,s,'<SVG>')` で
その場で描いてよいが、文字・画像・外部参照は使わない。
