# Web Accessibility Audit

An audit of web content, run on 2026-10-02. Read the executive summary for the verdict, the priorities section for what to do first, and the findings tables for detail.

## Metadata

What was audited, with what, and under which settings.

| Field | Value |
|---|---|
| Date | 2026-10-02 |
| Scope | 1 item |
| Skills run | web-accessibility-wizard |
| Tooling | node v26.8.1, a11y-mcp-server 7.0.3 |
| Scan configuration | defaults, no config file found |
| Checks counted | 26 |

Audited:

- `https://wagtail.org/`

## Executive summary

Pass. No critical or serious findings.

The headline numbers for this run.

| Measure | Value |
|---|---|
| Score | 100 out of 100 |
| Grade | A |
| Findings | 0 |
| Blocking (critical plus serious) | 0 |
| Verdict | Pass |

## Severity breakdown

Counts by severity, highest impact first.

| Severity | Count | What it means |
|---|---:|---|
| critical | 0 | Blocks a person from completing the task |
| serious | 0 | Major barrier with a difficult workaround |
| moderate | 0 | Real friction, workaround exists |
| minor | 0 | Noticeable but rarely blocking |

## Findings

No findings. Every check listed under "What passed" ran and came back clean.

## Remediation priorities

Nothing to remediate.

## What passed

26 checks ran and found nothing.

- aria-allowed-attr: Elements must only use supported ARIA attributes (automated check only)
- aria-conditional-attr: ARIA attributes must be used as specified for the element's role (automated check only)
- aria-hidden-body: aria-hidden="true" must not be present on the document body (automated check only)
- aria-hidden-focus: ARIA hidden element must not be focusable or contain focusable elements (automated check only)
- aria-prohibited-attr: Elements must only use permitted ARIA attributes (automated check only)
- aria-valid-attr-value: ARIA attributes must conform to valid values (automated check only)
- aria-valid-attr: ARIA attributes must conform to valid names (automated check only)
- autocomplete-valid: autocomplete attribute must be used correctly (automated check only)
- avoid-inline-spacing: Inline text spacing must be adjustable with custom stylesheets (automated check only)
- button-name: Buttons must have discernible text (automated check only)
- bypass: Page must have means to bypass repeated blocks (automated check only)
- color-contrast: Elements must meet minimum color contrast ratio thresholds (automated check only)
- document-title: Documents must have <title> element to aid in navigation (automated check only)
- duplicate-id-aria: IDs used in ARIA and labels must be unique (automated check only)
- form-field-multiple-labels: Form field must not have multiple label elements (automated check only)
- html-has-lang: <html> element must have a lang attribute (automated check only)
- html-lang-valid: <html> element must have a valid value for the lang attribute (automated check only)
- image-alt: Images must have alternative text (automated check only)
- label: Form elements must have labels (automated check only)
- link-in-text-block: Links must be distinguishable without relying on color (automated check only)
- link-name: Links must have discernible text (automated check only)
- list: <ul> and <ol> must only directly contain <li>, <script> or <template> elements (automated check only)
- listitem: <li> elements must be contained in a <ul> or <ol> (automated check only)
- meta-viewport: Zooming and scaling must not be disabled (automated check only)
- nested-interactive: Interactive controls must not be nested (automated check only)
- target-size: All touch targets must be 24px large, or leave sufficient space (automated check only)

## Needs a human

Items a skill could not decide, or could not check automatically.

