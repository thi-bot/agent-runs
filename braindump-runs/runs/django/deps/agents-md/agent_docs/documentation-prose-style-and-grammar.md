# Documentation Prose Style and Grammar

> Proofreading, grammar, articles, verb forms, punctuation, list phrasing, placeholders, and plain neutral English in documentation prose.

**When to check**: When proofreading or revising documentation prose for clarity, grammar, and style.

## Rules

<!-- rule:46 -->
- Proofread `RST`/`DEP` prose before merge — catch typos, duplicated words, article/tense errors, and wrong prepositions ("different from" not "different for") in specs and user-facing docs. — Prose errors in published specs and docs are user-facing and costly to correct later.
<!-- rule:217 -->
- Write docs, especially normative/governance docs, in plain neutral English for a global audience — avoid obscure, ambiguous, politically/culturally loaded, or ideological terms (e.g. prefer `solicit proposals` over `canvas for proposals`, `perfect world` over `utopian world`); loaded phrasing gets misread by non-native and cross-cultural readers, creating disputes over what the document actually requires — The wording is deliberate: these terms are unambiguous to a global audience, whereas alternatives like `canvas for proposals` or `utopian world` carry cultural/political baggage or ambiguity that can be misinterpreted and litigated in normative documents.
<!-- rule:111 -->
- Write documentation prose that adds new information only — restate ambiguous back-references like "this distinction" directly, cross-reference concepts already explained instead of repeating them, end sentences at the actionable consequence, and drop redundant qualifiers. In `DEP` docs, skip clauses like `depending on which template you are using` when a preceding instruction already establishes the dependency; state format options directly. — Ambiguous back-references and repeated context force readers to backtrack or re-derive what's already been said, slowing them down and obscuring the actual instruction; redundant qualifiers in `DEP` docs add noise where the dependency is already clear.
<!-- rule:146 -->
- Proofread verb forms in docs prose: singular verbs for gerund subjects, present perfect for still-relevant past actions, future tense for post-prerequisite steps, base verb after "help" ("help manage") — tense/agreement errors mislead readers about sequence and state — Verb agreement and tense signal whether a step is done, still relevant, or depends on a prerequisite; breaking them (e.g., "help manages" or past tense for contemporary behavior) makes instructions ambiguous across `draft/`, `final/`, and `accepted/` docs.
<!-- rule:57 -->
- Add articles to singular count nouns in docs — write 'a `Shepherd`', 'a member of the `DSF Board`', 'the existing `FilteredRelation`', 'in the `FROM` clause'. Bare count nouns read as ungrammatical prose; rephrase if an article feels awkward. — Bare count nouns read as ungrammatical prose; rephrase if an article feels awkward.
<!-- rule:83 -->
- Write `its` for possession, `it's` only for "it is" — mix-ups read as errors in DEP/RST prose — In prose documentation, including DEP/RST files, `its` (no apostrophe) is the possessive and `it's` is the contraction of "it is"; swapping them is a grammar error visible in rendered docs. This applies to all prose across the repo, not just a single module.
<!-- rule:45 -->
- 在文档正文（`.md`, `.rst`, `.txt` DEP）中使用标准标点：完整句子以句号结尾；结尾标点放在强调标记外，除非它是强调短语的一部分；括号/方括号需成对；插入语用逗号隔开——匹配上游 `draft/`、`drafts/` 和 `*.rst` 文档风格，避免 diff 噪音，并保持 DEP 可读性。 — DEP 和 RST 文档会由工具链和人类编辑一起处理，因此标点不匹配（如悬垂的括号或逗号位于 `*emphasis*` 之外）会渲染错误，并在合入 `draft/`、`drafts/` 和 `*.rst` 时产生无意义的 diff 噪音。将这一约定一致地应用于各处 Markdown、RST 和 DEP 说明文档，可保持仓库中文档风格的统一——因此将其放在仓库根目录。
<!-- rule:219 -->
- Introduce prose lists with `the following`, not counts like "three issues" — counts go stale as items change; join the last item with `and`, and drop hedges like "among other issues" — Explicit counts and vague trailing phrases (e.g., "among other issues") both misrepresent the list as it evolves — the number drifts whenever items are added or removed, and the hedge just adds noise. "The following" plus a trailing `and` stays accurate and reads tightly, matching the documentation style used under `draft/` (`draft/accessibility-team.rst`, `draft/0000-background-workers.rst`).
<!-- rule:56 -->
- Match verb form across bullets in requirement lists; echo the lead-in's verb — after `must do the following:` start each item with `Be …`/`Have …` (base form, spelled correctly), not bare fragments or simple past, so every item reads as an equally binding obligation. — Parallel bullets signal that each item carries the same normative weight; mixing fragments and tense makes readers unsure which obligations are real requirements versus notes.
<!-- rule:81 -->
- In prose docs, pick placeholder letters distinct from nearby words — use `X`/`Y` instead of `A` next to "a" — Prevents confusing same-letter/different-case pairs like "``A``, a" that read ambiguously in RST docs and DEP/spec prose.
