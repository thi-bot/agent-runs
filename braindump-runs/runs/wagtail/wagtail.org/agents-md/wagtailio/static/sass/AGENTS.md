<!-- braindump: rules extracted from PR review patterns -->

# wagtailio/static/sass/ Guidelines

## Code Style

<!-- rule:92 -->
- Use `rem` (not `px`) for sizing, spacing, font-size, and icon dimensions in `wagtailio/static/sass/` (components and base partials like `base/_typography.scss`) — scales with the user's root font size and browser accessibility settings — `px` sizing ignores user font-size preferences and breaks browser zoom/accessibility scaling. Sticking to the project's 16px base with whole-pixel `rem` values avoids off-by-subpixel drift from the Figma source, so text and icons render at the intended design dimensions.
  - Convert Figma `px` to `rem` via `design_px / 16` (16px base), rounding to exact whole-pixel equivalents (e.g. `34px` → `2.125rem`, not `2.138rem`) — keeps rendered font-sizes and line-heights matching the design source
<!-- rule:105 -->
- Give every grid child in `wagtailio/static/sass/components/*.scss` a `grid-column: <start> / span <n>` whose span matches the column count `_grid.scss` defines at that breakpoint, switching spans via `@include media-query(...)` — reusing a larger span across elements or breakpoints overflows or misaligns the grid row, since each breakpoint redefines how many columns exist. — The column count in `_grid.scss` shrinks at smaller breakpoints (e.g. 2 columns on mobile), so a span copied from the large layout exceeds the available tracks and pushes content into an overflow row.
<!-- rule:73 -->
- Put component-specific Sass in a dedicated `components/_{component}.scss` partial — keeps print overrides and component styles reusable and prevents bloat in broad partials like `_header.scss` or `base/_print.scss`; only create the partial when the component genuinely needs custom styling. — Placing component rules in dedicated partials under `components/` keeps print overrides and component styles colocated and reusable, avoiding bloat in broad files like `_header.scss` or global files such as `base/_print.scss`. Shared/global partials stay generic, so changes to one component don't risk affecting unrelated layouts. Only add a partial when the component truly needs custom styling, to avoid needless files.
<!-- rule:72 -->
- Check `abstracts/_mixins.scss` and `utilities/_utilities.scss` before writing raw CSS; add new abstractions there, not in component files — keeps shared styles discoverable and prevents duplicate definitions drifting across components. — Duplicating a mixin or hard-coding a value in a component partial means later changes to spacing, color, or layout logic miss every copy; centralizing in `abstracts/` and `utilities/` makes the shared vocabulary the single place to look and edit. Naming mixins for general purpose (not a component prefix) keeps them findable from any component, not just the one that introduced them.
<!-- rule:89 -->
- Use shared spacing mixins (`sf-spacing` from `wagtailio/static/sass/abstracts/_mixins.scss`) instead of hardcoded pixels — Hardcoded values drift across components; mixins keep spacing consistent and responsive
<!-- rule:106 -->
- Prefer CSS Grid for equal-height grid items in component SCSS; use `min-height` only as a last resort — Grid equalizes rows automatically, while hardcoded heights drift from content and misalign cards. — Grid stretches items to row height automatically; hardcoded `min-height` values become stale when content or font sizes change, leaving cards visibly misaligned across rows.
<!-- rule:116 -->
- Use hex notation for SCSS color variables — 8-digit hex for alpha (e.g. `#2626264d`), never `rgb()`/`rgba()` — keeps `wagtailio/static/sass` color values compact, greppable, and consistent — Uniform hex form makes color variables easy to scan and search, and 8-digit hex carries alpha in one token rather than duplicating channels across a `rgba()` call.

## File-Specific Rules

### `wagtailio/static/sass/components/_comparison-table.scss`

<!-- rule:133 -->
- In `_comparison-table.scss`, give `td:first-child` an explicit `width` — `250px` at the large breakpoint, `150px` at the small — rather than `min-width: fit-content`, which collapses unpredictably when header images vary in size. — The first column's intended width is not derivable from content: header images range in size, so `fit-content` resolves to different widths per row/breakpoint and the column drifts. Hard-coded breakpoint widths keep every comparison table laid out identically.

<!-- /braindump -->