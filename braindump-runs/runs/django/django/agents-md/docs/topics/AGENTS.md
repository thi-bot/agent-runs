<!-- braindump: rules extracted from PR review patterns -->

# docs/topics/ Guidelines

## Documentation

<!-- rule:4125 -->
- In `docs/topics/db/` manager docs (`managers.txt`, `optimization.txt`), use canonical identifiers — `Meta.base_manager_name`, not deprecated `use_for_related_fields`; `Meta.related_manager_name`, not `Meta.related_model_name` — link to the dedicated manager documentation rather than informal labels, and don't describe behaviors (e.g., custom manager methods) the linked section doesn't cover. — Rephrased for an AGENTS.md bullet: imperative, project-specific identifiers and file paths preserved, and a why focused on the bug this prevents — readers following stale identifiers or over-claiming links to API details the target section omits.
    Deprecated names and mismatched links send readers to APIs that no longer exist or to sections that don't explain the behavior being cited, breaking the docs' authority as the canonical reference.
<!-- rule:1912 -->
- In `docs/topics/auth/`, distinguish the requesting user (actor) from the requested user — conflating them obscures which account a check applies to — Auth docs describe two distinct parties: the actor making the call and the account being looked up or operated on. If they're merged, readers can't tell whether a state check (e.g., `is_active`) guards the requester or the target account, and "unauthenticated users" wrongly implies users (not requests) carry that status.
  - Phrase auth restrictions as "unauthenticated requests" and attribute `is_active`/usable-password checks to the requested user — access is per-request, and the requester may be anonymous
<!-- rule:1018 -->
- In `docs/topics/*.txt`, write direct, concrete prose: one sentence per function purpose, name the generated artifacts, and define domain terms with the canonical example — redundant synonyms like "migration files" and "migration operation" read as two distinct concepts and confuse readers. — Topic docs are scanned for facts, not voice: a single sentence per function purpose and explicit artifact names let readers grep for what gets produced. Echoing one concept under two names ("migration files" vs. "migration operation") forces readers to reconcile whether they're the same thing, which is exactly the ambiguity this directory exists to remove.
<!-- rule:2745 -->
- In email docs and examples under `docs/topics/`, label plain-text body content vs. HTML alternative content explicitly, and document the exact matching scope of helpers like `body_contains()`. — Ambiguity about which part (`text/*` vs. `text/html` alternative) a helper or example operates on causes users to write tests that silently match the wrong body, and inconsistent text/HTML pairs in examples get copy-pasted as bugs.
<!-- rule:666 -->
- Scope `RelatedManager` behavioral claims to the specific relationship type (`ManyRelatedManager`, reverse FK, etc.) — broad labels like "to-many" mislead since `filter()`/`exclude()` differ per relation type. — Different relation types produce different queryset behavior, so readers relying on `to-many` as a catch-all will hit surprising results. Naming the type explicitly keeps docs accurate per relation.
<!-- rule:4427 -->
- Document concrete defaults and behavior in `docs/topics/`, not generic benefit claims — advanced users need project-specific Python/asyncio details that upstream docs omit. — Generic "it's faster/cleaner" claims don't tell readers what the code actually does by default; re-documenting non-obvious Python/asyncio semantics (task cancellation, event loop behavior) in-place means Django users don't have to reconcile upstream docs with Django's wrappers.
<!-- rule:3149 -->
- Document shortcut parameter combinations that map to distinct status codes as an RST table in `docs/topics/http/shortcuts.txt`: input parameter columns first, resulting HTTP status code last — keeps output predictable and status codes scannable when readers compare shortcuts — Readers scan these tables to find which status code a given parameter combination produces. Putting the input parameters first and the status code last mirrors how the shortcut is called and how the response is returned, so the table reads left-to-right as call-to-result rather than forcing readers to jump between scattered columns.
<!-- rule:1030 -->
- Document table renames with both old and new names in `docs/topics/migrations.txt` — readers need the source name to locate and update existing references — Omitting the source name makes it hard to find and fix outdated references in code or other docs, causing broken migrations.
<!-- rule:2959 -->
- Document gettext flags in `.po` files with the `#,` comment marker (e.g., `#, xgettext:no-python-format`) — gettext only recognizes flag directives inside `#,` comment lines, so docs in `docs/topics/i18n/translation.txt` that omit the marker show syntax users can't copy-paste successfully
<!-- rule:4711 -->
- Keep prior tool examples when adding newer recommended tools in `docs/topics/testing/` — place them alongside or below, replacing only when the old tool is deprecated — Readers still using the older tooling (or on versions that recommend it) lose their reference if the example is deleted; only deprecation justifies removal.

