<!-- braindump: rules extracted from PR review patterns -->

# draft/ Guidelines

## Documentation

<!-- rule:106 -->
- Classify each proposed API in a DEP as `public documented API`, `private-but-stable API`, internal detail, or placeholder — tells reviewers what must stay backward-compatible vs. what can still change. — In Django DEP/API proposal drafts (e.g. `draft/0201-simplified-routing-syntax.rst`, `draft/table_value_expression.rst`, `draft/0000-background-workers.rst`), blurring public vs. private-but-stable APIs forces premature backward-compat commitments and hides design scope from reviewers. Place in `draft/AGENTS.md` so AI assistants editing any DEP draft apply it consistently.
  Mark internal or advanced-use APIs as `private-but-stable API`, not `public documented API` — omits formal docs and full backward-compat guarantees the design can't yet support.
  For each extension point or config argument, state the targeted use case(s), current limitations vs. future features, and the implementation path (e.g., contrib module, management command, admin integration) — lets reviewers assess scope and stability at a glance.
<!-- rule:38 -->
- In `draft/` DEPs and design proposals, document rejected alternatives with the specific tradeoff that ruled them out, and cite prior analysis/PRs/issues — future readers can't reconstruct decisions that only record the winner. — Design docs under `draft/` are the historical record for why the codebase looks the way it does; omitted alternatives force reviewers to relitigate settled choices and lose the evidence (benchmarks, PRs, issues) that justified them.
<!-- rule:123 -->
- Write requirements in `draft/` DEPs/RFCs as concrete, checkable obligations — vague criteria like "aligned with Django's releases" can't be verified or implemented — DEP/RFC/spec prose in `draft/` (e.g., `package-extras.rst`, `0000-background-workers.rst`, `0009-async.rst`) defines obligations that downstream packages and Django contributors will act on. Vague criteria, wrong counts, and ambiguous verb tense lead to misimplementations and disputes about what was actually agreed.
  - Replacing vague phrases with explicit bounds prevents ambiguity: e.g. state that third-party packages need not release in lockstep with Django but must test against alpha/beta/RC releases and ship a compatible release within a bounded window such as 30 days
  - Keep any stated count consistent with the actual listed items — mismatches mislead reviewers and implementers
  - Use verb phrasing that distinguishes proposed from secured obligations (`will have to be` vs `will be`) — readers need to know what is actually agreed versus still under discussion
<!-- rule:143 -->
- In `draft/` DEP/RFC/proposal prose, name entities and the document itself precisely — never use vague placeholders like "this thing", reuse a term such as "project" for a different entity nearby, or use first-person pronouns (write "the author"). Refer to the document as "this proposal"/"this DEP" and give every pronoun a named antecedent. — Spec documents are the normative reference for implementers; ambiguous references (unclear antecedents, reused terms, first-person voice) force readers to guess which entity or author is meant, and that guessing becomes a defect once the spec is cited in code review or downstream work.
<!-- rule:12 -->
- Mark non-goals and future work as "potential/future" in `DEP/` docs — readers otherwise mistake aspirational scope for committed deliverables — 
  - Defer underspecified features to a later `DEP` revision — avoids locking in APIs before the design settles
  - Claim only tested or implemented tool support in `DEP`s — untested support claims mislead adopters
  - State limitations as definitive `API`/framework limitations with before/after output examples — separates design constraints from fixable bugs
  - Give temporary compatibility constraints an expiry/removal plan — prevents shims from becoming permanent
  - Back readiness/support claims with concrete examples or cross-references — unverifiable claims erode trust
  - Lead with desired behavior and its value before describing limitations — readers need the goal to interpret the gap
  - Frame unproven performance/reliability as implementation goals and document failure cases — avoids promising unverified guarantees
