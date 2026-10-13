<!-- braindump: rules extracted from PR review patterns -->

# Coding Guidelines

Also see directory-specific guidelines:

- [.github/workflows/AGENTS.md](.github/workflows/AGENTS.md)
- [client/AGENTS.md](client/AGENTS.md)
- [client/scss/AGENTS.md](client/scss/AGENTS.md)
- [client/scss/components/AGENTS.md](client/scss/components/AGENTS.md)
- [client/src/AGENTS.md](client/src/AGENTS.md)
- [client/src/components/AGENTS.md](client/src/components/AGENTS.md)
- [client/src/controllers/AGENTS.md](client/src/controllers/AGENTS.md)
- [docs/AGENTS.md](docs/AGENTS.md)
- [docs/contributing/AGENTS.md](docs/contributing/AGENTS.md)
- [docs/releases/AGENTS.md](docs/releases/AGENTS.md)
- [wagtail/AGENTS.md](wagtail/AGENTS.md)
- [wagtail/admin/AGENTS.md](wagtail/admin/AGENTS.md)
- [wagtail/admin/templates/wagtailadmin/AGENTS.md](wagtail/admin/templates/wagtailadmin/AGENTS.md)
- [wagtail/admin/views/generic/AGENTS.md](wagtail/admin/views/generic/AGENTS.md)
- [wagtail/contrib/redirects/AGENTS.md](wagtail/contrib/redirects/AGENTS.md)
- [wagtail/core/AGENTS.md](wagtail/core/AGENTS.md)
- [wagtail/images/AGENTS.md](wagtail/images/AGENTS.md)
- [wagtail/models/AGENTS.md](wagtail/models/AGENTS.md)
- [wagtail/search/backends/AGENTS.md](wagtail/search/backends/AGENTS.md)
- [wagtail/tests/AGENTS.md](wagtail/tests/AGENTS.md)
- [wagtail/wagtailadmin/AGENTS.md](wagtail/wagtailadmin/AGENTS.md)

## API Design

