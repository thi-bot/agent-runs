# Wagtail.org accessibility audit — 16 October 2026

This is the publication subset of a WCAG 2.2 AA audit of
[wagtail.org](https://wagtail.org/), its local source code, and the
[Wagtail Product Strategy 2026 PDF](https://media.wagtail.org/documents/Wagtail_Product_Strategy_2026_v1.0.pdf).
The user requested a full-site crawl, source review, the PDF audit, and
severity-ordered reports with remediation details.

## Reports

- [Combined accessibility audit](WEB-ACCESSIBILITY-AUDIT.md): 19 grouped
  findings — 9 serious, 9 moderate, 1 minor. Seventeen are confirmed WCAG
  findings; two are separate PDF/UA technical observations.
- [Product strategy PDF audit](DOCUMENT-ACCESSIBILITY-AUDIT.md): one confirmed
  WCAG finding involving the untagged version/date, plus list-structure and
  language-tag technical findings.
- [Reviewed automated-scan report](ACCESSIBILITY-SCAN.md): 11 grouped findings
  from axe scans, including additional opened-dialog and settled-widget checks.
- [Findings CSV](ACCESSIBILITY-FINDINGS.csv): the 19 combined findings with
  locations, evidence and remediation guidance.
- [Screenshot guide](SCREENSHOTS.md): direct links to the 20 published images.

The reports' scores and severity thresholds are tool heuristics, not WCAG
conformance percentages. Their different scopes and passed-check counts make
their scores unsuitable for direct comparison. No application code or PDFs
were modified during this audit.

## Scope and method

The crawl discovered 755 URLs and completed 735 same-site rendered URL checks:
710 successful requests covering 708 distinct HTML destinations, plus 25
HTTP-404 requests covering 14 distinct error-page destinations. Pagination and
linked filters were included. External redirect destinations were inventoried
and excluded from the site's finding totals.

Source review used the Wagtail/Django checkout at
[`9fa65385f27c15b83c86a4f6e0e3ac18d4784609`](https://github.com/wagtail/wagtail.org/commit/9fa65385f27c15b83c86a4f6e0e3ac18d4784609).
Runtime checks used axe-core 4.14.0, Playwright 1.64.1 and Chromium
152.0.7977.82, with Accessibility Agents 7.0.3 specialists coordinated by
Codex. The initial crawl used a 1440 × 1000 viewport and reduced motion.
Representative keyboard, mobile, theme, reflow and dynamic-state checks
supplemented the crawl. All 11 PDF pages were reviewed structurally and visually.

Full-site scanning does not mean every page, viewport, image, media alternative
or interaction received an exhaustive manual review. Native screen-reader
testing, homepage video audio review, third-party subscription completion and
veraPDF validation remain outstanding. Other linked PDFs were not included.
Source-only recommendations and raw automated warnings are distinguished from
confirmed deployed failures in the reports.

## Included evidence

- [Page coverage](evidence/page-coverage.csv): 735 same-site URL scan records.
- [Raw axe instances](evidence/axe-instances.csv): original rule results,
  measurements and selectors. These include warnings excluded after review
  and retain the scanner's original severity labels.
- [Checks needing review](evidence/axe-needs-review.csv): incomplete automated
  results, which are neither confirmed failures nor passes.
- [Screenshot index](evidence/screenshot-index.csv): the 20 images included here.

The screenshots total about 1.21 MB, reduced from 2.24 MB. Every image is under
100 KB. Filenames were preserved; some PNGs use a reduced palette and the two
long JPEGs were resized. Audit measurements were taken before this publication
optimization. The reports refer to PDF pages 1 and 11 individually, so only
those two PDF renders are included, although all 11 pages were reviewed.

The original audit captured 222 screenshots. The other 202 screenshots, bulk
crawled HTML, raw per-page JSON, specialist working files, source PDF and local
tooling remain in the original `wagtail.org` workspace and are not included in
this publication subset. In the evidence tables, screenshot cells are blank
when the file is omitted; `screenshot_publication` explains that omission.

The reports retain their embedded findings JSON and historical evidence paths
for provenance. Paths such as `.a11y-history/2026-10-16/` and `wagtailio/` refer
to the original audit workspace or source checkout, not files archived here.
The readable report links point to the included files. An absent artifact in
this subset does not indicate that its check was not performed.

The downloaded PDF snapshot had SHA-256:

```text
fac3a3d67c7faa858b8250b7804a7c059f53557e0b46cb83a133f5633919e3c1
```

## Follow-up

Prioritize mobile navigation and obscured focus, accessible names for dialogs
and schedule controls, newsletter language, and code contrast. Address the
content findings and PDF tagging, then rerun affected checks after deployment.
Complete the remaining assistive-technology and media checks before making a
conformance claim. These findings describe the site on the audit date.
