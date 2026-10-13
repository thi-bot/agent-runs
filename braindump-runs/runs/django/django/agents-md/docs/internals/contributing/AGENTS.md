<!-- braindump: rules extracted from PR review patterns -->

# docs/internals/contributing/ Guidelines

## Documentation

<!-- rule:3276 -->
- Write contributor style guides (`docs/internals/contributing/writing-documentation.txt`) as concrete, project-specific affirmative conventions in plain language — generic advice, abstract labels, subjective phrases, and architectural superlatives give contributors nothing actionable. — Abstract or obvious guidance gets skipped; concrete conventions matching the project's actual prose help contributors apply the style.
<!-- rule:1184 -->
- In `docs/internals/contributing/writing-code/accessibility.txt` and `writing-documentation.txt`, state WCAG AA conformance as a definitive requirement, not an aim — aspirational framing lets contributors treat accessibility as optional. — Accessibility documentation under `docs/internals/contributing/` must be binding and verifiable: framing AA as a goal rather than a requirement invites non-compliance, unlinked conformance terms leave contributors guessing at authority, and unstaged contrast guidance goes stale. Scoping the rule to `writing-code/accessibility.txt` and `writing-documentation.txt` keeps these two files aligned on the same AA target and W3C references.
  - Link conformance terms (`AA-level guidelines`, `AAA-level guidelines`, WCAG 3.0) to W3C sources (WCAG 2.2 Quick Reference, WCAG 3.0 draft) and tie contrast and time-sensitive operations (e.g., session timeouts) to specific WCAG success criteria — readers need authoritative references and traceability to apply them correctly.
  - Flag WCAG 2.x contrast limitations and recommend WCAG 3.0 for contrast — future-proofs the guidance as standards evolve.
<!-- rule:3850 -->
- Describe each triage stage/resolution status by purpose, usage frequency, limitations, and its own next step (e.g., which process/repo to route to) rather than labeling it "old" or merging statuses with different follow-up paths. Applies to `docs/internals/contributing/triaging-tickets.txt` and similar triage/contributor docs. — Contributors read these docs to decide what to do with a ticket; a status documented only as "old" or bundled with unrelated statuses gives no actionable next step, so tickets get misrouted or stalled.
<!-- rule:6145 -->
- Use unambiguous wording in voting/governance docs (`docs/internals/contributing`): `or` for alternatives, `at least N` thresholds, plural vote counts, concrete vote-casting action — prevents disputes over procedure interpretation. — Vague wording in voting and governance documentation about eligible venues, vote thresholds, vote counts, and the mechanism of voting causes contributors to misread requirements and procedures, leading to invalid votes, threshold disputes, or missed eligibility. Precise alternatives, thresholds, vote-count phrasing, and casting instructions in docs/internals/contributing prevent those errors and the repeated clarification and correction that ambiguous governance text otherwise requires.
<!-- rule:4047 -->
- Document Trac `version` semantics in `docs/internals/contributing/bugs-and-features.txt` and `triaging-tickets.txt`: reporters set the Django version (not release stage like alpha/beta); triagers record the earliest version reproducing the bug and never reset it to `dev`. — The rationale explains that `version` is used for querying bugs by version, so incorrect values (alpha/beta labels or `dev` resets) break the ability to filter or identify regressions vs. long-standing bugs. It also clarifies the differing roles of reporters and triagers.
  Rationale: the `version` field drives version-scoped bug queries in Trac, so stage labels or blanket `dev` values make triage filtering useless.
<!-- rule:3363 -->
- Instruct reviewers to fetch and apply the change locally, not just read the diff — diffs hide integration breakage. — Reviewing only the diff misses breakage that only appears when the workflow actually runs (failing tests, unbuildable docs). Pinning a single mechanism frustrates fork-based contributors whose branches aren't reachable directly.
  - Leave the mechanism open: `.patch` URLs suit fork-based PRs, pulling the branch gives full integration context — the requirement to run the change applies either way.
