<!-- braindump: rules extracted from PR review patterns -->

# django/forms/ Guidelines

## API Design

<!-- rule:323 -->
- Derive widget HTML ids from `widget.attrs['id']`; preserve falsy source ids (`None`→`None`, `''`→`''`), append widget suffixes like `'_0'` only when truthy — keeps `<label for>` matching the rendered widget `id`, so clicking labels actually focuses the input — In `django/forms/boundfield.py` and `django/forms/widgets.py`, `id_for_label` must return the same id the widget rendered. Appending `_0` to an empty/`None` id produces a label pointing at a nonexistent element, breaking click-to-focus, `aria-labelledby`, and CSS/JS selectors for multi-widget fields (e.g. `RadioSelect`, `CheckboxSelectMultiple`).
<!-- rule:1830 -->
- Move field value-selection/preprocessing into `Field.bound_data(data, initial)`; `BaseForm._clean_fields` delegates — keeps disabled-state and decompression logic with the field so subclasses override one method instead of duplicating in form cleaning, and drops redundant local value setup. — Keeping field-specific value handling on `Field` means subclasses (e.g. disabled-value decompression) override a single method; inlining it in `BaseForm._clean_fields` forces duplicated, drift-prone logic in every form. After delegating, delete the now-redundant local setup to avoid two sources of truth.
<!-- rule:5328 -->
- Default the `renderer` param to `None` and resolve it with `get_default_renderer()` inside forms rendering APIs (`django/forms/forms.py`) — callers that pass no renderer still work, and resolution at call time respects `FORM_RENDERER` and subclass overrides. — Making `renderer` optional preserves backward compatibility for existing call sites, which were written before renderers existed. Resolving inside the method (rather than binding a default at import time) means the setting/override is honored at render time.

## Code Style

<!-- rule:5327 -->
- Render hidden fields inside their `<li>`/`<td>` (guard with `{% if forloop.last %}` before the closing tag) in `ul.html`/`table.html` — fields emitted outside the container get relocated by the HTML parser, breaking layout and JS/CSS selectors — Browsers hoist stray `<input>` elements out of `<ul>`/`<table>` contexts during parsing, so hidden fields placed after `</li>`/`</tr>` end up in unexpected DOM positions and break row-based CSS, JS selectors, and Django formset prefix indexing.
<!-- rule:5922 -->
- Cache `BoundField` method results (e.g. `css_classes`) in `{% with %}` (Django) or `{% set %}` (Jinja) vars when reused — avoids recomputing per call — `BoundField` methods like `css_classes` recompute on every invocation; binding to a template variable keeps output consistent and avoids redundant work in `django/forms/templates/` and `django/forms/jinja2/django/forms/` render paths.
<!-- rule:5329 -->
- Put engine resolution logic in a `default_engine` static method, not inside the `engine` cached property — keeps cached access separate from lookup so subclasses can override engine selection without breaking caching. — When multi-step engine lookup is embedded in the `engine` cached property (e.g., in `django/forms/renderers/templates.py`), subclasses and tests cannot swap engine selection without touching cache behavior. Extracting a `default_engine` static method isolates resolution so it can be overridden cleanly.

## General

<!-- rule:3360 -->
- Name asset abstractions after the HTML element they render (`Script`, `Link`, `Media`), not the resource format (`JS`/`CSS`, `JavaScript`/`Stylesheet`) — The class name is the public API of the form media module (see `docs/topics/forms/media.txt`), so it should reveal the exact HTML output. Element-based names also sidestep all-caps identifiers and let a single abstraction cover elements that load different resource types or take on semantics from attributes like `rel` — a `Stylesheet` class could never represent `<link rel="preload">`.

## File-Specific Rules

### `django/forms/boundfield.py`

<!-- rule:1485 -->
- Resolve computed a11y attrs (e.g. `aria-describedby`) in `BoundField.build_widget_attrs` via an overridable widget hook — lets third-party widgets customize without patching `boundfield.py` — Without an overridable widget hook, third-party widgets would have to patch BoundField.build_widget_attrs to customize computed accessibility attributes like aria-describedby, coupling them to Django internals and breaking on upgrades or conflicting with other customizations.
<!-- rule:5454 -->
- `BoundField.widget_type`: lowercase the widget class name, strip `input`/`widget` — keeps template discriminators clean. — Templates compare against `widget_type` values like `checkbox`, `password`, or `splithiddendatetime`; deriving them from the raw class name (`CheckboxInput`, `SplitHiddenDateTimeWidget`) would leave verbose, inconsistent identifiers that force templates to match on implementation names.
  Rationale: Templates compare against `widget_type` values like `checkbox`, `password`, or `splithiddendatetime`; deriving them from the raw class name (`CheckboxInput`, `SplitHiddenDateTimeWidget`) would leave verbose, inconsistent identifiers that force templates to match on implementation names.

### `django/forms/models.py`