<!-- rule:47 -->
- In spec docs (e.g. `draft/*.md`, `draft/*.rst`), define normative or overloaded terms in a Terminology/glossary section, keep it definitions-only, and push rule-like qualifications into the Specification — one-off jargon costs readers without payoff unless reused or defined. — DEPs and specs are read by contributors who lack the author's context; undefined or overloaded terms and jargon cause misinterpretation of normative statements. Keeping the glossary to concise definitions and putting obligations in the Specification prevents rules from being hidden where readers don't look for them.
<!-- rule:153 -->
- In `draft/` governance specs, default to denial for decisions that create permanent or hard-to-reverse status; use binary yes/no with a uniform reconsideration cooldown on rejection — keeps processes unambiguous and prevents irreversible loopholes. — Governance/process specs in `draft/` describe decision semantics that outlive individual implementations; defaulting to denial on irreversible outcomes and keeping rejection outcomes binary (with one uniform cooldown) prevents asymmetric or hard-to-audit states that future specs would otherwise have to unwind.
<!-- rule:120 -->
- In DEPs for ORM/SQL features, list every target DB backend explicitly, including variants that reuse another backend's implementation — omitting them obscures actual support scope, so only leave one out when support is marked provisional or undecided — Readers of `draft/` DEPs rely on the support list to know which backends a feature targets; a variant that inherits another backend's implementation is still supported, so hiding it makes the DEP's scope misleading.
<!-- rule:51 -->
- Keep `Specification` sections in `draft/*.rst` DEPs normative and factual — move justification, risks, and background prose to `Motivation`/`Rationale`. — Splitting conformance requirements from persuasion keeps the normative contract scannable for implementers and compliance checks.
<!-- rule:91 -->
- In DEPs/design specs (`draft/*.rst`, `draft/*.md`), state the agreed initial scope explicitly, keep each section focused on one concern, and omit speculative API surface (e.g. `create`/`update` variants) until a concrete use case justifies it — reviewers can't tell agreed scope from wishlist, and each section mixing concerns makes proposals harder to approve. — Spec drafts like `draft/database-computed-fields.rst` and `draft/0021-vector-fields.md` get approved piecemeal; separating concerns (field storage vs. distance semantics) and deferring speculative variants (per-operation `create`/`update`) lets each decision be debated and accepted independently. Without this, reviewers can't distinguish the agreed initial scope (e.g. `CompositeField` targeting virtual sources/expressions first) from aspirational API surface, and speculative variants get locked in before a use case exists.
<!-- rule:52 -->
- In `draft/` DEPs, resolve review feedback by editing the DEP itself, not just the thread — the DEP is the authoritative design record and must stay in sync with accepted decisions. — A review reply only reaches that thread's participants; future readers of the DEP see a stale design, so unresolved ambiguities or superseded choices get re-litigated or implemented as written.
<!-- rule:229 -->
- In DEPs/proposals, enumerate API changes as an `old_name` — Readers of `draft/`-style design docs need the complete public API surface and legacy-to-modern mapping in one place; burying renames or retained compat attributes elsewhere forces full-document searches and risks missing compat shims.
  ->
  `new_name` map, listing new accessors and retained legacy attrs
<!-- rule:208 -->
- In Django release-process DEPs (e.g. `draft/0101-release-process.rst`), write `release manager` not `Releaser`, and describe releases as concise role-based bullets covering: who performs releases, who manages the schedule, escalation/review, and backup release access/keys — keeps governance docs consistent across `draft/` files and matches the term Django contributors already use. — Governance details like release authority and key backups are scattered across multiple `draft/` DEPs; using the established `release manager` term and a fixed set of role bullets keeps them mutually consistent and makes gaps (missing escalation path, no backup key holder) visible.
<!-- rule:203 -->
- In governance-changing DEPs (`draft/*-*.rst`), state the amendment/ratification procedure (vote thresholds, veto conditions) and name the policy text being superseded; omit status-quo history that doesn't justify the model. — Future readers need to know what is now in force and how to change it — otherwise the proposal leaves ambiguity about which policy text governs and how future revisions happen.
<!-- rule:92 -->
- Ground proposed abstractions in `draft/` DEPs in prior work and existing/new base classes (`BaseField`, `ConcreteField`, `VirtualField`, …), and state explicitly what the current mechanism does **not** cover and what extra information would be required to replace it. — A DEP that only enumerates class names gives reviewers no way to judge whether the proposal is needed or sufficient; grounding it in prior work plus the specific gap and missing information makes the design verifiable and avoids re-debating settled ground.
  Rationale: just listing class names leaves reviewers unable to tell whether the proposal actually fills a gap — naming the uncovered case and the missing info makes the design reviewable and prevents re-litigating prior work.
