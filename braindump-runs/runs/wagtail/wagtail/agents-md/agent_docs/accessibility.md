# Accessibility (a11y)

> Rules for ARIA roles/attributes, labels, landmarks, focus management, alt text, live regions, tab widgets, and accessible terminology.

**When to check**: When adding or reviewing ARIA, focus behavior, alt text, landmarks, or other accessibility features.

## Rules

<!-- rule:831 -->
- Give labelling/help text a stable `id` and reference it from the target via `aria-describedby` (help, warning, status) or `aria-labelledby` (primary label); derive both IDs from one canonical identifier — keeps screen-reader associations in sync. — Deriving both IDs from one canonical identifier means renames propagate cleanly and the labelling element can't drift out of sync with its reference; keeping the `-helptext` (not `_helptext`) suffix preserves consistency with existing Wagtail admin templates, and asserting the referenced element+text in tests catches regressions where the `aria-describedby`/`aria-labelledby` target disappears.
  - Use the `-helptext` (hyphen) suffix for Wagtail admin help text, not Django's `_helptext` — matches existing admin conventions; in tests, assert the referenced element exists and has the expected text.
<!-- rule:65 -->
- Use `for`/`id` pairs or wrap the control inside the `<label>` to associate labels and controls — `for` targets the control's `id`, never its `name`, since `name` is serialized on submit and changing it for label wiring breaks form data. Give labelable controls both an `id` and a `name`, and never point `for` at hidden inputs or non-labelable elements. — Accessible label association. `name` is form-submission data, so using it as a label target forces renaming and corrupts payloads.
<!-- rule:951 -->
- Use spec-defined hyphenated ARIA names (`aria-labelledby`, not `aria_labelledby`) — underscore/misspelled forms silently fail a11y — Browsers don't recognize non-spec attribute names, so assistive tech gets no annotation and nothing errors at dev time. Always pass string values to `setAttribute`/JSX so booleans aren't coerced into `'true'`/`'false'`. For boolean HTML attributes (`disabled`, `hidden`, `checked`), stick to reflected DOM properties (`element.disabled = value`) for both setting and unsetting — mixing `setAttribute`/`removeAttribute` with property assignment leaves the DOM and the property out of sync.
<!-- rule:1455 -->
- Implement ARIA tab widgets as `role= — 
<!-- rule:2571 -->
- Use `alt=""` for decorative images — screen readers skip them, so omit alt text entirely rather than padding it — Empty `alt` tells assistive tech the image is presentational and can be ignored; a filename or placeholder forces screen readers to announce meaningless noise, while outcome-based descriptions give users the information sighted users get from the image.
    - Applies to all rendered markup: RST docs, `docs/_static/js` strings, and Wagtail templates
    - For informative images, describe the outcome or UI state conveyed — never a filename or bare label (e.g. avoid `alt="hero.jpg"`)
<!-- rule:1225 -->
- SVG icons: mark decorative icons `aria-hidden="true"` with no `<title>` and `focusable="false"` (IE11), and give informative icons a meaningful label — screen readers otherwise announce nothing or duplicate. — Decorative icons that aren't hidden spam screen readers with noise; informative icons that aren't labeled make links and buttons unusable. Describing the link destination (rather than the icon glyph) in an SVG-only link is what assistive tech actually needs. Requiring every render path (sprite-backed vs custom-path, React vs Django/Wagtail templates like `shared/icon.html` and `welcome_page.html`) to honor the `title` prop prevents silent regressions where one path drops the label.
  - If an SVG is a link's only content, its `<title>` must describe the link's destination/purpose, not the graphic — prevents unnamed or misleading links.
  - When `Icon.tsx`/`Icon.js` or `shared/icon.html` receives a `title` prop, render the visually hidden title in **every** rendering path (sprite-backed *and* custom-path) — divergent paths silently drop labels and break parity with `welcome_page.html` templates.
<!-- rule:1186 -->
- Never rely on `mouseleave` alone to dismiss dropdowns/menus; add `Escape`, `focusout`/`blur`, click-outside, or an explicit close control — mouse-only dismissal traps keyboard users (see `client/src/controllers/DropdownController.ts`, `client/scss/components/_dropdown*.scss`). — Splitting into two bullets because they're distinct traps: the first covers dismissal mechanics, the second covers a common CSS misconception. Preserving the concrete file paths (`DropdownController.ts`, `_dropdown.legacy.scss`, `_dropdown-button.scss`) and the specific techniques (`Escape`, `focusout`, `inert`, `tabindex="-1"`) keeps the rule actionable rather than abstract.
  - `pointer-events: none` blocks clicks only, not tab order — hide/disable focusability separately (`tabindex="-1"`, `display: none`, or `inert`) so hidden menus stay out of the keyboard path.
<!-- rule:958 -->
- Add `role="status"` + `aria-live="polite"` to dynamic status/notification containers in Wagtail admin templates — screen readers announce updates; never add ARIA live roles to static content, which produces spurious announcements — Dynamically updated containers need an ARIA live region so assistive technologies announce content changes; static content doesn't change, so a live region there would fire misleading or noisy announcements.
<!-- rule:675 -->
- Give every Wagtail admin interactive control a localized accessible name; icon-only controls need `aria-label` via `{% trans %}` or the component's accessible-label API rather than `title`/`data-tippy-content`, which hover-only users may never hear. If visible text already names the control, don't add a conflicting `aria-label` (e.g. don't set both `toggle_label` and `toggle_aria_label` — use `toggle_describedby` for extra context). For tooltips/toggletips, use the project's accessible pattern (`w-tooltip`, focusable trigger with `aria-expanded`/`aria-controls`, or `w-sr-only`) instead of native `title`. — Screen readers and keyboard users need consistent names for admin controls; `title`/`data-tippy-content` are hover-only and redundant labels confuse AT output.
<!-- rule:114 -->
- Use precise accessibility terms: `plain language` not `readability`, `accessible` not `visible`, `useful` not `helpful`/`important`, `text` not `content`; reserve `compliance` for legal duties, `meeting standards` for voluntary ones — vague wording misleads users and blurs the legal/voluntary line — These distinctions matter in accessibility contexts: 'visible' implies sight-only access, 'readability' is a narrower concept than plain language, and conflating 'compliance' with voluntary guidelines can create false legal exposure or lull teams into skipping real obligations. Consistency across labels and docs also prevents users and auditors from second-guessing intent.
<!-- rule:1573 -->
- Declare keyboard shortcuts only via `aria-keyshortcuts` on the triggering element (e.g. `<button>`); read it as fallback in controllers like `KeyboardController` when `data-w-kbd-key-value` is unset — one source of truth avoids stale/divergent shortcut definitions. — Duplicating shortcuts on both `aria-keyshortcuts` and the controller's private `data-w-kbd-key-value` lets them drift; screen-reader users and the controller then disagree about what key actually fires the action.
<!-- rule:66 -->
- Group related form controls with `<fieldset>`/`<legend>` (legend may be visually hidden) — gives screen readers an accessible group name, unlike visual-only wrappers, headings, or `<label>` — Preserves the semantic grouping pattern used across Wagtail template modules (e.g. `contrib/search_promotions`, `images`, `users`) and ensures assistive tech announces a group label, which visual-only markup cannot.
<!-- rule:659 -->
- ... — ...
<!-- rule:473 -->
- This is the raw rule provided by the user: "Use landmarks appropriately in templates. Do not hard-code ARIA landmark roles/elements inside reusable component templates; place landmarks in the consuming layout/template (Wagtail templates and reusable components), on the appropriate wrapper container rather than inner interactive elements, and omit the landmark if the component's context or frequency does not warrant one, following existing landmark placement patterns. For the primary content region, use a semantic landmark (`<main>` or an element with `role=\"main\"`) and target it with stable selectors: prefer a class as the styling hook and use a fallback selector chain such as `main, [role=\"main\"], body` when querying content. For templates that must support IE11, use explicit ARIA landmark roles compatible with legacy browsers: prefer `<div role=\"main\">` over the HTML5 `<main>` element, or include an explicit `role=\"main\"` if `<main>` is used." — Landmark rules are global accessibility conventions for Wagtail templates, so they belong at the repo root.
<!-- rule:1369 -->
- Style UI state from a semantic attribute (`[aria-current="page"]`, `[data-preview-size]`), never parallel classes like `.is-current` — one state source can't drift. — Derived from 7 PRs / 13 comments spanning component SCSS, Django templates, and JS entrypoints. Consolidating state into a single semantic attribute (ARIA / `data-*`) keeps markup, JS, and SCSS in sync and avoids class-value drift.
  - Put ARIA state on the interactive element: `aria-current="page"` on the current pagination `<a>`, `aria-selected`/`aria-pressed` on the control.
  - For mutually exclusive states, overwrite one data attribute (e.g. `data-preview-size`) instead of swapping exclusive classes.
  - Name state markers after the component/target (`header`), not the state value (`header-expanded`) — the attribute value carries the state.
  - Match conditional state classes to real semantics (apply the collapsed-state class when *not* expanded).
  - Apply affordances like `cursor: pointer` to the base interactive option selector, not only the JS-applied ARIA state selector — otherwise hover feedback lags until JS runs.
