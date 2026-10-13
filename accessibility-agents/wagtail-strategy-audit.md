# Document Accessibility Audit

An audit of documents, run on 2026-10-02. Read the executive summary for the verdict, the priorities section for what to do first, and the findings tables for detail.

## Metadata

What was audited, with what, and under which settings.

| Field | Value |
|---|---|
| Date | 2026-10-02 |
| Scope | 1 item |
| Skills run | pdf-accessibility |
| Tooling | node v26.8.1, a11y-mcp-server 7.0.3 |
| Scan configuration | defaults, no config file found |
| Checks counted | 11 |

Audited:

- `/tmp/wagtail-pdf-audit/Wagtail_Product_Strategy_2026_v1.0.pdf`

## Executive summary

Pass. No critical or serious findings.

The headline numbers for this run.

| Measure | Value |
|---|---|
| Score | 89 out of 100 |
| Grade | B |
| Findings | 3 |
| Blocking (critical plus serious) | 0 |
| Verdict | Pass |

## Severity breakdown

Counts by severity, highest impact first.

| Severity | Count | What it means |
|---|---:|---|
| critical | 0 | Blocks a person from completing the task |
| serious | 0 | Major barrier with a difficult workaround |
| moderate | 3 | Real friction, workaround exists |
| minor | 0 | Noticeable but rarely blocking |

## Findings

3 findings, ordered by severity then by rule.

### Moderate (3)

Each row names the rule, the criterion it fails, where it is, and what to change.

| Rule | WCAG | Location | Problem | Fix |
|---|---|---|---|---|
| `PDFUA.01.003` | 1.3.1 A | /tmp/wagtail-pdf-audit/Wagtail_Product_Strategy_2026_v1.0.pdf (page 1, version/date line) | The meaningful version and publication date are untagged and absent from the logical structure. | In Acrobat Pro, open the Tags and Reading Order panels and tag "Version 1.0, June 2026" as a paragraph before the title. Check tag order and screen-reader output. In the source document, place this information in the main reading flow before exporting again. |
| `PDFUA.06.002` | 3.1.1 A | /tmp/wagtail-pdf-audit/Wagtail_Product_Strategy_2026_v1.0.pdf (document catalog) | Document language is encoded as en_GB, which is not a valid BCP 47 language tag. | In Acrobat Pro, open File > Properties > Advanced > Reading Options and set Language to English (UK). Verify that the saved catalog /Lang is en-GB. Test pronunciation with a screen reader. |
| `PDFUA.20.001` | n/a | /tmp/wagtail-pdf-audit/Wagtail_Product_Strategy_2026_v1.0.pdf (lists on pages 3-10) | PDF/UA structure: 36 of 37 list items contain content directly instead of an LBody child. | In Acrobat Pro, use the Tags panel to move each item body into LBody under its LI, and separate visible bullets or numbers into Lbl where appropriate. Preserve each split item as one logical item, then validate with PAC or veraPDF. |

## Remediation priorities

The remaining 3 moderate and minor findings can follow in normal work.

## What passed

8 checks ran and found nothing.

- All 11 pages contain extractable text; all four fonts are embedded and have ToUnicode mappings. Ligature ActualText replacements are present.
- All 11 pages specify /Tabs /S. There are no form fields, scripts, encryption or image-only pages.
- All five URI link annotations are represented by Link tags and OBJR references, with visible descriptive text (WCAG, ATAG, Web Sustainability Guidelines, The Zen of Wagtail, OWASP Top 10).
- Document has a StructTreeRoot, Document root and /MarkInfo /Marked true.
- Fifteen descriptive heading bookmarks point to destinations; heading tags use H1 and H2 without skipped levels.
- Measured vector text colors on a white background: body gray RGB 0.2824/0.2824/0.2824 has 9.14:1 contrast; link blue RGB 0.0667/0.3333/0.8 has 6.57:1 contrast. Both exceed 4.5:1.
- Title metadata is "Wagtail Product Strategy 2026 v1.0" and /DisplayDocTitle is true.
- Visual inspection of rendered pages 1-11 found a single-column text layout, no charts or tables, no clipped content and visibly underlined links. No image XObjects were found.

## Needs a human

Items a skill could not decide, or could not check automatically.

