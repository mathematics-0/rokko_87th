/* 手書き文字の認識ワーカー
 * Kanji Canvas (https://github.com/asdfjkl/kanjicanvas) © Dominik Klein, MIT License
 * 重い計算をメイン画面から切り離すため Web Worker で動かす */
self.window = self;
self.document = { addEventListener() {}, getElementById() { return {}; } };
console.log = function () {};            // kanji-canvas.js のデバッグ出力を抑える
importScripts('kanji-canvas.js', 'kanji-ref.js');

const KC = self.KanjiCanvas;
self.postMessage({ type: 'ready', chars: KC.refPatterns.map(r => r[0]) });

// strokes: [[ [x,y], ... ], ...]  座標は 0〜256 の正方形
self.onmessage = e => {
  const { id, strokes } = e.data;
  let cands = [];
  try {
    if (strokes && strokes.length) {
      // kanji-canvas.js 本来の記録形式（移動ごとに「前の点・今の点」のペアを積む）に合わせる
      KC.recordedPattern_w = strokes.map(s => {
        const o = [s[0]];
        for (let i = 1; i < s.length; i++) { o.push(s[i - 1]); o.push(s[i]); }
        return o;
      });
      const mn = KC.momentNormalize('w');
      const f  = KC.extractFeatures(mn, 20.);
      const c  = KC.coarseClassification(f);
      cands = KC.fineClassification(f, c).split(/\s+/).filter(Boolean);
    }
  } catch (err) { cands = []; }
  self.postMessage({ type: 'result', id, cands });
};
