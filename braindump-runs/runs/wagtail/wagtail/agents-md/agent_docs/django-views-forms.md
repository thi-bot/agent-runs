# Django Views & Forms

> Rules for class-based views, view methods, form construction/validation, request parameter handling, and form lifecycle hooks.

**When to check**: When writing Django views, forms, or request-handling logic.

## Rules

<!-- rule:1423 -->
- Keep form logic in the form class: declare static fields as class attributes, configure dynamic fields in `__init__`, and put validation/permission-aware behavior in the form, not views or templates — keeps form behavior co-located and testable — Co-locating validation with the form makes it reusable across admin views, API serializers, and templates without duplicating permission checks.
<!-- rule:1607 -->
- Detect HTTP methods with `request.method` (e.g., `request.method == 'POST'`), not `request.POST` truthiness — empty or malformed payloads make truthiness checks unreliable. — These conventions keep Django view handlers consistent across apps, prevent subtle bugs from truthiness/empty-payload edge cases, and preserve correct form binding (bound vs. unbound) semantics.
  - Read params from the collection matching the client's submission: `request.GET` for query-string values, `request.POST` for body payloads (e.g., ping/update requests).
  - Branch form binding explicitly on `request.method` (`if self.request.method == 'POST': form = Form(self.request.POST)` / `else: form = Form()`); avoid `request.POST or None`, which treats an empty POST payload as unbound and changes form-binding semantics.
<!-- rule:1744 -->
- Support every Django `choices` shape where choices are consumed or overridden — flat `(key, label)` pairs, list/tuple optgroups, dict groups, and nested optgroups (recurse into groups to normalize keys/labels at each depth). — Django documents all four `choices` shapes, so code in `wagtail/utils/utils.py`, `Select.optgroups` overrides, and choice blocks silently mis-handles valid input if it assumes flat pairs — nested keys/labels never get coerced and user-facing labels drift. Documenting genuinely unsupported shapes at the call site prevents callers from debugging rendering bugs blind.
    - Django documents all four shapes, so code in `wagtail/utils/utils.py` (normalization), `Select.optgroups` overrides, and choice blocks silently mis-handles valid input if it assumes flat pairs — nested keys/labels never get coerced and user-facing labels drift.
    - If a nested/grouped shape genuinely can't be handled, say so in a comment or docstring at that call site; an undocumented gap leaves callers guessing why their choices render wrong.
<!-- rule:759 -->
- In `get_context_data(**kwargs)`, set defaults in a local dict, then `context.update(kwargs)` last, and pass the merged context to `super()` — lets subclasses override any default via `super().get_context_data(**kwargs)` without breaking parent callers — When subclasses call `super().get_context_data(**kwargs)`, caller-supplied values must win over defaults; merging `kwargs` last and forwarding the merged context keeps the override chain working and avoids silently dropping subclass values. Only computing a default when the incoming value is `None` preserves explicit falsy values (e.g. empty strings, `0`, `False`) that callers deliberately passed. Applies to class-based views across `wagtail/admin/views`, `wagtail/users/views`, and `wagtail/contrib/modeladmin`.
<!-- rule:1203 -->
- Define shared validation once on the common field base (e.g. `BaseField.check(model)`); callers delegate — prevents drift from duplicated `clean_<field>` overrides — When multiple forms, models, or field subclasses share validation for a common field type (e.g. tag fields), centralizing it on the shared form field/widget/base form or common field base class (like wagtailsearch's `BaseField`) keeps a single source of truth. Per-form `clean_<field>` overrides and per-subclass reimplementations cause bugs when the rule changes in one place but not others.
<!-- rule:547 -->
- Handle every HTTP method a view serves, not just the targeted one — partial coverage leaves other verbs silently broken. — Not provided
  Switch handlers off `GET` once they mutate data (e.g., DB writes) — `GET` requests are cached/prefetched and must stay side-effect-free.
  Comment non-obvious HTTP method choices inline — preserves the edge cases that forced the decision.
<!-- rule:2457 -->
- Keep routing, redirects, and precondition checks in Django admin views, not middleware — validate before mutation, raise `Http404` before redirecting, and gate state-changing views with `@require_POST`. — Middleware can't see view-specific context, so shortcutting it there breaks redirects and lets invalid state reach mutations; pre-mutation precondition checks and `@require_POST` prevent partial writes and wrong-method side effects.
<!-- rule:546 -->
- Put HTTP-method-specific logic in the handler method (`get()`, `post()`), not `dispatch()` — keeps each method's behavior easy to trace and avoids computing data (e.g. form serialization for GET) that only one method uses
<!-- rule:1507 -->
- Placement: root `AGENTS.md` (`## Django` or `## Views` section) — The rule is about Django CBV semantics, not any specific Wagtail account module, so it belongs in a global section rather than a view-specific file.
<!-- rule:1125 -->
- In class-based views, read URL params from `self.kwargs` by name — positional `self.args` unpacking breaks when route regexes change — Preserves stable view APIs as routes evolve and centralizes param extraction so downstream methods read predictable attributes.
  - Declare always-required params explicitly in the method signature — avoids silent `KeyError` from `**kwargs` typos
  - Cache params as attributes in `setup()` — later methods then reference stable attributes instead of re-reading `self.kwargs`
<!-- rule:1609 -->
- Honor `commit` in `ModelForm.save()` overrides — pass through to `super().save()`, or guard `instance.save()` behind `commit=True` — Callers using `form.save(commit=False)` to defer persistence (e.g. `wagtail/admin/views/page_privacy.py`) will silently write rows if `commit` is dropped, producing duplicate saves or partial transactions. When extra fields are already applied, prefer `instance.save()` directly over round-tripping through `form.save(commit=False)`. See `wagtail/admin/forms/account.py` for the expected pattern.
<!-- rule:1039 -->
- In Django form `clean()` methods: comment cross-field conditionals, use Django's standard `'This field is required.'` message, and drop `clean_<field>` overrides that only re-implement required-field checks already enforced by dynamic form construction — keeps validation explicit, consistent, and free of redundant logic. — Consistent error wording preserves user-facing translation and test expectations; removing redundant `clean_<field>` methods avoids duplicate validation paths and stale logic when required fields are added or removed dynamically.
<!-- rule:1029 -->
- In Wagtail admin chooser/listing views, derive display-only filter values directly from the object or by checking `request.GET` presence rather than fetching the referenced object or forwarding all params via `querystring` — keeps the view query-light and prevents unrelated GET params leaking into template links/messages
<!-- rule:2996 -->
- Set `icon_name` on side panel `Toggle` subclasses to an icon matching the panel's purpose — replace `# TODO Find the real icon` placeholders (e.g. generic `"site"`) with concrete icons (e.g. a device icon for a preview toggle); leftover placeholders ship misleading affordances to users. — Leftover placeholder icons make toggles visually indistinguishable and mislead users about what each side panel does.
