# Decision Log

Use ISO 8601 timestamps with an explicit numeric UTC offset. A decision is durable only after it is recorded here.

## D-001: Initial filter-response set

- Date: 2026-08-29T14:59:17-07:00
- Status: Accepted
- Owner: @joshua-small
- Decision: Start with high-pass, low-pass, band-pass, and band-stop filter responses.
- Evidence: Cross-angle research synthesis and sources EV-002 through EV-004.
- Counterevidence or objections: Product names and drawings vary; compact response curves may remain UI-specific.
- Alternatives considered: Begin with shelving, bell, waveform, routing, or a broad industry glyph collection.
- Consequences: The MVP stays narrow and evidence-led.
- Revisit trigger: New evidence shows a core member is unstable or missing.

## D-002: Axis-bearing response forms

- Date: 2026-08-29T14:59:17-07:00
- Status: Accepted
- Owner: @joshua-small
- Decision: Treat axis-bearing response graphs as illustrative variants, not independent initial registry entries.
- Evidence: User-provided examples distinguish compact response forms from full graphs; vendor and education sources use both.
- Counterevidence or objections: An axis-bearing form could later prove to have independent use.
- Alternatives considered: Include separate axis-bearing records immediately.
- Consequences: v0.1 schema requires axis-bearing forms to remain illustrative-only.
- Revisit trigger: Repeated standalone use establishes a distinct semantic identity.

## D-003: Registry-first standards path

