<!-- braindump: rules extracted from PR review patterns -->

# django/db/migrations/ Guidelines

## API Design

<!-- rule:3061 -->
- Pair every `Create*` with a matching `Remove*` and reversal path — migrations must be reversible — Applied to migration operation classes under `django/db/migrations/operations/` (and `django/contrib/postgres/operations.py`), this prevents irreversible migrations and name-drift bugs that break rollback or drop the wrong object.
  - In `Remove*` operations, key on stable user-defined names or accept the object instance — DB-generated names drift across runs
  - Don't collapse `Remove*`+`Create*` into a no-op unless the object is guaranteed identical — this silently removes required SQL
<!-- rule:1173 -->
- **Manage each `ProjectState` cache/registry independently in `django/db/migrations/` — invalidate only what re-rendering requires.** In `state.py`/`executor.py`: — Invalidating a shared cache wholesale forces unrelated state to be recomputed and can break reverse migrations that still need rendered apps. Gating independent registries like `relations` on `if self.apps:` misses cleanup exactly when `apps` is `None`, letting stale relation entries survive.
  - **Prefer `ProjectState.bulk_update()` over deleting `state.apps`** — `bulk_update()` invalidates caches selectively, so migrations don't lose unrelated cached state.
  - **Only drop cached rendered apps in the specific post-migration `ProjectState` mutation that re-renders** — reverse/unapply paths still need the rendered apps, so clearing there breaks them.
  - **Clean `relations` (and similar registries) unconditionally, not under `if self.apps:`** — `apps` can be `None` while `relations` still holds stale entries, leaving dangling references.
<!-- rule:6281 -->
- Treat `elidable` operations like their base counterparts in the migration optimizer — when adding elidability checks or new transformations to `optimizer.py`, apply them to both reduction and optimize-through, and test both variants. — - Scope: migration optimizer (`django/db/migrations`), specifically `optimizer.py` operation transformations.
- Why: elidable variants are separate classes, so any new check or transformation added to the base path is not automatically mirrored; without parity, the optimizer produces different results for elidable vs non-elidable operations — a subtle bug that only surfaces with `elidable=True`.
  - Rationale: elidable operations subclass their base (e.g. `ElidableOperation`), but the optimizer's transformation logic isn't inherited — forgetting an explicit elidability check or test silently diverges their behavior from the non-elidable version, producing different migrations depending on which flag is set.
<!-- rule:3964 -->
- Attribute `OperationDependency` to the generated field via `field.name`, not the input `field_name` that triggered iteration — the dependency belongs to the resulting field, not the parameter that named it. — `field_name` is just the iteration trigger; the dependency should travel with the field it produces (e.g. through `AlterField`, `RenameField`). Likewise, encoding "this operation does NOT reference the field" as a negation at a `reduce()` site hides the semantics from the operation itself, so `reduce()` compositions and future subclasses get it wrong.
  - Override `references_field()` in the relevant `FieldOperation` subclass instead of inverting its result at a `reduce()` call site — keeps reference semantics owned by the operation so composite/nested operations stay correct.

## General

<!-- rule:4267 -->
- Name migration state tracking terms precisely — `unsuitable_*`/`unusable_*` not `unapplied`, `applied_in_other_apps` not `pending`, `origin` not `triggering_object`; describe accumulated state by operation-sequence position, not migration direction — Generic status words in `django/db/migrations/` (loader.py, exceptions.py, state, operations/) collapse distinct meanings — `unapplied` hides the unsuitable-vs-unusable distinction, `pending` hides cross-app application — so subtle bugs in migration ordering and reverse operations become invisible to readers and reviewers.
<!-- rule:6221 -->
- Put version and timestamp on separate lines in generated-file header templates (`django/db/migrations/writer.py`) — dev builds like `1.9.dev20150712174416` are long and already embed a date, so a joined line reads as noise — Dev version strings in Django can be arbitrarily long and already contain a date, so concatenating them with the generation timestamp makes the header unclear or unreadable.

## File-Specific Rules

### `django/db/migrations/autodetector.py`

<!-- rule:5936 -->
- Support every `squashmigrations`-generated filename format in `parse_number` (`django/db/migrations/autodetector.py`) — misparsed squash names silently corrupt migration dependency resolution. — The rule targets the behavior of a single named function, `parse_number` in `django/db/migrations/autodetector.py`, which parses migration filenames into dependency numbers. Squash files generated by `squashmigrations` can include an optional description before `_squashed_` and can be squashed repeatedly, so multiple `_squashed_` markers may appear; the number that matters is the one after the last marker. Capturing more than the intended segment, or accepting an invalid trailing token, would produce incorrect migration numbers and break dependency ordering. Regression tests lock in the supported formats and the invalid-prefix fallback so future edits to the regex don't reintroduce these parsing bugs.
  - Allow an optional description between the leading number and `_squashed_`, and when multiple `_squashed_` markers appear, extract the number after the *last* one (e.g. greedy prefix ending in `_squashed_`) — repeated squashes keep appending markers.
  - Require the captured number to be a complete segment (look-ahead for `_` or end-of-string), and fall back to the leading number when the post-`_squashed_` token is invalid — prevents partial matches from yielding wrong dependencies.
  - Add regression tests covering squash filename formats, repeated squashes, and invalid-prefix fallback cases.
<!-- rule:4810 -->
- Guard removal ops for `unique_together`/`index_together` on `new_value.intersection(old_value)` — guarding on `new_value` alone also emits removals for options that were merely added or altered, duplicating the corresponding add op and corrupting migration output. — In `MigrationAutodetector`, set-valued Meta options can be added, altered, and removed in the same pass. The removal branch only applies to entries present in both old and new values, so comparing against the intersection (`new_value.intersection(old_value)`) confines the emit to genuine removals; comparing against `new_value` emits removals for anything not in the new set, which mislabels added/altered entries as removed and produces contradictory migration operations.

