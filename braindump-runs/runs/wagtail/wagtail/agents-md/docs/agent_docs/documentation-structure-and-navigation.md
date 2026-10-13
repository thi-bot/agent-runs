# Documentation Structure and Navigation

> Organizing docs by reader progression, Diátaxis mode separation, scoped indexes, de-duplication, prerequisites, headings, and toctree/redirect handling.

**When to check**: When planning, reorganizing, or removing documentation pages and sections.

## Rules

<!-- rule:2332 -->
- Scope `docs/` indexes and reference pages to their namespace — link only items that genuinely belong (e.g. apps in the same namespace), and omit or relocate out-of-scope pages (other template namespaces, admin/branding topics) — so readers aren't misled by unrelated entries. — Out-of-scope links in an index imply relevance that doesn't exist, sending readers to material that doesn't apply to the namespace they're browsing; explicit scope statements and relevance notes (e.g. in `docs/reference/contrib/index.md` or `docs/reference/contrib/modeladmin/primer.rst`) let readers judge whether a linked page is worth consulting.
<!-- rule:1149 -->
- Classify each `docs/` page as tutorial, how-to, reference, or explanation — mixing modes makes pages hard to scan and forces readers to hunt for what they need — Single-purpose pages match how users search (learn vs. look up vs. understand).
<!-- rule:912 -->
- Organize `docs/` sections by reader progression, not source structure. — Readers navigate concepts, not implementation; wrong order forces backtracking and hides features.
<!-- rule:394 -->
- Link to source files instead of embedding large generated/auto-maintained reference content — preserves reading flow; if embedding is required, place it last on the page in a collapsible `<details>` (use `<details open>` to keep it visible by default). — Large auto-generated tables (e.g., the icons reference in `docs/advanced_topics/icons.md` sourced from `docs/_static/wagtail_icons_table.txt`) break up prose and make pages hard to scan; linking keeps the source single-sourced and readable, while deferred `<details>` placement lets readers who need the reference still reach it without scrolling past it.
<!-- rule:1942 -->
- Keep a single source for shared docs content and pull it in with the generator's include directive (e.g. `.. include::` with end markers) — copies across `docs/` pages and generators (Sphinx, Typedoc) drift out of sync. — Duplicated prose must be updated in every location, and the copies inevitably diverge — the single-source-plus-include pattern keeps one authoritative README section rendered in each page or doc generator.
<!-- rule:429 -->
- Consolidate related ViewSet/customisation APIs onto shared or cross-linked pages instead of duplicate standalone pages — keeps one source of truth so docs don't drift; see `docs/reference/contrib/redirects.md` and `docs/advanced_topics/customisation/custom_user_models.md`. — Both bullets live under `docs/` and govern how customisation/ViewSet reference pages are organised across `docs/reference/contrib/redirects.md` and `docs/advanced_topics/customisation/custom_user_models.md`.
  - Document each supported usage pattern separately (e.g. simple listing vs. filtered lookup) — readers can jump straight to the variant they need.
<!-- rule:79 -->
- Keep `docs/` action-oriented headings and intros matched to their content — don't bury reference material under an action intro unless you broaden the intro — readers skim headings to find tasks; mislabeled intros waste their time
<!-- rule:2221 -->
- Nest closely related sections under a common parent heading, each as its own subsection — keeps docs hierarchy scannable without splitting topics — Grouping related sections under a shared parent preserves topic cohesion for readers scanning the docs, while still keeping each subject independently linkable. Headings that don't mirror real UI labels or rendered structure mislead readers — and inventing a heading for a loose, ungrouped item implies a structural grouping that doesn't exist, so describing its placement in prose is more honest.
  - Match headings to actual UI behavior or rendered structure — invented headings send readers hunting for controls that don't exist
<!-- rule:913 -->
- Place prerequisites at the top of a section, before example code — readers shouldn't have to hunt mid-page — Concise, imperative, preserves directory references (docs/topics/, docs/reference/) which are the most valuable project-specific anchors. Explains the WHY (reader experience: no hunting, self-contained guides) rather than invoking convention-as-authority.
  - Repeat prerequisites in `docs/topics/` guides with a cross-link to `docs/reference/` — topic guides must stand alone for readers who land there first
<!-- rule:2962 -->
- Before deleting any docs page, grep for it in all toctrees (e.g. `docs/*/index.rst`), remove each entry, and set up a redirect in the RTD config so the old URL forwards to the replacement page (e.g. release notes) — broken toctrees fail the Sphinx build and missing redirects 404 external links users already have. — Captures the two mechanical consequences of deleting a page and why each matters (build failure vs. broken inbound links), while preserving the concrete `docs/*/index.rst` and RTD-config references.
