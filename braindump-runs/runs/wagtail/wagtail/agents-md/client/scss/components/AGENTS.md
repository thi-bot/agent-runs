<!-- braindump: rules extracted from PR review patterns -->

# client/scss/components/ Guidelines

## Code Style

<!-- rule:2382 -->
- Style field/panel layouts with the framework's field-panel patterns; don't restyle `.w-field__input` (e.g. to `display: flex`) — bespoke CSS couples to one widget's markup and breaks others. — Preserves the project-specific selectors and modifiers (`.w-field__input`, `.w-field`, `.w-field-row`, `.chooser`, `.w-field--commentable`, `.w-field__comment-button`) so an assistant editing `client/scss/components/forms` has the exact hooks to target, while explaining why each constraint exists (widget markup assumptions, style parity across field types, multi-element widgets, positional drift).
  - Define layout, inline-end padding, and comment-button positioning on base classes (`.w-field`, `.w-field-row`, `.chooser`), not comment-specific modifiers like `.w-field--commentable` — keeps non-commentable fields styled identically.
  - For flexbox alignment, add one wrapping element in the widget template instead of CSS-only workarounds — widgets can render multiple top-level elements.
  - When adding a field-type block for `.w-field__comment-button`, copy the full positioning declaration set from adjacent field-type blocks — partial copies drift and misalign comments.
<!-- rule:1185 -->
- For closed states in dropdown/popover components, use `opacity: 0` + `pointer-events: none` instead of `visibility: hidden` — `visibility` kills fade-out transitions. Drive end-of-transition styling with `[hidden]`-based selectors (e.g. `:has(:not([hidden]) > ...)`) rather than immediate `[data-state]` attrs, which flash or shift layout mid-transition. — These choices in `client/scss/components` preserve smooth fade animations and avoid visual glitches users notice immediately.
<!-- rule:2309 -->
- Pair `:hover` with `:focus-within` on the component root class (`.chooser`, not `.w-field__input`) — keyboard users reach revealed controls, and nested instances stay independent — 
<!-- rule:593 -->
- Keep a default `&:hover` in base SCSS partials (`client/scss/components/*.scss`) using shared design tokens — variants and consumers that don't override hover still get consistent interactive feedback; only remove hover styles when an intentional replacement exists. — Preserves consistent hover behavior for consumers that don't define their own, and prevents silent UX regressions when a variant forgets to override.
<!-- rule:1685 -->
- Reuse existing button styles for hover states — match a reference component (e.g. the chooser's "Add an image" button, like `.w-header-button`) and only declare the properties that actually differ from the base button state; restating identical values duplicates styles and drifts out of sync when the base changes. — The rule is a styling convention for authoring hover states in `client/scss/components/_button.scss`. Duplicating base declarations means every change to the base button (spacing, color, transitions) must be mirrored across every hover override, which silently breaks visual consistency. Scoped globally but most relevant to contributors editing `client/scss/components` partials.

## File-Specific Rules

### `client/scss/components/_button.scss`

<!-- rule:1922 -->
- Style disabled button icon-wrapper borders with grey design tokens (e.g., `$color-grey-4`) in `client/scss/components/_button.scss` — reusing the enabled border color leaves the disabled state visually indistinguishable; the established palette keeps it obvious and on-theme. — Gives the concrete token (`$color-grey-4`) and file path so an assistant editing `_button.scss` knows exactly what to change, plus the visual reason for not inheriting the enabled border color.

### `client/scss/components/_listing.scss`

<!-- rule:1063 -->
- Keep listing/chooser styles in the shared `client/scss/components/_listing.scss` partial and scope selectors (`.index`, `.indicator`, icon alignment/spacing) to cover every listing markup variant — single-variant selectors silently miss the others when markup changes — The rule governs the contents of `client/scss/components/_listing.scss` and its selector scope, and contrasts it with dedicated component partials like `_bulk-actions-choices.scss`. Preserving those file paths and class names is essential for an assistant editing these stylesheets.
  - Fix icon alignment in shared overrides in `_listing.scss` instead of patching individual icons with utility classes — keeps all variants aligned consistently
  - Give standalone components a dedicated namespace and partial, e.g. `.bulk-actions-choices` in `client/scss/components/_bulk-actions-choices.scss` — overriding shared selectors like `.footer__container` couples unrelated markup and breaks other callers

<!-- /braindump -->