<!-- braindump: rules extracted from PR review patterns -->

# django/core/management/commands/ Guidelines

## Error Handling

<!-- rule:5475 -->
- Catch `OperationalError` in optional DB-dependent checks and `log` a warning instead of raising `CommandError` — lets management commands run without a database connection while still surfacing that the check was skipped — Optional consistency checks in `django/core/management/commands/` should never block the command from running. Raising `CommandError` on a connection failure makes the command unusable in environments without a database; catching `OperationalError` and warning preserves the skipped-check signal without breaking the command.
<!-- rule:5505 -->
- Strip compression suffix when writing plain-text fallback (`file_root`, not `file_path`) in management commands — Combined rule+rationale: keeps compressed-format contract honest in Django management commands handling compressed I/O.
    - Rationale: callers would otherwise treat uncompressed output as `.bz2`/`.xz`; warn or fail loudly, and preserve unrecognized extensions since Django can't interpret them.
<!-- rule:4284 -->
- Pass a sentinel like `"<<unknown>>"`, never the legacy `tablename`, as the cache alias in `createcachetable` and similar commands — prevents table names from being mistaken for `settings.CACHES` keys — Legacy `tablename` values are table identifiers, not cache aliases; resolving them as aliases can silently match a real `settings.CACHES` key or misroute the command, so a fixed sentinel keeps the two namespaces distinct.
<!-- rule:2542 -->
- Report per-item import/load errors at verbosity >= 1 using `self.stdout.write(..., self.style.ERROR)` at the point of failure, before the final success summary; add an error count to the summary and list failed paths under `-v 2`. — Without inline error reporting at default verbosity, partial import failures look like clean successes — users act on incomplete data. Writing at the failure point keeps errors near their source context, and the summary count plus `-v 2` path list make the scope of the failure auditable. Scoped to `django/core/management/commands` because the pattern applies to any multi-item command, not just `shell.py`.
  Why: default verbosity hides partial failures, so users trust a summary that silently skipped items — writing errors inline preserves context and the count/list surface exactly what was dropped.

## API Design

<!-- rule:2555 -->
- Include modules and objects lacking `__qualname__`/`__module__` in auto-import listings (`shell` verbose); bucket metadata-less entries into a fallback category. — Filtering by `__qualname__`/`__module__` silently drops module objects and C-defined types (`shell` users expect every auto-imported name to appear).
<!-- rule:2520 -->
- In `django/core/management/commands/` helpers, split side-effect-free `get_*` retrieval from `get_and_report_*` stdout reporting. — Callers needing only the value avoid unwanted stdout output; the reporting helper calls `get_*`, writes the report, and returns the value. Decorator-style wrappers and dropped return values hide side effects, forcing callers to guess.
<!-- rule:5730 -->
- Mirror `*Reader`/`*Writer` classes across paired commands and register formats in the command's compression mapping — keeps `dumpdata`/`loaddata`-style input/output symmetric. Only register formats that stream serialized text directly; defer archives like zip whose writer starts a new compressed member per write instead of appending to one continuous stream. — When adding compression support to one side of a paired input/output command (e.g., a new `SingleZipWriter` alongside an existing `SingleZipReader`), ship the matching counterpart and add it to the command's compression-format mapping so `dumpdata` and `loaddata` stay in sync. Non-streamable archive formats (like zip writers that emit one compressed member per write) can't be read back by the paired reader, so leaving them unregistered avoids broken round-trips.

## Documentation

<!-- rule:4846 -->
- In `django/core/management/commands/makemessages.py` and similar commands, comment each non-obvious normalization step with its input, output, and purpose (e.g. `zh-cn`/`zh_cn`/`ZH-CN` → `zh_CN`) — otherwise future edits can't tell which input variants are intentional — Non-obvious normalization (locale casing/separators, aliases) is exactly the kind of code that gets silently broken during refactors, because reviewers can't infer which variants are supported from the code alone. Documenting input→output→purpose keeps the accepted set explicit and testable. The log-message rule matters separately: emitting only the corrected value (or calling a locale a language tag) hides what the user actually passed, making it hard to trace why `zh-cn` and `ZH-CN` behave differently in makemessages output.
  - Log normalizations with `Normalized %s to %s.` including both original and corrected values — a locale is not a language code/tag, and conflating them misleads anyone debugging bad input
<!-- rule:5977 -->
- In management-command warnings listing multiple items, merge related notices into one message and scope remediation to the affected subset (e.g. `if not marked as applied`) — blanket claims misstate which listed items actually need action — Users reading `migrate` or similar command output act on each warning; a blanket instruction implies every listed item needs the same fix, causing confusion or unnecessary work when only some do.

## Code Style

<!-- rule:6196 -->
- In `makemigrations`-style commands that write multiple migration files per app, run migrations-dir setup (create `migrations/` and `__init__.py`) once per app, before the per-migration loop. — Putting this setup inside the loop re-does the same filesystem work and any associated side effects (warnings, `os.makedirs`, `__init__.py` writes) for every migration file in the app; hoisting it keeps setup idempotent and avoids redundant I/O on apps with many migrations. Applies to commands under `django/core/management/commands` such as `makemigrations` and `squashmigrations`.
<!-- rule:5968 -->
- Call `run_formatters()` on generated `.py` paths — generated files must match hand-written formatting. — Generated `.py` files land in the same tree and CI checks as hand-written code, so skipping `run_formatters()` would commit output that fails lint/format checks or creates noisy diffs, while silently skipping formatting during manual porting would report success on files the user still has to fix and format by hand.
  - When `writer.needs_manual_porting` is set, skip formatting and emit an explicit "not formatted" message instead of a misleading success state.

