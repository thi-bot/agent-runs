<!-- braindump: rules extracted from PR review patterns -->

# client/src/controllers/ Guidelines

## API Design

<!-- rule:321 -->
- Check `event.defaultPrevented` on cancelable Stimulus custom events before DOM mutations — set `cancelable: false` only for pure notifications, since `preventDefault` throws otherwise and `dispatchEvent`'s return hides cancellation intent — Consumers can't cancel what they can't see: reading `event.defaultPrevented` from the captured event preserves cancellation intent, while relying on `dispatchEvent`'s boolean or dispatching non-cancelable events either swallows cancellation or makes `preventDefault` throw.
<!-- rule:1330 -->
- Bind keyboard shortcuts declaratively via `data-action` key descriptors (`keyup.up->w-sortable#up:prevent`, `keydown.left->tabs#method`) and `data-*-action-value`/`data-*-target` attributes — keeps key handling declarative and controller JS generic — Hardcoded key maps and component-specific state checks in generic controllers (`w-kbd`, `KeyboardController`) force duplication and break reuse across consumers like Sidebar and Search; declarative descriptors let each component wire its own behavior.
<!-- rule:294 -->
- In `client/src/controllers/`, type action handlers as DOM `Event` or `CustomEvent<DetailShape>` with JSDoc for `params`/`detail` — never React synthetic event types — Action params are shared across all actions bound to the same element, so distinct method names prevent one action's params from leaking into another; defensive reads prevent crashes when events fire without data; explicit event typing keeps the contract (and template-side wiring) coherent instead of relying on hidden `static values` or DOM state.
  - Read `event.params`/`event.detail` defensively (optional access, defaults, guards) — events fire without data in edge cases
  - Prefer `event.params` for per-action options/variants over `static values` or hidden DOM state — keeps the action contract visible in the template, not buried in JS
  - Give distinct action method names when mappings on the same element need different behavior — `event.params` is shared across all actions on an element
<!-- rule:1389 -->
- Debounce rapid/overlapping actions in `client/src/controllers/` via `utils/debounce`; hard-coded delays break reuse and per-path tuning (e.g. longer deactivation delays to avoid flicker). Configure delay via the `.debounce` action modifier or a Stimulus param (`data-{identifier}-delay-param`) instead of hard-coding in the controller. — Each bullet pairs the imperative with the failure mode (flicker, duplicate bindings, listener loss) and preserves the concrete references — helper path, param pattern, `Lazy` suffix, and example controllers — that make the rule actionable.
  - Set up debounced handlers in `initialize()`, not `connect()` — standard helpers are wired once, so `connect()` causes duplicate bindings on reconnect.
  - Name debounced variants with a `Lazy` suffix (e.g. `updateLocationLazy`) and keep the plain action name for the immediate variant; replace the action outright only when it should always be debounced. See `SwapController` and `AutosizeController` for convention.
