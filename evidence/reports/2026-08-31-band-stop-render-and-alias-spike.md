# Band-stop render and alias evidence spike

This bounded spike targets the remaining evidence gaps for `asr:filter.band-stop`: a second independently implemented axis-less rendering and direct support for the existing `BSF` and `band reject` fallbacks. It does not change a registry record, alias, semantic boundary, artwork, lifecycle status, or external position. In particular, it does not transfer Notch-only evidence to band-stop.

## Method

1. Reinspect the one qualifying target implementation already established by EV-100.
2. Require a second publisher or implementation to bind a rendered form directly to band-stop or band-reject terminology.
3. Reject a source that labels only `Notch`, even if its shape resembles the project draft.
4. Count source publishers and implementations, not URLs, files, or repeated mentions.
5. Assess `BSF` and `band reject` separately from rendered-form evidence. A source can ground terminology without demonstrating portable plain-text interchange or a standalone glyph.

## Second direct rendering: Ardour Toolkit

EV-120 pins Ardour's project-local Toolkit icon font at commit [`ab29bbbe64050732f3f71145a99b607942d094f6`](https://github.com/Ardour/ardour/tree/ab29bbbe64050732f3f71145a99b607942d094f6/share/web_surfaces/builtin/mixer/toolkit/styles/fonts). The committed catalog labels ASCII-backed font slot `y` as `Band Reject` and class `bandreject`. The SVG font binds that slot to a smooth, axis-less centered rejection curve. The same catalog and font separately label slot `z` as `Notch`; its outline is a visibly narrower, angular central rejection. DA-014 records the exact HTML, CSS, and SVG hashes.

Git history traces the Toolkit source tree to Ardour commit [`1109fc79839d90ed4fc2d26b3c90a1de10d4f594`](https://github.com/Ardour/ardour/commit/1109fc79839d90ed4fc2d26b3c90a1de10d4f594), authored by Luciano Iam on 2020-06-21 and committed by Robin Gareus on 2020-07-21. This establishes a project lineage independent of Image-Line EV-100. It does not establish original authorship of each outline.

That same-source separation is decisive for this spike:

- the Band Reject outline is directly bound to the broader band-reject concept;
- the Notch outline is not borrowed or counted as band-stop evidence;
- the implementation is independently published from Image-Line EV-100; and
- the ordinary ASCII backing slots are font-internal machinery, not portable meanings for `y` or `z`.

EV-100 and EV-120 therefore establish two independent target implementations of an axis-less centered rejected-band form. They converge on the response topology while differing in curvature, width, stroke construction, and product context. Two implementations close the specifically named second-render gap; they do not establish universal artwork, permission to reuse either implementation, or sufficient evidence for lifecycle promotion by themselves.

## `BSF` abbreviation

EV-130 records an AspenCore Electronics Tutorials page that explicitly introduces `band stop filter, (BSF)`. EV-131 independently records an Arab Academy for Science, Technology & Maritime Transport EC 339 lecture that lists `Band-Stop Filter (BSF)` alongside LPF, HPF, and BPF and later labels its band-stop teaching section the same way.

These two independently published education sources ground `BSF` as an engineering abbreviation for band-stop filter. This resolves the narrower provenance objection that `BSF` had only been drafted by the project or inferred from `BPF`. It does not establish that audio professionals commonly type `BSF` in conversation, that software exposes `BSF` as a UI label, or that the abbreviation is unambiguous in every domain. Any mechanical reassessment should preserve that distinction.

## `band reject` term

Three independent source groups now directly support the existing term:

- EV-030: Apple's Logic Pro guide defines a band-reject filter by its rejected-band behavior;
- EV-120: Ardour binds `Band Reject` and `bandreject` to the rendered broad rejection form while keeping Notch separate; and
- EV-130: Electronics Tutorials calls band stop `also known as a band reject filter`. Its body and summary distinguish a wide stop band from a narrow notch, while its opening inconsistently calls Band Stop an extremely narrow Notch Filter.

This is enough to ground `band reject` as an established name for the band-stop concept in the present corpus. It does not resolve the cross-domain band-stop/Notch boundary: EV-130 is internally inconsistent on that question, and other sources documented by DA-004 also use `band reject` and `notch` differently. The existing conservative rule remains: `notch filter` is a related term, not an accepted exact alias.

## Findings

| Question | Finding | Preserved limitation |
| --- | --- | --- |
| Second independent direct render | Yes: Image-Line EV-100 and Ardour EV-120 independently bind axis-less centered rejection forms to Band stop/Band Reject terminology. | Two implementations are not a market census or artwork license. |
| Notch transfer | None. Ardour's separately labeled Notch form is excluded. | The boundary in D-011 and DA-004 remains open. |
| `BSF` provenance | Yes: EV-130 and EV-131 independently expand band-stop filter to `BSF`. | General engineering abbreviation support is not proof of common audio plain-text usage. |
| `band reject` provenance | Yes: EV-030, EV-120, and EV-130 support the term across vendor, implementation, and education contexts. | Sources disagree about whether Notch is identical, narrower, or contextual; EV-130 contains both positions internally. |

## Recommendation

Treat the second-render and drafted-fallback provenance gaps as evidence-complete for the next mechanical assessment. Do not infer a status or score change in this spike. Preserve the separate semantic, text-friction, recognition, and lifecycle requirements; keep Notch-only evidence excluded; and make any reassessment cite the direct ledger sources rather than counting this derived analysis as independent evidence.

## Agent Report - 2026-08-31T20:34:00-07:00

- Scope: sought one second directly bound band-stop/band-reject rendering and independently assessed the existing `BSF` and `band reject` terms.
- Direct evidence: EV-120, EV-130, and EV-131; EV-100 and EV-030 were reinspected as existing independent comparators.
- Reproducibility: Ardour is pinned to immutable commits and DA-014 records exact file hashes; EV-130 records exact mutable-page locators without claiming a stable digest; EV-131 records an exact PDF locator and SHA-256 digest. No third-party source bytes are retained in this repository.
- Boundary control: Ardour's separately labeled Notch glyph is excluded; no Notch-only source is transferred to band-stop.
- Independence: Image-Line, Ardour, Apple, AspenCore Electronics Tutorials, and AAST are counted by publisher or implementation, not by file or URL. Individual outline authorship is not claimed.
- Counterevidence: EV-130 internally contradicts itself about whether band-stop is necessarily an extremely narrow Notch Filter or the broader wide response; the source supports terminology but cannot settle the boundary.
- Validation: exact current substantive worktree passed `npm test` 112/112, registry validation for six records, six assessment sets, and 78 evidence sources at registry 0.2.6, Agent Report hygiene, digest reconciliation, and `git diff --check`.
- Independent review: APPROVE on exact current substantive worktree based on `01b5c1f266a21724a96dbee39b674c8fd8e2ab2`; the reviewer independently reproduced all Ardour and AAST digests, confirmed source independence and temporal provenance, verified the EV-130 contradiction and roadmap/version history, and found no Notch transfer or lifecycle change. The approval-report-only annotation is permitted by that verdict.
- Limitations: no artwork is copied or licensed; no alias, semantics, record, assessment, score, status, artwork, release, or external position changes; `BSF` audio-chat prevalence remains unproven.
