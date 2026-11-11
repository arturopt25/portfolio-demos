import fs from "node:fs";
import path from "node:path";

const CATEGORIES = ["performance", "accessibility", "best-practices", "seo"];
const reportDir = path.resolve(process.cwd(), ".lighthouseci");

if (!fs.existsSync(reportDir)) {
  console.error(`No Lighthouse CI report directory found at ${reportDir}`);
  process.exit(1);
}

const files = fs
  .readdirSync(reportDir)
  .filter((file) => file.startsWith("lhr-") && file.endsWith(".json"))
  .sort();

if (files.length === 0) {
  console.error("No Lighthouse JSON reports found in .lighthouseci/");
  process.exit(1);
}

const groups = new Map();

for (const file of files) {
  const report = JSON.parse(fs.readFileSync(path.join(reportDir, file), "utf8"));
  const rawUrl = report.finalDisplayedUrl ?? report.finalUrl ?? report.requestedUrl ?? "/";
  const pathname = new URL(rawUrl).pathname;
  const rows = groups.get(pathname) ?? [];
  const row = { run: rows.length + 1 };

  for (const category of CATEGORIES) {
    row[category] = Math.round((report.categories?.[category]?.score ?? 0) * 100);
  }

  rows.push(row);
  groups.set(pathname, rows);
}

for (const [pathname, rows] of groups) {
  const medians = {};

  for (const category of CATEGORIES) {
    const values = rows.map((row) => row[category]).sort((a, b) => a - b);
    medians[category] = values[Math.floor(values.length / 2)];
  }

  console.log(`\n${pathname}`);
  console.table(rows);
  console.log("Median:", medians);
}
