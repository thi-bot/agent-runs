<!-- braindump: rules extracted from PR review patterns -->

# wagtail/contrib/redirects/ Guidelines

## Config

<!-- rule:2662 -->
- Make use-case-specific redirect behavior (querystring preservation, wildcard matching, auto-creation) explicit config — per-redirect editor option or `WAGTAILREDIRECTS_*` setting — instead of hard-coding; default behavior-changing or perf-impacting features to off/opt-in so upgrades don't silently alter existing `wagtail/contrib/redirects` behavior. — Hard-coded choices lock in one use case and force behavior/perf changes on every project on upgrade; opt-in config keeps existing redirects stable and lets sites choose what they need.
<!-- rule:2653 -->
- In `wagtail/contrib/redirects` resolution, treat query params in the source path as match criteria only: drop them from the redirected URL unless the target explicitly re-includes them, and pass all other incoming query params through unchanged. Avoid a hardcoded keep/ignore list — one less config surface to drift out of sync with real URLs. — Source-path query params describe the match, not the destination; preserving them implicitly causes surprising redirect targets, while an explicit list rots as URLs change.

## API Design

<!-- rule:2086 -->
- Normalize redirect paths with `Redirect.normalise_path()` at every creation entry point in `wagtail.contrib.redirects` — batch creators, signal handlers, forms — so stored `url_path` values stay consistent instead of depending on which caller forgot to normalize. — Multiple redirect entry points in `wagtail.contrib.redirects` (batch creators, signal handlers, forms) each need the same path normalization. Scattering or skipping it produces inconsistent stored URLs depending on the code path taken, and temporarily rewriting `url_path` before save risks persisting the mutated value or diverging from what the signal reported. Routing everything through `Redirect.normalise_path()` and trusting signal-provided old/new paths keeps behavior identical across callers and removes a class of subtle path bugs.
  - Use the old/new paths signals already pass in; don't rebuild them or temporarily mutate `url_path` — temporary mutation leaks into the saved object and duplicates (or drifts from) the signal's own values.
<!-- rule:2094 -->
- Call `uri_to_iri` only for user-facing or lookup use in `wagtail/contrib/redirects`; keep redirect destinations encoded for internal/framework consumption — decoding early changes redirect semantics and can mangle non-ASCII paths. — Decoding is lossy for routing: the encoded form is what the framework expects when resolving redirects, so only decode when a human or lookup path actually needs the IRI.

## General

<!-- rule:2769 -->
- Define shared option sets (e.g., `SUPPORTED_FORMATS`) once as module-level constants or class attributes in `wagtail/contrib/redirects/` — single source of truth keeps views, forms, templates, tests, and management commands in sync. — The rule concerns two distinct anti-patterns: duplicated option lists and duplicated rendering. The first bullet makes the canonical-definition source explicit (`SUPPORTED_FORMATS` as a module-level constant) and names the downstream consumers (views, forms, templates, tests, management commands) so the assistant knows where to look for references. The second bullet names the specific template path and the two branches that currently duplicate rendering. Both preserve the project-specific identifiers (`SUPPORTED_FORMATS`, `wagtailredirects/choose_import_file.html`) that make the rule actionable.
  - Render `wagtailredirects/choose_import_file.html` from one place, not per-branch `render()` calls in the GET/no-POST and POST paths — duplicated rendering drifts as branches evolve.

<!-- /braindump -->