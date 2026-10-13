<!-- braindump: rules extracted from PR review patterns -->

# text/ Guidelines

## Documentation

<!-- rule:11 -->
- Link cited research in RFCs/design docs to public canonical sources and inline key definitions — keeps documents self-contained and claims verifiable. When citing polls/surveys, link the source, summarize qualitatively, verify any exact counts match the reported numbers and the measured dimension, and drop summaries contradicted by the source data. Prefer qualitative over detailed statistics — exact figures distort emphasis and overstate weak evidence. — Readers of `text/` RFCs and design docs need to verify claims without hunting for sources; misquoted counts or inflated poll summaries misrepresent the underlying evidence and skew design decisions.
<!-- rule:12 -->
- **Cross-reference GitHub issues, RFCs, tracking artifacts, and project mechanisms in `text/*.md` RFCs** — readers need context to evaluate proposals without searching outside the doc. — Authoring guidance scoped to Wagtail admin RFCs and roadmap docs under `text/` so AI edits to `text/*.md` follow the directory\'s cross-referencing conventions.
  **State existing coverage next to the exact feature** with accurate tense (`implemented`, `covered`) — prevents re-proposing work a unified mechanism already handles.
  **Show how proposals extend unified mechanisms** (e.g., `Panels`, documented Stimulus approaches, unified admin model-management) rather than introducing competing APIs — e.g., clarify whether `register_page_listing` is a specialised subset of unified admin model-management.
  **Link each tracking artifact with its distinct scope stated** (e.g., project board versus spreadsheet) — readers need to know where to follow progress and what each covers.
<!-- rule:3 -->
- Assign the next unused sequential number to new RFCs in `text/` — reuse or gaps break stable RFC references — RFC documents under `text/` are cited by number across the repo, so the filename, H1 title, header metadata, and roadmap entries must all agree. Sequential numbering keeps references stable and unique; a mismatch or leftover `XXX` placeholder makes the RFC unlinkable and hard to find.
  - Mirror that number in the filename, the `# RFC {number}: {Title}` H1, header metadata, and roadmap references, replacing `XXX` placeholders — a single mismatched ID silently breaks cross-references and search
<!-- rule:75 -->
- Describe UI changes concretely in `text/` RFCs — exact location, content, triggers, status, scope; reuse existing accessible controls over new gestures; mock up layout/spacing tradeoffs — vague specs get approved but ship the wrong behavior. — RFCs under `text/` are the review surface for UI decisions; unspecified placement, triggers, or scope let reviewers approve without seeing the real interaction, and new gestures that duplicate existing accessible controls break users who rely on those controls.
<!-- rule:37 -->
- In `text/` RFCs/specs/roadmaps, state scope explicitly per change — enumerate every affected context, each field's purpose/defaults/validation, migration & opt-in vs. default behavior, and per-item compat impact — Implicit scope lets implementers miss contexts beyond the primary one (e.g., `alt-text` applies across every applicable surface, not just the new one), wrongly assume backward compat, or hit late blockers (`preview` errors, CSP adoption). Spell out: public APIs must stay backward compatible; internal APIs may break on unsupported customisations; note whether each item replaces or is an alternative to existing functionality; and list how/when known risks are addressed.
<!-- rule:88 -->
- Author `text/` RFCs as decision documents: goal/benefits up front, every proposed change enumerated (including minor default/behavior changes), Open Questions filled with concrete items each carrying a `Proposed resolution` (adopt/defer/reject), definitive language for settled decisions. — RFCs under `text/` are read as the record of what was decided, so hedged language or an open-ended Open Questions section silently defers decisions and lets unreviewed default/behavior changes slip through. Explicit resolutions and enumerated changes make review actionable; documented alternatives give a defined exit path for abstractions that outlive their original context.
  - Only defer non-blocking/tangential concerns in Open Questions — leaving blockers unresolved stalls review and hides the actual decision.
  - Document alternatives or an exit strategy for long-lived or developer-facing abstractions — lets future maintainers reverse course without a rewrite.
<!-- rule:15 -->
- Keep `text/*-roadmap-updates.md` bodies focused on the near-term proposal; append roadmaps in a labeled appendix or move them to a separate planning doc — speculative items dilute the core spec for reviewers — Roadmap RFCs in `text/` are read as near-term specs; burying speculative work or indeterminate `Future` items inside them makes the actionable proposal hard to review. Per-item title/motivation/link triples and individually annotated trackers preserve discoverability of the issue/RFC and PR trail without silently dropping resources that still serve a distinct purpose.
  - Exclude replaced components and advanced third-party customization APIs from roadmap RFCs — move them to a dedicated planning doc instead
  - Give each roadmap item a title, use case, and links to both its tracking issue/RFC and implementation PR (`[Item](issue-url) & [PR #number](pr-url)`) — reviewers need the full trail
  - List complementary trackers individually with short annotations rather than replacing an existing one — each covers a distinct purpose
  - Only list items with a target release or clear scope; defer items tied only to `Future` — keeps the roadmap actionable
