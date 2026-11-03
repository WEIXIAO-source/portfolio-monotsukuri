/* ウェブデザイン 第5回 演習:作品詳細を API から描画する(work.html で読み込む)
   URL の ?id=1 を読んで、該当する作品を表示する。 */

/* ---- STEP 1 URL から id を読む ---- */
const params = new URLSearchParams(location.search);
const id = Number(params.get("id"));   // "1" (文字列) → 1 (数値)
console.log("id =", id);

/* ---- STEP 2 works.json から該当する1件を探して表示する ---- */
fetch(`/api/works/${id}`)
  .then((response) => {
    if (!response.ok) {                     // 404 などのとき
      throw new Error(`ステータス ${response.status}`);
    }
    return response.json();
  })
  .then((work) => {                         // API は1件だけ返す(配列ではない)
    document.title = `${work.title} | ものつくり 太郎`;
    document.querySelector("#title").textContent = work.title;
    document.querySelector("#image").src = work.image;
    document.querySelector("#image").alt = work.alt;
    document.querySelector("#year").textContent = work.year;
    document.querySelector("#tools").textContent = work.tools;
    document.querySelector("#role").textContent = work.role;
    document.querySelector("#what").textContent = work.what;
    document.querySelector("#point").textContent = work.point;
  })
  .catch((error) => {
    document.querySelector("main").innerHTML = "<p>その作品は見つかりません。</p>";
    console.error(error);
  });
