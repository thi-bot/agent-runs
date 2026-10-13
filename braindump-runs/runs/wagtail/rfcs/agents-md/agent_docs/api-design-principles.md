# API Design Principles

> Higher-level decisions about when and how to add API surface: minimal core surface, avoiding core coupling, preserving existing behavior, explicit query primitives, default-in-base-class hooks, and predictable metaprogrammed/template-override APIs.

**When to check**: When deciding whether and how to extend core API surface, add abstractions, or design new query/model primitives.

## Rules

<!-- rule:169 -->
- Add Wagtail core API only when framework-level integration is genuinely required and the functional benefit is concrete — every new namespace or attribute becomes a permanent migration burden for downstream sites. — This rule governs how contributors approach Wagtail core extension surface versus relying on third-party packages or site implementations. Adding API surface when a package or snippet would suffice locks core into supporting workflows it doesn't own, forces migration work on every downstream site, and couples core release cadence to third-party churn. Keeping core limited to genuine framework-level integration hooks keeps the API surface small, stable, and justified by functional benefit.
  - When a feature's workflow depends on a third-party package, expose only a minimal integration hook in core and let the package own the UI/workflow — keeps core releases decoupled from package churn.
  - For trivial, site-specific, consistency-only, or context-specialized features, ship a documented snippet or concrete use-case sample instead of new namespaces/attributes/contrib-style restructuring — avoids inflating the API surface (e.g. snippets parity, StreamField roadmap, i18n discussions) for needs a general-purpose solution already covers.
  - Justify any new migration burden or API surface with functional benefit — core API additions should not be driven by consistency alone.
<!-- rule:142 -->
- Model optional features as a separate model with `OneToOneField` to `Page`, not `ForeignKey` on `Page` — keeps shared core models decoupled from optional/cross-cutting features like RFC 45 Workflow — Adding a `ForeignKey` directly to `Page` forces every feature (and every dependent install) to carry it, coupling core to optional functionality. Similarly, un-namespaced field names or reverse accessors shadow names user subclasses already define, breaking existing sites on upgrade.
  - Namespace new relation fields and reverse accessors on shared models like `Page`, or set `related_name='+'` when no reverse accessor is needed — avoids collisions with fields on user `Page` subclasses
<!-- rule:193 -->
- Expose and check a dedicated `is_animated` property instead of sniffing file extension or format — extensions lie and formats like `.svg`/`.gif` can hold both static and animated content, so detection bugs cause wrong rendering paths. — Extensions lie; `.svg` and `.gif` can hold both static and animated content, so format-based checks route images down the wrong rendering path.
<!-- rule:117 -->
- Encode behavior variants in string syntax with validation, not standalone boolean fields — keeps the API surface minimal and avoids contradictory flag combinations — Adding a boolean/checkbox alongside a variant string lets callers produce invalid states (e.g. prefix flag without prefix path) and bloats forms and models. Encoding the variant in the string keeps a single source of truth, and validating `*` position up-front means downstream code never has to guess. Caching the derived flag on save keeps redirect resolution cheap without re-parsing on every request.
  - Persist a derived flag on save when internal code must distinguish a variant — avoids re-parsing the string on every read
  - In Wagtail redirect admin forms and models: use a trailing `*` on path fields to signal prefix matching, and the same convention on the destination path (omitted `*` = exact target); validate with a regex that `*` only appears at the end
<!-- rule:224 -->
- Document template override lookup directories and their precedence — users can't predict which template wins — Undocumented override resolution makes it impossible to tell which template a given path will load, causing silent, hard-to-debug output changes when new lookup locations are added.
<!-- rule:8 -->
- Compose existing search primitives in Wagtail's query API instead of adding special-case query classes — fewer primitives keep the API small and make cross-class composition predictable. — Wagtail's search query API composes primitives...
  - Express branch score changes with relative `Boost` rather than absolute classes like `ConstantScore` — absolute scores depend on unknown data magnitudes and compose ambiguously with other score components; `Boost` already scales a branch's score and can zero it out.
  - When a new explicit query class replaces a legacy implicit input/sentinel (e.g. `MatchAll()` for `None`), keep accepting the legacy input if maintenance cost is low, document the explicit class as the preferred API for new code, and add a migration/deprecation path — silent dual semantics leave callers unable to tell the two apart.
<!-- rule:84 -->
- Model each entity state change as its own immutable event record with `id` and timestamp — keeps history append-only and auditable without mutating prior state. — Splitting mutable state into immutable events preserves a full audit trail and avoids in-place updates that lose history; hoisting shared attributes to the parent entity keeps the event stream normalized so a single source of truth holds the invariant data.
  - Store attributes invariant across all events for an entity (e.g., a per-revision timestamp) on the parent entity, not on each event — prevents duplicated copies that drift out of sync.
<!-- rule:160 -->
- Implement default rejection handling in base `Task`, expose it as an overridable hook — custom task classes override instead of duplicating logic; keeps behavior consistent across the task hierarchy. — 
<!-- rule:170 -->
- Prototype simpler implementation paths before committing to broad abstractions — hard-to-reverse choices should be validated against planned migrations before locking them in. — Framework-wide abstractions are expensive to unwind once downstream code depends on them; validating lighter alternatives early avoids blocking planned migrations and rework across the codebase.
<!-- rule:223 -->
- Discover template overrides from a feature-level namespace (`templates/{feature}/`), not internal submodule paths — overrides stay valid when internal module layout moves — placeholder
  - Cascade template lookup most- to least-specific: `{namespace}/{app_label}/{model_name}/` → `{namespace}/{app_label}/` → `{namespace}/` — lets apps override at any granularity without duplicating templates
  - Keep the same `{namespace}/{app_label}/...` cascade shape across all features — inconsistent lookup order makes overrides silently miss