### `django/db/migrations/executor.py`

<!-- rule:6209 -->
- `MigrationExecutor.migration_plan()` must reject plans repeating a migration or including both directions — and `post_migrate` state built from `full_plan` must only apply migrations in the execution plan or `applied_migrations`. — Coherent plans and correct state derivation prevent double-applied migrations, which corrupt historic model state and fire `post_migrate` signals against the wrong schema.
<!-- rule:6232 -->
- In `django/db/migrations/executor.py`, emit one `logger.info` per operation and pick the action label from the `fake` flag (`'Faked applying migration %s on database %s'`) — keeps a single greppable message per operation and reflects whether it actually ran. — The rule concerns logging wording and structure inside the migration executor implementation, and all evidence points to a single file, django/db/migrations/executor.py. Although the original scope was labeled global, the rule is not repo-wide: it is specific to migration executor log messages. Placing it as a file-level rule makes it discoverable when an assistant edits that file and avoids imposing migration-log wording conventions on unrelated modules.
  - Phrase the label as a natural action verb: `'Faked applying migration ...'`, not `'Fake applied migration ...'` — matches the wording already used throughout the executor.
  - For separable phrasal verbs, place the object between verb and particle: `'Rolled migration %s back on database %s'`, not `'Rolled back migration ...'` — reads consistently with the other executor log lines.

### `django/db/migrations/graph.py`

<!-- rule:6287 -->
- Perform `replace_nodes` as a single batched call in `django/db/migrations/graph.py`, not one node at a time — a batched call is the only one that can see all replacement targets at once — Node replacement in the migration dependency graph (`django/db/migrations/graph.py`) mutates edges on both sides of each node. Replacing nodes individually loses the full set of targets, so recreated dependencies can point at nodes that were themselves replaced, producing self-referencing edges and orphaned parents/children.
  - Remap both incoming (parent) and outgoing (child) edges for every replaced node — one-sided remapping orphans dependencies
  - Exclude every replacement target when recreating dependencies — otherwise recreated edges become self-referencing

### `django/db/migrations/questioner.py`

<!-- rule:5904 -->
- Give questioner `__init__`s in `django/db/migrations/questioner.py` an optional `log=None` param stored as `self.log`. — Diagnostics written directly to `sys.stderr`/`self.stderr` can't be captured or suppressed by the caller, so migration commands testing this module can't assert on or quiet that output. An injectable `self.log` callback combined with the `verbosity > 0` guard keeps noisy notices opt-in and testable.
  - Route diagnostic messages through `self.log` behind `self.log is not None and self.verbosity > 0`, not `sys.stderr` or `self.stderr` — callers can then capture or silence migration output instead of having it leak to the console.

### `django/db/migrations/serializer.py`

<!-- rule:6387 -->
- In `RegexSerializer` (`django/db/migrations/serializer.py`), XOR flags against runtime-computed `re.compile('').flags` before serializing — never hardcode a single implicit default like `re.UNICODE`. Implicit defaults differ across runtimes, so hardcoding leaves stray flags in output and makes semantically equivalent regexes serialize differently. — Implicit flags are runtime-dependent, so omitting only a hardcoded `re.UNICODE` still emits other implicit flags and causes equivalent regexes to produce different migration files.
<!-- rule:943 -->
- Migration serializers in `django/db/migrations/serializer.py` must return the import specifier (e.g. `{'from django.db import models'}`) alongside any qualified reference — an empty set/dict writes unimported names verbatim into migration files. — Serializer output strings are copied literally into migration files, so omitting the import specifier produces migrations that reference names never imported at runtime. Returning the matching entry in the imports mapping (not `set()`/`{}`) keeps generated migrations self-contained and executable.
<!-- rule:3083 -->
- Read `value.__args__` for `types.GenericAlias` instead of iterating the alias  iteration can yield the alias itself (CPython issue 103450), so subscripted generics like `dict[str, models.QuerySet]` won't serialize correctly in `django/db/migrations/serializer.py`. — On affected Python versions, iterating a `types.GenericAlias` may yield the alias itself rather than its arguments, which breaks serialization of subscripted generics such as `dict[str, models.QuerySet]`.

### `django/db/migrations/state.py`

<!-- rule:4465 -->
- In `ProjectState` methods, compute `model_key = (app_label, model_name)` once and reuse it for `self.models[...]`, `resolve_model_field_relations`, and dict assignments — forwarding via `reload_model(*model_key)` keeps the key definition in one place, so a change to the tuple shape can't desync call sites. — Re-listing `(app_label, model_name)` at every lookup, helper call, and unpack site in `ProjectState` invites drift: a single method can touch the key five or more times, and any edit to one site silently breaks the others. Computing `model_key` once and threading it through — including as `reload_model(*model_key)` for helpers that want separate components — makes the method's model target obvious at the top and keeps the tuple definition authoritative.
<!-- rule:5478 -->
- Handle unresolved FK-target/base-model refs explicitly in `fill_remote_field_name` (`django/db/migrations/state.py`) — letting a generic resolution path raise `KeyError` that is then caught also swallows unrelated missing-key errors. — In migration field resolution (`fill_remote_field_name` and similar routines), unresolved FK-target or base-model references are expected outcomes, not bugs. If they resolve via a generic path that raises `KeyError` and is caught, any other missing-key error in the same block is silently swallowed, hiding real defects. Handling the expected cases explicitly (or tightly documenting and testing the `KeyError` scope) keeps genuine errors visible.
  - If `KeyError` handling is kept, document and test that it only covers expected unresolved-model cases (`migrations.UnmigratedModel`, unknown inherited base).

<!-- /braindump -->