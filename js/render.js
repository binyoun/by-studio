function esc(s) {
  const d = document.createElement("div");
  d.textContent = s == null ? "" : String(s);
  return d.innerHTML;
}

function sourcesHtml(sources) {
  if (!sources || !sources.length) return "";
  return `<div class="sources">${sources
    .map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a>`)
    .join("")}</div>`;
}

function flagHtml(flagged) {
  return flagged ? `<span class="flag">unverified</span>` : "";
}

function trendCard(t) {
  return `<article class="card">
    <h3>${esc(t.title)} ${flagHtml(t.flagged)}</h3>
    <p class="body-text">${esc(t.body)}</p>
    ${sourcesHtml(t.sources)}
  </article>`;
}

function campaignCard(c) {
  return `<article class="card">
    <span class="tag">${esc(c.brand)}</span>
    <h3>${esc(c.title)}</h3>
    <p class="body-text">${esc(c.body)}</p>
    ${sourcesHtml(c.sources)}
  </article>`;
}

function controversyCard(c) {
  return `<article class="card">
    <h3>${esc(c.title)}</h3>
    <p class="body-text">${esc(c.body)}</p>
    ${sourcesHtml(c.sources)}
  </article>`;
}

function toolCard(t) {
  return `<article class="card tool">
    <a class="name" href="${esc(t.url)}" target="_blank" rel="noopener">${esc(t.name)}</a>
    <span class="body-text note">${esc(t.note || "")}</span>
    ${(t.categories || []).map((c) => `<span class="tag">${esc(c)}</span>`).join("")}
  </article>`;
}

function renderList(containerId, items, cardFn) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (!items || !items.length) {
    el.innerHTML = `<p class="body-text">Nothing catalogued here yet.</p>`;
    return;
  }
  el.innerHTML = `<div class="card-grid">${items.map(cardFn).join("")}</div>`;
}

async function loadCategoryPage(jsonPath) {
  const data = await (await fetch(jsonPath)).json();
  const titleEl = document.getElementById("cat-title");
  const introEl = document.getElementById("cat-intro");
  if (titleEl) titleEl.textContent = data.category;
  if (introEl) introEl.textContent = data.intro || "";
  document.title = `${data.category} — Synthetic Studio`;

  renderList("trends", data.trends, trendCard);
  renderList("campaigns", data.campaigns, campaignCard);
  renderList("controversies", data.controversies, controversyCard);
  renderList("tools", data.tools, toolCard);
  return data;
}

async function loadAllTools(categoryFiles) {
  const all = [];
  const seen = new Set();
  for (const file of categoryFiles) {
    const data = await (await fetch(file)).json();
    for (const t of data.tools || []) {
      const key = t.name + "|" + t.url;
      if (seen.has(key)) continue;
      seen.add(key);
      all.push(t);
    }
  }
  all.sort((a, b) => a.name.localeCompare(b.name));
  return all;
}

async function loadGlossary(jsonPath) {
  const terms = await (await fetch(jsonPath)).json();
  const el = document.getElementById("glossary-list");
  if (!el) return;
  el.innerHTML = terms
    .map(
      (t) => `<article class="card">
        <h3>${esc(t.term)}</h3>
        <p class="body-text">${esc(t.definition)}</p>
      </article>`
    )
    .join("");
}