<!-- rule:313 -->
- Default component/controller custom events to `bubbles: false` — bubbling is opt-in via `params.bubbles`; shared dispatch helpers must forward `{ bubbles }`. — Non-bubbling defaults keep the event surface predictable; opt-in compatibility preserves existing consumers that rely on bubbling. Placed for `client/src/controllers`.
<!-- rule:316 -->
- Expose timing/delay settings in Stimulus controllers as typed `static values` with sensible defaults, not hard-coded constants — lets time-dependent behavior be observed and tested via `data-*-value` attributes in HTML examples/docs. Don't expose `static values` for behavior that isn't implemented yet. — Typed `static values` with defaults make delays tunable without editing controller code, and a `data-*-value` override in docs/examples makes timing observable in tests. Exposing values for unimplemented behavior creates dead config users can't rely on.
<!-- rule:324 -->
- Manage `disabled` targets via cancelable `start`/`check` event in `connect()` — targets call `preventDefault()` to opt into disabled mode, so controllers don't hardcode which targets can disable themselves — While disabled, user actions (`apply`/`clear`/`ping`) must no-op and emit no events, but programmatic sync must still update all group targets — `disabled` gates user interaction, not programmatic state, so skipping disabled targets in sync causes silent divergence.
<!-- rule:1946 -->
- Keep user-facing fallback copy out of `client/src/controllers` Stimulus controllers (`ProgressController.ts`, `OrderableController.ts`) — default optional message/label values to `""` and let the template own the fallback; when `messagesValue[key]` has no translation, render nothing and skip the event dispatch. Keeps untranslated strings from leaking to users when a locale entry is missing. — The why here is i18n correctness: an English default baked into a controller silently ships untranslated copy to every locale, and dispatching an event for a missing message forces consumers to handle a bogus payload. Empty-string defaults + template-owned fallbacks keep the controller locale-agnostic.
<!-- rule:2053 -->
- Consolidate controller state resets into one lifecycle method named `reset` or `cancel` — not spread across `open()`/`close()` or named after a visual effect like `cancelSpinner` — Callers can rely on a single reset point, and effect-specific names hide that broader controller state (subscriptions, flags, timers) is being restored elsewhere
<!-- rule:301 -->
- Sync-style Stimulus controllers (e.g. `client/src/controllers/SyncController.ts`) must follow a consistent cancellable event flow: iterate `getTargetElements()`, skip empty targets, dispatch a cancelable custom event with `detail: { target, ... }` before mutating or notifying, and abort if `event.defaultPrevented`. — Lets consumers intercept and override sync behavior without subclassing the controller.
<!-- rule:1972 -->
- Keep `preprocessTag` in `TagController` decoupled from `autocomplete.source` — free-tag entry must accept/preprocess manual values even when an autocomplete URL is configured — Autocomplete is a UX convenience, not a validator; coupling `preprocessTag` to `autocomplete.source` (including fetch-based flows) would silently reject tags users type manually — cover both paths in `TagController.test.js`
<!-- rule:317 -->
- Transform helpers like `SlugController#slugify`/`#urlify` should take an optional `skipUpdate`/`ignoreUpdate` boolean (default `false`) — keeps them pure and callable from previews/validators without touching `this.element.value`; pass `true` to return the value only, `false` to write it back. Don't track update eligibility as controller state. — Converts the raw rule into an imperative, directory-scoped guideline with the WHY (purity, reusability, avoiding state desync) and preserves the specific controller/method names and parameter names required for discoverability under `client/src/controllers/`.
<!-- rule:2032 -->
- Preserve the `params` override convention in controller methods — removing it breaks callers relying on per-request overrides. Document any query-param side effects with their actual keys (e.g. `p` for pagination) and whether they can be overridden. — The `params` mechanism is relied upon across `client/src/controllers/` (e.g. `ZoneController.ts`, `SwapController.ts`); undocumented query-param keys like `p` surprise callers who don't know the side effect exists or that it's overridable.
<!-- rule:2024 -->
- In `client/src/controllers/` event handlers, destructure config from `{...defaults, ...event.params, ...event.detail}` — `event.detail` must win at runtime, and defaults should suppress missing-key error logs. — Merging preserves precedence: declarative `event.params` get overridden by actual `event.detail`, while controller defaults keep spurious 'missing key' errors from firing when a valid value is already present.
<!-- rule:325 -->
- In Stimulus `compareMethod`, early-return on blank controlled fields, read the transform from `params.compareAs` (default `'slugify'`) via the optional params object instead of hard-coded branching, compute the trimmed transformed value once, then `preventDefault()` and return equality — hard-coded branches and repeated transform calls yield divergent comparisons and wasted work — Directs writers to the `params`-driven pattern for Stimulus comparison handlers so new controllers stay consistent with `SlugController` and avoid divergent equality logic.
<!-- rule:1809 -->
- 
<!-- rule:1290 -->
- In Stimulus form controllers (`client/src/controllers`), submit forms via `form.requestSubmit()`, not `form.submit()` — only `requestSubmit()` dispatches the native `submit` event so other handlers and Stimulus actions can react. — Rewrote as three imperative bullets matching the three distinct behaviors in the rule (requestSubmit preference, novalidate alternative, no silent-return). Kept project-specific identifiers (`client/src/controllers`, `this.element.form`, `requestSubmit`, `novalidate`, Stimulus actions) and framed each why in terms of event dispatch / reactive handler behavior so the guidance is technical, not deontological.
  - To bypass constraint validation, add `novalidate` to the `<form>` element instead of falling back to `submit()` — `submit()` skips the event entirely, silently breaking reactive submit handlers.
  - Don't silently return when `this.element.form` is absent — call the form API directly so invalid/unsupported usage surfaces as an error rather than a hidden no-op.

