# CSS & SCSS Styling

> Rules for stylesheets: logical properties, layout (flex/grid/gap), units, transitions, media queries, breakpoints, borders, forced-colors, and SCSS module system.

**When to check**: When writing or editing CSS/SCSS styles or design-system styling.

## Rules

<!-- rule:742 -->
- Use CSS/utility classes from the project stylesheet/SCSS, never inline `style=` or raw CSS in `className` (applies across HTML, templates, Python render methods, tests, and docs) — keeps theming, overrides, and CSP consistent across the codebase — Inline styles are hard to override, break theming, and violate CSP; centralizing in stylesheet/SCSS sources keeps visual consistency and lets themes and security policies apply uniformly.
<!-- rule:344 -->
- Use CSS logical properties in `client/scss/` and `docs/_static/css/` (`margin-inline-start`, `padding-inline-end`, `inset-inline-start`, `border-inline-start`, `border-start-start-radius`) instead of physical `left`/`right` variants — Stylelint's `csstools/use-logical` enforces this, and physical props break RTL layouts — The rule keeps the two full mapping tables (physical→logical) intact but compresses the enumerated pairs into a single parenthetical list, preserving the exact logical property names an assistant must write and the two project directory scopes. The 'Stylelint enforces this' clause replaces the abstract 'this is the convention' framing with a concrete, project-specific enforcement mechanism (the user noted enforcement is via the project's Stylelint), and the RTL rationale gives a functional reason rather than an appeal to authority.
<!-- rule:1903 -->
- Scope forced-colors fixes to `@media (forced-colors: active)` — base styles stay untouched so normal themes aren't regressed — Forced-colors overrides in base styles leak into default themes and break them; keeping them in the media query makes intent explicit and prevents cross-theme regressions. Within that block, only system color keywords and `currentColor`/`transparent` render reliably, since user-agent overrides replace custom properties unless `forced-color-adjust: none` is set. Using `outline` instead of `border` for transparent indicators avoids reflow. Centralizing contrast fixes in shared tokens (e.g. `border-furniture`) keeps a single source of truth and prevents token sprawl.
<!-- rule:2559 -->
- Validate CSS/SCSS syntax manually before submitting: spell property names correctly, use values valid for the target property, and terminate every declaration with a semicolon; do not rely solely on the linter to catch these errors. — The rule applies to all CSS/SCSS authoring across multiple areas of the repository (client/scss and wagtail/.../scss), not to a single directory. It is a global code-style rule about manually validating stylesheet syntax before submission. Root AGENTS.md is the best place because it is broadly scoped, has no clear single directory owner, and should be discoverable by AI assistants working on any stylesheet. The imperative is: manually verify CSS/SCSS syntax (correct property names, valid values, trailing semicolons) instead of assuming the linter will catch mistakes. The WHY is that linters in this project may not flag all syntax issues, and broken stylesheets silently fail to render in browsers. Keep it concise and format code identifiers in backticks. Since this is CSS, there aren't many class names to preserve, but the rule could reference `client/scss` and `wagtail/.../scss` if useful for scope. Keep under 100 characters ideally for the rule itself, though rationale can be longer.
<!-- rule:2920 -->
- Keep UI animations short (~0.1s) and use color/underline over scale/transform on frequent controls — motion on busy controls slows perceived responsiveness and distracts. — Fast, subtle motion keeps the UI feeling responsive; scale/transform on frequently used controls (checkout buttons, nav items) causes reflow jank and distracts users from the action.
<!-- rule:2519 -->
- Use the project's `transition` mixin, not raw CSS `transition` — keeps shared duration variables and motion consistent — Rephrased into four imperative bullets under the code_style category. Preserved all project-specific references: the `transition` mixin, `@include transition(...)` syntax, the specific layout-affecting properties, and the `transform` dual-use caveat. Each bullet includes the WHY (consistency, single source of intent, avoiding reflow, avoiding conflict) rather than appealing to rules.
  - Pass multiple transitioned properties as one comma-separated `@include transition(...)` call — keeps intent in one place
  - Transition only compositor-friendly properties; avoid `transition: all` and layout-affecting `top`/`left`/`right`/`bottom`/`width`/`height` — these force reflow and janky animation
  - Use `transform` for animation and off-screen movement, but not for layout positioning when the element already animates via `transform` — prevents the two roles from fighting
