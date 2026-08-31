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
