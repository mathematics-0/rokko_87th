# 📚 学習ノート

学校の勉強用教材をまとめて公開できる静的サイトです。  
**PDF・クイズ（四択）・画像** を教科ごとに整理して GitHub Pages で公開できます。

---

## ファイル構成

```
study-site/
├── index.html           ← サイト本体（基本的に編集不要）
├── data/
│   ├── subjects.json    ← 教科と教材の設定ファイル ★ここを編集する
│   ├── math/
│   │   ├── quiz_equations.json
│   │   ├── chapter1.pdf
│   │   └── formulas.png
│   ├── science/
│   │   └── quiz_cells.json
│   ├── english/
│   │   └── quiz_irregular_verbs.json
│   └── social/
│       └── quiz_prefectures.json
└── README.md
```

---

## 教科の追加・編集方法

`data/subjects.json` を編集します。

```json
{
  "title": "学習ノート",
  "subjects": [
    {
      "id": "math",           // URLに使う識別子（英数字・ハイフンのみ）
      "name": "数学",          // 表示名
      "icon": "📐",           // カードに表示する絵文字
      "color": "#4F46E5",     // テーマカラー（HEX形式）
      "materials": [
        {
          "type": "quiz",
          "title": "方程式の基礎",
          "file": "data/math/quiz_equations.json"
        },
        {
          "type": "pdf",
          "title": "第1章まとめ",
          "file": "data/math/chapter1.pdf"
        },
        {
          "type": "image",
          "title": "数式一覧",
          "file": "data/math/formulas.png"
        }
      ]
    }
  ]
}
```

### type の種類

| type    | 用途           | ファイル形式         |
|---------|----------------|----------------------|
| `quiz`  | 四択クイズ     | `.json`              |
| `pdf`   | PDFノート      | `.pdf`               |
| `image` | 画像・図・表   | `.png` `.jpg` `.gif` |

---

## クイズの作り方

`data/<教科ID>/quiz_XXX.json` をこのテンプレートで作成します。

```json
{
  "title": "クイズのタイトル",
  "description": "説明文（省略可）",
  "questions": [
    {
      "question": "問題文をここに書く",
      "choices": [
        "選択肢A",
        "選択肢B",
        "選択肢C",
        "選択肢D"
      ],
      "answer": 0,
      "explanation": "解説文（省略可）"
    },
    {
      "question": "2問目の問題文",
      "choices": ["A", "B", "C", "D"],
      "answer": 2
    }
  ]
}
```

### ポイント

- **`answer`** は正解の番号（0 = A, 1 = B, 2 = C, 3 = D）
- **`explanation`** は省略OK。答え合わせのときに表示されます
- 問題数に制限はありません

---

## GitHub Pages での公開手順

1. このフォルダをそのまま GitHub リポジトリに push する
2. リポジトリの **Settings → Pages** を開く
3. Source を **Deploy from a branch**、ブランチを **main**（または **master**）、フォルダを **/ (root)** に設定
4. 数分後に `https://<ユーザー名>.github.io/<リポジトリ名>/` で公開される

---

## ローカルでの確認方法

`index.html` をダブルクリックしても動作しません（ブラウザのセキュリティ制限）。  
以下のいずれかでローカルサーバーを起動してください。

```bash
# Node.js がある場合
npx serve .

# Python がある場合
python3 -m http.server 8000

# VS Code を使っている場合
# 拡張機能「Live Server」をインストールして「Go Live」ボタンをクリック
```

ブラウザで `http://localhost:5000`（npx serve の場合）または `http://localhost:8000` を開く。

---

## 教科ごとのおすすめカラー

| 教科 | カラーコード |
|------|-------------|
| 数学 | `#4F46E5`（インディゴ）|
| 理科 | `#059669`（エメラルド）|
| 英語 | `#F59E0B`（アンバー）|
| 国語 | `#DC2626`（レッド）|
| 社会 | `#7C3AED`（バイオレット）|
| 音楽 | `#EC4899`（ピンク）|
| 体育 | `#EA580C`（オレンジ）|