## General

<!-- rule:5504 -->
- In Django management commands handling compressed I/O (e.g., `loaddata`, `dumpdata`), centralize compression support in a `compression_formats` dict keyed by filename suffix and mapped to `(open, mode)` tuples. — Keeping a single mapping forces compressed and uncompressed paths through the same lookup, so new formats and aliases can't silently diverge between paired commands like `loaddata`/`dumpdata`.

## File-Specific Rules

### `django/core/management/commands/dumpdata.py`

<!-- rule:5721 -->
- In `compression_formats`, pass explicit `format`/kwargs matching the extension's container — `lzma.open()` defaults to `.xz`, so `.lzma` silently writes the wrong format — The lookup table's purpose is to reproduce the container format the extension conventionally denotes; relying on library defaults produces files whose contents don't match their extension.

### `django/core/management/commands/listurls.py`

<!-- rule:3352 -->
- In `listurls`, implement `apply_color()` to colorize URL patterns with the configured styles (`ROUTE`, `VIEW_NAME`, `NAME`, `HEADER`) only when `self.is_color_enabled` is true, and expose `--format {columns,stack,json}` (use `columns`/`stack`, not the old `aligned`/`verbose` names) — keeps output consistent with other commands and avoids breaking scripts that parse `--format` values. — The `listurls` command is user-facing, so its output contract matters: `apply_color()` must gate on `self.is_color_enabled` to keep piped/redirected output clean, and the `--format` choices are the public names users and downstream tooling rely on. Reusing the configured style constants (`ROUTE`, `VIEW_NAME`, `NAME`, `HEADER`) rather than ad-hoc colors keeps the command visually aligned with the rest of the CLI, and sticking to `columns`/`stack` (not `aligned`/`verbose`) prevents churn in scripts parsing the flag. This is scoped to `listurls` because these names and style hooks are specific to that command's implementation in `listurls.py`, not a project-wide convention.

### `django/core/management/commands/loaddata.py`

<!-- rule:4519 -->
- In `/admin/`, filter by the related field's own name when a field's `attname` already contains that related field. — The old param-name mismatch path breaks filtering whenever a relation is specified with an explicit `attname`, not the model field name.

### `django/core/management/commands/makemessages.py`

<!-- rule:3852 -->
- Prepend a discovered `locale` dir to `self.locale_paths` at index 0, removing it first if already present — traversal results must override `LOCALE_PATHS` — Discovered `locale` dirs reflect the actual project layout, so they should shadow configured paths; a plain insert-if-absent leaves a stale `LOCALE_PATHS` entry ahead of it and picks the wrong catalog. The error message must cover every supported setup (per-app `locale` dir vs. `LOCALE_PATHS`) so users on either configuration know how to fix it.
  - Make the missing-locale `CommandError` actionable — name both an app `locale` dir and the `LOCALE_PATHS` setting as fixes
<!-- rule:5903 -->
- `makemessages.py`'s `write_po_file`: call `normalize_eols()` unconditionally on PO contents — gating on file existence, `invoked_for_django`, or the plural-forms branch leaves existing catalogs with mixed EOLs — Both pre-existing and freshly generated catalogs must be normalized; gating the call means catalogs written before this logic existed (or via the `invoked_for_django` / plural-forms paths) keep inconsistent line endings, producing noisy diffs and breaking translation tooling.

### `django/core/management/commands/shell.py`

<!-- rule:6383 -->
- In `shell.py`, raise `CommandError` with "Couldn't import <shell>." only when an explicitly requested interface fails to import — default/fallback failures shouldn't error — Surfaces a clear failure to users who asked for a specific shell (e.g. `--interface=ipython`) without breaking the command when a default/fallback interface is simply unavailable.
<!-- rule:3710 -->
- In `django/core/management/commands/shell.py`, deduplicate auto-imports with `(name, obj) not in auto_imports[module]` rather than a parallel `imported_names` defaultdict or a bare `name` check — the same `name` can map to different objects across modules, so a name-only check silently drops valid imports. — Two modules can export the same name (e.g. `User`) referring to different objects; keying on `(name, obj)` keeps both while still suppressing true duplicates, and avoids the bookkeeping drift of a parallel `imported_names` structure.
<!-- rule:2524 -->
- Build exec() namespaces via `get_namespace()`, never by mutating `globals()` — keeps user code isolated and consistent across entry points — In `django/core/management/commands/shell.py`, every `exec()` entry point (the `-c` command and piped stdin) should pass `self.get_namespace()` and omit `**globals()`; mutating `globals()` in place leaks module state and causes the two paths to diverge, so users see different behavior depending on how they invoke the shell. Inside `get_namespace()`, reference already-loaded model classes directly rather than re-importing via `import_string()` (avoids redundant imports and surprises for swapped/custom models), and only catch exceptions the guarded code can actually raise so real errors aren't swallowed. When synthesizing app-module aliases like `f"{app_label}_models"`, check `if key not in namespace` first — overwriting an existing model entry silently breaks `from app import Model` style access in user snippets.
<!-- rule:2546 -->
- Keep interactive readline/rlcompleter setup and the libedit/macOS tab-completion shim in `django/core/management/commands/shell.py` — never gate them on `-S`/`-I` or `sys.flags.isolated` or delete them as cleanup; removing them silently breaks tab completion and key bindings for real users even though isolated-mode tests still pass. — Isolated-mode (`-S`/`-I`) skips this setup by design, so refactors that reuse that behavior as a cleanup target strip features real interactive users depend on without failing any automated test.

<!-- /braindump -->