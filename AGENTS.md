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
  is the dynamic blog post route, sourced from the `blog` content collection.
- **Content collections**: `src/content.config.ts` defines the `blog` collection using the
  Content Layer `glob()` loader over `src/blog/**/*.mdx`. The post identifier is `id`
  (not `slug` — that field is a legacy/optional frontmatter override, not the routing key).
- **Layouts**: `src/layouts/` — `BaseLayout.astro` is the outer HTML shell every page uses;
  `BlogLayout.astro` / `ContentLayout.astro` wrap post/page content.
- **Components**: `src/components/` — Mostly plain `.astro` components. For simple interactivity, use
  a `<script>` tag in the `.astro` component. If the logic is complex enough to genuinely need
  a framework (non-trivial state, reactivity across multiple elements, etc.), prefer **Vue**
  (`@astrojs/vue`) over other frameworks — install it if not present already
- **Styles**: `src/styles/global.css` is the only styling config that matters. Tailwind v4 is
  **CSS-first** — theme tokens (colors, fonts, spacing, custom text sizes) live in the `@theme`
  block there. There is intentionally **no `tailwind.config.js/cjs`** in this repo; don't add
  one unless you're prepared to wire it up with an explicit `@config` directive in `global.css`
  (Tailwind v4 won't auto-read a JS config file otherwise).

## Conventions

- TypeScript config extends `astro/tsconfigs/strict` — respect strict typing in `.ts`/`.astro`
  script blocks rather than reaching for `any`.
- Adding a blog post: new `.mdx` file under `src/blog/`, with frontmatter matching the `blog`
  collection schema in `src/content.config.ts` (required: `title`, `description`, `created_date`;
  everything else is optional — check the schema before inventing new frontmatter keys).
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
