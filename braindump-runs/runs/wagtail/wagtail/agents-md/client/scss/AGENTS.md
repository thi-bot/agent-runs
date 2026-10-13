<!-- braindump: rules extracted from PR review patterns -->

# client/scss/ Guidelines

## Code Style

<!-- rule:1530 -->
- Constrain form/component width with `max-width` on canonical classes (`.w-form-width`, `.w-field`) — not `width: 100%` or DOM-scoped selectors like `.content .tab-content`, so fields keep intrinsic sizing and the rule works in every context. — Hard-coding `width: 100%` forces fields to stretch regardless of content and DOM-scoped selectors break when markup is reused elsewhere. `max-width` on a canonical component class lets fields size intrinsically until a limit is hit, so the same rule applies everywhere the component is used — the class ships with the component, not with a specific page layout.
<!-- rule:2175 -->
- Style overlay controls (`z-index` above dialog content, explicit `background` from theme tokens) — keeps close buttons legible over arbitrary content under `client/scss/components/*`. — ... because ...
<!-- rule:594 -->
- Keep interactive-state selectors minimal — don't add `:hover`/`:focus`/`:focus-within`/modifier selectors when a prior condition already covers that state. For disabled exclusions, use a single `:not(:disabled, .disabled, [disabled])` selector list instead of chained or comma-separated `:not()` selectors. — Redundant state selectors inflate specificity and make override behavior unpredictable; consolidating disabled checks into one `:not()` list prevents divergent matching logic across component SCSS (e.g. `client/scss/components/forms/_title.scss`, `client/scss/components/_button.scss`).
<!-- rule:1253 -->
- Scope layout/width overrides to state ancestors (`.side-panel-open .content .tab-content`, `.minimap-open .content .tab-content`) — global selectors leak across UI states and `.content.tab-content` targets a single element so never matches; pair with breakpoint mixins for responsive cases and compound selectors (`.side-panel-open.minimap-open`) when states co-apply — Global selectors bleed layout styles into unrelated UI states, and the malformed `.content.tab-content` form (two classes on the same element) silently fails to match the intended ancestor/descendant relationship — scoping to state classes and the `.content .tab-content` chain keeps overrides predictable and combinable.
<!-- rule:1360 -->
- Gate modern CSS (`:has()`, `:focus-visible`) with fallbacks — unsupported browsers drop the whole rule, silently breaking layout — Preserves the specific selectors mentioned, points to the failure mode (rule dropped → broken layout), and stays actionable without resorting to 'always/never' phrasing. Applies globally to all SCSS under the CSS source root per the placement rationale, so no path prefix is needed in the rule itself.
<!-- rule:1564 -->
- Set explicit `height` on form/action controls rendered beside text inputs using `$text-input-height` — keeps rows aligned when the neighboring control's default changes — The rule applies across multiple Wagtail SCSS components under `client/scss/` (e.g., `_footer.scss`, `forms/_switch.scss`), so it belongs at the SCSS tree root rather than per-file. Aligning action controls to `$text-input-height` keeps them visually consistent with adjacent text inputs without depending on another control's default sizing; conversely, forcing identical dimensions between controls that never co-render (switches vs checkboxes/radios) creates fragile coupling that breaks when one component's styling changes.
  - Don't enforce identical dimensions between unrelated form controls (e.g., switches in `client/scss/components/forms/_switch.scss` vs checkboxes/radios) unless they render together in the same form — avoids brittle cross-component coupling
<!-- rule:799 -->
- Wrap `td`/`th` contents in a block element for flex/grid — `display: flex` on the cell itself breaks the table layout model. — Browsers rely on the table formatting context for sizing and alignment; overriding `display` on cells causes misaligned columns and unpredictable widths across rows.
<!-- rule:1057 -->
- Match `display` to intended layout: keep `inline-block` for inline form controls, set `display: block` when a link is styled as a block component — misaligned focus outlines look broken (see `client/scss/components/forms/_input-text.scss`, `client/scss/components/forms/_field-comment-control.scss`, `client/scss/components/_listing.scss`) — Generated from a global CSS/SCSS styling convention.
<!-- rule:1919 -->
- Verify spacing, padding, and offset changes at small/mobile viewport widths — tight viewports expose crowding invisible on larger screens, so adjust in small increments when `client/scss/` components feel cramped. — Tight viewports expose crowding that is invisible on desktop, and `font-size` increases silently consume padding. Checking at narrow widths (and re-checking padding after type scale changes) catches cramped layouts before they ship, and nudging spacing in small increments keeps adjustments proportional to the base rhythm rather than introducing arbitrary values.

## General

<!-- rule:2036 -->
- Treat global normalize/reset styles in `client/scss/core.scss` and `client/scss/generic/_normalize.scss` as high-impact — a single reset cascades across every admin page. — Reset rules touch the whole UI; small changes here break unrelated views.

<!-- /braindump -->