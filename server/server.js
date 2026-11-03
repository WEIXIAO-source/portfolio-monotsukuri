/* ウェブデザイン 第5回 演習:作品データを返す API サーバ
   スライドを見ながら、STEP 1 から順に、見出しの下に自分で打ち込む。
   1つ書いたら保存して、ブラウザで確かめてから次の STEP へ進む。

   起動:ターミナルで  node --watch server.js  (保存するたびに自動で再起動)
   停止:Ctrl + C */

/* ---- STEP 1 Express を読み込んで、サーバを起動する ---- */
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

const PORT = 3000;
// 1. require で3つの部品を読み込み、それぞれ変数に入れる:express、path、fs
// 2. express() でサーバ本体を作り、変数 app に入れる
// 3. ポート番号 3000 を変数 PORT に入れる
// 4. 起動(app.listen)は、このファイルの一番下に書く
// 確かめる:ターミナルに「サーバを起動しました」。ブラウザで / → Cannot GET /(これで正しい)



/* ---- STEP 2 決まった文字を返す ---- */
app.get("/hello", (req, res) => {
    res.send("こんにちは。サーバが応答しています");
});
// 1. app.get で "/hello" に応答する
// 2. res.send で「こんにちは。サーバが応答しています」を返す
// 確かめる:/hello → 文字が出る。/hello2 → Cannot GET(書いた URL にしか応答しない)



/* ---- STEP 3 public フォルダの HTML・CSS・JS を返す ---- */
app.use(express.static(path.join(__dirname, "public")));
// 1. app.use と express.static で、public フォルダの中身をそのまま返す
// 2. フォルダの場所は path.join(__dirname, "public") で作る
// 確かめる:/ → トップページ。/works.html → 一覧は空(Network で /api/works が 404)



/* ---- STEP 4 GET /api/works  作品一覧を返す ---- */
function loadWorks() {
    const filePath = path.join(__dirname, "data", "works.json");
    const json = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(json);
}

app.get("/api/works", (req, res) => {
    const works = loadWorks();
    res.json(works);
});
// 1. data/works.json を読んで配列にする関数 loadWorks を作る
//    使うもの:fs.readFileSync、path.join、JSON.parse
// 2. app.get で "/api/works" に応答し、res.json で配列を返す
// 確かめる:/api/works → JSON の配列、/works.html → カード4枚


app.get("/api/works/:id", (req, res) => {
    const id = req.params.id;
    const works = loadWorks();
    const work = works.find((item) => item.id === id);

    if (!work) {
    return res.status(404).json({ error: "作品が見つかりません" });
}

    res.json(work);
});
/* ---- STEP 5 GET /api/works/:id  作品を1件返す ---- */
// 1. app.get で "/api/works/:id" に応答する
// 2. URL の :id は req.params.id に入る。Number で数に変える
// 3. loadWorks で配列を読み、find で id が一致する1件を探して res.json で返す
// 確かめる:/api/works/2 → 1件の JSON。/api/works/99 → 画面は真っ白、Network は 200(おかしい)

/*      STEP 6 見つからなければ 404 を返す(STEP 5 の中、res.json の前に書き足す) */
// 1. 見つからなかったら(!work)、res.status(404) で 404 にして、
//    { error: "作品が見つかりません" } を res.json で返す
// 2. return でそこで終わる(下の res.json に進まない)
// 確かめる:/api/works/99 → 404 と {"error": …}



/* ---- 起動(STEP 1 で書く。いつもファイルの一番下) ---- */
app.listen(PORT, () => {
    console.log("サーバを起動しました");
});
// app.listen(PORT, …) で待ち受けを始め、console.log で「サーバを起動しました」と出す


