import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { SaxesParser } from "saxes";
import parseSvgPath from "svg-path-parser";

const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
const ELEMENT_ATTRIBUTES = {
  svg: new Set(["xmlns", "viewBox", "role", "aria-labelledby", "fill", "stroke", "stroke-width", "stroke-linecap", "stroke-linejoin"]),
  title: new Set(["id"]),
  desc: new Set(["id"]),
  g: new Set(["id", "fill", "stroke", "stroke-width", "stroke-linecap", "stroke-linejoin", "fill-rule", "vector-effect"]),
  path: new Set(["id", "d", "fill", "stroke", "stroke-width", "stroke-linecap", "stroke-linejoin", "fill-rule", "vector-effect"]),
  line: new Set(["id", "x1", "y1", "x2", "y2", "fill", "stroke", "stroke-width", "stroke-linecap", "vector-effect"]),
  polyline: new Set(["id", "points", "fill", "stroke", "stroke-width", "stroke-linecap", "stroke-linejoin", "vector-effect"]),
  polygon: new Set(["id", "points", "fill", "stroke", "stroke-width", "stroke-linecap", "stroke-linejoin", "fill-rule", "vector-effect"]),
  rect: new Set(["id", "x", "y", "width", "height", "rx", "ry", "fill", "stroke", "stroke-width", "stroke-linejoin", "vector-effect"]),
  circle: new Set(["id", "cx", "cy", "r", "fill", "stroke", "stroke-width", "vector-effect"]),
  ellipse: new Set(["id", "cx", "cy", "rx", "ry", "fill", "stroke", "stroke-width", "vector-effect"]),
};
const GEOMETRY_ELEMENTS = new Set(["path", "line", "polyline", "polygon", "rect", "circle", "ellipse"]);
const COLOR_ATTRIBUTES = new Set(["fill", "stroke"]);
const EXTERNAL_VALUE = /(?:url\s*\(|https?:|data:|javascript:|@import|^\/\/)/i;
const NUMBER = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/;
const NUMERIC_ATTRIBUTES = new Set(["x", "y", "x1", "y1", "x2", "y2", "cx", "cy", "r", "rx", "ry", "width", "height", "stroke-width"]);
const NONNEGATIVE_ATTRIBUTES = new Set(["r", "rx", "ry", "width", "height"]);

function fail(message) {
  throw new Error(`SVG validation failed: ${message}`);
}

function parseViewBox(value) {
  const tokens = value.trim().split(/[\s,]+/).filter(Boolean);
  if (tokens.length !== 4 || tokens.some((token) => !NUMBER.test(token) || !Number.isFinite(Number(token)))) {
    fail("viewBox must contain four finite SVG numbers");
  }
  const numbers = tokens.map(Number);
  if (numbers[2] <= 0 || numbers[3] <= 0 || numbers[2] !== numbers[3]) fail("viewBox must have equal positive width and height");
}

function validatePoints(value, element) {
  const numbers = value.trim().split(/[\s,]+/).filter(Boolean);
  const minimum = element === "polygon" ? 6 : 4;
  if (numbers.length < minimum || numbers.length % 2 !== 0 || numbers.some((number) => !NUMBER.test(number) || !Number.isFinite(Number(number)))) {
    fail(`<${element}> points must contain at least ${minimum / 2} finite coordinate pairs`);
  }
}

function validatePath(value) {
  if (!value.trim()) fail("<path> d must be non-empty");
  let commands;
  try {
    commands = parseSvgPath(value);
  } catch {
    fail("<path> d must use valid SVG path syntax");
  }
  if (commands.length === 0 || commands[0].code.toUpperCase() !== "M") fail("<path> d must begin with a moveto command");
  if (commands.length > 4096) fail("<path> d exceeds the command limit");
  for (const command of commands) {
    for (const coordinate of Object.values(command)) {
      if (typeof coordinate === "number" && !Number.isFinite(coordinate)) fail("<path> d contains a non-finite coordinate");
    }
    if (("rx" in command && command.rx < 0) || ("ry" in command && command.ry < 0)) fail("<path> arc radii must not be negative");
  }
}

function validateGeometryAttributes(name, attributes) {
  const required = {
    path: ["d"],
    line: ["x1", "y1", "x2", "y2"],
    polyline: ["points"],
    polygon: ["points"],
    rect: ["width", "height"],
    circle: ["r"],
    ellipse: ["rx", "ry"],
  }[name] ?? [];
  for (const attribute of required) {
    if (!(attribute in attributes)) fail(`<${name}> requires ${attribute}`);
  }
  if (attributes.points !== undefined) validatePoints(attributes.points, name);
  if (attributes.d !== undefined) validatePath(attributes.d);
}

export function validateStudySvgBytes(bytes) {
  const source = Buffer.isBuffer(bytes) ? bytes.toString("utf8") : String(bytes);
  if (Buffer.byteLength(source, "utf8") === 0) fail("file is empty");
  if (Buffer.byteLength(source, "utf8") > 1024 * 1024) fail("file exceeds the 1 MiB validation limit");

  const parser = new SaxesParser({ xmlns: false });
  const stack = [];
  const ids = new Set();
  let rootSeen = false;
  let geometryCount = 0;
  let currentColorSeen = false;
  let titleText = "";
  let descText = "";
  let titleId = null;
  let descId = null;
  let ariaIds = [];

  parser.on("doctype", () => fail("DOCTYPE declarations are prohibited"));
  parser.on("processinginstruction", () => fail("processing instructions are prohibited"));
  parser.on("comment", () => fail("XML comments are prohibited"));
  parser.on("error", (error) => fail(`malformed XML: ${error.message}`));
  parser.on("opentag", (node) => {
    const name = node.name;
    const parent = stack.at(-1);
    if (!Object.hasOwn(ELEMENT_ATTRIBUTES, name)) fail(`element <${name}> is prohibited`);
    if (!rootSeen) {
      if (name !== "svg") fail("root element must be <svg>");
      rootSeen = true;
      if (node.attributes.xmlns !== SVG_NAMESPACE) fail("root SVG namespace is missing or incorrect");
      parseViewBox(node.attributes.viewBox ?? "");
      if (node.attributes.role !== "img") fail('root role must be "img"');
      ariaIds = (node.attributes["aria-labelledby"] ?? "").trim().split(/\s+/).filter(Boolean);
      if (ariaIds.length !== 2) fail("aria-labelledby must reference exactly title and description IDs");
    } else if (name === "svg") {
      fail("nested or multiple <svg> elements are prohibited");
    } else if (parent !== "svg" && parent !== "g") {
      fail(`<${name}> is not permitted inside <${parent}>`);
    }

    if ((name === "title" || name === "desc") && parent !== "svg") fail(`<${name}> must be a direct child of <svg>`);
    if (name === "g" && parent !== "svg" && parent !== "g") fail("<g> may contain only groups or geometry and must be inside <svg> or <g>");
    if (name === "title" && titleId !== null) fail("exactly one <title> is permitted");
    if (name === "desc" && descId !== null) fail("exactly one <desc> is permitted");

    for (const [attribute, value] of Object.entries(node.attributes)) {
      if (/^on/i.test(attribute)) fail(`event-handler attribute ${attribute} is prohibited`);
      if (attribute.includes(":")) fail(`namespaced attribute ${attribute} is prohibited`);
      if (!ELEMENT_ATTRIBUTES[name].has(attribute)) fail(`attribute ${attribute} on <${name}> is not allowed`);
      if (attribute !== "xmlns" && EXTERNAL_VALUE.test(value)) fail(`external or executable value in ${attribute} is prohibited`);
      if (NUMERIC_ATTRIBUTES.has(attribute)) {
        if (!NUMBER.test(value) || !Number.isFinite(Number(value))) fail(`${attribute} must be one finite number`);
        if (NONNEGATIVE_ATTRIBUTES.has(attribute) && Number(value) < 0) fail(`${attribute} must not be negative`);
        if (attribute === "stroke-width" && Number(value) <= 0) fail("stroke-width must be greater than zero");
      }
      if (attribute === "stroke-linecap" && !["butt", "round", "square"].includes(value)) fail("stroke-linecap has an unsupported value");
      if (attribute === "stroke-linejoin" && !["miter", "round", "bevel"].includes(value)) fail("stroke-linejoin has an unsupported value");
      if (attribute === "fill-rule" && !["nonzero", "evenodd"].includes(value)) fail("fill-rule has an unsupported value");
      if (attribute === "vector-effect" && value !== "non-scaling-stroke") fail("vector-effect has an unsupported value");
      if (COLOR_ATTRIBUTES.has(attribute)) {
        if (value !== "currentColor" && value !== "none") fail(`${attribute} must be currentColor or none`);
        if (value === "currentColor") currentColorSeen = true;
      }
      if (attribute === "id") {
        if (!value || ids.has(value)) fail("element IDs must be non-empty and unique");
        ids.add(value);
      }
    }
    if (name === "title") titleId = node.attributes.id ?? "";
    if (name === "desc") descId = node.attributes.id ?? "";
    if (GEOMETRY_ELEMENTS.has(name)) {
      validateGeometryAttributes(name, node.attributes);
      geometryCount += 1;
    }
    stack.push(name);
  });
  parser.on("text", (text) => {
    const parent = stack.at(-1);
    if (parent === "title") titleText += text;
    else if (parent === "desc") descText += text;
    else if (text.trim()) fail("visible or stray text is prohibited");
  });
  parser.on("cdata", () => fail("CDATA is prohibited"));
  parser.on("closetag", () => stack.pop());

  try {
    parser.write(source).close();
  } catch (error) {
    if (error.message.startsWith("SVG validation failed:")) throw error;
    fail(`malformed XML: ${error.message}`);
  }

  if (!rootSeen) fail("root <svg> element is missing");
  if (!titleText.trim() || !descText.trim()) fail("non-empty <title> and <desc> are required");
  if (!titleId || !descId || ariaIds[0] !== titleId || ariaIds[1] !== descId) fail("aria-labelledby must reference title then description IDs");
  if (geometryCount === 0) fail("at least one vector geometry element is required");
  if (!currentColorSeen) fail("at least one fill or stroke must use currentColor");
  return { geometry_count: geometryCount, title: titleText.trim(), description: descText.trim() };
}

export async function validateStudySvgFile(path) {
  return validateStudySvgBytes(await readFile(path));
}

async function main() {
  const paths = process.argv.slice(2);
  if (paths.length === 0) fail("usage: npm run svg:validate -- FILE.svg [FILE.svg ...]");
  for (const path of paths) {
    const result = await validateStudySvgFile(path);
    console.log(`${path}: valid (${result.geometry_count} geometry element(s))`);
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
