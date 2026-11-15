# Agentic Web Check: nine example sites

Completed local scans with three built-in read-only baseline tasks per site. No LLM was used. The supported AWC/OpenAI/Anthropic provider environment variables were unset; unrelated credential stores were not inspected.

The [target manifest](targets.json) copies the exact entry URLs from the paired [Agent Lighthouse campaign](../../agent-lighthouse/2026-11-14T00-27-54Z/targets.json). Original sustainability sample URLs are provenance only. This campaign scans one entry page per site; task agents may navigate beyond that page and clicks/redirects can leave its origin.

## Results

| Site | Deterministic only (derived) | With baseline tasks | Pass | Fail | Blocked | Inconclusive |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| [tate](tate/baseline/report.html) | 74 | 52 | 0 | 0 | 3 | 0 |
| [nhs](nhs/baseline/report.html) | 93 | 85 | 2 | 0 | 1 | 0 |
| [google-blog](google-blog/baseline/report.html) | 87 | 70 | 1 | 2 | 0 | 0 |
| [w3c](w3c/baseline/report.html) | 88 | 91 | 3 | 0 | 0 | 0 |
| [lowtech](lowtech/baseline/report.html) | 92 | 84 | 2 | 1 | 0 | 0 |
| [fresh-guide](fresh-guide/baseline/report.html) | 97 | 88 | 2 | 1 | 0 | 0 |
| [fresh-wagtail](fresh-wagtail/baseline/report.html) | 89 | 92 | 3 | 0 | 0 | 0 |
| [docs-wagtail](docs-wagtail/baseline/report.html) | 95 | 97 | 3 | 0 | 0 | 0 |
| [draftjs-exporter](draftjs-exporter/baseline/report.html) | 85 | 80 | 2 | 1 | 0 | 0 |

The deterministic-only score is recomputed from the same captured checks using the tool's exported computeScores(checks, []). It is not a separate run. Original results.json and reports retain the tool's combined behavioural score. All numbers are this tool's methodology v1 and cannot be compared numerically with Agent Lighthouse scores.

## Reproduction and artifacts

- Checkout: /home/thibaudcolas/dev/agentic-web-check, revision 35ec1e1e61f1ca962228846d13a855eaa74f9876, package 0.1.0.
- Dependencies installed with pnpm 10.34.6 and the committed frozen lockfile; built locally with pnpm build. Install and build logs are retained.
- Each run used: node /home/thibaudcolas/dev/agentic-web-check/dist/cli.js scan URL --pages 1 --timeout 30000 --tasks default --agent baseline --out DIRECTORY --no-color --verbose.
- Two sites ran concurrently, with an outer 480-second per-site timeout. The three stock tasks each allow up to 12 steps. No form-submit or consequential-action opt-in was supplied; TLS verification stayed enabled.
- Each site/baseline directory contains results.json, report.html, summary.md, badge.svg, task screenshots, stdout.log, stderr.log, run.json and derived deterministic-score.json.
- [campaign.json](campaign.json), [runs.json](runs.json), [tasks.json](tasks.json), [summary.json](summary.json), and [summary.csv](summary.csv) retain options, timings, exact task definitions, raw report paths, and aggregate observations. The scripts run-campaign.py and summarize.mjs preserve the execution and aggregation procedure.

## Interpretation limits

These are unmodified tool outputs, not adjudicated site defects or a validated benchmark. Baseline is a deterministic name-matching agent, not an LLM or a named consumer browser agent. The generic contact, legal-policy, and help/about tasks are not tailored to these sites; their success criteria can reward particular URLs/headings rather than proving the full natural-language goal.

CAPTCHA findings require review: the tool searches page markup for strings such as recaptcha and may block tasks even when the page is otherwise readable. Tate's entry scan loaded HTTP 200 with a populated accessibility snapshot, while all tasks were stopped by this detector. NHS contact navigation reached another origin before its CAPTCHA block. Read task traces and screenshots before interpreting a BLOCKED verdict as inaccessible content.

Concrete task-validity examples: the developer-documentation contact task passed on /en/stable/tutorial/create_contact_page.html, a contact-page tutorial; the Google Blog help/about task passed on an article about saving giant kelp. These are reasons to inspect the task assertions and page evidence before treating a PASS as completion of the natural-language goal. The Wagtail help task also left the entry origin for a StreamField documentation page.

The tool records requests and state through its own checks and task-step evidence; this campaign does not add an independent browser trace or network archive. Existing read-only protections were used without bypassing bot protection.

## Task outcomes

### tate

