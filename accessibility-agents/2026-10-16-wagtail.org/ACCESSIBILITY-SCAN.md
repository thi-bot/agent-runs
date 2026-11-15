# Web Accessibility Audit

Publication copy: includes the 20 individually referenced, optimized screenshots. [Run context and scope](README.md) · [Browse screenshots](SCREENSHOTS.md). Other historical evidence paths refer to the original audit workspace and are not included in this subset.

Reviewed axe results from the full same-site crawl, plus opened-dialog and settled schedule-widget checks. See the combined audit for manual keyboard, source and PDF findings.

**11 confirmed WCAG finding.** Target: WCAG 2.2 AA. The score and severity threshold below are renderer heuristics, not a conformance claim; any confirmed WCAG failure still requires remediation.

Related reports: [WEB-ACCESSIBILITY-AUDIT.md](WEB-ACCESSIBILITY-AUDIT.md) · [DOCUMENT-ACCESSIBILITY-AUDIT.md](DOCUMENT-ACCESSIBILITY-AUDIT.md). [Findings CSV](ACCESSIBILITY-FINDINGS.csv).

[Page coverage](evidence/page-coverage.csv) · [Raw axe instances](evidence/axe-instances.csv) · [Checks needing review](evidence/axe-needs-review.csv) · [Screenshot index](evidence/screenshot-index.csv)

An audit of web content, run on 2026-10-16. Read the executive summary for the verdict, the priorities section for what to do first, and the findings tables for detail.

## Metadata

What was audited, with what, and under which settings.

| Field | Value |
|---|---|
| Date | 2026-10-16 |
| Scope | 722 items |
| Skills run | reviewed-axe-scan |
| Tooling | node v26.8.1, a11y-mcp-server 7.0.3; axe-core 4.14.0; Playwright 1.64.1; Chromium 152.0.7977.82 |
| Scan configuration | defaults, no config file found |
| Checks counted | 42 |

Audited:

- `https://wagtail.org/`
- `https://wagtail.org/about-wagtail/`
- `https://wagtail.org/accessibility/`
- `https://wagtail.org/accessibility/testing/`
- `https://wagtail.org/agencies/`
- `https://wagtail.org/ai/`
- `https://wagtail.org/ai/agent-skills-for-developers/`
- `https://wagtail.org/ai/agentic-engineering-recommendations/`
- `https://wagtail.org/ai/ai-guiding-principles/`
- `https://wagtail.org/blog/`
- `https://wagtail.org/blog/10-underrated-django-packages/`
- `https://wagtail.org/blog/10-years/`
- `https://wagtail.org/blog/20000-django-packages/`
- `https://wagtail.org/blog/2023-wagtail-deployment-survey/`
- `https://wagtail.org/blog/2024-headless-survey/`
- `https://wagtail.org/blog/2026-ai-dx-survey/`
- `https://wagtail.org/blog/40-smaller-images-same-quality/`
- `https://wagtail.org/blog/5-simple-ways-anyone-can-contribute-to-wagtail/`
- `https://wagtail.org/blog/5-terabytes-for-30-seconds-of-homepage-video/`
- `https://wagtail.org/blog/7-tips-for-applying-to-google-summer-of-code/`
- `https://wagtail.org/blog/?author=Aaron+MacGillivary`
- `https://wagtail.org/blog/?author=Ahmed+Olaitan`
- `https://wagtail.org/blog/?author=Aimee+Maroney`
- `https://wagtail.org/blog/?author=Albina+Starykova`
- `https://wagtail.org/blog/?author=Alex+Morega`
- `https://wagtail.org/blog/?author=Anuja+Raj+Verma`
- `https://wagtail.org/blog/?author=Ben+Enright`
- `https://wagtail.org/blog/?author=Bertrand+Bordage`
- `https://wagtail.org/blog/?author=Brent+Clark`
- `https://wagtail.org/blog/?author=Cameron+Lamb`
- `https://wagtail.org/blog/?author=Chiemezuo`
- `https://wagtail.org/blog/?author=Chris+Rogers`
- `https://wagtail.org/blog/?author=Chrissy+Wainwright`
- `https://wagtail.org/blog/?author=Coen+van+der+Kamp`
- `https://wagtail.org/blog/?author=Damilola+Oladele`
- `https://wagtail.org/blog/?author=Dan+Braghi%C8%99`
- `https://wagtail.org/blog/?author=Doug+Harris`
- `https://wagtail.org/blog/?author=Glenn+Barr`
- `https://wagtail.org/blog/?author=Helen+Chapman`
- `https://wagtail.org/blog/?author=Hitansh+Shah`
- `https://wagtail.org/blog/?author=Ian+Bellchambers`
- `https://wagtail.org/blog/?author=Jake+Howard`
- `https://wagtail.org/blog/?author=Jane+Hughes`
- `https://wagtail.org/blog/?author=Joel+William`
- `https://wagtail.org/blog/?author=John+Abdulla`
- `https://wagtail.org/blog/?author=Joshua+Munn`
- `https://wagtail.org/blog/?author=Kalob+Taulien`
- `https://wagtail.org/blog/?author=Karl+Hobley`
- `https://wagtail.org/blog/?author=Kate+Statton+Harman`
- `https://wagtail.org/blog/?author=Kevin+Howbrook`
- and 672 more

## Executive summary

Severity threshold failed: critical or serious findings require remediation.

The headline numbers for this run.

| Measure | Value |
|---|---|
| Score | 80 out of 100 |
| Grade | B |
| Findings | 11 |
| Blocking (critical plus serious) | 7 |
| Severity threshold | Fail |

## Severity breakdown

Counts by severity, highest impact first.

| Severity | Count | What it means |
|---|---:|---|
| critical | 0 | Blocks a person from completing the task |
| serious | 7 | Major barrier with a difficult workaround |
| moderate | 4 | Real friction, workaround exists |
| minor | 0 | Noticeable but rarely blocking |

## Findings

11 findings, ordered by severity then by rule.

### Serious (7)

Each row names the rule, the criterion it fails, where it is, and what to change.

| Rule | WCAG | Location | Problem | Fix |
|---|---|---|---|---|
| `color-contrast` | 1.4.3 AA | https://wagtail.org/blog/wagtail-10b2/ .codehilite .nv | Syntax-highlighted variables have insufficient text contrast against the code background. | Update syntax token colors in wagtailio/static/sass/vendor/_code-highlighting.scss (including .nv at line 58 and .vc/.vg/.vi at lines 77–79) to reach 4.5:1 against their actual light and dark code backgrounds; verify all token classes. |
| `frame-title` | 4.1.2 A | https://wagtail.org/blog/why-pay-for-open-source/ iframe | Embedded media frames lack accessible names on multiple blog pages. | Give every embedded iframe a concise title naming its content, for example title="Why pay for open source? — video". Review stored Wagtail embed HTML and the embed/video StreamField rendering; refresh cached embeds where necessary. Keep each title specific to its content. |
| `HTML-LANG-001` | 3.1.1 A | wagtailio/newsletter/templates/newsletter/newsletter_page.html:3 | Archived newsletter pages do not declare their primary language, preventing reliable screen-reader pronunciation. | Add lang="en" to the standalone newsletter template's html element (and xml:lang="en" if retaining XHTML serialization). Verify archived issues and email output after rendering. |
| `link-in-text-block` | 1.4.1 A | https://wagtail.org/packages/ .overview__description-link | Inline package-directory links rely on a low-contrast color difference to distinguish them from surrounding text. | Restore a persistent underline to .overview__description-link in wagtailio/static/sass/components/_overview.scss:54–61; retain clear hover and keyboard focus indicators. Apply the change to every package category description. |
| `link-name` | 2.4.4 A | https://wagtail.org/this-week-in-wagtail/?page=7 .blog-post--small; https://wagtail.org/this-week-in-wagtail/?page=11 .blog-post--small | Three newsletter listing cards expose focusable links with no accessible name. | Review card rendering in wagtailio/newsletter/templates/newsletter/newsletter_index_page.html:56 and the affected newsletter content; ensure each resulting anchor contains the issue title. Avoid nested links in card content and provide a reliable title fallback. Verify issues 106, 105 and 83 in the rendered DOM. |
| `link-name` | 2.4.4 A | https://wagtail.org/this-week-in-wagtail/issue-3/ p:nth-child(10) > a | Empty links in two archived newsletter issues have no accessible name. | Remove the unintended empty anchors from issues 3 and 6. If any link is intended to remain, supply meaningful visible link text describing the destination and verify its focus appearance. Do not retain invisible links solely by adding an aria-label. |
| `SHADOW-FAVORITE-NAME-001` | 4.1.2 A | https://wagtail.org/wagtail-space-2026/schedule/ — pretalx-schedule shadow root button.btn-fav-container | Schedule favorite buttons have no accessible name or exposed selected state. | In the pretalx widget renderer, give each favorite button a name including its session title and expose toggle state with aria-pressed, or update its action name between Add and Remove favorite. Hide the star SVG from assistive technology. Provide an accessible schedule alternative while awaiting an upstream fix. |

### Moderate (4)

Each row names the rule, the criterion it fails, where it is, and what to change.

| Rule | WCAG | Location | Problem | Fix |
|---|---|---|---|---|
| `ARIA-DIALOG-NAME-001` | 4.1.2 A | wagtailio/project_styleguide/templates/patterns/includes/search-modal.html:3 | The open desktop search dialog has no accessible name, so its purpose is not announced when users enter it. | Give the role=dialog container an accessible name: add a Search heading with a unique id and reference it with aria-labelledby, or add aria-label="Search". Keep the existing input and close-button labels, and verify the opened dialog in the accessibility tree. |
| `SHADOW-AVATAR-ALT-001` | 1.1.1 A | https://wagtail.org/wagtail-space-2026/schedule/ — pretalx-schedule shadow root .avatars img | Speaker portrait images in embedded schedules lack alt attributes, creating unnamed graphics among session details. | Render these portraits with alt="" when the adjacent speaker name already identifies the person. Supply meaningful alt only when the portrait conveys additional information. Apply the fix inside the widget renderer or provide an accessible schedule alternative. |
| `SHADOW-TAB-RELATION-001` | 4.1.2 A | https://wagtail.org/wagtail-space-2026/schedule/ — pretalx-schedule shadow root [role=tab] | Schedule date tabs reference nonexistent panels, while the exposed tabpanel is empty. | If these controls navigate to dates in one continuous schedule, use labelled anchor links to actual day sections instead of tab roles. Otherwise implement real labelled tabpanels in the same shadow root and connect each tab to its panel with valid IDs and consistent selection states. |
| `SHADOW-TIMEZONE-LABEL-001` | 4.1.2 A | https://wagtail.org/wagtail-space-2025/schedule/ — pretalx-schedule shadow root input[name=timezone] | The 2025 schedule timezone field has no accessible name. | Add a visible Time zone label with a matching input id inside the same shadow root, or provide aria-label="Time zone". Keep the current timezone value separate from the field name and verify selection semantics. |

## Remediation priorities

Prioritize components with multiple findings. Shared-template repairs can address repeated instances; distinct findings may require separate changes.