- **web-accessibility-wizard**: Quick runtime-only scan against WCAG 2.2 AA using axe-core 4.13.0; no source review or behavioral testing performed. Framework unknown.
- **web-accessibility-wizard**: Automated score is not a WCAG conformance determination. Only the initial homepage state was scanned at 780 by 437 CSS pixels.
- **web-accessibility-wizard**: color-contrast: 12 element(s) require manual review; these are unconfirmed checks, not violations.
- **web-accessibility-wizard**: video-caption: 1 element(s) require manual review; these are unconfirmed checks, not violations.
- **web-accessibility-wizard**: Full scan results: [axe-core JSON](ACCESSIBILITY-SCAN.json).
- **web-accessibility-wizard**: Homepage captured separately at 1280px width: [homepage screenshot](screenshots/wagtail-homepage.png).
- **web-accessibility-wizard**: Manually review contrast on the flagged elements and captions for the video, then test keyboard navigation and screen reader access.

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
    "web-accessibility-wizard"
  ],
  "scope": [
    "https://wagtail.org/"
  ],
  "findings": [],
  "passed": [
    "aria-allowed-attr: Elements must only use supported ARIA attributes (automated check only)",
    "aria-conditional-attr: ARIA attributes must be used as specified for the element's role (automated check only)",
    "aria-hidden-body: aria-hidden=\"true\" must not be present on the document body (automated check only)",
    "aria-hidden-focus: ARIA hidden element must not be focusable or contain focusable elements (automated check only)",
    "aria-prohibited-attr: Elements must only use permitted ARIA attributes (automated check only)",
    "aria-valid-attr-value: ARIA attributes must conform to valid values (automated check only)",
    "aria-valid-attr: ARIA attributes must conform to valid names (automated check only)",
    "autocomplete-valid: autocomplete attribute must be used correctly (automated check only)",
    "avoid-inline-spacing: Inline text spacing must be adjustable with custom stylesheets (automated check only)",
    "button-name: Buttons must have discernible text (automated check only)",
    "bypass: Page must have means to bypass repeated blocks (automated check only)",
    "color-contrast: Elements must meet minimum color contrast ratio thresholds (automated check only)",
    "document-title: Documents must have <title> element to aid in navigation (automated check only)",
    "duplicate-id-aria: IDs used in ARIA and labels must be unique (automated check only)",
    "form-field-multiple-labels: Form field must not have multiple label elements (automated check only)",
    "html-has-lang: <html> element must have a lang attribute (automated check only)",
    "html-lang-valid: <html> element must have a valid value for the lang attribute (automated check only)",
    "image-alt: Images must have alternative text (automated check only)",
    "label: Form elements must have labels (automated check only)",
    "link-in-text-block: Links must be distinguishable without relying on color (automated check only)",
    "link-name: Links must have discernible text (automated check only)",
    "list: <ul> and <ol> must only directly contain <li>, <script> or <template> elements (automated check only)",
    "listitem: <li> elements must be contained in a <ul> or <ol> (automated check only)",
    "meta-viewport: Zooming and scaling must not be disabled (automated check only)",
    "nested-interactive: Interactive controls must not be nested (automated check only)",
    "target-size: All touch targets must be 24px large, or leave sufficient space (automated check only)"
  ],
  "notes": [
    {
      "skill": "web-accessibility-wizard",
      "note": "Quick runtime-only scan against WCAG 2.2 AA using axe-core 4.13.0; no source review or behavioral testing performed. Framework unknown."
    },
    {
      "skill": "web-accessibility-wizard",
      "note": "Automated score is not a WCAG conformance determination. Only the initial homepage state was scanned at 780 by 437 CSS pixels."
    },
    {
      "skill": "web-accessibility-wizard",
      "note": "color-contrast: 12 element(s) require manual review; these are unconfirmed checks, not violations."
    },
    {
      "skill": "web-accessibility-wizard",
      "note": "video-caption: 1 element(s) require manual review; these are unconfirmed checks, not violations."
    },
    {
      "skill": "web-accessibility-wizard",
      "note": "Full scan results: [axe-core JSON](ACCESSIBILITY-SCAN.json)."
    },
    {
      "skill": "web-accessibility-wizard",
      "note": "Homepage captured separately at 1280px width: [homepage screenshot](screenshots/wagtail-homepage.png)."
    },
    {
      "skill": "web-accessibility-wizard",
      "note": "Manually review contrast on the flagged elements and captions for the video, then test keyboard navigation and screen reader access."
    }
  ],
  "counts": {
    "critical": 0,
    "serious": 0,
    "moderate": 0,
    "minor": 0
  },
  "components": [],
  "score": 100,
  "grade": "A",
  "penalty": 0,
  "checks": 26,
  "generated": "2026-10-02",
  "template": "web"
}
```
