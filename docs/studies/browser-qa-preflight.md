# Private browser-QA preflight

Status: internal, non-operational QA tooling only. This is not a recognition study, participant evidence, artwork acceptance, `study-ready` evidence, or authorization to recruit, launch, publish, release, or contact anyone.

## Purpose and boundary

The preflight addresses selected browser-native omissions recorded by the private offline harness validation without creating a participant-facing service. It opens one explicit local HTML file in one explicit system Chrome or Chromium executable. `playwright-core` is pinned as a development dependency and downloads no browser. A missing or non-executable browser path fails closed.

The browser context permits the exact `file:` URL supplied on the command line and CSP-authorized embedded `data:` image resources. Routing denies external and additional `file:` requests, service workers are blocked, background networking is disabled at launch, and the harness CSP remains authoritative. A deliberate `connect-src` probe must produce a `securitypolicyviolation` event without entering the browser request pipeline. Any forbidden request, worker, additional page, or page error fails the run. These controls govern the page and browser context; they are not an operating-system network monitor for every browser-process subsystem.

## Invocation

First build a private synthetic harness outside the repository. Then run:

```sh
npm run study:browser-preflight -- \
  --html /absolute/path/to/harness/index.html \
  --executable /absolute/path/to/chrome-or-chromium \
  --out /absolute/path/to/new-browser-preflight.json
```

All three paths are explicit. The output must not already exist. The command writes mode `0600` JSON and prints the same JSON to standard output. Generated HTML and reports remain private local artifacts and must not be committed.

## Checks

For each of four render scenarios, the preflight drives the complete synthetic state machine with keyboard input only:

| Scenario | CSS viewport | Device scale | Contract |
| --- | ---: | ---: | --- |
| Normal | 1280 x 900 | 1 | 100% baseline |
| 200% | 640 x 450 | 2 | 200% reflow-equivalent viewport |
| 400% | 320 x 225 | 4 | 400% reflow-equivalent viewport |
| Narrow | 320 x 640 | 1 | narrow breakpoint at 100% |

The scaled scenarios preserve a 1280 x 900 physical-pixel envelope while reducing the CSS viewport and increasing device scale. This is a deterministic headless reflow model, not evidence that every desktop browser's zoom chrome behaves identically.

At free-text, forced-choice, contamination, and completion phases, the preflight:

- traverses forward with Tab and backward with Shift+Tab;
- compares complete expected forward and reverse tab-stop sequences with the observed active-element order, and records computed focus-indicator properties without names, labels, values, responses, or tokens;
- activates controls with Space and Enter;
- rejects horizontal document overflow, horizontally clipped controls, and controls that cannot receive focus;
- captures the browser accessibility tree through CDP `Accessibility.getFullAXTree`, requires expected interactive/focusable mappings and nonempty accessible names, and retains aggregate role and count data only;
- verifies execution of the CSP-authorized runtime and enforcement of `connect-src 'none'`;
- requires zero forbidden requests, workers, extra pages, and page errors.

The report contains aggregate layout, keyboard, focus, CSP, network, and accessibility-tree facts plus the input HTML SHA-256 commitment and browser version. It contains no synthetic response values, opaque stimulus tokens, SVG bytes, private seed, scoring key, answer key, screenshot, or source path.

## CI and local validation

The ordinary Node test suite exercises argument validation and missing-executable failure without installing a browser. GitHub Actions additionally resolves its already-installed system Chrome or Chromium and runs the conditional integration test. CI fails if no system executable is present; it never asks Playwright to download one. The browser version is recorded but the system browser binary is not pinned, so results are environment/version-bound rather than byte-deterministic across runners.

An environment with no Chrome or Chromium can validate every static and unit boundary but cannot claim browser execution, rendered keyboard/focus behavior, CSP enforcement, CDP accessibility-tree capture, or scaled reflow. Record that omission exactly rather than treating a skipped integration test as browser evidence. Even a successful run supplies computed-style focus evidence, not screenshot, pixel, focus-contrast, or visual-regression evidence. Validation-error paths, reload/resume behavior, actual browser-chrome zoom controls, cross-browser behavior, and deployed-server behavior are outside this preflight.

## Evidence limits

This preflight evaluates one private synthetic page in one browser build. It does not measure whether a person recognizes any glyph, whether a participant understands the interface, whether a deployed service preserves these properties, or whether the symbols merit encoding. It changes no glyph geometry, artwork status, registry status, repertoire, Unicode `HOLD`, recruitment gate, privacy or consent commitment, or launch gate.
