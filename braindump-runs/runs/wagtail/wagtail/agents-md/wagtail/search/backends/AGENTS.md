<!-- braindump: rules extracted from PR review patterns -->

# wagtail/search/backends/ Guidelines

## API Design

<!-- rule:820 -->
- Represent search field references as structured field/column objects (name + metadata like `boost`), not as encoded field-name strings — string encoding breaks as soon as new metadata is needed or names collide. — Using user-facing field names directly in highlighting, sorting, filtering, or query clauses breaks or silently misses results when backend indexed names differ (PR#3004), and encoding boost metadata into crafted field-name strings makes boost handling brittle and error-prone (PR#10653). Structured field/column objects with explicit metadata keep boost values reliable, while documenting non-trivial field-name transformations prevents maintainers from misusing logical names in backend clauses (PR#10653).
  - Translate logical/user-facing field names to the backend's indexed field names before using them in highlighting, sorting, filtering, or other query clauses — keeps public field names stable even when the underlying index schema changes.
  - Document non-trivial field-name transformations in `wagtail/search/backends` (e.g., in `elasticsearch6.py`, `elasticsearch.py`) — prevents silent mismatches when index mappings evolve.
<!-- rule:2747 -->
- Override version-specific attrs like `mapping_class` in `Elasticsearch{N}*` subclasses — inherited attrs stay bound to the parent's version classes — Class-level attributes are resolved via normal inheritance, so a subclass that forgets to re-bind them silently uses the parent version's `Elasticsearch{N}Mapping`/`Elasticsearch{N}SearchQueryCompiler` variants, producing subtly wrong indexing or query behavior for the new version. Re-pointing them at the matching `Elasticsearch{N}*` classes keeps each backend self-consistent.
<!-- rule:2926 -->
- In `wagtail/search/backends/database/*`, score relevance with one match expression per field, multiplying that field's normalization factor (e.g., `title_norm`) into its own score — a single unnormalized expression across fields skews ranking. Mirror the Postgres backend pattern in `mysql/mysql.py`. — Per-field normalization keeps multi-field scores comparable, and matching Postgres ensures consistent ranking across database backends.
<!-- rule:1949 -->
- Route index writes in search backends through `write_connection`, not a new `read_connection` accessor. — Keeps connection API honest — a write-only alias named `read_connection` misleads callers about DB replica routing, and dead accessors accumulate as drift.

## General

<!-- rule:2105 -->
- Map `NothingNode` (from `QuerySet.none()`) to `MATCH_NONE` in search backend filter translators (`wagtail/search/backends/base.py` and siblings) — unmapped, it hits the unknown-where-node branch and raises `FilterError` on a valid empty queryset. — `QuerySet.none()` produces a `NothingNode` in the Django where-tree. Search backends that only special-case known nodes treat it as an unknown condition and error out, so a legitimate empty queryset crashes instead of returning no results. Explicitly translating it to `MATCH_NONE` keeps `none()` queries behaving consistently across backends.

<!-- /braindump -->