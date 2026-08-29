/**
 * Replay every selector `purge-legacy-css.mjs` removed against the live DOM of
 * every route, at both a desktop and a phone viewport.
 *
 * A dropped selector that still matches an element is a false positive: the
 * class reached the page some way the source scan missed. This is the check
 * that makes the purge safe to keep — pixel diffing only catches what happens
 * to be on screen in the state the screenshot caught.
 *
 * Run against a running production server:
 *   node scripts/audit-purged-css.mjs http://localhost:3415
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const BASE = process.argv[2] || "http://localhost:3000";
const EXECUTABLE = process.env.CHROMIUM_PATH;

const ROOT = process.cwd();
const selectors = JSON.parse(
  readFileSync(path.join(ROOT, "scripts/.purged-selectors.json"), "utf8"),
);

const ROUTES = [
  "/", "/about", "/contact", "/portfolio", "/blog", "/web-design",
  "/graphic-design", "/database-solutions", "/software-solutions",
  "/business-systems", "/erp", "/accounting-software", "/oil-and-gas-software",
  "/herat", "/portfolio/restaurant-pos", "/blog/migrating-data-from-excel",
];

const unique = [...new Set(selectors.map((entry) => entry.selector))];
console.log(`replaying ${unique.length} dropped selectors over ${ROUTES.length} routes`);

const browser = await chromium.launch(
  EXECUTABLE ? { executablePath: EXECUTABLE } : {},
);
const hits = new Map();

for (const viewport of [
  { width: 1440, height: 900 },
  { width: 390, height: 844 },
]) {
  const context = await browser.newContext({ viewport });
  for (const route of ROUTES) {
    const page = await context.newPage();
    await page.goto(BASE + route, { waitUntil: "domcontentloaded", timeout: 60000 });
    // Menus, tabs and accordions only exist in the DOM once opened, so every
    // control that could reveal markup is clicked before the DOM is read.
    await page.evaluate(async () => {
      const clickable = document.querySelectorAll(
        'button, [role="tab"], summary, [aria-expanded], [data-state]',
      );
      for (const element of clickable) {
        try {
          element.click();
        } catch {
          /* a control that navigates away is not our concern here */
        }
      }
      await new Promise((resolve) => setTimeout(resolve, 100));
    });
    const found = await page.evaluate((list) => {
      const out = [];
      for (const selector of list) {
        try {
          if (document.querySelector(selector)) out.push(selector);
        } catch {
          // A selector the browser cannot parse never matched anything either.
        }
      }
      return out;
    }, unique);
    for (const selector of found) {
      if (!hits.has(selector)) hits.set(selector, new Set());
      hits.get(selector).add(route);
    }
    await page.close();
  }
  await context.close();
}
await browser.close();

if (hits.size === 0) {
  console.log("clean: no dropped selector matches anything on any route");
} else {
  console.log(`\n${hits.size} dropped selectors still match live elements:`);
  for (const [selector, routes] of hits) {
    console.log(`  ${selector}  <- ${[...routes].join(", ")}`);
  }
  writeFileSync(
    path.join(ROOT, "scripts/.purge-false-positives.json"),
    JSON.stringify([...hits.keys()], null, 2),
  );
  process.exitCode = 1;
}