<!-- rule:148 -->
- Document new-name decisions in `text/` RFCs — candidates, collisions, deviations, final name — Surfaces clashes with existing project and third-party terminology before the name is locked into a public API or domain concept; scope naming mandates to the proposed feature so they don't bleed into unrelated concerns.
<!-- rule:33 -->
- Use canonical fixed phrases in RFC/roadmap prose (`formal roadmap`, `remediation work`, `problem space`) — typo and word-form variants like `formap roadmap` or `problems space` read as sloppy and skew grep/glossary consistency. — RFCs and roadmaps in `text/` are read and cross-referenced long after writing, so consistent, grammatically correct fixed phrases preserve greppability and terminology alignment across `text/103-roadmap-updates.md`, `text/088-roadmap-updates.md`, and `text/029-immutable-revision-events.md`.
<!-- rule:28 -->
- In `text/` roadmap and RFC docs, separate *deprecate* from *remove* — don't schedule a deprecation in the same release that ships its replacement; require replacement parity and a migration path before announcing removal; drop or defer items with undecided scope or timeline. — Users reading a roadmap need time to migrate, and same-release removal makes replacements feel forced rather than opt-in.
<!-- rule:4 -->
- In `text/` RFCs, add `* Last Modified:` alongside `RFC`, `Author`, and `Created`; bump it to the revision date on every edit and leave `Created` unchanged — readers can tell when the doc was revised vs. originally authored. — Distinguishing revision date from creation date lets readers see the doc's provenance and how stale it is, which matters for RFCs that guide ongoing decisions.
<!-- rule:109 -->
- In `text/` design/RFC docs, list scope exclusions (with reasons) in a dedicated section as standalone sentences — trailing clauses are easy to miss, so readers assume omitted topics are oversights — Design docs in `text/` are read by contributors deciding what to build next. An exclusion buried mid-paragraph as a trailing clause (`...but not X`) reads as an afterthought and gets skipped, so readers either re-raise the topic or assume it was forgotten. A named section of standalone sentences makes intentional non-goals unambiguous and gives each a reason the reader can evaluate.
<!-- rule:149 -->
- One sentence per line in `text/` RFC Markdown — semantic line breaks keep diffs and blame clean — Hard-wrapping prose mid-sentence causes reflow churn: editing one word re-wraps the whole paragraph, obscuring the real change in diff and blame. One sentence per source line keeps edits localized and reviewable across `text/` RFCs like `text/077-svg.md` and `text/097-alt-text-capabilities.md`.
<!-- rule:195 -->
- Mark RFC (`text/`) sections describing features not yet adopted internally as 'not final' — prevents users building on contracts that are still shifting — RFCs are read as commitments; unadopted APIs can change without notice, so labeling them provisional (see `text/078-adopt-stimulus-js.md`) keeps readers from depending on unstable behavior.
<!-- rule:153 -->
- In `text/` RFCs, compare options apples-to-apples: list every option's full costs and added complexity, and show equivalent supporting code (value classes, URL resolution, template rendering) for each — not just the chosen design's field/block definition. Also note how the chosen design could later accommodate rejected approaches in core or third-party. — One-sided comparisons hide integration cost and mislead reviewers into approving proposals whose real complexity only surfaces during implementation; parallel code samples make the trade-off visible. Noting future accommodation shows the rejected path isn't permanently foreclosed.
  - Rationale: One-sided comparisons hide integration cost and mislead reviewers into approving proposals whose real complexity only surfaces during implementation; parallel code samples make the trade-off visible.
<!-- rule:47 -->
- Document autosave integration in RFCs and roadmap sections: how revisions behave, and whether inline/front-end editing, snippets, arbitrary Django models, and fields without `Telepath` adapters reuse the mechanism — prevents off-spec implementations across features — This applies as a documentation standard for autosave specs across `text/` RFC and roadmap Markdown files; placing it in `text/AGENTS.md` targets the RFC/roadmap area rather than the whole repo.
  - Replace generic "unsaved changes" in autosave UX specs with a relative `Last saved … ago` indicator (page header preferred) and an explicit `unpublished changes` / saved-but-not-fully-saved state — keeps users aware of real save progress
  - Keep these states meaningful through validation errors and edit conflicts, and retain unload/navigation-away confirmation while a save may be in flight — the autosave interval plus request round-trip leaves a genuine data-loss window
