<!-- braindump: rules extracted from PR review patterns -->

# docs/ Guidelines

## Code Style

<!-- rule:207 -->
- Map search option keys/labels in `search.py`; expose `template_name`, `absolute_url`, `html` on `SearchableView` — prevents duplicated literals drifting across views, templates, and sync code. — Centralizing search definitions keeps views, templates, and sync code referencing one source instead of duplicating or recomputing values, avoiding drift and inconsistency.
<!-- rule:216 -->
- **Scope:** `docs/templates/docs` search-result templates (zero-results state). — In `docs/templates/docs` search-result templates, controls that sit below the results count disappear when the result list is empty, stranding users with no visible way to refine the search — so filter/navigation markup lives above the count. The empty-state copy itself shouldn't restate the nearby heading (redundant and unhelpful); it should instead offer a recovery action such as a 'broaden your search' link so the zero-results page is a redirect, not a stop.
  - Keep filter/navigation controls **above** the results count — they stay visible when the search returns nothing, so users can adjust rather than hit a dead end.
  - Give the zero-results message a forward action (e.g., a link to broaden the search) instead of repeating the adjacent heading — avoids duplicated copy and leaves users with a next step rather than a detour.

## Testing

<!-- rule:213 -->
- In `docs/tests/test_views.py`, parameterize over `DOCUMENT_TYPE` enum members directly instead of the `DOCUMENT_TYPES` mapping — new enum members then get covered automatically without a parallel mapping drifting — Iterating the enum keeps tests aligned with the source of truth; a parallel `DOCUMENT_TYPES` mapping silently misses new members. Use `doc_type.value` for stored fields and query/URL parameters, and `doc_type.label` for expected human-readable output or metadata — conflating the two produces false passes or spurious failures.
<!-- rule:156 -->
- Use `SimpleTestCase` instead of `TestCase` for tests that need no database — `TestCase` wraps each test in a transaction and test DB setup, so non-DB tests pay needless cost and can mask accidental queries — `SimpleTestCase` blocks DB access outright.

## General

<!-- rule:225 -->
- Pass a fixed `config="simple"` to `SearchVector`/`SearchQuery` in `docs/search.py` — per-row configs like `models.F("config")` can't be matched to the module's GIN index, so searches fall back to a sequential scan (and language-specific configs also make stemming vary per row). — A per-row or language-specific `config` turns the search expression into a non-constant, so Postgres can't use the functional GIN index built for the `docs` search implementation; queries degrade to full scans. A fixed `config="simple"` keeps the expression indexable and makes ranking consistent across rows.
<!-- rule:421 -->
- Keep Elasticsearch connection/indexing boilerplate in `DocType.index_all` / `ImprovedDocType.index_all`; callers pass invocation-specific `index_name` instead of re-setting up connections — duplicated connections drift and cause inconsistent index targeting. — Centralizing prevents per-caller connection drift in `docs/search.py`.
<!-- rule:200 -->
- Anchor docs search result links to the matched section's heading fragment (e.g. `#section-title`), not the first `<mark>` — lands users on the relevant section instead of an arbitrary term hit — Linking to the first `<mark>` makes search results jump to the first literal occurrence of the query term, which may be in an unrelated context; anchoring to the section heading drives users to the section they actually matched.

## File-Specific Rules

### `docs/builder.py`

<!-- rule:232 -->
- Wrap `domain.get_objects()` tuples in a `DomainObject` dataclass with fields `name`, `dispname`, `type`, `docname`, `anchor`, `priority` — Positional tuples from `domain.get_objects()` are opaque and fragile — a named dataclass makes field access self-documenting and refactor-safe in `docs/builder.py`. Derived values (e.g., `code_path`) belong as properties on `DomainObject`, not recomputed inline, so builder logic stays DRY and consistent wherever those values are needed.

### `docs/management/commands/update_docs.py`

<!-- rule:245 -->
- Carry every CLI option into the Sphinx config dict when migrating `update_docs.py` — dropped flags silently change build output, e.g. map `-j auto` to `"parallel": multiprocessing.cpu_count()`. — The CLI-to-dict migration in `docs/management/commands/update_docs.py` replaces explicit flags with implicit defaults, so any option not carried over (like parallelism) silently regresses build behavior without erroring.

### `docs/models.py`

<!-- rule:236 -->
- Treat `metadata__<key>` annotations in `docs/models.py` as optional — handle absent values and add a key-absent test — Lets the `docs/models.py` search feature deploy before the JSON metadata backfill lands; a missing key would otherwise break search.
<!-- rule:278 -->
- In `docs/models.py` sync logic, guard optional relation field access with a truthiness check on the relation itself — e.g. `self.release and not self.release.eol_date` instead of `not self.release.eol_date` — because English `"dev"` docs lack a `release` object and the unguarded access raises `AttributeError`. — English `"dev"` documents have no `release` relation, so accessing `self.release.eol_date` directly throws `AttributeError` during sync; the truthiness guard short-circuits before the attribute lookup.

### `docs/templates/docs/search_results.html`

<!-- rule:235 -->
- In `docs/templates/docs/search_results.html`, group every known code-reference prefix (`term-`, `envvar-`, …) into the same conditional branch — a sibling prefix falling through to the default branch silently renders with the wrong code-reference styling. — The template special-cases prefixes one at a time, so adding `term-` without also listing `envvar-` leaves those references styled as plain results with no test catching it.

### `docs/utils.py`

<!-- rule:417 -->
- In `docs/utils.py`, build symlinks with the sibling name (`version`), not a root-joined path (`lang_dir / version`) — links break when the configured root is absolute vs. relative. — Mix `os.symlink` targets relative to the sibling's parent directory so the symlink resolves regardless of whether the configured root is absolute or relative; joining the root produces dangling links in one of the two cases.

<!-- /braindump -->