<!-- rule:650 -->
- Avoid `!important` in CSS/SCSS (stylelint `declaration-no-important` blocks it) — bump selector specificity (e.g. `.button.component__element`), reorder source, or use utility classes instead; on template elements overriding Tailwind, use the `!` prefix (`!my-0`) sparingly rather than a one-off class; if truly unavoidable for an external stylesheet, add `// stylelint-disable-next-line declaration-no-important` with a comment. — Specificity and source order keep cascade behavior predictable; `!important` tends to cascade and force later overrides to escalate, and Tailwind's `!` prefix keeps overrides local to the template.
<!-- rule:206 -->
- Reuse the global `.button` styles instead of duplicating base/disabled/variant CSS in component files. — Keeps button sizing, disabled states, and variants consistent across `client/scss/components/_button.scss` and Wagtail templates that consume `.button`/`button button-small` classes.
<!-- rule:1243 -->
- Use the project's established breakpoint scale and tokens — one-off breakpoints drift from canonical values and break responsive consistency across `client` and Wagtail admin SCSS — One-off breakpoints desync tokens and produce inconsistent layouts; ratio vs fixed units scale differently, so up-broadening the viewport is where they break.
  - When responsive changes mix ratio-based (`%`, `vw`, `em`) and fixed (`px`) units, validate from the relevant breakpoint upward — mixed units fail differently at each viewport
<!-- rule:2993 -->
- Use unitless `0` in CSS/SCSS (`padding: 0`, not `0px`/`0rem`) and omit SVG `x`/`y` attributes when they are `0` — omitted SVG positions default to `0`, and unitless zeros are shorter and equally valid — Keeps stylesheets lean and consistent; avoids redundant units and SVG attributes that browsers already default to `0`.
<!-- rule:1928 -->
- Apply text color once on the common ancestor via `w-text-current` / `color: inherit` / `color: currentColor`, not per-child — reduces duplication and keeps theme overrides controllable from one place. Still set explicit `color` on hover/focus/active states when the background contrast differs from the inherited context. — Why it matters: centralizing color inheritance prevents scattered hardcoded values that diverge over time and lets a single ancestor override (e.g. dark mode, themed sections) propagate to all children without chasing down individual utilities. The exception exists because inherited color may fail contrast requirements on interactive state backgrounds.
<!-- rule:1921 -->
- Give buttons, bulk-action footers, and filter/dropdown menu items a visible border or non-color affordance — low-opacity borders like `rgba(0, 0, 0, 0.25)` and text color alone leave controls looking non-clickable — Users can't recognize interactivity without a non-color cue; this matters across `client/scss/components/_dropdown-button.scss`, `_listing.scss`, `_bulk_actions.scss`, and `wagtail/admin/static_src/wagtailadmin/scss/components/_listing.scss`.
<!-- rule:2121 -->
- During style refactors in `client/src/components/**/*.scss` and `client/scss/components/**/*.scss`, never change rendered dimensions, spacing, or breakpoints unintentionally — keeping refactors visually inert keeps diffs reviewable and prevents regressions in other components that share those classes. — Cross-cutting style files are shared, so a silent dimension or breakpoint change leaks to every consumer; keeping refactors visual no-ops makes review tractable and avoids collateral layout bugs.
<!-- rule:2236 -->
- Space flex/grid children with `gap` (Tailwind `gap-*` / `w-gap-*`, using `theme('spacing.N')` tokens) — not child margins or `justify-content: space-between`, which break when item counts or wrapping vary. Use `gap-x-*`/`gap-y-*` when row and column gaps differ, e.g. `w-flex-wrap` + distinct x/y gaps to wrap cleanly; fall back when browser support for `gap` isn't guaranteed. — Child margins collapse and `space-between` strands wrapped flex items — `gap` handles variable item counts and wrapping predictably while staying on design-system spacing tokens.
<!-- rule:513 -->
- Avoid `overflow: hidden` on sidebar/menu containers — it clips nested submenus; fix the underlying layout/scroll issue instead — Container-level `overflow: hidden` in `SidebarPanel.scss` and admin menu containers clips submenus that extend beyond the parent bounds, making them unreachable. Correcting the layout/scroll behavior keeps submenus visible without suppressing overflow globally.
<!-- rule:596 -->
- Use `border-color: currentColor` when a border should track text colour — avoids duplicating colour values — Concise, imperative bullets with backticked CSS identifiers. Each explains the WHY (geometry stability, theme rendering, focus distinguishability) rather than asserting a rule. Splits the long compound rule into independent actionable items while preserving all project-specific CSS patterns (`currentColor`, `border-color` toggling, `box-shadow: 0 0 0 1px`, `outline` reservation, `border: 0`).
  - Toggle border visibility via `border-color` (transparent ↔ visible), not `border-width` — keeps border geometry stable so states don't shift layout
  - Give the base variant a transparent border when the selected variant adds one — prevents layout shift on selection
  - Use `box-shadow: 0 0 0 1px <color>` for small indicators instead of a real border — doesn't disturb box geometry
  - Reserve `outline` for focus indicators, never permanent borders — focus styling must stay distinguishable
  - When no border is wanted, remove it with `border: 0`/`none` — `border-color` matching `background-color` renders unexpectedly across themes and obscures the intended visual state
