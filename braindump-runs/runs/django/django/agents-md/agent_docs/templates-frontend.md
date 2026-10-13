# Template and Frontend Implementation

> Rules for Django templates, partials, form widgets, DOM/JavaScript behavior, CSS selectors, and frontend state.

**When to check**: When implementing templates, frontend JavaScript/CSS, form widgets, or user-interface behavior.

## Rules

<!-- rule:3995 -->
- Raise compile/parse errors on duplicate named `{% partialdef %}` (including nested/conditional) — silent overwrites mask template-authoring bugs — Duplicate named partials and duplicate template basenames silently shadow earlier definitions, so a later edit can change which partial or template renders without any author-visible signal. Failing loudly (compile/parse error) and testing the duplicate, nested, and conditional cases keeps the template engine's name resolution predictable and catches regressions in `{% partialdef %}` handling.
  - Avoid or merge duplicate template basenames across directories — ambiguous lookup can silently resolve to the wrong template
  - Document duplicate-name behavior in `docs/ref/templates/` and add regression tests for duplicate, nested, and conditional partial definitions
<!-- rule:5469 -->
- Cache repeated DOM/jQuery lookups in local variables (`$(this)`, `select.options`, its `.length`, `option.value`/`option.text`) — re-querying the DOM on each access is slow and easy to get wrong. In Django admin JS, check native `option.selected` instead of the jQuery `:selected` selector to match its direct DOM-manipulation style. — The project uses jQuery heavily and DOM re-queries/property reads recur inside loops and callbacks, so caching avoids repeated traversal cost; matching Django admin's native-property approach keeps its JS consistent with surrounding code.
<!-- rule:4467 -->
- Set `type = "button"` on dynamically created `<button>` elements (`<button>` defaults to `type="submit"`, silently submitting the surrounding form). — HTML `<button>` defaults to `type="submit"`, so buttons added via JS inside a form trigger unintended submission unless `type="button"` is set explicitly; conversely, code that assumes submit controls are always `input[type=submit]` breaks on `<button>`-based forms.
  - When querying for submit controls, match `input[type=submit]` **and** `button` — form submits are frequently rendered as `<button>` and a selector that only targets `input[type=submit]` will miss them.
<!-- rule:4447 -->
- Use `document.querySelectorAll(...)`'s `NodeList` directly for `length`, indexing, and iteration — convert with `Array.from()`/spread only when you need Array methods like `indexOf`, `includes`, or `filter`, since the `NodeList` is already iterable and the conversion is wasted allocation — The second bullet is the real bug guard: `NodeList.prototype.forEach` isn't available in every environment Django's admin JS supports, so `querySelectorAll(...).forEach(...)` fails at runtime. The first bullet keeps the same code idiomatic and avoids pointless array copies.
  - Never call `.forEach` on a `querySelectorAll(...)` result — `NodeList.prototype.forEach` throws a `TypeError` in some supported environments; use a `for` loop or `Array.prototype.forEach.call(...)` instead
<!-- rule:1881 -->
- Qualify every selector in a comma-separated list; avoid bare `body > *` — an unqualified `select` picks up rules intended for `td ul.errorlist + select`, and direct-child wildcards catch injected nodes (use `body > :where(header, main, footer)` or target elements individually). — Unqualified selectors leak across the stylesheet — a bare `select` silently inherits styles written for `td ul.errorlist + select`, and `body > *` restyles any node injected into the page — so qualifying every selector keeps each rule applied only to its intended targets.
<!-- rule:1929 -->
- Set `<meta name="color-scheme">` and CSS `color-scheme` to only the schemes the template actually implements (`content="light"` when there's no dark theme) — advertising `light dark` without a dark theme makes browsers paint unthemed dark backgrounds. — Both features silently misbehave when over-declared: a `light dark` `color-scheme` triggers UA dark-mode styling the stylesheet never defines, and non-`<color>` arguments to `light-dark()` are invalid at computed-value time, so the declaration is dropped and colors fall back unexpectedly.
  - Pass only explicit `<color>` values to `light-dark()` — non-color values (`none`, gradients, shadow lists) and CSS-wide keywords (`inherit`, `initial`, `unset`) are invalid there; omit the declaration or use another mechanism instead.
<!-- rule:2400 -->
- Never let a `ModelForm` silently overwrite virtual/derived/computed fields on save — exclude them or sync the UI (e.g., client-side updates) so submitted data matches the saved model; mismatches cause confusing data loss and stale views. — Silently overwriting derived values hides bugs from users and breaks composite-PK wrappers like those in `django/contrib/redirects/forms.py` and `docs/howto/composite-primary-key.txt`.
  - For composite/virtual PKs, document both levels: the wrapper/PK field is auto-excluded from the form, while its underlying constituent fields stay editable and may need `editable=False`.
<!-- rule:6291 -->
- Match `accept` attributes and doc MIME types to validator constraints — `image/*` promises subtypes the backend rejects — Exposing broader types than the server-side field accepts leads to confusing validation failures after upload.
<!-- rule:1421 -->
- Reuse loaded object/context state for template labels and toggle one element's text instead of rendering duplicate elements or running display-only queries — a single source of truth keeps `django/contrib/admin/templates/`, `django/contrib/auth/`, and `django/contrib/admin/` views consistent and avoids drift between duplicated state. — Duplicating state across context/summary entries causes labels to drift out of sync with the object they describe, and rendering extra elements or firing display-only DB queries wastes work on data already in context.
<!-- rule:1294 -->
- **Django/Jinja2 template context APIs and context processors** — These rules prevent bloating the template context API and avoid the performance cost of per-render queries, while keeping context processors extensible and consistent across Django and Jinja2 templates.
  - Prefer template-native mechanisms over new context variables or context-processor plumbing: use `{% get_current_timezone as time_zone %}` in Django templates when the tag library is loaded, and Jinja2 globals for request-dependent callables the template can call with args — keeps the context contract small and avoids per-render plumbing.
  - If a context processor is truly needed, expose a broad lazy interface named after the domain/concept it represents, not a single current key — templates can then access additional fields without adding new processors.
  - Never issue database queries on every template render; return lazy or cached values from context processors — per-render queries are a common performance trap that scales with page views.
