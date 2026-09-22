---
name: code-review
description: Two-axis code review of a diff — conformance to this repo's coding standards, and faithfulness to the change's intent/spec.
inputs:
  - a fixed point to diff against (commit SHA, branch, or tag — defaults to the repo's default branch)
  - optionally, an OpenSpec change folder or issue/PR description describing intent
outputs:
  - a list of findings, each tagged with its axis (standards | spec), file/line, and severity
---

# Code Review Skill

Adapted from [mattpocock/skills' `code-review`](https://www.skills.sh/mattpocock/skills/code-review)
two-axis model, with the "spec" axis grounded in
[OpenSpec](https://github.com/Fission-AI/OpenSpec)'s spec format when this repo has one.

This is a reusable *methodology*, not a role — any agent (the [`pr-review`](../agents/pr-review.md)
agent, a CI check, or a human running it manually) can invoke it. It only produces findings; it
does not fix code unless the invoker explicitly asks it to.

## Step 1 — Establish the diff

1. Resolve a fixed point: a commit SHA, branch, or tag given by the invoker, or the repo's
   default branch (`master`/`main`) if none is given.
2. Run `git diff <fixed-point>...HEAD` (three-dot — diff against the merge-base, not the tip of
   the fixed point) to get the actual changeset.
3. Run `git log <fixed-point>..HEAD --oneline` for commit context.
4. Stop and report if the fixed point doesn't resolve or the diff is empty — don't review nothing.

## Step 2 — Review on two independent axes

Evaluate each axis separately before combining findings, so one doesn't bias the other (run them
as two separate passes, or as parallel sub-agents if the runner supports that).

### Axis A — Standards

> Does the code conform to this repo's documented coding standards?

Source of truth: [CODING_STANDARDS.md](../../CODING_STANDARDS.md) at the repo root — the concrete,
checkable rules (TypeScript/Props conventions, formatting, Tailwind usage, content-collection
schema, naming, commits). Use [AGENTS.md](../../AGENTS.md) for broader architecture/conventions
context, but CODING_STANDARDS.md is the checklist for this axis. Concretely:

- `Props` interface present and named exactly `Props`; no `any`; strict-tsconfig violations.
- File/component naming and frontmatter block order match CODING_STANDARDS.md.
- 2-space indentation, single quotes, terminated statements — flag deviations from the
  surrounding file, not just from the written standard, since existing inconsistencies (e.g. tabs
  in a couple of page files) are tracked as known debt, not the pattern to enforce elsewhere.
- Tailwind stays CSS-first (`src/styles/global.css` `@theme` tokens); prefer existing theme tokens
  over new arbitrary bracket values (`text-[32px]`, `text-[#hex]`, etc.) per CODING_STANDARDS.md's
  Styling section — no reintroduced `tailwind.config.js/cjs`.
- Blog frontmatter matches the schema in `src/content.config.ts` — no invented keys.
- No dependency or abstraction added for something the codebase already does one way (e.g. the
  Vue-only-if-truly-needed rule for client-side interactivity in AGENTS.md).

### Axis B — Spec (intent)

> Does the code faithfully implement what it was actually supposed to do?

Resolve "the spec" in this priority order, since this repo doesn't always have a formal one:

1. **OpenSpec change** — if `openspec/changes/<change>/` exists for this work, read `proposal.md`
   (why/what), `design.md` (technical approach), and `specs/*.md` (requirements as
   `Requirement: ...` blocks with `WHEN ... THEN ...` scenarios). Check the diff against every
   scenario, and cross-check `tasks.md` — every checked-off task should have corresponding code,
   and no scenario should be silently unimplemented.
2. **Issue/PR description** — if no OpenSpec folder exists, use the PR description or linked
   issue as the intent statement.
3. **Commit messages** — as a last resort, treat the commit message(s) from Step 1 as the stated
   intent.

Flag: scope creep (code doing more than the spec/intent asked), incomplete implementation
(scenarios or tasks not covered), and silent behavior changes to code outside the stated intent.

## Step 3 — Regressions

Independent of both axes above, check for:
- Anything that would break `npm run build` (Astro's compiler hard-fails on issues like unclosed
  tags rather than auto-correcting).
- Changes to shared layouts/components that could visibly affect unrelated pages.
- Logic errors, off-by-one issues, unhandled edge cases introduced by the diff.

## Output format

One list, each finding tagged with its axis (`standards`, `spec`, or `regression`), file path,
line number/range, a one-sentence description, and severity (`blocking`, `should-fix`, `nit`).
If a given axis has no findings, say so explicitly rather than inventing filler feedback.
