<!-- braindump: rules extracted from PR review patterns -->

# djangoproject/scss/ Guidelines

## Code Style

<!-- rule:81 -->
- Use shared color tokens (`_utils.scss`/`_dark-mode.scss`, `var(--white-color)`) over hardcoded hex — hex values silently drift apart between light and dark themes — These guidelines consolidate three closely related SCSS/CSS theming conventions into actionable bullets, each preserving the specific file references (`_utils.scss`, `_dark-mode.scss`, `_style.scss`, `_sponsorship.scss`, `var(--white-color)`) that make the rule immediately applicable within the djangoproject theme layer. The rationale clauses explain the concrete problems—theme desynchronization, palette growth, and scattered theming logic—rather than appealing to abstract standards.
  - Update every matching light/dark-mode declaration when changing a theme color, and reuse the closest existing token — one-off colors leave the other mode stale and bloat the palette
  - Theming lives in `djangoproject/scss`; add new tokens there rather than inline in `_style.scss`/`_sponsorship.scss` — centralizes changes so themes stay swappable
<!-- rule:20 -->
- Nest child selectors inside their parent SCSS block (`#billboard { div { … } }`, `table.docutils { td { … } }`) instead of repeating the parent prefix — keeps container and descendant styles co-located and stops duplicated selectors drifting apart — When descendant styles live under the same parent selector, editing the container's rules immediately surfaces its child rules; splitting them into separate top-level blocks causes parent-prefix duplication and lets the two drift out of sync. This convention applies to any shared-parent pattern in SCSS (e.g. `#billboard div`, `table.docutils td`) and should be enforced consistently across `djangoproject/scss/`.
<!-- rule:371 -->
- Reuse the footer's `outline: 2px solid var(--menu)` for new focus states — inconsistent colors/offsets/`!important` make focus indicators look broken; don't restyle working ones in unrelated changes. — Focus indicators are user-visible consistency markers: if each new focus state invents its own outline color, `outline-offset`, or `!important` override, users perceive the styling as buggy rather than intentional. Bundling focus-style changes into unrelated work also creates noise in diffs and risks regressing states that already work.

## General

<!-- rule:70 -->
- In `djangoproject/scss/`, preserve CSS rules that target legacy documentation versions, and comment each legacy-compatibility selector with its source (legacy vs. standard output) and applicable version range. — Legacy version selectors look redundant to someone unfamiliar with versioned docs, so undocumented ones get deleted during refactors — breaking rendering on old doc pages that are still served. Keeping comments tied to the actual selectors prevents them from drifting out of sync with the CSS.
<!-- rule:277 -->
- In `djangoproject/scss/`, stick to Libsass 0.7.0/pysassc syntax — avoid modern feature queries like `@supports selector(...)`; use class-based fallbacks instead. Verify with `make compile-scss`. — The `djangoproject` SCSS pipeline builds through Libsass 0.7.0/pysassc, which predates modern CSS feature-query syntax — unsupported constructs fail the build silently or at compile time. Run `make compile-scss` after every SCSS edit to catch incompatibilities before they hit the site.

## File-Specific Rules

### `djangoproject/scss/_style.scss`

<!-- rule:172 -->
- In `djangoproject/scss/_style.scss`, separate stacked sections with `border-top: 1px solid $black` (e.g. `#billboard`) — reuses existing design primitives and keeps section rhythm consistent — The `djangoproject/scss/_style.scss` stylesheet already has established primitives for section separation: a `1px solid $black` top border for page sections like `#billboard`, and a `box-shadow` on `.full-width` blocks. Reusing these instead of inventing new borders keeps spacing/rhythm consistent across the site and prevents conflicting or doubled-up visual separators (e.g. adding `border-bottom` to a `.full-width` block that already has a `box-shadow`).
  - For `.full-width` blocks in `_style.scss`, rely on the existing `box-shadow` — don't add or keep `border-bottom`, which would double up the separation and break the primitive's intent
<!-- rule:411 -->
- In `_style.scss`, put shared notice-box container styling on the shared `div.*` selectors and label styling on `span.versionmodified`/`span.title` — avoids paragraph `font-weight` overrides that must be undone, and preserves the old `span.title` margin/layout so empty-body notes still render correctly. — Notice-box (changeset/versionadded/versionchanged/deprecated) styles live in this file only. Consolidating container rules on `div.*` and labels on `span.versionmodified`/`span.title` prevents the override-then-undo `font-weight` pattern that causes cascading fixes when tweaking labels. Preserve the existing `span.title` margin/layout, since empty-body notes depend on it to render properly.

<!-- /braindump -->