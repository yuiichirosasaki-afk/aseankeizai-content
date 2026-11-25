#!/usr/bin/env node
// 記事ごとのイラスト（1200x630 PNG）を作り、記事の heroImage をイラストに差し替える。
//
// 使い方: node scripts/make_illust.js articles/2026-11-25 [ほかのディレクトリやファイル]
//
// 記事 articles/<日付>/<slug>.json に対して、場面ファイル illust/scenes/<slug>.js があれば
//   images/illust/<slug>.svg と images/illust/<slug>.png を作り、heroImage をその PNG にする。
// 場面ファイルが無い記事、検査に落ちた記事、PNG に変換できなかった記事は、
//   make_images.py の図版（heroImage）をそのまま使う（記事は止めない）。
// 必ず make_images.py のあとに実行する（make_images.py は heroImage を上書きするため）。
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const L = require(path.join(ROOT, 'illust', 'lib.js'));
const RAW = 'https://raw.githubusercontent.com/yuiichirosasaki-afk/aseankeizai-content/main/images/illust/';
const OUT = path.join(ROOT, 'images', 'illust');

function listJson(args) {
  const out = [];
  const walk = (p) => {
    const st = fs.statSync(p);
    if (st.isDirectory()) fs.readdirSync(p).sort().forEach((n) => walk(path.join(p, n)));
    else if (p.endsWith('.json')) out.push(p);
  };
  (args.length ? args : ['articles']).forEach((a) => walk(path.resolve(a)));
  return out;
}

// 載せてはいけないものを止める
function check(svg) {
  const errs = [];
  if (/<image|<script|<foreignObject|<use[^>]+href=|href="(?:https?:|data:)/i.test(svg)) errs.push('外部画像・スクリプト・参照は使わない');
  const texts = [...svg.matchAll(/<text[^>]*>([^<]*)<\/text>/g)].map((m) => m[1]);
  // 最後の text は分類ラベル（frame が付ける）。それ以外は記号1〜2字（例 "%"）だけ許す
  texts.slice(0, -1).forEach((t) => {
    if (/\d/.test(t)) errs.push(`画像に数字を入れない（${t}）`);
    else if ([...t].length > 2) errs.push(`画像に文字を入れない（${t}）`);
  });
  if (!/^<svg[\s\S]*<\/svg>$/.test(svg.trim())) errs.push('SVG の形が壊れている');
  return errs;
}

// 同梱の日本語フォント（assets/fonts）も使えるようにする
function fontEnv() {
  const conf = path.join(os.tmpdir(), 'aseankeizai-fonts.conf');
  fs.writeFileSync(conf, `<?xml version="1.0"?><!DOCTYPE fontconfig SYSTEM "fonts.dtd"><fontconfig><include ignore_missing="yes">/etc/fonts/fonts.conf</include><dir>${path.join(ROOT, 'assets', 'fonts')}</dir></fontconfig>`);
  return { ...process.env, FONTCONFIG_FILE: conf };
}

function toPng(svgPath, pngPath, env) {
  try {
    execFileSync('rsvg-convert', ['-w', '1200', '-h', '630', '-o', pngPath, svgPath], { env, stdio: 'pipe' });
    return fs.statSync(pngPath).size > 5000;
  } catch (e) {
    console.error(`  rsvg-convert で変換できない: ${String(e.message).split('\n')[0]}`);
    return false;
  }
}

function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const env = fontEnv();
  let made = 0, skipped = 0, failed = 0;
  for (const f of listJson(process.argv.slice(2))) {
    const a = JSON.parse(fs.readFileSync(f, 'utf8'));
    const rel = path.relative(ROOT, f);
    const scenePath = path.join(ROOT, 'illust', 'scenes', `${a.slug}.js`);
    if (!fs.existsSync(scenePath)) { console.log(`${rel}: 場面ファイルが無いので図版のまま`); skipped++; continue; }
    let svg;
    try {
      delete require.cache[require.resolve(scenePath)];
      const sc = require(scenePath)(L, a);
      if (!sc || typeof sc.body !== 'string') throw new Error('場面ファイルは {body: "..."} を返す');
      svg = L.frame({ ...sc, label: `${a.country}｜${a.category}` }, sc.body);
    } catch (e) {
      console.error(`${rel}: 場面ファイルの誤り: ${e.message}`); failed++; continue;
    }
    const errs = check(svg);
    if (errs.length) { console.error(`${rel}: ${errs.join(' / ')}`); failed++; continue; }
    const svgPath = path.join(OUT, `${a.slug}.svg`);
    const pngPath = path.join(OUT, `${a.slug}.png`);
    fs.writeFileSync(svgPath, svg);
    if (!toPng(svgPath, pngPath, env)) { failed++; continue; }
    a.heroImage = RAW + `${a.slug}.png`;
    fs.writeFileSync(f, JSON.stringify(a, null, 2) + '\n');
    console.log(`${rel}: images/illust/${a.slug}.png`);
    made++;
  }
  console.log(`イラスト ${made}本 / 場面なし ${skipped}本 / 失敗 ${failed}本（失敗と場面なしは図版のまま）`);
}

main();
