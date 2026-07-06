# BY Studio

A photography teaching hub: the fundamentals that don't change, and the trends that change every year.

No build step, no framework. Plain HTML/CSS/JS, shared `css/style.css` and `js/render.js` at the repo root, each section fetches its own `data.json` (or `data/*.json`) and templates cards into the page, deployed straight to GitHub Pages.

## Status as of 2026-07-05

All five sections are live and verified (served locally, checked in headless Chrome for console errors, real content confirmed rendering, not just page-load success). Live at `https://binyoun.github.io/by-studio/`.

This session's work, in order: built the site from the earlier standalone Synthetic Studio repo (moved in as `ai-trends/`), added Camera Basics/Genres/Composition/Explorer, expanded Composition from 8 to 14 principles, expanded Explorer from 25 photographers to 35 (added 10 studios/brands with 22 verified named campaign examples to fill out the thin Product/Food genres), then made the landing page interactive (a client-side search indexing all 174 data entries site-wide, live stat counts, a surprise-me picker) and fixed two real bugs found along the way:

- `.card-grid` was CSS Grid with `auto-fill`, so an incomplete last row (fewer cards than a full row) pinned left with a dead gap instead of centering. Fixed by switching to flexbox with `justify-content: center`.
- That fix exposed a pre-existing double-nesting bug: `renderList()` in `js/render.js` always wraps its output in a fresh `<div class="card-grid">`, but several page containers also had `class="card-grid"` applied directly, nesting one grid inside another. The old CSS Grid version accidentally masked this (a lone grid item just stretched to fill the row); centering broke that accidental workaround. Fixed by removing the redundant class at the 7 affected containers (kept only where content is written directly without going through `renderList`, i.e. `ai-trends/index.html`'s synthesis block and `ai-trends/glossary.html`).

Known open items for whenever this picks back up:
- A handful of citation URLs in `ai-trends/` and `explorer/data.json` return 403/406 to automated `curl` checks (Business Standard, Campaign US, PYMNTS, and others), almost certainly bot-blocking rather than dead links, real browsers load them fine, but worth a manual spot-check before relying on them for class.
- Camera Basics/Genres/Composition page copy is original writing but hasn't had a second editing pass for voice, unlike `ai-trends/` which went through a dedicated research phase.
- GitHub Pages builds for this repo have intermittently errored or stalled well past their usual ~30 second build time. If a push doesn't show up live after a few minutes, check `gh api repos/binyoun/by-studio/pages/builds/latest` and retrigger with `gh api -X POST repos/binyoun/by-studio/pages/builds` if needed, this has resolved it every time so far.

## Sections

| Section | Content |
|---|---|
| `index.html` | BY Studio landing, links into all five sections |
| `camera-basics/` | The exposure triangle, shutter speed, aperture/depth of field, ISO, white balance, focal length, metering |
| `genres/` | Portrait, product, food, fashion, lifestyle, street, landscape, architecture, sports/action, macro. The first five link through to their `ai-trends/` page |
| `composition/` | Rule of thirds, leading lines, framing, symmetry, negative space, depth, color, balance, golden ratio, rule of space, perspective, juxtaposition, fill the frame, rhythm |
| `explorer/` | 35 photographers, studios, and companies, filterable by type (photographer/studio/brand), genre, and theme, a deliberately global mix spanning historical and contemporary work, including F&B and agency examples (Oatly, Chobani, Pentagram) to fill out Product and Food |
| `ai-trends/` | A sourced 2025/2026 field guide to AI image generation in commercial photography (portrait, product, food, lifestyle, fashion), formerly the standalone Synthetic Studio site. See `ai-trends/research/2025-2026-sources.md` for the full citation list. |

## Editing content

Every card comes from a `data.json` (or `ai-trends/data/*.json`) file next to its page. Edit the JSON, not the HTML, to change content. Items can carry an optional `sources: [{label, url}]` array (used for citations in `ai-trends/`, and for the genre-to-trend cross-links in `genres/data.json`), and an optional `flagged: true` to mark a claim as unverified.

## Deploy

1. `gh repo create by-studio --public --source=. --remote=origin --push`
2. Settings > Pages > Deploy from branch > main, root
3. Live at `https://<user>.github.io/by-studio/`

## House style

Design tokens match binyoun.com: `#0b0b0b` ground, Space Grotesk, JetBrains Mono, terracotta `#c1440e`. No em-dashes anywhere in this repo.
