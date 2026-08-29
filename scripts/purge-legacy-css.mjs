/**
 * Purge `app/legacy-base.css`.
 *
 * That file is a compiled Tailwind v3.4 build inherited from the previous site.
 * The project now also runs Tailwind v4 through `app/globals.css`, which scans
 * the source and emits every utility the JSX actually uses — so almost all of
 * the v3 utility dump is a duplicate of a class that is already generated. It
 * is 137KB of render-blocking CSS of which measured coverage across every route
 * reaches 23%.
 *
 * The purge is a class-reachability filter, not a coverage filter: a rule is
 * kept when every class token in one of its selectors appears as a whole token
 * somewhere in the source tree. Rules with no class selector at all — the
 * preflight reset, element rules, custom properties, keyframes, font faces —
 * are always kept, so the base layer the design sits on is untouched.
 *
 * Run: node scripts/purge-legacy-css.mjs [--write]
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { readdir } from "node:fs/promises";
import path from "node:path";
import postcss from "postcss";

const ROOT = process.cwd();
const TARGET = path.join(ROOT, "app/legacy-base.css");
const SOURCE_DIRS = ["app", "components", "lib", "public"];
const SOURCE_EXTENSIONS = new Set([
  ".tsx",
  ".ts",
  ".jsx",
  ".js",
  ".mjs",
  ".css",
  ".html",
  ".md",
  ".mdx",
  ".json",
]);

/** Split source text on characters that cannot appear inside a class token. */
const TOKEN_SPLIT = /[\s`{}();,=<>]+/;

async function collectFiles(dir, out = []) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
      await collectFiles(full, out);
    } else if (SOURCE_EXTENSIONS.has(path.extname(entry.name))) {
      out.push(full);
    }
  }
  return out;
}

/**
 * Every whole token that appears anywhere in the source. Class names are
 * matched against this set exactly, so `flex` never keeps `flex-col`.
 */
async function buildTokenSet() {
  const tokens = new Set();
  const raw = [];
  for (const dir of SOURCE_DIRS) {
    const files = await collectFiles(path.join(ROOT, dir));
    for (const file of files) {
      // The target and the pre-purge backup of it are not evidence that a
      // class is used: scanning them would keep every rule in the file.
      if (path.resolve(file) === TARGET) continue;
      if (path.basename(file) === "legacy-base.full.css") continue;
      const text = readFileSync(file, "utf8");
      raw.push(text);
      for (const token of text.split(TOKEN_SPLIT)) {
        if (!token) continue;
        tokens.add(token);
        // Class attributes arrive as one string; the quotes and JSX braces
        // around them are split off above, but leading/trailing punctuation
        // from template literals is not.
        tokens.add(token.replace(/^["'`]+|["'`]+$/g, ""));
      }
    }
  }
  return { tokens, raw: raw.join("\n") };
}

/**
 * `.md\:w-\[130px\]` -> `md:w-[130px]`.
 *
 * A class that starts with a digit is escaped by its codepoint rather than by
 * a backslash, so `2xl:w-[1540px]` is written `\32 xl\:w-\[1540px\]`. Decoding
 * that as a literal `3` turns the name into `32xl:...`, which matches nothing
 * in the source and quietly purges every `2xl:` rule in the file.
 */
function unescapeClass(name) {
  return name.replace(/\\(?:([0-9a-fA-F]{1,6})[ \t\n]?|(.))/g, (_, hex, literal) =>
    hex ? String.fromCodePoint(parseInt(hex, 16)) : literal,
  );
}

/**
 * One class token in a selector. The escape branch has to come first and the
 * negated set has to exclude the backslash, or `.lg\:grid-cols-2` is read as
 * the class `lg` and every responsive utility is purged.
 *
 * A codepoint escape may be terminated by a space (`.\32 xl\:px-0`), and that
 * space belongs to the class name, not to a descendant combinator — so it has
 * to be consumed by the escape branch before the negated set sees it.
 */