<!-- rule:4561 -->
- In Django contributor/triage docs (e.g., `docs/internals/contributing/sprint-quickstart.txt`), document Trac queries as reproducible recipes: list the Trac filter names/values (omit redundant filters) and link a hard-coded, pre-filtered Trac query URL using relative-time syntax (e.g., `time=5+years+ago..today`), never fixed dates, ticket-ID ranges, Python generators, or repeated age thresholds. — Auto-updating URLs with relative time keep triage guidance accurate over time; fixed dates/IDs and generated commands go stale and break reproducibility.
<!-- rule:4559 -->
- In `docs/internals/contributing/`, docs covering takeover of stale/abandoned work (e.g. the "vulture method") must remind contributors to credit original authors, linking to existing crediting docs — preserves goodwill and avoids erasing prior effort. — Contributors taking over orphaned tickets/PRs often forget that the original author's work preceded theirs; a friendly, linked reminder in the workflow docs itself is the moment they're most likely to act on it, and reusing the existing crediting documentation keeps guidance consistent rather than duplicated.
<!-- rule:4557 -->
- In `docs/internals/contributing/**` docs, never imply non-zero test failures are acceptable: state the suite passes (including in CI), frame local failures as environment/setup issues to investigate, and tell readers to record their baseline failing tests before starting work — normalizing failures hides regressions introduced by their changes — Contributor/sprint onboarding docs that treat test failures as normal lead readers to dismiss real regressions as preexisting breakage. Anchoring the docs to a passing suite, attributing local failures to environment/setup, and having contributors capture their machine's baseline failures makes it easy to distinguish new breakage caused by their changes from preexisting noise.
<!-- rule:3837 -->
- Present feature requests as ecosystem-wide evaluations, not core-inclusion decisions — The community and Steering Council assess features for the Django ecosystem as a whole; core inclusion or a third-party package are both possible later outcomes. In `docs/internals/contributing/bugs-and-features.txt`, framing the tracker as a core-inclusion pipeline misrepresents that process.
<!-- rule:4566 -->
- Order `docs/internals/contributing/` guides by the reader's decision sequence and cover baseline + exception/resumption paths, not just edge cases — readers follow guides linearly while doing the task and stall when a step they'll hit is missing or out of order. E.g., explain how to assess a ticket before listing ways to find easier ones. — Contributor/onboarding guides in `docs/internals/contributing/` are read while doing the task, so sections must match the reader's decision sequence and cover every path the audience encounters (baseline, exception, resumption) — not just edge cases, which leaves newcomers stranded mid-workflow.

## File-Specific Rules

### `docs/internals/contributing/accessibility.txt`

