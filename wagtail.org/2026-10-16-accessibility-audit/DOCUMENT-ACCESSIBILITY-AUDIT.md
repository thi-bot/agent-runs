# Document Accessibility Audit

Publication copy: includes the 20 individually referenced, optimized screenshots. [Run context and scope](README.md) · [Browse screenshots](SCREENSHOTS.md). Other historical evidence paths refer to the original audit workspace and are not included in this subset.

Product strategy PDF: all 11 pages reviewed structurally and visually. Native screen-reader reading and veraPDF validation remain outstanding.

**1 confirmed WCAG finding and 2 separate technical findings.** Target: WCAG 2.2 AA. The score and severity threshold below are renderer heuristics, not a conformance claim; any confirmed WCAG failure still requires remediation.

Related reports: [WEB-ACCESSIBILITY-AUDIT.md](WEB-ACCESSIBILITY-AUDIT.md) · [ACCESSIBILITY-SCAN.md](ACCESSIBILITY-SCAN.md). [Findings CSV](ACCESSIBILITY-FINDINGS.csv).

[Page coverage](evidence/page-coverage.csv) · [Raw axe instances](evidence/axe-instances.csv) · [Checks needing review](evidence/axe-needs-review.csv) · [Screenshot index](evidence/screenshot-index.csv)

An audit of documents, run on 2026-10-16. Read the executive summary for the verdict, the priorities section for what to do first, and the findings tables for detail.

## Metadata

What was audited, with what, and under which settings.

| Field | Value |
|---|---|
| Date | 2026-10-16 |
| Scope | 2 items |
| Skills run | pdf-accessibility |
| Tooling | Poppler pdfinfo/pdftotext/pdffonts; pypdf; PyMuPDF; accessibility-agents baseline PDF scanner. veraPDF unavailable. |
| Scan configuration | defaults, no config file found |
| Checks counted | 13 |

Audited:

- `.a11y-history/2026-10-16/documents/Wagtail_Product_Strategy_2026_v1.0.pdf — all 11 pages`
- `https://media.wagtail.org/documents/Wagtail_Product_Strategy_2026_v1.0.pdf`

## Executive summary

Severity threshold passed: no critical or serious findings. Confirmed moderate WCAG findings still need remediation.

The headline numbers for this run.

| Measure | Value |
|---|---|
| Score | 92 out of 100 |
| Grade | A |
| Findings | 3 |
| Blocking (critical plus serious) | 0 |
| Severity threshold | Pass |

## Severity breakdown

Counts by severity, highest impact first.

| Severity | Count | What it means |
|---|---:|---|
| critical | 0 | Blocks a person from completing the task |
| serious | 0 | Major barrier with a difficult workaround |
| moderate | 2 | Real friction, workaround exists |
| minor | 1 | Noticeable but rarely blocking |

## Findings

3 findings, ordered by severity then by rule.

### Moderate (2)

Each row names the rule, the criterion it fails, where it is, and what to change.

| Rule | WCAG | Location | Problem | Fix |
|---|---|---|---|---|
| `PDF-TAGS-001` | 1.3.1 A | .a11y-history/2026-10-16/documents/Wagtail_Product_Strategy_2026_v1.0.pdf — page 1, version/date header | The meaningful version and publication date are omitted from the PDF's tagged reading structure. | In Acrobat Pro, open Accessibility Tags and Reading Order, select 'Version 1.0, June 2026', and tag it as a paragraph before the title. Verify it appears in the tag reading order. Preserve this information in the source document's main content before future exports. |
| `PDFUA-LIST-001` | n/a | .a11y-history/2026-10-16/documents/Wagtail_Product_Strategy_2026_v1.0.pdf — lists on pages 3–10 | PDF/UA technical check: list item labels and bodies are not represented with the expected Lbl and LBody structure. | In Acrobat Pro's Accessibility Tags panel, organize each list item as LI containing Lbl for its number or bullet and LBody for its content; preserve continuation content across pages. Then validate with veraPDF and test list navigation in a screen reader. Repair the source export process for future editions. |

### Minor (1)

Each row names the rule, the criterion it fails, where it is, and what to change.

| Rule | WCAG | Location | Problem | Fix |
|---|---|---|---|---|
| `PDFUA-LANG-001` | n/a | .a11y-history/2026-10-16/documents/Wagtail_Product_Strategy_2026_v1.0.pdf — document catalog /Lang | PDF technical check: the document language uses an underscore instead of a valid hyphenated language tag. | In Acrobat Pro, open Document Properties > Advanced > Reading Options and set Language to English (United Kingdom); verify the saved catalog uses en-GB. Confirm pronunciation with a screen reader and validate the language entry with veraPDF. |

