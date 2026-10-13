# Documentation Voice and Terminology

> Active voice, normative language, definitive phrasing, troubleshooting clarity, and consistent terminology in documentation.

**When to check**: When choosing wording, voice, or terminology for documentation prose.

## Rules

<!-- rule:1244 -->
- Reserve `must`/`required`/`mandatory` in docs for behavior that breaks things if omitted; use `should`/`recommended`/`support`/`encourage` for optional patterns — overstating requirements misleads users into unnecessary work and erodes trust in the rest of the docs. — Accurate normative language lets readers distinguish what will actually break from what is merely a good idea.
<!-- rule:2118 -->
- In `docs/`, enumerate each differing case as its own sentence or bullet when behavior, usage, workflows, or inputs vary by context — comma-chained prose hides which case applies to the reader — Readers must map documentation onto their specific context (driver, backend, version, flags); collapsing variants into one vague sentence makes them apply the wrong behavior, so scope this rule to `docs/AGENTS.md` rather than the repo root.
<!-- rule:117 -->
- Write docs in active voice with explicit subjects and direct verbs — passive or nominalized prose buries the actor and obscures behavior — Readers scan for actors and actions; active constructions like `Wagtail uses…` or `You can specify…` communicate intent faster than passive or static phrasings such as `copies are made` or `models are nestable`.
<!-- rule:124 -->
- In `docs/`, state problem → consequence → exact fix — vague "reset/change settings" phrasing and "if you get stuck" clauses leave users unable to resolve issues — Concrete troubleshooting guidance names the problem and its consequence, then the specific action or setting to fix it — vague instructions and implicit consequences force users to guess, making support docs ineffective.
<!-- rule:126 -->
- Name cross-referenced concepts explicitly in `docs/` — phrases like "this approach", "this philosophy", or "the above" break when sections move and confuse readers skimming or landing mid-page — Vague referents assume linear reading order and break when anchor targets shift during edits, so naming the concept inline (or on the same page) keeps links and prose stable regardless of reordering or search-engine entry points.
<!-- rule:2173 -->
- In prose, give exceptions and deployment caveats their own sentence; in lists, keep parallel noun phrases with parenthetical notes — mixing the two buries caveats and breaks list parallelism (`docs/advanced_topics/deploying.md`, `docs/extending/custom_bulk_actions.md`) — Prose needs full sentences to flag qualifications/exceptions clearly; attribute definitions and bullet lists rely on parallel noun-phrase fragments for scannability, so shifting a list note into standalone prose breaks the pattern and obscures the requirement.
<!-- rule:120 -->
- Use `you can` for supported capabilities and `you'll need to` for required steps; reserve `you could`/`you'll want to` for conditional scenarios (e.g. 'if you wanted to do X, you could Y') — the modal verb is the reader's only signal of mandatory vs. optional, and mixing them makes required steps look skippable — Modal verbs are the reader's only signal of mandatory vs. optional steps — mixing them makes required setup look skippable and supported features look uncertain.
<!-- rule:2715 -->
- Phrase complete-set claims in user-facing docs exhaustively — avoid `some`; write `everything you need`, not `all you need` — The user-facing documentation prose convention should live in `docs/AGENTS.md`, since evidence is concentrated in the docs directory and the rule isn't tied to a specific file, entity, or coordinated file pair. Root-level placement would be broader than the rule's scope; file-level placement would be too narrow.
  Partial qualifiers imply unlisted items exist, which undermines reader confidence that the doc set is authoritative.
<!-- rule:1329 -->
- In `docs/`, use "within tests" phrasing and sentence-case headings; organize test docs by concept, not under one tool — keeps `docs/advanced_topics/testing.md` and `docs/reference/project_template.md` consistent and findable for readers scanning by topic. — Precise phrasing like "within tests" (vs. "on tests"/"for tests") avoids ambiguity about whether content is about tests or inside them; sentence-case headings and concept-based organization match existing `docs/` conventions so readers navigate by topic instead of hunting through a single tool page.
<!-- rule:2858 -->
- Write "search engines rank" not "Google chooses to rank" in user-facing docs — Anthropomorphizing or naming one provider misleads readers, since ranking behavior varies and changes across engines. Name a provider (e.g. `Google`) only when the behavior is genuinely provider-specific; applies to SEO/editor manual pages. — Providers change ranking behavior unpredictably; tying docs to one vendor becomes stale and implies endorsement. Generic wording keeps SEO/editor manual pages accurate across engines and versions.
