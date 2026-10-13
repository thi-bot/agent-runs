# Type System & Annotations

> Rules for Python type hints and TypeScript types: annotating parameters/returns, using general types, unions, interfaces, PropTypes, and avoiding implicit any.

**When to check**: When adding or changing type annotations, TypeScript types, interfaces, or PropTypes.

## Rules

<!-- rule:2340 -->
- Prefer `isinstance(value, str)` over truthiness (`if value:`) and `type(obj) == Type` — truthiness breaks on empty strings/`0`/empty collections, and identity checks miss subclasses — N/A — no changes needed
  - Pass a tuple to `isinstance` (`isinstance(x, (A, B))`) instead of chaining `isinstance(...) or isinstance(...)` — single dispatch is clearer and faster
  - Don't hardcode concrete subclasses in `isinstance` checks to gate behavior; add an overridable class attribute (e.g. a `False`-defaulting flag on the base class) so subclasses opt in — new subclasses shouldn't require edits to the checker
<!-- rule:2762 -->
- Annotate every concrete implementation and subclass, not just the base class — e.g. `expand_db_attributes`, `expand_db_attributes_many`, `get_many`; `Component.render_html(self, parent_context: Mapping[str, Any] = None) -> str` — so type checkers catch mismatches at real call sites, importing `Mapping`/`Any` from `typing` as needed. — Type checkers and IDEs resolve annotations from the concrete method, not the base class; unannotated overrides silently degrade to `Any` for callers and break `.pyi` stub generation.
<!-- rule:17 -->
- In TypeScript files, declare shared interfaces, type definitions, and enums at the top of the module (directly after the import statements) and at the outermost scope of the file rather than nested inside function bodies or inline near first usage. — The rule is a general TypeScript code-style convention ("In TypeScript files, declare shared interfaces, type definitions, and enums at the top of the module..."), and the evidence shows it being applied across multiple different directories (client/src/controllers/RevealController.ts, client/src/controllers/BlockController.ts, client/src/includes/userbar.ts). Because it governs any TypeScript module rather than a single directory, module, or specific file, per the decision criteria (multiple di
<!-- rule:284 -->
- Normalize DOM/optional values instead of asserting — `as string` hides `null`/`''` bugs until they crash at runtime — Keeps consistency with TypeScript's null vs. undefined semantics and prevents runtime errors from unnormalized DOM values.
    - Convert `null` → `undefined` (or omit the property) before assigning to `string | undefined` fields, so runtime APIs never receive `null`
    - Capture `textContent` for later restoration as `textContent || ''`
    - For `getAttribute()`: use `?? undefined` when an empty string must be preserved; use a truthy guard (`attr ? parseInt(attr, 10) : null`) when `''` should count as absent
    - Reserve `as string` for after a guard or default has already proven the value non-null
<!-- rule:2011 -->
- Type params/returns against the most general type: `File` over `UploadedFile`, `Mapping[str, Any]` over `Context`/`dict` — narrower types reject callers that pass equally valid inputs and force unnecessary imports. — Callers passing a plain `File` or `dict` break type checks against the narrower annotation, even though both satisfy the `Mapping`/file interfaces actually used.
<!-- rule:2166 -->
- Annotate `None`-default params as `T | None` with PEP 604 unions, not `typing.Optional`/`typing.Union` — keeps type hints accurate and consistent across the codebase — A bare `T` annotation on a parameter defaulting to `None` misleads type checkers and readers about valid inputs. PEP 604 `X | Y` is the modern syntax in `from __future__ import annotations` / Python 3.10+ code, and mixing in `typing.Optional`/`typing.Union` creates inconsistent style across modules.
<!-- rule:1917 -->
- Use Django `UUIDField` for UUID model fields and keep UUIDs as `uuid.UUID` objects (not `str`) unless a string form is explicitly required — preserves type semantics and prevents string/UUID comparison bugs. Generate random UUIDs with `uuid.uuid4()` for unique values rather than deriving them from session/user IDs — avoids predictable or colliding identifiers. — type semantics and comparison bugs; predictability/collisions
<!-- rule:456 -->
- Annotate function parameters and interface method signatures with explicit types — implicit `any` hides mismatches at call sites. Mark optional params with `?`, and use inline object types like `options: { pattern: string }` for simple option objects. — Implicit `any` disables type checking at call sites, so misuses of the function silently compile. Explicit param types — including `?` for optionals and inline shapes for simple options — keep signatures self-documenting and catch mismatches early without pulling in a named interface.
<!-- rule:42 -->
- Match return annotations to actual return shape — use `list`/`List[Model]` for ordered variable-length collections, the concrete type for single-value returns instead of `Tuple[...]`, and update annotations when container types change (e.g., `Tuple` → custom list subclass). — ...
  Rationale: Annotations that drift from real return shapes mislead type checkers and callers, causing false safety at call sites and hiding bugs when containers are refactored.
<!-- rule:1571 -->
- Source types from canonical origins, not local copies. — Duplicated interfaces drift from upstream; explicit imports surface real deps and catch breakage at compile time.
<!-- rule:448 -->
- Omit `: void` on class methods (e.g. Stimulus lifecycle methods in `client/src/controllers/`); add it to standalone functions like `initTagField.ts` — inferred class returns are noise, standalone contracts need clarity — 
<!-- rule:1639 -->
- Bind optional globals like `window.telepath` to a local `const` before type guards — TypeScript narrowing sticks to the binding, not repeated global access — Type guards narrow the specific reference they're applied to; re-reading a mutable/optional global in later lines resets to the declared (possibly `undefined`) type, so local binding is what makes narrowing hold.
<!-- rule:97 -->
- Predicates and `isX` helpers must return strict booleans — write `value is not None and value.predicate()`, and in shared boolean utilities coerce operands (`!!x && !!y`) instead of returning a raw falsy value — so callers doing `=== true` / truthiness checks don't misbehave when a falsy-but-non-`false` value leaks through. — TypeScript `=== true` checks and Python code relying on `is True` break silently when a predicate returns `0`, `''`, or `None` instead of `False`. Coercing at the source keeps the contract consistent across `client/src/utils/date.ts`, `wagtail/models/__init__.py`, and any other `isX` helpers.
<!-- rule:2843 -->
- Accept any non-string `Iterable` and exclude `str`/`bytes` when coercing scalar-or-container values — strings are iterable, so a bare `hasattr(v, '__iter__')` check would split text into characters. — Strings are iterable but semantically scalar, so accepting any iterable without excluding strings turns a value such as `'Hello world'` into `'H,e,l,l,o,...'`, surprising callers and breaking downstream CSV export. Over-restricting accepted values to `list` instead rejects valid iterable containers and makes sibling block implementations inconsistent.
<!-- rule:20 -->
- Prefer `interface` for object-shaped type contracts, reserving `type` for unions, intersections, and mapped types — interfaces support declaration merging and give clearer errors, and the split signals intent — `interface` supports declaration merging and yields better error messages for object contracts; `type` is required for unions/intersections/mapped types. Keeping the two distinct makes intent obvious at a glance and lets downstream code augment the shape via module augmentation.
<!-- rule:3065 -->
- Mark props `.isRequired` when the component breaks without them, even inside `PropTypes.shape` — catches missing data at dev time instead of in production. — Required markers force callers to supply data the component actually depends on; optional typing on load-bearing props hides bugs until they surface as runtime crashes.
