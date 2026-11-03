/* ウェブデザイン 第5回 演習:作品一覧を API から描画する(works.html で読み込む)
   STEP を1つずつ有効にして、保存 → ブラウザで確かめる。
   注意:node server.js で起動し、http://localhost:3000/ で開くこと。 */

/* ---- STEP 1 API から取りに行く(fetch) ---- */
fetch("/api/works")                     // 第4回は "works.json" だった。サーバの API に変える
  .then((response) => response.json())   // 届いた文字列を、配列と辞書に変える
  .then((works) => {
    console.log(works);                   // まずコンソールで中身を見る
    showWorks(works);                     // STEP 2 で作る
  })
  .catch((error) => {
    console.error("API から読めません", error);
  });

/* ---- STEP 2 1件ずつカードにして、ul の中に追加する ---- */
function showWorks(works) {
  const list = document.querySelector("#work-list");
  if (works.length === 0) {
    list.innerHTML = "<li>作品はまだありません</li>";
    return;
  }
  works.forEach((work) => {
    const li = document.createElement("li");
    li.className = "work-card";
    li.innerHTML = `
      <a href="work.html?id=${work.id}">
        <img src="${work.image}" alt="${work.alt}">
        <h3>${work.title}</h3>
        <p>${work.year} / ${work.tools}</p>
      </a>
    `;
    list.appendChild(li);
  });
}


/* ---- 発展 ----
   1. works.json に5件目を足して、HTMLを触らずに一覧が増えることを確かめる
   2. 新しい順に並べる:works.reverse() を forEach の前に入れる
   3. innerHTML に入れる文字列に <script> が入っていたらどうなるか(第6回のXSSの話) */