- contact: **BLOCKED**, 0 steps. captcha: g-recaptcha, recaptcha. Final URL: https://www.tate.org.uk/.
- legal-policy: **BLOCKED**, 0 steps. captcha: g-recaptcha, recaptcha. Final URL: https://www.tate.org.uk/.
- help-or-about: **BLOCKED**, 0 steps. captcha: g-recaptcha, recaptcha. Final URL: https://www.tate.org.uk/.

### nhs

- contact: **BLOCKED**, 7 steps. captcha: g-recaptcha, recaptcha. Final URL: https://www.england.nhs.uk/contact-us/feedback-and-complaints/complaint/ (off the entry origin).
- legal-policy: **PASS**, 2 steps. success criteria satisfied after 2 actions. Final URL: https://www.nhs.uk/our-policies/terms-and-conditions/.
- help-or-about: **PASS**, 1 steps. success criteria satisfied after 1 actions. Final URL: https://www.nhs.uk/about-us/.

### google-blog

- contact: **FAIL**, 3 steps. no control matched keywords [contact, contact us, get in touch, support, email, phone, contacto, address] on https://blog.google/. Final URL: https://blog.google/.
- legal-policy: **FAIL**, 3 steps. page state unchanged after three actions (controls had no visible effect or opened new tabs). Final URL: https://blog.google/.
- help-or-about: **PASS**, 6 steps. success criteria satisfied after 6 actions. Final URL: https://blog.google/company-news/outreach-and-initiatives/sustainability/saving-giant-kelp-australia/.

### w3c

- contact: **PASS**, 1 steps. success criteria satisfied after 1 actions. Final URL: https://www.w3.org/contact/.
- legal-policy: **PASS**, 1 steps. success criteria satisfied after 1 actions. Final URL: https://www.w3.org/mission/privacy/.
- help-or-about: **PASS**, 2 steps. success criteria satisfied after 2 actions. Final URL: https://www.w3.org/about/.

### lowtech

- contact: **FAIL**, 1 steps. no control matched keywords [contact, contact us, get in touch, support, email, phone, contacto, address] on https://solar.lowtechmagazine.com/. Final URL: https://solar.lowtechmagazine.com/.
- legal-policy: **PASS**, 1 steps. success criteria satisfied after 1 actions. Final URL: https://solar.lowtechmagazine.com/privacy/.
- help-or-about: **PASS**, 1 steps. success criteria satisfied after 1 actions. Final URL: https://solar.lowtechmagazine.com/about/.

### fresh-guide

- contact: **FAIL**, 1 steps. no control matched keywords [contact, contact us, get in touch, support, email, phone, contacto, address] on https://guide.wagtail.org/en/. Final URL: https://guide.wagtail.org/en/.
- legal-policy: **PASS**, 1 steps. success criteria satisfied after 1 actions. Final URL: https://guide.wagtail.org/en/about/privacy-policy/.
- help-or-about: **PASS**, 1 steps. success criteria satisfied after 1 actions. Final URL: https://guide.wagtail.org/en/about/.

### fresh-wagtail

- contact: **PASS**, 1 steps. success criteria satisfied after 1 actions. Final URL: https://wagtail.org/contact/.
- legal-policy: **PASS**, 1 steps. success criteria satisfied after 1 actions. Final URL: https://wagtail.org/privacy/.
- help-or-about: **PASS**, 1 steps. success criteria satisfied after 1 actions. Final URL: https://docs.wagtail.org/en/stable/topics/streamfield.html (off the entry origin).

### docs-wagtail

- contact: **PASS**, 1 steps. success criteria satisfied after 1 actions. Final URL: https://docs.wagtail.org/en/stable/tutorial/create_contact_page.html.
- legal-policy: **PASS**, 2 steps. success criteria satisfied after 2 actions. Final URL: https://wagtail.org/privacy/ (off the entry origin).
- help-or-about: **PASS**, 1 steps. success criteria satisfied after 1 actions. Final URL: https://wagtail.org/about-wagtail/ (off the entry origin).

### draftjs-exporter

- contact: **PASS**, 1 steps. success criteria satisfied after 1 actions. Final URL: https://wagtail.github.io/draftjs_exporter/SUPPORT/.
- legal-policy: **FAIL**, 5 steps. no control matched keywords [privacy, privacy policy, terms, legal, privacidade, policy, policies, conditions] on https://wagtail.github.io/draftjs_exporter/SECURITY/#security-policy. Final URL: https://wagtail.github.io/draftjs_exporter/SECURITY/#security-policy.
- help-or-about: **PASS**, 2 steps. success criteria satisfied after 2 actions. Final URL: https://wagtail.github.io/draftjs_exporter/SUPPORT/.