<!-- rule:5054 -->
- Deduplicate queryset choices with `collections.OrderedDict.fromkeys(queryset)` in `ModelChoiceIterator` (`django/forms/models.py`) — `set()` loses ordering and `OrderedSet` triggered `sqlite3` failures. — Choice ordering must stay stable across renders, and `OrderedSet` has broken on `sqlite3` in practice; when filtering joins through multi-valued relations, dedup in both `__iter__` and `__len__`/`count` so yielded choices match the reported length.
<!-- rule:5047 -->
- Apply `limit_choices_to` exactly once, in `ModelForm.__init__` — Field generation with `fields_for_model(...)` runs before `self.using` is known, so limit filtering must be deferred: pass `apply_limit_choices_to=False`, then in `ModelForm.__init__` set `field.queryset = queryset.using(self.using)` and call `apply_limit_choices_to_to_formfield()`. Applying it during generation filters against the default connection and breaks multi-database forms; applying it twice re-filters an already-limited queryset.
<!-- rule:788 -->
- Keep explicit-`fk_name` and auto-discovery branches in `_get_foreign_key` (`django/forms/models.py`) symmetric — e.g., append `parent_model` to `parent_model._meta.get_parent_list()` in both — so multi-table inheritance resolves the same FK either way — Scope: `django/forms/models.py::_get_foreign_key`. The two lookup paths feed the same caller, so asymmetric handling of `_meta.get_parent_list()` yields different FKs for equivalent inputs depending on whether the user passed `fk_name` — a subtle correctness bug. The ambiguous-FK error must name `fk_name` so `ModelForm` and inline formset users can disambiguate rather than guess which relation Django selected.
  - Raise `ValueError` naming `fk_name` when multiple FKs point to the parent — silently picking one hides config errors from callers using `ModelForm`/inline formsets
<!-- rule:5035 -->
- Use `isinstance(value, self.queryset.model)` rather than `models.Model` when validating model instances in `ModelChoiceField`-like fields (`django/forms/models.py`) — scopes the check to the field's own queryset model, so unrelated model instances fail fast instead of slipping through to a confusing queryset lookup. — `models.Model` accepts any model instance, letting a mismatched model reach the queryset lookup where it fails obscurely or silently mutates the wrong row; checking against `self.queryset.model` rejects the wrong type at validation time.

### `django/forms/widgets.py`

<!-- rule:3372 -->
- Pass raw paths to `MediaAsset`/`Script`/`CSS` instead of pre-resolving with `absolute_path()` — centralizes path handling in `django/forms/widgets.py` so relative, `/`-rooted, and `http(s)://` assets resolve identically; cover those path forms in `test_media.py` and remove redundant resolution helpers once all string assets are wrapped — Pre-resolving outside the helpers duplicates logic across `django/forms/widgets.py` call sites, causing relative and root-relative paths to diverge from absolute URLs; wrapping raw paths lets one implementation handle all forms and makes duplicate helpers safe to delete.
<!-- rule:4380 -->
- Hardcode type-fixed attrs in `MediaAsset` subclass `super().__init__()` (e.g. `rel="stylesheet"` for `Stylesheet`); don't expose params — adding one later beats removing a public one — These subclasses each fix a small set of attributes for their asset type, so surfacing them as constructor params inflates the public API surface and makes removal a breaking change; adding a parameter later is trivially backward compatible. When an attribute genuinely needs to stay overridable, the default must be merged with `attributes.pop(...)` rather than hardcoded next to `**attributes` — hardcoding both produces a duplicate-keyword `TypeError` and silently breaks callers that previously passed the value through `**attributes`.
  - Merge overridable defaults via `attributes.pop('rel', 'stylesheet')` before forwarding `**attributes` — hardcoding beside `**attributes` raises duplicate-keyword `TypeError`s and drops caller overrides
<!-- rule:5806 -->
- Label multi-input choice widgets (`RadioSelect`, `CheckboxSelectMultiple`) at the group level (`fieldset`/`legend` or `aria-labelledby`), never the first sub-input — otherwise Safari+VoiceOver announces only the first option and the field label never reaches the rest. — Binding the field label to the first sub-input makes screen readers (notably Safari+VoiceOver) treat it as that option's label, so the group is mis-announced or the label is lost for all but the first choice. Group-level labeling plus per-option labels keeps the accessible name correct for the whole widget.
  - Override `id_for_label` on `RadioSelect` to omit the index — otherwise the field-level `<label>` gets `for="field_0"` and binds to a single option instead of the group.
  - Keep a distinct label on every option, and document in the `id_for_label` docstring why the index is dropped, including the Safari+VoiceOver impact.
<!-- rule:3367 -->
- In `MediaAsset.__eq__` (`django/forms/widgets.py`), compare `path` plus attributes; compare attributes only when the other operand defines them — One-sided comparisons must not fail when the other `MediaAsset` has no attributes — a bare path reference should still equal a fully-specified asset, matching how media paths are collected and deduplicated.
<!-- rule:4706 -->
- In `django/forms/widgets.py` media normalization, wrap values in `Script`/`Link` based solely on `__html__` presence — skip redundant `isinstance(value, str)` checks, which shadow the protocol and mis-handle non-`str` objects that already provide `__html__`. — The `__html__` protocol is the single dispatch signal for media-asset wrapping; adding `isinstance(value, str)` branches duplicates that decision and breaks custom objects that implement `__html__` without being strings.
<!-- rule:4758 -->
- In `FileInput`, when `multiple=True`, use `files.getlist(name)` in `value_from_datadict` and force `attrs['multiple'] = True` during rendering — `files.get` drops all but the last file, and `setdefault` lets caller-supplied attrs silently disable multi-file upload. — `files.get(name)` returns only the last file, so the widget would report a single file even though the form accepted several; `attrs.setdefault('multiple', True)` lets a caller's `multiple=False` override the flag, producing a form whose markup and value handling disagree about whether multi-upload is enabled.

<!-- /braindump -->