<!-- rule:1698 -->
- Use flexible-width containers (`width: auto; max-width: auto`) for translatable UI text — hardcoded widths tuned to English break in other locales — Preserves the component-specific SCSS files named in the rule (`_status-tag.scss`, `_logo.scss`, `_login.scss`) and the Wagtail admin template context, while compressing the two-branch wrapping/truncation decision into imperative bullets with locale-compatibility reasoning.
  - Wrap localizable labels (`_status-tag.scss`, `_logo.scss`, `_login.scss`, nav/header) with `overflow-wrap`/`word-break` in the component's own SCSS — avoid `white-space: nowrap`, and avoid wrapping overrides on unrelated selectors
  - If a fixed-width label constraint must stay, shorten the label text instead of overriding the layout
  - Truncate select/dropdown/control values with ellipsis (`text-overflow: ellipsis; overflow: hidden; white-space: nowrap`) instead of horizontal scrolling — the full value is still reachable by opening the control
<!-- rule:2537 -->
- In SCSS, use `media-breakpoint-up($breakpoint)` (from `client/scss/_tools.breakpoints.scss`) and shared media vars like `$media-forced-colours` instead of raw `@media (min-width: $screen-*-min)` or literal values such as `active` — reuse the canonical breakpoints so responsive styles stay consistent project-wide; search for an existing variable or convention before adding a literal. — Hardcoded media-query values drift from the project's shared breakpoints, so a later change to `client/scss/_tools.breakpoints.scss` silently skips those styles.
<!-- rule:1932 -->
- In flex layouts, pick `align-items` by content shape: `center` for single-line content next to fixed-height siblings (`button`, dialog header), `flex-start` when a fixed-size icon/preview sits beside wrapping text so it aligns with the first line. Strip child `margin-bottom` (e.g., title/subtitle) or set `height: 100%` on the centered item — default spacing/height silently breaks the intended alignment. — Mixed flex content fails silently: icons drift to the middle of multi-line text and margin/height defaults push centered items off-axis, producing misaligned UI that's easy to miss in review. Choosing `align-items` by content shape and neutralizing child spacing keeps buttons, headers, and icon+text rows aligned across component SCSS (`_footer`, `_userbar`, `_chooser`).
<!-- rule:2074 -->
- Use `@use`/`@forward` instead of deprecated `@import` in SCSS — module system enables namespacing and avoids duplicate CSS emission. — Prevents style leakage and repeated rules from `@import`'s global scope; the module system keeps symbols encapsulated.
<!-- rule:3004 -->
- Use robust CSS sizing units for UI controls and inline graphics: prefer `em`/`rem` over hardcoded `px` for form-control padding/heights, and `em` rather than `%` widths for icons/spinners — keeps sizes stable across zoom, font-size, and parent-width changes. — This is a global CSS code-style rule that applies across multiple UI areas and directories (wagtail admin CSS and client SCSS components). It is not tied to a single file, entity, or directory-specific module, and there is no clear file-coordination requirement that would justify cross_file placement. The rule should be discoverable by AI assistants as a general frontend styling guideline, so the best placement is AGENTS.md at the repository root.
<!-- rule:2592 -->
- Override individual border aspects with longhands (`border-color`, `border-style`, `border-inline-end-color`), never the `border` shorthand — The shorthand resets width, style, and colour together, so a partial override silently clobbers the other border aspects. Prefer logical longhands (`border-inline-end-color`) over the `border-inline` shorthand where compatibility requires it, and skip `border-color` when the `border` shorthand already sets the colour.
<!-- rule:2582 -->
- Avoid `width: 100%` on block elements (`<div>`, `display: block`) — they already fill their container, and the override adds noise that fights mode/class rules setting width. — Redundant declaration creates confusing override chains when more specific mode/class rules set width; use `max-width` only when a genuinely narrower layout is needed.
<!-- rule:2585 -->
- Update CSS selectors when changing an element's tag or `role` — e.g. target `[role="main"]` or a dedicated class instead of the raw element, so layout and styles don't silently break. — Keeps semantic markup and CSS in sync; prevents orphaned selectors and visual regressions when semantic elements are swapped for `role`-carrying `<div>`s or styles are relocated.
<!-- rule:1255 -->
- Write standard unprefixed CSS properties and `@keyframes` in templates and static styles — let autoprefixing emit the prefixes your browser support matrix requires, since hand-authored vendor duplicates go stale and drift from that matrix — Hand-written vendor prefixes duplicate work the build tooling already does, and they rot as the support matrix moves — the build config is the single source of truth for which prefixes are needed.
<!-- rule:1536 -->
- In CSS/SCSS, write selectors to be clear, consistent, and minimally specific: use the correct combinator for the intended element relationship, split selectors that target unrelated elements, apply readability simplifications uniformly across similar selectors, and move component-part rules outside parent container selectors to reduce unnecessary nesting/specificity. — The rule governs CSS/SCSS selector authoring conventions and the evidence spans multiple independent directories (client, wagtail, wagtailadmin), not a single module or file pair. It is a general style rule rather than a file-sync relationship, so it belongs at the repository root where an AI assistant authoring selectors anywhere in the codebase will encounter it. Directory-scoped placement would fragment the rule and file-level placement would be too narrow given the cross-directory distribution.
<!-- rule:1923 -->
- In compact controls, use radio buttons for small fixed option sets and constrain dynamic lists with wrapping/scrolling CSS — dropdowns truncate long labels and overflow their containers. — Preserves the UI/UX intent without naming a specific file, since the rule spans client styles and wagtail admin templates. The imperative form leads with the action, and the rationale explains the failure mode (truncation/overflow) rather than appealing to convention. Both the radio-vs-dropdown distinction and the CSS constraints are kept because they are the actionable core; the parenthetical alternatives (wrapping, scrolling, container constraints) are folded into the phrasing to keep the bullet short while retaining the choice of techniques.
<!-- rule:2546 -->
- Use explicit `100vh`/`100%` for full-height layout, not `position: fixed` or implicit flex sizing — detached/ambiguous sizing breaks scroll and overlay behavior when parent containers change. — The rule is a global CSS layout convention applying across client and wagtail directories.
<!-- rule:1302 -->
- Prefer SVG icons over legacy icon fonts — wrap remaining legacy `font-family` usage in a Sass variable so `.stylelintrc.js` rules can be enforced globally instead of permanent `null` exceptions. — Icon fonts are deprecated; migrating them to a Sass variable lets `.stylelintrc.js` enforce rules repo-wide (e.g. in `wagtail/contrib/` styleguide templates) without permanent exceptions.
<!-- rule:251 -->
- Prefer Sass `//` for single-line comments in `.scss` files — e.g. `// Explain layout intent`; reserve `/* ... */` block comments in `client/scss/**/*.scss` for multi-line comments only. Sass strips `//` from compiled CSS, so it avoids shipping stray comments and skips the blank-line spacing rules required around `/* ... */` blocks. — `//` comments don't appear in the compiled output and aren't subject to block-comment spacing rules, so use them by default; `/* */` is only worth the extra formatting constraints when the comment must span multiple lines.
<!-- rule:2538 -->
- Only include properties that actually change inside `@media` rulesets — repeating base declarations bloats CSS and obscures what each breakpoint really does — Keeps `@media` blocks focused on breakpoint-specific intent; duplicated property/value pairs on the same selector add dead weight to compiled CSS and make it hard to see at a glance what actually shifts at each breakpoint.
<!-- rule:2619 -->
- On dark backgrounds, apply `-webkit-font-smoothing: antialiased` + `-moz-osx-font-smoothing: grayscale` to light text and reuse standard project link styles (not ad-hoc colors) — off-standard overrides break theme consistency and can fail contrast at some breakpoints. — Keeps text legible on dark surfaces and preserves the project's link styling contract, avoiding one-off color overrides that drift from the design system or fail WCAG contrast at certain breakpoints.
<!-- rule:1068 -->
- Prefer unitless `line-height` (e.g. `1.5`) and only declare it when necessary — inherited values scale with each element's own `font-size`, so children don't inherit a stale pixel height. — Unitless line-height inherits as a multiplier and recomputes against each descendant's `font-size`; explicit `px`/`em` values bake in a fixed height that breaks when typography changes. Relying on inherited/default values avoids redundant declarations and keeps vertical rhythm consistent across components and layouts under `client/`. This applies globally to any stylesheet, not just `client/`.
<!-- rule:533 -->
- Use responsive constraints (`max-width`, %) not fixed pixel widths for preview iframe wrappers in `client/scss/layouts/_page-editor.scss` and `wagtail/admin/templates/wagtailadmin/shared/side_panels/preview.html` — fixed widths overflow small viewports; for the "Preview not available" iframe in the preview controller JS, hardcode a mobile device width so the message stays readable regardless of the selected preview device. — Preserves the cross-cutting preview sizing convention across template, JS, and SCSS so previews don't break on narrow screens.
<!-- rule:2076 -->
- Keep SCSS export partials (e.g. `_variables.scss`) pure Sass — only variables, functions, and non-emitting mixins, no `:root {}`, selectors, or property declarations. Any CSS-emitting rule here leaks styles everywhere the partial is imported. — When shared export partials emit CSS, importing them for a variable pulls in unintended styles, breaking layout in unrelated components.
<!-- rule:2539 -->
- Keep component `@media` overrides in the component's own stylesheet, scoped inside the query — Overrides in page or downstream stylesheets split a component's behavior across files, and unscoped condition overrides (e.g. `forced-colors: active`) leak into every context; keeping both base styles and their `@media` overrides together makes the component portable and its behavior predictable.
<!-- rule:3063 -->
- Wrap non-essential CSS animations in `@media (prefers-reduced-motion: no-preference)` — respects users' OS-level motion preferences (a11y) — This is the standard opt-in pattern: animations only run for users who haven't requested reduced motion, avoiding vestibular discomfort without disabling motion for everyone.
<!-- rule:2318 -->
- Use `:has(:checked)` on a suitable container instead of long `#id:checked ~ ...` chains in `welcome_page.css` — keeps checkbox-state selectors readable and easier to evolve. — Selector readability (welcome page) and preventing unintended side effects in shared base CSS (normalize).
  In `normalize.css`, modify existing widget-specific checkbox styles rather than adding generic checkbox rules — generic base styles leak into every admin widget that uses checkboxes.
