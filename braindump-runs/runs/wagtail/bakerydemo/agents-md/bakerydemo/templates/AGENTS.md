<!-- braindump: rules extracted from PR review patterns -->

# bakerydemo/templates/ Guidelines

## Code Style

<!-- rule:7 -->
- In `bakerydemo/templates`, keep text inside semantic elements (e.g., `<p>`) and use CSS pseudo-elements for decorative prefixes, separators, and line breaks — not HTML entities or `<br>` — Semantic markup keeps templates accessible and machine-readable, while pseudo-element decoration lets styling change via CSS alone without editing templates (see `blocks/blockquote.html`, `search/search_results.html`).
<!-- rule:36 -->
- In gallery/image-card templates, don't use `h1`–`h6` for image titles/captions — let the `alt` text serve as the accessible name, and render a visible non-heading caption only when it adds context beyond the `alt`. — Per-image headings pollute the document's heading outline for screen-reader users and usually duplicate the alt text, making navigation noisier without adding information.
<!-- rule:39 -->
- In templates, use native semantic elements (`<footer>`, `<nav>`) instead of `<div role="contentinfo">` / `<div role="navigation">`; reserve `role` attributes for generic elements with no semantic equivalent. — Native elements already imply their ARIA landmarks, so explicit roles are redundant noise that HTML validators flag as warnings and that can drift out of sync with the markup.
<!-- rule:40 -->
- Apply ARIA attributes only on elements whose role the ARIA spec supports (e.g. `aria-level` on headings, not links/list items); make `aria-label` describe a landmark's distinct purpose instead of repeating its implicit role (e.g. "Main", not "Primary site navigation") — Unsupported or redundant ARIA markup makes screen readers announce confusing or duplicated information, degrading accessibility rather than improving it.

## General

<!-- rule:29 -->
- Extract shared markup into common includes/base templates under `bakerydemo/templates/` and override only differing blocks; keep reusable pieces free of page- or context-specific markup (noindex directives, fixed `<li>` wrappers) — the calling template supplies metadata and wrappers — Shared templates containing context-specific markup leak wrong metadata or invalid HTML structure into every page that reuses them, forcing fragile workarounds instead of clean overrides.

<!-- /braindump -->