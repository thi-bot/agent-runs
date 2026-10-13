# HTML & Template Markup

> Rules for writing HTML and shared template markup: semantic elements, button types, unique IDs, structural elements, icons, attributes, and whitespace.

**When to check**: When writing or editing HTML markup or shared/reusable templates.

## Rules

<!-- rule:2163 -->
- Always set `type="button"` on `<button>` elements that shouldn't submit a form — the browser defaults to `type="submit"`, which causes accidental submissions. — The browser defaults to `type="submit"`, so omitting `type` silently triggers form submission and hard-to-trace bugs.
<!-- rule:391 -->
- Keep DOM `id` attributes unique per page and valid HTML — duplicate IDs break `label[for]`, `querySelector`, ARIA refs, and fragment links. — Duplicate IDs silently break accessibility wiring and DOM queries; invalid IDs (starting with a digit) break `querySelector` entirely. Generating IDs from entity identifiers keeps them stable across renders so `data-*`- or class-based JS hooks stay reliable.
<!-- rule:391 -->
- Keep DOM `id` attributes unique per page and valid HTML — duplicate IDs break `label[for]`, `querySelector`, ARIA refs, and fragment links. — Duplicate IDs silently break accessibility wiring and DOM queries; invalid IDs (starting with a digit) break `querySelector` entirely. Generating IDs from entity identifiers keeps them stable across renders so `data-*`- or class-based JS hooks stay reliable.
<!-- rule:2388 -->
- Order DOM markup to match visual and tab order — don't rely on CSS `order` or visual reordering for focusable controls — Screen-reader and keyboard users traverse the DOM, not the rendered layout, so visual reordering via `order`/`flex-direction: row-reverse` desyncs tab order from what sighted users see and breaks focus expectations. Applies globally across `client` SCSS layout/form files and JS components.
<!-- rule:2614 -->
- Use `<ul>`/`<li>` only for real lists; never orphan `<li>` or use `role="presentation"` on it outside ARIA composite widgets — screen readers announce list semantics, so misusing them (e.g. `<li>` for layout columns, toggles, or single warnings) produces false "list of N items" announcements. For non-list content use `<p>`/`<div>` instead. — Assistive tech infers list structure from `<li>`; orphan or decorative `<li>` elements mislead screen-reader users. `<p>`/`<div>` convey the same layout without false semantics.
<!-- rule:2733 -->
- Remove unreferenced markup hooks — `id`s, `data-*`/`dataset.*`, script-only classes — dead hooks confuse readers and mask real wiring — Orphaned identifiers, `data-*` attributes, `dataset.*` assignments, and script-only classes (including editor-inserted ids in static SVGs or hooks left behind after their consumer script is deleted) suggest active behavior that no longer exists, sending future maintainers on false trails. Check implementation, CSS, JS, ARIA, and tests before deleting.
<!-- rule:240 -->
- Avoid `target="_blank"` in HTML templates unless strongly justified — unexpected new tabs break back-button navigation for users. — 
  When a link does open a new tab, pair it with `rel="noopener noreferrer"` (not just `noopener`) — the double value guards against reverse tabnabbing in browsers that ignore `noopener` alone.
  Omit `rel` attributes on same-tab links — adding them implies a security concern that doesn't exist and invites cargo-culting.
<!-- rule:1441 -->
- Only emit structural/optional elements (`<caption>`, `<col>`, `<td>`, subtitle/description blocks) when they carry content — prevents empty placeholder markup from reaching the DOM — Empty structural tags like `<caption>` or `<td>` still occupy layout slots (e.g., table row/column spans) and pollute the rendered output; guarding them with a conditional keeps the markup clean and avoids accessibility/rendering quirks in `wagtail/admin/templates/...` and `wagtail/users/templates/...`.
<!-- rule:404 -->
- Render icons via the shared abstractions (`Icon` React component in `client/src/components/Icon/`, server-side `{% icon name=".." %}` tag) — never hand-author the SVG/`<use>` markup. Pass the raw `name` prop and let `Icon` generate the `icon`/`icon-{name}` classes and `#icon-...` `href` yourself only causes drift when icon definitions change. — The `Icon` component and `{% icon %}` tag centralize class/href generation; manual markup bypasses it and silently breaks whenever icon names or sprite paths change.
<!-- rule:941 -->
- Use CSS (`w-mb-4`/`w-mb-8`, `margin`/`padding`, stylesheets) for vertical spacing — never `<br>`, empty `<p>&nbsp;</p>`, or other whitespace-only tags, since non-semantic spacers break when styling or layout changes. — Placed under a global code_style section for HTML templates, with an explicit email-template exception. Preserves the project-specific `w-mb-4`/`w-mb-8` utility classes and the `spacer_height` email class pattern so assistants match existing conventions across the four template trees (`wagtail/admin/templates`, `wagtail/wagtailadmin/templates`, `wagtail/contrib/search_promotions/templates`, `project_template/home/templates`).
  - Exception: in email templates, use spacer cells with an explicit height (`<td height="30" class="spacer_height">&nbsp;</td>`) instead of `<br />` — email clients ignore CSS and `<br>`-based spacing, and spacer tables keep the body from being clipped.
<!-- rule:146 -->
- Wrap JSON-bearing HTML attributes in single quotes and use `JSON.stringify(value)` in test fixtures — avoids escape bugs that hand-escaped literals cause, and lets widget docs correctly note automatic escaping for standard usage vs. manual construction needing proper quoting — Hand-escaped JSON in HTML attributes is a common source of subtle quoting bugs; letting the surrounding single quotes carry the outer quoting (and letting `JSON.stringify` handle inner escaping in fixtures) keeps examples and tests copy-pasteable. Documenting the widget's auto-escaping behavior prevents users from double-escaping or breaking attributes when they build them manually.
<!-- rule:1357 -->
- Never nest `<form>` elements — browsers silently drop or reparent the inner form. — Concise imperative rule with the browser-behavior `why`, preserving the concrete mitigation patterns (`<div>` wrapper, `{% include %}` hoisting) and the page-editor example that make the rule actionable.
  - Wrap footer actions inside a parent form (e.g. page editor) in a `<div>`, or move a `{% include %}` that renders its own `<form>` outside the surrounding `<form>`.
  - Why: nested forms are invalid HTML5, so the browser discards the inner form's markup and submits to the wrong target.