<!-- rule:177 -->
- In `text/` RFCs and design docs, describe UI features by product name, not implementation tech — docs outlive stacks (`text/054-internationalisation.md`, `text/097-alt-text-capabilities.md`). For new JS or static assets, state the execution context: Wagtail admin, public frontend, or both — prevents reviewers assuming the wrong runtime. — RFCs are read long after their implementation technologies change, so naming features after product concepts keeps them discoverable and accurate. Without the explicit execution context, reviewers and future implementers can't tell where a script/asset is meant to run, leading to faulty assumptions about APIs and bundling.
<!-- rule:220 -->
- In roadmap docs under `text/`, state the covered change types (refactors, removals, architecture, cross-cutting) and include items whose primary category differs (e.g. security) if they carry secondary sustainability/performance benefits — always explain the mechanism. Without this, roadmaps read as narrow feature lists and readers miss sustainability wins. — Roadmaps scoped only to their headline category hide the refactors and cross-cutting work that deliver most of the sustainability/performance benefit; naming the full change-type range and the mechanism keeps non-obvious items discoverable.
<!-- rule:135 -->
- In RFCs (`text/*.md`), qualify team names with the project on first mention (`Wagtail's UI team`) and use `our` for project-owned tooling — readers outside the org can't disambiguate bare `UI team` or `the dashboard`, and repeating the full org name reads as boilerplate. — RFC prose is read across teams and often outside the originating group; unqualified team names like `UI team` or possessive-free tooling references are ambiguous (which project's UI team?), while restating the full organization name multiple times within one sentence bloats the text. Anchoring the first mention to the project ('Wagtail's UI team', 'our deployment pipeline') and then using short descriptive phrases keeps attribution clear without repetition.
<!-- rule:17 -->
- In roadmap RFCs under `text/` (e.g., `text/106-roadmap-updates.md`, `text/109-roadmap-updates.md`), record partial progress in the item's Notes, not just its status field — status alone loses sub-scope completion context for readers tracking incremental work. When de-prioritizing an item or moving it to `Future`, state the explicit rationale (e.g., higher-priority work identified in the release cycle) so future readers understand why without having to reconstruct the decision. — Roadmap RFCs under `text/` are read iteratively across releases; Notes preserve sub-scope progress that a coarse status loses, and explicit deferral rationale prevents relitigating the same de-prioritization decision in later cycles.
<!-- rule:147 -->
- In i18n RFCs, note that page-editor field alignment follows the *content* locale, not the admin UI language — Arabic/RTL content right-aligns even under an English UI, so mixed UI/content locales yield mismatched directionality. — Readers of i18n docs otherwise assume RTL layout only appears when the admin UI itself is RTL, leading to misdiagnosed alignment bugs and RFCs that under-specify mixed-locale behaviour.
<!-- rule:72 -->
- Include concrete, actionable API specifications in `text/` RFCs — reviewers can't evaluate or implement a design from motivation alone. — Wagtail RFCs under `text/` (e.g. `text/019-api-hateoas.md`, `text/097-alt-text-capabilities.md`) are the design contract reviewers approve and implementers follow. A conceptual 'why this pattern is interesting' section alone gives no behavior to build against, and a `Documentation efforts` section that only lists release/upgrade notes hides the reference docs, user guides, and tutorials the feature needs — both gaps surface late as rework.
  Enumerate all required docs (reference, user guides, tutorials) in the `Documentation efforts` section, not just release/upgrade notes — otherwise implementation under-scopes the doc work.
<!-- rule:225 -->
- Sort improvement tables in `text/090-sustainability-roadmap.md` by `Impact`, then `Reach`, descending — keeps priority order scannable and consistent across the roadmap docs. — Rating columns (Impact, Reach, Complexity) lose meaning if rows are unsorted; Impact-then-Reach high-to-low matches how the roadmap is reviewed, so readers see the highest-priority items first without re-sorting each table.
<!-- rule:10 -->
- In `text/*roadmap-updates.md`, list time-boxed efforts like triage as scheduled events tied to a release (e.g. 'Triage week'), label them 'needs contributions', and add live discussions when design decisions are required. — Framing recurring work as fixed-schedule items tied to a release gives contributors a deadline and scope to rally around, and 'needs contributions' signals where help is actually wanted — treating it as open-ended routine work hides both.
<!-- rule:171 -->
- Add a validation section to RFC/roadmap docs in `text/` — map foundational work to downstream features and prior-art demos — `text/xxx-streamfield-roadmap.md`-style RFCs are what commits teams to foundational work; without explicit downstream mappings the foundation risks being speculative or insufficient, and demos/prototypes as prior art prevent re-litigating solved problems.
<!-- rule:192 -->
- In `text/*.md` RFCs, add a `Security Considerations` section whenever the design handles user-uploaded files — cover sanitization/allowlisting, XSS, server-side file access, and DoS. — The RFC is the last review gate before a new file parser ships; without an explicit section these four threat classes (esp. XSS via SVG-style formats and server-side read via crafted uploads) tend to slip through to code review undetected.
<!-- rule:113 -->
- In accessibility RFCs/docs for authoring tools or CMSes, cite `ATAG` alongside `WCAG` and state the target conformance level (e.g. ``WCAG 2.1 AA` + `ATAG 2.0 AA``) — authoring UIs need `ATAG` guidance, which `WCAG` alone doesn't cover — `WCAG` addresses end-user content, not the authoring interface itself; omitting `ATAG` (or a stated target level) leaves tool-side accessibility requirements undefined and forces reviewers to guess the intended conformance bar. Placing this in `text/AGENTS.md` keeps it scoped to RFCs authored in that directory rather than repository-wide code rules.
<!-- rule:127 -->
- Document sub-teams in governance RFCs as delegated by the parent body with a participating member from it, goals free from the `core team` roadmap but never contradicting Wagtail's, and formation coordinated in team meetings — vague delegation invites authority disputes and roadmap conflicts. — An RFC that omits the delegation chain, the required parent-body member, or the meeting-based formation process leaves authority and membership ambiguous, letting sub-team goals silently diverge from Wagtail's direction.
<!-- rule:207 -->
- Framework-adoption RFCs in `text/` (e.g., `text/078-adopt-stimulus-js.md`) must document scope, non-goals, compatibility with complementary libraries, external reuse/importability, and a 'Why not X' trade-off section covering learning burden, auxiliary tooling, and retained existing-stack knowledge — reviewers need the total adoption cost, not just the pitch, before committing. — 
<!-- rule:42 -->
- Rule text: In roadmap/RFC documentation, order and name grouped feature sections so the most community-requested or strategically related planned feature is represented first, and adjust item priority when it is tied to upcoming work. — Category: documentation
Scope: project roadmap/RFC documentation

Placement rationale: The rule governs documentation conventions for roadmap/RFC files that live under the `text/` directory (e.g., `text/106-roadmap-updates.md`, `text/078-adopt-stimulus-js.md`). It applies across multiple documents within that single directory, not to one specific file or to unrelated file relationships, so a directory-scoped `text/AGENTS.md` is the most findable and appropriately broad location for an AI assistant editing roadmap/RFC docs.

Example of bad code: None
Example of good code: None
<!-- rule:19 -->
- For permission RFCs in `text/` (e.g., `text/102-permissions-registry.md`), spell out Django integration: list models existing only for permissions (e.g., `Admin`) and their removal/migration; describe user/group permission assignment and DB-backed permission objects; and for any custom permission mechanism, document interop with Django auth (`AUTHENTICATION_BACKENDS`, object-level `has_perm`, Django admin) plus scope and tradeoffs of bypassing it. — Reviewers can't evaluate permission designs without knowing how they coexist with Django's auth stack — omitting it hides migration risk for `Admin`-like models and breaks assumptions users hold about `has_perm` and the admin.

## General

<!-- rule:43 -->
- List CSP work in `text/` roadmap docs as a security + performance win — Roadmap docs in `text/` (e.g. `text/106-roadmap-updates.md`, `text/090-sustainability-roadmap.md`) shape what gets prioritized next. Naming CSP as security *and* performance keeps it from being deferred. The admin helper icon and userbar break first under CSP, so fixing them unblocks the admin UI without auditing against a baseline that's still shifting. Nonces keep browser caching effective and reject scripts you didn't explicitly allow, unlike static hashes or allowlists.
  Clear admin helper icon/userbar CSP blockers before broader CSP audits
  Prefer nonce-based CSP over hash/allowlist approaches
<!-- rule:145 -->
- In `text/` workflow docs and APIs, name ordered status-transition units `Step` or `Stage`, not `Task`; use `step task` and `task state` consistently, and reserve `review` for review-type tasks only — prevents readers and API consumers from confusing the workflow's own sequencing concepts with generic task/review terms — Distinct terms for workflow sequencing (`Step`/`Stage`) vs. work items (`step task`/`task state`) vs. review-type work (`review`) keep `text/045-workflow.md` and related APIs unambiguous; overloading `Task` or `review` causes readers and API consumers to misread which concept a field or section refers to.

## File-Specific Rules

### `text/010-search-query-classes.md`

<!-- rule:7 -->
- Describe query modifiers by how they transform child queries/terms, not just score impact — e.g., `Boost` in `text/010-search-query-classes.md` should read "Overrides children queries to set the boost of the terms to a constant value." — Readers implementing or composing modifiers need to know the child-query/term semantics (not just the score delta) to predict interactions and nesting behavior; terse score-only docs in RFCs like `text/010-search-query-classes.md` leave that behavior unspecified.

### `text/095-concurrent-editing-notifications.md`

<!-- rule:235 -->
- Set the RFC 95 edit-view polling/ping interval to 10 seconds — caps the undetected-conflict window while keeping conflict-detection latency vs. request load balanced. — Rationale text for the rule.

<!-- /braindump -->