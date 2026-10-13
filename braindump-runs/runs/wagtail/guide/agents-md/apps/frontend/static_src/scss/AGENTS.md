<!-- braindump: rules extracted from PR review patterns -->

# apps/frontend/static_src/scss/ Guidelines

## Code Style

<!-- rule:2 -->
- In `apps/frontend/static_src/scss/components/` SCSS, use logical properties — `inset-inline-start`/`inset-inline-end`, `margin-inline-start`/`margin-inline-end`, `padding-inline-start`/`padding-inline-end` — instead of `left`/`right`, `margin-left`/`margin-right`, `padding-left`/`padding-right` — physical directions hardcode an LTR assumption and break under RTL or vertical writing modes — Physical properties bake in a left-to-right, horizontal-writing assumption; logical properties keep component styles correct if the app is ever localized to RTL languages or rendered in a vertical writing mode, without per-component overrides.
<!-- rule:23 -->
- Use `rem` (not `px`) for font sizes, spacing, dimensions, and offsets in `apps/frontend/static_src/scss`; never change the root `html` font-size — set larger base sizes on `body` instead. — `px` ignores the user's browser font-size setting, hurting accessibility; and every `rem` in the SCSS assumes `1rem = 16px`, so overriding `html`'s font-size would silently rescale all spacing and sizing site-wide. Scaling via `body` keeps that baseline intact.
<!-- rule:85 -->
- **If applicable / If exists** — this rule applies to `@font-face` `src` declarations in `apps/frontend/static_src/scss/`: keep the font file extension consistent with its `format()` value (e.g. `.woff2` with `format('woff2')`). Browsers use `format()` as a hint to skip unsupported or mismatched sources, so a `.woff2` file declared as `format('woff')` can be silently dropped from the font stack, causing fallback rendering or missing fonts. — Browsers use format() as a hint to skip unsupported or mismatched sources, so a .woff2 file declared as format('woff') can be silently dropped from the font stack, causing fallback rendering or missing fonts.
<!-- rule:19 -->
- Add new SCSS partials to `apps/frontend/static_src/scss/components/` and group related styles into shared files like `components/rich-text.scss` — per-element files and new feature folders scatter styles that belong together. — Grouping related styles in shared `components/` partials keeps the stylesheet tree navigable and avoids a sprawl of near-empty files; it also mirrors the existing convention so contributors know where to look for a given element's styles.

## General

<!-- rule:20 -->
- Edit SCSS `@import` lists like `main.scss` with minimal diffs — match the file's existing suffix convention (always or never `.scss` on partial imports) and touch only the import lines your change needs, leaving unrelated and commented-out entries untouched. Noisy reformatting obscures review and invites merge conflicts in a shared stylesheet entrypoint. — `main.scss` is a shared, frequently-edited import manifest; mixing suffix styles or reformatting untouched lines produces noisy diffs that hide the real change and cause avoidable merge conflicts.
<!-- rule:24 -->
- Keep the CSS framework's base imports (e.g., Bootstrap `root` and `reboot`) instead of swapping them for a separate normalize/reset stylesheet — avoids conflicting resets and duplicated base styles. — Frameworks like Bootstrap already ship their own normalize/reboot layer. Adding a second reset on top double-normalizes elements (e.g., margins, box-sizing, form controls), producing subtle layout regressions and making upgrades harder. If a standalone reset is truly needed, pull the latest official upstream release rather than an older vendored copy so it stays in sync with the framework's expectations.

## File-Specific Rules

### `apps/frontend/static_src/scss/components/nav-buttons.scss`

<!-- rule:57 -->
- In `apps/frontend/static_src/scss/components/nav-buttons.scss`, default `.nav-buttons__link` to `justify-content: flex-start`, then override `.nav-buttons__link:nth-child(2)` to `flex-end` inside `@include media-query(small)` instead of `space-between` — `space-between` misaligns navs with a single link and defeats the project's breakpoint mixin — `space-between` only spreads two children apart, so a one-link nav collapses to an unintended alignment and the layout no longer responds predictably at the `small` breakpoint. Defaulting to `flex-start` with an explicit `:nth-child(2)` override keeps alignment deterministic for any number of links and routes breakpoint behavior through the project's `media-query` mixin.

### `apps/frontend/static_src/scss/main.scss`

<!-- rule:21 -->
- In `main.scss`, import utilities last — variables, functions, mixins, styles first — so utility classes win the cascade and actually override earlier rules. — Utilities are meant to override, and CSS cascade only honours equal-specificity rules that come later; importing them early makes them silently lose to base styles.

### `apps/frontend/static_src/scss/variables.scss`

<!-- rule:80 -->
- In `variables.scss`, define font-family variables (e.g. `$font-family-base`) with the primary font followed by Wagtail's full upstream fallback stack — system fonts, generic families, and emoji fallbacks. — Copying only the primary font or a short generic fallback drops Wagtail's cross-platform and emoji coverage, so glyphs render inconsistently across browsers and OSes.

<!-- /braindump -->