<!-- rule:3000 -->
- Put the close/dismiss control first in DOM order for dismissible components (`panels`, `dialogs`, `popovers`, closeable sections) and restore focus to the opener on close — keeps tab order predictable and prevents keyboard users from losing their place. — First-in-DOM close button makes dismiss reachable on the first Tab press; focus restoration on close keeps keyboard and screen-reader users from being dropped at the top of the page. Spanning both `wagtail/admin` templates and the page editor JS keeps the two surfaces consistent.
  Applies to both `wagtail/admin` templates and the client-side page editor JS.
<!-- rule:954 -->
- 
<!-- rule:1231 -->
- In Wagtail admin listing/chooser templates (`wagtail/admin`, `wagtail/users`, `wagtail/documents`, `wagtail/images`): — Cross-cutting convention spanning admin chooser/listing templates and shared listing SCSS; root-level placement is most findable.
Scope: Wagtail admin listing/chooser templates and shared listing SCSS.

Good: matches codebase style; single root AGENTS.md placement.
Bad: deontological phrasing; splitting rule across files.

Prevents: inaccessible checkboxes, inconsistent chooser styling, overlapping click targets, and styling gaps in checkbox-only listings.
  - Always pass a meaningful `aria_label` to the shared checkbox partial, derived from the row object (never an undefined context var) — screen readers otherwise announce every row identically.
  - Size/style the checkbox column like the page-explorer listing rather than letting it auto-expand — keeps choosers visually consistent with admin.
  - Leave ≥~10px between the checkbox and the adjacent item link — overlapping click targets cause accidental selections.
  In `client/scss/components/_listing.scss`, target checkboxes structurally via `td:first-child input[type='checkbox']` / `th:first-child input[type='checkbox']` instead of a bulk-actions class — checkbox-enabled listings exist without the bulk-actions mechanism, so class-based selectors silently miss them.