## Code Style

<!-- rule:1819 -->
- Use `event.preventDefault()` for `beforeunload` dialogs and detect via `event.defaultPrevented` — `event.returnValue` is deprecated and custom message strings are ignored by modern browsers, so model confirmation as a Boolean flag (e.g. `confirmation: { default: false, type: Boolean }` in `UnsavedController.ts`). — Deprecated APIs and ignored custom text cause silent failures in unsaved-change guards.
<!-- rule:322 -->
- Centralize cancelable pre-action dispatch in a shared target-processing helper — dispatch the `before` event once, skip targets when `event.defaultPrevented` is true, and have action methods call the helper instead of re-implementing dispatch/cancel logic (`client/src/controllers`, e.g. `SyncController.ts`). — Prevents divergent cancel semantics across actions, keeps `event.defaultPrevented` handling in one place, and makes adding new cancellable actions a one-liner.
<!-- rule:274 -->
- In `client/src/controllers`, teardown/deactivate methods must clear timers with `clearTimeout` directly — callbacks like `loadingValueChanged` may not fire during disconnect, so cleanup cannot depend on them. — Value-change callbacks are unreliable during disconnect, and redundant cleanup obscures intent. Specifically: don't call `clearTimeout` inside the timer's own callback, and don't null the timer field afterward — `clearTimeout` already makes the timer inert, so resetting the field is dead code that invites confusion about ownership.
<!-- rule:297 -->
- In `client/src/controllers/*.ts` action methods, check all guards (e.g. `disabledValue`, required targets/inputs) first and return early — fail fast before any side effects (events, DOM changes) so invalid/disabled state never triggers wasted work or unwanted side effects. — Fail-fast guards prevent partial side effects when the controller is disabled or misconfigured, keeping action methods safe and predictable.
<!-- rule:1814 -->
- Reuse established `controllers/` implementations instead of ad-hoc logic, and add a comment referencing the original — keeps client-side controller behavior consistent and avoids divergent fixes for the same problem — N/A (single bullet)
<!-- rule:257 -->
- Store the `setTimeout` ID in a controller property and `clearTimeout` it before rescheduling or on state change/reopen — stale callbacks firing against superseded state cause UI flicker and races — The rule covers three tightly-coupled behaviors around timed UI state changes in Stimulus controllers, so a small bullet group reads better than a single run-on bullet. Each rationale names the concrete failure mode (stale callbacks, no-op callbacks, shadowed globals), which is what an agent needs to generalize the rule to new cases. Placement stays at `client/src/controllers/AGENTS.md` per the original scope; the references to `LoaderController.ts` and `MessagesController.ts` are implied by the directory rather than spelled out, keeping the bullets scannable.
  - Check class/condition availability *before* scheduling a timer, not inside the callback — avoids no-op callbacks firing against state that no longer applies
  - Never name controller methods after browser globals (e.g. `setTimeout`); call `window.setTimeout`/`window.clearTimeout` explicitly — a same-named method shadows the global and breaks every timer in the controller
