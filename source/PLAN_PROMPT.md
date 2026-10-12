# Optional /plan prompt
If the Claude interface supports /plan, enter that mode and paste the text below. Otherwise paste it as a normal message. The implementation plan is already supplied; this pass is optional.

Read CLAUDE.md, docs/PRD.md and docs/BUILD_SEQUENCE.md. Review the supplied route registry, content objects, design tokens, page compositions, UX contracts and acceptance criteria. Produce one short execution checklist mapped to the actual repository. Do not redo product discovery, competitor research, SEO strategy or copywriting. All normal design and scope decisions are settled.

Identify only concrete incompatibilities in the existing repository, missing files referenced by the pack, or external launch credentials. Use the documented default for anything not blocking implementation. Keep the plan to the six build stages. Do not ask me to choose among architectures or defer complete pages. Explicitly distinguish implementation work from company approval and hosting/account actions.

If the interface allows implementation in this same turn, proceed directly using IMPLEMENT_PROMPT.md. If plan mode prevents writes, finish with the implementation checklist ready for the interface's execute action; do not claim code has been written.
