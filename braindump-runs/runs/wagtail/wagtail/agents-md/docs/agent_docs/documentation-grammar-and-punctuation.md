# Documentation Grammar and Punctuation

> Grammar, punctuation, articles, possessives, number formatting, and sentence-level clarity for documentation prose.

**When to check**: When writing or editing documentation prose and checking sentence-level correctness.

## Rules

<!-- rule:112 -->
- In `docs/` prose (`.md`/`.rst`), split independent clauses into separate sentences and join them only with a conjunction, dash, or semicolon — bare-comma run-ons confuse readers and translators — Documentation is read by humans and often fed to translation/parsing tools; comma splices and run-ons are the most common ambiguity source in prose, so clean clause boundaries improve comprehension and localizability.
<!-- rule:2280 -->
- Use apostrophe-s for singular possessives (`Wagtail's`, `bird's eye view`) and trailing apostrophes only for plural nouns ending in `s` (`files'`), never for simple plurals (`users`, not `user's`) — keeps docs prose grammatical and consistent across pages — Possessive and plural apostrophes are a common source of typos in prose; consistent conventions keep documentation readable and avoid reviewer churn on style nits.
<!-- rule:2172 -->
- In `docs/` prose (e.g. `docs/topics/writing_templates.rst`, `docs/topics/pages.rst`), keep parenthetical asides balanced — close `)` right after its content and offset comma asides with commas on both sides. — Unbalanced or mispunctuated asides garble the sentence and break rendered markup, confusing readers scanning docs.
<!-- rule:111 -->
- In `docs/` prose, match grammatical number and articles to the referent — singular fora single item ('update the record', 'a setting'), plural for sets ('these commands') — Number/article mismatches ('the record' when several exist, missing articles before countable singulars) make examples ambiguous about whether users act on one item or many, so readers misapply the instruction.
<!-- rule:1475 -->
- In documentation prose, select the indefinite article based on the pronunciation of the following word, not its spelling — in particular, write 'an HTML ...' (H is pronounced with a vowel sound 'aitch') rather than 'a HTML ...'. Apply the same pronunciation-based rule to other acronyms/initialisms ('an asterisk', 'an image'). — The rule is a documentation specific prose/style convention... All five observed applications are inside the docs/ tree...
<!-- rule:2750 -->
- Write complete, idiomatic English in docs prose — docs are user-facing, and missing articles (`in a custom template`, not `in custom template`), truncated phrases (`use separate templates whenever`), and non-idiomatic phrasing read as machine-generated. Refer to components as included `in a template` (not `on a template`), and prefer `add your own {noun}` over `add your {noun}`. — The rule is strictly about documentation prose style and all evidence comes from files under the `docs/` directory, so it belongs in `docs/AGENTS.md` where an assistant editing `.rst`/`.md` docs will find it without polluting unrelated modules.
<!-- rule:119 -->
- In `docs/` prose, prefer infinitival purpose clauses (`rules to find X`, `use X to regenerate Y`, `need to identify`) over gerund or relative-clause phrasing — infinitives read as direct instructions and scan faster — Documentation that uses infinitival purpose constructions is easier for readers to scan and parse as instructions, and consistent verb phrasing across `docs/` avoids the ambiguity that gerunds and bare relative clauses introduce.
  - Keep the infinitive marker `to` after `need`/similar verbs before an action verb — `need identify` reads as a typo; when a gerund must follow, introduce it with an explicit connector (`when`, `in`)
<!-- rule:728 -->
- Pair an exception or contrast with its rule in one sentence using neutral connectives (`but`, `While`) — trailing 'though', loaded 'Even though', and dangling clauses like 'This differs from the X is to Y' obscure the contrast and read as editorializing — Keeps related clauses adjacent for readability and avoids imposing surprise/narrative tone on technical docs
<!-- rule:2493 -->
- In `docs/` prose, write counts as `<number> <noun> per <time unit>` (`2 releases per week`), and prefer larger round units (`weekly` over `every 7 days`) — bare counts read ambiguously and mislead readers. — Counted nouns remove ambiguity about what is being counted; round units match how readers naturally phrase frequency and avoid awkward conversions.
<!-- rule:2259 -->
- In `docs/` prose, spell out small numbers (`two release cycles`) and write ranges as `X to Y`, not numerals or spaced hyphens — matches published style (e.g. `140 to 155 characters`) and reads naturally for humans — Documentation prose targets human readers, not code; numerals and en-dash-free ranges break the established writing style in `docs/contributing/` and `docs/editor_manual/`.
<!-- rule:255 -->
- Express inclusive upper limits as `up to {N}`, not `{N} or less` or `between 1 and {N}` — the latter two imply a lower bound that doesn't exist — Two related prose conventions: phrasing (`up to {N}` is unambiguously inclusive with no false lower bound) and accuracy (readers cannot act on `a few` or an outdated number). Both are documentation-only concerns, so they belong in `docs/AGENTS.md` rather than a repo-root file.
  - State the actual current threshold in prose, never a placeholder or approximate value — stale numbers mislead readers who rely on the docs
<!-- rule:2500 -->
- Write "site to site" as two unhyphenated words in documentation prose, not "site-to-site" — matches the established docs terminology and keeps search/grep results consistent. — The docs use "site to site" as the canonical form; hyphenated variants fragment terminology and break text searches across the `docs/` directory.
<!-- rule:3081 -->
- Phrase `index.*Field` restrictions as '`index.XField` should only be used on fields that…' — keeps 'index' unambiguous as the namespace, not a verb — Starting with 'Only index fields…' makes 'index' read as a verb, muddying the subject/verb relationship in search docs like `docs/topics/search/indexing.md`. Leading with the field name keeps the sentence parse-clear.
<!-- rule:1355 -->
- Write numeric values without thousands separators in `docs/` (e.g., `10000`) — avoids locale-dependent ambiguity for international readers