## General

<!-- rule:4643 -->
- Wrap Playwright test examples in a per-test `playwright_test` decorator that enters/exits `sync_playwright()` — per-test browser isolation prevents state leaking between tests, unlike Selenium-style `setUpClass`/`tearDownClass` shared browsers. — The synchronous Playwright API's `sync_playwright()` context manager ties the Playwright runtime to the current thread and event loop, so calling it directly inside a test body or reusing one browser across `setUpClass`/`tearDownClass` leaks state between tests (cookies, storage, open pages) and can break under pytest/`SimpleTestCase`-style fixtures. A per-test decorator keeps each example self-contained and idiomatic to Django's testing docs in `docs/topics/testing/tools.txt`, matching the per-test lifecycle that the surrounding testing utilities use.

## File-Specific Rules

### `docs/topics/async.txt`

<!-- rule:4587 -->
- In `docs/topics/async.txt` performance sections, cite request-scale numbers under contention, not zero-contention microbenchmarks — microbenchmarks understate observable overhead and mislead capacity planning. Qualify that sync/async boundary cost is small in isolation but grows with active threads under GIL contention; attribute the dominant cost to GIL contention/thread serialization, not raw context switching, so readers optimize the right thing. Retain the recommendation to minimize boundary crossings. — Keeps `docs/topics/async.txt` performance guidance grounded in numbers readers will actually see in production and points them at the real bottleneck (GIL contention) rather than a misattributed one (context switching), while preserving the boundary-crossing advice that still follows from the analysis.

### `docs/topics/cache.txt`

<!-- rule:5809 -->
- Use `redis://` in `docs/topics/cache.txt` examples — including authenticated `redis://username:password@host:port` — and reserve `rediss://` for TLS-specific examples, since an unexplained `rediss://` reads as a typo. — The Redis cache docs default to non-TLS examples; silently switching schemes makes readers think the URL is wrong rather than showing a TLS setup.
<!-- rule:5239 -->
- In `docs/topics/cache.txt`, document `cache_page` as auto-setting `Cache-Control` and `Expires` headers on the response, and describe their effects via the `downstream-caches` reference rather than naming only the browser cache — these headers apply to any downstream cache (CDNs, proxies), so browser-only wording misleads users and breaks the cross-reference. — Extracted the imperative rule (document `cache_page` as auto-setting headers, use the `downstream-caches` reference) and attached the underlying reason — the headers govern every downstream cache, not just the browser, so narrow wording is inaccurate and breaks the cross-reference. Preserved all project-specific references (`cache_page`, `docs/topics/cache.txt`, `Cache-Control`, `Expires`, `downstream-caches`).
  ## Category
  documentation
  ## Scope
  `docs/topics/cache.txt`
  ## Placement rationale
  The rule is scoped to documenting a specific entity (`cache_page`) within a single file (`docs/topics/cache.txt`). It governs how that file's content is written (mentioning the automatically-set `Cache-Control`/`Expires` headers and using the `downstream-caches` reference terminology). File-level placement keeps it next to the `cache_page` docs it constrains.
  ## Example of bad code
  None
  ## Example of good code
  None
<!-- rule:4610 -->
- In `docs/topics/cache.txt` (e.g. `{% cache %}`, `make_template_fragment_key`), warn that key names come from `str()` of the args, so any non-unique `__str__` collides — not just `None`/null — and show `None` vs `"None"`; prefer unique scalars over model instances. — Cache lookups key on `str()` output, so two distinct args with the same string form (a model without `__str__`, `None` and `"None"`) silently share a cache entry — readers who assume only null values collide get stale or cross-user data.
<!-- rule:5659 -->
- In `docs/topics/cache.txt`, warn when the file-based cache `LOCATION` overlaps `MEDIA_ROOT`, `STATIC_ROOT`, or `STATICFILES_FINDERS` — web-served cache files are attacker-writable and pickle-deserialized, so the overlap leaks sensitive data and enables arbitrary RCE. — The documentation is the last line of defense for a silent misconfiguration; without the warning, operators may unknowingly expose secrets and grant remote code execution.

### `docs/topics/db/models.txt`

