# Coding Standards

The concrete conventions this project follows, derived from the existing codebase and
cross-checked against the [Astro](https://docs.astro.build/) and [Tailwind CSS](https://tailwindcss.com/docs)
official docs. This is what [`skills/code-review.md`](./skills/code-review.md) checks code
against for its "Standards" axis. For architecture/commands, see [AGENTS.md](./AGENTS.md).

## TypeScript & Astro components

- **Always declare a `Props` interface** in the component frontmatter, named exactly `Props` —
  Astro uses that name specifically to type `Astro.props` and type-check callers
  ([Astro TypeScript guide](https://docs.astro.build/en/guides/typescript/)). Use `interface Props`,
  not `type Props`, to match every existing component (`BaseHead.astro`, `PostCard.astro`,
  `PostHeader.astro`, etc.).
- Mark optional props with `?` (`image?: string`) and destructure with defaults where a prop needs
  a fallback value, rather than checking for `undefined` inline further down.
- Destructure props in one statement at the top of the frontmatter block:
  `const { title, description } = Astro.props;` — don't reach into `Astro.props.x` piecemeal.
- No `any`. `tsconfig.json` extends `astro/tsconfigs/strict`; an explicit or inferred `any` in a
  `.ts` file or an `.astro` frontmatter block is a standards violation, not a style nit.
- Frontmatter block order: imports, then `interface Props`, then prop destructuring, then any
  derived values/logic, then the template. Don't interleave logic between imports and the props
  interface.

## Formatting

- **2-space indentation** in `.astro` frontmatter and `.ts` files. (`src/pages/index.astro` and
  `src/pages/blog/index.astro` currently use tabs — that's an existing inconsistency to fix when
  those files are next touched, not the standard to copy.)
- **Single quotes** for strings in frontmatter/TS (`'Blog'`, `'/about'`), matching the majority of
  the codebase. Double quotes are fine in HTML attribute values (`class="..."`) since that's
  markup, not a JS string.
- **Terminate statements with semicolons.** Most of the codebase does
  (`const { title, description } = Astro.props;`); a handful of top-level `const` declarations in
  page files omit them — converge on always using them.
- No trailing blank lines or double-blank-lines inside a component (seen in a couple of files,
  e.g. trailing blank lines at the end of `PostCard.astro`) — one blank line max between logical
  sections.

## Styling (Tailwind CSS v4)

- Tailwind v4 is **CSS-first**: every theme token (colors, fonts, spacing, custom text sizes)
  lives in the `@theme` block in [`src/styles/global.css`](./src/styles/global.css). There is
  intentionally no `tailwind.config.js/cjs` — Tailwind v4 auto-detects sources from the project
  root, and a JS config wouldn't be read without an explicit `@config` directive
  ([Tailwind v4 theme docs](https://tailwindcss.com/docs/theme)).
- **Prefer existing theme tokens over arbitrary values.** The project already defines a type
  scale (`text-paragraph`, `text-section-title`, `text-subsection-title`, `text-caption`, …) and
  font families (`font-heading`, `font-body`, `font-code`) — use those instead of bracket
  arbitrary values. This is a real, current inconsistency worth fixing: several components use
  one-off arbitrary values (e.g. `text-[32px]/[40px]`, `text-[#1F2937]`, `text-[14px]/[20px]` in
  `index.astro`, `Footer.astro`) that duplicate or bypass the theme scale already defined in
  `global.css`. New code should extend the `@theme` block with a named token rather than adding
  another arbitrary value; existing ones should be migrated when touched.
- Styling is utility-first, inline in the markup — no component-scoped `<style>` blocks or CSS
  modules exist in this codebase; don't introduce them for a one-off need `@theme` or a utility
  combination already covers.
- `@tailwindcss/typography`'s `prose-*` modifiers (see `Prose.astro`) are the only place
  Tailwind's plugin API is used — keep plugin usage centralized there rather than sprinkling
  `prose-*` classes elsewhere.

## Content collections

- Blog posts are `.mdx` files under `src/blog/`, loaded via the Content Layer `glob()` loader in
  `src/content.config.ts`. The routing/identifier field is `id` (from the file path), not `slug`
  — `slug` in the schema is a legacy/optional override field, never the lookup key.
  `src/pages/blog/[id].astro` and `PostCard`'s `url={`/blog/${post.id}`}` are the reference
  pattern.
- New frontmatter fields must be added to the Zod schema in `content.config.ts` before use —
  don't read an undeclared frontmatter key from `post.data`.
- Required frontmatter: `title`, `description`, `created_date`. Everything else in the schema is
  optional by design — don't make a new field required without a reason.

## Naming

- Component and layout files: `PascalCase.astro` (`BaseHead.astro`, `PostCard.astro`,
  `BlogLayout.astro`). No kebab-case or camelCase filenames in `src/components/` or `src/layouts/`.
- Props and local variables: `camelCase`.
- Route files under `src/pages/` follow Astro's file-based routing conventions (`[id].astro` for
  dynamic segments, `index.astro` for a directory's default route).

## Commits

- Loosely follow [Conventional Commits](https://www.conventionalcommits.org/) (`chore:`, `fix:`,
  etc.) — match the prefix style already in `git log`, don't invent a new one.