## Remediation priorities

Prioritize components with multiple findings. Shared-template repairs can address repeated instances; distinct findings may require separate changes.

| Component | Instances | Worst severity | Rules |
|---|---:|---|---|
| Product strategy PDF | 3 | moderate | `PDF-TAGS-001`, `PDFUA-LANG-001`, `PDFUA-LIST-001` |

The remaining 3 moderate and minor findings can follow in normal work.

## What passed

10 checks ran and found nothing.

- A meaningful document title is set and ViewerPreferences DisplayDocTitle is true.
- All 11 pages contain selectable, extractable text; this is not an image-only PDF.
- All four fonts are embedded and have Unicode mappings; Poppler and PyMuPDF extract readable prose.
- Every page sets Tabs to S, using structure order for annotation navigation.
- Fifteen hierarchical bookmarks match the document's headings and destinations.
- No figures, images, tables, form fields, encryption, or JavaScript were found; figure alternatives, table headers and form labeling are not applicable.
- Rendered all pages and visually reviewed the complete document; its single-column sequence, headings, lists and page continuations are coherent.
- Text colors measured against the white background pass AA: #484848 is 9.15:1; #1155CC links are 6.57:1 and also underlined.
- The document has StructTreeRoot, MarkInfo Marked=true and semantic paragraph, heading, list and link tags.
- The five link annotations are represented by five Link tags with descriptive text: WCAG, ATAG, Web Sustainability Guidelines, Zen of Wagtail, and OWASP Top 10.

## Needs a human

Items a skill could not decide, or could not check automatically.