<!-- rule:138 -->
- Use `preposition + which` and `so that` in `draft/*.rst` prose — avoids stranded prepositions and garbled connectives that read as informal or ambiguous in published docs. — Formal, grammatically explicit constructions keep the `draft/` documentation readable and consistent; stranded prepositions and mangled purpose/result clauses are harder to parse and don't match the register reviewers flag.
<!-- rule:95 -->
- In `draft/*.rst` proposals, explain each cited prior art (e.g. `FilteredRelation`, blog posts, third-party packages): capability, limitations/workarounds, relevance; link external sources. — Readers lack context you have, and external authors deserve credit. — Design doc readers aren't familiar with every prior implementation or community project referenced; explaining what each provides, where it falls short, and why it matters for the proposal lets reviewers evaluate the design, while linking out credits original authors.
<!-- rule:211 -->
- Format enumerable or parallel points in DEPs (`draft/*.rst`) as bullet lists — keeps vote outcomes and option sets scannable and individually referenceable — DEP readers need to compare parallel items (e.g. vote outcomes) side by side; burying them in prose hides the list structure and makes items hard to cite or diff.
<!-- rule:222 -->
- Use plural/generic wording (`CI processes`, `any relevant project`) over singular definite references (`the CI process`, `the project`) in DSF process/DEP/spec docs spanning multiple projects — singular definite phrasing wrongly implies a single scope. — DSF process/DEP/spec documents under `draft/` often describe conventions that apply across many projects and components. Writing `the CI process` or `the project` implies a single, known instance, which misleads readers in multi-project contexts; plural or generic phrasing (`CI processes`, `any relevant project`) keeps the scope accurate.
    - Applies to drafts under `draft/`, e.g. `draft/0011-accessibility-team.rst`.
<!-- rule:206 -->
- Match DEP example runtime types to the claimed inferred type — mismatched examples mislead implementers. — Type-hint DEPs are the reference users implement against; if the example accepts a narrower type than the inferred type claims, downstream code will reject valid inputs or trust a wrong signature. `INSTALLED_APPS` is the common trap: a `list[str]` example hides the `AppConfig` half of the union.
    For heterogeneous settings like `INSTALLED_APPS` (`str` | `AppConfig`), show the full union or pick a simpler example, so readers know exactly what to pass.
