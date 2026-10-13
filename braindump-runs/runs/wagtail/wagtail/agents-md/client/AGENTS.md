<!-- braindump: rules extracted from PR review patterns -->

# client/ Guidelines

## Code Style

<!-- rule:1683 -->
- Insert HTML via a temporary container and append `...container.childNodes` — native `innerHTML`/`cloneNode` silently skip inline `<script>` execution, so use `append`/`insertBefore` or the jQuery `.html()`-mirroring helper. — Native `innerHTML` and `cloneNode` never execute inline `<script>` tags, so any code that relies on them for HTML insertion loses script behavior. Processing scripts against the full `container.childNodes` (not the container's parent) before moving nodes into the DOM ensures every top-level node is inserted, not just `firstChild`.

Select only inline scripts lacking both a `src` attribute and an explicit `type` (`type="text/javascript"` counts as missing) — external or typed scripts must be cloned/skipped, never blanked, to preserve their semantics. Copy all attributes from the original `<script>` onto the replacement so `id`, `data-*`, and nonce-style attributes survive the re-insertion.
<!-- rule:1223 -->
- Write new Wagtail front-end files under `client/src/` (including `client/src/components/`) as `.ts`/`.tsx`, not `.js`/`.jsx` — TypeScript catches prop and state errors at compile time that would otherwise surface at runtime. Exclude `.jsx` from file globs and tooling configs so lint/build steps don't silently pick up legacy patterns. Omit `import React from 'react';` in `.tsx`/`.jsx` when the automatic JSX runtime is enabled and React APIs aren't otherwise referenced — the import is dead code that bloats the bundle. — Types prevent runtime prop/state bugs; dropping `.jsx` from globs stops tooling from re-introducing the pattern; unneeded React imports add bundle weight under the automatic JSX runtime.
<!-- rule:1670 -->
- Avoid `z-index`/`isolation` unless stacking order must be controlled; use semantic tokens (e.g. `zIndex` in `client/tailwind.config.js`, consumed via `theme('zIndex.<token>')`, or shared Sass vars) instead of hard-coded numbers, preserving intended derivation and commenting non-obvious cases. — Central tokens keep stacking order consistent across `client/scss/**` and `client/src/**`, and make future layer changes a one-line edit instead of a codebase-wide hunt for magic numbers.
<!-- rule:105 -->
- Treat `data-controller`, `data-action`, and class-like DOM attributes as space-separated token lists — append tokens by joining non-empty values with spaces, and query them with CSS `~=` instead of `=` — Exact `=` matching silently breaks as soon as a second token is added to the attribute, so `~=` keeps selectors working across single- and multi-token values.
<!-- rule:592 -->
- Reference a state-specific token (e.g. `{component}-hover`) for SCSS hover/focus/active states instead of the default-state token, and verify the state is visibly distinct in both light and dark modes — reusing the default token silently loses the state in one theme. — The rule has two parts: state-token usage for interactive states and naming conventions. Both have clear why's (state visibility across themes, token reusability). Kept project paths for scope.
  - Name SCSS/design-token variables for their semantic role and omit state modifiers like `hover` unless the variable is used exclusively for that state — keeps tokens reusable across states.
  - Scope: `client/scss/components/**`, `client/src/tokens`, `client/scss/settings`.
<!-- rule:339 -->
- Use the native `disabled` attribute/property (`.prop('disabled', boolean)`) for control disabled state, not a `disabled` CSS class — browser/AT semantics stay authoritative and class-based flags drift from real state. — Concise bullets, imperative mood, each with a why tied to semantics/drift/discoverability/coverage. Preserves the project-specific selector list and the example SCSS path, and uses backticks for all identifiers.
  - Treat the native disabled state as the single source of truth for non-interactivity — don't add click-handler guards for already-loading/disabled buttons, since duplicate checks drift and mask bugs.
  - Keep disabled controls visible via muted disabled styling rather than `display: none` — hiding them breaks discoverability and layout assumptions.
  - In component styles (e.g. `client/scss/components/_button.scss`) cover `.disabled`, `:disabled`, and `[disabled]` so styling applies regardless of how the state is applied.
<!-- rule:1241 -->
- Apply conditional sizing with `:has()` when a container only needs `min-height` for an optional child (e.g. preview pane) — avoids reserving space when the child is absent. — Unconditional `min-height` on containers like those under `client/src/components/` and `client/scss/` wastes vertical space when no preview/overlay renders. `:has()` ties the sizing to the child actually being present. When an overlay does render, the reserved box must be ≥ the overlay's size or content below will be occluded.
  Ensure reserved space is at least as large as any `position: absolute` / fixed-size overlay inside the container — prevents clipping and layout overlap.
<!-- rule:1678 -->
- Extract non-trivial or reused DOM mutation logic (e.g., inline script re-execution in `client/src/entrypoints/admin/telepath/widgets.js`) into named helpers, and keep `domReady` callbacks minimal — early-return on missing targets/data and do one mutation only. — Named helpers are testable and reusable; thin `domReady` bodies (as in `client/src/includes/initIconSprite.ts`) avoid unintended side effects and race conditions from bundled mutations.
<!-- rule:964 -->
- Use `forceFocus` for programmatic focus in `client/src` — one source of truth prevents duplicate focus logic drifting across controllers, components, and lifecycle methods. — Ad-hoc `element.focus()` calls scattered across controllers and lifecycle hooks cause inconsistent focusing behavior (timing, scroll, accessibility) and become impossible to fix in one place. Routing all focus through `forceFocus` keeps that behavior centralized so a fix lands everywhere at once.
<!-- rule:2186 -->
- Detect focus-trap readiness via `document.activeElement.closest(containerSelector)` or `container.matches('<parent-selector> [data-focus-target="true"]')`; proceed immediately if the target is present and reserve a timeout for the absent case — assuming anchors or reading attributes off `container` misses the actually-focused element and forces needless waits — `document.activeElement` may be a descendant, not the container or an anchor, so `closest()`/`matches()` resolve the real target while direct container attribute checks produce false negatives; short-circuiting when the target exists avoids latency that the timeout fallback would otherwise add.
<!-- rule:632 -->
- Prefer `textContent` over `innerText` in `client/` code and JSDOM tests — JSDOM doesn't implement `innerText`, so its writes are invisible in tests; use `innerText` only when rendered/visible text is truly needed, and prefer both native properties over jQuery's `.text()`. — Module-local DOM API convention for client-side JavaScript and its JSDOM tests.
<!-- rule:1769 -->
- Fix unintended scroll bugs at the source — no `window.scrollTo` on page load or capture/restore workarounds; rely on native anchor scrolling. Workarounds mask the real bug and break as layout or routing changes. — Category: code_style. Scope: global. Place in `client/AGENTS.md` since it targets browser-side scroll behavior (`client/src/includes/tabs.js`, `client/src/components/Draftail/index.js`).
<!-- rule:544 -->
- In `PreviewController`/`initPreview`, style generated elements with existing `w-preview-*` SCSS classes instead of inline styles — keeps all preview styling centralized in preview SCSS — Two related hygiene rules for the client preview panel scope. First bullet: reuse `w-preview-*` classes rather than inline styles, preserving centralized styling in preview SCSS. Second bullet: remove unconsumed dataset attrs/state to prevent drift and confusion. Reference the concrete files/classes: `PreviewController`, `initPreview`, `page-editor.js`, and `w-preview-*` SCSS classes.
  - Drop dataset attributes and state in preview panel code that no preview logic consumes — dead declarations silently drift and mislead future edits

## API Design

<!-- rule:157 -->
- Prefer native DOM APIs (`getElementById`, `querySelector`, `querySelectorAll`) over jQuery selectors (`$('#id')`, `.find()`, `.children()`) in `client/` JS — reserve jQuery selectors for jQuery-specific behavior — Native lookups are faster, avoid the jQuery wrapper overhead, and let components work without the jQuery dependency; jQuery selectors are still needed for chaining, animations, plugins, or event sugar.
<!-- rule:1503 -->
- Prefer native `change`/`keyup`/`invalid` events over `MutationObserver` or custom DOM events for form-driven auto-updates in `client/` — keeps listeners interoperable with framework code and easier to test — Distills the raw rule into four imperative bullets covering (1) event preference, (2) emitting `change` on inserted nodes, (3) value-diffed writes to inputs and Django formset `DELETE` fields, and (4) no-op guards for removal mutations. Preserves project-specific refs (`client/`, `MutationObserver`, `change`/`keyup`/`invalid`, Django formset `DELETE` inputs) and explains the why (interop, listener sync, avoiding churn/feedback loops) without deontological phrasing.
  - Dispatch `change` on fields/panels inserted programmatically so existing change-based listeners stay in sync
  - Before assigning form inputs or hidden state (e.g. Django formset `DELETE` management inputs), compare current value and only set+dispatch `change` when it differs — avoids redundant churn and feedback loops
  - Guard lifecycle/removal mutations by skipping when the element is already in its expected final state
<!-- rule:204 -->
- Emit domain state-transition events, not DOM-mutation events — consumers care about *what changed*, not *how*. — Events like `custom DOM updated` leak implementation details and force consumers to diff DOM themselves; domain events (e.g. `form errors changed`) keep the component contract stable as internals evolve.
<!-- rule:312 -->
- Construct synthetic DOM events with `{ bubbles: true }` — delegated/ancestor listeners rely on bubbling to fire — Synthetic events dispatched without `bubbles: true` (e.g. `new Event('change')`) stay at the target, so delegated handlers on ancestors never fire and widgets silently diverge from real user input. Setting `bubbles: true` when mirroring native events like `change` in `client/src/components/ChooserWidget/index.js` and `client/src/entrypoints/admin/date-time-chooser.js` keeps behavior consistent with actual DOM interaction.
<!-- rule:2817 -->
- Keep reducer state minimal & stable: — Aligns with client/AGENTS.md scope (Redux reducers, selectors, comment components). Preserves cross-cutting convention without over-specifying files. Imperative, rationale-driven, under bullet-size with backticked identifiers kept generic since no project-specific names were supplied.
  - Don't store derived fields in reducers — compute them at point of use via existing selectors; extra state drifts out of sync with its source
  - Preserve the existing state shape unless namespacing is required to avoid API/local field collisions — shape changes ripple through every selector and consumer
  - Consumers should read reducer-guaranteed state through existing selectors, not raw store shape — defensive checks on reducer-controlled props hide real bugs
<!-- rule:2372 -->
- Resolve `postMessage()` targets via `new URL(value, window.location.origin).origin`, falling back to `''` when the value is absent — relative or protocol-relative origins from `data-*` attributes never match the `targetOrigin` check and silently drop the message, while `''` correctly limits delivery to the current origin. — Raw origin strings like `/app` or `//cdn.example.com` are not valid `targetOrigin` values, so a browser would discard the message without any error; resolving against `window.location.origin` before calling `postMessage()` keeps the handshake working for both relative and absolute origins and keeps same-origin defaults safe.
<!-- rule:2285 -->
- Expose raw numeric metrics in `w-preview:content` → `event.detail.metrics` — keeps consumers off label parsing — Consumers should read scores directly from `event.detail.metrics` rather than deriving them from display labels. Numeric payloads stay decoupled from presentation formatting, so label changes (rounding, units, localization) don't silently break downstream logic. Document in `client/AGENTS.md` since the contract spans the event payload and multiple client consumers.
<!-- rule:1812 -->
- Centralize menu state in a parent or shared context — avoid portalizing interactive menus to `document.body`; portals duplicate controls and scatter keyboard navigation order across the DOM, breaking focus and tab flow. — Preserves placement in `client/AGENTS.md`, keeps the project-specific `document.body` portal antipattern explicit, and gives the why (focus/tab-order bugs, duplicated controls) so the rule reads as a consequence rather than a directive.
<!-- rule:2753 -->
- In tab components syncing active tab to URL hash, skip `window.history`/hash updates on initial load for the default tab — only update on user-initiated selection — Writing the hash on load pollutes browser history and breaks the back button for a tab the user never chose

## Testing

<!-- rule:199 -->
- In `client/` Jest/JSDOM event tests, register only the mocks/listeners you assert on, and assert each event's `target`, `type`, and `detail`/payload (custom, lifecycle, and error paths included) instead of call count alone — call count passes even when the wrong event or payload fires, so precise assertions catch routing and payload regressions that counts miss. — The original rule emphasizes avoiding unnecessary mock/listener registration and verifying the specific event target, type, and payload rather than just call count. Translating this into actionable guidance with a rationale (call count can pass with wrong events/payloads) makes it clear why the practice matters. Preserving the `client/` scope and specific directories ensures the rule isn't misapplied to non-DOM parts of the repo.
  - Keep event-test setup scoped to `client/src/controllers`, `client/src/includes`, and `client/src/entrypoints` — DOM event semantics don't apply elsewhere in the repo, so repository-wide assumptions here would mislead AI assistants working in non-JS areas.
<!-- rule:2735 -->
- Render-test editor UI/CSS layout changes alongside related `client/scss/components` UI — shared containers mask visual regressions that source review won't catch. — Editor layout uses shared containers and wrappers (e.g. `client/src/components/Draftail/blocks` styles layered over `client/scss/components`), so a change that looks correct in isolation can break sibling UI — only the rendered editor reveals these regressions.
<!-- rule:1833 -->
- For interactive DOM components (e.g., tooltips), cover the full interaction lifecycle: listener registration, the state-expanding action, the reverse state-collapsing action, and all relevant interaction modes (focus, hover, click). When gating destructive DOM writes such as innerHTML swaps, defer the write until the user has finished interacting with the container, not merely until focus leaves. — This rule governs how interactive DOM components must be tested across the full interaction lifecycle and how destructive DOM writes (innerHTML swaps) should be deferred. Evidence originates from the client workspace (`client/src/controllers/SwapController.ts`, `client/src/includes/breadcrumbs.test.js`).
<!-- rule:1820 -->
- Assert `beforeunload` cancellation via `event.defaultPrevented` in tests, not the deprecated `returnValue` — mirrors how `client/src/controllers/ActionController.test.js` mocks the event and matches production's actual read path. — `returnValue` is a legacy contract that modern browsers no longer honor; if production reads `defaultPrevented`, mocks setting `returnValue` will pass green against dead code. If production still reads `returnValue`, emulate that path explicitly so the test exercises the real branching logic rather than a mock-invented API.

## Error Handling

<!-- rule:1618 -->
- Guard optional globals and page-specific DOM containers in `client/src/entrypoints/admin/*` scripts before access — they must run standalone or on pages that omit that UI — Prevents runtime errors when the entrypoint is loaded in contexts without the expected UI.
<!-- rule:2041 -->
- Wrap `localStorage`/`sessionStorage` access in `try`/`catch` and degrade on throw — quota/private-mode errors otherwise crash UI init — Safari private mode and quota-exceeded conditions throw on `setItem`; unwrapped calls can abort component mount or feature setup entirely.
<!-- rule:2188 -->
- Compare cross-origin status before cross-frame sync — return early on mismatch instead of waiting on timeouts that can't succeed. — Mixed same-origin/cross-origin frames can never coordinate; timeout-then-fail wastes time and hides the real cause.

## General

<!-- rule:1811 -->
- Type `children` as `React.ReactNode` and define explicit props interfaces for every React component in `client/` — precise types catch prop drift at compile time and prevent runtime `undefined` in renders. — Placement: `client/` scope (all React components live there).
  - Avoid `any` and implicit `any` in prop interfaces; remove stale `as any` casts once upstream types cover the required props — silent casts hide real type regressions.
  - Always pass explicit initial values to typed `useState` and declare optional-prop defaults via `defaultProps` rather than inline destructuring fallbacks — uninitialized generics and inline fallbacks produce inconsistent defaults across call sites.
<!-- rule:2936 -->
- In `client/tests/integration/*.test.js`, read the target Wagtail origin from `TEST_ORIGIN` (e.g. `http://localhost:9000`) instead of hardcoding `localhost:<port>` — lets the same tests hit custom-port local or remote instances with no source edits. — This codifies the directory-level convention for the Wagtail backend origin. By reading from an environment variable, contributors can run tests against non-default local ports or a remote Wagtail instance without editing any test file or committing environment-specific URLs.

## File-Specific Rules

### `client/webpack.config.js`

<!-- rule:1308 -->
- Add `exclude: /node_modules/` to application JS/TS loader rules (e.g., `ts-loader` matching `/\.(js|ts)x?$/`) — avoids transpiling dependencies and keeps builds fast. — Rationale: transpiling `node_modules` is slow and unnecessary for packages already shipped to the target environment. When a dependency must be downleveled (e.g., an ES6 package under an ES5 target), use a narrowly targeted exception and document why it exists and when it can be removed — prefer reverting to the plain `/node_modules/` exclude once the underlying migration or fix lands, so the exception doesn't outlive its reason.

<!-- /braindump -->