import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const root = process.cwd();

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
}

function collectKeys(value, prefix = "", keys = new Set()) {
  if (Array.isArray(value)) {
    if (value.length === 0) {
      keys.add(`${prefix}[]`);
      return keys;
    }

    value.forEach((item, index) => {
      collectKeys(item, `${prefix}[${index}]`, keys);
    });
    return keys;
  }

  if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      const next = prefix ? `${prefix}.${key}` : key;
      collectKeys(child, next, keys);
    }
    return keys;
  }

  keys.add(prefix);
  return keys;
}

let failed = false;

function compare(label, enValue, esValue) {
  const enKeys = collectKeys(enValue);
  const esKeys = collectKeys(esValue);
  const missingInEs = [...enKeys].filter((key) => !esKeys.has(key));
  const missingInEn = [...esKeys].filter((key) => !enKeys.has(key));

  if (missingInEs.length === 0 && missingInEn.length === 0) {
    return;
  }

  failed = true;
  console.error(`\n[i18n] Key mismatch in ${label}`);
  if (missingInEs.length > 0) {
    console.error(`  Missing in es: ${missingInEs.join(", ")}`);
  }
  if (missingInEn.length > 0) {
    console.error(`  Missing in en: ${missingInEn.join(", ")}`);
  }
}

compare("messages", readJson("src/messages/en.json"), readJson("src/messages/es.json"));

for (const slug of ["home", "services", "case-studies", "contact", "privacy", "terms"]) {
  compare(
    `pages/${slug}`,
    readJson(`src/content/pages/en/${slug}.json`),
    readJson(`src/content/pages/es/${slug}.json`),
  );
}

compare(
  "content/services",
  readJson("src/content/services/en.json"),
  readJson("src/content/services/es.json"),
);

const caseStudyDir = path.join(root, "src/content/case-studies");
const enFiles = fs
  .readdirSync(path.join(caseStudyDir, "en"))
  .filter((file) => file.endsWith(".mdx"))
  .sort();

for (const file of enFiles) {
  const enPath = path.join(caseStudyDir, "en", file);
  const esPath = path.join(caseStudyDir, "es", file);

  if (!fs.existsSync(esPath)) {
    failed = true;
    console.error(`\n[i18n] Missing Spanish case study: ${file}`);
    continue;
  }

  const enData = matter(fs.readFileSync(enPath, "utf8")).data;
  const esData = matter(fs.readFileSync(esPath, "utf8")).data;

  compare(`case-studies/${file}`, enData, esData);
}

if (failed) {
  process.exit(1);
}

console.log("[i18n] en/es dictionary and content key parity OK");
