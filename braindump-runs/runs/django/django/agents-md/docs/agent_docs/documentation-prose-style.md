# Documentation Prose Style & Terminology

> Word choice, grammar, tense, actor attribution, and precise domain terminology in documentation prose and headings.

**When to check**: When writing or editing documentation prose, headings, explanatory text, or release-note wording

## Rules

<!-- rule:1222 -->
- Drop redundant qualifiers like `where possible` after `Prefer` in `docs/internals/contributing/` style guidance — hedging dilutes the recommendation; keep `where applicable` only when it meaningfully scopes the rule. — Redundant qualifiers around preference terms make documentation and coding-style guidance weaker and more ambiguous, so readers cannot tell which recommendations are firm and which are optional. When style guidance lacks concrete examples or rationale, contributors must guess at intent, producing inconsistent code and avoidable review churn.
  - Back style preferences in `writing-documentation.txt` and `coding-style.txt` with concrete examples and rationale (e.g., cite the relevant PEP), not external tool references — readers need project-specific justification, not tooling links.
<!-- rule:3042 -->
- In `docs/`, refer to subdirectories as `folder` or `directory` (e.g., "`app` folder"), not by component name alone — readers otherwise conflate a component with its location. — Documentation in `docs/` mixes components and their on-disk locations; explicit folder terminology and unambiguous relative phrasing prevent readers from misplacing files when following howtos and reference docs.
  - Phrase relative locations explicitly ("in the same folder as the template") — vague wording forces readers to guess at paths.
  - When describing a directory's contents, note common optional extras (`templates`, `fixtures`, etc.) and link a real-world example — shows users what a working layout looks like.
<!-- rule:5388 -->
- In `docs/` prose, name the acting subject explicitly (e.g. "Django", "the user", "the form") — if no single actor is accurate, omit the subject entirely. An implicit or misleading actor silently attributes behavior to the wrong component, which readers then take as spec. — `docs/ref/` and `docs/internals/contributing/writing-code/` are read as authoritative behavior descriptions; a fuzzy "it does X" or a wrong agent lets readers build a mental model that diverges from the code.
<!-- rule:4448 -->
- In policy/procedure docs (e.g., `docs/internals/security.txt`), state actual procedural outcomes, not unverified punitive consequences — write "we cannot process your request without all required information," not "will count against you," so policy text doesn't promise enforcement the codebase doesn't guarantee. — Unverified punitive language ("will count against you") implies enforcement the docs can't back up, and unexplained burdensome asks get misinterpreted as errors.
  - Explain the rationale when asking readers to take a counterintuitive or burdensome action — readers misread ungrounded security/process requests as mistakes or hostility.
<!-- rule:2654 -->
- In `docs/`, name concrete referents (`password reset URL`, not `the URL`) and describe parameter roles precisely (`displayed as a component of …`, not `displayed in …`) — ambiguous prose makes readers guess which URL or role is meant. — Docs in `docs/` (e.g. `docs/intro/tutorial01.txt`, `docs/topics/auth/default.txt`) frequently mention several URLs and parameters on the same page. Vague phrases like `the URL` or `displayed in` force readers to infer the intended target, and translations inherit the same ambiguity.
<!-- rule:359 -->
- Write 'source code', not 'codebase' or 'code base', in Django docs prose — keeps terminology consistent across the docs — Django's documentation uses 'source code' as the standard term when referring to the project's code; mixing in 'codebase' or 'code base' creates inconsistent prose across docs pages.
<!-- rule:4433 -->
- Avoid ambiguous or idiomatic terms in `docs/` guidance — prefer plain, concrete wording — In voice/style sections like `docs/internals/contributing/writing-documentation.txt`, vague terms such as "platitudes" or "high-sounding" leave contributors guessing at the intent. Spell out the meaning instead — e.g. "generic statements that are vague or obvious and don't provide concrete technical guidance", or "grandiose"/"inflated" — so the guideline can be applied consistently by everyone writing docs.
<!-- rule:6404 -->
- Use `aid` for assistance and `aide` only for a person (e.g., "as an aid for debugging") — `aide` means a human helper, so using it for assistance is a misspelling that spellcheckers won't catch. — The two words differ only by a final `e`, so the misuse reads as correct to spellcheckers and reviewers while being semantically wrong. Fixing it keeps documentation prose accurate and consistent with the rest of `docs/`.
<!-- rule:5789 -->
- Use base verbs after auxiliaries (`didn't prohibit`) and simple infinitives (`to be`) over perfect infinitives (`to have been`) in `docs/releases/` prose — grammatical slips in release notes undermine user trust in the changelog — Perfect verb forms after auxiliaries (e.g., `didn't prohibited`, `to have been`) read as ungrammatical to readers; release notes are user-facing prose where such errors are noticed and reduce credibility, unlike code where verb tense is irrelevant.
<!-- rule:3157 -->
- Write roles in `docs/` as `"responsible for" + gerund` with concrete duties — vague filler hides ownership, and `"responsible to" + infinitive` misreads as reporting lines rather than duties — Role descriptions under `docs/internals/...` and `docs/topics/...` are read as ownership maps; fluffy filler and "responsible to <verb>" phrasing leave readers unsure who owns what, while "responsible for <gerund>" plus concrete duties states it unambiguously.
<!-- rule:1103 -->
- Use "self-closing tags" in `docs/**/*.txt` prose and release notes — matches HTML/XML spec terminology — Incorrect variants like "self-closed tags" or "a self-closed tags" read as ungrammatical to users familiar with the specs; consistent terminology across release notes (e.g., `docs/releases/4.0.txt`) keeps docs authoritative and avoids confusing readers searching for the standard term.
<!-- rule:5732 -->
- After "compressed", use `into` for the output format and `with` for the algorithm — never `in` — Disambiguates the resulting format (e.g. `.gz`) from the compressor that produced it, so docs read unambiguously.
<!-- rule:5620 -->
- In `docs/`, use `project` for a deployable Django site/installation (including multiple deployment instances) and `app` for reusable Django applications — Django assigns these distinct meanings, so conflating them misleads readers about which concept is meant. — Django's documentation uses `project` and `app` as separate, well-defined concepts (a deployable site vs. a pluggable package). Using them interchangeably — e.g. calling a reusable package a 'project' or a deployment an 'app' — obscures which abstraction is being discussed. Apply this in `docs/AGENTS.md` since it is a terminology convention scoped to the documentation.
<!-- rule:6188 -->
- Describe governance norms declaratively in `docs/` — e.g., 'Rough consensus is the norm' in `docs/internals/organization.txt`, not 'should be' — prescriptive phrasing reads as aspiration, not settled practice — Governance docs under `docs/` present existing practice to readers; using 'should be' makes established norms sound like proposals or ideals rather than what the project already does.
<!-- rule:6230 -->
- Say "abstract model", not "abstract base model", for models with `Meta.abstract = True`; reserve "abstract base model" for cases where the distinction from other base classes matters — keeps Django docs terminology unambiguous and avoids conflating abstract models with unrelated base-class concepts. — Django docs use "abstract model" as the canonical term for `Meta.abstract = True`; calling them "abstract base model" muddies the distinction the docs draw between abstract models and other kinds of base classes, so readers searching or cross-referencing can miss the intended concept.
