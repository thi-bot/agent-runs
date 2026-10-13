<!-- braindump: rules extracted from PR review patterns -->

# docs/contributing/ Guidelines

## Documentation

<!-- rule:1193 -->
- Present one supported setup path in `docs/contributing/` setup guides — enumerating manual or alternative invocation methods leaves contributors unsure which path the project actually backs — Two bullets kept because the rule has two distinct obligations: the default (single recommended path) and the exception handling (justified alternatives). Project-specific reference to `docs/contributing/` preserved. Code identifiers backticked. Rationale attached to each bullet rather than stated as a rule.
  - If an alternative must be documented in `docs/contributing/` (fork-based install, incomplete platform support), explain its motivation and when to use it before the steps, and point back to the supported path — so contributors don't default to an unsupported setup
<!-- rule:2737 -->
- In `docs/contributing/developing.rst`/`.md`, list prerequisites before build/install steps, call out easily-missed ones (e.g. OS packages, tool versions) up front, and give exact commands with the working directory — readers skip setup docs and hit failures they can't diagnose. — Ordering and exact commands (cwd included) let developers copy-paste successfully; surfacing easily-overlooked prerequisites prevents silent 'works on my machine' setup failures.
<!-- rule:1194 -->
- In `docs/contributing`, write `pre-commit` lowercase and describe commands directly instead of "manually" — inconsistent tool naming makes contributors unsure which tool actually runs. — Category: documentation. Scope: docs. Trimming to a single bullet keeps the rule scannable while preserving the `pre-commit` identifier and the `docs/contributing` directory scope, so an assistant editing contributor guides sees the wording constraint exactly where it applies. The rationale (avoiding tool-name ambiguity) explains the why without appealing to authority, and the `pre-commit` reference is the highest-value token to keep for searchability across the repo.
<!-- rule:2346 -->
- In `docs/contributing/developing.rst`/`.md`, tell contributors to use a Node version manager (`nvm`, `fnm`) that reads `.nvmrc` — keeps `.nvmrc` the single source of truth so docs never drift from the actual Node version — Hardcoding version numbers or repeating activation commands duplicates state that `.nvmrc` already owns; docs then go stale and contributors hit version mismatches. Placing workflow-specific Node commands (e.g., for asset compilation) in their workflow section rather than general setup keeps the setup steps short and lets readers find commands where they'll actually run them.
<!-- rule:3068 -->
- In `docs/contributing/*/onboarding.md` translator docs, spell out the Transifex cycle concretely: translations are exported during the Release Candidate window (~2 weeks) and announced in `#translators`, then imported back for later RCs and the final release — vague wording leaves translators unsure when their work ships. — Translators need to know the concrete release-cycle timing (RC window, `#translators` announcement, import-back for RCs and final release) to understand when their translations actually land; the Transifex workflow is non-obvious and onboarding docs are the only place this is documented.

## File-Specific Rules

### `docs/contributing/committing.rst`

<!-- rule:2522 -->
- In `docs/contributing/committing.rst`, replace vague cleanup shorthand like 'least ugly' with explicit acceptable options (e.g., squash to a single commit or leave unsquashed) and a selection criterion (e.g., readability of commit history) rather than a single mandated outcome — vague phrasing leaves contributors guessing what's required, while overly prescriptive outcomes don't fit every change. — Ambiguous terms like 'least ugly' obscure the actual requirement; offering explicit alternatives plus a criterion lets contributors choose appropriately for their change.

### `docs/contributing/developing.(rst|md)`

<!-- rule:2097 -->
- `docs/contributing/developing.{rst,md}` support tables: list explicit browser versions (incl. ESR/LTS), never blank cells, dangling colons, or "Latest" — Concrete versions tell contributors exactly what to test against and stay stable for the next release; vague entries rot and mislead.

### `docs/contributing/developing.md`

<!-- rule:3002 -->
- In `docs/contributing/developing.md`, order setup options by project preference (recommended Docker/VM setup first) and include cloud/browser-based IDE options like Gitpod — readers follow the first option they see, and contributors without local environments need a supported path. — Ordering by preference steers contributors toward the maintained/supported workflow, and listing browser-based IDEs (Gitpod) alongside local VM/container options keeps onboarding possible for contributors who can't run Docker or a local VM.

### `docs/contributing/documentation_guidelines.md`

<!-- rule:795 -->
- In `docs/contributing/documentation_guidelines.md`, order sections broad→concrete, write full sentences with explicit subjects, skip intensifiers like `strict`/`always`, and use indefinite phrasing (e.g., "Here are guidelines...") for non-exhaustive lists — scannable, precise guidance that doesn't read as rigid or overpromise coverage — Broad-to-concrete ordering matches how readers scan; complete sentences with explicit subjects avoid ambiguous imperatives; intensifiers and definite phrasing imply enforcement the doc can't back up

### `docs/contributing/issue_tracking.md`

<!-- rule:2262 -->
- In `docs/contributing/issue_tracking.md`, define 'stalled' as no contributor response to questions/feedback over >2 release cycles, explicitly excluding PRs maintainers haven't reviewed yet — vague definitions let contributors feel unfairly closed out — The rule defines the 'stalled' term precisely so it can't be applied inconsistently, and specifies the closure documentation practice so work isn't lost when PRs are abandoned.
  - When documenting stalled PR closure, require a comment on the originating issue with closure context and what was needed to finish; if none exists, create a new issue summarizing the bug/enhancement — keeps the work discoverable after the PR is gone

### `docs/contributing/security.md`

<!-- rule:1699 -->
- In `docs/contributing/security.md`, link public notices and disclosure steps to the canonical GitHub security advisory rather than blog posts or duplicated advisory text — a single source of truth keeps reporters from landing on stale or divergent instructions. — Two imperatives, each with the why: authority (single canonical source) and consistency (contact + key must match). Both reference the specific file `docs/contributing/security.md` and the concrete identifiers (GitHub security advisory, PGP public key, contact email/domain) so an agent knows exactly what to touch.
  In the same section, keep the security contact email/domain and its PGP public key synchronized — mismatched addresses or keys silently break encrypted vulnerability reports.
<!-- rule:2180 -->
- In `docs/contributing/security.md`, file dismissed reports under `## Frequently-reported issues` as `###` subsections named after the specific report. — Consistent, self-service answers to repeated non-issues reduce triage load and keep security docs from duplicating configuration guidance.
  Each entry should:
  - Lead with the actionable conclusion (what not to report and why) — reporters skim for a decisive answer.
  - Explain why it isn't exploitable, citing the relevant default protections.
  - Disqualify common PoCs (an `alert()` box, sandboxed script execution) as non-attacks — otherwise the same reports keep coming back.
  - Link out to existing security/configuration docs for serving-mechanism tradeoffs rather than re-explaining them — avoids drift between docs.

### `docs/contributing/translations.md`

<!-- rule:1179 -->
- In `docs/contributing/translations.md`, lead with task-oriented intro (load/import `i18n`; `translate`/`blocktranslate` tags; `_()` for literals), not placeholder-definition lists — readers scan for "how do I", not a glossary — Task-first framing gets translators to working code faster; showing each syntactic position (standalone tag, block tag, filter argument, tag-argument filter) prevents gaps where users guess wrong syntax

<!-- /braindump -->