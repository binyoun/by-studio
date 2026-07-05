# BY Studio

A photography teaching hub: the fundamentals that don't change, and the trends that change every year.

No build step, no framework. Plain HTML/CSS/JS, shared `css/style.css` and `js/render.js` at the repo root, each section fetches its own `data.json` (or `data/*.json`) and templates cards into the page, deployed straight to GitHub Pages.

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
