<!-- braindump: rules extracted from PR review patterns -->

# docs/internals/ Guidelines

## Documentation

<!-- rule:1579 -->
- Write `docs/internals/contributing/*` docs concretely: name the specific process a convention applies to, keep workflow content in its workflow section, and link only the next actionable step — vague or misplaced process references mislead contributors about how current stages actually work. — Process documentation that omits the current process, the workflow section it belongs to, or the still-used mechanisms it describes makes contributors follow vague or outdated steps and misapply conventions to the wrong process. That confusion wastes review cycles and lets workflow documentation rot until it no longer matches the codebase.
<!-- rule:3573 -->
- Split each policy condition, its term definitions, and examples into separate sentences — A run-on clause blending condition, definitions, and examples can't be parsed or audited clause-by-clause; readers can't tell which part is the rule and which is an illustration.
<!-- rule:2504 -->
- Write `docs/internals/` release-process docs branch-agnostically — the same text ships on every branch, so: order `main`-editing steps before stable-branch steps (they run first and get backported), never call `main` a pre-release, skip scenarios that can't occur (e.g. security releases for pre-release branches), and note freezes don't pause `main`'s `A.B+1` work — Branch-specific wording, tangled step order, conflating `main` with published pre-releases, or documenting impossible cases makes releasers on other branches misread the process.
<!-- rule:5869 -->
- In `docs/internals/organization.txt` governance docs, use plain terms (`Privileges`, not `Prerogatives`) and best-effort phrasing (`should endeavour to`, not bare `should`) — volunteer role descriptions read as entitlements, so accessible wording avoids implying obligations volunteers can't meet. — Governance docs describe what volunteers are entitled to; jargon and hard 'should' phrasing imply firm obligations that volunteer role holders can't be held to.

## File-Specific Rules

### `docs/internals/howto-release-django.txt`

<!-- rule:2496 -->
- List `|django-announce|`, `|django-developers|`, `|django-users|`, and the Django Forum in both the prerequisites and announcement steps of `docs/internals/howto-release-django.txt` — prevents release managers from missing a channel and keeping the two sections out of sync. — Release managers follow this document to know which channels they need access to and which to announce on; if the prerequisites and announcement step list different channels, releases reach a narrower audience than intended and the how-to becomes self-contradictory.
<!-- rule:2498 -->
- In `docs/internals/howto-release-django.txt` Prerequisites, enumerate every external account and its required permission level — Releasers otherwise discover missing GPG public key on GitHub, Read the Docs maintainer access, or elevated PyPI rights (e.g. yanking) partway through a release
<!-- rule:3487 -->
- In `docs/internals/howto-release-django.txt`, when instructing maintainers to create objects for one service via another's admin, name both the target service and the admin/database environment — e.g., 'a `DocumentRelease` for `docs.djangoproject.com` in the `djangoproject.com` admin/database'. This prevents maintainers from confusing which admin to log into or using a public site URL where admin access is actually required. — Release docs describe cross-service operations (e.g., docs objects managed via the `djangoproject.com` admin), so omitting the target service or admin environment — or pointing at a public URL instead of the admin URL — sends maintainers to the wrong place and can cause objects to be created in the wrong database.

### `docs/internals/organization.txt`

<!-- rule:6191 -->
- Describe reserved authority in `docs/internals/organization.txt` with general positive principles, splitting non-binding triage (anyone may mark items `wontfix`) from binding decisions (a core member's `wontfix` reverses only after mailing-list discussion) — enumerating narrow prohibitions invites over-literal readings that miss unlisted cases, so reserve examples for brief illustrations of the principle. — General principles cover unanticipated cases; explicit triage/binding split prevents contributors from assuming their `wontfix` is final or that a core decision can be overridden unilaterally.
<!-- rule:6193 -->
- Keep `docs/internals/organization.txt` as the canonical source for committer vs non-committer rights — Contributors and new team members rely on this file to know which activities (representing the team, formal voting, electing members) need no committer status, how a non-committer claims a patch and gets it merged by a committer after a few days absent objections, and that consistent good judgement in claiming responsibility earns committer rights — undocumented, these distinctions get re-litigated per patch.

### `docs/internals/release-process.txt`

<!-- rule:2505 -->
- Use precise release terminology in `docs/internals/release-process.txt`: "patches" (not "commits") for release-branch changes, "patch releases" with cadence for stable-branch maintenance, and RST inline literal (``main``) for the branch name. — Ambiguous terms like "commits" obscure what actually ships to users, so release docs must name the artifacts and timing explicitly.

### `docs/internals/security.txt`

<!-- rule:2975 -->
- Qualify any "this project only" scope in `docs/internals/security.txt` and redirect each out-of-scope case — Unqualified "this project only" wording funnels third-party dependency bugs, language stdlib issues, local-dev-only exploits, large-but-reasonable config/hardening gripes, and known false-positives into the wrong tracker. Naming maintained sibling packages, redirecting each excluded case to its upstream/public tracker, and acknowledging indirect vulnerabilities (where this project's behavior makes dependents vulnerable) keeps reports actionable and triage cheap.
<!-- rule:2977 -->
- Explain preconditions and admonitions clearly in `docs/internals/security.txt` — Triage is volunteer time; vague 'before reporting…' phrasing hides expectations and adds churn.
<!-- rule:3575 -->
- In `docs/internals/security.txt`, scope vulnerabilities by whether an external actor can exploit them against a production deployment — framing out-of-scope examples as lacking such a vector, with a caveat that a demonstrated vector still counts. — Without an attacker-focused scope criterion and safe framing of out-of-scope examples, the security policy is ambiguous and readers can treat those examples as absolute exclusions. A demonstrated external attack vector against a production deployment can then be dismissed instead of triaged as a vulnerability, leaving the policy inconsistent with its own scope definition.
<!-- rule:2967 -->
- In `docs/internals/security.txt`, state that AI-generated insecure code transfers no responsibility to the security team and requires no action from them — sets clear ownership and prevents misplaced escalations. — It prevents the security team from being implicitly tasked with reviewing AI-generated vulnerabilities and removes ambiguity about who owns remediation.
<!-- rule:3686 -->
- In `docs/internals/security.txt`, judge PoC validity by whether the scenario can occur in a production Django app via documented public APIs; name the specific reason when marking an example as not a valid security report. — Without precise validity criteria based on production-grade scenarios and documented public APIs, Django's security reporting guidelines receive reports that cannot plausibly occur, wasting maintainer time and leaving reporters unsure why an example is invalid. Explaining the specific reason an invalid example fails makes the underlying security principle clear and keeps future reports consistent with docs/internals/security.txt.

<!-- /braindump -->