const CLASS_PATTERN =
  /\.((?:\\[0-9a-fA-F]{1,6}[ \t\n]?|\\.|[^\s\\.,:>+~()[\]#|=^$*"'{}])+)/g;

/** Class tokens in one comma-free selector. */
function classTokens(selector) {
  const found = [];
  let match;
  CLASS_PATTERN.lastIndex = 0;
  while ((match = CLASS_PATTERN.exec(selector))) found.push(unescapeClass(match[1]));
  return found;
}

const { tokens, raw } = await buildTokenSet();
const css = readFileSync(TARGET, "utf8");
const root = postcss.parse(css);

let kept = 0;
let dropped = 0;
const droppedSamples = [];
/** Every selector this run removed, for the live-DOM audit in scripts/. */
const droppedSelectors = [];

root.walkRules((rule) => {
  // Keyframe steps (`from`, `50%`) are not selectors to test.
  if (rule.parent?.type === "atrule" && /keyframes/.test(rule.parent.name)) return;

  const survivors = rule.selectors.filter((selector) => {
    const classes = classTokens(selector);
    // No class in this selector: element/attribute/pseudo rule, always kept.
    if (classes.length === 0) return true;
    return classes.every(
      (name) =>
        tokens.has(name) ||
        // Interpolated or concatenated in source (`text-${size}`, "px-" + n).
        raw.includes(name),
    );
  });

  if (survivors.length === rule.selectors.length) {
    kept += 1;
    return;
  }
  const removed = rule.selectors.filter((selector) => !survivors.includes(selector));
  for (const selector of removed) {
    droppedSelectors.push({
      selector,
      media: rule.parent?.type === "atrule" ? `@${rule.parent.name} ${rule.parent.params}` : "",
    });
  }

  if (survivors.length === 0) {
    dropped += 1;
    if (droppedSamples.length < 12) droppedSamples.push(rule.selector.slice(0, 60));
    rule.remove();
    return;
  }
  rule.selectors = survivors;
  kept += 1;
});

// An at-rule whose every child was dropped carries nothing.
for (let pass = 0; pass < 4; pass += 1) {
  let changed = false;
  root.walkAtRules((atRule) => {
    if (/keyframes|font-face|charset|import/.test(atRule.name)) return;
    if (atRule.nodes && atRule.nodes.length === 0) {
      atRule.remove();
      changed = true;
    }
  });
  if (!changed) break;
}

// Keyframes nothing animates any more.
const usedAnimations = new Set();
root.walkDecls(
  /^(animation|animation-name|-webkit-animation|-webkit-animation-name)$/,
  (decl) => {
    for (const token of decl.value.split(/[\s,]+/)) usedAnimations.add(token);
  },
);
root.walkAtRules(/keyframes/, (atRule) => {
  const name = atRule.params.trim();
  if (!usedAnimations.has(name) && !tokens.has(name) && !raw.includes(name)) {
    atRule.remove();
  }
});

const output = root.toString();
const before = Buffer.byteLength(css);
const after = Buffer.byteLength(output);

console.log(`rules kept ${kept}, dropped ${dropped}`);
console.log(
  `${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB ` +
    `(-${(((before - after) / before) * 100).toFixed(1)}%)`,
);
if (droppedSamples.length) {
  console.log(`sample dropped: ${droppedSamples.join(" | ")}`);
}

// The audit that proves the purge: every selector removed here is replayed
// against the live DOM of every route by scripts/audit-purged-css.mjs.
writeFileSync(
  path.join(ROOT, "scripts/.purged-selectors.json"),
  JSON.stringify(droppedSelectors, null, 0),
);

if (process.argv.includes("--write")) {
  const backup = TARGET.replace(/\.css$/, ".full.css");
  if (!existsSync(backup)) writeFileSync(backup, css);
  writeFileSync(TARGET, output);
  console.log(`written; original kept at ${path.relative(ROOT, backup)}`);
}