<!-- rule:154 -->
- **`draft/*.rst` governance specs:** mirror the acceptance process for reversion, and require overriders to propose a concrete alternative — asymmetric revert paths and bare vetoes let one body quietly undo another's decisions without accountability. — Symmetric processes ensure decisions made through due process can't be reversed by a lighter-weight path. Requiring a concrete counter-proposal prevents blocking without commitment.
<!-- rule:160 -->
- Spec privacy-sensitive `draft/` DEPs with defense-in-depth access controls — enumerate every authorized group, separate standing access from access granted only on request, cap raw-data readers at the minimum, and let aggregated summaries circulate. Makes over-broad raw-data access and standing-vs-requested ambiguity visible to reviewers before the policy ships. — Makes over-broad raw-data access and standing-vs-requested ambiguity visible to reviewers before the policy ships.
<!-- rule:205 -->
- In team-dissolution proposals under `draft/` (e.g. `draft/XXXX-dissolve-core.rst`), rename or repurpose shared community channels (`IRC`, mailing lists) that still serve onboarding or mentorship — don't close them just because the team is going away. Closing them silences low-volume but valuable community resources that outlive the team's governance. — Community communication resources often serve broader purposes (contribution mentorship, onboarding) beyond the team being dissolved; renaming/repurposing preserves them and avoids losing low-volume but valuable channels.
<!-- rule:218 -->
- Use plain, unambiguous outcome labels in governance docs — `Accept`, `No Action`, `Reject`, `Veto` — never `Pass`, and name abstention separately from rejection/veto. — `Pass` reads as approval but is often used for rejection or no-action, and pairing `No` with `Veto` looks like a duplicate; keeping outcome names distinct and aligned to a `-1`/`0`/`+1` model prevents miscounted votes and misread tallies in governance/process drafts (see `draft/0010-new-governance.rst`).
<!-- rule:221 -->
- In DEPs defining a team's remit, add a goal to identify Django API improvements/features for that problem area (e.g., `draft/0011-accessibility-team.rst` listing accessibility-friendly API changes) — teams without it scope themselves out of framework work — A team DEP that only describes outreach or review duties leaves the team's core problem unaddressed in Django itself; naming API/feature goals up front keeps the remit focused on shipping improvements users can actually build against.
<!-- rule:78 -->
- In `draft/0020-annual-release-cycle.rst` and similar CalVer DEPs, define `N` in `YYYY.N` as a per-series counter (annual release is `YYYY.0`), not the calendar year. — Readers otherwise misread `N` as year-based. Include cross-year examples showing maintenance/security releases stay in their originating series — e.g., a 2029 fix for the 2028 line is `2028.N`, not `2029.N`.
<!-- rule:102 -->
- In Django ORM docs examples, mark subquery cardinality with `[:1]` — unsliced querysets are multi-row table sources, not scalar subqueries — Makes subquery cardinality unambiguous in `Subquery`/table-expression examples, so readers can tell single-row scalar subqueries from multi-row table sources. "Scalar" is reserved for subqueries with a single `output_field`; multi-column single-row results must be described as "single row".
  - When an example omits `[:1]` intentionally, state the queryset is used as a table source
  - For multi-column subqueries returning one row, write "single row" not "scalar" — "scalar" implies a single `output_field`
<!-- rule:114 -->
- Model required/uncorrelated table sources in DEP SQL examples as `CROSS JOIN` and omit `ON (1 = 1)`; reserve `LEFT OUTER JOIN ... ON ...` for optional sources or real join predicates — matches how ORMs emit required sources, so readers copy correct SQL. — DEP SQL examples are the copy-paste reference for how ORM table expressions should be written; showing `LEFT OUTER JOIN ... ON (1 = 1)` for a required source teaches a pattern that produces wrong join semantics and diverges from what the ORM actually generates. Documenting the optional case alongside the required one, plus null-check edge cases, prevents readers from blindly demoting `LEFT JOIN` to `CROSS JOIN` where the null filter no longer applies.
  - Pair each required-source `CROSS JOIN` example in DEP docs (e.g. `draft/table_value_expression.rst`) with an optional-source `LEFT OUTER JOIN` example, and flag edge cases like null-check filters where demoting `LEFT JOIN` to `CROSS JOIN` needs special handling — the contrast is what lets readers pick the right form.
<!-- rule:137 -->
- In DEP/design docs, attribute migration change detection, operation construction, and `model_state` updates to the migration autodetector (incl. `generate_altered_*` helpers), not the models layer. — Django's `MigrationAutodetector` actually owns these concerns, so crediting the models layer misleads readers (and future implementers) about where migration logic lives.
<!-- rule:246 -->
- Document ack and execution semantics as prose in background worker specs (`draft/*.rst`) — undefined at-most-once/at-least-once guarantees cause silent reliability bugs — Prose guarantees (when a task is acked, at-most-once vs at-least-once) can't be inferred from the API surface, so readers of `draft/0000-background-workers.rst`-style specs would otherwise guess at delivery semantics and build on wrong assumptions about duplicates or lost work.
<!-- rule:150 -->
- In `draft/` API specs, add argument details to the existing `Argument | Meaning` table; don't create new tables/lists — keeps each argument's contract in one place. — Consolidating argument details into the existing `Argument | Meaning` table keeps each argument's contract in one location, so readers don't have to reconcile duplicate or divergent tables/lists. Explicitly noting parent-inherited naming constraints (e.g., a plural name required by a parent class/interface) prevents arguments from being renamed incompatibly in subclasses, and using singular names for single-value arguments avoids implying the argument accepts multiple values.
  Match parent-class argument names/shapes (e.g., a plural name required by the parent) and document the constraint; use singular names when exactly one value is accepted — prevents mismatches with inherited interfaces.