<!-- rule:1362 -->
- Use double-colon `::before`/`::after` for CSS pseudo-elements — single-colon is deprecated and breaks CSS3 compatibility — Use double-colon `::before`/`::after` syntax—invalid single-colon form is deprecated and can be misparsed
<!-- rule:1899 -->
- Keep `{` on the same line as the final selector in SCSS/CSS — matches Prettier defaults and avoids noisy diffs — Standard SCSS/CSS formatting convention across the repo so AI assistants produce consistent style regardless of file location.
<!-- rule:1898 -->
- Rule text: In SCSS/CSS, ensure curly braces remain balanced when nesting blocks (e.g., `@media` queries inside selectors); remove extraneous closing braces to avoid syntax errors. — I need to transform this rule into an AGENTS.md bullet point. The rule is about brace balancing in SCSS/CSS nesting. Key considerations:

1. Imperative mood
2. Include WHY (prevents syntax errors, breaks compilation)
3. Under ~100 chars for the rule ideally
4. Preserve project-specific refs — but this rule has no specific class/file names. It mentions `@media` queries and SCSS/CSS. Placement is root AGENTS.md.
5. Use backticks for code identifiers

Let me draft:

"Balance curly braces in nested SCSS blocks (e.g., `@media` inside selectors) — stray closers break compilation"

