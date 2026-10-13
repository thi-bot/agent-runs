# Documentation Style and Grammar

> Prose grammar, comma/colon use, modal verbs, uncountable nouns, scoped contribution templates, review timelines, user-facing message completeness, commit conventions, and style-guide discoverability.

**When to check**: When writing or reviewing documentation, contributor guidance, user-facing text, or commit messages.

## Rules

<!-- rule:1342 -->
- No comma before `because`/`since`/`as`/`so that` — commas separate independent clauses only; a comma there wrongly splits a dependent clause from its main clause, a prose error that recurs across code comments, user-facing messages, and docs — Enforcing it prevents the inconsistent comma usage that would otherwise split dependent clauses from their main clauses across code comments, user-facing messages, and documentation, keeping the codebase's prose uniform and unambiguous.
<!-- rule:3053 -->
- In `docs/internals/contributing/` and `.github/workflows/` messages, state that review may take weeks/months, reassure contributors their work will still be reviewed, and link the existing FAQ instead of duplicating the reminder policy — sets honest expectations and avoids doc drift. — Contributors who expect fast feedback may abandon the project when reviews are delayed by the release cadence; duplicating the reminder policy across docs also creates divergence that misleads contributors as the policy evolves.
<!-- rule:804 -->
- Record adopted conventions and recurring review rules in the contributing style guide; cite that section in review feedback — undocumented conventions can't be enforced consistently. — Keeps style decisions discoverable and enforceable: reviewers can point to the guide instead of relitigating, automation handles what humans shouldn't, and removing rules that clash with current practice keeps the guide trustworthy rather than aspirational.
  - Add linting/checks for automatable conventions and drop proposed rules that conflict with existing project practice — contradictory rules get ignored and erode the guide's authority.
<!-- rule:5563 -->
- Place a comma after introductory adverbial phrases in prose — e.g. "By default, this is the value of `:setting:`DEFAULT_AUTO_FIELD``" — keeps `docs/`, docstrings, and Sphinx sources consistent and unambiguous to parse. — Without the comma ("By default this…"), readers can misparse the adverb as modifying the noun, and prose drifts out of sync with the punctuation style already used throughout `docs/`.
<!-- rule:1913 -->
- Treat `middleware` as a mass noun — write `new middleware`, never `a new middleware` or `middlewares`. — Matches the established terminology used throughout `docs/` and `django/`; inconsistent pluralization or article usage reads as a typo and obscures whether new middleware components are being added.
<!-- rule:2044 -->
- In docs and `.github/` templates, scope exceptions/exemptions to the exact policy they cover — broad wording silently exempts what's still enforced. — Over-broad wording mischaracterizes items beyond what is actually enforced, letting contributors rely on exemptions the project does not grant.
<!-- rule:4368 -->
- Make user-facing messages complete and actionable: list all valid statuses/stages and the concrete steps to reach the target state — partial conditions or non-actionable outcomes leave users unable to act (see `scripts/pr_quality/errors.py`, `check_pr.py`, `docs/faq/contributing.txt`) — Applies wherever user-visible text is authored (FAQ entries, PR quality errors, job summaries). Partial state listings or vague outcomes force users to guess next steps, causing support churn and repeated failures.
<!-- rule:2494 -->
- Submit PR updates as a single squashed commit titled consistently with the PR — keeps history clean and revertable — Appending follow-up commits clutters the branch history and makes reverting or bisecting the change harder; a single squashed commit titled like the PR keeps the merge clean and self-describing.
<!-- rule:2046 -->
- Use a colon to introduce lists, code blocks, or explanatory clauses after an independent clause; end ordinary prose sentences with a period. Preserve the introducing colon when rewording the lead-in. — A colon signals that what follows depends on the lead-in; swapping it for a period orphans the list or block and breaks the sentence, while a trailing colon on plain prose leaves the sentence dangling.
<!-- rule:2969 -->
- Use `cannot`, not `can not`, in user-facing strings, errors, comments, and docs — the two-word form is nonstandard and reads as sloppy; pick `will not` for deliberate policy (e.g. declining to mitigate user-introduced vulnerabilities) and `may not` for mere possibility. — Repo-wide wording convention: matching `cannot` across `django/db/models/base.py`, `django/utils/autoreload.py`, `docs/internals/security.txt`, and tests keeps messages error-free and consistent for users.
<!-- rule:2047 -->
- Prefix commit summaries with `Fixed #<ticket> -- <summary>` to resolve an issue or `Refs #<ticket> -- <summary>` for coverage-only, keeping the canonical ` -- ` separator — the tracker keys off these prefixes, so a wrong verb (or a missing one) auto-closes tickets that aren't actually fixed or drops the commit from the ticket's history. — The project's issue tracker parses commit prefixes rather than reading intent: `Fixed #N` closes ticket `N`, while `Refs #N` only links to it. Using `Fixed` for a coverage-only commit prematurely closes a ticket that still has work outstanding, and omitting the prefix entirely means the commit silently disappears from the ticket's audit trail. The ` -- ` separator and exact verb casing are part of the documented format the tracker matches on, so deviations break that linkage for every change in the repo — source, tests, docs, and `.github` alike.