| Component | Instances | Worst severity | Rules |
|---|---:|---|---|
| External pretalx schedule widget | 4 | serious | `SHADOW-AVATAR-ALT-001`, `SHADOW-FAVORITE-NAME-001`, `SHADOW-TAB-RELATION-001`, `SHADOW-TIMEZONE-LABEL-001` |

Then the 7 remaining blocking findings, in this order:

1. `color-contrast` at https://wagtail.org/blog/wagtail-10b2/ .codehilite .nv. Update syntax token colors in wagtailio/static/sass/vendor/_code-highlighting.scss (including .nv at line 58 and .vc/.vg/.vi at lines 77–79) to reach 4.5:1 against their actual light and dark code backgrounds; verify all token classes.
2. `frame-title` at https://wagtail.org/blog/why-pay-for-open-source/ iframe. Give every embedded iframe a concise title naming its content, for example title="Why pay for open source? — video". Review stored Wagtail embed HTML and the embed/video StreamField rendering; refresh cached embeds where necessary. Keep each title specific to its content.
3. `HTML-LANG-001` at wagtailio/newsletter/templates/newsletter/newsletter_page.html:3. Add lang="en" to the standalone newsletter template's html element (and xml:lang="en" if retaining XHTML serialization). Verify archived issues and email output after rendering.
4. `link-in-text-block` at https://wagtail.org/packages/ .overview__description-link. Restore a persistent underline to .overview__description-link in wagtailio/static/sass/components/_overview.scss:54–61; retain clear hover and keyboard focus indicators. Apply the change to every package category description.
5. `link-name` at https://wagtail.org/this-week-in-wagtail/?page=7 .blog-post--small; https://wagtail.org/this-week-in-wagtail/?page=11 .blog-post--small. Review card rendering in wagtailio/newsletter/templates/newsletter/newsletter_index_page.html:56 and the affected newsletter content; ensure each resulting anchor contains the issue title. Avoid nested links in card content and provide a reliable title fallback. Verify issues 106, 105 and 83 in the rendered DOM.
6. `link-name` at https://wagtail.org/this-week-in-wagtail/issue-3/ p:nth-child(10) > a. Remove the unintended empty anchors from issues 3 and 6. If any link is intended to remain, supply meaningful visible link text describing the destination and verify its focus appearance. Do not retain invisible links solely by adding an aria-label.
7. `SHADOW-FAVORITE-NAME-001` at https://wagtail.org/wagtail-space-2026/schedule/ — pretalx-schedule shadow root button.btn-fav-container. In the pretalx widget renderer, give each favorite button a name including its session title and expose toggle state with aria-pressed, or update its action name between Add and Remove favorite. Hide the star SVG from assistive technology. Provide an accessible schedule alternative while awaiting an upstream fix.

The remaining 4 moderate and minor findings can follow in normal work.

## What passed

31 checks ran and found nothing.

- Automated rule aria-allowed-attr: passed on 598 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.
- Automated rule aria-conditional-attr: passed on 598 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.
- Automated rule aria-deprecated-role: passed on 26 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.
- Automated rule aria-hidden-body: passed on 735 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.
- Automated rule aria-hidden-focus: passed on 598 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.
- Automated rule aria-prohibited-attr: passed on 598 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.
- Automated rule aria-required-attr: passed on 26 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.
- Automated rule aria-required-children: passed on 2 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.
- Automated rule aria-required-parent: passed on 2 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.
- Automated rule aria-roles: passed on 26 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.
- Automated rule aria-tab-name: passed on 2 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.
- Automated rule aria-valid-attr: passed on 598 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.
- Automated rule autocomplete-valid: passed on 598 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.
- Automated rule avoid-inline-spacing: passed on 2 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.
- Automated rule bypass: passed on 735 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.
- Automated rule document-title: passed on 735 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.
- Automated rule duplicate-id-aria: passed on 598 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.
- Automated rule form-field-multiple-labels: passed on 598 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.
- Automated rule frame-title-unique: passed on 35 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.
- Automated rule html-lang-valid: passed on 599 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.
- Automated rule input-button-name: passed on 28 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.
- Automated rule label-content-name-mismatch: passed on 26 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.
- Automated rule list: passed on 735 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.
- Automated rule listitem: passed on 735 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.
- Automated rule meta-viewport: passed on 735 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.
- Automated rule nested-interactive: passed on 735 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.
- Automated rule select-name: passed on 13 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.
- Automated rule summary-name: passed on 1 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.
- Automated rule target-size: passed on 735 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.
- Automated rule td-headers-attr: passed on 138 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.
- Automated rule th-has-data-cells: passed on 2 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.

## Needs a human

Items a skill could not decide, or could not check automatically.

- **reviewed-axe-scan**: This is the reviewed automated-scan report. It groups confirmed automated findings by shared cause and uses specialist-reviewed severity. The combined audit also includes keyboard and source-review findings absent here.
- **reviewed-axe-scan**: The full crawl covered 735 same-site URL requests: 708 distinct successful HTML destinations and 14 distinct error-page destinations. Initial scans used 1440×1000 and reduced motion; opened-dialog and settled-widget checks supplemented initial page states.
- **reviewed-axe-scan**: Raw scanner output records 879 node instances on 193 URL scans, including 192 successful pages and one edge-generated error page. These raw counts include warnings excluded after review. See axe-instances.csv for original rule, impact, markup, selector and screenshot.
- **reviewed-axe-scan**: Excluded from confirmed findings: 39 invalid aria-controls references on passive feature-index containers, and one link-style warning in the Cloudflare email-protection error response. Schedule severities were reviewed against observed behavior rather than copied from axe critical labels.
- **reviewed-axe-scan**: Incomplete results remain in axe-needs-review.csv. Static HTML checks do not cover later shadow-root content; schedule findings were verified after its data loaded. Cross-origin embedded-player contents and media alternatives were not exhaustively tested.
- **reviewed-axe-scan**: The search-dialog naming finding was verified with targeted opened-state axe and an accessibility-tree snapshot, supplementing the initial-page crawl.
- **reviewed-axe-scan**: Scores are renderer heuristics dependent on report scope and passed-check counts. Do not compare these scores across the combined, PDF and automated-only reports, or interpret them as a percentage of WCAG conformance.
- **reviewed-axe-scan**: Tool versions: axe-core 4.14.0; Playwright 1.64.1; Chromium 152.0.7977.82. Tags: wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa.

## Next steps

1. Fix the 7 blocking findings above, starting with any repeated component.
2. Re-run this audit and check the delta section for regressions.
3. Wire the scan into continuous integration so the next regression is caught before review.

Automated checks find a minority of accessibility barriers. A passing score is a floor, not a guarantee.

## Evidence by finding

Evidence retained from the specialist review; full screenshots and measurements are linked in the evidence index.

| # | Rule | Location | Observed evidence |
|---:|---|---|---|
| 1 | color-contrast | https://wagtail.org/blog/wagtail-10b2/ .codehilite .nv | Rendered .nv text “wagtail”: #bb60d5 on #f5f5f5, 3.35:1, normal 17px. Screenshot: screenshots/audit-2026-10-16/syntax-code-contrast.png. Source: wagtailio/static/sass/vendor/_code-highlighting.scss:58. |
| 2 | frame-title | https://wagtail.org/blog/why-pay-for-open-source/ iframe | axe-core found 19 unnamed frames across 16 pages. The representative YouTube iframe has no title, aria-label or aria-labelledby. All URLs, selectors and screenshots are indexed in .a11y-history/2026-10-16/evidence/axe-instances.csv. |
| 3 | HTML-LANG-001 | wagtailio/newsletter/templates/newsletter/newsletter_page.html:3 | Live /this-week-in-wagtail/issue-1/ renders &lt;html xmlns="http://www.w3.org/1999/xhtml"&gt; without lang. Rendered axe scans confirm the omission on all 136 distinct newsletter issue pages; earlier source inventory counted 138 URL variants. |
| 4 | link-in-text-block | https://wagtail.org/packages/ .overview__description-link | Runtime: link #262626, surrounding text #5c5c5c, contrast 2.26:1; both font-weight 400; text-decoration:none; no pseudo-element cues. Screenshot: screenshots/audit-2026-10-16/packages-link-distinction.png. |
| 5 | link-name | https://wagtail.org/this-week-in-wagtail/?page=7 .blog-post--small; https://wagtail.org/this-week-in-wagtail/?page=11 .blog-post--small | Browser axe confirms empty .blog-post.blog-post--small anchors to issues 106 and 105 on page=7 and issue 83 on page=11. Raw: 02f3fcf6749b5d84.json and f6af1208408930a7.json; corresponding screenshot basenames [02f3fcf6749b5d84.jpg](screenshots/audit-2026-10-16/02f3fcf6749b5d84.jpg) and f6af1208408930a7.jpg. |
| 6 | link-name | https://wagtail.org/this-week-in-wagtail/issue-3/ p:nth-child(10) &gt; a | 4 empty href-bearing anchors on 2 pages: two in issue 3 and two in issue 6. Captured markup has no text, images, title or ARIA name. See axe-instances.csv for selectors and screenshots. |
| 7 | SHADOW-FAVORITE-NAME-001 | https://wagtail.org/wagtail-space-2026/schedule/ — pretalx-schedule shadow root button.btn-fav-container | Settled widgets contain 28 unnamed favorite buttons in 2026 and 31 in 2025. Chromium snapshot exposes only button &gt; img. Space activates the first star and changes its SVG class, but no name or pressed state is exposed. |
| 8 | ARIA-DIALOG-NAME-001 | wagtailio/project_styleguide/templates/patterns/includes/search-modal.html:3 | Live homepage: activate [data-site-search-desktop]. Chromium snapshot begins "- dialog:" with no name; markup is &lt;div class="modal__container" role="dialog" aria-modal="true"&gt;. Targeted axe reports aria-dialog-name. Screenshot: screenshots/audit-2026-10-16/aria-unnamed-search-dialog.png. |
| 9 | SHADOW-AVATAR-ALT-001 | https://wagtail.org/wagtail-space-2026/schedule/ — pretalx-schedule shadow root .avatars img | 26 missing-alt portrait images in the 2026 schedule and 29 in 2025 remain after loading. Example: &lt;img src="https://pretalx.com/media/avatars/NWSRRS_mfIrUuC_thumbnail_tiny.webp"&gt; beside Thibaud Colas. Snapshot exposes img despite the adjacent name. |
| 10 | SHADOW-TAB-RELATION-001 | https://wagtail.org/wagtail-space-2026/schedule/ — pretalx-schedule shadow root [role=tab] | All three aria-controls date IDs are absent from the shadow root on both schedules. The only role=tabpanel is an empty &lt;div class="bunt-tabs-body" role="tabpanel" tabindex="0"&gt;&lt;/div&gt;; sessions appear outside it. |
| 11 | SHADOW-TIMEZONE-LABEL-001 | https://wagtail.org/wagtail-space-2025/schedule/ — pretalx-schedule shadow root input[name=timezone] | Settled snapshot exposes textbox: UTC without a name. Markup is &lt;input type="text" name="timezone" autocomplete="off"&gt;; adjacent &lt;label for="timezone"&gt;&lt;/label&gt; is empty and the input has no id. |