- Date: 2026-08-29T14:59:17-07:00
- Status: Accepted
- Owner: @joshua-small
- Decision: Build a public registry and evidence corpus before pursuing a Unicode submission.
- Evidence: [Unicode character proposal FAQ](https://www.unicode.org/faq/char_proposal.html), [SEW guidelines](https://sew.unicode.org/guidelines), and [Unicode symbol guidance](https://unicode.org/pending/symbol-guidelines.html).
- Counterevidence or objections: A public plain-text need has not yet been established.
- Alternatives considered: Submit a formal Unicode proposal immediately or stop at vendor artwork.
- Consequences: Unicode work remains preparatory and must not be presented as a submitted proposal.
- Revisit trigger: Evidence packet and review support a preliminary Unicode inquiry.

## D-004: Future scope

- Date: 2026-08-29T14:59:17-07:00
- Status: Accepted
- Owner: @joshua-small
- Decision: Keep broader audio and synthesis symbol families in separately reviewed future scope.
- Evidence: The 2015 reference image and research backlog identify many adjacent families with different semantics and adoption histories.
- Counterevidence or objections: A broader registry could be more immediately useful, but would dilute the initial evidence question.
- Alternatives considered: Include all identified industry-specific controls in v0.1.
- Consequences: New families require their own Issue, evidence review, and decision.
- Revisit trigger: A family meets the registry acceptance rubric.

## D-005: PUA boundary

- Date: 2026-08-29T14:59:17-07:00
- Status: Accepted
- Owner: @joshua-small
- Decision: Do not use PUA assignments as canonical identifiers or imply Unicode encoding.
- Evidence: [Unicode Private Use Areas](https://unicode.org/versions/Unicode17.0.0/core-spec/chapter-23/).
- Counterevidence or objections: An optional experimental font profile may later be useful.
- Alternatives considered: Assign initial PUA code points as the registry interchange form.
- Consequences: ASCII semantic IDs, text fallbacks, and speech labels are canonical.
- Revisit trigger: A separate, clearly experimental interoperability use case is approved.

## D-006: Work surfaces

- Date: 2026-08-29T15:33:43-07:00
- Status: Accepted
- Owner: @joshua-small
- Decision: Use GitHub for registry source and review; use Trello for project planning and reports.
- Evidence: The connected GitHub integration supports repository, Issue, PR, and comment work; GitHub Projects is unavailable in this session. Trello cards are available but comments are not.
- Counterevidence or objections: Tool capabilities can change.
- Alternatives considered: Keep all work solely in Trello or wait for Projects support.
- Consequences: Repository Issues provide the operational backlog.
- Revisit trigger: Tool capabilities or project workflow materially change.

## D-007: Semantic Versioning

- Date: 2026-08-29T15:41:23-07:00
- Status: Accepted
- Owner: @joshua-small
- Decision: Version registry artifacts with [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html).
- Evidence: Project-owner preference and SemVer specification.
- Counterevidence or objections: Data and artwork may need release discipline beyond a single code package version.
- Alternatives considered: Date-only or unversioned releases.
- Consequences: Each artifact type receives explicit version metadata.
- Revisit trigger: Release practice exposes a needed refinement.

## D-008: License model

- Date: 2026-08-29T16:34:52-07:00
- Status: Accepted
- Owner: @joshua-small
- Decision: License registry data and original neutral SVGs under CC0-1.0; tooling under Apache-2.0; prose documentation under CC-BY-4.0. Use OFL-1.1 only if a font is later published.
- Evidence: Owner authorization in project chat; [CC0 legal code](https://creativecommons.org/publicdomain/zero/1.0/legalcode.en), [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0.txt), and [CC BY 4.0 legal code](https://creativecommons.org/licenses/by/4.0/legalcode.en).
- Counterevidence or objections: Split licensing adds repository administration.
- Alternatives considered: A single license for all content or leaving the repository unlicensed.
- Consequences: The public registry is legally reusable while code and prose retain appropriate terms.
- Revisit trigger: A font or a materially different asset class is introduced.

## D-009: Identifier permanence

- Date: 2026-08-29T16:34:52-07:00
- Status: Accepted
- Owner: @joshua-small
- Decision: An `asr:` identifier is provisional while evidence-collecting or registry-candidate, and permanent when registry-accepted.
- Evidence: Owner authorization following schema review.
- Counterevidence or objections: Reserving identifiers at first publication would provide stronger early stability but less flexibility.
- Alternatives considered: Permanent reservation from evidence-collecting stage.
- Consequences: Status must be published with each record, and promotion is a human review gate.
- Revisit trigger: External adoption establishes a need for earlier permanence.

## D-010: Registry release contents

- Date: 2026-08-29T16:34:52-07:00
- Status: Accepted
- Owner: @joshua-small
- Decision: Registry releases version all published data regardless of record status. The accepted repertoire is the registry-accepted subset.
- Evidence: Owner authorization following SemVer review.
- Counterevidence or objections: Consumers must check status instead of assuming every release entry is accepted.
- Alternatives considered: Release only accepted records.
- Consequences: v0.1.0 can honestly publish evidence-collecting entries.
- Revisit trigger: Consumer feedback shows the status model is insufficient.

## D-011: Notch relationship

- Date: 2026-08-29T16:34:52-07:00
- Status: Accepted
- Owner: @joshua-small
- Decision: Keep band-stop as the MVP entry and treat notch filter as a provisional related term pending corpus evidence.
- Evidence: Owner authorization and product/education evidence in EV-002 and EV-003.
- Counterevidence or objections: Some communities may use notch as an exact synonym, while others treat it as a narrow or high-Q band-stop.
- Alternatives considered: Make notch an unconditional alias or a separate initial entry.
- Consequences: The registry preserves the uncertainty rather than silently collapsing it.
- Revisit trigger: Corpus evidence supports an exact alias or distinct semantic entry.

## D-012: Agent merge authority

- Date: 2026-08-29T16:34:52-07:00
- Status: Accepted
- Owner: @joshua-small
- Decision: Agents may merge routine PRs after independent agent review and passing CI when no Human Review item remains.
- Evidence: Owner authorization in project chat and repository AGENTS.md.
- Counterevidence or objections: Automation can miss contextual risks.
- Alternatives considered: Require manual approval for every merge.
- Consequences: Material human gates remain mandatory; routine work does not wait for ceremonial approval.
- Revisit trigger: Review outcomes show a need for tighter or broader gates.


## D-013: Artwork criteria and recognition-study protocol

- Date: 2026-08-29T17:04:35-07:00
- Status: Accepted
- Owner: @joshua-small
- Decision: Adopt the neutral reference-artwork criteria and the pre-recruitment blind recognition-study protocol in PR #10.
- Evidence: Owner authorization in project chat; independently reviewed PR #10; [SVG 2](https://www.w3.org/TR/SVG2/), [W3C Images Tutorial](https://www.w3.org/WAI/tutorials/images/), and ISO 9186-1:2014 as cited in the policy.
- Counterevidence or objections: Draft/study artwork cannot establish semantic acceptance, and no participant study or published artwork has yet been performed.
- Alternatives considered: Case-by-case artwork and study rules, or deferring artwork policy until a later registry status.
- Consequences: Draft/study artwork may support evidence-collecting or registry-candidate records; accepted artwork requires registry-accepted status. Artwork metadata is independently versioned and authoritative at `artwork/metadata.json`; recruitment and each artwork acceptance remain Human Review gates.
- Revisit trigger: First artwork implementation or study execution exposes an operational gap.


## D-014: Continue after resolved Human Review

- Date: 2026-08-29T17:11:21-07:00
- Status: Accepted
- Owner: @joshua-small
- Decision: After a Human Review gate is resolved through interactive chat or an available action runner, agents must record the authorization and continue the approved project work without waiting for a new prompt.
- Evidence: Owner authorization in project chat and the completed PR #10 artwork-policy gate.
- Counterevidence or objections: Continuing past a resolved gate must not be mistaken for authority to cross a separate gate.
- Alternatives considered: Stop after every human decision and wait for an explicit new work request.
- Consequences: Agents resume implementation, validation, review, merge, and safe follow-on tasks until the next real decision, authorization, or external-capability boundary.
- Revisit trigger: A continuation causes scope or authority confusion.
## D-015: Registry acceptance rubric

- Date: 2026-08-29T17:16:18-07:00
- Status: Accepted
- Owner: @joshua-small
- Decision: Adopt the registry acceptance rubric and assessment lifecycle in PR #12.
- Evidence: Owner authorization in project chat; independently reviewed PR #12; passing CI validation and the documented assessment schema, score, and promotion checks.
- Counterevidence or objections: Current scores remain below candidate threshold, and the rubric cannot establish external Unicode suitability or replace evidence-quality review.
- Alternatives considered: Lower thresholds, remove dimension floors or the 14-day public-review safeguard, or retain the unscored process.
- Consequences: Candidate and accepted promotion require a current eligible assessment and the documented thresholds; registry-accepted additionally requires documented public review, independent review, and explicit human authorization. No current record is promoted by this decision.
- Revisit trigger: Assessment practice or external feedback demonstrates that the thresholds or lifecycle need refinement.

## D-016: Six-concept shelf research scope

- Date: 2026-08-30T16:00:59-07:00
- Status: Accepted
- Owner: @joshua-small
- Decision: Expand active research from four to six provisional concepts by adding sign-agnostic low shelf and high shelf. Treat signed gain as a separate parameter or illustrative state. Use the two-prong fork as the active shelf research topology and reject the three-prong/baseline-bearing shelf alternative from active low-shelf and high-shelf research.
- Evidence: Owner authorization in project chat and PR #54; shelf semantic, historical/education/community, and vendor reports backed by EV-050 through EV-057 and EV-060 through EV-065.
- Counterevidence or objections: Axis-less shelf curves remain underdetermined; cross-vendor contour convergence and portable character usage are not established; six-way confusability remains untested.
- Alternatives considered: Keep shelves outside current research; require more evidence; exclude shelves; or retain a three-prong/baseline-bearing active alternative.
- Consequences: Research plans and draft comparisons may cover high-pass, low-pass, band-pass, band-stop, low shelf, and high shelf. Rejected experiments already in repository history may remain historical evidence only. This decision does not create registry records or permanent IDs, accept artwork, authorize study-ready status or recruitment, change external positions, or authorize Unicode action.
- Revisit trigger: Recognition results, evidence review, or an independently established convention materially contradicts the sign-agnostic pair or two-prong topology.

## D-017: Provisional shelf registry records

- Date: 2026-08-30T17:37:18-07:00
- Status: Accepted
- Owner: @joshua-small
- Decision: Create provisional `asr:filter.low-shelf` and `asr:filter.high-shelf` records at `evidence-collecting` with canonical names `Low-shelf filter` and `High-shelf filter`, full text fallbacks `LOW SHELF` and `HIGH SHELF`, sign-agnostic affected-side semantics, empty alias lists, and shelving forms as related terms. Explicitly exclude gain sign and reject low/high cut and unsupported abbreviations as aliases.
- Evidence: Owner authorization in project chat responding to HR-001 and HR-002 in `docs/shelf-record-proposal.md`; EV-050 through EV-057 and EV-060 through EV-065.
- Counterevidence or objections: Compact cross-vendor convergence, portable glyph use, six-way recognition, shelf-specific overlap review, and exact shelf/shelving alias treatment remain unresolved.
- Alternatives considered: Defer records; use shelving IDs; encode signed boost/cut states; adopt abbreviations; or promote the original two-prong artwork.
- Consequences: Registry 0.2.0 adds two provisional semantic records and schema 0.4.0 adds only their two representation-concept enum values. No artwork is accepted, no status is promoted, and no Unicode or external-standard position changes.
- Revisit trigger: Dedicated terminology, overlap, recognition, or usage research materially changes the semantic or representation boundary.

## D-018: Smooth two-prong shelf draft selection

- Date: 2026-08-30T17:36:39-07:00
- Status: Accepted for active draft comparison
- Owner: @joshua-small
- Decision: Integrate the smooth two-prong Fork A low-shelf and high-shelf geometry into the active six-member `compact-a` draft package. Preserve the original four compact candidates exactly. Exclude Fork B and every three-prong/baseline-bearing shelf alternative from the active package.
- Evidence: Owner authorization in interactive project chat after reviewing the Fork A and Fork B contact sheets; bounded comparison preserved at commit `ef767192`.
- Counterevidence or objections: Axis-less shelf forks may be confused with routing, split, merge, or crossover marks, and no recognition study has yet established six-way discrimination.
- Alternatives considered: Fork B's shouldered construction, three-prong/baseline-bearing treatments, or retaining shelves only as experiments.
- Consequences: Fork A becomes active draft material only. Geometry is not locked; artwork is not `study-ready`, accepted, canonical, published, or released; recruitment and study launch remain unauthorized.
- Revisit trigger: Independent package review, human render review, recognition results, or new evidence supports revision or rejection.

## D-019: Six-member geometry lock for study-package construction

- Date: 2026-08-30T21:22:42-07:00
- Status: Accepted
- Owner: @joshua-small
- Decision: Lock the exact SHA-256 hashes of the four `compact-a` response silhouettes and the smooth two-prong Fork A low-shelf and high-shelf silhouettes for blinded study-package construction.
- Evidence: Owner authorization in interactive project chat responding to HR-001 in PR #61; original provenance declarations; deterministic SVG validation and render QA; independent package-integrity review recorded on PR #61.
- Counterevidence or objections: Six-way recognition remains untested, axis-less shelves remain potentially underdetermined, and fork forms may be confused with routing, split, merge, or crossover symbols.
- Alternatives considered: Revise one or more geometries before locking; retain four members; use Fork B; or use a three-prong/baseline-bearing shelf form.
- Consequences: The six exact files listed in `artwork/study-locks/six-member-compact-a.json` may be bound to opaque-token study-package inputs. Smooth two-prong Fork A remains selected; Fork B and three-prong/baseline-bearing forms remain excluded. This decision does not mark artwork `study-ready` or accepted; authorize recruitment, incentives, launch, publication, release, or external outreach; promote any record; or change a Unicode or external-standard position.
- Revisit trigger: Any locked SVG byte changes, review finds a material defect, or recognition evidence contradicts the selected family.

## D-020: Private construction-validation instance

- Date: 2026-08-31T07:37:38-07:00
- Status: Authorized and completed
- Owner: @joshua-small
- Decision: Authorize one private, non-operational construction-validation instance against exact repository commit `8ee4680d62c00e1c768eea2830f53cd6096c3c8f`. Permit a cryptographically random private seed, a local blinded package, hash and leakage checks, verification of all 12 randomized forms, static rendering, and accessibility-boundary inspection.
- Evidence: Owner authorization in interactive project chat responding to HR-002 on Issue #28; commitment-only findings in [`docs/studies/construction-validation-2026-08-31.md`](studies/construction-validation-2026-08-31.md).
- Counterevidence or objections: The construction package has no participant-facing runtime. Keyboard, focus, zoom, error, resume, submission, HTTP metadata, and browser accessibility-tree behavior therefore remain untested. Static validation does not establish human recognition or artwork acceptance.
- Alternatives considered: Stop after fixture tests; expose the private package for review; or treat construction checks as sufficient for `study-ready` status. The first supplies weaker exact-instance evidence, and the latter two would violate the approved boundary.
- Consequences: The private seed, answer key, source-to-token mappings, and answer-bearing package remain outside git and GitHub. Only cryptographic commitments and non-sensitive aggregate results are recorded. No `study-ready` status, participant access, recruitment, privacy or consent terms, retention, incentives or spending, launch, publication, artwork acceptance, release, outreach, or standards action is authorized.
- Revisit trigger: A new construction instance is requested, any committed input changes, a commitment cannot be reproduced from the retained private material, or a separately authorized offline runtime exposes a material defect.

## D-021: Standing delegation for internal project decisions

- Date: 2026-08-31T19:27:18-07:00
- Status: Accepted
- Owner: @joshua-small
- Decision: Delegate technical, methodological, accessibility, evidence, packaging, internal-validation, and internal study-readiness decisions to agents within the currently authorized six-concept filter repertoire. Agents must use documented independent review, preserve adverse findings, and continue through these internal gates without asking Joshua for serial approval. Future-scope research may continue autonomously, but activating a new semantic family or expanding the active repertoire remains reserved.
- Evidence: Joshua authorized this delegation in interactive project chat: "I honestly feel like the only thing I'm qualified to weigh in on is how does it look, and then reviewing the final submission before submitting. You and your team are way more qualified to just keep going until we're at that point since the last HR I did was to say the glyphs look perfect". Prior decisions D-012 and D-014 already authorize agent-reviewed routine merges and continuation after a resolved gate.
- Counterevidence or objections: Agent review can miss owner intent, visual defects, legal or privacy consequences, and external commitments. Internal readiness must not be confused with authority to involve participants or act outside the repository.
- Alternatives considered: Continue requesting Human Review for every conservative internal step; delegate all project authority without exceptions; or delegate only implementation while retaining every methodology choice. The first creates low-value serial gates, while the latter two either exceed Joshua's intent or fail to remove the stated bottleneck.
- Consequences: Agents may resolve and merge private/offline harness design, study sequencing, validation criteria, `registry-candidate` promotion, internal readiness labels, and related non-operational preparation after independent review and passing checks. Human Review remains mandatory for any intentional visible glyph-geometry or family-design change; artwork acceptance or designation as canonical reference artwork; activation of a new semantic family or active-repertoire expansion; `registry-accepted` promotion; review and authorization of the complete external submission; spending; legal, licensing, privacy, or consent commitments; participant recruitment, study launch, or access by real participants; external outreach or submission; public release or publication; credentials, security, account access, governance, or destructive actions; and nondelegable or materially ambiguous owner decisions. The `registry-accepted` question should normally be deferred and batched into the complete external submission-package review rather than interrupting earlier work. Byte-only, metadata-only, or demonstrably rendering-invariant artwork maintenance does not itself require visual review. This delegation authorizes no external action.
- Revisit trigger: Joshua narrows or withdraws the delegation, an agent-reviewed internal decision causes material harm or scope confusion, or the project reaches a reserved Human Review boundary.

## D-022: Private offline participant-harness validation

- Date: 2026-08-31T19:27:18-07:00
- Status: Authorized and completed
- Owner: @joshua-small
- Decision: Approve HR-003 on Issue #28. Agents may construct and validate a private, offline, non-operational participant-interface harness using synthetic responses only. The harness must collect all six randomized free-text responses before exposing forced-choice class labels, then run the forced-choice phase.
- Evidence: Joshua's standing delegation in D-021 is a direct response to the HR-003 recommendation. The recommendation and boundaries are recorded in the Issue #28 Agent Report dated 2026-08-31T07:58:31-07:00. HR-002 construction validation completed cleanly in PR #74. Commitment-only HR-003 findings are recorded in [`docs/studies/offline-harness-validation-2026-08-31.md`](studies/offline-harness-validation-2026-08-31.md).
- Counterevidence or objections: A synthetic offline harness cannot establish real participant comprehension, operational privacy behavior, deployed delivery metadata, or human recognition. No browser executable was available, so rendered keyboard/focus/zoom behavior, browser accessibility-tree output, screenshots, and actual CSP enforcement remain untested.
- Alternatives considered: Defer the harness; retain the sequential per-stimulus loop; or build a networked pilot. Deferral leaves runtime risks untested, the sequential loop primes later free-text responses, and a networked pilot exceeds the authorized boundary.
- Consequences: Agents may test keyboard order and activation, focus, zoom and reflow, contrast, validation errors, resume and submission simulation, browser accessibility-tree behavior, static delivery metadata, exact 12-form behavior, feedback absence, and semantic leakage. The tooling may build owner-only local validation pages and privately validate synthetic exports; private seeds, mappings, generated pages, responses, and scoring keys remain outside git. No network listener, real participant access or data, recruitment, privacy or consent commitment, retention policy, spending, launch, publication, artwork acceptance, release, outreach, or standards action is authorized. Operational study work is parked because it is optional QA rather than the registry's critical path.
- Revisit trigger: The owner elects to resume empirical recognition work, a browser validation environment becomes available, the harness requires a network service or real participant data or access, any intentional visible glyph-geometry or family-design change occurs, a committed input changes, synthetic validation exposes a material defect, or another reserved Human Review action is reached.

## D-023: Band-pass registry-candidate promotion

- Date: 2026-08-31T21:21:45-07:00
- Status: Accepted
- Owner: Agents under D-021 delegation
- Decision: Promote `asr:filter.band-pass` from `evidence-collecting` to the reversible `registry-candidate` lifecycle state after mechanical reassessment and independent adverse review. The decision is pinned to EV-120 through EV-151, DA-014 through DA-017, and the complete six-record assessment snapshot `registry/assessments/registry-0.2.9-2026-08-31.json`; band-pass scores 20/20 and satisfies every documented candidate floor without a material open question or blocker.
- Evidence: The assessment reproduces three independent direct target-implementation groups for band-pass: Image-Line EV-100, DSSSP EV-101, and Ardour EV-120. It also preserves the wider semantic, terminology, rights, overlap, and adverse evidence set. Independent adverse review at pre-transition commit `18c328037dcd0e1342398613ffae411ed7c6bc7e` independently fetched Ardour and DSSSP, reproduced all six scores and source-independence groups, confirmed Notch exclusion and shelf conservatism, reconciled every derived digest, and approved the bounded D-021 candidate transition subject to exact transitioned-head confirmation.
- Counterevidence or objections: Candidate status does not establish portable character use, community-level drawing identity, encoding necessity, Unicode eligibility, artwork acceptance, or registry acceptance. The identifier remains provisional, and a future independent review or material counterexample may require demotion.
- Alternatives considered: Keep band-pass at `evidence-collecting` despite satisfying every candidate floor; promote all numerically strong records; or treat candidate status as external-submission readiness. The first would ignore the documented lifecycle rubric and D-021 delegation, while the latter two would discard material record-specific blockers or exceed current authority.
- Consequences: The registry and current assessment record band-pass as `registry-candidate`; the other five lifecycle states remain unchanged. No semantic field, identifier, alias, fallback, speech label, visible geometry, artwork or study status, outreach, release, publication, registry acceptance, external submission, or standards action is authorized. Unicode remains `HOLD`.
- Revisit trigger: Exact transitioned-head review fails, new evidence defeats a candidate floor, a material open question or blocker appears, the provisional identifier changes, or the owner revises D-021.

## D-024: Bounded semantic dispositions for five provisional records

- Date: 2026-08-31T22:23:49-07:00
- Status: Accepted subject to exact-head independent adverse review
- Owner: Agents under D-021 delegation
- Decision: Apply bounded semantic dispositions to five records without reassessment or lifecycle movement. Retain `low cut` for high-pass and `high cut` for low-pass only as audio filter response-class aliases; contain Band-stop/Notch conflict through context-dependent related-term polysemy and a source-local transfer rule; and record the independently established mirrored, sign-agnostic, affected-side shelf topology while retaining exact shelving-term and isolated-recognition questions.
- Evidence: EV-160 through EV-176 and EV-180 through EV-189; DA-018, DA-019, DA-020, and the applying synthesis DA-021. Apple EV-161 and Steinberg HALion EV-162 preserve adverse pass/cut product boundaries; EV-173 and EV-174 preserve polarity-bearing shelf alternatives; the Band-stop dossier preserves narrow-subtype, exact-synonym, low-Q, and implementation-local Notch treatments.
- Counterevidence or objections: Response-class aliases cannot translate parameters, presets, algorithms, or arbitrary prose. Notch terminology remains inconsistent across sources. Shelf selectors remain product-local controls whose isolated recognition is unproved, and their exact locked geometry remains project-authored rather than an adopted standard master.
- Alternatives considered: Leave resolved evidence questions stale; make pass/cut aliases unrestricted; make Notch an unconditional alias or separate record; claim exact shelf-contour convergence; or combine semantic changes with score and status promotion. The first understates completed evidence, and the others exceed the evidence or bypass a separate assessment.
- Consequences: Registry 0.3.0 resolves bounded questions and records exclusions while preserving all alias arrays, canonical names, definitions, identifiers, fallbacks, speech labels, assessment data, lifecycle statuses, Unicode fields, locked artwork, schema, tooling, and external boundaries. Unicode remains `HOLD`.
- Revisit trigger: Exact-head review rejects a disposition, new evidence materially defeats a bounded rule, isolated recognition resolves or contradicts shelf separation, a dedicated shelf-terminology review resolves the related terms, or a new assessment supports a separately reviewed lifecycle change.

## D-025: Six-record reassessment and three candidate transitions

- Date: 2026-08-31T22:46:13-07:00
- Status: Accepted subject to exact-head independent adverse review
- Owner: Agents under D-021 delegation
- Decision: Publish assessment artifact 0.3.4 using unchanged format 0.2.0 and apply the bounded DA-018 through DA-021 dispositions mechanically across all six records. Promote high-pass, low-pass, and band-stop to reversible `registry-candidate`; preserve band-pass as candidate and both shelves as `evidence-collecting`.
- Evidence: The immutable snapshot `registry/assessments/registry-0.3.1-2026-08-31.json`; direct ledger inputs pinned through DA-018, DA-019, DA-020, and DA-021; the acceptance rubric; and D-021 delegation. The resulting score sequence is 20, 20, 20, 16, 19, and 19.
- Counterevidence or objections: Pass/cut equivalence remains bounded to response-class lookup and yields to explicit nonclassic product documentation. Notch remains related-only and non-transferable without source-local mapping or contrast. Shelf polarity-specific and contextual alternatives remain excluded, exact contours remain project-authored, and shelving-term plus isolated-recognition questions remain material. None of the score movement establishes portable character use, encoding necessity, Unicode eligibility, or registry acceptance.
- Alternatives considered: Leave mechanically resolved blockers stale; promote both shelves based on score alone; make inverse cut or Notch equivalence unconditional; or combine this stage with `registry-accepted`, artwork, or external action. The first defeats the adopted lifecycle, while the others ignore material boundaries or exceed delegated authority.
- Consequences: Registry 0.3.1 contains four reversible candidates and two evidence-collecting shelves. Every identifier remains provisional. Assessment history is append-only, DA-006 v0.2.15 is preserved immutably, and derived analyses advance to 0.2.16. No visible geometry, artwork, alias array, canonical field, schema, tooling, font, PUA, study operation, external outreach, release, publication, submission, or standards position changes. Unicode remains `HOLD`.
- Revisit trigger: Exact-head review rejects arithmetic, provenance, source independence, blocker disposition, or a transition; new evidence defeats a candidate floor; shelf terminology or isolated recognition resolves; or the owner revises D-021.

## D-026: Bounded shelf/shelving aliases

- Date: 2026-09-01T01:22:37-07:00
- Status: Accepted subject to exact-head independent adverse review
- Owner: Agents under D-021 delegation
- Decision: Add `low shelving filter` and `high shelving filter` as exact aliases for the low-shelf and high-shelf records only at response-class level. Move the shorter `low shelving` and `high shelving` fragments no further than related terms, resolve the two live shelving-term questions as bounded yes, and preserve both isolated shelf/pass recognition questions as open.
- Evidence: EV-190 through EV-197 and the independently approved DA-022 terminology dossier, applied through DA-025. Apple and MathWorks provide direct within-document mappings; Steinberg and immutable FFmpeg documentation independently corroborate the morphology; W3C supports the underlying shelf taxonomy; MathWorks, JUCE, and Steinberg preserve adverse product-local, collision, polarity, and implementation boundaries.
- Counterevidence or objections: Shelf versus shelving is morphological rather than merely orthographic. Shorter fragments and side-less family terms are underdetermined; bass and treble are broad; product-local lowpass/highpass enums collide with separate records; pass-shelf compounds are framework-local; and lexical equivalence does not promise gain sign, parameters, topology, implementation, controls, algorithm, or glyph identity.
- Alternatives considered: Keep the supported full phrases as related terms; infer all shelf/shelving variants automatically; add product-local pass, bass/treble, fragment, compound, or abbreviated names; or combine the semantic change with reassessment and lifecycle movement. The first leaves a reviewed exact relationship stale, while the others exceed the evidence or collapse separately governed stages.
- Consequences: Registry 0.4.0 adds two backwards-compatible live aliases, documents whole-label case and space/hyphen normalization separately from morphology, and makes explicit product documentation override generic alias lookup. Canonical names, IDs, definitions, fallback and speech labels, geometry, artwork, statuses, scores, the immutable assessment snapshot, schema, tooling, font, PUA, external posture, and Unicode `HOLD` remain unchanged. Isolated recognition remains material.
- Revisit trigger: Exact-head review rejects the evidence transfer or exclusions; new evidence defeats response-class equivalence; product collision creates ambiguity; a later assessment changes the lifecycle conclusion; or the owner revises D-021.
- Review disposition appended 2026-09-01T03:04:13-07:00: The conditional review completed with no blocker. Independent adverse review approved exact substantive head `8fc5a70e9adbf38240339c363c6f26a8a695c265` at 2026-09-01T01:40:24-07:00; [PR #99](https://github.com/joshua-small/audio-synth-symbol-registry/pull/99) merged as `00bbe89f19f376aed2bdc4f36e3c8ccbf03cb1b7`. This append-only disposition does not rewrite the decision's historical status line.

## D-027: Evidence-triggered six-record reassessment

- Date: 2026-09-01T01:44:51-07:00
- Status: Accepted subject to exact-head independent adverse review
- Owner: Agents under D-021 delegation
- Decision: Publish assessment artifact 0.3.5 using unchanged format 0.2.0 and mechanically apply DA-023 and DA-025 across all six records. Raise Band-stop text/accessibility from 2 to 3 and visual convergence from 2 to 3, producing 18/20 without lifecycle movement. Preserve each shelf at 19/20 and `evidence-collecting`, with its bounded shelving-filter term resolved and isolated shelf/pass recognition as its sole material blocker.
- Evidence: The immutable snapshot `registry/assessments/registry-0.4.1-2026-09-01.json`; EV-032, EV-100, EV-120, and EV-190 through EV-204; DA-019, DA-020, DA-022, DA-023, DA-025; the acceptance rubric; and D-021 delegation. High-pass, low-pass, and band-pass remain 20/20 candidates; Band-stop becomes 18/20 candidate; low shelf and high shelf remain 19/20 evidence-collecting.
- Counterevidence or objections: BR and BRF remain contextual, Notch remains related-only and non-transferable without source-local mapping or contrast, no reviewed response glyph is portable text, and Band-stop has no accepted drawing-required communication case. Shelf lexical equivalence does not establish isolated recognition; polarity-specific and contextual alternatives remain excluded, and exact contours remain project-authored.
- Alternatives considered: Leave the approved evidence unapplied; raise Band-stop independent usage beyond the evidenced disposition; promote either shelf by score; clear isolated recognition from lexical evidence; or combine reassessment with registry acceptance, artwork, study operation, or external action. The first leaves the assessment stale, while the others exceed the rubric, collapse distinct evidence questions, or cross reserved gates.
- Consequences: Registry/evidence advances to 0.4.1, assessments to 0.3.5, and derived analyses to 0.2.21. Lifecycle states, live semantic records and aliases, canonical fields, artwork, geometry, schema, tooling, font, PUA, registry-accepted gate, external posture, and Unicode `HOLD` remain unchanged. Every identifier remains provisional.
- Revisit trigger: Exact-head review rejects arithmetic, provenance, publisher grouping, source transfer, blocker reduction, digest reconciliation, or protected-tree equality; new evidence changes a score or material question; isolated recognition resolves; or the owner revises D-021.
- Review disposition appended 2026-09-01T03:04:13-07:00: The conditional review completed with no blocker. Independent adverse review approved exact substantive head `be3304cb37e4247065b2dbb94b4f86f23b248189` at 2026-09-01T02:00:25-07:00; [PR #100](https://github.com/joshua-small/audio-synth-symbol-registry/pull/100) merged as `7e91ee516cd26e5c9688d18323cbdce1c0d1ab41`. This append-only disposition does not rewrite the decision's historical status line.

## D-028: Private non-PUA icon-package proof

- Date: 2026-09-01T02:11:01-07:00
- Status: Accepted subject to exact-head independent adverse review
- Owner: Agents under D-021 delegation
- Decision: Add deterministic tooling for a PRIVATE INTERNAL, non-PUA SVG and Iconify-style package prototype over the six exact `compact-a` lock hashes. Keep generated package files outside the repository, preserve the individual SVG source bytes exactly, carry registry semantics and accessibility metadata separately from icon bodies, and represent Unicode, SMuFL, and Private Use Area code points as explicit null values.
- Evidence: D-019 exact-byte lock; D-021 internal packaging delegation; `artwork/metadata.json` unpublished and noncanonical state; six original provenance records; the private cmap-free proof; repository semantic records; EV-101, EV-120, EV-122, and EV-174 for evidence-qualified external-name slots; deterministic schema, integrity, byte-identity, sprite, Iconify, typed-lookup, and accessibility tests in tooling 0.9.0.
- Counterevidence or objections: The package is an application asset transport, not portable character interchange. The artwork remains draft and unaccepted, shelf recognition remains unproved, Band-stop cannot inherit Notch equivalence, Iconify and FontAudio are one lineage, source CC0 status does not select a publication license for a future assembled package, and one internal prototype does not establish external adoption.
- Alternatives considered: Assign PUA characters; publish a font or icon package; commit generated package bytes; omit semantic and accessibility metadata; or wait for Unicode. PUA and publication exceed the authorized boundary, committing derivatives adds drift risk, metadata omission weakens safe use, and waiting would leave a reversible delivery hypothesis untested.
- Consequences: Tooling may privately generate byte-identical individual SVG files, an SVG sprite, Iconify-compatible JSON without embedded accessible names, typed fail-closed whole-label alias lookup, and bounded accessibility and CSS-mask examples including consumer-owned unique inline-title IDs. Iconify consumers default to decorative and `aria-hidden`; meaningful use requires consumer-supplied naming. The source SVG remains authoritative; package output has no selected publication license and must not be released. Registry semantics, lifecycle states, artwork status, geometry, canonical status, Unicode `HOLD`, external authority, and outreach remain unchanged.
- Revisit trigger: Exact-head review rejects a boundary or deterministic result; a source lock hash, registry semantic, provenance record, or artwork state changes; public release or licensing is proposed; external mapping evidence changes; or any Unicode, SMuFL, or PUA assignment is contemplated.
- Review disposition appended 2026-09-01T03:04:13-07:00: The conditional review completed with no blocker. Independent adverse review approved exact integrated head `d015e5ae6e4ea5a4f6657620d90f85ad8bc7b2d6` at 2026-09-01T02:41:22-07:00; [PR #102](https://github.com/joshua-small/audio-synth-symbol-registry/pull/102) merged as `f03eb1c05a4efc16d78e9643496e0bcac5d682c5`. This append-only disposition does not rewrite the decision's historical status line.

## D-029: Private browser-QA preflight

- Date: 2026-09-01T02:58:57-07:00
- Status: Accepted subject to exact-head independent adverse review
- Owner: Agents under D-021 delegation
- Decision: Add a bounded, fail-closed browser-QA preflight for one explicit private offline-harness HTML file and one explicit system Chrome or Chromium executable. Pin `playwright-core` without a bundled browser; deny external and additional-file requests while permitting CSP-authorized embedded data resources; exercise keyboard activation, focus, scaled reflow, CSP, and aggregate CDP accessibility-tree inspection; and emit only a private aggregate JSON report.
- Evidence: D-021 internal methodological and accessibility delegation; D-022 authorization and browser-native omission list; `docs/studies/offline-harness-validation-2026-08-31.md`; the runtime CSP and synthetic-only state machine; tooling 0.10.0 unit and CI system-browser integration tests.
- Counterevidence or objections: Headless Chrome over one local synthetic file cannot establish human recognition, participant comprehension, deployed behavior, cross-browser equivalence, actual browser-chrome zoom behavior, screenshot/pixel focus or contrast, validation-error and reload/resume behavior, or artwork acceptance. A reduced CSS viewport plus increased device scale is a deterministic reflow model rather than every browser's interactive zoom implementation. The system browser version is recorded but its binary is not pinned.
- Alternatives considered: Download a Playwright-managed browser; install a browser during every local test; run a local web server; capture screenshots or raw accessibility trees; skip browser-native QA; or treat synthetic QA as recognition evidence. Downloads and servers add avoidable supply-chain or operational surface, raw captures risk leaking instrument content, skipping preserves known omissions, and recognition claims are unsupported.
- Consequences: Tooling may privately validate Tab and Shift+Tab order, Space and Enter activation, computed focus indicators, horizontal overflow and clipping, control reachability, CSP execution and connect denial, zero forbidden requests, and aggregate accessibility roles at normal, 200%, 400%, and narrow scenarios. Generated HTML and JSON remain outside git. The preflight is explicitly non-recognition and non-participant evidence. It changes no recruitment, launch, access, privacy, consent, artwork, registry, release, external-action, or Unicode `HOLD` boundary.
- Revisit trigger: Exact-head review rejects the threat model or output minimization; the offline harness changes; a forbidden request, clipping, focus, CSP, or accessibility defect appears; cross-browser evidence is required; or any participant-facing, networked, published, or externally accessible use is proposed.
- Review disposition appended 2026-09-01T03:25:23-07:00: Independent adverse review approved exact integrated head `ec324fd013393b0944c5a2e5ee43c5b02e145d3e` with no blocker after verifying complete forward/reverse tab-order comparison, radio-group handling, focus-style deltas, aggregate AX mappings and names, privacy minimization, immutable predecessors, protected trees, and the explicit browser omissions. A fresh local run passed 126/126 runnable tests with one expected system-browser integration skip. CI must execute and pass the real-browser integration before merge. This append-only disposition does not rewrite the decision's historical status line.
