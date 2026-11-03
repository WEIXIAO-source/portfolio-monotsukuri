/* ウェブデザイン 第4回 練習(完成例)(index.html で読み込む)
   STEP を1つずつ有効にして(先頭の // を消して)、保存 → ブラウザで確かめる。
   開発者ツール(F12)の「コンソール」タブを開いておくこと。 */

/* ---- STEP 1 コンソールに表示する ---- */
console.log("JavaScript が動いています");

/* ---- STEP 2 HTMLの中身を書きかえる(DOM) ----
   footer の <span id="year"></span> に、今年の西暦を入れる */
const year = document.querySelector("#year");
year.textContent = new Date().getFullYear();

/* ---- STEP 3 クリックに反応する(イベント) ----
   「もっと読む」ボタンを押すと、プロフィールの続きが開く */
const button = document.querySelector("#more");
const detail = document.querySelector("#profile-detail");
button.addEventListener("click", () => {
  detail.hidden = !detail.hidden;
  button.textContent = detail.hidden ? "もっと読む" : "閉じる";
});

/* ---- 発展 ----
   作品カードにマウスを乗せたとき、コンソールに作品名を出す
   document.querySelectorAll(".work-card h3") をすべて取り、forEach で mouseenter を付ける */
