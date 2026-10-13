<!-- braindump: rules extracted from PR review patterns -->

# client/src/components/ Guidelines

## API Design

<!-- rule:2760 -->
- In Explorer, detect root via `id === 1` and back nav via `depth` vs the user's start level, not `page.parent` — parent pages may fall outside the user's permissions, so render unreachable ones as the non-interactive Home state — Users can land mid-tree under a restricted node: `page.parent` may exist but be inaccessible, so permission-aware `id === 1` / user-relative `depth` checks are the only reliable signal for whether Home is interactive or a parent can be linked.
<!-- rule:2886 -->
- In `CommentApp/main.tsx`, `CommentApp/utils/layout.ts`, and `Draftail/CommentableEditor`, keep comments rendered in-viewport even when their anchor/field is hidden or offscreen — hide only via explicit comment mode. Tying comment visibility to anchor visibility silently drops user feedback context. — Users expect their comments to stay visible and reachable as fields collapse or scroll; coupling comment visibility to field/anchor visibility makes existing comments vanish without user action, breaking trust in the review workflow.
<!-- rule:2732 -->
- Pass landmark/label semantics to the `Transition`/`CSSTransitionGroup` wrapper itself (`component="nav"`, `label` → `aria-label`), not to the transitioned children — enter/leave transitions render duplicate copies, creating duplicate DOM IDs and headings. Never render `<nav>`, headings, or fixed `id`s/aria labels inside transitioned children. — Keeps a single accessible landmark in the DOM instead of duplicated ones during enter/leave transitions.
<!-- rule:2738 -->
- Render every Draftail embed/media block state — including thumbnail-less fallbacks — through the shared `MediaBlock` component in `client/src/components/Draftail/blocks/`. — One render path means styling/behavior fixes apply everywhere; divergent fallback markup drifts from the canonical block.
<!-- rule:2219 -->
- Keep Telepath-initialized `*MenuItemDefinition` classes (e.g., `LinkMenuItemDefinition` in `client/src/components/Sidebar/menu/LinkMenuItem.tsx`) as classes with a constructor and `render()` method — Telepath instantiates and serializes class instances, so converting them to function components breaks the adapter contract. — Telepath-rendered menu definitions must remain classes so Telepath can construct and serialize them; refactoring to function components silently breaks the client-side instantiation contract.
<!-- rule:3014 -->
- ...
<!-- rule:2618 -->
- Keep all tooltip positioning, sizing, and constraint logic in the shared `Tooltip` component — don't reimplement it in consumer blocks. — Single shared implementation means edge-case placement bugs (clipping, flipping) get fixed once for all Draftail blocks instead of drifting per consumer; ignoring container space causes tooltips to overflow near viewport edges.
  - Choose placement from available viewport/container space, not just the target element and requested direction — viewport-aware logic in one place stops tooltips from clipping across every `client/src/components/Draftail` consumer.

## Code Style

<!-- rule:2218 -->
- Prefer function components + hooks; share behavior via composition, not inheritance or class mimics — matches modern React and avoids dead-end class abstractions that imitate framework APIs like `props` + `render()` — The pre-em-dash rule is 97 characters; the rationale explains WHY (functional + compositional patterns are idiomatic React, and hand-rolled class abstractions that ape React's API create maintenance dead-ends). Preserves the specific example (`props` + `render()`) that anchors the anti-pattern.
<!-- rule:1680 -->
- Access inline panel children via an explicit contract — a marker like `data-inline-panel-child`, a public method, or an event — and scope queries to the current child (`currentChild.find(...)`) rather than broad or negative selectors. Filter, count, and order child forms only by this marker, and keep it accurate when children are deleted. Prevents auxiliary elements like error messages in the same container from being mistaken for real children — which breaks counts, ordering, and deletion logic. — Auxiliary elements (error messages, etc.) rendered in the same container can be mistaken for child forms, breaking counts, ordering, and deletion logic. An explicit marker or public contract disambiguates children from sidecar DOM, and scoped queries prevent cross-child leakage in `InlinePanel` / `MultipleChooserPanel` controllers.
<!-- rule:2873 -->
- Keep comment parsing/serialising (`position`) and styles filtering in `wagtail-comment-frontend`, not in editor components like `CommentableEditor` — centralising storage concerns avoids duplicated save logic drifting between commentable and non-commentable variants; extract a shared helper when both would otherwise repeat it. — Draftail editor variants diverge quickly if storage/format concerns live in each component; delegating to the module and sharing helpers means behaviour changes happen once.
<!-- rule:3025 -->
- In `ChooserWidget` render/input code, use native DOM APIs (`getAttribute()`, `setAttribute()`) instead of jQuery `.attr()`/`.val()` for reading and mutating attributes and values — keeps attribute and value property in sync (jQuery `.val()` only updates the property, which desyncs after re-renders). — Native APIs avoid the jQuery attribute/property desync that breaks downstream DOM reads, and matches how `ChooserWidget` expects inputs to be updated.
<!-- rule:1813 -->
- Use a back-arrow icon (not a cross/close) in submenu back controls like `SubMenuCloseButton.tsx` — signals navigation to the parent menu, not dismissal — submenu controls return users to the previous level; a cross icon implies closing/dismissing, which misleads users about what the button does
<!-- rule:2077 -->
- Route every reorder operation (move up/down, drag reorder) through the component's field-sync helper — duplicating order-sync logic desyncs form field values from DOM order, corrupting submitted data. — Multiple order-sync implementations drift apart: stale field indices silently submit reordered values to the wrong keys. A single helper makes ordering correctness auditable in one place. Applies to reorderable form/list components; refactor existing callers such as `InlinePanel` (`client/src/components/InlinePanel/index.js`) to use it as the single source of truth.

## Type System

<!-- rule:2089 -->
- Use the established numeric sentinel (`-1`) for 'no selection' index state in components — keep the field `number`-typed, test selection with `index >= 0`, and reset to the same sentinel; avoids scattered `undefined`/`typeof` checks and keeps init, comparison, and reset logic consistent (e.g. `client/src/components/ComboBox/ComboBox.tsx`) — A single numeric sentinel keeps index state `number`-typed across init/comparison/reset, so selection logic never has to branch on `undefined` or `typeof`.
<!-- rule:2984 -->
- Type navigation callbacks (e.g. `navigate`) as `() => Promise<void>` in component props — matches the async implementation and keeps callers awaiting navigation — ... short

## General

<!-- rule:2887 -->
- Use keyword-only args for public APIs — prevents breakage when adding parameters — ...
<!-- rule:1226 -->
- Match fixture props to the component's declared prop types (arrays for array props, strings for string props) — mismatched shapes pass tests against a contract the component doesn't have — Concise, imperative bullets with clear WHY. Preserves the specific guidance about type matching, prop vs. mocked-entity placement, refactor resilience, and fixture immutability. Uses backticks where identifiers would appear (none in original rule, so kept format-ready). Fits the component-test scope under `client/src/components`.
  - Pass component-level values as props, not embedded in mocked entity data — mirrors real call sites and survives API refactors
  - Don't mutate shared fixtures; spread a new object and override only the props that differ per test — prevents cross-test state leakage

<!-- /braindump -->