- **pdf-accessibility**: Source: https://media.wagtail.org/documents/Wagtail_Product_Strategy_2026_v1.0.pdf. Audit target: WCAG 2.2 AA; strict checks, including separately identified PDF/UA and best-practice observations. No workspace PDF configuration or previous document audit was provided.
- **pdf-accessibility**: Tools: Poppler pdfinfo/pdftotext/pdftoppm/pdffonts 26.08.0, qpdf 12.4.1, Python standard-library JSON inspection, ImageMagick contact-sheet rendering. Reviewed all 11 rendered pages and catalog, tags, fonts, outlines, annotations, page tab settings and decompressed content streams.
- **pdf-accessibility**: Limitations: veraPDF and PAC were unavailable, and no Acrobat accessibility checker or screen-reader runtime test was performed. This is a structural and visual audit, not a full WCAG or PDF/UA certification. Test tag-based reading order, list navigation, link keyboard activation, pronunciation and reflow in Acrobat with NVDA or another screen reader. Text extraction alone does not prove accessible reading order.
- **pdf-accessibility**: PDF/UA-only observation: no XMP metadata stream or pdfuaid:part identifier is present. This PDF makes no machine-readable PDF/UA conformance claim; absence of that claim is not itself a WCAG failure. If PDF/UA delivery is required, repair structure, add suitable metadata and validate the actual result with veraPDF/PAC before asserting conformance.
- **pdf-accessibility**: Heading review: the title and five major section headings are all H1 (six total); nine subsections are H2. A single H1 title followed by H2 sections and H3 subsections would make the hierarchy clearer, but multiple H1 tags alone do not establish a WCAG failure. Confirm the intended outline with the author.
- **pdf-accessibility**: Reference for list structure: https://pdfa.org/wp-content/until2016_uploads/2015/12/StructureElementsBestPracticeGuide_2016-01-19.pdf and https://pac.pdf-accessibility.org/en/resources/quality-checks/formal-correctness-of-li-elements. Language syntax: https://www.w3.org/International/articles/language-tags/Overview.en.php. Project PDFUA rule identifiers are used for traceability; they are not a completed Matterhorn validator result.

## Next steps

1. Keep the current checks in continuous integration so this does not regress.
2. Re-audit when the interface changes materially, or quarterly.
3. Confirm the automated result with a manual screen reader and keyboard pass.

Automated checks find a minority of accessibility barriers. A passing score is a floor, not a guarantee.

## Findings data

The merged findings, embedded so the next run can compute a delta without parsing this document.

