# API Reference Documentation

> API prose, attribute definitions, enum references, limitations, alternatives, helper invocation context, model state, registries, and safety behavior.

**When to check**: When documenting APIs, attributes, registries, models, or framework-invoked helpers.

## Rules

<!-- rule:2168 -->
- Write `docs/` API prose as `To {goal}, use {API}` — lead with purpose, not `If you need {goal}...`; keep clauses grammatically complete, prefer `which is to ...` over resumptive verbs, and include required prepositions like `supported by fn()` — readers scan for tasks, and complete constructions read as authoritative and translate cleanly across topics/pages.md and reference/contrib/modeladmin/reversing_urls.rst. — Purpose-first framing matches how readers scan docs for what they want to do; conditional phrasing buries the goal. Complete clauses with required prepositions prevent ambiguity across the docs/ tree
<!-- rule:1876 -->
- Reference canonical definitions for enums, not raw literals — docs stay accurate when values change — Concise bullets with rationale, code-formatted identifiers preserved, project-specific references (PageViewRestriction.GROUPS, Styleguide) kept intact
  - Use model/class members (e.g., `PageViewRestriction.GROUPS`) in prose, examples, and docstrings — mirrors actual code usage
  - For enumerable options (e.g., icon names), link the dedicated reference page of accepted values — not the Styleguide app or setup docs, which may be incomplete
<!-- rule:491 -->
- When documenting a limitation in `docs/`, lead with it, name the exact affected operations/entry points (not vague "manage the data"), explain the cause, and give the workaround. — Burying or vaguing limitations forces users to hit the bug before discovering it; explicit ops + cause + workaround lets them route around it on first read.
<!-- rule:1260 -->
- Give each alternative approach in `docs/` its own self-contained example that names how it differs from the recommended one — merged snippets and external comparison links hide which parts actually change — Readers skim alternatives to spot deltas; a self-contained snippet plus an explicit difference statement lets them copy the right version and see what diverges from the tutorial path, whereas merged snippets or linked diffs force them to reconstruct both.
<!-- rule:1348 -->
- In `docs/reference` and `docs/extending` attribute lists, write a short plain-language definition, then state constraints or default/fallback behavior as a parenthetical clause (e.g., "A unique identifier for the action (required in the `url` for bulk actions)") — keeps reference entries scannable and lets readers find constraints without parsing prose — Concise definitions with parenthetical constraints make attribute tables easy to scan; burying defaults in relative clauses forces readers to parse every entry for the one detail they need.
<!-- rule:389 -->
- When documenting framework-invoked helpers or migrations, include the full invocation context: both direct and indirect usage paths (e.g. internal templates/components that call the helper) and the framework wiring required to invoke it (e.g. a Django `Migration` with `RunPython`). Readers can't reproduce the behavior from a bare signature alone, so omitting the call sites and wiring makes the docs unusable. — Documents a cross-cutting documentation convention observed in docs/releases/5.1.md and docs/extending/generic_views.md. Placed in docs/AGENTS.md because it applies to any documentation the assistant authors in the docs tree, not to a specific file. Including indirect call paths and framework wiring lets readers actually reproduce and understand the helper/migration.
<!-- rule:365 -->
- In `docs/topics/snippets.md` and `docs/reference/signals.md`, spell out revision prerequisites — users hit `AttributeError`/silent no-ops when `RevisionMixin` (no `GenericRelation` needed; `revisions` override only for custom logic) or the `published`/`unpublished` signals (non-Page models only, need `DraftStateMixin` *and* revisionable) are assumed to "just work". — Docs that omit prerequisites force users to reverse-engineer failures from `RevisionMixin`/`DraftStateMixin` internals.
<!-- rule:2784 -->
- Name the owning model for each piece of split state and show concrete field examples per model — readers can't trace state otherwise — Docs describing state spread across related models are ambiguous unless ownership is explicit; concrete per-model field examples (e.g. as in `docs/advanced_topics/custom_tasks.rst`) let readers map behavior back to the right model.
<!-- rule:2792 -->
- Add a usage section after registry/extension registration docs, with concrete examples per consumer context — `StreamField` blocks, template tags, etc. — so readers can consume what they register (see `docs/advanced_topics/icons.md`). — Documentation
<!-- rule:2795 -->
- Document asset sets (e.g., icons in `docs/advanced_topics/icons.rst`/`.md`) with concrete formats, full asset name lists, and explicit placeholder/attribute conventions — vague terms or `"..."` placeholders force readers to grep source to use the asset — Self-contained, copy-pasteable docs let users apply assets without reading implementation code.
<!-- rule:1686 -->
- Label identifier constraints in `docs/styleguide` and `docs/advanced_topics/icons.md` with their enforcement source (spec/tooling/lint) and present the project's safe subset as a recommendation — readers otherwise mistake style limits for the exhaustive allowed set, or docs understate what the tooling actually accepts (relax the regex/lint to match). — Kept the two concrete doc paths and the enforcement-source distinction; framed the WHY as reader confusion about capability rather than a rule-following mandate.
<!-- rule:2690 -->
- Document conditional/safety behavior in `docs/`: exact trigger, required helper, call-flow position, failure mode — readers can't wire it up correctly from source alone. — Preserves the docs-tree scope while making the why (correctness of use) explicit rather than appealing to a convention.