<!-- rule:2655 -->
- Prefer semantic `<strong>`/`<em>` over `<span>` styled with `font-weight` or `w-font-bold` — conveys meaning to assistive tech, and CSS selectors target the semantic element so redundant font-weight utilities can be dropped. — Semantic elements carry meaning for assistive tech; styling generic `<span>`s with `font-weight`/`w-font-bold` loses that meaning and forces presentational utilities to be repeated. Targeting `<strong>`/`<em>` in selectors also removes redundant utilities.
<!-- rule:2214 -->
- Avoid hidden fields that duplicate visible controls — read the value from its source; duplicates drift and submit stale data — Redundant hidden fields can fall out of sync with the visible control or the submitting component, producing stale or conflicting values at submit time. This applies repository-wide to form templates and JS (e.g. `wagtail/` and `client/`), so prefer reading from the existing visible control or the component that already submits the value.
<!-- rule:406 -->
- Author inline SVG with minimal attrs: base `icon` class (+ modifiers like `default`), `aria-hidden="true"`, `href` (not `xlink:href`); drop `xmlns` and legacy `icon-*` classes — HTML parsing already namespaces inline SVG, so those attributes and icon-font names are just dead weight. — Inline SVG in templates is parsed by the HTML parser, which supplies the SVG namespace and modern attribute semantics. Re-adding `xmlns` or `xlink:href` is only needed for standalone `.svg` files or XML-serialized SVG. Keeping the base `icon` class (plus modifiers like `default`) keeps styling hookable while dropping stale `icon-*` names avoids dead icon-font references that linger in templates like `wagtail/admin` icons, `wagtail/contrib/modeladmin`, and `docs/_templates/layout.html`.
<!-- rule:798 -->
- `<td>` and `<th>` elements may carry `valign="top"` directly — remove these and add it to the corresponding `vertical-align` property in CSS. — Preserves original alignment while keeping presentation out of templates, so deprecated attributes don't linger across `wagtail/admin/templates` and `wagtail/documents/templates`.
  Add deprecated presentational HTML attributes (`valign`, `align`, `bgcolor`) to CSS on the matching selector instead of the markup.
<!-- rule:2164 -->
- Prefer `<button type="submit">` with the label as text content over `<input type="submit">` with a `value` attribute — avoids attribute-context escaping for `{% trans %}` strings and keeps translated submit controls consistent with the project's standard button pattern (e.g. `wagtail/users/templates/wagtailusers/users/create.html`). — Attribute-context escaping of translated strings is fragile and easy to get wrong; using element text content sidesteps it entirely and matches the button pattern used elsewhere in `wagtail/admin/templates/` and `wagtail/users/templates/`.
<!-- rule:1404 -->
- Remove duplicate/empty `<th>` and `<td>` cells in admin table templates — apply `colspan` to the remaining content cell so it aligns with the table's left edge. If a blank cell is needed purely for visual alignment, set `aria-hidden="true"` and add an inline template comment marking it intentional. — Phantom cells inject bogus headers and columns into the accessibility tree, breaking screen-reader table navigation and column/row alignment.
<!-- rule:1566 -->
- Size SVGs from `viewBox` dims using a shared spacing token for width/height — unitless attribute numbers, no `px` units — `viewBox` is the intrinsic size; matching CSS width/height (same token for both) keeps icons proportional and prevents overflow, while unitless SVG attributes stay valid across templates, SCSS, and TSX.
<!-- rule:2580 -->
- Define UI label text in HTML markup, never create or mutate it in JS — toggling visibility keeps labels translatable and DOM diffs cheap — JS-built strings bypass Django's i18n extraction, and rebuilds thrash the DOM. Toggling visibility instead preserves both.
<!-- rule:2723 -->
- Drop template wrapper elements (e.g. `<div>`) that carry no styles, classes, semantics, or JS hooks — dead wrappers obscure the DOM and slow future edits. Keep wrappers only for layout, semantics, JS hooks, or block override points, and document their purpose in the template or nearby CSS. — Unstyled wrappers add noise and make it ambiguous whether a nesting level is load-bearing; documenting the few that are prevents accidental removal later.
<!-- rule:2875 -->
- Use `<input type="search">` for search fields, not `<input type="text">` — enables native search UI, accessibility, and mobile keyboard affordances — Preserves semantic search behavior across browsers and assistive tech, which `type="text"` cannot provide. The rule applies globally (e.g., `docs/_templates/searchbox.html`), not just one module.
<!-- rule:2201 -->
- In admin table cell templates, link preview images with bare `<img>` (no `<figure>` wrapper) and keep the focus outline on the image itself. — Extra semantic wrappers pad the cell and push the focus ring past the clickable image, so keyboard and mouse targets no longer visually match.
<!-- rule:2759 -->
- Use ISO 8601 (`YYYY-MM-DD`) for date data attributes in HTML templates, not JS numeric months — avoids 0-indexed month confusion. — JavaScript's `Date` months are 0-indexed (Jan = 0), so templating `data-date="2024-0-15"` reads ambiguously; `data-date="2024-01-15"` is unambiguous and sortable. Applies to all `docs/_templates/*.html` and any other template emitting dates into `data-*` attributes.
