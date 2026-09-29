# Anchit's Museum — The Bedroom Museum

An interactive, self-guided bedroom museum showcasing Anchit Aman's journey through
AI, Biology, NEET, independent learning, failure, and relentless growth. Built for
university admissions readers: instead of telling you who he is, the site collects
the objects that prove it.

## Pages & experiences

| Route | Experience |
| --- | --- |
| `/#/` | Cinematic entrance — title, "Please touch the artifacts," three entry actions |
| `/#/bedroom` | The main interactive room: 9 clickable artifacts, progress tracker, hidden drawer + bracelet secrets |
| `/#/failures` | The Museum of Failures — 3 honest exhibits from the shadow wing |
| `/#/curator` | Curator's Note — the gap-year letter, values, future direction, Ask Me About |
| `/#/gift-shop` | Contact, run club link, resume + brochure downloads, closing message |

Global overlays: **Artifact plaque modal** (exhibit number, story, lesson, evidence),
**30-Second Quick Tour** (Laptop → App That Never Launched → AI+Biology Blueprint),
**List View** (accessible fallback with All/Bedroom/Failures/Secret filters),
**Certificate Evidence View** (verified ACLS/BLS replicas), and the
**Audio Guide transcript** panel.

## Stack

- React 19 + TypeScript (strict) + Vite
- Tailwind CSS v4 (`@theme` tokens in `src/index.css`)
- react-router 7 with `HashRouter` (deep links work on any static host)
- Zero images — every artifact is drawn in CSS (`src/components/ArtifactGlyph.tsx`)

## Getting started

```bash
bun install
bun run dev        # dev server on 0.0.0.0:5173
bun run typecheck  # tsc -b --noEmit
bun run build      # vite build → dist/
```

## Editing content

All museum copy lives in **`src/data/artifacts.ts`** — 12 artifacts (9 bedroom,
3 failure-wing), certificate evidence details, the quick-tour script, the curator
statement, and gift-shop links. The UI maps over this file; edit text there and the
whole site updates.

## Deployment

Static build in `dist/` (`vite build`). No server required.
