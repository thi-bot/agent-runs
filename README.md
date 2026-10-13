# Agent Runs

Archived outputs of coding-agent runs.

Most folders here hold accessibility audit and review reports produced by the
[Accessibility Agents](https://github.com/Community-Access/accessibility-agents)
skill set, across several projects. Each top-level folder is the project that
was audited; inside it, one folder per run. Every run is complete: rendered
report, machine-readable findings, and the raw evidence the agent collected.

`braindump-runs/` is a separate collection, copied verbatim from its own
repository: coding-rule sets (`AGENTS.md` files) mined from the PR review
history of Django and Wagtail repositories with the
[braindump](https://github.com/pydantic/braindump) pipeline. Its README
documents the eleven runs and how to reproduce them.

The reports are point-in-time. The code they describe has moved on, so treat
findings as a record of what was true on the audit date, not as a live status.
Where a run was against a git checkout, the commit is noted in the run tables
below.

## The runs

### accessibility-agents

The tool's own repository. Two one-off scans, 2026-10-02, of public Wagtail
material. Source checkout at `main`, commit `decf6ba`.

- `2026-10-02-wagtail-homepage/` - Automated WCAG 2.2 AA scan of
  https://wagtail.org/ via `web-accessibility-wizard` with axe-core 4.13.0.
  Score 100/100, grade A, pass, zero findings. Includes the raw axe results
  (`ACCESSIBILITY-SCAN.json`) and a homepage screenshot.
- `2026-10-02-wagtail-product-strategy/` - `pdf-accessibility` audit of the
  Wagtail Product Strategy 2026 PDF. Score 89/100, grade B, pass, 3 moderate
  findings (BCP 47 language tag, untagged version/date line, list item
  structure). Findings JSON in the folder.

### djangoproject.com

Full web accessibility audit, 2026-10-02, source checkout at `main`, commit
`911575b3`. 13 specialist skills, 135 items in scope (templates, SCSS, JS,
forms, workflow files, plus a 100-page production crawl evidence bundle).
Score 68/100, grade D, fail: 28 findings, 18 of them blocking.

- `WEB-ACCESSIBILITY-AUDIT.md` - rendered report; `ACCESSIBILITY-SCAN.md` /
  `ACCESSIBILITY-SCAN.json` - per-page production scan summary and raw results.
- `20261002T185438Z/` - run history: specialist findings JSON, crawl manifest,
  behaviour/focus evidence, and gzipped per-page axe and HTML evidence.

### wagtail

Full web accessibility audit, 2026-10-03, source checkout at `main`, commit
`ae4a16d`. Same 13-skill setup as djangoproject.com, 202 items in scope
(including the client SCSS and JS, docs, and CI workflows). Score 85/100,
grade B, fail: 22 findings, 8 blocking.

- `WEB-ACCESSIBILITY-AUDIT.md` - rendered report; `ACCESSIBILITY-SCAN.md` -
  production scan summary. `20261003T105725Z/` - run history with raw crawled
  HTML, runtime checks, contrast/reflow/theme measurements and merged findings.

### guide

Full web accessibility audit, 2026-10-06. 13 specialist skills, 239 items in
scope, including all 149 successful public content paths across en/is/fr/pt-br/
ar locale crawls. Score 84/100, grade B, fail: 21 findings, 8 blocking.

- `WEB-ACCESSIBILITY-AUDIT.md` - rendered report; `ACCESSIBILITY-SCAN.json` /
  `ACCESSIBILITY-SCAN.md` - production scan results.
- `2026-10-06-production/` - run history: specialist findings, runtime JSON,
  crawled pages, state snapshots (modals, search, forms) and crawl evidence.
  The two largest evidence files (`raw/crawl.json`, `raw/responsive.json`,
  roughly 85MB and 100MB) are full-page measurements kept verbatim.

### a11y-llm-eval

Five smaller audits from 2026-10-06 to 2026-10-13, source checkout on branch
`harbor-migration`, commit `435e3ba`. These are reviews of that project's own
code and docs rather than scored site audits: cognitive accessibility of the
report generator, a reproducibility review of run comparison scripts, two
Python campaign reviews (first failed at 66/100, the follow-up passed), and a
markdown/PR review for fork publication. All pass except the first campaign
review.

- `harbor-migration/`, `reproducibility/`, and the four timestamped
  `*-review/` / `*-final/` folders each hold a rendered report plus findings
  JSON.

## How these were produced

All runs used the Accessibility Agents skills (the web runs the full
`web-accessibility-wizard` with its specialist skills: aria, contrast, forms,
keyboard, links, modals, tables, alt text, cognitive accessibility, testing
coaching, plus Playwright-based runtime scans), driven through
`a11y-mcp-server 7.0.3` on node v26.8.1, from agentic coding sessions on this
workstation. Automated tooling was axe-core and Playwright against WCAG 2.2
AA, with manual review passes layered on top.

Scores follow the a11y-core scoring: findings weighted by severity, capped at
100. Verdict fails whenever any critical or serious finding remains.

The wizard reports carry this caveat, which applies here too: automated
scores are not a WCAG conformance determination. The djangoproject.com,
wagtail and guide audits combined automated scans with manual specialist
review, but none of them included a full screen-reader or assistive technology
test pass. Re-run against the current code before acting on old findings.
