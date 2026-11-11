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
  const url = new URL(rawUrl);
  const key = `${url.pathname}${url.search}`;
  const rows = groups.get(key) ?? [];
  const row = { run: rows.length + 1 };

  for (const category of CATEGORIES) {
    row[category] = Math.round((report.categories?.[category]?.score ?? 0) * 100);
  }

  rows.push(row);
  groups.set(key, rows);
}

for (const [key, rows] of groups) {
  const medians = {};

  for (const category of CATEGORIES) {
    const values = rows.map((row) => row[category]).sort((a, b) => a - b);
    medians[category] = values[Math.floor(values.length / 2)];
  }

  console.log(`\n${key}`);
  console.table(rows);
  console.log("Median:", medians);
}