<!-- rule:329 -->
- Keep `*ValueChanged` and controller guard equality checks pure: compare derived plain values with `===`, not side-effecting methods — side effects inside a re-run handler cause loops and double-syncs. — Change handlers re-run whenever reactive state updates, so impure compares (method calls that mutate or trigger reactivity) can retrigger the handler indefinitely and duplicate syncs in `SlugController`/`ZoneController` style guards. Deriving plain values first keeps the compare idempotent and makes the early-return condition trustworthy. Return early on `previous === current`, or right after updating reactive state, and let the handler re-run instead of duplicating comparisons inline; when gating sync or `preventDefault`, pick the boolean polarity that matches the equality result so the guard doesn't invert behavior.
<!-- rule:256 -->
- In `client/src/controllers/`, drive CSS-transition-dependent DOM updates via the shared `afterTransition(element, { maxDelay })` helper — never `debounce` or fixed `setTimeout`, which desync from actual animation timing (and vary by browser, device, and user motion settings). — Countering the impulse to reach for debounce/setTimeout: those hardcode timing that diverges from real CSS animations, causing flaky visuals across browsers/devices.
  - `afterTransition` derives its timeout from `getComputedStyle(element)` (`transitionDuration` + `transitionDelay`, seconds × 1000, missing → `0`). Pass a falsy `maxDelay` to resolve immediately when callers should skip waiting — tests, reduced-motion, or elements without transition classes.
<!-- rule:269 -->
- Cache `<template>` targets in Stimulus controllers; query `this.templatesTarget.content` for the node to clone — `.content` stays live, so caching the fragment instead of the element yields stale copies — Accessing `.content` only at clone time keeps DocumentFragment references fresh and avoids cloning the whole template content when only a specific node is needed.
<!-- rule:3089 -->
- Cache the element's original text in an instance property before swapping it for a loading state, and only when the cache is empty — re-caching on a later toggle captures the loading text and the real text is lost permanently. — The rule fits in two bullets, uses imperative mood, explains the why (loss of original text if overwritten; teardown safety) without being deontological, and preserves the code-specific detail about instance properties and restore guards. Package/file scope (`client/src/controllers` Stimulus controllers) is stated in the placement rationale rather than repeated in each bullet, per AGENTS.md style.
  - Guard the restore with both the cached value and the target element's existence — prevents throwing when deactivating after the DOM node is gone.
<!-- rule:318 -->
- In `client/src/controllers/*.ts` event handlers, delegate value transformation to the controller's own transform/behavior method instead of a utility function — keeps transform logic in one place so all call sites stay consistent. — Reimplementing transforms with utilities causes divergent behavior between the controller's canonical transform and ad-hoc callers; delegating ensures every event path uses the same logic. Reading from `event.detail.value` with a fallback to `this.element.value` covers both custom-event and direct-DOM sources, and returning the result preserves the handler's contract.

## Testing

<!-- rule:200 -->
- In `client/src/controllers` Jest tests for timer-dependent Stimulus/DOM behavior, call `jest.useFakeTimers()` once at file top (or in shared setup) and reset in `afterEach` — per-test fake timers leak state and cause flaky inter-test failures. — Per-test `jest.useFakeTimers()` calls leave timers mocked for subsequent tests, causing order-dependent flakiness in timer-dependent Stimulus controller tests like `MessagesController.test.js` and `LoaderController.test.js`.
<!-- rule:201 -->
- Await the async boundary in `client/src/controllers` DOM tests before asserting — mutate Stimulus data or dispatch events, then `await Promise.resolve()`, `flushPromises`, or `await jest.advanceTimersByTimeAsync(...)`; otherwise failures inside stale callbacks are silently swallowed and the test passes. — Stimulus controllers update the DOM via microtasks/promises, so assertions run before the DOM reflects the change and never fail the test. Prefer `await jest.advanceTimersByTimeAsync(...)`/`await jest.runAllTimersAsync()` over sync timer APIs for the same reason; skip the flush only when the assertion truly doesn't depend on an async update.
<!-- rule:323 -->
- Assert `preventDefault()` blocks downstream side effects in controller tests — verifies cancellable event contracts hold; test both branches when `preventDefault` is conditional. — Catches silent regressions where callbacks fire after a listener canceled the event, especially across conditional branches in `client/src/controllers/*.test.js`.
<!-- rule:1352 -->
- Test the full element matrix for each controller method — Stimulus controllers branch on element capabilities and optional globals; untested branches throw at runtime in user apps, not in the type checker.
  - Cover every supported element type per controller method — catches breakage on types the method claims to handle
  - Include types without element-specific APIs (`input.setCustomValidity` on a `button`) — verify they don't throw
  - Test the no-op path when the controlled element is absent — prevents null/undefined crashes
  - Test error conditions: missing required element id, missing `window.telepath` — locks in expected failure behavior
  - For TypeScript-only `Element` widening, add a runtime test for the motivating case (e.g. standalone `button` vs form-associated element) — types alone don't prove the controller works