<!-- rule:1205 -->
- In `docs/internals/contributing/accessibility.txt`, write zoom/scroll guidance as two parts: the general problem (content that doesn't inherently need a two-dimensional layout forcing scroll in both directions) and the acceptable exceptions. Name directions as 'vertical and horizontal' instead of 'two dimensions' — abstract phrasing leaves readers unsure whether it covers zoom, layout, or scrolling, and it blurs the line between the rule and its exceptions. — Conflating the general rule with exceptions makes the accessibility requirement unenforceable, and 'two dimensions' is ambiguous in a document that discusses both zoom and layout.

### `docs/internals/contributing/localizing.txt`

<!-- rule:5747 -->
- In `docs/internals/contributing/localizing.txt`, put documentation-translation guidance in the Documentation section, not with the main Django translation guidance — the two use different resources and tooling, so mixing them sends contributors to the wrong workflow. — Documentation translators and Django translators work with separate resources and requirements; keeping them in distinct sections prevents contributors from following instructions meant for the other group.

### `docs/internals/contributing/sprint-quickstart.txt`

<!-- rule:4560 -->
- In `docs/internals/contributing/sprint-quickstart.txt`, allow claiming assigned tickets when the owner is verified inactive (no ticket/PR response for ≥6 months). Don't require tickets to be unclaimed — that contradicts the guide's vulture method. — The same guide documents the vulture method, which exists to reclaim stalled work; forbidding claims on assigned tickets would block contributors from reviving tickets whose owners have gone silent.

### `docs/internals/contributing/triaging-tickets.txt`

<!-- rule:3846 -->
- In `docs/internals/contributing/triaging-tickets.txt`, describe `Someday/Maybe` as tracking *long-term changes*, not just "high-level ideas or long-term feature requests" — vague wording makes triagers dump tickets there instead of picking a real stage. — Concrete examples (e.g. a change blocked until a Python final release) give triagers a defensible test for what belongs in `Someday/Maybe`, so tickets aren't parked there just because they lack an obvious owner or milestone.

### `docs/internals/contributing/writing-code/accessibility.txt`

<!-- rule:1110 -->
- In `docs/internals/contributing/writing-code/accessibility.txt`, make each baseline item actionable: minimal criteria (e.g. "everything works with `Tab`, arrow keys, `Space`, `Enter`"), a real-world use case (e.g. "Windows Contrast Themes" for forced-colors), a link or inline how-to stating whether the setting is OS-, browser-, or tool-level, and an explicit trigger for optional tests (touch-only navigation, 400% zoom, forced-colors) instead of "where appropriate" — vague entries get skipped, so keyboard-only, forced-colors, and zoom regressions ship untested. — Vague entries get skipped, so keyboard-only, forced-colors, and zoom regressions go untested.

### `docs/internals/contributing/writing-code/coding-style.txt`

<!-- rule:2130 -->
- In `docs/internals/contributing/writing-code/coding-style.txt` "Template style," write rules as imperative instructions naming exact delimiters (`{{ }}`, `{% %}`) and spacing (e.g. "exactly one space between `{{`, the variable, and `}}`"), listing exceptions explicitly — vague terms like "curly brackets" or "tag contents" leave readers guessing and produce inconsistent templates — The Template style section is prescriptive documentation: contributors (and AI assistants) copy its wording into real templates, so delimiter and spacing must be unambiguous. Naming `{{ }}`/`{% %}` and stating exact spacing (e.g. "exactly one space between `{{`, the variable, and `}}`") prevents off-by-a-space formatting drift, while enumerating exceptions avoids the catch-all phrasing that hides edge cases.

### `docs/internals/contributing/writing-code/submitting-patches.txt`

<!-- rule:3041 -->
- Link concrete final `DEP`s (e.g., `DEP 181: ORM Expressions`, `DEP 182`, `DEP 201`) in the DEP section of `docs/internals/contributing/writing-code/submitting-patches.txt` — gives contributors accepted proposals to model their own on — Abstract guidance alone leaves contributors guessing what a finished DEP looks like; linking real accepted DEPs (`DEP 181`, `DEP 182`, `DEP 201`) in the DEP section of `docs/internals/contributing/writing-code/submitting-patches.txt` gives them concrete, project-endorsed templates.

### `docs/internals/contributing/writing-code/unit-tests.txt`

<!-- rule:5148 -->
- In `docs/internals/contributing/writing-code/unit-tests.txt`, state that `--reverse` does not affect `--start-at`/`--start-after` — those options pick the starting point for test selection, while `--reverse` only reverses the order of the tests already selected by the preceding filtering step. — Readers assume `--reverse` flips the whole test run, so they expect it to interact with the start-point options; documenting the two stages separately (selection vs. ordering) prevents confusion when tests appear to run in an unexpected order.
<!-- rule:5960 -->
- Document both single- and multi-process/parallel coverage runs in `docs/internals/contributing/writing-code/unit-tests.txt` — readers need the accuracy-vs-speed tradeoff to pick the right mode — Documenting both modes prevents contributors from unknowingly choosing parallel coverage runs that trade accuracy for speed and thereby producing inconsistent or misleading coverage reports.

### `docs/internals/contributing/writing-documentation.txt`

<!-- rule:3911 -->
- In tooling-setup docs like `writing-documentation.txt`, list external deps (`enchant`, `aspell`) and OS-specific install steps (macOS/Homebrew vs. Linux packages) — unlisted deps leave contributors unable to run lint/spell-check locally — Documenting the exact dependency names and per-platform install commands (macOS/Homebrew vs. Linux) lets contributors get lint and spell-check tooling working without guesswork; missing or platform-generic instructions cause silent tool failures and stalled PRs.
<!-- rule:1204 -->
- In `docs/internals/contributing/writing-documentation.txt` accessibility guidance, tell contributors to store alt text in the content model itself — `ImageField` only holds the file reference, so `ImageField` examples must call out the separate alt-text field. — Django's model `ImageField` has no alt-text storage, so examples that omit a companion field teach contributors to ship inaccessible images. Anchoring alt text in the content model keeps it relatable/editable by authors and available in templates and APIs, not just in the upload form.

<!-- /braindump -->