<!-- rule:2995 -->
- In `docs/topics/db/models.txt`, keep field-name restriction list entries as concise `#. A field name cannot be ...` bullets — long paragraphs and inline workaround examples break the list's scannability. — Matches the established one-line pattern (e.g. `#. A field name cannot be 'check', as this would override the check framework's Model.check() method.`), so the restriction list stays uniform and scannable instead of becoming an inconsistent mix of lengths and code snippets.

### `docs/topics/db/queries.txt`

<!-- rule:4104 -->
- Put `Q` object/filter documentation for `get_or_create()` in the `get_or_create()` section of `docs/topics/db/queries.txt`, not in the `Q` section — readers look up filtering behavior where they look up `get_or_create()`. — A user reading the `get_or_create()` docs won't think to check the `Q` object section, so placing filter-related behavior there hides it from the audience that needs it.

### `docs/topics/db/transactions.txt`

<!-- rule:5268 -->
- In `on_commit` docs (`docs/topics/db/transactions.txt`), call registered callables "callbacks", not "the function" — consistent terminology keeps the API description unambiguous across the file. — In `on_commit` docs, mixed wording like "the function" vs. "callbacks" makes it unclear that arbitrary callables are accepted and confuses the contract; and misstating exception handling (catching/logging vs. propagating) leads users to depend on the wrong error semantics.
  - Document that robust `on_commit` callbacks catch and log exceptions instead of propagating them — users relying on the wrong behavior will write handlers that silently swallow errors (or expect propagation that never happens).

### `docs/topics/email.txt`

<!-- rule:2733 -->
- Document functions in `docs/topics/email.txt` using their real public signatures, public param names (e.g., `body_contains(text)`, not `search_str`), return values, and inputs examined — readers copy-paste these APIs, so inaccuracies ship real bugs — The `docs/topics/email.txt` page is the reference users copy from; if the signature or parameter names do not match the actual public API, every snippet built on it is broken.
<!-- rule:2729 -->
- Prefer the simplest API in `docs/topics/email.txt` examples — `send_mail(..., html_message=rendered)` over `EmailMessage`/`EmailMultiAlternatives` unless showing a capability only they provide (custom headers, `cc`/`bcc`, attachments, `attach_alternative()`). Keeps examples teaching the least code that works and avoids implying extra ceremony is required. — Aligned with the actual API surface so users copy the right idiom and don't over-engineer or miss inherited behaviour.
  Describe `EmailMultiAlternatives` accurately — it inherits all `EmailMessage` methods, `attach_alternative()` is just the one it adds. Prevents readers from missing inherited methods or misjudging the class's API surface.
<!-- rule:3543 -->
- Document the `policy` kwarg of `EmailMessage.message()` in `docs/topics/email.txt` — cover its type (`email.policy.Policy`), default (`email.policy.default`), its role in updating/serializing the message, and when to pick alternatives like `email.policy.SMTP`, `email.policy.SMTPUTF8`, or a custom policy — Users can't tell when to override the default serialization policy without this, and undocumented kwargs on a public API are effectively unsupported
<!-- rule:4217 -->
- Use `email.utils.make_msgid()` for inline-attachment `Content-ID` in `docs/topics/email.txt` — pass its angle-bracketed value as the MIME part's `cid`, strip the brackets in the HTML `cid:` URL, and document the asymmetry so readers wire both correctly. — `make_msgid()` returns IDs wrapped in `<...>`; the MIME `cid` wants them, but the HTML `cid:` URL does not — In docs/topics/email.txt, using email.utils.make_msgid() for Content-ID and passing the bracketed value directly as the MIME part's cid while stripping the angle brackets for the HTML cid: URL prevents broken inline images and avoids misleading readers about whether the two representations are interchangeable. If the brackets are kept in the URL or removed from the MIME part, the cid: reference no longer matches the Content-ID, so the attachment fails to render and the example documents the wrong asymmetry.

### `docs/topics/http/file-uploads.txt`

<!-- rule:4773 -->
- In `docs/topics/http/file-uploads.txt` examples, use `form_valid` (not `post`) for the form-view hook and name helpers by action (`upload_file`, not `_upload_file_view`) — matches Django's class-based view API so copied examples actually run — Method names in these docs are what readers copy verbatim; using `post` for a form-view hook or naming helpers after a view (`_upload_file_view`) misrepresents Django's CBV lifecycle and yields broken example code.

### `docs/topics/i18n/translation.txt`

<!-- rule:1435 -->
- In `docs/topics/i18n/translation.txt`, describe plural forms via Transifex's CLDR-to-gettext conversion, not direct CLDR compliance — gettext catalogs are integer-only, so float-only CLDR categories like `many` are excluded (e.g. Czech `n % 1 != 0` never holds) — If `docs/topics/i18n/translation.txt` claims direct Unicode/CLDR compliance, translators and users will expect every CLDR plural category to work, but Django relies on Transifex's CLDR-to-gettext conversion rather than Unicode/CLDR directly, and that conversion excludes from the distributed catalogs plural equations that are not valid implementations of the CLDR specification while having the gettext integer-only limitation. This mismatch leaves CLDR categories defined for floats, such as `many`, unreachable—as in the Czech formula where `n % 1 != 0` is never true—so the documentation misstates actual plural behavior and invites incorrect expectations or bug reports.

### `docs/topics/serialization.txt`

<!-- rule:2807 -->
- Document `Custom serialization formats` in `docs/topics/serialization.txt` under `Serialization formats` (after YAML) — this is where readers look for `SERIALIZATION_MODULES`. — In docs/topics/serialization.txt, omitting the 'Custom serialization formats' subsection under 'Serialization formats' after YAML leaves users unaware that SERIALIZATION_MODULES can extend built-in Deserializers and that custom formats should subclass the built-in serializer/deserializer, override hooks such as __init__, _handle_object, and end_object, and write records directly to self.stream using self.first for one-time headers instead of reimplementing deserialize(). This causes serializer-only registration via SERIALIZATION_MODULES to be mistaken for custom deserialization support, and custom extensions become fragile or stale as built-in serialization internals change.
  - Explain `SERIALIZATION_MODULES` in that section as serializer registration only — conflating it with custom deserialization misleads users about what gets registered.
  - Show extending built-ins by subclassing and overriding hooks (`__init__`, `_handle_object`, `end_object`) rather than reimplementing `deserialize()` — hooks match how built-ins are structured and stay maintainable.
  - In examples, write records directly to `self.stream` and use `self.first` for one-time headers — this mirrors the built-in serializer flow users will recognize.

### `docs/topics/signals.txt`

<!-- rule:3215 -->
- Writing duplicate-receiver docs in `docs/topics/signals.txt`: describe duplicate registration as an import-time registration side effect (importing a receiver-defining module isn't itself the cause), recommend deferring to `AppConfig.ready()`, and flag that `AppConfig.ready` may run multiple times so registration must be idempotent. — Keeps `docs/topics/signals.txt` accurate and consistent with its existing notes: readers chase the wrong cause (module import) instead of import-time side effects, miss that `ready()` repeats during setup, and end up with duplicated signal handlers. For bound-method receivers, say they bind to separate instances (e.g. a new instance per connection-code run) — never that accessing a method creates a new object, which misstates the identity mechanism. Keep duplicate-prevention examples slim and reuse wording already in the doc; don't re-explain `AppConfig.ready` multi-invocation where it's already covered.

### `docs/topics/signing.txt`

<!-- rule:412 -->
- In `docs/topics/signing.txt`, frame each listed security mitigation as a recommended approach with its concrete security rationale (e.g., preventing client-side editing or tampering) — never dismiss an alternative with wording like 'Instead of doing this at all'. — In docs/topics/signing.txt, wording like "Instead of doing this at all" hides why a mitigation prevents client-side editing or tampering, so readers may discard a valid defense or misread the signing model. Presenting each alternative as a recommended approach with its concrete security rationale keeps the documentation accurate and prevents implementation or review mistakes caused by dismissive, unexplained guidance.
  Reasoning: Signing docs guide users toward secure choices; presenting an alternative as a recommendation with its rationale (e.g., tamper resistance) gives readers the information to make informed decisions, while dismissive phrasing discourages use of valid mitigations without explaining why.

### `docs/topics/tasks.txt`

<!-- rule:3219 -->
- In `docs/topics/tasks.txt`, state that Django only defines, enqueues, and validates tasks — execution is backend-specific (external worker/queue) — Users and custom backend authors otherwise assume Django runs tasks; the docs must draw this scope boundary so backend implementers know execution is theirs.

### `docs/topics/testing/tools.txt`

<!-- rule:3800 -->
- Document assertion helpers in `docs/topics/testing/tools.txt` with a Sphinx `.. method::` directive whose signature matches the real method and lists every optional kwarg and default (`allow_other_errors`, `msg`, `expected_errors`) — a stale signature sends users to parameters that don't exist. — 
  - Nest `.. versionadded::` inside the `.. method::` block, before the description, and include usage examples — nesting keeps the version badge attached to the method instead of floating above it, and examples show the helper in practice.
<!-- rule:5222 -->
- In `docs/topics/testing/tools.txt`, document that the async test client's `get()`, `post()`, `head()`, `options()`, `put()`, `patch()`, and `trace()` do not accept `follow` — readers would otherwise pass `follow=True` expecting redirect-following and get no error, just silently unfollowed responses. — The `follow` argument exists only on the sync `TestClient`; async request methods ignore it rather than raising, so an undocumented gap turns into a silent behavioral surprise for users porting sync tests to `AsyncClient`.

<!-- /braindump -->