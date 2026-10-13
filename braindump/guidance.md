These entries are coding rules mined from GitHub PR review comments, intended for AGENTS.md files that guide AI coding assistants. For each rule, judge whether the rule text is a GOOD coding rule or ANOMALOUS.

Mark a rule anomalous when ANY of these holds:
- Vague or non-actionable: states a truism or preference ("write good code", "be consistent") with no concrete, checkable instruction an assistant could follow.
- Meta-reference: the rationale or text refers to the mining process, "this rule", "this guideline", "the cluster", or the fact it was extracted from comments, rather than explaining the codebase consequence.
- Generic boilerplate: could apply verbatim to ANY Python project with no project-specific identifier, file path, or convention (rules that name real project modules, paths, or conventions are fine).
- Legacy convention: prescribes a practice that is outdated for a modern Python codebase (e.g. Python 2 compatibility, `six`, old Django idioms no longer current).
- Empty or malformed: text is empty, a sentence fragment, or not readable as a rule.

A rule is NOT anomalous just because it is short, opinionated, or applies to a narrow subsystem — concrete and checkable is good.