Let me count: that's about 108 chars. A bit long but rationale extends. Let me think if I can tighten.

"Keep curly braces balanced in nested SCSS blocks — extraneous `}` break compilation"

Hmm, I should keep the `@media` reference as it's concrete and valuable.

"Balance braces when nesting SCSS blocks (e.g. `@media` in selectors) — stray `}` causes syntax/compile errors"

Count: Balance braces when nesting SCSS blocks (e.g. `@media` in selectors) — that's ~70 chars, plus rationale.

The format asks for the rule and rationale. I'll produce something like:

- Balance curly braces in nested SCSS blocks (e.g., `@media` inside a selector) — a stray `}` fails compilation

That's decent. Let me finalize. Actually I should present just the guideline, not meta commentary. The user's instruction says transform raw rule into concise actionable guideline. I'll output the bullet. But the format seems to expect maybe just the text. I'll give the bullet point.

Let me reconsider length: "Balance curly braces in nested SCSS blocks (e.g. `@media` in selectors) — stray `}` breaks compilation" — main rule ~104 chars. Acceptable; rationale clarifies.

I'll output it cleanly. No examples needed since none provided. I could optionally add a code snippet but they said Example: None. Keep it minimal.}
<!-- rule:2023 -->
- Keep layout/spacing on a stable wrapper when children can be conditionally hidden — or reset inherited `space-y-*` on the hidden child — so toggling visibility doesn't leave stray gaps. — Utilities like `space-y-*` attach margins to siblings; hiding a child leaves its margin behind, causing layout shifts between visible/hidden states across templates and `SCSS`.
<!-- rule:2660 -->
- Use Flexbox sticky footers (flex column + `min-height` on the page container) instead of `position: fixed` — adapts to content height changes and avoids scroll overlap. — `position: fixed` footers overlap content and break when page height changes; Flexbox keeps the footer in flow while pinning it to the viewport bottom.
<!-- rule:2677 -->
- Keep trailing `/*$token-name*/` comments on CSS values that mirror design tokens — preserves token traceability, so update renamed tokens instead of deleting the comment. — Traceability between hard-coded values and design tokens prevents drift; stale comments mislead, so update rather than delete.
<!-- rule:668 -->
- Set `flex-shrink: 0` on icons and minimize `flex-grow` in flex/inline-flex — unset defaults let icons crush and siblings refuse to wrap when containers narrow (see `client/scss/components`). — Explicit sizing keeps icons crisp and lets siblings wrap under constraint; relying on flexbox defaults causes compressed icons and overflow in narrow containers.
<!-- rule:532 -->
- Apply background styling to the wrapper element in the preview template, not the `<iframe>` — background renders before the iframe loads and keeps fallback messages readable in dark themes. Cross-file rule: update both the preview SCSS and the preview HTML template together. — The iframe element's own background isn't painted until the iframe document loads, so any background color set on it lags behind the wrapper. Keeping styling on the wrapper in the preview template ensures the correct background appears immediately and dark-theme fallback text stays legible. Because the constraint spans the preview stylesheet and the preview HTML template, both files must change in lockstep.
<!-- rule:2661 -->
- Give reusable footer styles a `border` or equivalent visible separation — keeps them distinguishable from their background in high-contrast mode. Example: `client/scss/components/_listing.scss`. — Includes the why (high-contrast visibility), preserves the evidence file path.