<!-- rule:2081 -->
- Separate block conversion hooks by input domain: — Gives each hook one input domain so blank/non-blank/wrapped values behave consistently across block types and templates.
  - `to_python()` takes JSONish/serialized (database) values and returns Pythonic values; `normalize()` takes only Pythonic block-native values and returns normalized Pythonic values. Mixing domains causes re-parsing bugs when already-converted values flow back through the wrong hook.
  - Handle string/JSON input (e.g. `page.body = "..."`) at the top-level boundary (`StreamField.to_python`), not inside per-block `normalize()` — blocks shouldn't re-implement field parsing.
  - In `normalize()`, canonicalize blank/falsy input to one blank representation (the block's empty value instance or `None`) so `clean()`, `get_prep_value()`, and `{% if block.value %}` never see empty wrappers like `EmbedValue("")`.
  - Keep permissive empty-value handling in `to_python()` — it must still accept raw JSON/database values.
  - If `normalize` is functionally equivalent to `to_python` for a top-level block, alias them instead of duplicating logic, and delegate to the block's value class (e.g. `StreamValue`) rather than re-parsing fields.
  - Don't tighten `normalize()` to reject values that other entry points still supply.
  - When changing this contract, add unit tests covering blank, non-blank, and already-wrapped values.
<!-- rule:73 -->
- Reuse existing cache abstractions before adding new ones — duplicate caches drift and double invalidation bugs. — Project-wide convention across Wagtail caching code (`wagtail/models`, `wagtail/admin/views`, `wagtail/contrib/settings`, `wagtail/images`).
<!-- rule:1627 -->
- Only override `get_searchable_content` in a Wagtail `Block` subclass when it changes what text is searchable — otherwise inherit the parent. Overrides must return the block's user-visible text (e.g. alt text, table captions, column headings), not an empty list. — Returning empty from an override silently drops content from search results, and redundant overrides drift from the parent's behavior as Wagtail evolves.
<!-- rule:1661 -->
- Delegate `bulk_to_python`/`to_python` overrides to child block APIs and batch lookups together — reimplementing conversion in `StreamField`/`StructBlock` overrides drifts from block semantics and silently misaligns results. — StreamField/StructBlock conversion is recursive and index-sensitive: duplicating conversion logic in `wagtail/images/blocks.py` or `wagtail/blocks/list_block.py`-style overrides makes child-block changes silently desync, and calling a batch parent method per item reruns the batch machinery for single values, losing positional alignment with the input list.
  - Keep bulk conversion length- and position-preserving: pass `None` through unchanged, and for mixed input types partition by type, bulk-convert each partition, then merge — per-item branches calling the batch parent method break alignment.
<!-- rule:2477 -->
- For Explorer permission/tree helper functions such as `get_explorable_page_paths` and other request-scoped access-control computations (e.g., protected page paths for a user) that may be called multiple times per request, memoize/cache results on the request object at request scope rather than in a persistent per-user cache. Cache all relevant restriction categories, including password-protected views, so repeated restriction checks within the same request reuse the cached data instead of re-running queries and filtering logic. If the data is cached across requests, register signal handlers for every mutation that can invalidate it (e.g., page moved, group permission changed, user changed) and clear the relevant cache key in those handlers. — The rule describes a cross-cutting API/caching convention for request-scoped access-control helpers. Evidence spans multiple Wagtail modules (`wagtail/core/query.py` and `wagtail/wagtailcore/models.py`), the original scope is global, and the rule is phrased as a general pattern beyond a single helper. Root-level `AGENTS.md` gives the best findability for AI assistants and matches the 'prefer broader placement when uncertain' guideline.
<!-- rule:3000 -->
- Put the close/dismiss control first in DOM order for dismissible components (`panels`, `dialogs`, `popovers`, closeable sections) and restore focus to the opener on close — keeps tab order predictable and prevents keyboard users from losing their place. — First-in-DOM close button makes dismiss reachable on the first Tab press; focus restoration on close keeps keyboard and screen-reader users from being dropped at the top of the page. Spanning both `wagtail/admin` templates and the page editor JS keeps the two surfaces consistent.
  Applies to both `wagtail/admin` templates and the client-side page editor JS.
<!-- rule:2673 -->
- Implement recursive prep/serialization in `StreamBlock.get_prep_value` and route `StreamField`'s top-level method through it — nested/composite blocks calling child methods directly would otherwise bypass the behavior. — Prevents inconsistent serialization between nested and top-level blocks by keeping the entry point singular. Affects `wagtail/core/fields.py` and `wagtail/core/blocks/stream_block.py`. For example: a `StreamBlock` nested inside another `StreamBlock` would each invoke their own child `get_prep_value`, so any behavior added only at the `StreamField` level (or only in a leaf block) is silently skipped for the nested case — routing the top-level call through the block-level method makes the recursion uniform.
<!-- rule:765 -->
- Base `Page.cache_key` on `url_path`, not `path` — sibling reordering mutates `path` and would spuriously invalidate unrelated entries. — Design cache invalidation around the URL-visible location rather than the internal tree structure: sibling reordering is a structural change that should not affect entries keyed on URL state.
  Purge the frontend cache via `page_published`/`page_unpublished` signals, not generic pre/post-save — purging should only run on publish/republish.
  Include both previous and current locations in cache-purge signal payloads (e.g. `old_url_path` alongside the current URL) so handlers can invalidate every affected URL.
  Prefer cache-key components over explicit cache-purge APIs in `wagtail/contrib/frontend_cache` — purge ordering relative to the update and final cache key is ambiguous.
<!-- rule:2161 -->
- Name API entities by their actual type and domain concept — vague or wrong terms mislead readers into generating incorrect client code — Applies to `docs/advanced_topics/api/` and `wagtail/api/v3/schemas.py`; wrong labels propagate into user implementations and diverge from serializer output.
<!-- rule:2594 -->
- Use `form_classname` for form-rendering CSS classes in block `render_form` contexts and meta/constructor options, matching `StructBlock.Meta.form_classname`. — Rendered block templates have multiple elements with customizable classes, so a generic key is ambiguous; mirroring `StructBlock` keeps subclass override hooks consistent.
<!-- rule:1624 -->
- In custom `StructBlock`/block `clean()` overrides, delegate to `super().clean(value)` or the child block's `clean()` (converting the value to the expected StructBlock format) instead of reimplementing validation, and respect `required`/`ignore_required_constraints` rather than adding parallel flags. — Reimplementing validation drifts from base/child block behavior and silently breaks `required=False` blocks and deferred draft validation via `ignore_required_constraints`.
<!-- rule:51 -->
- 
<!-- rule:2410 -->
- When adding defaults or optional args to block render hooks (e.g. `get_context(parent_context=...)`), only default absent keys and merge legacy return values like `get_context(value)` into the caller's context — so legacy hooks don't silently drop caller data. Legacy-hook tests should assert rendered output still contains the original context values. — Preserves backward compatibility for existing block render hooks and prevents silent context loss for users upgrading; tests lock in the contract.
<!-- rule:748 -->
- Pass the model instance to cache-key helpers (`construct_cache_key(self, ...)`) and expose key components via an overridable `get_cache_key_components()`; leave hashing/serialization to the caller. — Callers stay stable as key inputs evolve, subclasses can extend components without duplicating key logic, and hashing stays swappable at the call site.
<!-- rule:3031 -->
- Extract JSON/JSONB subfields as text before casting (`KeyTextTransform`/`->>` then `Cast`) — direct JSON→scalar casts fail or return wrong values in PostgreSQL — PostgreSQL won't cast a `json`/`jsonb` value straight to a scalar; extracting with `content__field` / `KeyTransform` / `->` yields a JSON value that breaks the subsequent `Cast`, so migrations must go through `KeyTextTransform` / `->>` first.
<!-- rule:2329 -->
- Define block action button translation strings in JS, not Python block defs — avoids duplicating strings in every block's Telepath payload and keeps the button pattern reusable. When a string must come from `blockDef.meta.strings`, pass it through the `escapeHtml` helper (`h`) before interpolating it into button markup. — Centralising translations in JS eliminates per-block duplication in Telepath payloads and makes the button pattern reusable across blocks; escaping `blockDef.meta.strings` values with `escapeHtml` (`h`) prevents injection when those strings are interpolated into button markup.
<!-- rule:2924 -->
- Class-based extension points (e.g. `LogFormatter` subclasses) should support module-level registration via a decorator, consistent with existing class-registration patterns such as modeladmin, rather than requiring registration inside a hook function; document this module-level usage in the hooks reference docs. — The rule targets API design for class-based extension points, asking for decorator-based module-level registration consistent with existing patterns like modeladmin, and requires documentation in hooks.rst.
<!-- rule:1646 -->
- Delegate `render_basic` to the wrapped child block in custom `StructBlock` subclasses (e.g. `self.child_blocks["image"].render_basic(value)`) — base `StructBlock` markup mismatches the child's output and breaks consumers like `wagtail/admin/compare.py` — Rules are stored as bullet points in AGENTS.md files with imperative-mood rules under 100 characters plus rationale, preserving project-specific references like `render_basic` and `self.child_blocks["image"]`, so AI assistants can follow the pattern generically across wagtail/blocks.
  - Apply this in any module that subclasses `StructBlock` to wrap a rendered child (e.g. `wagtail/images/blocks.py`, `wagtail/admin`)
<!-- rule:2090 -->
- Use `cache_control`, not `cache_page`, for client-side caching — `cache_page` stores responses server-side in Django's cache backend and never sends `Cache-Control` to browsers/proxies — the wrong tool when you want the browser to cache.

## Code Style

<!-- rule:54 -->
- Wrap every user-facing string in Django templates with `{% trans %}`/`{% blocktrans %}` (with `{% load i18n %}`), including `aria-label`, `alt`, `title`, `placeholder`, and screen-reader-only text — untranslated strings ship as English-only UI in every locale. — Localization happens at template render time; any un-wrapped visible string, attribute, or hidden accessibility label silently escapes extraction and never appears in `.po` files, so it stays English-only for all locales — including for users relying on screen readers.
<!-- rule:2590 -->
- Use i18n pluralization (`{% blocktrans count counter=... %}{% plural %}` or `ngettext`) for count-interpolated user-facing strings — hardcoded plurals, string concatenation, and f-strings break translations for languages with non-English plural rules. — Different languages have different plural forms; only gettext's plural machinery can select the correct one at runtime.
<!-- rule:241 -->
- When extracting shared template includes, keep `{% blocktrans %}`/`asvar` and context keys like `title` — dropping them silently untranslates UI — Template refactors in `wagtail/admin/templates`, `wagtail/users/templates`, and shared includes often strip `{% blocktrans %}` or omit `title` from inclusion-tag context, producing untranslated strings users see. Moving translations to the view layer or using `{% blocktrans asvar %}` preserves i18n across extraction.
<!-- rule:2993 -->
- Use unitless `0` in CSS/SCSS (`padding: 0`, not `0px`/`0rem`) and omit SVG `x`/`y` attributes when they are `0` — omitted SVG positions default to `0`, and unitless zeros are shorter and equally valid — Keeps stylesheets lean and consistent; avoids redundant units and SVG attributes that browsers already default to `0`.
<!-- rule:2505 -->
- Backfill rows in one bulk op — `queryset.update()` (dedicated values, or `F()`/`Subquery()`), `bulk_update()`, or a raw `UPDATE`/`UPDATE ... FROM` — instead of looping `save()`; per-row writes make migrations orders of magnitude slower. — Why: `wagtail/*/migrations` data migrations run on every deploy/setup, so N individual `save()` calls turn into N round-trips and can stall or time out on large tables. Using `Subquery()` rather than `F()` matters because some backends (e.g. Postgres) reject `F()` expressions referencing joined fields inside `.update()` — and `F()` is what lets the whole update stay a single statement rather than a read-modify-write round-trip per row.
<!-- rule:3020 -->
- Mount dialogs at `document.body` or end-of-DOM, not inline — keeps positioning/stacking predictable across `client/src/includes/dialog.js` — Dialogs rendered inline inherit ancestor `overflow`, `transform`, and `z-index` stacking contexts, which breaks overlay positioning unpredictably. Mounting at a predictable document root in `client/src/includes/dialog.js` avoids this. The exception exists because panel-scoped dialogs should stay within the panel's DOM for correct lifecycle and focus behavior.
  When a dialog is intentionally scoped to a surrounding panel, insert it adjacent to its triggering template/container instead.
<!-- rule:1858 -->
- Use `…` (Unicode ellipsis), not `...`, in translatable user-facing strings — correct typography across locales — Ellipsis and directional conventions differ across locales; hard-coded `...` and `→` break in RTL languages and can't be localized.
  - Avoid hard-coded directional symbols like `→` in translatable strings — they don't flip for RTL; use icons or translatable strings instead
<!-- rule:1471 -->
- Don't add dummy `href="#"` to pass `jsx-a11y/anchor-is-valid` — bind a real URL or disable the rule at file level — Fake hrefs ship broken links and inflate perceived a11y compliance. In test files and `.stories.tsx`, bind real URLs via story args (e.g. `args.url`), a shared URL variable, or an in-page fragment matching an existing section `id`. If a custom link intentionally diverges from anchor semantics, add a file-level `/* eslint-disable jsx-a11y/anchor-is-valid */` instead of a fake `href` or changing component behavior.
<!-- rule:1559 -->
- In keyboard shortcut UI metadata, wrap only human-readable labels with `_()` (e.g. `_("Save")`), never the key combinations or programmatic bindings — translatable key names break bindings. — Shortcut keys are physical/programmatic identifiers, not prose; running them through gettext invites translators to change them, which silently breaks the bindings in non-English locales. Only the display label is meant to vary per language.
<!-- rule:2293 -->
- In Storybook stories, pass `<textarea>` content via `defaultValue` (uncontrolled) or `value` (controlled), not as JSX children — matches the DOM API and avoids controlled/uncontrolled warnings. — These guidelines apply to all React component stories in the project, ensuring consistent handling of `<textarea>` content and accurate arg naming that mirrors the DOM API, reducing confusion and preventing React warnings.
  - Rename story args that no longer represent React children to the DOM prop they feed (`defaultValue`/`value`) in both `argTypes` and the template component signature — keeps arg names consistent with the DOM API.
<!-- rule:2839 -->
- Treat stale cached values as cache misses by folding staleness into the recompute guard (`if result is None or <stale_check>:`) rather than deleting the entry — avoids delete-then-regenerate churn and keeps one uniform write path. — Deleting a cache entry only to immediately regenerate and re-store it adds a redundant write and widens the window where the key is absent (extra misses, potential races). Folding the staleness check into the existing recompute guard makes both the initial miss and the stale case flow through the same regenerate-and-overwrite path.
<!-- rule:2739 -->
- When temporarily switching languages, use `django.utils.translation.override()` as a context manager instead of manual `get_language()`/`activate()` save-and-restore — guarantees the original language is restored even if the block raises. — ...
<!-- rule:23 -->
- Clear caches by mutating in place — call `dict.clear()` or the cache's existing clear method, never rebind the global/shared cache to a new container — Other modules holding a reference to the original object keep reading stale data unless the same instance is mutated; reuse per-cache clearing methods instead of reaching into underlying stores with `.clear()` so cache invariants stay intact

## Imports

<!-- rule:342 -->
- Delete unused imports outright — don't comment them out; version control keeps history. — Prevents dead-code accumulation and misleading readers; explicit comments preserve intent that linters can't infer.
  - Includes imports left unused after refactors, added before first use, or dropped in tests when switching libraries.
  - In Django refactors, remove imports your change made dead (e.g. a now-unused `django.conf.settings` when a value becomes a constant), but leave unrelated module declarations like `default_app_config` in app `__init__.py` alone unless you're intentionally migrating app config.
  - If you keep an import for side effects or a setup-time workaround, add an inline comment explaining why — don't leave a bare unused import or rely only on a linter suppression.
<!-- rule:1165 -->
- Omit Python 2 compatibility boilerplate in Python 3-only code — no `from __future__ import unicode_literals`/`absolute_import`, `# -*- coding: utf-8 -*-` headers, or `try/except ImportError` import shims; import Py3 paths directly (e.g. `from urllib.parse import urlparse, urlencode`) and drop stale `# Generated by Django 1.x` migration headers. — Dead Py2 scaffolding adds noise, obscures the actual Py3 import surface, and misleads readers into thinking both runtimes are supported. Py3-only is a project invariant across all source files and generated migrations, so cleanup is safe and expected.
<!-- rule:1278 -->
- Match import casing exactly to exports and disk paths — mismatches break on case-sensitive Linux/CI — Case-sensitive filesystems and bundlers (e.g. the `client/` JS, `entrypoints`, `wagtail/` static sources) fail on casing mismatches that macOS hides, so exact casing keeps builds reproducible across environments.
  - Don't declare identifiers differing only by case from an import — causes confusing shadowing and lint errors
<!-- rule:1855 -->
- Alias imports only to disambiguate (e.g. `activate` → `activate_lang`) or to re-export; never write `import X as X`. — Redundant self-aliases add noise and obscure intentional re-exports — those are meaningful signals that tooling and reviewers rely on to distinguish re-exported names from plain imports.
<!-- rule:906 -->
- Never re-import names already defined or imported in the same module — reference them directly; group same-module imports into one `from module import a, b` statement. — Preserves the specific import style expectation (single `from module import a, b`) while adding the why: avoids duplicate bindings, dead import ambiguity, and un-mergeable splits that fight import-sorting tools.
  - Redundant imports create duplicate bindings and obscure where names actually come from, making unused/dead imports harder to spot and risking silent shadowing bugs.
  - Split imports like `from x import a` / `from x import b` on separate lines defeat tools like `isort`/`ruff` and produce noisy diffs when adding names.
<!-- rule:471 -->
- Use `import * as React from 'react'` instead of default-importing `React` — namespace imports survive `esModuleInterop`/interop differences across bundlers and TS configs. — Namespace imports are robust to module interop differences; single-statement imports keep lint happy and reduce merge conflicts.
  - Merge imports from the same module into one statement, e.g. `import React, { useState } from 'react'` — duplicate import lines from the same module break lint rules and drift apart over time.
<!-- rule:683 -->
- Keep Django app `__init__.py` free of top-level imports that pull in models or model-dependent modules — Django's app registry isn't ready at package import time, so these fail during app-loading. — The rule encodes a general Django import convention (app-loading order, `__init__.py` hygiene, guarding optional model imports against `RuntimeError`) that is not tied to a single file or module. Evidence spans multiple directories across the repo (wagtail/contrib/modeladmin/views.py, wagtail/admin/__init__.py, wagtail/admin/models.py), and the rule is phrased as a forward-looking pattern to apply whenever importing optional app models or triggering side effects—i.e., it applies to every Django
   Don't duplicate side-effect imports in `models.py` if the package `__init__.py` already imports that module — redundant imports obscure the actual entry point and risk double-registration.
   Guard optional app model imports against `RuntimeError`, not just `ImportError` (use `apps.is_installed()` / `apps.get_model()` or catch both) — an importable app isn't necessarily in `INSTALLED_APPS`.

## Documentation

<!-- rule:1890 -->
- Add before/after screenshots to any PR with visual or `client/` SCSS changes — reviewers verify both the bug and the fix — PR-hygiene rule, not tied to a single module. Without screenshots, reviewers can't confirm the visual regression existed or that the change resolves it.
<!-- rule:493 -->
- Verify APIs/features exist before documenting them — search the codebase or test locally, then describe only the surface that currently exists. Qualify scope precisely: avoid absolute or plural/aspirational claims, enumerate exclusions, and drop stale limitations whose constraint no longer holds — unverified docs mislead users and rot silently. — Unverified or overbroad documentation misleads users and silently rots as code changes. Precise scope claims prevent false expectations about support status.
  ## Documentation
  - Verify API/feature existence before documenting — search the codebase or test locally, then describe only what currently exists
  - Qualify scope precisely: avoid absolute claims, plural/aspirational categories, and unstated exclusions
  - Enumerate exclusions explicitly when documenting a limitation
  - Check whether a stated limitation applies to all analogous attributes/APIs
  - Drop stale limitations once the underlying constraint is resolved
<!-- rule:114 -->
- Use precise accessibility terms: `plain language` not `readability`, `accessible` not `visible`, `useful` not `helpful`/`important`, `text` not `content`; reserve `compliance` for legal duties, `meeting standards` for voluntary ones — vague wording misleads users and blurs the legal/voluntary line — These distinctions matter in accessibility contexts: 'visible' implies sight-only access, 'readability' is a narrower concept than plain language, and conflating 'compliance' with voluntary guidelines can create false legal exposure or lull teams into skipping real obligations. Consistency across labels and docs also prevents users and auditors from second-guessing intent.
<!-- rule:1208 -->
- Edit source strings (incl. `{% blocktrans %}`), not `**/locale/*/LC_MESSAGES/*.po` — hand edits get clobbered on regeneration; clear `#, fuzzy` after verifying regenerated entries so translations are treated as valid. — …
<!-- rule:865 -->
- For GitHub issue/PR templates under `.github/ISSUE_TEMPLATE/` and related `.github/` templates, design forms for clarity and consistency: order fields so contributors describe the problem or desired improvement first, before location or metadata; allow multiple pertinent sections and, when requesting a documentation link, ask for a human-readable link label alongside the URL; use `type: textarea` (not `input`) for multi-line or multi-part content, short noun-phrase labels (e.g. `Proposed solution`, `Alternative solutions`) instead of imperative/question sentences, and `value` for pre-filled editable scaffold content while reserving `placeholder` for guidance that disappears once typing begins. Propagate the same guidance change across all templates, reuse standard prompt text from equivalent existing sections rather than bespoke wording, wrap non-submission boilerplate in `<!-- ... -->` HTML comments so it is hidden when rendered, and avoid over-engineered formatting (complex tables, verbose inline instructions) that is hard to read or edit. — The rule governs the design and wording conventions for GitHub issue/PR templates that live across the `.github/` tree — specifically `.github/ISSUE_TEMPLATE/*.yml`, `.github/ISSUE_TEMPLATE/*.md`, and `.github/PULL_REQUEST_TEMPLATE.md`. It is a cohesive, directory-scoped set of authoring guidelines (field ordering, `type: textarea` vs `input`, `value` vs `placeholder`, standard prompt reuse, HTML-comment boilerplate), not a rule about a single file or a strict source→target sync relationship. Th
<!-- rule:2989 -->
- Prefer static image assets over animated ones — replace animated SVGs with their static equivalents when animation isn't essential, and use static PNGs instead of GIFs in docs. Smaller files, faster page loads, and no motion-sensitivity issues. — Animated assets bloat documentation and the `client/` bundle, slow page loads, and can trigger motion-sensitivity problems for readers; a static equivalent usually conveys the same information with a fraction of the bytes. Making the preference explicit prevents contributors from defaulting to GIFs or animated SVGs when a static asset already exists or would do.

## Config

<!-- rule:46 -->
- Use Django's cache framework with one shared backend (e.g. Redis) for cached data that must stay consistent across requests, threads, or long-lived workers — including model-derived values; process/thread-local dict/LRU caches desync between workers. — Keeping this at global scope matters because the rule spans `wagtail/core`, `wagtail/signal_handlers.py`, `wagtail/admin` templatetags, and `wagtail/models/sites.py` — an assistant working in any of those files needs the same cache/invalidation guidance.
  - Purge the relevant cache entries in the source model's `create`/`update` flow — invalidation must reach every process/thread, not just the one that wrote.
  - If you add local caching on top, pair it with TTL expiry and a shared secondary cache, and document that all application processes share the same cache backend — otherwise invalidation silently misses workers.
<!-- rule:2380 -->
- Set `required_on_save` on the narrowest owning abstraction — blocks: `FieldBlock` only (not `StreamBlock`/`StructBlock`/`ListBlock`); form fields: `FieldPanel` or the base model's default panel so subclasses inherit. Only set it on the model field when that field is a documented override point. When set on `FieldBlock`, have `defer_required_validation` return early so required validation isn't deferred. — Scoping to the narrowest owner makes subclasses inherit the correct behavior and avoids forcing required validation onto unrelated block types (e.g. `StreamBlock`/`StructBlock`) that have different save semantics.
<!-- rule:2900 -->
- Check `PageSubscription.comment_notifications` and the recipient's user-profile prefs before notifying — user-profile opt-out overrides per-object flags — The user-profile setting is a global opt-out and must win over per-object subscriptions, or users who've disabled notifications keep getting them from subscribed objects.
<!-- rule:2925 -->
- Treat `APPEND_SLASH`-style settings as fallback: match the exact URL first, then redirect to the slash-appended URL only when no exact match exists and the slashed form does. Never suppress explicitly defined non-trailing-slash routes — they must stay resolvable and take precedence. Keeping exact-match resolution ahead of the slash fallback prevents the setting from shadowing or breaking deliberately defined routes. Avoid the common mistake of conditionally removing non-slash routes based on the setting; the setting only decides the redirect, not what URLs are valid. — An `APPEND_SLASH` setting is a convenience for users, not a routing override — if it removes or blocks explicitly defined non-slash routes, legitimate endpoints silently 404, breaking existing clients and contracts. Resolving exact matches first preserves backward compatibility while still redirecting sloppy trailing-slash requests.
<!-- rule:2992 -->
- **Separate test namespaces; avoid broad `find_packages(exclude=...)` globs.** — Globs like `*tests*` partial-match a namespace, silently shipping or dropping subpackages and blurring what gets distributed.
<!-- rule:2985 -->
- Run tests against the installed distribution, not just the source tree, and add a `check-manifest` pre-commit hook whenever `setup.py` filters with `find_packages(exclude=[...])` — manual include/exclude patterns silently omit required sub-packages or ship unwanted files (see `torchbox/wagtailmedia` `.pre-commit-config.yaml` for the hook setup). — Packaging filters and source-tree tests are both blind to what actually lands in the sdist/wheel, so this catches missing sub-packages before release.
<!-- rule:2148 -->
- In CI, build distributions with `python -m build` (install the `build` package); never call `setup.py` or run `pyproject.toml` directly, and omit `--wheel`. — `python -m build` is the PEP 517 frontend and the sdist-then-wheel flow ensures the wheel is built from the sdist that ships to PyPI; invoking `setup.py` (or Python on `pyproject.toml`) bypasses PEP 517 and skips sdist verification, so broken sdists can slip out unnoticed.
<!-- rule:2282 -->
- Expose `latest` (e.g. `latest.whl`) as an S3 redirect to the versioned object, not a duplicate upload — prevents stale aliases reaching CloudFront; if a duplicate is uploaded, invalidate the cache via the existing `scripts/latest.sh` logic — Preferring the redirect avoids maintaining two copies of the same artifact; when a duplicate alias must be uploaded, reusing `scripts/latest.sh` ensures CloudFront serves the current version instead of a cached stale one.

## Dependencies

<!-- rule:1180 -->
- When migrating `Meta.unique_together` to `Meta.constraints`/`UniqueConstraint`, remove the equivalent `unique_together` entry instead of declaring both — duplicate constraints cause spurious migrations and confusing schema diffs. — Django's migration autodetector treats `unique_together` and equivalent `UniqueConstraint`s as distinct, so declaring both or duplicating them on subclasses produces noisy/spurious migrations. Consolidating changes and updating tests/migrations directly keeps upgrade paths clean for downstream Wagtail users.
  - Don't change `Meta.constraints` on abstract models/mixins — it cascades to every subclass and generates unnecessary migrations across the codebase.
  - Keep broad `unique_together` → `constraints` conversions in their own PR, separate from targeted fixes — mixing them makes review and bisection harder.
  - Update existing migrations and tests (e.g. Wagtail's `test_migrations`) instead of adding drop-and-recreate migrations — avoids phantom schema churn downstream users must replay.
  - Document constraint-migration impact in release notes — consumers need to know about the schema change before upgrading.
<!-- rule:680 -->
- Create `auth.Permission` (including `Meta.permissions`) in data migrations via `Permission.objects.bulk_create(ignore_conflicts=True)` — `post_migrate` owns the permission lifecycle, so calling `create_permissions` or mutating `app_config.models_module` desyncs it — Django's `post_migrate` signal is the single source of truth for permission lifecycle; letting it manage creation and deletion keeps migrations idempotent and prevents state drift between applied and reverted migrations.
  - Never delete permissions in reverse migrations — `post_migrate` recreates them, so manual deletes cause drift
<!-- rule:2504 -->
- Use official `https://artifacts.elastic.co` endpoints in Elasticsearch apt install scripts — fetch the GPG key from `https://artifacts.elastic.co/GPG-KEY-elasticsearch` and configure the repo as `deb https://artifacts.elastic.co/packages/{version}/apt stable main` (e.g. `5.x`); legacy `packages.elastic.co` URLs are deprecated and often fail. — Legacy `packages.elastic.co` endpoints are deprecated/removed and HTTPS avoids GPG/trust and redirect issues — keeps CI installs reliable.
<!-- rule:2149 -->
- In CI dependency jobs, install from PyPI wheels; only the high-risk `latest-stable` regression job uses git/VCS installs — git installs are slower and not cacheable — Git/VCS installs bypass pip's wheel cache and add significant CI time, so keeping them isolated to the job that actually needs latest-stable freshness keeps routine dependency jobs fast and reproducible.

## Naming

<!-- rule:33 -->
- Keep `models.py` / `models/` for ORM definitions only — put model utilities in named modules like `model_usage.py` or a `utils` package — Django discovers models by module; mixing utilities there bloats imports and slows app loading.
<!-- rule:2828 -->
- Use `json` rather than the abbreviation `js` in identifier and method names that refer to JSON data. — `js` conventionally reads as JavaScript, so `json`-named identifiers stay unambiguous to readers and tooling.
<!-- rule:2472 -->
- Prefix filtered querysets with the active filter: `live_descendant_pages` for `page.get_descendants().live()` (not `descendant_pages` or `child_pages`) — names then expose state restrictions at every call site, so unfiltered or unfiltered-by-mistake querysets can't slip through unnoticed. — The rule combines the relationship/API term with the filter applied, matching nearby naming (e.g. in `wagtail/wagtailadmin/views/pages.py`). This makes the active restriction visible wherever the variable is used, which prevents passing unfiltered data into places that assume `.live()` (or similar) was applied.

## General

<!-- rule:1464 -->
- Test view/template rendering changes against the test client — assert both the exact context sent to the template and the rendered HTML — Context wiring (e.g., profile-derived flags like keyboard-shortcuts-enabled in `test_keyboard_shortcuts.py`) can break silently while the template still renders, so cover computed vs. request-supplied context and confirm tests fail pre-change.
<!-- rule:2096 -->
- Use `get_or_create()` with only stable unique keys and put mutable attrs in `defaults` — keeps migration/seed reruns idempotent and race-safe — The lookup key must be immutable for `get_or_create` to reliably find the same row on reruns; mutable attributes in the lookup cause duplicate inserts when values change. A table-wide `exists()` check for singletons respects any pre-existing data, whereas a field-specific lookup may miss a row written under a different key.
  - Gate singleton defaults on `if not Model.objects.exists()` instead of a field lookup — avoids duplicating pre-existing rows

## Topic Guides

Check these when working in specific areas:

- **[Docstrings, JSDoc & Code Comments](agent_docs/documentation-docstrings.md)**: When writing or editing docstrings, JSDoc comments, or inline explanatory comments.
- **[User-Facing Documentation & Guides](agent_docs/user-facing-docs.md)**: When writing or editing READMEs, tutorials, guides, styleguides, contributor docs, or release notes.
- **[Testing Patterns & Assertions](agent_docs/testing-patterns.md)**: When writing, modifying, or reviewing tests.
- **[Error Handling & Validation](agent_docs/error-handling.md)**: When adding error handling, validating inputs/configuration, raising exceptions, or scoping try/except blocks.
- **[API Design & Public Interfaces](agent_docs/api-design.md)**: When designing or changing public APIs, class/method signatures, hooks, widgets, or extension points.
- **[Naming Conventions](agent_docs/naming-conventions.md)**: When naming variables, functions, classes, modules, settings, or identifiers.
- **[Type System & Annotations](agent_docs/typing.md)**: When adding or changing type annotations, TypeScript types, interfaces, or PropTypes.
- **[General Code Style & Formatting](agent_docs/code-style-general.md)**: When formatting code or applying general style/idomatic-construct rules across Python, JS, or config.
- **[HTML & Template Markup](agent_docs/html-templates.md)**: When writing or editing HTML markup or shared/reusable templates.
- **[Django Template Language](agent_docs/django-templates.md)**: When writing Django template logic, tags, filters, or context consumption.
- **[CSS & SCSS Styling](agent_docs/css-scss-style.md)**: When writing or editing CSS/SCSS styles or design-system styling.
- **[JavaScript & DOM Patterns](agent_docs/javascript-dom.md)**: When writing or editing client-side JavaScript or DOM manipulation code.
- **[Accessibility (a11y)](agent_docs/accessibility.md)**: When adding or reviewing ARIA, focus behavior, alt text, landmarks, or other accessibility features.
- **[Django ORM & Querysets](agent_docs/django-orm.md)**: When writing or optimizing Django ORM queries and queryset logic.
- **[Django Models & Fields](agent_docs/django-models-fields.md)**: When defining or modifying Django model fields, Meta options, indexes, or model-level helpers.
- **[Django Views & Forms](agent_docs/django-views-forms.md)**: When writing Django views, forms, or request-handling logic.
- **[Configuration & Settings](agent_docs/config-settings.md)**: When adding or modifying settings, feature flags, config defaults, CI, or tooling configuration.
- **[Dependencies & Packaging](agent_docs/dependencies-packaging.md)**: When adding, updating, or declaring dependencies, or changing packaging configuration.

## File-Specific Rules

### `.gitattributes`

<!-- rule:2399 -->
- In `.gitattributes`, use directory-agnostic globs like `**/openapi*.json` with a short comment above each entry naming the group it covers — new snapshot directories then inherit the attribute automatically, instead of forcing an edit to `.gitattributes` every time a variant lands somewhere new. — Directory-specific paths require updating `.gitattributes` for every new snapshot location, which silently breaks generated-file handling (diffs, merge, linguist) until someone remembers; a `**/`-glob tied to a naming family (e.g. `openapi*.json`) covers all variants up front, and the comment makes the entry self-documenting for the next reader.

### `.pre-commit-config.yaml`

<!-- rule:144 -->
- In `.pre-commit-config.yaml`, omit `language_version` unless a non-default interpreter is required; prefer purpose-built maintained hook repos; keep `additional_dependencies` minimal; and when a tool is already pinned in `package.json`, use a local hook that runs the project's npm script instead of duplicating version pins. Redundant version pins drift out of sync with `package.json`, causing CI/local mismatches and brittle pre-commit updates. — Redundant version pins drift out of sync with `package.json`, causing CI/local mismatches and brittle pre-commit updates.
<!-- rule:143 -->
- Set explicit `files`/`types`/`types_or` on `.pre-commit-config.yaml` hooks — defaults silently over- or under-match files — A hook's default file matching can skip target extensions or run on unrelated files; pinning filters ensures the linter only sees intended files.

### `.semgrep.yml`

<!-- rule:2251 -->
- New rules in `.semgrep.yml` must include `id`, descriptive `message`, `languages`, `severity`, and a pattern matching the prohibited construct — keeps rule files uniform and toolable. — Format is markdown with backticked identifiers. Each bullet: imperative rule + WHY. Preserved project-specific references (`.semgrep.yml`, `id`, `message`, `languages`, `severity`, `element.classList.add/remove()`, `element.style.width = '200px'`, `setAttribute('style', ...)`, `<style>`, `<script>`, `style` attributes). The third rule addresses a project-specific gap concern (CSP consistency).
  Write `message` fields with concrete code-level remediations (e.g. `element.classList.add/remove()`, `element.style.width = '200px'`) pointing to generic web-platform alternatives (CSS classes, data attributes) — vague "prefer ..." phrasing or framework-specific attribute names only work when the rule is explicitly scoped to that framework.
  When banning one inline HTML mechanism (e.g. `style` attributes), add companion rules for the related inline constructs (`<style>` elements, `<script>` elements, `setAttribute('style', ...)`) — closes CSP gaps so enforcement is consistent.

### `CONTRIBUTORS.rst`

<!-- rule:1931 -->
- Don't add your own name to `CONTRIBUTORS.rst`/`CONTRIBUTORS.md` in a PR — maintainers add it at merge to avoid conflicts; check for duplicates first, and place core team members in the core team section, not the general list. — Self-edits to `CONTRIBUTORS.*` create merge conflicts when maintainers also update the file at merge time; duplicate entries and core-team entries in the general list break the file's structure. Centralizing edits keeps the list conflict-free and correctly categorized.

### `Makefile`

<!-- rule:2392 -->
- In the `Makefile`, call standard commands directly (`python`, `node`) instead of optional tooling wrappers (`uv run python`, `nvm exec node`) — keeps targets runnable in any provisioned dev environment where `uv`/`nvm` may be absent or unpinned. Assume the virtualenv, runtime versions, and dependencies are already set up; don't have recipes install or validate those tools. — Recipes that shell out via `uv`/`nvm` fail for contributors and CI images that provision the environment another way, turning a build target into a toolchain-versioning problem.

### `package.json`

<!-- rule:349 -->
- Keep runtime packages in `dependencies`, tooling in `devDependencies`, and declare build-critical native/compat packages explicitly with a semver range — global/manual installs and transitive resolution make CI builds non-reproducible and break `npm ci`. — Declaring every build-critical package in `package.json` (with a semver range) makes builds reproducible across machines and CI, since transitive deps and globally installed tools aren't guaranteed to be present. Splitting runtime vs. tooling keeps production installs (`npm ci --omit=dev`) lean. When a build fails on an outdated or missing build-critical dep, update its version range or add it to `package.json` rather than installing it globally.
<!-- rule:3043 -->
- In `package.json` npm scripts, wrap glob patterns passed to CLI tools in escaped double quotes (`\"...\"`), not single quotes or bare — single quotes fail under `cmd.exe` on Windows, and inconsistent quoting across scripts causes unpredictable expansion. — npm runs scripts through the platform shell, and `cmd.exe` does not treat single quotes as quoting characters — escaped double quotes work cross-platform. Applying the same convention to every script using the same CLI or glob keeps behavior identical between related tasks.

### `pyproject.toml`

<!-- rule:2142 -->
- Declare packaging metadata in `pyproject.toml` with modern PEP/SPDX conventions: — Deprecated forms (`License ::` classifiers, `license = {text = ...}`) and metadata split across `setup.cfg`/`setup.py` break tooling and PyPI rendering as the ecosystem moves to PEP 639 — consolidating in `pyproject.toml` with `setuptools >= 77` in `[build-system].requires` keeps builds and license detection consistent.
<!-- rule:2394 -->
- In `pyproject.toml` data-file entries, prune only confirmed-obsolete files (e.g. `AGENTS.md`) and keep packaged user docs (`CHANGELOG`, `CONTRIBUTORS`, `SPONSORS`) — silently dropping them ships broken releases — Two bullets: the first captures the atomic rule (what to remove, what to preserve) with the concrete example `AGENTS.md` and the user-facing docs it must not touch, plus the why (shipping broken releases). The second keeps the verification step as a distinct actionable item — comparing against a prior release — since it's a separate action with its own purpose (catching unintended drops).
  - After editing, diff package contents against the prior release — catches unintended file drops before they reach users

### `ruff.toml`

<!-- rule:770 -->
- In `ruff.toml` `[lint.per-file-ignores]`, use `**` for nested paths — `*` only matches one segment, so ignores silently fail on subdirectories. — The rule is about glob semantics inside a specific Ruff config table; `*` matching a single path segment means deeper files won't be ignored, causing unexpected lint failures. Naming `**` and the `[lint.per-file-ignores]` table keeps it findable in context.

### `setup.cfg`

<!-- rule:2857 -->
- Keep file-based flake8 ignores in `ignore`, not `extend-ignore`, in `setup.cfg` — `extend-ignore` is reserved for command-line invocations, and duplicating a code across both lists causes confusing, inconsistent ignore behavior. — `setup.cfg`'s `ignore` is overwritten at runtime if a CLI `--extend-ignore` is supplied, so mixing the two silently drops or shadows intended ignores.
<!-- rule:2856 -->
- List every frontend extension (e.g., `tsx`, `js`) in isort's `blocked_extensions` in `setup.cfg` — otherwise isort rewrites non-Python assets — Prevents isort from mangling frontend assets, which breaks builds and diffs.

### `tailwind.config.js`

<!-- rule:1703 -->
- Scope each `tailwind.config.js` `content` glob to extensions actually present: `{html,js,ts,tsx}` for app/client (no `.jsx`), `./wagtail/**!(static)/*.{html,js,ts,tsx,py}` for Wagtail, `{md,rst}` for `./docs/**`. Omitted extensions get purged; unused ones waste scanning. — Two tight rules preserving all project-specific glob examples (Wagtail `!(static)`, `client/scss`, docs extensions) while stating the consequences: omission purges classes, inclusion wastes scans, and narrowing to a single sibling purges other dirs.
  - When excluding a dir from a `content` glob (e.g. `client/scss` to avoid rebuild loops), keep scanning sibling code dirs via multi-dir globs (`./client/{src,storybook,tests}/**/*.{js,ts,tsx,mdx}`) or negation patterns (`./client/[!scss]/**/*.{js,ts,tsx,mdx}`) — narrowing to one sibling like `client/src` purges classes from the rest.

### `tsconfig.json`

<!-- rule:1572 -->
- When overriding `compilerOptions.lib` in `tsconfig.json`, list the ES library explicitly (e.g. `"lib": ["ES2019", "DOM"]`) — `target` controls emit, not type availability — omitting the ES lib makes newer APIs like `Array.flatMap` (ES2019+) fail to type-check.

<!-- /braindump -->