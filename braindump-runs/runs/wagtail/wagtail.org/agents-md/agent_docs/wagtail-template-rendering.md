# Wagtail/Django Template Rendering

> Correctly render CMS data: use CMS fields and template tags, richtext filters, image tags, conditional rendering of optional fields, consolidated conditionals, block.super, and avoid repeated queryset evaluation.

**When to check**: When writing Wagtail/Django templates that render model content

## Rules

<!-- rule:11 -->
- Render Wagtail RichText with `|richtext` inside a block element; append `|striptags` for plain-text slots. — `|richtext` emits block-level HTML — nesting it in `<p>` produces invalid markup, and skipping the filter shows escaped tags. Use `<div>` (or another block container) in `patterns/components/streamfields/` templates like `cards`, `quotes.html`, and `rich_text_block`; chain `|striptags` after `|richtext` when the slot expects plain text (e.g. card descriptions).
<!-- rule:120 -->
- Wrap optional model fields (`blank=True` / nullable, may be `None`) in `{% if field %}` in Wagtail templates — prevents emitting empty markup and literal `None` in HTML; leave required (`blank=False`) fields unguarded so template rendering matches the model's validation contract, and skip the guard when an existing `{% for %}` loop already yields nothing for empty/`None` values. — Templates and models must agree on presence: guarding optional fields avoids empty elements and stray `None` text, while guarding required fields would silently hide missing values that should have failed model validation.
<!-- rule:118 -->
- Prepare querysets in views/querysets, not templates — avoid per-item evaluation — Calling `PageQuerySet.specific()` or `.all()` inside template loops issues a query per iteration; eager evaluation at the view level keeps rendering O(1) queries regardless of page size. Use `.exists()` for boolean checks, bind repeated filter expressions with `{% with %}`, and iterate StreamField/ListBlock values directly via `{% for item in value.items %}` since those are already list-like.
<!-- rule:74 -->
- In Wagtail templates, use CMS-provided page fields and official Wagtail template tags (e.g., `{{ page.title }}`, `{% wagtail_site %}`, `page.social_text`, `page.listing_intro`) instead of hardcoded content or ad-hoc request-based lookups. — Content stays editable by CMS users and inherits Wagtail's site-aware routing, so hardcoding strings or reaching into `request` to fetch page data breaks previews, multi-site resolution, and editor expectations across `project_styleguide/templates` and `service/templates`.
<!-- rule:124 -->
- Add `{{ block.super }}` when augmenting an overridden template block; never declare empty block overrides — omitting it silently drops the parent's markup, and empty overrides just shadow inherited content. — Django templates replace a parent block entirely unless `{{ block.super }}` is called, so an override meant to add to inherited content will instead erase it; empty overrides create dead shadowing blocks that break inherited output.
<!-- rule:79 -->
- Gate template conditionals on a single normalized flag (e.g. `value.url`, `image_on_right`) from the block, component model, or include call site — `or`-chaining raw source fields or inferring display from an incidental URL desyncs rendering from the authoritative data — `or`-chaining raw source fields or inferring display from an incidental URL desyncs rendering from the authoritative data
<!-- rule:78 -->
- Use `{% firstof primary fallback as value %}` to collapse duplicate template branches — one guard avoids divergent copies — Repeated conditional branches or `{% include %}` tags guarding the same condition drift apart over time; resolving the differing value once before the check keeps a single source of truth, as seen in `wagtailio` templates.
<!-- rule:103 -->
- In Wagtail templates, render images with `{% image %}` (e.g. `{% image item.image width-400 alt=item.image.alt %}`), not raw `<img src="{{ image.url }}">` — the tag generates renditions and inherits attributes like alt automatically. — Hand-written `<img>` tags bypass Wagtail's rendition pipeline, so images are served at full size and lose inherited attributes like alt text — use the tag to get responsive renditions and accessible markup for free.
<!-- rule:163 -->
- Render wagtailmedia `Video` by iterating `video.sources` into `<source>` tags — `video.type`, `video.file_extension`, and `video.url` do not combine into a valid MIME string; only `sources` carries correct `src`/`type` pairs.
<!-- rule:219 -->
- Use `request.htmx` from `django-htmx` instead of checking the `HX-Request` header — centralized detection stays correct if HTMX's header scheme changes — The rule is a framework-wide Django + HTMX convention spanning views and templates, so it belongs at the repository root where any HTMX code can find it. Preferring `django-htmx`'s `request.htmx` over manual `HX-Request` header checks centralizes request detection so header semantics only need to be handled once. Putting `HX-Push-Url` in the view rather than in inline template JavaScript keeps the response contract defined server-side, so fragments can be reused without carrying URL/JS coupling.
  - Set `HX-Push-Url` in the view, not inline JS in the fragment template — keeps response behavior in one place and avoids JS that breaks when fragments are reused
