# Guide HTTP/API readiness findings

Verified against saved reports, live read-only HTTP requests, local source, and pinned GitHub main. Source/deployment identity is not assumed.

## Published OpenAPI lacks operation and parameter descriptions

Status: **confirmed**. Confidence: **high**.

Live GET /api/v3-preview/openapi.json has 67 operations and 141 operation parameters (208 items). 206 description fields are absent; two descriptions are longer than 15 characters. GET /api/v3-preview/pages/ has summary List pages but no description; query parameters search, ancestor_of, child_of, locale, order, etc. have schema types/defaults but no usage explanations. This confirms absent explanations, not the scanner claim that every description must exceed a particular length.

Improve operation/parameter documentation in the Wagtail v3 API generator. Guide imports upstream wagtail.api.v3; changes may belong upstream. Related #538 concerns CMS-user API documentation.

- [Source 1](https://guide.wagtail.org/api/v3-preview/openapi.json)
- [Source 2](https://github.com/wagtail/guide/blob/348b3cd863d98dc0531dad34d02c4ee2c48511aa/apps/guide/urls.py#L9)
- [Source 3](https://github.com/wagtail/guide/blob/348b3cd863d98dc0531dad34d02c4ee2c48511aa/apps/guide/urls.py#L24)
- [Source 4](https://github.com/wagtail/guide/issues/538)

## MCP catalog entry has no human-readable description

Status: **confirmed**. Confidence: **high**.

Live catalog now contains five entries (archived scanner counted three). MCP entry urn:air:guide.wagtail.org:mcp:wagtail-guide has identifier, type, url, tags and publisher, but no description or displayName. Confirmed in current GitHub main.

Add a concise name/description explaining that the MCP server searches and reads the Wagtail editor guide. Treat as discoverability improvement, not proof that registry consumers cannot find it or a mandatory schema violation.

- [Source 1](https://guide.wagtail.org/.well-known/ai-catalog.json)
- [Source 2](https://github.com/wagtail/guide/blob/348b3cd863d98dc0531dad34d02c4ee2c48511aa/public/.well-known/ai-catalog.json#L37-L46)

## Mobile copy menu inherits a different page Markdown URL from cached header

Status: **confirmed**. Confidence: **high**.

Parent browser review confirmed homepage mobile menu link points to /en/concepts/wagtail-api/markdown/ rather than /en/markdown/. Live fetched HTML corroborates both URLs. Current main caches header for 86400 seconds with LANGUAGE_CODE only; cached navigation includes copy_button, whose Markdown href derives from page.

Fix shared page-dependent header caching together with existing #545. Verify mobile Markdown link matches each current page after requests to different pages in the same language.

- [Source 1](https://github.com/wagtail/guide/blob/348b3cd863d98dc0531dad34d02c4ee2c48511aa/apps/core/templates/base.html#L96-L99)
- [Source 2](https://github.com/wagtail/guide/blob/348b3cd863d98dc0531dad34d02c4ee2c48511aa/apps/core/templates/components/navigation.html#L3-L9)
- [Source 3](https://github.com/wagtail/guide/blob/348b3cd863d98dc0531dad34d02c4ee2c48511aa/apps/core/templates/components/copy_button.html#L10)
- [Source 4](https://github.com/wagtail/guide/issues/545)

## MCP reachability and downgrade failures caused by missing MCP-Method header

Status: **rejected-scanner-defect**. Confidence: **high**.

Repeated scanner-style server/discover request without MCP-Method -> HTTP 400 JSON-RPC -32020 header mismatch. Same request with MCP-Method: server/discover -> HTTP 200 supportedVersions [2026-07-28], capabilities, instructions and server metadata. tools/list with matching header -> HTTP 200 actual read-only tools. Unsupported version 1900-01-01 with matching method header -> HTTP 400 -32022 and data.supported [2026-07-28], as expected. No mutating tool invoked.

Do not change the guide MCP server based on these failures. Correct scanner headers and rerun its probes.

- [Source 1](https://github.com/ForkPoint/agent-lighthouse/blob/6f8097bb883ab2c9af6e3e4c1b0c64502c262603/packages/core/src/gatherers/mcp.ts#L402-L412)
- [Source 2](https://guide.wagtail.org/mcp)

## Schema coverage warning counts intentionally bodyless operations

Status: **rejected-scanner-assumption**. Confidence: **high**.

Recount confirms 59/67 operations have response schemas; all eight exceptions are DELETE responses explicitly declared 204 No Content. 24/34 POST/PUT/PATCH operations have request schemas; ten exceptions are bodyless action POSTs (page publish, convert alias, workflow submit/resume/cancel; snippet publish/unpublish and workflow submit/resume/cancel). Scanner assumes every write operation and every response must have a body schema. Public read-only GET endpoints are not missing response schemas.

Do not add fictitious payload schemas to bodyless actions or 204 responses. Fix applicability in scanner.

- [Source 1](https://guide.wagtail.org/api/v3-preview/openapi.json)
- [Source 2](https://github.com/ForkPoint/agent-lighthouse/blob/6f8097bb883ab2c9af6e3e4c1b0c64502c262603/packages/core/src/audits/agent-interfaces/openapi-schemas.ts#L140-L180)

## Markdown retains primary content; heading comparison mishandles links and includes footer

Status: **rejected-as-stated**. Confidence: **high**.

Live Markdown contains linked H2 headings Getting started, How-to guides, Concepts, Reference, with all four explanatory paragraphs and intro. HTML uses How-to versus Markdown How-to guides (linked page title). Scanner markdownHeadings returns raw [text](url) and compares directly with HTML text. It also compares every HTML heading and body block, including footer headings About this guide, Help improve this guide, Wagtail, to content-only Markdown. Its 13% heading recall/38% prose recall do not demonstrate stale primary content.

Do not classify Markdown alternate as unusable. Fix scanner heading normalization and primary-content comparison. Optional separate review of desired footer/navigation inclusion should be a product choice.

- [Source 1](https://guide.wagtail.org/en/markdown/)
- [Source 2](https://github.com/wagtail/guide/blob/348b3cd863d98dc0531dad34d02c4ee2c48511aa/apps/llms_txt/jinja2/llms_txt/page.md.jinja#L33-L41)
- [Source 3](https://github.com/ForkPoint/agent-lighthouse/blob/6f8097bb883ab2c9af6e3e4c1b0c64502c262603/packages/core/src/audits/content-extraction/markdown-alternate.ts#L90-L104)
- [Source 4](https://github.com/ForkPoint/agent-lighthouse/blob/6f8097bb883ab2c9af6e3e4c1b0c64502c262603/packages/core/src/audits/content-extraction/markdown-alternate.ts#L200-L225)

## OpenAPI response currently has Last-Modified revalidation metadata

Status: **not-confirmed-current-response**. Confidence: **high**.

Live response is CF-Cache-Status HIT, Age 6337, Last-Modified Sat, 14 Nov 2026 00:29:52 GMT. No Cache-Control header, but report wording that no caching headers exist is not true of this fetched response. Conditional GET was not tested.

Keep caching policy follow-up under #498; do not claim every fetch necessarily redownloads the entire body.

- [Source 1](https://guide.wagtail.org/api/v3-preview/openapi.json)
- [Source 2](https://github.com/wagtail/guide/issues/498)

## MCP registry absence not independently verified

Status: **unresolved**. Confidence: **low**.

Archived scanner reports no first-party listing. No independent registry query was completed during this review.

Keep unverified, not in confirmed site defects.