## Findings data

The merged findings, embedded so the next run can compute a delta without parsing this document.

```json a11y-findings
{
  "skills": [
    "reviewed-axe-scan"
  ],
  "scope": [
    "https://wagtail.org/",
    "https://wagtail.org/about-wagtail/",
    "https://wagtail.org/accessibility/",
    "https://wagtail.org/accessibility/testing/",
    "https://wagtail.org/agencies/",
    "https://wagtail.org/ai/",
    "https://wagtail.org/ai/agent-skills-for-developers/",
    "https://wagtail.org/ai/agentic-engineering-recommendations/",
    "https://wagtail.org/ai/ai-guiding-principles/",
    "https://wagtail.org/blog/",
    "https://wagtail.org/blog/10-underrated-django-packages/",
    "https://wagtail.org/blog/10-years/",
    "https://wagtail.org/blog/20000-django-packages/",
    "https://wagtail.org/blog/2023-wagtail-deployment-survey/",
    "https://wagtail.org/blog/2024-headless-survey/",
    "https://wagtail.org/blog/2026-ai-dx-survey/",
    "https://wagtail.org/blog/40-smaller-images-same-quality/",
    "https://wagtail.org/blog/5-simple-ways-anyone-can-contribute-to-wagtail/",
    "https://wagtail.org/blog/5-terabytes-for-30-seconds-of-homepage-video/",
    "https://wagtail.org/blog/7-tips-for-applying-to-google-summer-of-code/",
    "https://wagtail.org/blog/?author=Aaron+MacGillivary",
    "https://wagtail.org/blog/?author=Ahmed+Olaitan",
    "https://wagtail.org/blog/?author=Aimee+Maroney",
    "https://wagtail.org/blog/?author=Albina+Starykova",
    "https://wagtail.org/blog/?author=Alex+Morega",
    "https://wagtail.org/blog/?author=Anuja+Raj+Verma",
    "https://wagtail.org/blog/?author=Ben+Enright",
    "https://wagtail.org/blog/?author=Bertrand+Bordage",
    "https://wagtail.org/blog/?author=Brent+Clark",
    "https://wagtail.org/blog/?author=Cameron+Lamb",
    "https://wagtail.org/blog/?author=Chiemezuo",
    "https://wagtail.org/blog/?author=Chris+Rogers",
    "https://wagtail.org/blog/?author=Chrissy+Wainwright",
    "https://wagtail.org/blog/?author=Coen+van+der+Kamp",
    "https://wagtail.org/blog/?author=Damilola+Oladele",
    "https://wagtail.org/blog/?author=Dan+Braghi%C8%99",
    "https://wagtail.org/blog/?author=Doug+Harris",
    "https://wagtail.org/blog/?author=Glenn+Barr",
    "https://wagtail.org/blog/?author=Helen+Chapman",
    "https://wagtail.org/blog/?author=Hitansh+Shah",
    "https://wagtail.org/blog/?author=Ian+Bellchambers",
    "https://wagtail.org/blog/?author=Jake+Howard",
    "https://wagtail.org/blog/?author=Jane+Hughes",
    "https://wagtail.org/blog/?author=Joel+William",
    "https://wagtail.org/blog/?author=John+Abdulla",
    "https://wagtail.org/blog/?author=Joshua+Munn",
    "https://wagtail.org/blog/?author=Kalob+Taulien",
    "https://wagtail.org/blog/?author=Karl+Hobley",
    "https://wagtail.org/blog/?author=Kate+Statton+Harman",
    "https://wagtail.org/blog/?author=Kevin+Howbrook",
    "https://wagtail.org/blog/?author=Kyle+Bayliss",
    "https://wagtail.org/blog/?author=Kyle+Rutten",
    "https://wagtail.org/blog/?author=LB",
    "https://wagtail.org/blog/?author=Lisa+Ballam",
    "https://wagtail.org/blog/?author=Loveth+Omokaro",
    "https://wagtail.org/blog/?author=Maarten+Kling",
    "https://wagtail.org/blog/?author=Marko+Kruijer",
    "https://wagtail.org/blog/?author=Matt+Westcott",
    "https://wagtail.org/blog/?author=Matthew+Newton",
    "https://wagtail.org/blog/?author=Meagen+Voss",
    "https://wagtail.org/blog/?author=Meagen+Voss&page=1",
    "https://wagtail.org/blog/?author=Meagen+Voss&page=2",
    "https://wagtail.org/blog/?author=Meagen+Voss&page=3",
    "https://wagtail.org/blog/?author=Meagen+Voss&page=4",
    "https://wagtail.org/blog/?author=Meagen+Voss&page=5",
    "https://wagtail.org/blog/?author=Meagen+Voss&page=6",
    "https://wagtail.org/blog/?author=Meagen+Voss&page=7",
    "https://wagtail.org/blog/?author=Meagen+Voss&page=8",
    "https://wagtail.org/blog/?author=Meagen+Voss&page=9",
    "https://wagtail.org/blog/?author=Michael+Frost",
    "https://wagtail.org/blog/?author=Michael+Yin",
    "https://wagtail.org/blog/?author=Nick+Smith",
    "https://wagtail.org/blog/?author=Nicolas+Leung",
    "https://wagtail.org/blog/?author=Oliver+Sartun",
    "https://wagtail.org/blog/?author=Olly+Willans",
    "https://wagtail.org/blog/?author=Paarth+Agarwal",
    "https://wagtail.org/blog/?author=Pawel+Prochot%E2%80%8B",
    "https://wagtail.org/blog/?author=Phil+Dexter",
    "https://wagtail.org/blog/?author=Raghad+Dahi",
    "https://wagtail.org/blog/?author=Raphael+Stolt",
    "https://wagtail.org/blog/?author=Rohit+Sharma",
    "https://wagtail.org/blog/?author=Sage+Abdullah",
    "https://wagtail.org/blog/?author=Sandil+Ranisinghe",
    "https://wagtail.org/blog/?author=Shakhrizoda+Yusupova",
    "https://wagtail.org/blog/?author=Stephanie+Brown",
    "https://wagtail.org/blog/?author=Storm+Heg",
    "https://wagtail.org/blog/?author=Team",
    "https://wagtail.org/blog/?author=Team&page=1",
    "https://wagtail.org/blog/?author=Team&page=2",
    "https://wagtail.org/blog/?author=Thibaud+Colas",
    "https://wagtail.org/blog/?author=Thibaud+Colas&page=1",
    "https://wagtail.org/blog/?author=Thibaud+Colas&page=2",
    "https://wagtail.org/blog/?author=Thibaud+Colas&page=3",
    "https://wagtail.org/blog/?author=Thibaud+Colas&page=4",
    "https://wagtail.org/blog/?author=Thibaud+Colas&page=5",
    "https://wagtail.org/blog/?author=Thibaud+Colas&page=6",
    "https://wagtail.org/blog/?author=Thibaud+Colas&page=7",
    "https://wagtail.org/blog/?author=Thibaud+Colas&page=8",
    "https://wagtail.org/blog/?author=Thibaud+Colas&page=9",
    "https://wagtail.org/blog/?author=Tim+White",
    "https://wagtail.org/blog/?author=Tom+Dyson",
    "https://wagtail.org/blog/?author=Tom+Dyson&page=1",
    "https://wagtail.org/blog/?author=Tom+Dyson&page=2",
    "https://wagtail.org/blog/?author=Tom+Dyson&page=3",
    "https://wagtail.org/blog/?author=Will+Heinemann",
    "https://wagtail.org/blog/?category=1",
    "https://wagtail.org/blog/?category=1&page=1",
    "https://wagtail.org/blog/?category=1&page=10",
    "https://wagtail.org/blog/?category=1&page=11",
    "https://wagtail.org/blog/?category=1&page=12",
    "https://wagtail.org/blog/?category=1&page=2",
    "https://wagtail.org/blog/?category=1&page=3",
    "https://wagtail.org/blog/?category=1&page=4",
    "https://wagtail.org/blog/?category=1&page=5",
    "https://wagtail.org/blog/?category=1&page=6",
    "https://wagtail.org/blog/?category=1&page=7",
    "https://wagtail.org/blog/?category=1&page=8",
    "https://wagtail.org/blog/?category=1&page=9",
    "https://wagtail.org/blog/?category=10",
    "https://wagtail.org/blog/?category=10&page=1",
    "https://wagtail.org/blog/?category=10&page=2",
    "https://wagtail.org/blog/?category=10&page=3",
    "https://wagtail.org/blog/?category=10&page=4",
    "https://wagtail.org/blog/?category=10&page=5",
    "https://wagtail.org/blog/?category=2",
    "https://wagtail.org/blog/?category=2&page=1",
    "https://wagtail.org/blog/?category=2&page=2",
    "https://wagtail.org/blog/?category=2&page=3",
    "https://wagtail.org/blog/?category=2&page=4",
    "https://wagtail.org/blog/?category=3",
    "https://wagtail.org/blog/?category=4",
    "https://wagtail.org/blog/?category=4&page=1",
    "https://wagtail.org/blog/?category=4&page=2",
    "https://wagtail.org/blog/?category=44",
    "https://wagtail.org/blog/?category=44&page=1",
    "https://wagtail.org/blog/?category=44&page=2",
    "https://wagtail.org/blog/?category=5",
    "https://wagtail.org/blog/?category=5&page=1",
    "https://wagtail.org/blog/?category=5&page=2",
    "https://wagtail.org/blog/?category=6",
    "https://wagtail.org/blog/?category=6&page=1",
    "https://wagtail.org/blog/?category=6&page=2",
    "https://wagtail.org/blog/?category=7",
    "https://wagtail.org/blog/?category=7&page=1",
    "https://wagtail.org/blog/?category=7&page=2",
    "https://wagtail.org/blog/?category=8",
    "https://wagtail.org/blog/?category=8&page=1",
    "https://wagtail.org/blog/?category=8&page=2",
    "https://wagtail.org/blog/?category=9",
    "https://wagtail.org/blog/?page=1",
    "https://wagtail.org/blog/?page=10",
    "https://wagtail.org/blog/?page=11",
    "https://wagtail.org/blog/?page=12",
    "https://wagtail.org/blog/?page=13",
    "https://wagtail.org/blog/?page=14",
    "https://wagtail.org/blog/?page=15",
    "https://wagtail.org/blog/?page=16",
    "https://wagtail.org/blog/?page=17",
    "https://wagtail.org/blog/?page=18",
    "https://wagtail.org/blog/?page=19",
    "https://wagtail.org/blog/?page=2",
    "https://wagtail.org/blog/?page=20",
    "https://wagtail.org/blog/?page=21",
    "https://wagtail.org/blog/?page=22",
    "https://wagtail.org/blog/?page=23",
    "https://wagtail.org/blog/?page=24",
    "https://wagtail.org/blog/?page=25",
    "https://wagtail.org/blog/?page=26",
    "https://wagtail.org/blog/?page=27",
    "https://wagtail.org/blog/?page=28",
    "https://wagtail.org/blog/?page=29",
    "https://wagtail.org/blog/?page=3",
    "https://wagtail.org/blog/?page=30",
    "https://wagtail.org/blog/?page=31",
    "https://wagtail.org/blog/?page=4",
    "https://wagtail.org/blog/?page=5",
    "https://wagtail.org/blog/?page=6",
    "https://wagtail.org/blog/?page=7",
    "https://wagtail.org/blog/?page=8",
    "https://wagtail.org/blog/?page=9",
    "https://wagtail.org/blog/a-new-tutorial-series-for-the-new-year/",
    "https://wagtail.org/blog/a-plate-of-snow/",
    "https://wagtail.org/blog/a-tale-of-digging-into-wagtails-page-tree-internals/",
    "https://wagtail.org/blog/accessibility-conformance-report-wagtail-7-4/",
    "https://wagtail.org/blog/accessibility-team-reloaded/",
    "https://wagtail.org/blog/add-wagtail-blog-to-django-app/",
    "https://wagtail.org/blog/ai-and-developer-experience-wagtail-community-survey/",
    "https://wagtail.org/blog/ai-in-the-cms-steering-the-ecosystem/",
    "https://wagtail.org/blog/ai-saved-me-10-minutes-on-a-blog-post-was-it-worth-it/",
    "https://wagtail.org/blog/amazon-s3-for-media-files/",
    "https://wagtail.org/blog/an-agent-heavy-roadmap-for-2026/",
    "https://wagtail.org/blog/an-agent-skill-to-upgrade-your-wagtail-site/",
    "https://wagtail.org/blog/announcing-wagtail-sub-teams/",
    "https://wagtail.org/blog/api-support-in-wagtail-2024-headless-survey/",
    "https://wagtail.org/blog/aria-label-is-a-letdown/",
    "https://wagtail.org/blog/ashia-zawaduk/",
    "https://wagtail.org/blog/azure-ad-authentication/",
    "https://wagtail.org/blog/benchmarking-wagtail-51/",
    "https://wagtail.org/blog/bring-your-ux-feature-requests-to-wagtail-space-community-day/",
    "https://wagtail.org/blog/bristol-2017/",
    "https://wagtail.org/blog/bristol-sprint-2020/",
    "https://wagtail.org/blog/build-dynamic-campaign-landing-pages-in-wagtail/",
    "https://wagtail.org/blog/build-update-on-new-page-editor/",
    "https://wagtail.org/blog/building-a-wagtail-starter-template/",
    "https://wagtail.org/blog/caltech/",
    "https://wagtail.org/blog/cape-town-retrospective/",
    "https://wagtail.org/blog/check-yourself-vibe-coding/",
    "https://wagtail.org/blog/closing-the-gap-strict-csp-compatibility/",
    "https://wagtail.org/blog/cms-with-ai-not-ai-cms-wagtail-80s-new-api/",
    "https://wagtail.org/blog/collaborating-with-other-maintainers-at-the-gsoc-mentor-summit/",
    "https://wagtail.org/blog/coming-soonish-adding-custom-templates-with-wagtail-start/",
    "https://wagtail.org/blog/community-spotlight-cynthia-kiser/",
    "https://wagtail.org/blog/community-spotlight-lb/",
    "https://wagtail.org/blog/community-spotlight-sage-abdullah/",
    "https://wagtail.org/blog/community-spotlight-vince-salvino/",
    "https://wagtail.org/blog/comparing-open-weight-ai-models-and-providers/",
    "https://wagtail.org/blog/contributors-for-google-summer-of-code-2026/",
    "https://wagtail.org/blog/contributors-webinar-plans-for-stimulus-in-wagtail/",
    "https://wagtail.org/blog/core-team-expansion-part-2/",
    "https://wagtail.org/blog/core-team-expansion/",
    "https://wagtail.org/blog/cuh-foundation/",
    "https://wagtail.org/blog/cve-2025-45388/",
    "https://wagtail.org/blog/delete-your-stuff/",
    "https://wagtail.org/blog/deploying-wagtail-heroku/",
    "https://wagtail.org/blog/development-updates-13th-may-2015/",
    "https://wagtail.org/blog/digital-carbon-ratings-in-practice/",
    "https://wagtail.org/blog/divio-wagtail-starter-kit/",
    "https://wagtail.org/blog/django-security-releases-relevant-to-wagtail-sites/",
    "https://wagtail.org/blog/djangocon-europe-2024-birds-eye-view/",
    "https://wagtail.org/blog/djangocon-europe-2025-vibes-and-photos/",
    "https://wagtail.org/blog/djangocon-us-2023/",
    "https://wagtail.org/blog/djangocon-us-2024/",
    "https://wagtail.org/blog/documentation-sprint-2021/",
    "https://wagtail.org/blog/estimating-wagtail-websites-emissions/",
    "https://wagtail.org/blog/experiments-with-mcp-in-wagtail/",
    "https://wagtail.org/blog/five-sustainable-ways-to-build-habits-for-learning-wagtail-in-2026/",
    "https://wagtail.org/blog/fix-a-common-wagtail-ux-issue-in-two-lines/",
    "https://wagtail.org/blog/fixing-youtubes-oembed-implementation-custom-finder-class/",
    "https://wagtail.org/blog/four-contributors-for-gsoc-2025/",
    "https://wagtail.org/blog/free-talk-ideas-for-wagtail-space-2026/",
    "https://wagtail.org/blog/front-end-architecture-fundamentals/",
    "https://wagtail.org/blog/get-your-best-work-done-with-wagtail-3/",
    "https://wagtail.org/blog/getting-started-wagtail-newcomers-perspective/",
    "https://wagtail.org/blog/getting-started-with-wagtail-and-graphql/",
    "https://wagtail.org/blog/gitpod/",
    "https://wagtail.org/blog/going-green-with-google-summer-of-code/",
    "https://wagtail.org/blog/google-season-of-docs-creating-wagtail-developer-onboarding-tutorials/",
    "https://wagtail.org/blog/google-summer-of-code-2022-wagtail-midterm/",
    "https://wagtail.org/blog/google-summer-of-code-high-contrast-themes/",
    "https://wagtail.org/blog/google-summer-of-code-toolkit-for-streamfield-data-migrations-in-wagtail/",
    "https://wagtail.org/blog/google-summer-of-code-wagtail-editor-guide/",
    "https://wagtail.org/blog/graphql-with-streamfield/",
    "https://wagtail.org/blog/greener-images-with-webp/",
    "https://wagtail.org/blog/grid-aware-websites-journey-via-gsoc-2025/",
    "https://wagtail.org/blog/gsoc-2021-wrapup/",
    "https://wagtail.org/blog/gsoc-2021/",
    "https://wagtail.org/blog/gsoc-2026-guide-website-revamp-report/",
    "https://wagtail.org/blog/guidance-for-ai-led-contributions/",
    "https://wagtail.org/blog/help-us-improve-windows-high-contrast-mode-support-in-wagtail/",
    "https://wagtail.org/blog/here-are-our-talks-for-wagtail-space-2025/",
    "https://wagtail.org/blog/highlights-of-wagtail-2-15/",
    "https://wagtail.org/blog/hot-takes-are-making-the-planet-hotter-and-we-can-do-something-about-it/",
    "https://wagtail.org/blog/how-and-why-the-wagtail-page-editor-is-evolving/",
    "https://wagtail.org/blog/how-the-wagtail-newsletter-package-came-to-be/",
    "https://wagtail.org/blog/how-to-use-the-wagtail-slash-command/",
    "https://wagtail.org/blog/how-to-use-wagtail-ai-part-1/",
    "https://wagtail.org/blog/how-to-use-wagtail-live-preview/",
    "https://wagtail.org/blog/how-to-use-wagtail-within-a-mach-architecture/",
    "https://wagtail.org/blog/how-to-use-wagtail-within-a-mach-architecture/decoupled%20CMS",
    "https://wagtail.org/blog/how-we-added-svg-support-to-wagtail-50/",
    "https://wagtail.org/blog/how-we-created-the-new-wagtailorg/",
    "https://wagtail.org/blog/how-we-used-wagtail-to-streamline-crisis-response-for-veiligheidsregio-utrecht/",
    "https://wagtail.org/blog/how-you-can-use-wagtail-to-optimize-your-images/",
    "https://wagtail.org/blog/htmx-accessibility-gaps-data-and-recommendations/",
    "https://wagtail.org/blog/independent-security-audit-findings-and-next-steps/",
    "https://wagtail.org/blog/introducing-admin-api/",
    "https://wagtail.org/blog/introducing-the-wagtail-roadmap/",
    "https://wagtail.org/blog/introducing-wagtails-new-accessibility-checker/",
    "https://wagtail.org/blog/join-us-for-socials-and-wagtail-community-day-at-wagtail-space/",
    "https://wagtail.org/blog/keeping-up-with-upcoming-changes-in-wagtail/",
    "https://wagtail.org/blog/leaner-images-lower-footprint-at-scale/",
    "https://wagtail.org/blog/llmstxt-preparing-wagtail-docs-for-ai-tools/",
    "https://wagtail.org/blog/log4j-statement/",
    "https://wagtail.org/blog/looking-for-sponsorship-accessibility-checks-for-site-administrators/",
    "https://wagtail.org/blog/looking-for-sponsorship-seo-power-tools/",
    "https://wagtail.org/blog/m-plus-museum/",
    "https://wagtail.org/blog/making-the-web-more-accessible-an-update-on-wagtails-accessibility-checker/",
    "https://wagtail.org/blog/making-wagtail-accessible/",
    "https://wagtail.org/blog/making-wagtailorg-more-accessible/",
    "https://wagtail.org/blog/media-listings-ux-improvements-via-gsoc-2025/",
    "https://wagtail.org/blog/meet-wagtail-torchboxs-new-cms/",
    "https://wagtail.org/blog/mozilla-wagtail-global-giving-platform/",
    "https://wagtail.org/blog/multi-site-wagtail/",
    "https://wagtail.org/blog/new-security-announcements-channel/",
    "https://wagtail.org/blog/new-starter-kit-for-wagtail-cms/",
    "https://wagtail.org/blog/nhs-picks-wagtail/",
    "https://wagtail.org/blog/no-gsoc-on-wagtail-core-in-2027/",
    "https://wagtail.org/blog/nypr-on-wagtail/",
    "https://wagtail.org/blog/oled-and-dark-websites-lower-footprint/",
    "https://wagtail.org/blog/one-month-on-glm-53-flash/",
    "https://wagtail.org/blog/online-conference-footprint-wagtail-space-2025/",
    "https://wagtail.org/blog/open-models-only-adoption-challenge/",
    "https://wagtail.org/blog/open-source-ai-we-use-to-work-on-wagtail/",
    "https://wagtail.org/blog/open-source-carbon-footprints/",
    "https://wagtail.org/blog/open-source-internship-ux-unification/",
    "https://wagtail.org/blog/open-source-maintenance-new-contributors-and-ai-agents/",
    "https://wagtail.org/blog/our-agent-skills-for-wagtail-developers/",
    "https://wagtail.org/blog/our-djangoconus-2026-photo-album/",
    "https://wagtail.org/blog/our-first-google-season-of-docs-2023/",
    "https://wagtail.org/blog/our-new-product-strategy-for-wagtail/",
    "https://wagtail.org/blog/our-outreachy-projects-in-2023/",
    "https://wagtail.org/blog/our-projects-for-gsoc-2026/",
    "https://wagtail.org/blog/our-roadmap-for-collaborative-content-management/",
    "https://wagtail.org/blog/our-roadmap-for-the-next-6-months/",
    "https://wagtail.org/blog/our-updated-accessibility-conformance-report/",
    "https://wagtail.org/blog/our-very-first-outreachy-interns/",
    "https://wagtail.org/blog/outreachy-2023/",
    "https://wagtail.org/blog/outreachy-welcoming-new-contributors-to-open-source/",
    "https://wagtail.org/blog/oxfam-americas-storytelling-platform-built-on-wagtail-cms/",
    "https://wagtail.org/blog/package-spotlight-wagtail-ai/",
    "https://wagtail.org/blog/package-spotlight-wagtailcharts/",
    "https://wagtail.org/blog/partnerships-and-community-manager/",
    "https://wagtail.org/blog/pathorg-a-wordpress-to-wagtail-migration-story-for-a-leader-in-global-health/",
    "https://wagtail.org/blog/pick-out-packages/",
    "https://wagtail.org/blog/progress-report-on-the-google-season-of-docs-for-the-month-of-june/",
    "https://wagtail.org/blog/prototyping-a-cli-for-wagtail/",
    "https://wagtail.org/blog/pycon-2024/",
    "https://wagtail.org/blog/pycon-us-2025-building-low-carbon-websites/",
    "https://wagtail.org/blog/pyconus-2025/",
    "https://wagtail.org/blog/recovering-deleted-pages-and-models/",
    "https://wagtail.org/blog/reduce-your-wagtail-and-django-carbon-footprint-for-earth-day/",
    "https://wagtail.org/blog/reflections-on-grid-aware-websites/",
    "https://wagtail.org/blog/resuming-wagtail-ui-team/",
    "https://wagtail.org/blog/rethinking-rich-text-pipelines-with-draft-js/",
    "https://wagtail.org/blog/reykjavik-2017/",
    "https://wagtail.org/blog/search-with-algolia/",
    "https://wagtail.org/blog/security-releases-272-and-281/",
    "https://wagtail.org/blog/speakers-for-wagtail-space-2026/",
    "https://wagtail.org/blog/state-of-wagtail-accessibility/",
    "https://wagtail.org/blog/streamfield-quick-demo/",
    "https://wagtail.org/blog/supported-versions-django-vs-fastapi-vs-laravel/",
    "https://wagtail.org/blog/syracuse-university-wordpress-to-wagtail-migration/",
    "https://wagtail.org/blog/take-look-wagtail-launch-event/",
    "https://wagtail.org/blog/team-meeting-notes-13th-january/",
    "https://wagtail.org/blog/team-meeting-notes-17th-february/",
    "https://wagtail.org/blog/team-meeting-notes-20th-january/",
    "https://wagtail.org/blog/team-meeting-notes-27th-january/",
    "https://wagtail.org/blog/team-meeting-notes-2nd-december/",
    "https://wagtail.org/blog/team-meeting-notes-3rd-february/",
    "https://wagtail.org/blog/team-meeting-notes-3rd-mar-2015/",
    "https://wagtail.org/blog/team-meeting-notes-6th-january/",
    "https://wagtail.org/blog/team-meeting-notes-9th-december/",
    "https://wagtail.org/blog/telepath/",
    "https://wagtail.org/blog/ten-tasty-ingredients-for-a-delicious-pull-request/",
    "https://wagtail.org/blog/the-1000-most-popular-django-packages/",
    "https://wagtail.org/blog/the-2025-state-of-djangos-top-packages/",
    "https://wagtail.org/blog/the-carbon-footprint-of-wagtail-ai/",
    "https://wagtail.org/blog/the-future-of-editing-in-wagtail/",
    "https://wagtail.org/blog/the-lessons-i-learned-during-my-google-season-of-docs-program/",
    "https://wagtail.org/blog/the-motley-fool/",
    "https://wagtail.org/blog/things-i-learned-during-my-outreachy-internship/",
    "https://wagtail.org/blog/to-wagtail-space-and-beyond-a-month-of-live-wagtail-events/",
    "https://wagtail.org/blog/towards-strict-csp-support-via-gsoc-2025/",
    "https://wagtail.org/blog/try-wagtail-without-coding/",
    "https://wagtail.org/blog/two-contributors-join-wagtail-for-google-summer-of-code-2024/",
    "https://wagtail.org/blog/two-years-of-the-wagtail-public-roadmap/",
    "https://wagtail.org/blog/up-next-on-the-roadmap/",
    "https://wagtail.org/blog/upgrading-to-wagtail-2/",
    "https://wagtail.org/blog/upgrading-wagtail/",
    "https://wagtail.org/blog/user-testing-for-wagtail-40/",
    "https://wagtail.org/blog/using-gatsby-wagtail-build-case-study/",
    "https://wagtail.org/blog/using-uv-for-installing-wagtail/",
    "https://wagtail.org/blog/uv-overtakes-pip-in-ci/",
    "https://wagtail.org/blog/uv-overtakes-poetry/",
    "https://wagtail.org/blog/wagtail-03-say-hello-edit-bird/",
    "https://wagtail.org/blog/wagtail-04/",
    "https://wagtail.org/blog/wagtail-05/",
    "https://wagtail.org/blog/wagtail-06-07-08and-counting/",
    "https://wagtail.org/blog/wagtail-1-2/",
    "https://wagtail.org/blog/wagtail-1-5/",
    "https://wagtail.org/blog/wagtail-1-7/",
    "https://wagtail.org/blog/wagtail-10-beta1/",
    "https://wagtail.org/blog/wagtail-10/",
    "https://wagtail.org/blog/wagtail-10b2/",
    "https://wagtail.org/blog/wagtail-2-4/",
    "https://wagtail.org/blog/wagtail-2-5/",
    "https://wagtail.org/blog/wagtail-2-7/",
    "https://wagtail.org/blog/wagtail-2-9/",
    "https://wagtail.org/blog/wagtail-2/",
    "https://wagtail.org/blog/wagtail-2024-carbon-footprint/",
    "https://wagtail.org/blog/wagtail-211-internationalisation-and-more/",
    "https://wagtail.org/blog/wagtail-216-and-upcoming-breaking-changes/",
    "https://wagtail.org/blog/wagtail-40/",
    "https://wagtail.org/blog/wagtail-42/",
    "https://wagtail.org/blog/wagtail-50/",
    "https://wagtail.org/blog/wagtail-51/",
    "https://wagtail.org/blog/wagtail-52/",
    "https://wagtail.org/blog/wagtail-6-0/",
    "https://wagtail.org/blog/wagtail-61/",
    "https://wagtail.org/blog/wagtail-62/",
    "https://wagtail.org/blog/wagtail-63/",
    "https://wagtail.org/blog/wagtail-64/",
    "https://wagtail.org/blog/wagtail-70/",
    "https://wagtail.org/blog/wagtail-71/",
    "https://wagtail.org/blog/wagtail-72/",
    "https://wagtail.org/blog/wagtail-73/",
    "https://wagtail.org/blog/wagtail-74/",
    "https://wagtail.org/blog/wagtail-80/",
    "https://wagtail.org/blog/wagtail-accessibility-in-2023-and-beyond/",
    "https://wagtail.org/blog/wagtail-accessibility-statistics-for-gaad-2023/",
    "https://wagtail.org/blog/wagtail-accessibility-statistics-for-gaad-2024/",
    "https://wagtail.org/blog/wagtail-accessibility-statistics-for-gaad-2025/",
    "https://wagtail.org/blog/wagtail-accessibility-statistics-for-gaad-2026/",
    "https://wagtail.org/blog/wagtail-ai-webinar/",
    "https://wagtail.org/blog/wagtail-api-how-customize-detail-url/",
    "https://wagtail.org/blog/wagtail-api-in-action-content-ops-with-deepseek-harness/",
    "https://wagtail.org/blog/wagtail-at-berkeley/",
    "https://wagtail.org/blog/wagtail-cms-accessibility-webinar/",
    "https://wagtail.org/blog/wagtail-cms-projects-for-google-summer-of-code-2022/",
    "https://wagtail.org/blog/wagtail-cms-projects-for-google-summer-of-code-2023/",
    "https://wagtail.org/blog/wagtail-developer-jobs-where-to-look/",
    "https://wagtail.org/blog/wagtail-has-over-20000-stars-now-on-github/",
    "https://wagtail.org/blog/wagtail-heroku-2017/",
    "https://wagtail.org/blog/wagtail-in-space/",
    "https://wagtail.org/blog/wagtail-in-the-windy-city/",
    "https://wagtail.org/blog/wagtail-nominated-for-two-cms-critic-awards/",
    "https://wagtail.org/blog/wagtail-package-maintainers-2025/",
    "https://wagtail.org/blog/wagtail-packages/",
    "https://wagtail.org/blog/wagtail-people-tim-heap/",
    "https://wagtail.org/blog/wagtail-security-gpgectomy/",
    "https://wagtail.org/blog/wagtail-space-2025-a-stellar-journey/",
    "https://wagtail.org/blog/wagtail-space-2025-is-a-go/",
    "https://wagtail.org/blog/wagtail-space-2026-cfp/",
    "https://wagtail.org/blog/wagtail-space-cleveland-2022/",
    "https://wagtail.org/blog/wagtail-space-minsk/",
    "https://wagtail.org/blog/wagtail-space-nl-2022-you-are-invited/",
    "https://wagtail.org/blog/wagtail-space-nl-2024-recap-productive-and-fun/",
    "https://wagtail.org/blog/wagtail-space-nl-2026-vibes-and-photos/",
    "https://wagtail.org/blog/wagtail-space-nl-2026/",
    "https://wagtail.org/blog/wagtail-space-nl-prep/",
    "https://wagtail.org/blog/wagtail-space-talk-ideas-2025/",
    "https://wagtail.org/blog/wagtail-space-talks-wed-love-to-see-in-2024/",
    "https://wagtail.org/blog/wagtail-space-us-2022/",
    "https://wagtail.org/blog/wagtail-space-us-2024-recap/",
    "https://wagtail.org/blog/wagtail-space-usa/",
    "https://wagtail.org/blog/wagtail-statement-on-webp-vulnerability/",
    "https://wagtail.org/blog/wagtail-tailwind-typography/",
    "https://wagtail.org/blog/wagtail-user-testers-wanted/",
    "https://wagtail.org/blog/wagtail-vision/",
    "https://wagtail.org/blog/wagtail-webinar-may-2025-highlights/",
    "https://wagtail.org/blog/wagtail-wrapped-2023/",
    "https://wagtail.org/blog/wagtail-wrapped-2024/",
    "https://wagtail.org/blog/wagtail-wrapped-2025/",
    "https://wagtail.org/blog/wagtailers-flocked-to-scotland-for-djangocon-europe-2023/",
    "https://wagtail.org/blog/wagtails-2025-carbon-footprint/",
    "https://wagtail.org/blog/wagtails-domain-migration/",
    "https://wagtail.org/blog/wagtails-first-hatch-backers/",
    "https://wagtail.org/blog/wagtails-new-developer-relations-team/",
    "https://wagtail.org/blog/what-ai-tools-get-right-and-wrong-with-wagtail/",
    "https://wagtail.org/blog/what-i-learned-from-two-days-of-hanging-out-with-ai-experts/",
    "https://wagtail.org/blog/what-our-ai-guiding-principles-actually-mean/",
    "https://wagtail.org/blog/what-we-can-learn-from-python-docs-analytics/",
    "https://wagtail.org/blog/whats-it-like-for-a-developer-moving-to-wagtail-from-drupal/",
    "https://wagtail.org/blog/whats-new-in-wagtail-cms-march-2024/",
    "https://wagtail.org/blog/whats-new-in-wagtail-episode-3/",
    "https://wagtail.org/blog/whats-new-in-wagtail-episode-4/",
    "https://wagtail.org/blog/whats-new-in-wagtail-episode-5/",
    "https://wagtail.org/blog/whats-new-in-wagtail-february-2026/",
    "https://wagtail.org/blog/whats-new-in-wagtail-is-back/",
    "https://wagtail.org/blog/whats-new-in-wagtail-march-2023/",
    "https://wagtail.org/blog/whats-new-in-wagtail-may-2022/",
    "https://wagtail.org/blog/whats-new-in-wagtail-may-2025/",
    "https://wagtail.org/blog/whats-new-in-wagtail-may-2026/",
    "https://wagtail.org/blog/whats-new-in-wagtail-oct-2024/",
    "https://wagtail.org/blog/whats-new-in-wagtail-sept-2023/",
    "https://wagtail.org/blog/where-were-at-for-google-summer-of-code-2022/",
    "https://wagtail.org/blog/why-pay-for-open-source/",
    "https://wagtail.org/blog/why-wagtail-new-editor-is-built-with-draft-js/",
    "https://wagtail.org/blog/why-were-tackling-technical-debt-in-wagtail-50/",
    "https://wagtail.org/blog/wordpress-to-wagtail-migration-kit/",
    "https://wagtail.org/blog/yougov/",
    "https://wagtail.org/business/",
    "https://wagtail.org/cdn-cgi/l/email-protection",
    "https://wagtail.org/charities-and-nonprofits/",
    "https://wagtail.org/code-of-conduct/",
    "https://wagtail.org/community-resources/",
    "https://wagtail.org/contact/",
    "https://wagtail.org/content-personalization/",
    "https://wagtail.org/cookie-policy/",
    "https://wagtail.org/core-team/",
    "https://wagtail.org/cultural-institutions/",
    "https://wagtail.org/digital-emissions/",
    "https://wagtail.org/education/",
    "https://wagtail.org/events/",
    "https://wagtail.org/faqs/",
    "https://wagtail.org/feature-index/",
    "https://wagtail.org/features/",
    "https://wagtail.org/get-help/",
    "https://wagtail.org/get-started/",
    "https://wagtail.org/government/",
    "https://wagtail.org/headless/",
    "https://wagtail.org/newsletter/",
    "https://wagtail.org/packages/",
    "https://wagtail.org/privacy/",
    "https://wagtail.org/product-strategy/",
    "https://wagtail.org/roadmap/",
    "https://wagtail.org/security/",
    "https://wagtail.org/services/",
    "https://wagtail.org/showcase/",
    "https://wagtail.org/showcase/?page=1&sector=All",
    "https://wagtail.org/showcase/?page=1&sector=Charities+and+nonprofits",
    "https://wagtail.org/showcase/?page=1&sector=Government+agencies",
    "https://wagtail.org/showcase/?page=2&sector=All",
    "https://wagtail.org/showcase/?page=2&sector=Charities+and+nonprofits",
    "https://wagtail.org/showcase/?page=2&sector=Government+agencies",
    "https://wagtail.org/showcase/?page=3&sector=All",
    "https://wagtail.org/showcase/?page=4&sector=All",
    "https://wagtail.org/showcase/?page=5&sector=All",
    "https://wagtail.org/showcase/?page=6&sector=All",
    "https://wagtail.org/showcase/?sector=Charities+and+nonprofits",
    "https://wagtail.org/showcase/?sector=Government+agencies",
    "https://wagtail.org/sponsor/",
    "https://wagtail.org/sustainability/",
    "https://wagtail.org/this-week-in-wagtail/",
    "https://wagtail.org/this-week-in-wagtail/?page=10",
    "https://wagtail.org/this-week-in-wagtail/?page=11",
    "https://wagtail.org/this-week-in-wagtail/?page=12",
    "https://wagtail.org/this-week-in-wagtail/?page=13",
    "https://wagtail.org/this-week-in-wagtail/?page=14",
    "https://wagtail.org/this-week-in-wagtail/?page=15",
    "https://wagtail.org/this-week-in-wagtail/?page=16",
    "https://wagtail.org/this-week-in-wagtail/?page=17",
    "https://wagtail.org/this-week-in-wagtail/?page=18",
    "https://wagtail.org/this-week-in-wagtail/?page=19",
    "https://wagtail.org/this-week-in-wagtail/?page=2",
    "https://wagtail.org/this-week-in-wagtail/?page=20",
    "https://wagtail.org/this-week-in-wagtail/?page=21",
    "https://wagtail.org/this-week-in-wagtail/?page=22",
    "https://wagtail.org/this-week-in-wagtail/?page=23",
    "https://wagtail.org/this-week-in-wagtail/?page=24",
    "https://wagtail.org/this-week-in-wagtail/?page=25",
    "https://wagtail.org/this-week-in-wagtail/?page=26",
    "https://wagtail.org/this-week-in-wagtail/?page=27",
    "https://wagtail.org/this-week-in-wagtail/?page=28",
    "https://wagtail.org/this-week-in-wagtail/?page=3",
    "https://wagtail.org/this-week-in-wagtail/?page=4",
    "https://wagtail.org/this-week-in-wagtail/?page=5",
    "https://wagtail.org/this-week-in-wagtail/?page=6",
    "https://wagtail.org/this-week-in-wagtail/?page=7",
    "https://wagtail.org/this-week-in-wagtail/?page=8",
    "https://wagtail.org/this-week-in-wagtail/?page=9",
    "https://wagtail.org/this-week-in-wagtail/issue-1/",
    "https://wagtail.org/this-week-in-wagtail/issue-10/",
    "https://wagtail.org/this-week-in-wagtail/issue-100/",
    "https://wagtail.org/this-week-in-wagtail/issue-101/",
    "https://wagtail.org/this-week-in-wagtail/issue-102/",
    "https://wagtail.org/this-week-in-wagtail/issue-103/",
    "https://wagtail.org/this-week-in-wagtail/issue-104/",
    "https://wagtail.org/this-week-in-wagtail/issue-105/",
    "https://wagtail.org/this-week-in-wagtail/issue-106/",
    "https://wagtail.org/this-week-in-wagtail/issue-107/",
    "https://wagtail.org/this-week-in-wagtail/issue-108/",
    "https://wagtail.org/this-week-in-wagtail/issue-109/",
    "https://wagtail.org/this-week-in-wagtail/issue-11/",
    "https://wagtail.org/this-week-in-wagtail/issue-110/",
    "https://wagtail.org/this-week-in-wagtail/issue-111/",
    "https://wagtail.org/this-week-in-wagtail/issue-112/",
    "https://wagtail.org/this-week-in-wagtail/issue-113/",
    "https://wagtail.org/this-week-in-wagtail/issue-114/",
    "https://wagtail.org/this-week-in-wagtail/issue-115/",
    "https://wagtail.org/this-week-in-wagtail/issue-116/",
    "https://wagtail.org/this-week-in-wagtail/issue-117/",
    "https://wagtail.org/this-week-in-wagtail/issue-118/",
    "https://wagtail.org/this-week-in-wagtail/issue-119/",
    "https://wagtail.org/this-week-in-wagtail/issue-12/",
    "https://wagtail.org/this-week-in-wagtail/issue-120/",
    "https://wagtail.org/this-week-in-wagtail/issue-121/",
    "https://wagtail.org/this-week-in-wagtail/issue-122/",
    "https://wagtail.org/this-week-in-wagtail/issue-123/",
    "https://wagtail.org/this-week-in-wagtail/issue-124/",
    "https://wagtail.org/this-week-in-wagtail/issue-125/",
    "https://wagtail.org/this-week-in-wagtail/issue-126/",
    "https://wagtail.org/this-week-in-wagtail/issue-127/",
    "https://wagtail.org/this-week-in-wagtail/issue-128/",
    "https://wagtail.org/this-week-in-wagtail/issue-129/",
    "https://wagtail.org/this-week-in-wagtail/issue-13/",
    "https://wagtail.org/this-week-in-wagtail/issue-130/",
    "https://wagtail.org/this-week-in-wagtail/issue-131/",
    "https://wagtail.org/this-week-in-wagtail/issue-132/",
    "https://wagtail.org/this-week-in-wagtail/issue-133/",
    "https://wagtail.org/this-week-in-wagtail/issue-134/",
    "https://wagtail.org/this-week-in-wagtail/issue-135/",
    "https://wagtail.org/this-week-in-wagtail/issue-136/",
    "https://wagtail.org/this-week-in-wagtail/issue-14/",
    "https://wagtail.org/this-week-in-wagtail/issue-15/",
    "https://wagtail.org/this-week-in-wagtail/issue-16/",
    "https://wagtail.org/this-week-in-wagtail/issue-17/",
    "https://wagtail.org/this-week-in-wagtail/issue-18/",
    "https://wagtail.org/this-week-in-wagtail/issue-19/",
    "https://wagtail.org/this-week-in-wagtail/issue-2/",
    "https://wagtail.org/this-week-in-wagtail/issue-20/",
    "https://wagtail.org/this-week-in-wagtail/issue-21/",
    "https://wagtail.org/this-week-in-wagtail/issue-22/",
    "https://wagtail.org/this-week-in-wagtail/issue-23/",
    "https://wagtail.org/this-week-in-wagtail/issue-24/",
    "https://wagtail.org/this-week-in-wagtail/issue-25/",
    "https://wagtail.org/this-week-in-wagtail/issue-26/",
    "https://wagtail.org/this-week-in-wagtail/issue-27/",
    "https://wagtail.org/this-week-in-wagtail/issue-28/",
    "https://wagtail.org/this-week-in-wagtail/issue-29/",
    "https://wagtail.org/this-week-in-wagtail/issue-3/",
    "https://wagtail.org/this-week-in-wagtail/issue-30/",
    "https://wagtail.org/this-week-in-wagtail/issue-31/",
    "https://wagtail.org/this-week-in-wagtail/issue-32/",
    "https://wagtail.org/this-week-in-wagtail/issue-33/",
    "https://wagtail.org/this-week-in-wagtail/issue-34/",
    "https://wagtail.org/this-week-in-wagtail/issue-35/",
    "https://wagtail.org/this-week-in-wagtail/issue-36/",
    "https://wagtail.org/this-week-in-wagtail/issue-37/",
    "https://wagtail.org/this-week-in-wagtail/issue-38/",
    "https://wagtail.org/this-week-in-wagtail/issue-39/",
    "https://wagtail.org/this-week-in-wagtail/issue-4/",
    "https://wagtail.org/this-week-in-wagtail/issue-40/",
    "https://wagtail.org/this-week-in-wagtail/issue-41/",
    "https://wagtail.org/this-week-in-wagtail/issue-42/",
    "https://wagtail.org/this-week-in-wagtail/issue-43/",
    "https://wagtail.org/this-week-in-wagtail/issue-44/",
    "https://wagtail.org/this-week-in-wagtail/issue-45/",
    "https://wagtail.org/this-week-in-wagtail/issue-46/",
    "https://wagtail.org/this-week-in-wagtail/issue-47/",
    "https://wagtail.org/this-week-in-wagtail/issue-48/",
    "https://wagtail.org/this-week-in-wagtail/issue-49/",
    "https://wagtail.org/this-week-in-wagtail/issue-5/",
    "https://wagtail.org/this-week-in-wagtail/issue-50/",
    "https://wagtail.org/this-week-in-wagtail/issue-51/",
    "https://wagtail.org/this-week-in-wagtail/issue-52/",
    "https://wagtail.org/this-week-in-wagtail/issue-53/",
    "https://wagtail.org/this-week-in-wagtail/issue-54/",
    "https://wagtail.org/this-week-in-wagtail/issue-55/",
    "https://wagtail.org/this-week-in-wagtail/issue-56/",
    "https://wagtail.org/this-week-in-wagtail/issue-57/",
    "https://wagtail.org/this-week-in-wagtail/issue-58/",
    "https://wagtail.org/this-week-in-wagtail/issue-59/",
    "https://wagtail.org/this-week-in-wagtail/issue-6/",
    "https://wagtail.org/this-week-in-wagtail/issue-60/",
    "https://wagtail.org/this-week-in-wagtail/issue-61/",
    "https://wagtail.org/this-week-in-wagtail/issue-62/",
    "https://wagtail.org/this-week-in-wagtail/issue-63/",
    "https://wagtail.org/this-week-in-wagtail/issue-64/",
    "https://wagtail.org/this-week-in-wagtail/issue-65/",
    "https://wagtail.org/this-week-in-wagtail/issue-66/",
    "https://wagtail.org/this-week-in-wagtail/issue-67/",
    "https://wagtail.org/this-week-in-wagtail/issue-68/",
    "https://wagtail.org/this-week-in-wagtail/issue-69/",
    "https://wagtail.org/this-week-in-wagtail/issue-7/",
    "https://wagtail.org/this-week-in-wagtail/issue-70/",
    "https://wagtail.org/this-week-in-wagtail/issue-71/",
    "https://wagtail.org/this-week-in-wagtail/issue-72/",
    "https://wagtail.org/this-week-in-wagtail/issue-73/",
    "https://wagtail.org/this-week-in-wagtail/issue-74/",
    "https://wagtail.org/this-week-in-wagtail/issue-75/",
    "https://wagtail.org/this-week-in-wagtail/issue-76/",
    "https://wagtail.org/this-week-in-wagtail/issue-77/",
    "https://wagtail.org/this-week-in-wagtail/issue-78/",
    "https://wagtail.org/this-week-in-wagtail/issue-79/",
    "https://wagtail.org/this-week-in-wagtail/issue-8/",
    "https://wagtail.org/this-week-in-wagtail/issue-80/",
    "https://wagtail.org/this-week-in-wagtail/issue-81/",
    "https://wagtail.org/this-week-in-wagtail/issue-82/",
    "https://wagtail.org/this-week-in-wagtail/issue-83/",
    "https://wagtail.org/this-week-in-wagtail/issue-84/",
    "https://wagtail.org/this-week-in-wagtail/issue-85/",
    "https://wagtail.org/this-week-in-wagtail/issue-86/",
    "https://wagtail.org/this-week-in-wagtail/issue-87/",
    "https://wagtail.org/this-week-in-wagtail/issue-88/",
    "https://wagtail.org/this-week-in-wagtail/issue-89/",
    "https://wagtail.org/this-week-in-wagtail/issue-9/",
    "https://wagtail.org/this-week-in-wagtail/issue-90/",
    "https://wagtail.org/this-week-in-wagtail/issue-91/",
    "https://wagtail.org/this-week-in-wagtail/issue-92/",
    "https://wagtail.org/this-week-in-wagtail/issue-93/",
    "https://wagtail.org/this-week-in-wagtail/issue-94/",
    "https://wagtail.org/this-week-in-wagtail/issue-95/",
    "https://wagtail.org/this-week-in-wagtail/issue-96/",
    "https://wagtail.org/this-week-in-wagtail/issue-97/",
    "https://wagtail.org/this-week-in-wagtail/issue-98/",
    "https://wagtail.org/this-week-in-wagtail/issue-99/",
    "https://wagtail.org/wagtail-ai/",
    "https://wagtail.org/wagtail-localize/",
    "https://wagtail.org/wagtail-newsletter/",
    "https://wagtail.org/wagtail-space-2025/",
    "https://wagtail.org/wagtail-space-2025/about-wagtail-space-2025/",
    "https://wagtail.org/wagtail-space-2025/about-wagtail-space-2025/index.html/",
    "https://wagtail.org/wagtail-space-2025/code-of-conduct/",
    "https://wagtail.org/wagtail-space-2025/code-of-conduct/index.html/",
    "https://wagtail.org/wagtail-space-2025/faq/",
    "https://wagtail.org/wagtail-space-2025/faq/index.html/",
    "https://wagtail.org/wagtail-space-2025/index.html/",
    "https://wagtail.org/wagtail-space-2025/schedule/",
    "https://wagtail.org/wagtail-space-2025/schedule/index.html/",
    "https://wagtail.org/wagtail-space-2025/speakers/",
    "https://wagtail.org/wagtail-space-2025/speakers/index.html/",
    "https://wagtail.org/wagtail-space-2025/speaking/",
    "https://wagtail.org/wagtail-space-2025/speaking/index.html/",
    "https://wagtail.org/wagtail-space-2025/sponsors/",
    "https://wagtail.org/wagtail-space-2025/sponsors/index.html/",
    "https://wagtail.org/wagtail-space-2025/sponsorship-opportunities/",
    "https://wagtail.org/wagtail-space-2025/sponsorship-opportunities/index.html/",
    "https://wagtail.org/wagtail-space-2025/terms-and-conditions/",
    "https://wagtail.org/wagtail-space-2025/terms-and-conditions/index.html/",
    "https://wagtail.org/wagtail-space-2026/",
    "https://wagtail.org/wagtail-space-2026/about-wagtail-space-2026/",
    "https://wagtail.org/wagtail-space-2026/code-of-conduct/",
    "https://wagtail.org/wagtail-space-2026/faq/",
    "https://wagtail.org/wagtail-space-2026/schedule/",
    "https://wagtail.org/wagtail-space-2026/speakers/",
    "https://wagtail.org/wagtail-space-2026/sponsors/",
    "https://wagtail.org/wagtail-space-2026/sponsorship-opportunities/",
    "https://wagtail.org/wagtail-space-2026/terms-and-conditions/",
    "https://wagtail.org/wagtail-vs-drupal/",
    "https://wagtail.org/wagtail-vs-wordpress/",
    "https://wagtail.org/who-uses-wagtail/"
  ],
  "findings": [
    {
      "rule": "color-contrast",
      "wcag": "1.4.3 AA",
      "severity": "serious",
      "location": "https://wagtail.org/blog/wagtail-10b2/ .codehilite .nv",
      "summary": "Syntax-highlighted variables have insufficient text contrast against the code background.",
      "fix": "Update syntax token colors in wagtailio/static/sass/vendor/_code-highlighting.scss (including .nv at line 58 and .vc/.vg/.vi at lines 77–79) to reach 4.5:1 against their actual light and dark code backgrounds; verify all token classes.",
      "evidence": "Rendered .nv text “wagtail”: #bb60d5 on #f5f5f5, 3.35:1, normal 17px. Screenshot: screenshots/audit-2026-10-16/syntax-code-contrast.png. Source: wagtailio/static/sass/vendor/_code-highlighting.scss:58.",
      "component": "Syntax-highlighted code blocks",
      "foundBy": [
        "reviewed-axe-scan"
      ]
    },
    {
      "rule": "frame-title",
      "wcag": "4.1.2 A",
      "severity": "serious",
      "confidence": "high",
      "location": "https://wagtail.org/blog/why-pay-for-open-source/ iframe",
      "summary": "Embedded media frames lack accessible names on multiple blog pages.",
      "fix": "Give every embedded iframe a concise title naming its content, for example title=\"Why pay for open source? — video\". Review stored Wagtail embed HTML and the embed/video StreamField rendering; refresh cached embeds where necessary. Keep each title specific to its content.",
      "evidence": "axe-core found 19 unnamed frames across 16 pages. The representative YouTube iframe has no title, aria-label or aria-labelledby. All URLs, selectors and screenshots are indexed in .a11y-history/2026-10-16/evidence/axe-instances.csv.",
      "component": "Embedded media",
      "foundBy": [
        "reviewed-axe-scan"
      ]
    },
    {
      "rule": "HTML-LANG-001",
      "wcag": "3.1.1 A",
      "severity": "serious",
      "location": "wagtailio/newsletter/templates/newsletter/newsletter_page.html:3",
      "summary": "Archived newsletter pages do not declare their primary language, preventing reliable screen-reader pronunciation.",
      "fix": "Add lang=\"en\" to the standalone newsletter template's html element (and xml:lang=\"en\" if retaining XHTML serialization). Verify archived issues and email output after rendering.",
      "evidence": "Live /this-week-in-wagtail/issue-1/ renders <html xmlns=\"http://www.w3.org/1999/xhtml\"> without lang. Rendered axe scans confirm the omission on all 136 distinct newsletter issue pages; earlier source inventory counted 138 URL variants.",
      "component": "Archived newsletter template",
      "foundBy": [
        "reviewed-axe-scan"
      ]
    },
    {
      "rule": "link-in-text-block",
      "wcag": "1.4.1 A",
      "severity": "serious",
      "location": "https://wagtail.org/packages/ .overview__description-link",
      "summary": "Inline package-directory links rely on a low-contrast color difference to distinguish them from surrounding text.",
      "fix": "Restore a persistent underline to .overview__description-link in wagtailio/static/sass/components/_overview.scss:54–61; retain clear hover and keyboard focus indicators. Apply the change to every package category description.",
      "evidence": "Runtime: link #262626, surrounding text #5c5c5c, contrast 2.26:1; both font-weight 400; text-decoration:none; no pseudo-element cues. Screenshot: screenshots/audit-2026-10-16/packages-link-distinction.png.",
      "component": "Package directory overview descriptions",
      "foundBy": [
        "reviewed-axe-scan"
      ]
    },
    {
      "rule": "link-name",
      "wcag": "2.4.4 A",
      "severity": "serious",
      "location": "https://wagtail.org/this-week-in-wagtail/?page=7 .blog-post--small; https://wagtail.org/this-week-in-wagtail/?page=11 .blog-post--small",
      "summary": "Three newsletter listing cards expose focusable links with no accessible name.",
      "fix": "Review card rendering in wagtailio/newsletter/templates/newsletter/newsletter_index_page.html:56 and the affected newsletter content; ensure each resulting anchor contains the issue title. Avoid nested links in card content and provide a reliable title fallback. Verify issues 106, 105 and 83 in the rendered DOM.",
      "evidence": "Browser axe confirms empty .blog-post.blog-post--small anchors to issues 106 and 105 on page=7 and issue 83 on page=11. Raw: 02f3fcf6749b5d84.json and f6af1208408930a7.json; corresponding screenshot basenames 02f3fcf6749b5d84.jpg and f6af1208408930a7.jpg.",
      "component": "Newsletter index cards",
      "foundBy": [
        "reviewed-axe-scan"
      ]
    },
    {
      "rule": "link-name",
      "wcag": "2.4.4 A",
      "severity": "serious",
      "confidence": "high",
      "location": "https://wagtail.org/this-week-in-wagtail/issue-3/ p:nth-child(10) > a",
      "summary": "Empty links in two archived newsletter issues have no accessible name.",
      "fix": "Remove the unintended empty anchors from issues 3 and 6. If any link is intended to remain, supply meaningful visible link text describing the destination and verify its focus appearance. Do not retain invisible links solely by adding an aria-label.",
      "evidence": "4 empty href-bearing anchors on 2 pages: two in issue 3 and two in issue 6. Captured markup has no text, images, title or ARIA name. See axe-instances.csv for selectors and screenshots.",
      "component": "Archived newsletter editorial HTML",
      "foundBy": [
        "reviewed-axe-scan"
      ]
    },
    {
      "rule": "SHADOW-FAVORITE-NAME-001",
      "wcag": "4.1.2 A",
      "severity": "serious",
      "location": "https://wagtail.org/wagtail-space-2026/schedule/ — pretalx-schedule shadow root button.btn-fav-container",
      "summary": "Schedule favorite buttons have no accessible name or exposed selected state.",
      "fix": "In the pretalx widget renderer, give each favorite button a name including its session title and expose toggle state with aria-pressed, or update its action name between Add and Remove favorite. Hide the star SVG from assistive technology. Provide an accessible schedule alternative while awaiting an upstream fix.",
      "evidence": "Settled widgets contain 28 unnamed favorite buttons in 2026 and 31 in 2025. Chromium snapshot exposes only button > img. Space activates the first star and changes its SVG class, but no name or pressed state is exposed.",
      "component": "External pretalx schedule widget",
      "foundBy": [
        "reviewed-axe-scan"
      ]
    },
    {
      "rule": "ARIA-DIALOG-NAME-001",
      "wcag": "4.1.2 A",
      "severity": "moderate",
      "location": "wagtailio/project_styleguide/templates/patterns/includes/search-modal.html:3",
      "summary": "The open desktop search dialog has no accessible name, so its purpose is not announced when users enter it.",
      "fix": "Give the role=dialog container an accessible name: add a Search heading with a unique id and reference it with aria-labelledby, or add aria-label=\"Search\". Keep the existing input and close-button labels, and verify the opened dialog in the accessibility tree.",
      "evidence": "Live homepage: activate [data-site-search-desktop]. Chromium snapshot begins \"- dialog:\" with no name; markup is <div class=\"modal__container\" role=\"dialog\" aria-modal=\"true\">. Targeted axe reports aria-dialog-name. Screenshot: screenshots/audit-2026-10-16/aria-unnamed-search-dialog.png.",
      "component": "Shared desktop search dialog",
      "foundBy": [
        "reviewed-axe-scan"
      ]
    },
    {
      "rule": "SHADOW-AVATAR-ALT-001",
      "wcag": "1.1.1 A",
      "severity": "moderate",
      "location": "https://wagtail.org/wagtail-space-2026/schedule/ — pretalx-schedule shadow root .avatars img",
      "summary": "Speaker portrait images in embedded schedules lack alt attributes, creating unnamed graphics among session details.",
      "fix": "Render these portraits with alt=\"\" when the adjacent speaker name already identifies the person. Supply meaningful alt only when the portrait conveys additional information. Apply the fix inside the widget renderer or provide an accessible schedule alternative.",
      "evidence": "26 missing-alt portrait images in the 2026 schedule and 29 in 2025 remain after loading. Example: <img src=\"https://pretalx.com/media/avatars/NWSRRS_mfIrUuC_thumbnail_tiny.webp\"> beside Thibaud Colas. Snapshot exposes img despite the adjacent name.",
      "component": "External pretalx schedule widget",
      "foundBy": [
        "reviewed-axe-scan"
      ]
    },
    {
      "rule": "SHADOW-TAB-RELATION-001",
      "wcag": "4.1.2 A",
      "severity": "moderate",
      "location": "https://wagtail.org/wagtail-space-2026/schedule/ — pretalx-schedule shadow root [role=tab]",
      "summary": "Schedule date tabs reference nonexistent panels, while the exposed tabpanel is empty.",
      "fix": "If these controls navigate to dates in one continuous schedule, use labelled anchor links to actual day sections instead of tab roles. Otherwise implement real labelled tabpanels in the same shadow root and connect each tab to its panel with valid IDs and consistent selection states.",
      "evidence": "All three aria-controls date IDs are absent from the shadow root on both schedules. The only role=tabpanel is an empty <div class=\"bunt-tabs-body\" role=\"tabpanel\" tabindex=\"0\"></div>; sessions appear outside it.",
      "component": "External pretalx schedule widget",
      "foundBy": [
        "reviewed-axe-scan"
      ]
    },
    {
      "rule": "SHADOW-TIMEZONE-LABEL-001",
      "wcag": "4.1.2 A",
      "severity": "moderate",
      "location": "https://wagtail.org/wagtail-space-2025/schedule/ — pretalx-schedule shadow root input[name=timezone]",
      "summary": "The 2025 schedule timezone field has no accessible name.",
      "fix": "Add a visible Time zone label with a matching input id inside the same shadow root, or provide aria-label=\"Time zone\". Keep the current timezone value separate from the field name and verify selection semantics.",
      "evidence": "Settled snapshot exposes textbox: UTC without a name. Markup is <input type=\"text\" name=\"timezone\" autocomplete=\"off\">; adjacent <label for=\"timezone\"></label> is empty and the input has no id.",
      "component": "External pretalx schedule widget",
      "foundBy": [
        "reviewed-axe-scan"
      ]
    }
  ],
  "passed": [
    "Automated rule aria-allowed-attr: passed on 598 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.",
    "Automated rule aria-conditional-attr: passed on 598 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.",
    "Automated rule aria-deprecated-role: passed on 26 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.",
    "Automated rule aria-hidden-body: passed on 735 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.",
    "Automated rule aria-hidden-focus: passed on 598 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.",
    "Automated rule aria-prohibited-attr: passed on 598 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.",
    "Automated rule aria-required-attr: passed on 26 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.",
    "Automated rule aria-required-children: passed on 2 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.",
    "Automated rule aria-required-parent: passed on 2 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.",
    "Automated rule aria-roles: passed on 26 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.",
    "Automated rule aria-tab-name: passed on 2 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.",
    "Automated rule aria-valid-attr: passed on 598 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.",
    "Automated rule autocomplete-valid: passed on 598 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.",
    "Automated rule avoid-inline-spacing: passed on 2 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.",
    "Automated rule bypass: passed on 735 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.",
    "Automated rule document-title: passed on 735 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.",
    "Automated rule duplicate-id-aria: passed on 598 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.",
    "Automated rule form-field-multiple-labels: passed on 598 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.",
    "Automated rule frame-title-unique: passed on 35 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.",
    "Automated rule html-lang-valid: passed on 599 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.",
    "Automated rule input-button-name: passed on 28 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.",
    "Automated rule label-content-name-mismatch: passed on 26 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.",
    "Automated rule list: passed on 735 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.",
    "Automated rule listitem: passed on 735 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.",
    "Automated rule meta-viewport: passed on 735 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.",
    "Automated rule nested-interactive: passed on 735 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.",
    "Automated rule select-name: passed on 13 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.",
    "Automated rule summary-name: passed on 1 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.",
    "Automated rule target-size: passed on 735 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.",
    "Automated rule td-headers-attr: passed on 138 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim.",
    "Automated rule th-has-data-cells: passed on 2 applicable URL scans; no violation or incomplete result for this rule in the same-site scan. This is a rule result, not a whole-criterion conformance claim."
  ],
  "notes": [
    {
      "skill": "reviewed-axe-scan",
      "note": "This is the reviewed automated-scan report. It groups confirmed automated findings by shared cause and uses specialist-reviewed severity. The combined audit also includes keyboard and source-review findings absent here."
    },
    {
      "skill": "reviewed-axe-scan",
      "note": "The full crawl covered 735 same-site URL requests: 708 distinct successful HTML destinations and 14 distinct error-page destinations. Initial scans used 1440×1000 and reduced motion; opened-dialog and settled-widget checks supplemented initial page states."
    },
    {
      "skill": "reviewed-axe-scan",
      "note": "Raw scanner output records 879 node instances on 193 URL scans, including 192 successful pages and one edge-generated error page. These raw counts include warnings excluded after review. See axe-instances.csv for original rule, impact, markup, selector and screenshot."
    },
    {
      "skill": "reviewed-axe-scan",
      "note": "Excluded from confirmed findings: 39 invalid aria-controls references on passive feature-index containers, and one link-style warning in the Cloudflare email-protection error response. Schedule severities were reviewed against observed behavior rather than copied from axe critical labels."
    },
    {
      "skill": "reviewed-axe-scan",
      "note": "Incomplete results remain in axe-needs-review.csv. Static HTML checks do not cover later shadow-root content; schedule findings were verified after its data loaded. Cross-origin embedded-player contents and media alternatives were not exhaustively tested."
    },
    {
      "skill": "reviewed-axe-scan",
      "note": "The search-dialog naming finding was verified with targeted opened-state axe and an accessibility-tree snapshot, supplementing the initial-page crawl."
    },
    {
      "skill": "reviewed-axe-scan",
      "note": "Scores are renderer heuristics dependent on report scope and passed-check counts. Do not compare these scores across the combined, PDF and automated-only reports, or interpret them as a percentage of WCAG conformance."
    },
    {
      "skill": "reviewed-axe-scan",
      "note": "Tool versions: axe-core 4.14.0; Playwright 1.64.1; Chromium 152.0.7977.82. Tags: wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa."
    }
  ],
  "counts": {
    "critical": 0,
    "serious": 7,
    "moderate": 4,
    "minor": 0
  },
  "components": [
    {
      "component": "External pretalx schedule widget",
      "count": 4,
      "worst": "serious",
      "rules": [
        "SHADOW-AVATAR-ALT-001",
        "SHADOW-FAVORITE-NAME-001",
        "SHADOW-TAB-RELATION-001",
        "SHADOW-TIMEZONE-LABEL-001"
      ]
    }
  ],
  "score": 80,
  "grade": "B",
  "penalty": 43,
  "checks": 42,
  "generated": "2026-10-16",
  "template": "web"
}
```