```json a11y-findings
{
  "skills": [
    "pdf-accessibility"
  ],
  "scope": [
    "/tmp/wagtail-pdf-audit/Wagtail_Product_Strategy_2026_v1.0.pdf"
  ],
  "findings": [
    {
      "rule": "PDFUA.01.003",
      "wcag": "1.3.1 A",
      "severity": "moderate",
      "location": "/tmp/wagtail-pdf-audit/Wagtail_Product_Strategy_2026_v1.0.pdf (page 1, version/date line)",
      "summary": "The meaningful version and publication date are untagged and absent from the logical structure.",
      "fix": "In Acrobat Pro, open the Tags and Reading Order panels and tag \"Version 1.0, June 2026\" as a paragraph before the title. Check tag order and screen-reader output. In the source document, place this information in the main reading flow before exporting again.",
      "evidence": "Page 1 stream draws \"Version 1.0, June 2026\" before the first /H1 marked-content block, without any enclosing tag or Artifact marker. The tag tree starts with the title and has no version/date entry.",
      "foundBy": [
        "pdf-accessibility"
      ]
    },
    {
      "rule": "PDFUA.06.002",
      "wcag": "3.1.1 A",
      "severity": "moderate",
      "location": "/tmp/wagtail-pdf-audit/Wagtail_Product_Strategy_2026_v1.0.pdf (document catalog)",
      "summary": "Document language is encoded as en_GB, which is not a valid BCP 47 language tag.",
      "fix": "In Acrobat Pro, open File > Properties > Advanced > Reading Options and set Language to English (UK). Verify that the saved catalog /Lang is en-GB. Test pronunciation with a screen reader.",
      "evidence": "Catalog object 186: /Lang (en_GB); BCP 47 uses hyphens, so British English is en-GB. Invalid syntax is confirmed; reader fallback or mispronunciation was not tested.",
      "foundBy": [
        "pdf-accessibility"
      ]
    },
    {
      "rule": "PDFUA.20.001",
      "wcag": "n/a",
      "severity": "moderate",
      "location": "/tmp/wagtail-pdf-audit/Wagtail_Product_Strategy_2026_v1.0.pdf (lists on pages 3-10)",
      "summary": "PDF/UA structure: 36 of 37 list items contain content directly instead of an LBody child.",
      "fix": "In Acrobat Pro, use the Tags panel to move each item body into LBody under its LI, and separate visible bullets or numbers into Lbl where appropriate. Preserve each split item as one logical item, then validate with PAC or veraPDF.",
      "evidence": "Ten L elements contain 37 LI elements. Only LI object 101 has an LBody child; the other 36 have direct MCIDs/MCRs. No Lbl elements exist. Lists and item counts are present; a WCAG relationship failure or screen-reader navigation failure was not established.",
      "foundBy": [
        "pdf-accessibility"
      ]
    }
  ],
  "passed": [
    "All 11 pages contain extractable text; all four fonts are embedded and have ToUnicode mappings. Ligature ActualText replacements are present.",
    "All 11 pages specify /Tabs /S. There are no form fields, scripts, encryption or image-only pages.",
    "All five URI link annotations are represented by Link tags and OBJR references, with visible descriptive text (WCAG, ATAG, Web Sustainability Guidelines, The Zen of Wagtail, OWASP Top 10).",
    "Document has a StructTreeRoot, Document root and /MarkInfo /Marked true.",
    "Fifteen descriptive heading bookmarks point to destinations; heading tags use H1 and H2 without skipped levels.",
    "Measured vector text colors on a white background: body gray RGB 0.2824/0.2824/0.2824 has 9.14:1 contrast; link blue RGB 0.0667/0.3333/0.8 has 6.57:1 contrast. Both exceed 4.5:1.",
    "Title metadata is \"Wagtail Product Strategy 2026 v1.0\" and /DisplayDocTitle is true.",
    "Visual inspection of rendered pages 1-11 found a single-column text layout, no charts or tables, no clipped content and visibly underlined links. No image XObjects were found."
  ],
  "notes": [
    {
      "skill": "pdf-accessibility",
      "note": "Source: https://media.wagtail.org/documents/Wagtail_Product_Strategy_2026_v1.0.pdf. Audit target: WCAG 2.2 AA; strict checks, including separately identified PDF/UA and best-practice observations. No workspace PDF configuration or previous document audit was provided."
    },
    {
      "skill": "pdf-accessibility",
      "note": "Tools: Poppler pdfinfo/pdftotext/pdftoppm/pdffonts 26.08.0, qpdf 12.4.1, Python standard-library JSON inspection, ImageMagick contact-sheet rendering. Reviewed all 11 rendered pages and catalog, tags, fonts, outlines, annotations, page tab settings and decompressed content streams."
    },
    {
      "skill": "pdf-accessibility",
      "note": "Limitations: veraPDF and PAC were unavailable, and no Acrobat accessibility checker or screen-reader runtime test was performed. This is a structural and visual audit, not a full WCAG or PDF/UA certification. Test tag-based reading order, list navigation, link keyboard activation, pronunciation and reflow in Acrobat with NVDA or another screen reader. Text extraction alone does not prove accessible reading order."
    },
    {
      "skill": "pdf-accessibility",
      "note": "PDF/UA-only observation: no XMP metadata stream or pdfuaid:part identifier is present. This PDF makes no machine-readable PDF/UA conformance claim; absence of that claim is not itself a WCAG failure. If PDF/UA delivery is required, repair structure, add suitable metadata and validate the actual result with veraPDF/PAC before asserting conformance."
    },
    {
      "skill": "pdf-accessibility",
      "note": "Heading review: the title and five major section headings are all H1 (six total); nine subsections are H2. A single H1 title followed by H2 sections and H3 subsections would make the hierarchy clearer, but multiple H1 tags alone do not establish a WCAG failure. Confirm the intended outline with the author."
    },
    {
      "skill": "pdf-accessibility",
      "note": "Reference for list structure: https://pdfa.org/wp-content/until2016_uploads/2015/12/StructureElementsBestPracticeGuide_2016-01-19.pdf and https://pac.pdf-accessibility.org/en/resources/quality-checks/formal-correctness-of-li-elements. Language syntax: https://www.w3.org/International/articles/language-tags/Overview.en.php. Project PDFUA rule identifiers are used for traceability; they are not a completed Matterhorn validator result."
    }
  ],
  "counts": {
    "critical": 0,
    "serious": 0,
    "moderate": 3,
    "minor": 0
  },
  "components": [],
  "score": 89,
  "grade": "B",
  "penalty": 6,
  "checks": 11,
  "generated": "2026-10-02",
  "template": "document"
}
```
