import { createHash } from "node:crypto";
import { access, lstat, readFile, realpath, stat, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import { basename, dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "playwright-core";

const stableJson = (value) => `${JSON.stringify(value, null, 2)}\n`;
const sha256 = (value) => createHash("sha256").update(value).digest("hex");

function fail(message) {
  throw new Error(message);
}

export function parseBrowserPreflightArguments(argv) {
  const values = {};
  for (let index = 0; index < argv.length; index += 2) {
    const name = argv[index];
    const value = argv[index + 1];
    if (!name?.startsWith("--") || value === undefined || value.startsWith("--")) {
      fail("arguments must be --name value pairs");
    }
    const key = name.slice(2);
    if (!['html', 'executable', 'out'].includes(key)) fail(`unknown argument: ${name}`);
    if (values[key] !== undefined) fail(`duplicate argument: ${name}`);
    values[key] = value;
  }
  if (!values.html || !values.executable || !values.out) {
    fail("usage: --html local-index.html --executable /path/to/chrome-or-chromium --out new-report.json");
  }
  return values;
}

async function regularNonSymlink(path, label) {
  let metadata;
  try {
    metadata = await lstat(path);
  } catch {
    fail(`${label} does not exist: ${path}`);
  }
  if (!metadata.isFile() || metadata.isSymbolicLink()) fail(`${label} must be a regular non-symlink file: ${path}`);
  return realpath(path);
}

async function executableFile(path) {
  let resolved;
  try {
    resolved = await realpath(path);
    const metadata = await stat(resolved);
    if (!metadata.isFile()) fail(`browser executable must resolve to a regular file: ${path}`);
    await access(resolved, constants.X_OK);
  } catch (error) {
    if (error?.message?.startsWith('browser executable')) throw error;
    fail(`browser executable does not exist or is not executable: ${path}`);
  }
  return resolved;
}

function descriptorKey(descriptor) {
  return `${descriptor.tag}:${descriptor.type}:${descriptor.role}:${descriptor.tab_index}:${descriptor.ordinal}`;
}

async function activeElementObservation(page, unfocusedStyles) {
  return page.evaluate((baseline) => {
    const element = document.activeElement;
    if (!(element instanceof HTMLElement)) return null;
    const focusables = [...document.querySelectorAll('a[href], button, input, select, textarea, [tabindex]')]
      .filter((candidate) => candidate instanceof HTMLElement && !candidate.hidden && !candidate.hasAttribute('disabled'));
    const style = getComputedStyle(element);
    const outlineWidth = Number.parseFloat(style.outlineWidth) || 0;
    const outlineVisible = style.outlineStyle !== 'none' && outlineWidth > 0 && style.outlineColor !== 'transparent';
    const boxShadowVisible = style.boxShadow !== 'none';
    return {
      descriptor: {
        tag: element.tagName.toLowerCase(),
        type: element instanceof HTMLInputElement ? element.type : 'none',
        role: element.getAttribute('role') || 'implicit',
        tab_index: element.tabIndex,
        ordinal: focusables.indexOf(element),
      },
      focus_indicator: {
        focus_visible_match: element.matches(':focus-visible'),
        outline_style: style.outlineStyle,
        outline_width: style.outlineWidth,
        outline_offset: style.outlineOffset,
        outline_color: style.outlineColor,
        box_shadow: style.boxShadow,
        changed_from_unfocused: baseline[focusables.indexOf(element)] !== undefined
          && [style.outlineStyle, style.outlineWidth, style.outlineOffset, style.outlineColor, style.boxShadow].join('|') !== baseline[focusables.indexOf(element)],
        visibly_indicated: outlineVisible || boxShadowVisible,
      },
    };
  }, unfocusedStyles);
}

async function unfocusedControlStyles(page) {
  await page.locator('#phase-title').focus();
  return page.evaluate(() => Object.fromEntries([...document.querySelectorAll('a[href], button, input, select, textarea, [tabindex]')]
    .filter((candidate) => candidate instanceof HTMLElement && !candidate.hidden && !candidate.hasAttribute('disabled'))
    .map((element, ordinal) => {
      const style = getComputedStyle(element);
      return [ordinal, [style.outlineStyle, style.outlineWidth, style.outlineOffset, style.outlineColor, style.boxShadow].join('|')];
    })));
}

async function expectedTabOrder(page, direction) {
  return page.evaluate((requestedDirection) => {
    const all = [...document.querySelectorAll('a[href], button, input, select, textarea, [tabindex]')]
      .filter((candidate) => candidate instanceof HTMLElement && !candidate.hidden && !candidate.hasAttribute('disabled'));
    const eligible = all.filter((element) => element.tabIndex >= 0 && element.getClientRects().length > 0);
    const radioGroups = new Map();
    for (const element of eligible) {
      if (!(element instanceof HTMLInputElement) || element.type !== 'radio' || !element.name) continue;
      const formOrdinal = element.form ? [...document.forms].indexOf(element.form) : -1;
      const key = `${formOrdinal}:${element.name}`;
      if (!radioGroups.has(key)) radioGroups.set(key, []);
      radioGroups.get(key).push(element);
    }
    const retained = eligible.filter((element) => {
      if (!(element instanceof HTMLInputElement) || element.type !== 'radio' || !element.name) return true;
      const formOrdinal = element.form ? [...document.forms].indexOf(element.form) : -1;
      const group = radioGroups.get(`${formOrdinal}:${element.name}`);
      const checked = group.find((candidate) => candidate.checked);
      return element === (checked || (requestedDirection === 'forward' ? group[0] : group.at(-1)));
    });
    const sorted = retained.sort((left, right) => {
      const leftRank = left.tabIndex === 0 ? Number.MAX_SAFE_INTEGER : left.tabIndex;
      const rightRank = right.tabIndex === 0 ? Number.MAX_SAFE_INTEGER : right.tabIndex;
      return leftRank - rightRank || all.indexOf(left) - all.indexOf(right);
    });
    if (requestedDirection === 'reverse') sorted.reverse();
    return sorted.map((element) => ({
      tag: element.tagName.toLowerCase(),
      type: element instanceof HTMLInputElement ? element.type : 'none',
      role: element.getAttribute('role') || 'implicit',
      tab_index: element.tabIndex,
      ordinal: all.indexOf(element),
    }));
  }, direction);
}

async function keyboardCycle(page, key, unfocusedStyles, start) {
  if (start === 'phase-title') await page.locator('#phase-title').focus();
  else {
    await page.evaluate(() => {
      const sentinel = document.createElement('button');
      sentinel.id = 'browser-preflight-reverse-sentinel';
      sentinel.type = 'button';
      sentinel.tabIndex = 0;
      sentinel.setAttribute('aria-hidden', 'true');
      sentinel.style.cssText = 'position:fixed;left:0;top:0;width:1px;height:1px;opacity:0;pointer-events:none';
      document.body.append(sentinel);
      sentinel.focus();
    });
  }
  const observations = [];
  const seen = new Set();
  for (let index = 0; index < 64; index += 1) {
    await page.keyboard.press(key);
    if (start === 'reverse-sentinel' && await page.evaluate(() => document.activeElement?.id === 'browser-preflight-reverse-sentinel')) break;
    const observation = await activeElementObservation(page, unfocusedStyles);
    if (!observation) fail(`keyboard navigation produced no active element after ${key}`);
    const identity = descriptorKey(observation.descriptor);
    if (seen.has(identity)) break;
    seen.add(identity);
    observations.push(observation);
  }
  if (observations.length === 0) fail(`keyboard navigation found no focus stops with ${key}`);
  if (start === 'reverse-sentinel') await page.locator('#browser-preflight-reverse-sentinel').evaluate((element) => element.remove());
  return observations;
}

async function keyboardAudit(page) {
  const [unfocusedStyles, expectedForward, expectedReverse] = await Promise.all([
    unfocusedControlStyles(page),
    expectedTabOrder(page, 'forward'),
    expectedTabOrder(page, 'reverse'),
  ]);
  if (expectedForward.length === 0 || expectedReverse.length === 0) fail("phase exposes no expected keyboard controls");
  const forward = await keyboardCycle(page, 'Tab', unfocusedStyles, 'phase-title');
  const reverse = await keyboardCycle(page, 'Shift+Tab', unfocusedStyles, 'reverse-sentinel');
  const forwardInteractive = forward.filter(({ descriptor }) => descriptor.ordinal >= 0 && descriptor.tab_index >= 0);
  const reverseInteractive = reverse.filter(({ descriptor }) => descriptor.ordinal >= 0 && descriptor.tab_index >= 0);
  if (forwardInteractive.length === 0 || reverseInteractive.length === 0) fail("Tab and Shift+Tab must each reach an interactive control");
  assertDescriptorOrder(forwardInteractive.map(({ descriptor }) => descriptor), expectedForward, 'Tab');
  assertDescriptorOrder(reverseInteractive.map(({ descriptor }) => descriptor), expectedReverse, 'Shift+Tab');
  if ([...forwardInteractive, ...reverseInteractive].some(({ focus_indicator }) => !focus_indicator.focus_visible_match
      || !focus_indicator.changed_from_unfocused || !focus_indicator.visibly_indicated)) {
    fail("every keyboard focus stop must expose a computed visible focus indicator");
  }
  return { expected_forward: expectedForward, expected_reverse: expectedReverse, forward, reverse };
}

function assertDescriptorOrder(observed, expected, label) {
  const observedKeys = observed.map(descriptorKey);
  const expectedKeys = expected.map(descriptorKey);
  if (JSON.stringify(observedKeys) !== JSON.stringify(expectedKeys)) {
    fail(`${label} order does not cover the complete expected keyboard-control sequence`);
  }
}

async function layoutAudit(page) {
  const result = await page.evaluate(() => {
    const candidates = [...document.querySelectorAll('button, input, select, textarea, a[href]')]
      .filter((element) => element instanceof HTMLElement && !element.hidden && !element.hasAttribute('disabled') && getComputedStyle(element).display !== 'none');
    const controls = candidates.map((element) => {
      element.focus();
      const rect = element.getBoundingClientRect();
      return {
        horizontally_visible: rect.left >= -1 && rect.right <= document.documentElement.clientWidth + 1 && rect.width > 0,
        programmatically_focusable: document.activeElement === element,
      };
    });
    return {
      viewport_width: document.documentElement.clientWidth,
      document_scroll_width: document.documentElement.scrollWidth,
      horizontal_overflow_px: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
      control_count: controls.length,
      horizontally_clipped_control_count: controls.filter(({ horizontally_visible }) => !horizontally_visible).length,
      unreachable_control_count: controls.filter(({ programmatically_focusable }) => !programmatically_focusable).length,
    };
  });
  if (result.horizontal_overflow_px !== 0 || result.horizontally_clipped_control_count !== 0 || result.unreachable_control_count !== 0) {
    fail("rendered phase has horizontal overflow, clipping, or an unreachable control");
  }
  return result;
}

async function accessibilityAudit(cdp, expectedControlCount) {
  await cdp.send('Accessibility.enable');
  const { nodes } = await cdp.send('Accessibility.getFullAXTree');
  if (!Array.isArray(nodes) || nodes.length === 0) fail("Chrome DevTools Protocol returned an empty accessibility tree");
  const role_counts = {};
  let ignored_node_count = 0;
  let focusable_node_count = 0;
  let interactive_node_count = 0;
  let unnamed_interactive_node_count = 0;
  const interactiveRoles = new Set(['button', 'checkbox', 'radio', 'textbox', 'combobox', 'link']);
  for (const node of nodes) {
    const role = typeof node.role?.value === 'string' ? node.role.value : 'unknown';
    role_counts[role] = (role_counts[role] || 0) + 1;
    if (node.ignored) ignored_node_count += 1;
    if (node.properties?.some(({ name, value }) => name === 'focusable' && value?.value === true)) focusable_node_count += 1;
    if (!node.ignored && interactiveRoles.has(role)) {
      interactive_node_count += 1;
      if (typeof node.name?.value !== 'string' || node.name.value.trim() === '') unnamed_interactive_node_count += 1;
    }
  }
  if (interactive_node_count < expectedControlCount || focusable_node_count < expectedControlCount || unnamed_interactive_node_count !== 0) {
    fail("accessibility tree omits an expected interactive mapping, focusable state, or accessible name");
  }
  return {
    captured_via: 'Chrome DevTools Protocol Accessibility.getFullAXTree',
    node_count: nodes.length,
    ignored_node_count,
    focusable_node_count,
    interactive_node_count,
    unnamed_interactive_node_count,
    role_counts: Object.fromEntries(Object.entries(role_counts).sort(([left], [right]) => left.localeCompare(right))),
  };
}

async function auditPhase(page, cdp, phase) {
  const keyboard = await keyboardAudit(page);
  const layout = await layoutAudit(page);
  return {
    phase,
    active_element_order_and_focus: keyboard,
    layout,
    accessibility_tree: await accessibilityAudit(cdp, layout.control_count),
  };
}

async function activate(page, selector, key, index = 0) {
  const locator = page.locator(selector).nth(index);
  await locator.focus();
  await page.keyboard.press(key);
}

async function waitForHeading(page, text) {
  await page.locator('#phase-title').filter({ hasText: text }).waitFor({ state: 'visible' });
}

async function completeSyntheticKeyboardRun(page, cdp) {
  const phases = [];
  await waitForHeading(page, 'Unprompted meaning');
  phases.push(await auditPhase(page, cdp, 'free-text'));
  for (let index = 0; index < 6; index += 1) {
    await activate(page, '#unknown', 'Space');
    await activate(page, '#task button[type="submit"]', 'Enter');
  }

  await waitForHeading(page, 'Forced recognition and confidence');
  phases.push(await auditPhase(page, cdp, 'forced-choice'));
  for (let index = 0; index < 6; index += 1) {
    await activate(page, '#task fieldset:nth-of-type(1) input[type="radio"]', 'Space', 0);
    await activate(page, '#task fieldset:nth-of-type(2) input[type="radio"]', 'Space', 0);
    await activate(page, '#task button[type="submit"]', 'Enter');
  }

  await waitForHeading(page, 'Prior recognition');
  phases.push(await auditPhase(page, cdp, 'contamination'));
  await activate(page, '#task input[type="radio"]', 'Space', 1);
  await activate(page, '#task button[type="submit"]', 'Enter');

  await waitForHeading(page, 'Synthetic submission complete');
  await page.waitForFunction(() => document.querySelector('#receipt')?.textContent !== 'Computing local receipt...');
  phases.push(await auditPhase(page, cdp, 'complete'));
  await activate(page, '#restart', 'Space');
  await waitForHeading(page, 'Unprompted meaning');
  return phases;
}

async function runScenario(browser, htmlUrl, scenario) {
  const context = await browser.newContext({
    viewport: scenario.viewport,
    deviceScaleFactor: scenario.device_scale_factor,
    serviceWorkers: 'block',
  });
  let forbidden_request_count = 0;
  let intercepted_forbidden_request_count = 0;
  let worker_count = 0;
  let page_error_count = 0;
  let extra_page_count = 0;
  const allowedUrl = htmlUrl.href;
  await context.route('**/*', async (route) => {
    const url = route.request().url();
    if (url === allowedUrl) await route.continue();
    else {
      intercepted_forbidden_request_count += 1;
      await route.abort('blockedbyclient');
    }
  });
  context.on('request', (request) => {
    if (!request.url().startsWith('file:') && !request.url().startsWith('data:')) forbidden_request_count += 1;
  });
  context.on('serviceworker', () => { worker_count += 1; });
  const page = await context.newPage();
  context.on('page', (opened) => { if (opened !== page) extra_page_count += 1; });
  page.on('worker', () => { worker_count += 1; });
  page.on('pageerror', () => { page_error_count += 1; });
  await page.addInitScript(() => {
    globalThis.__browserPreflightCsp = [];
    addEventListener('securitypolicyviolation', (event) => {
      globalThis.__browserPreflightCsp.push({ directive: event.effectiveDirective, disposition: event.disposition });
    });
  });
  const response = await page.goto(allowedUrl, { waitUntil: 'load' });
  if (
    response === null
    || response.url() !== allowedUrl
    || response.request().resourceType() !== 'document'
  ) fail("local file navigation did not return the exact requested local document");
  const runtime_executed = await page.locator('#phase-title').evaluate((element) => element.textContent === 'Unprompted meaning');
  if (!runtime_executed) fail("the CSP-authorized harness runtime did not execute");

  await page.evaluate(async () => {
    try {
      await fetch('https://browser-preflight.invalid/csp-denial-probe', { cache: 'no-store' });
    } catch {
      // Expected: connect-src 'none' blocks this before a request leaves the page.
    }
  });
  await page.waitForTimeout(50);
  const csp = await page.evaluate(() => globalThis.__browserPreflightCsp);
  const csp_directive_counts = {};
  for (const event of csp) csp_directive_counts[event.directive] = (csp_directive_counts[event.directive] || 0) + 1;
  if ((csp_directive_counts['connect-src'] || 0) < 1) fail("CSP connect-src denial probe did not produce a securitypolicyviolation event");
  if (forbidden_request_count !== 0 || intercepted_forbidden_request_count !== 0) fail("a forbidden request escaped CSP into the browser request pipeline");

  const cdp = await context.newCDPSession(page);
  const phases = await completeSyntheticKeyboardRun(page, cdp);
  const result = {
    id: scenario.id,
    zoom_percent: scenario.zoom_percent,
    viewport_css_px: scenario.viewport,
    device_scale_factor: scenario.device_scale_factor,
    csp: {
      runtime_executed,
      denial_probe_observed: true,
      directive_counts: Object.fromEntries(Object.entries(csp_directive_counts).sort(([left], [right]) => left.localeCompare(right))),
    },
    network: {
      policy: 'exact local HTML plus embedded data resources; external and additional-file requests denied',
      forbidden_request_count,
      intercepted_forbidden_request_count,
      worker_count,
      extra_page_count,
    },
    page_error_count,
    phases,
  };
  if (worker_count || extra_page_count || page_error_count) fail("browser preflight observed a worker, extra page, or page error");
  await context.close();
  return result;
}

export async function runBrowserPreflight({ html, executable }) {
  const htmlPath = await regularNonSymlink(resolve(html), 'HTML input');
  const executablePath = await executableFile(resolve(executable));
  const htmlBytes = await readFile(htmlPath);
  const htmlUrl = pathToFileURL(htmlPath);
  const browser = await chromium.launch({
    executablePath,
    headless: true,
    args: [
      '--disable-background-networking',
      '--disable-component-update',
      '--disable-default-apps',
      '--disable-domain-reliability',
      '--disable-features=AutofillServerCommunication,OptimizationHints,MediaRouter',
      '--disable-sync',
      '--metrics-recording-only',
      '--no-first-run',
      '--host-resolver-rules=MAP * ~NOTFOUND',
    ],
  });
  try {
    const scenarios = [];
    for (const scenario of [
      { id: 'normal-100', zoom_percent: 100, viewport: { width: 1280, height: 900 }, device_scale_factor: 1 },
      { id: 'zoom-200', zoom_percent: 200, viewport: { width: 640, height: 450 }, device_scale_factor: 2 },
      { id: 'zoom-400', zoom_percent: 400, viewport: { width: 320, height: 225 }, device_scale_factor: 4 },
      { id: 'narrow-breakpoint', zoom_percent: 100, viewport: { width: 320, height: 640 }, device_scale_factor: 1 },
    ]) scenarios.push(await runScenario(browser, htmlUrl, scenario));
    const version = await browser.version();
    const phase_count = scenarios.reduce((total, scenario) => total + scenario.phases.length, 0);
    const focus_stop_count = scenarios.reduce((scenarioTotal, scenario) => scenarioTotal + scenario.phases.reduce(
      (phaseTotal, phase) => phaseTotal + phase.active_element_order_and_focus.forward.length + phase.active_element_order_and_focus.reverse.length,
      0,
    ), 0);
    return {
      report_schema_version: '0.1.0',
      construction_status: 'private-offline-browser-preflight-only',
      evidence_boundary: {
        human_recognition_evidence: false,
        participant_evidence: false,
        participant_access_authorized: false,
        study_launch_authorized: false,
        privacy_or_consent_commitment: false,
        artwork_acceptance: false,
        registry_or_unicode_status_change: false,
      },
      input_commitment: { html_sha256: sha256(htmlBytes) },
      browser: { engine: 'chromium', executable_basename: basename(executablePath), version },
      response_data_in_report: false,
      opaque_tokens_in_report: false,
      svg_bytes_in_report: false,
      screenshots_captured: false,
      network_listener: false,
      scenarios,
      summary: {
        scenario_count: scenarios.length,
        phase_count,
        focus_stop_count,
        forbidden_request_count: 0,
        horizontal_overflow_or_clipping_failures: 0,
        accessibility_tree_capture_count: phase_count,
        passed: true,
      },
    };
  } finally {
    await browser.close();
  }
}

async function runCli() {
  const args = parseBrowserPreflightArguments(process.argv.slice(2));
  const outputPath = resolve(args.out);
  await realpath(dirname(outputPath));
  const report = await runBrowserPreflight(args);
  const serialized = stableJson(report);
  await writeFile(outputPath, serialized, { flag: 'wx', mode: 0o600 });
  process.stdout.write(serialized);
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  runCli().catch((error) => {
    process.stderr.write(`${basename(process.argv[1])}: ${error.message}\n`);
    process.exitCode = 1;
  });
}