<!-- rule:163 -->
- Clear targets and drop the URL param when a Stimulus controller's input is empty — otherwise stale server-rendered values linger. — Goes on a `client/src/controllers/AGENTS.md` (directory-scoped, applies to controllers and their tests, not the whole repo). Rule is written in imperative mood with concrete project references (`client/src/controllers`), a why clause (stale server-rendered values), and no deontological framing.
  - Test the clear-input path in `client/src/controllers` specs — verify targets update after a prior value is cleared.
<!-- rule:435 -->
- In bulk/select-all Stimulus controller tests under `client/src/controllers`, dispatch real `.click()` events on checkboxes (don't just mutate `checked`) — synthetic state changes miss wiring/toggle bugs. — Real event dispatch exercises the actual Stimulus action chain, so failures reflect controller behavior rather than test setup.
<!-- rule:2347 -->
- In controller tests, call `application.stop()` before `document.body.innerHTML = ...` — reversed teardown order leaks controller state between tests — Why: the controller's `stop()` unbinds listeners and stops the application before its host DOM is torn down; swapping `innerHTML` first can leave dangling observers/timers that bleed into subsequent tests. Matching the teardown order used elsewhere in `client/src/controllers` keeps the suite deterministic.
<!-- rule:2044 -->
- Test both directions of `localStorage` persistence in `client/src/controllers/` — write/restore tests catch asymmetric bugs where one direction silently regresses; assert resulting DOM state on restore (incl. default/closed) since observable output is the real contract; and cover clear/remove branches that skip persistence entirely. — Restore paths are easy to break while write paths still pass, and branches that clear storage are commonly untested edge cases. Asserting DOM after initialization verifies the actual user-visible outcome, not just that storage was read. Scoped to `client/src/controllers/` where localStorage-backed UI state lives.
<!-- rule:1450 -->
- In `client/src/controllers` keyboard tests, dispatch keys via the shared `simulateKey` helper instead of hand-rolling `KeyboardEvent`s — ad hoc events often omit `key`/`keyCode`/`ctrlKey`/`metaKey` or miss the target, making working shortcuts (incl. Mousetrap `mod` combos) look broken and hiding regressions. The helper should default `target` to `document.body` and derive `which` from `keyCode`. — Consistent KeyboardEvent construction ensures the full keydown/keypress/keyup sequence reaches the right element with every property the shortcut library reads, so keyboard/interaction controller tests fail for real bugs rather than simulation setup differences.

## Documentation

<!-- rule:2038 -->
- Document state inference in `client/src/controllers` change handlers — how state is derived from DOM (`active`/`inactive` classes, ARIA), DOM/ARIA side effects, and cases where the handler won't fire (state already set elsewhere) are invisible without a comment. — These Stimulus controllers commonly inspect class lists to infer mode; without inline comments or JSDoc, future readers misinterpret control flow and miss edge cases where the handler silently no-ops.
<!-- rule:1287 -->
- Document matching semantics (`any` vs `all`) in `client/src/controllers` docstrings when names don't reveal them — callers default to assuming `all`, so hidden `any` logic silently returns unexpected matches; `RulesController` must state it uses `any`. — Callers default to assuming `all` semantics, so undocumented `any` matching silently returns unexpected results. The rule targets `client/src/controllers` docstrings where the naming alone (e.g. `RulesController`) doesn't reveal which matching mode applies.
<!-- rule:2025 -->
- Sync JSDoc on `client/src/controllers/` event methods when changing key resolution, merge precedence, or no-op behavior — — callers can't infer these behaviors from signatures alone, so stale docs silently mislead.

## Error Handling

<!-- rule:352 -->
- ## Stimulus controller lifecycle teardown — Leaked listeners, timers, and live widget instances cause memory leaks and stale behavior across re-mounts; callbacks may not fire reliably during `disconnect()`.
<!-- rule:1973 -->
- Capture the `AbortController` signal in a local const (e.g. `const { signal } = this.abortController = new AbortController()`) and pass that local `signal` to `fetch` and its callbacks — the instance field gets replaced by later requests, so reading `this.abortController` inside `.then`/`.catch`/`.finally` can abort or inspect the wrong request. — Rewrote as four imperative bullets, each with the why behind the pattern (stale instance field, stable request identity, abort-as-control-flow, stale side effects). Preserved the exact Stimulus/AbortController idioms and referenced the concrete files so the rule stays actionable in context.
  - Only mutate `this.abortController` synchronously at request start (to cancel the previous one); never read or write it inside Promise callbacks — keeps each request's identity stable.
  - Detect cancellation via the captured `signal.aborted` (e.g. `if (signal.aborted) return;`) instead of matching `error.name === 'AbortError'` — abort is intentional control flow, so return early without logging it as an error.
  - Gate shared completion side effects (e.g. clearing a loading flag in `.finally()`) behind a latest-request check like `signal === this.abortController?.signal` — prevents a stale request from resetting state owned by a newer one.
  Placement: put this under `client/src/controllers/` scope — applies to Stimulus controllers like `SwapController.ts` and `TagController.ts`, not the whole repo.

## Config

<!-- rule:2187 -->
- Call accessibility setup (`axe.configure`) once from a dedicated init function in controller init (e.g. `PreviewController`, `Userbar`) — keeps per-check functions side-effect-free and safe to re-run — 
<!-- rule:2244 -->
- Keep controllers that own user-facing affordances (e.g., dialogs) loaded regardless of feature flags — Gating controller loading on the same flag makes the disabled-state message unreachable; handle the flag inside the controller or template to switch between warning and normal content. Applies to any controller under `client/src/controllers/*`, not just `KeyboardController.ts`.

## General

<!-- rule:1274 -->
- Use `Object`-typed values with `default: {}` for structured data in Stimulus controllers — avoids manual `JSON.parse` and shape validation — Stimulus parses `Object` values natively, so hand-rolled JSON decoding plus fallback/shape-checking code is redundant and drifts from the declared type. Applies to `client/src/controllers/*.ts`; document the value as the typed object, not as a 'JSON string containing X'.
<!-- rule:1169 -->
- In `client/src/controllers` Stimulus controllers, suffix persistence/storage config properties with `Key` (e.g. `storageKey`) and set them to the lookup identifier, not the stored value — keeps "which slot" config distinct from "what data" so callers don't pass a value where a key is expected. — Distinguishes configuration (a lookup key/identifier) from the actual stored data, preventing callers from accidentally passing the value where a key is expected.

## File-Specific Rules

### `client/src/controllers/CountController.ts`

<!-- rule:2275 -->
- Filter out elements under hidden ancestors (and those with `[hidden]`) when `DEFAULT_ERROR_SELECTOR` in `client/src/controllers/CountController.ts` picks `.error-message`/`.help-critical` — otherwise tests read phantom messages from collapsed panels. — Elements nested in hidden ancestors still match the selector, so unfiltered queries yield false positives and flaky assertions.

### `client/src/controllers/DrilldownController.test.js`

<!-- rule:1969 -->
- In `client/src/controllers/DrilldownController.test.js`, drive the controller through real UI interactions (clicks + action wiring) and assert observable DOM state — calling `controller.close()` directly or stashing controller/element refs as globals tests internals, not the wiring users actually hit. Toggle assertions: first click → `hidden === false` and `aria-expanded === 'true'`; second click → `hidden === true` and `aria-expanded === 'false'`. — Keeps the test file's specific interaction pattern and exact DOM assertions intact so an assistant editing `DrilldownController.test.js` reproduces the same behavior-level test shape instead of reaching into controller internals.

### `client/src/controllers/DropdownController.ts`

<!-- rule:1822 -->
- Set `DropdownController` triggers to `mouseenter focus click` for informational popups that may contain interactive content, with an inline comment noting the deliberate tooltip/dropdown blend — hover/focus previews the popup, click pins it open, and the comment stops future "consistency" refactors from dropping `click` — Hover/focus gives the low-friction tooltip feel users expect from informational popups, while `click` keeps the popup open so users can interact with its contents; documenting the blend inline prevents a later maintainer or AI edit from "normalizing" the trigger list and silently breaking interaction with popup content.

### `client/src/controllers/FormsetController.ts`

<!-- rule:2194 -->
- In `client/src/controllers/FormsetController.ts` tests, cover mixed valid/invalid children across consecutive saves — fix, reorder, remove, delete — asserting deleted children stay in HTML with `deleted=true` and tab/mini-map error counts stay in sync (links point to correct items). Add regression cases for reorders that mix valid and invalid rows, not just all-valid ones — the bugs only surface when both coexist. — Scoping to `FormsetController` tests because the failure modes (`deleted=true` submission state, mini-map/error-count drift, mixed-validity reorders) are specific to its save pipeline and won't be caught by all-valid regression rows.
<!-- rule:2208 -->
- Preserve user-defined DOM/formset order on save and validation responses in `FormsetController.ts` — otherwise invalid rows silently snap back to their initial position. — Reorder state is user intent; resetting it on validation feedback is a data-loss bug that's hard to spot because the save still 'succeeds'.
<!-- rule:2210 -->
- In `syncOrdering()`, comment `${index + 1}` as intentionally 1-based — Django formsets prefill `ORDER` inputs from 1, so 0-based values would misalign every row. — Placed in `FormsetController.ts` at the `syncOrdering()` method so the note sits next to the `${index + 1}` expression it explains; without it, a future reader may "fix" the offset and break ordering against Django-generated formsets.

### `client/src/controllers/MessagesController.ts`

<!-- rule:295 -->
- In `MessagesController`, schedule the show-class timer only when `hasShowClass` is true — avoids unnecessary timers on controllers without a show class. Keep `showDelay`'s default as `{ default: 100, type: Number }` so page-level message HTML relying on the default duration keeps working. — The `hasShowClass` guard prevents spawning timers for controllers that never apply a show class, and preserving the `showDelay` default value ensures existing page-level message markup that omits the attribute continues to animate after the default 100ms. Changing either breaks backward compatibility for consumers of `MessagesController`.

### `client/src/controllers/PreviewController.ts`

<!-- rule:2176 -->
- In `PreviewController.contentChecksPromise`, await `runAccessibilityChecks(...)` before `runContentChecks()` — `getA11yReport` runs `axe.configure()`, and content checks depend on that config; prefer making the dependency explicit over call order. — A11y check initializes shared axe tooling via `axe.configure()` inside `getA11yReport`; content checks will silently fail or misconfigure without it. Encoding the dependency explicitly (rather than relying on await order) prevents breakage when the pipeline is refactored.

### `client/src/controllers/README.md`

<!-- rule:3067 -->
- Note in `client/src/controllers/README.md` that controllers in the `index.ts` default export auto-join the core bundle and are provided by default — users can't tell what ships out-of-the-box without reading source. — Preserves the exact file path, `index.ts` default-export mechanism, and 'core bundle' concept; explains the user-facing reason the doc matters.

### `client/src/controllers/RulesController.ts`

<!-- rule:1281 -->
- Don't special-case falsy/absent values in `RulesController` `data-rule` matching — coerce uniformly with `String(value)` and compare against raw `FormData.getAll(fieldName)` entries so only an explicit `""` matches blank (prevents `0`/`false`/missing from silently matching blank rules). — file: client/src/controllers/RulesController.ts

<!-- /braindump -->