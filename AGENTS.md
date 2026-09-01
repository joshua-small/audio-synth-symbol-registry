# AGENTS.md

Instructions for Codex and other agents working in this repository.

## Operating principle

Humans own intent and authority. Agents execute approved work, produce reviewable evidence, and never infer authority from an open Issue, an open pull request, or silence.

Proceed autonomously for routine implementation, research, validation, documentation, and review inside the established scope. Stop only for a real decision or authorization gate, not for ordinary mechanical work.

## Source of truth

- Registry semantics and evidence live in `registry/` and `evidence/`.
- Durable project decisions live in `docs/decision-log.md`.
- GitHub Issues track work; pull requests carry review evidence.
- Trello tracks project planning and cross-repository research.
- A chat instruction from Joshua is valid authorization when it is clearly responsive to a stated Human Review question. Record the resulting decision in the PR and decision log before merging or releasing.
- After a Human Review gate is resolved through interactive chat or an available action runner, resume the approved work immediately. Do not wait for a new prompt or ceremonial confirmation; continue until the next real decision, authorization, or external-capability gate.

## Versioning

Follow [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html) and `docs/versioning.md`.

Do not create a release or tag, change the compatibility policy, redefine a stable ID, or make an incompatible schema change without human authorization.

## Human review gates

Joshua has delegated technical, methodological, accessibility, evidence, packaging, internal-validation, and internal study-readiness decisions to agents. Within the currently authorized six-concept filter repertoire, agents must resolve those decisions through documented independent review and continue without a Human Review prompt. This includes private/offline harness design, study sequencing, validation criteria, internal readiness labels, and other non-operational study preparation. Agents may research future scope autonomously, but activating a new semantic family or expanding the active repertoire remains a Human Review decision.

Create a Human Review section in the pull request and pause merge only when work requires:

- Human visual judgment for any intentional change to visible glyph geometry or family design; byte-only, metadata-only, or demonstrably rendering-invariant maintenance is excluded
- Artwork acceptance or designation as canonical reference artwork
- Activation of a new semantic family or expansion of the active six-concept repertoire
- Promotion to `registry-accepted`, which makes a provisional identifier permanent; normally defer and batch this decision into review of the complete external submission package instead of interrupting earlier work
- Review and authorization of the complete external submission before it is sent
- Participant recruitment, study launch, or access by real participants
- External outreach, submission, endorsement, or an attribution claim involving Unicode, ISO, IEC, AES, SMuFL, a vendor, a community, or another outside party
- Public release or publication
- Spending, incentives, licensing, contributor agreements, copyright, trademark, legal commitments, privacy or consent commitments, or reuse of third-party material
- Governance changes, security boundaries, credentials, account access, or destructive actions
- A nondelegable owner decision or a materially ambiguous decision that independent agent review cannot resolve safely

Routine evidence additions, typo corrections, tests, tools, documentation, and backwards-compatible schema work do not require human approval unless they trigger a gate above.

Do not split internal work into serial Human Review prompts merely because a conservative next step can be described as a separate authorization. If it remains private, reversible, non-operational, and inside the delegated categories, document the decision and adverse review in the pull request and decision log, then proceed.

## Pull request protocol

For each nontrivial pull request:

1. Run relevant validation and record exact results and omissions.
2. Obtain an independent agent review when practical.
3. Add an `## Agent Report - YYYY-MM-DDTHH:MM:SS-07:00` section or comment with scope, evidence, validation, and limitations.
4. If a gate applies, add:

   ```md
   ## Human Review

   ### HR-001: Short decision question
   - Decision needed:
   - Recommendation:
   - Alternatives:
   - Consequence of each choice:
   - Merge status: blocked pending authorization
   ```

5. When Joshua answers in chat or on GitHub, add a dated PR comment summarizing the authorization, update `docs/decision-log.md` if it is durable, and then continue.
6. If no Human Review item remains and checks pass, agents may merge without waiting for ceremonial approval.

Use ISO 8601 timestamps with an explicit numeric UTC offset. Prefer Joshua's currently configured local timezone when available.

## Evidence and artwork

Separate observed fact, interpretation, open question, and recommendation. Preserve counterevidence. Use direct, durable sources where possible.

Do not copy, trace, or imply permission to use vendor, standards-body, or third-party artwork. Reference artwork must be original, neutral, editable SVG, and linked to an approved semantic record.

Do not claim Unicode encoding or proposal status without a documented decision and evidence.

## Focus and handoff

Keep changes focused. Do not silently rewrite unrelated work. Before finishing, review the complete diff, validate the affected paths, and state what was not validated.

If an action is blocked by an unavailable integration, report the exact capability gap and continue all safe work that does not require it.