- **pdf-accessibility**: Reviewed on 2026-10-16 using Poppler pdfinfo/pdftotext/pdffonts, pypdf, PyMuPDF and the accessibility-agents baseline PDF scanner. No PDF scan configuration was present. The document is 11 pages, PDF 1.4, produced by Skia/PDF m151 Google Docs Renderer.
- **pdf-accessibility**: The baseline MCP scanner incorrectly reported no text content. That finding was rejected because two independent extractors and direct content-stream inspection demonstrate real text on every page. Do not recommend OCR for this file.
- **pdf-accessibility**: Poppler's pdfinfo -struct-text output truncates some paragraphs and list items after nested ActualText spans. Direct content-stream inspection shows the surrounding MCID remains present; these extraction limitations were not misreported as omitted body content.
- **pdf-accessibility**: WCAG findings and PDF/UA technical observations are explicitly separated using wcag=n/a for the latter. No claim of PDF/UA conformance is made. There is no XMP metadata or PDF/UA identification entry; adding a conformance identifier alone would not establish conformance.
- **pdf-accessibility**: veraPDF and Java were unavailable. Run veraPDF PDF/UA-1 validation after repairs and conduct an Acrobat/Reader screen-reader reading and list-navigation test; those checks remain outstanding.
- **pdf-accessibility**: Evidence files: .a11y-history/2026-10-16/evidence/product-strategy.txt, product-strategy-tags.txt, product-strategy-structure.json, and pdf-page-1-content.txt. All page renders are saved as [product-strategy-page-01.png](screenshots/audit-2026-10-16/product-strategy-page-01.png) through product-strategy-page-11.png.
- **pdf-accessibility**: List-structure reference: [PDF Association Tagged PDF Best Practice Guide](https://pdfa.org/wp-content/uploads/2023/07/Tagged-PDF-Best-Practice-Guide.pdf). Language syntax reference: [RFC 3066](https://www.rfc-editor.org/rfc/rfc3066.html). WCAG language context: [W3C Understanding 3.1.1](https://www.w3.org/WAI/WCAG21/Understanding/language-of-page).
- **pdf-accessibility**: The PDF and application source were not modified.

## Next steps

1. Keep the current checks in continuous integration so this does not regress.
2. Re-audit when the interface changes materially, or quarterly.
3. Confirm the automated result with a manual screen reader and keyboard pass.

Automated checks find a minority of accessibility barriers. A passing score is a floor, not a guarantee.

## Evidence by finding

Evidence retained from the specialist review; full screenshots and measurements are linked in the evidence index.

| # | Rule | Location | Observed evidence |
|---:|---|---|---|
| 1 | PDF-TAGS-001 | .a11y-history/2026-10-16/documents/Wagtail_Product_Strategy_2026_v1.0.pdf — page 1, version/date header | Page 1 visibly says 'Version 1.0, June 2026'. Content-stream inspection decodes this text outside every marked-content sequence; the tag tree starts with the title. Evidence: product-strategy-structure.json; screenshot: screenshots/audit-2026-10-16/product-strategy-page-01.png. |
| 2 | PDFUA-LIST-001 | .a11y-history/2026-10-16/documents/Wagtail_Product_Strategy_2026_v1.0.pdf — lists on pages 3–10 | Structure traversal finds 10 L elements and 37 LI elements, but zero Lbl and only one LBody. For example, page 3's first LI directly references MCID 4 instead of containing label/body elements. PDF/UA technical issue; no separate WCAG failure or screen-reader omission is inferred. |
| 3 | PDFUA-LANG-001 | .a11y-history/2026-10-16/documents/Wagtail_Product_Strategy_2026_v1.0.pdf — document catalog /Lang | The catalog contains /Lang (en_GB); RFC language-tag syntax uses hyphens, so the expected value is en-GB. No structure element supplies an alternate language. Reader-specific speech consequences were not tested, so this is recorded as a technical issue rather than a confirmed WCAG 3.1.1 failure. |

## Findings data

The merged findings, embedded so the next run can compute a delta without parsing this document.

```json a11y-findings
{
  "skills": [
    "pdf-accessibility"
  ],
  "scope": [
    ".a11y-history/2026-10-16/documents/Wagtail_Product_Strategy_2026_v1.0.pdf — all 11 pages",
    "https://media.wagtail.org/documents/Wagtail_Product_Strategy_2026_v1.0.pdf"
  ],
  "findings": [
    {
      "rule": "PDF-TAGS-001",
      "wcag": "1.3.1 A",
      "severity": "moderate",
      "location": ".a11y-history/2026-10-16/documents/Wagtail_Product_Strategy_2026_v1.0.pdf — page 1, version/date header",
      "summary": "The meaningful version and publication date are omitted from the PDF's tagged reading structure.",
      "fix": "In Acrobat Pro, open Accessibility Tags and Reading Order, select 'Version 1.0, June 2026', and tag it as a paragraph before the title. Verify it appears in the tag reading order. Preserve this information in the source document's main content before future exports.",
      "evidence": "Page 1 visibly says 'Version 1.0, June 2026'. Content-stream inspection decodes this text outside every marked-content sequence; the tag tree starts with the title. Evidence: product-strategy-structure.json; screenshot: screenshots/audit-2026-10-16/product-strategy-page-01.png.",
      "component": "Product strategy PDF",
      "foundBy": [
        "pdf-accessibility"
      ]
    },
    {
      "rule": "PDFUA-LIST-001",
      "wcag": "n/a",
      "severity": "moderate",
      "location": ".a11y-history/2026-10-16/documents/Wagtail_Product_Strategy_2026_v1.0.pdf — lists on pages 3–10",
      "summary": "PDF/UA technical check: list item labels and bodies are not represented with the expected Lbl and LBody structure.",
      "fix": "In Acrobat Pro's Accessibility Tags panel, organize each list item as LI containing Lbl for its number or bullet and LBody for its content; preserve continuation content across pages. Then validate with veraPDF and test list navigation in a screen reader. Repair the source export process for future editions.",
      "evidence": "Structure traversal finds 10 L elements and 37 LI elements, but zero Lbl and only one LBody. For example, page 3's first LI directly references MCID 4 instead of containing label/body elements. PDF/UA technical issue; no separate WCAG failure or screen-reader omission is inferred.",
      "component": "Product strategy PDF",
      "foundBy": [
        "pdf-accessibility"
      ]
    },
    {
      "rule": "PDFUA-LANG-001",
      "wcag": "n/a",
      "severity": "minor",
      "location": ".a11y-history/2026-10-16/documents/Wagtail_Product_Strategy_2026_v1.0.pdf — document catalog /Lang",
      "summary": "PDF technical check: the document language uses an underscore instead of a valid hyphenated language tag.",
      "fix": "In Acrobat Pro, open Document Properties > Advanced > Reading Options and set Language to English (United Kingdom); verify the saved catalog uses en-GB. Confirm pronunciation with a screen reader and validate the language entry with veraPDF.",
      "evidence": "The catalog contains /Lang (en_GB); RFC language-tag syntax uses hyphens, so the expected value is en-GB. No structure element supplies an alternate language. Reader-specific speech consequences were not tested, so this is recorded as a technical issue rather than a confirmed WCAG 3.1.1 failure.",
      "component": "Product strategy PDF",
      "foundBy": [
        "pdf-accessibility"
      ]
    }
  ],
  "passed": [
    "A meaningful document title is set and ViewerPreferences DisplayDocTitle is true.",
    "All 11 pages contain selectable, extractable text; this is not an image-only PDF.",
    "All four fonts are embedded and have Unicode mappings; Poppler and PyMuPDF extract readable prose.",
    "Every page sets Tabs to S, using structure order for annotation navigation.",
    "Fifteen hierarchical bookmarks match the document's headings and destinations.",
    "No figures, images, tables, form fields, encryption, or JavaScript were found; figure alternatives, table headers and form labeling are not applicable.",
    "Rendered all pages and visually reviewed the complete document; its single-column sequence, headings, lists and page continuations are coherent.",
    "Text colors measured against the white background pass AA: #484848 is 9.15:1; #1155CC links are 6.57:1 and also underlined.",
    "The document has StructTreeRoot, MarkInfo Marked=true and semantic paragraph, heading, list and link tags.",
    "The five link annotations are represented by five Link tags with descriptive text: WCAG, ATAG, Web Sustainability Guidelines, Zen of Wagtail, and OWASP Top 10."
  ],
  "notes": [
    {
      "skill": "pdf-accessibility",
      "note": "Reviewed on 2026-10-16 using Poppler pdfinfo/pdftotext/pdffonts, pypdf, PyMuPDF and the accessibility-agents baseline PDF scanner. No PDF scan configuration was present. The document is 11 pages, PDF 1.4, produced by Skia/PDF m151 Google Docs Renderer."
    },
    {
      "skill": "pdf-accessibility",
      "note": "The baseline MCP scanner incorrectly reported no text content. That finding was rejected because two independent extractors and direct content-stream inspection demonstrate real text on every page. Do not recommend OCR for this file."
    },
    {
      "skill": "pdf-accessibility",
      "note": "Poppler's pdfinfo -struct-text output truncates some paragraphs and list items after nested ActualText spans. Direct content-stream inspection shows the surrounding MCID remains present; these extraction limitations were not misreported as omitted body content."
    },
    {
      "skill": "pdf-accessibility",
      "note": "WCAG findings and PDF/UA technical observations are explicitly separated using wcag=n/a for the latter. No claim of PDF/UA conformance is made. There is no XMP metadata or PDF/UA identification entry; adding a conformance identifier alone would not establish conformance."
    },
    {
      "skill": "pdf-accessibility",
      "note": "veraPDF and Java were unavailable. Run veraPDF PDF/UA-1 validation after repairs and conduct an Acrobat/Reader screen-reader reading and list-navigation test; those checks remain outstanding."
    },
    {
      "skill": "pdf-accessibility",
      "note": "Evidence files: .a11y-history/2026-10-16/evidence/product-strategy.txt, product-strategy-tags.txt, product-strategy-structure.json, and pdf-page-1-content.txt. All page renders are saved as screenshots/audit-2026-10-16/product-strategy-page-01.png through product-strategy-page-11.png."
    },
    {
      "skill": "pdf-accessibility",
      "note": "List-structure reference: [PDF Association Tagged PDF Best Practice Guide](https://pdfa.org/wp-content/uploads/2023/07/Tagged-PDF-Best-Practice-Guide.pdf). Language syntax reference: [RFC 3066](https://www.rfc-editor.org/rfc/rfc3066.html). WCAG language context: [W3C Understanding 3.1.1](https://www.w3.org/WAI/WCAG21/Understanding/language-of-page)."
    },
    {
      "skill": "pdf-accessibility",
      "note": "The PDF and application source were not modified."
    }
  ],
  "counts": {
    "critical": 0,
    "serious": 0,
    "moderate": 2,
    "minor": 1
  },
  "components": [
    {
      "component": "Product strategy PDF",
      "count": 3,
      "worst": "moderate",
      "rules": [
        "PDF-TAGS-001",
        "PDFUA-LANG-001",
        "PDFUA-LIST-001"
      ]
    }
  ],
  "score": 92,
  "grade": "A",
  "penalty": 5,
  "checks": 13,
  "generated": "2026-10-16",
  "template": "document"
}
```
