# AGENTS.md

Guidance for AI coding agents (Claude Code, Cursor, Copilot, Codex CLI, Gemini CLI, etc.)
working in this repository. This file is the single source of truth — tool-specific files
(`CLAUDE.md`, `.github/copilot-instructions.md`, `.cursor/rules/`, `GEMINI.md`) just point here.

## Task-specific agents and skills

- [`.agents/agents/`](./.agents/agents) holds tool-agnostic agent definitions (plain markdown with
  frontmatter, no vendor-specific fields) for recurring roles — e.g.
  [`.agents/agents/pr-review.md`](./.agents/agents/pr-review.md).
- [`.agents/skills/`](./.agents/skills) holds reusable methodologies an agent (or a human) can
  invoke — e.g. [`.agents/skills/code-review.md`](./.agents/skills/code-review.md), a two-axis
  (standards + spec) review process. Its "standards" axis checks against
  [CODING_STANDARDS.md](./CODING_STANDARDS.md), the concrete coding-standards checklist for this
  repo. Agents reference skills rather than duplicating their logic: `pr-review` is a thin role
  wrapper around the `code-review` skill.

Any agent runner can load these directly; they're not tied to a specific tool's subagent or
skill format.

## Project overview

Victor Torres' personal website and blog: a static site built with Astro,
MDX content collections, and Tailwind CSS v4. Deployed to Netlify.

## Setup

```bash
npm install
```

Requires **Node >= 22.12.0** (Astro 7's minimum). Check with `node -v` before troubleshooting
install/build issues — most weird dependency errors on an older Node trace back to this.

## Commands

| Command                  | Action                                                                        |
| ------------------------ | ----------------------------------------------------------------------------- |
| `npm run dev`            | Start local dev server (`localhost:3000` / `4321` depending on Astro default) |
| `npm run build`          | Build production site to `./dist/`                                            |
| `npm run preview`        | Serve the built `./dist/` locally                                             |
| `npm run astro -- check` | Type-check `.astro` files                                                     |
| `npm run astro -- <cmd>` | Any Astro CLI command                                                         |

There is no test suite in this repo yet. Validate changes with `npm run build` (it will fail
loudly on template errors — Astro 7's compiler is strict about things like unclosed tags) and
a visual check via `npm run dev` for anything touching layout, styles, or MDX rendering.

## Architecture

- **Routing/pages**: `src/pages/` — file-based routing (`.astro` files). `src/pages/blog/[id].astro`
  and `src/pages/projects/[id].astro` are dynamic routes sourced from content collections.
- **Content collections**: `src/content.config.ts` defines `blog` (Content Layer `glob()` loader
  over `src/blog/**/*.mdx`) and `projects` (same, over `src/projects/**/*.mdx`). The post/project
  identifier is `id` (not `slug` — that field is a legacy/optional frontmatter override, not the
  routing key).
- **Layouts**: `src/layouts/` — `BaseLayout.astro` is the outer HTML shell every page uses
  (renders the sidebar/mobile nav and the centered content column); `BlogLayout.astro` wraps
  article pages with `PostHeader`.
- **Components**: `src/components/` — Mostly plain `.astro` components. For simple interactivity, use
  a `<script>` tag in the `.astro` component (e.g. the client-side search/filter scripts on
  Notes/Projects/Resources — see note below). If the logic is complex enough to genuinely need
  a framework (non-trivial state, reactivity across multiple elements, etc.), prefer **Vue**
  (`@astrojs/vue`) over other frameworks — install it if not present already
- **Styles**: `src/styles/global.css` is the only styling config that matters. Tailwind v4 is
  **CSS-first** — theme tokens (colors, fonts, spacing, custom text sizes) live in the `@theme`
  block there. There is intentionally **no `tailwind.config.js/cjs`** in this repo; don't add
  one unless you're prepared to wire it up with an explicit `@config` directive in `global.css`
  (Tailwind v4 won't auto-read a JS config file otherwise).

## Content

The site is `output: "static"` (no server), which matters for two things:

- **All non-MDX content lives in `src/data/*.json`** — `site.json` (site name, social links,
  résumé URL, every page's `<title>`/description, Home hero copy, About bio), `resume.json`
  (Experience/Skills/Education), `now.json`, `uses.json`, `resources.json`. Edit these directly
  to change copy; no component code needs to change. Long-form content (blog posts, project
  writeups) stays as MDX under `src/blog/` and `src/projects/` instead, per the content
  collections above.
- **Query-string filtering is client-side only.** Because there's no server, `Astro.url.searchParams`
  is always empty in production — a static host serves the same HTML file regardless of query
  string. Notes/Projects/Resources search and filter pills are therefore implemented in a
  `<script>` that reads `location.search` after load (see `src/pages/blog/index.astro` for the
  pattern). Don't reach for `Astro.url.searchParams` for anything that needs to work when
  deployed — verify with `npm run preview` (serves the real static build), not `npm run dev`
  (which can mask this because its dev server re-renders per request).

## Conventions

- TypeScript config extends `astro/tsconfigs/strict` — respect strict typing in `.ts`/`.astro`
  script blocks rather than reaching for `any`.
- Adding a blog post: new `.mdx` file under `src/blog/`, with frontmatter matching the `blog`
  collection schema in `src/content.config.ts` (required: `title`, `description`, `category`,
  `created_date`; everything else is optional — check the schema before inventing new frontmatter
  keys). Adding a project: same idea under `src/projects/`, matching the `projects` schema.
- Commit messages loosely follow Conventional Commits (`chore:`, `fix:`, etc.) — match that style.
- Don't reintroduce Tailwind v3-style JS config or `content` globs; Tailwind v4 auto-detects
  sources from the project root.

## Dependency upgrades

This project tracks Astro and Tailwind major versions somewhat aggressively. When bumping
`astro`, `@astrojs/*`, or `tailwindcss`:

- Re-run `npm run build` — Astro's Rust compiler will hard-fail on template issues (e.g. unclosed
  tags) that older versions silently auto-corrected.
- Check `npm audit` after the bump; some vulnerabilities (e.g. in `vite`/`rollup`/`sharp`) are
  transitive from Astro itself and aren't fixable from this repo — track them, don't force-fix
  with `npm audit fix --force`.
- Tailwind v4 config lives in CSS (`src/styles/global.css`), not a JS file — nothing to migrate
  there on a Tailwind bump.
