# Django Template Language

> Rules specific to Django/Django-templating: {% load %}, date formatting, context data access, class composition, inheritance, form action URLs, and template tags.

**When to check**: When writing Django template logic, tags, filters, or context consumption.

## Rules

<!-- rule:573 -->
- Access structured Django template context explicitly — `items.0.item`, `{% for name, value in items %}`, `category.0` — rather than `|first`, generic pair vars, or dumping the whole dict/tuple; generic filters hide which value is intended and silently break when context shape changes — Explicit indexing/unpacking documents intent and fails loudly on shape changes, while `|first` and whole-object rendering mask bugs and couple templates to fragile positional assumptions
<!-- rule:373 -->
- Combine `{% load %}` tags at template top, e.g. `{% load i18n static %}` — load only what's used; stray chars after `%}` trigger `TemplateSyntaxError` — The rule is a general Django template code-style convention, not limited to one module or file. Evidence spans multiple Wagtail template directories such as `wagtailadmin`, `admin`, and `wagtailimages`, so a directory-scoped AGENTS.md would be too narrow. It should be placed in the repository-root AGENTS.md so AI coding assistants apply it whenever they edit Django templates anywhere in the project.
<!-- rule:778 -->
- In Django templates, put `{% extends %}` first, wrap all rendered content in `{% block %}`, and keep parent templates' HTML/template tags balanced — unbalanced or misplaced tags break child template rendering. — Django only honors `{% extends %}` as the first template tag, and any content outside `{% block %}` in a child is silently ignored; unbalanced tags in a parent template corrupt rendering for every extending template.
<!-- rule:1040 -->
- Centralize breadcrumb URL resolution in the shared breadcrumb template via URL name refs (e.g., `wagtailsnippets:index`) — view-specific cases like `page_to_move` couple views and break reuse — The shared breadcrumb template is the single place URL resolution should happen, so any view can build breadcrumbs by naming its parent index view rather than depending on another view's items or a hardcoded special case. This keeps views decoupled and the breadcrumb logic reusable across snippets and other index views.
<!-- rule:940 -->
- In Django/Wagtail templates, access related data via direct attribute traversal (e.g., `{{ obj.related.attr }}`) rather than adding Python-level convenience properties or annotated/helper attributes solely for templates — keeps templates aligned with actual model relations and avoids redundant API surface. Use the same attribute path in both the condition and the rendered value so they can't drift apart. — Templates mirroring model relations directly stay readable and honest; extra helper properties duplicate logic and conditions can silently disagree with what's rendered.
<!-- rule:1025 -->
- Delete a block's or context variable's doc-comment entry when removing it — keeps template docs matching supported blocks/vars — Stale documentation in template comments misleads developers about what the template actually supports, especially after the only consumer (another template) is deleted.
<!-- rule:1543 -->
- Compose conditional CSS classes with the `classnames` simple_tag, not `yesno` chains or inline `{% if %}` — keeps whitespace handling in one place and out of rendered `class` attrs — The rule appears twice: once prescribing the preferred `classnames` simple_tag, and once as a fallback constraint for when a filter like `yesno` is still used. Both share the same motivation (avoiding scattered conditional whitespace), so keeping them as sibling bullets preserves the original structure while making each independently actionable.
  - When a conditional filter is unavoidable, apply it to the dynamic value (`value|yesno:'...'`) and keep spacing outside the filter args — spacing inside gets conditionally emitted or dropped
<!-- rule:1826 -->
- Apply `|default:""` only where empty/None is actually reachable (e.g. unset optional settings) — unconditional fallbacks hide unexpected empty values in templates. — Avoids masking bugs where a value unexpectedly goes empty, and keeps template usage consistent with existing filter patterns.
<!-- rule:2039 -->
- Compute form action URLs with `reverse()` in the view and pass as `action_url` — shared templates can't resolve them safely — Templates that render a form should consume `action_url` from context rather than calling `{% url %}` themselves, so every view can control its own target (and guard the block with `{% if form_action %}` before emitting the `<form>`). Skipping this emits `<form action="">`, which silently posts to the current URL and breaks in shared/partial templates.
<!-- rule:2542 -->
- Bundle contiguous JS in `{% compress js %}`, not separate `<script>` tags — fewer requests, correct order — The rule has two distinct parts (bundling mechanics and init placement), so splitting into two bullets keeps each actionable while preserving the `{% compress js %}` project-specific reference and the ordering rationale.
  - Place inline init right after its library's script, before shared scripts — prevents load-order bugs