<!-- rule:952 -->
- Only set ARIA relationship attributes (`aria-controls`, `aria-labelledby`, `aria-describedby`, `aria-owns`) when the referenced element with that `id` exists in the same template/DOM. Dangling references silently break screen reader labeling and navigation, and Django templates make it easy to drop the target element without noticing. — ARIA relation attributes are id references; a missing target produces invalid ARIA, no accessible name, and misleading screen-reader behavior. Templates are rendered piecemeal (partials, conditionals, reuse across `wagtail/admin/templates`), so a missing id only surfaces at runtime for AT users.
<!-- rule:2211 -->
- Use `<input type="checkbox">` inside the toggle template + label for state toggles that submit via form/AJAX, and `<button>` for action triggers — native controls give keyboard/screen-reader support and participate in form submission; avoid `<a>`, styled status-tag spans, and hidden `view` inputs. Keep AJAX-reloaded toggles in sync via the teleport/controller pattern or CSS like `:has(input:checked)` for pure visual state. — Native form elements are focusable, announced correctly by assistive tech, and submitted with the surrounding form; links and styled spans silently break keyboard navigation and AJAX payloads. The teleport/controller pattern and `:has(input:checked)` are the established ways to re-sync rendered controls after AJAX reloads in `wagtail/images/templates/...` and `client/scss/components/...`.
<!-- rule:1213 -->
- Mirror accessibility attrs (`aria-hidden`, visually hidden titles) across every rendering variant — e.g. `client/Icon.tsx` and `wagtail/admin/templates/icon.html` must stay in sync; a divergent variant silently drops screen-reader output for assistive-tech users. — This is a general component-rendering pattern (custom icon branches, server-rendered templates vs. their JS counterparts), so it applies wherever a component is rendered more than once — not to a single file or directory.
<!-- rule:2757 -->
- 为每个数据表格提供可访问的 `<caption>`；当设计省略可见标题时，将其视觉隐藏渲染——否则屏幕阅读器用户会失去表格主题 — - 保持面向作者的指导一致，并确保屏幕阅读器对表格用途的描述保持一致。
<!-- rule:2937 -->
- Render icons for interactive controls inside the control's own element (with `pointer-events: none` on purely decorative icons) — prevents clicks landing on the icon and missing the parent handler — When an icon sits as a sibling or absolutely-positioned overlay outside the button/link that owns the click handler, pointer events hit the icon element instead, so the control silently does nothing. Nesting the icon inside the control (as in interactive `<button>`/`<a>` markup and Wagtail admin templates) keeps the hit target on the control itself; decorative icons get `pointer-events: none` so they never intercept events.
<!-- rule:2572 -->
- Match `alt` text wording and capitalization to surrounding prose (e.g., `Explorer page`, not `explorer page`), and spell out concepts instead of symbolic abbreviations like `x` — screen readers mispronounce symbols and translators need stable terminology to reuse. — Alt text is read aloud and translated independently of its context, so drifting terminology or symbolic shorthand (`x`, `→`) gets mispronounced by screen readers and breaks translation memory across `docs/` and `wagtail/` templates.
<!-- rule:2716 -->
- Wrap interpolated values in quotes in accessible labels and `title`/aria text (e.g. `Edit '{title}'`) — screen readers then announce them as a distinct value instead of merging them into the surrounding label. — Without quoting, screen readers run the dynamic value into adjacent label text, making the control's purpose ambiguous; quoting delimits the value (e.g. `View child pages of '{title}'`) so assistive tech announces it separately.
<!-- rule:3010 -->
- Pair color-only state, ownership, or context cues (e.g. `selected`, `owned`, current user vs. other) with a distinct `aria-label`/`title` and a border, ring, icon, or shape — color alone is invisible to screen readers and color-blind users. — Visual/color-only distinctions exclude non-visual users; equivalent labels and shape cues keep state perceivable across modalities.
<!-- rule:2159 -->
- Use the WAI-ARIA radio group pattern for mutually exclusive options — prefer native `<input type="radio">`; if custom, use `role="radio"` + `aria-checked` (never `aria-current` on `<button>`) — screen readers announce selection state correctly only via radio semantics — Bad reasoning: `aria-current` on a `<button>` is announced as a location/page marker, not a selection state, so assistive tech users can't tell which option is chosen.