<!-- rule:191 -->
- In `draft/` governance docs (e.g. `draft/0010-new-governance.rst`), define ambiguous qualifiers like `in good standing` with explicit exclusions (e.g. not banned by a `moderator` or the `Code of Conduct`) — prevents disputes over eligibility. — Prevents disputes over eligibility.
<!-- rule:204 -->
- In release-process docs (e.g., `draft/0101-release-process.rst`, `draft/XXXX-dissolve-core.rst`), state that day-to-day release-readiness calls belong to those closest to development (e.g., `Mergers`) based on concrete blockers, and that scheduled security releases proceed despite unresolved blockers. — Readers of `draft/` release-process drafts need to know who decides and whether blockers stall a release — vague governance here causes stalled security fixes and unclear ownership.
<!-- rule:167 -->
- In `draft/*.rst` lifecycle/persistence docs, attribute actions to the right entity — objects are created/updated, field *values* are fetched/written. — Saying a field is 'created' or 'fetched' blurs the object/field distinction readers need to understand persistence behavior in specs like `draft/database-computed-fields.rst`; avoid pronouns that could refer to either.
<!-- rule:247 -->
- In `draft/` design docs for worker/backend abstractions, state scope boundaries and non-goals explicitly: single-service background job execution only (no event-driven/cross-service messaging), no separate queue broker/result/status backends, and backend selection orthogonal to application-level queue partitioning. — Prevents scope creep and reviewer confusion — readers of a new proposal (e.g., `draft/0000-background-workers.rst`) need to know the API targets simple background jobs, not a general messaging layer, and that backend choice is decoupled from queue partitioning.

## API Design

<!-- rule:28 -->
- Add new integrity/CSP support for static assets (import maps, template-tag URLs) via a single integrity-hash helper used by every static-URL consumer — ad-hoc hashing drifts and silently misses new URL call sites — Rephrased the three-part rule into three actionable bullets, each with a why (drift/missed call sites; SRI silently skipped without CORS mode; SRI inapplicable to inline content). Preserved project-specific references: import maps, template-tag URLs, `crossorigin="anonymous"`, `integrity` metadata, and the SRI vs. CSP nonce/hash distinction. Imperative mood, no deontological 'must' framing, and each rule fits a bullet while the rationale answers *why it matters*.
  - Emit `crossorigin="anonymous"` whenever `integrity` metadata is emitted for external scripts/stylesheets — browsers skip the SRI check otherwise, so the hash is never actually verified
  - Document that inline-rendered scripts (e.g., import maps) need a CSP nonce or hash-based CSP, not SRI — SRI only applies to fetched resources, so authors looking for integrity here need the CSP path
<!-- rule:18 -->
- Document one canonical interface in `draft/` API specs/DEPs, with trade-offs, non-goals, and concrete examples — keeps proposals reviewable and avoids choosing before semantics are understood — Defer speculative kwargs (`runner`, `queue`, routing/config) and any API whose runtime semantics aren't yet specified, unless the current proposal requires them — every added knob becomes a compatibility liability once shipped. Prefer showing users how to simulate alternatives (e.g., allowlists via wrappers) over exposing parallel mechanisms, and keep decorator/public signatures minimal so the surface stays easy to evolve.

## General

