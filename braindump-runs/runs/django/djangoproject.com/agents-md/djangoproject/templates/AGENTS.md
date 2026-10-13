<!-- braindump: rules extracted from PR review patterns -->

# djangoproject/templates/ Guidelines

## Code Style

<!-- rule:83 -->
- Use single spaces inside `{{ variable }}` and `{% tag %}` delimiters — missing/extra spaces make template markup inconsistent and noisy in diffs — ...
  - Close every HTML tag opened inside a `{% block %}` and indent standalone template output to its container level — unbalanced markup or stray indentation leaks into child templates and renders incorrectly (all templates live under `djangoproject/templates/`)
<!-- rule:2 -->
- Drop `{% if %}` guards around states that can't occur (dropped features, upstream-validated values) — dead branches render misleading fallbacks. Applies in `djangoproject/templates/`. — A conditional that can never be false hides real behavior from readers and produces fallback output that looks intentional but misrepresents the actual state. Removing it keeps templates honest about what the data guarantees.
<!-- rule:140 -->
- Strip gratuitous whitespace in HTML templates: no trailing spaces, no stray blank lines, and no gap between adjacent block elements (e.g. a heading and its following paragraph) — keeps rendered markup and review diffs tight — Extra whitespace in HTML templates typically compiles into the rendered output and adds review noise unrelated to actual content, making diffs of the underlying markup harder to read. By keeping structural markup compact (heading immediately followed by its paragraph, no trailing spaces, no empty lines), changes to templates stay easy to scan and the generated HTML matches the authored intent.
<!-- rule:433 -->
- When duplicating a tier block in `djangoproject/templates/fundraising/`, update all user-visible text — headings, labels, titles — to match the new tier key, not just the `{% if corporate_members.<tier> %}` condition and context vars — Stale heading text from the copied block leaks the previous tier's name to donors and mismatches the condition, so a corporate member of one tier sees another tier's label.

## Documentation

<!-- rule:120 -->
- In `djangoproject/templates/aggregator/ecosystem.html` and `base_community.html`, add each resource to the existing categorized `<ul>`/`<dd>` list that matches its type, preserving surrounding semantic markup — recomposing lists breaks the curated taxonomy readers rely on to find the right kind of tool. — These templates are hand-curated indices; miscategorizing or flattening the markup erodes the taxonomy users navigate by.
<!-- rule:67 -->
- Use `{# ... #}` or `{% comment %}` for maintainer notes, placeholders, and example markup in templates — HTML comments `<!-- -->` survive into rendered HTML, leaking internals to users. — Django template comments are stripped at render time, so maintainer-only notes never reach the browser; HTML comments do. Shipping a copy/paste skeleton next to overridable blocks keeps the wrapper/nested-content structure consistent across authors.
  - When a comment documents a reusable/overridable block pattern, include a copy/paste-able skeleton: wrapper element with `id`, nested content element with `class`, leaving the actual block content empty or minimal — so authors match the expected nesting instead of guessing (see `djangoproject/templates/base.html`).
<!-- rule:285 -->
- In `djangoproject/templates/aggregator/ecosystem.html`, list the specific aspects under evaluation (e.g. API design, multi-backend compatibility) for exploratory packages/features — generic summaries hide what feedback is actually wanted, so community reviewers can't target their input. — Exploratory entries in the ecosystem page exist to solicit feedback; naming the aspects under evaluation (API design, multi-backend compatibility) tells contributors what to critique, while a generic package blurb produces vague or off-target responses.
<!-- rule:306 -->
- In member invitation emails (e.g., `account_invite.txt`), tell recipients their account name should match their external service username (e.g., the GitHub username used for Trac) — mismatches break Trac/GitHub attribution — and note they can request a correction if it differs. — These emails are the only place members learn which username to pick; when the account name diverges from the GitHub username used for Trac, commit and ticket attribution breaks, so invitees must be told the expected match and how to get it fixed.

## General

<!-- rule:255 -->
- Preserve existing `{% block %}` names in base templates like `base.html` and `base_foundation.html` — child templates override them, so renaming or removing breaks downstream customizations. — Blocks in `djangoproject/templates` are public extension points: child templates override them by name, and many were added deliberately to fix specific issues. Only rename/remove a block when intentionally deprecating that customization point as a breaking change.
<!-- rule:117 -->
- Name `{% for %}` loop vars after the item concept (`lang` for `available_languages`), never shadowing context names — silent output corruption — Two template-naming rules scoped to Django templates: loop variables should describe the item concept to avoid shadowing context names (which silently corrupts rendered output), and `as` URL variables should describe the link's destination rather than incidental context so names remain correct when surrounding context changes.
  Name `{% url ... as var %}` vars after the link destination (`install_url`, not `stable_url`), following siblings like `release_process_url` — names survive context refactors

## File-Specific Rules

### `djangoproject/templates/aggregator/ecosystem.html`

<!-- rule:249 -->
- In `djangoproject/templates/aggregator/ecosystem.html`, format each resource entry as a single-line `<li><a href="...">Name</a> &mdash; Short description.</li>` inside the matching `<h3>`-headed `<ul>` (e.g. Third-party Packages, Package Communities, External Communities) — inconsistent entry shapes look broken alongside surrounding items. — Every entry should link directly to a real resource. Description style must match surrounding entries: complete descriptive phrase, usually starting with an indefinite article, first word after the em dash capitalized, terminal punctuation. Placeholder `<li>` items that name a category instead of linking to a resource break the list's visual rhythm and give users nothing to click.

### `djangoproject/templates/fundraising/index.html`

<!-- rule:97 -->
- Keep the Django Fellows list in `djangoproject/templates/fundraising/index.html` complete and consistent — This section is a public historical record — omit a current/former Fellow, use singular wording when there are several former Fellows, or deviate from the existing `role`/start-date + fellowship-end/tenure bio format, and the page misrepresents the program. Verify identities and counts against official announcements before editing.
<!-- rule:437 -->
- In contributor bios (`fundraising/index.html`)+, list only current project affiliations and roles — stale roles and incidental qualifiers (e.g. `Django Girls <city>`) misattribute people. — Biographies are the public record of who is affiliated with the project right now; keeping only current roles avoids implying active involvement where there is none and prevents location-suffixed chapter names from being read as separate, project-endorsed entities.

### `djangoproject/templates/releases/download.html`

<!-- rule:391 -->
- Map Django version formats at matching granularity in `djangoproject/templates/releases/download.html`: feature releases as `A.B` ↔ `YYYY`, patch releases as `A.B.C` ↔ `YYYY.N` — a `YYYY.0` or `YYYY.N` label misrepresents a feature release as a patch. Write pairs as `YYYY[.N]` (optional component), not a fixed concrete pattern, so both release types map through one notation. — Splitting granularity by release type keeps the old↔new mapping unambiguous for readers comparing real Django releases.

<!-- /braindump -->