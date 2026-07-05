# Synthetic Studio

A sourced field guide to how AI image generation is being integrated into commercial photography for websites and social media, 2025/2026, across five categories: portrait, product, food, lifestyle, fashion.

No build step, no framework. Plain HTML/CSS/JS, one shared `js/render.js` fetching per-category `data/*.json` and templating cards into the page, deployed straight to GitHub Pages.

## Files

| File | Role |
|---|---|
| `index.html` + `data/overview.json` | Landing page: cross-cutting synthesis, platform policy/regulation, model release timeline |
| `portrait.html` / `product.html` / `food.html` / `lifestyle.html` / `fashion.html` + matching `data/*.json` | One page per category: trends, tools, campaigns/cases, controversy |
| `tools.html` | Cross-category tool directory, derived from the same category data, filterable by category |
| `glossary.html` + `data/glossary.json` | Definitions for recurring terms (Nano Banana, digital twin, C2PA, AI slop, etc.) |
| `research/2025-2026-sources.md` | The full research report every page's citations trace back to |
| `js/render.js` | Shared fetch + card-templating logic used by every content page |

## Editing content

Every card on every page (trends, tools, campaigns, controversies) comes from the matching `data/*.json` file. Edit the JSON, not the HTML, to change page content. Each item can carry a `sources: [{label, url}]` array for citation links, and an optional `flagged: true` to mark a claim as unverified/weakly sourced.

## Deploy

1. `gh repo create synthetic-studio --public --source=. --remote=origin --push`
2. Settings > Pages > Deploy from branch > main, root
3. Live at `https://<user>.github.io/synthetic-studio/`

## House style

Design tokens match binyoun.com: `#0b0b0b` ground, Space Grotesk, JetBrains Mono, terracotta `#c1440e`. No em-dashes anywhere in this repo.
