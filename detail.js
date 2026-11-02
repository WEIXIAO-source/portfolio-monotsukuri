// URL の ?id=... を使って、選択された作品の詳細を表示します。
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector("#work-detail");
  const status = document.querySelector("#detail-status");
  if (!container) return;

  const id = new URLSearchParams(window.location.search).get("id");
  try {
    const response = await fetch("works.json");
    if (!response.ok) throw new Error("works.json を読み込めませんでした。");
    const works = await response.json(); // STEP 1：作品データを読み込む
    console.log("詳細ページ用の作品データ:", works);
    const work = works.find((item) => item.id === id) || works[0]; // STEP 2：対象作品を探す

    if (!work) {
      if (status) status.textContent = "表示できる作品がありません。";
      return;
    }

    document.title = `${work.title} | SWEET WORKS`;
    container.innerHTML = `
      <section class="section-wrap page-intro">
        <p class="eyebrow">WORK DETAILS</p>
        <h1>${escapeHTML(work.title)}</h1>
        <p>${escapeHTML(work.summary || "")}</p>
      </section>
      <section class="section-wrap detail-layout">
        <figure class="detail-image">
          <img src="${escapeHTML(work.image)}" alt="${escapeHTML(work.alt || work.title)}">
          <figcaption>${escapeHTML(work.title)}</figcaption>
        </figure>
        <div class="detail-copy">
          <section class="detail-section"><h2>作品について</h2><p>${escapeHTML(work.what || work.summary || "")}</p></section>
          <section class="detail-section"><h2>工夫した点</h2><p>${escapeHTML(work.point || "作品の特徴や制作時に工夫した点を記載してください。")}</p></section>
          <section class="detail-section">
            <h2>制作情報</h2>
            <p><strong>制作年：</strong>${escapeHTML(work.year || "未設定")}</p>
            <p><strong>担当：</strong>${escapeHTML(work.role || "未設定")}</p>
            <p><strong>使用した道具：</strong>${escapeHTML(Array.isArray(work.tools) ? work.tools.join("、") : (work.tools || "未設定"))}</p>
          </section>
        </div>
      </section>`;
    if (status) status.textContent = "";
  } catch (error) {
    console.error(error);
    if (status) status.textContent = "作品の詳細を読み込めませんでした。Live Serverで開いているか確認してください。";
  }
});

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}
