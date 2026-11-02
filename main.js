// works.json から作品一覧を読み込み、カードを自動生成します。
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector("#works-list");
  const status = document.querySelector("#works-status");
  if (!container) return;

  try {
    const response = await fetch("works.json");
    if (!response.ok) throw new Error("works.json を読み込めませんでした。");
    const works = await response.json();
    console.log("works.json の読み込み結果:", works); // STEP 1：配列を確認

    // 新しい作品を先に表示したい場合は、次の行のコメントを外してください。
    // works.reverse();

    // STEP 2：作品データからカードを作成
    if (works.length === 0) {
      if (status) status.textContent = "現在、表示できる作品はありません。";
      return;
    }

    container.innerHTML = works.map((work) => `
      <article class="work-card">
        <a class="work-image" href="work.html?id=${encodeURIComponent(work.id)}"
           aria-label="${escapeHTML(work.title)}の詳細を見る">
          <img src="${escapeHTML(work.image)}" alt="${escapeHTML(work.alt || work.title)}">
        </a>
        <div class="work-copy">
          <p class="work-category">${escapeHTML(work.year || "WORK")}</p>
          <h2><a class="card-title-link" href="work.html?id=${encodeURIComponent(work.id)}">${escapeHTML(work.title)}</a></h2>
          <p>${escapeHTML(work.summary || "")}</p>
        </div>
      </article>
    `).join("");
    if (status) status.textContent = "";
  } catch (error) {
    console.error(error);
    if (status) status.textContent = "作品を読み込めませんでした。Live Serverで開いているか確認してください。";
  }
});

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}