<!-- rule:214 -->
- Spell out full type-parameter lists for multi-parameter generics in `draft/` PEPs; a bare or partially parameterized generic may stay only as a documented escape hatch — inference hooks are `type-checker`-specific, so omitting arguments forfeits the precise checking the full signature enables — Preserves the `draft/` and PEP-draft context, keeps the escape-hatch allowance, and explains why the rule matters (type-checker-specific inference is unreliable, so the explicit signature is the source of precise checking).
<!-- rule:89 -->
- Split long inline links before the URL in DEP `.rst` files (`Link text\n<URL>`_) — keeps URLs intact and under the line limit — reST renders the whole `` `text <URL>`_ `` construct as one target; breaking the URL itself, or letting the line overflow, either mangles the link or trips line-length checks in `draft/` docs like `draft/0006-channels.rst`.

## File-Specific Rules

### `draft/0000-background-workers.rst`

<!-- rule:241 -->
- In `draft/0000-background-workers.rst`, document periodic jobs as requiring an external scheduler (e.g. `crond`) — first-party periodic scheduling is out of scope, so external schedulers (e.g. `crond` invoking management commands) are the supported pattern. — Covers the scheduling documentation section (including Future iterations) of the Django background workers DEP at `draft/0000-background-workers.rst`.
  - Provide built-in/contrib management commands to inspect, run/enqueue, and run workers for auto-discovered resources, with admin integration for task results — avoids forcing users to write cron-triggered management-command wrappers.
  - Don't rely on task-completion chaining to bootstrap or repeat periodic/cron jobs — chained completion callbacks can't express schedules, so presenting chaining as the scheduling mechanism misleads users.

### `draft/0008-gathering-usage-metrics.rst`

<!-- rule:159 -->
- Use "metrics" (not "analytics") throughout `0008-gathering-usage-metrics.rst` — keeps terminology aligned with the filename and avoids synonym drift for the same feature across titles, headings, and prose. — The DEP filename is `0008-gathering-usage-metrics.rst`, so mixing in "analytics" makes the document refer to the same anonymous usage-data feature by two different names, confusing readers and searches.

### `draft/0010-new-governance.rst`

<!-- rule:215 -->
- In `draft/0010-new-governance.rst`, spell out the Technical Board–Security Team authority split explicitly, not by implication. — Ambiguous authority boundaries stall security response, so the DEP needs each overlap (release authority, override, veto, post-hoc review) stated rather than inferred.

### `draft/0015-content-types.rst`

<!-- rule:275 -->
- Name parsed `HttpRequest` accessors by content type or method (`request.json`, `request.form_data`, `request.post_form_data`) rather than a generic `request.data` — avoids confusion with unrelated form APIs like `Form.data`/`cleaned_data`, and document the `request.` prefix in prose per DEP 0015 in `draft/0015-content-types.rst`. — ...

### `draft/0020-annual-release-cycle.rst`

<!-- rule:93 -->
- In the release policy's *Python Version Support* section, spell out which Django releases adopt a new Python, whether older releases gain newer Pythons, whether users must upgrade Python immediately, and how adding a runtime affects the oldest release — vague coverage leaves users unsure when to upgrade. — Two bullets. The first covers the three explicit statements the section must make (adoption by new Django releases, backporting to older releases, immediate-upgrade expectations, and the effect on the oldest supported release); without these, readers cannot tell whether a given Python/Django pair is supported. The second pins the definition to upstream bug-fix status and rejects an upper bound — matching the project's intent that users can try newer Pythons before an official support claim exists, while keeping the definition objective.
  - Define "supported Python" as versions receiving upstream bug fixes at the time of the Django release, with no hard upper bound — lets users try newer Pythons without waiting for an explicit support claim.
<!-- rule:98 -->
- In `draft/0020-annual-release-cycle.rst`, schedule Django's alpha after CPython's RC1/RC2 (not final) and beta after CPython's final release — alpha CI then exercises representative Python RCs early, while beta targets the shipped Python version. — The alpha milestone needs a Python release candidate in CI so incompatibilities surface before it stabilizes, but the beta's broad testing milestone only makes sense against the Python version users actually get.

<!-- /braindump -->