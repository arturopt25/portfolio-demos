import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import { getDictionary } from "./dictionary";
import type { MetricValue } from "./format";
import { localizePath, type Locale } from "./i18n";

/**
 * Content adapter contract.
 *
 * Pages only talk to this interface. The local implementation reads JSON and
 * MDX from `src/content`, so swapping in Sanity, Payload, or another headless
 * CMS later means implementing the same four methods without touching any
 * page component.
 */

export type IconName = "factory" | "gauge" | "leaf" | "compass";

export type SeoContent = {
  title: string;
  description: string;
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  description: string;
};

export type CtaContent = {
  title: string;
  description: string;
};

export type StatContent = {
  value: MetricValue;
  label: string;
};

export type ProcessStep = {
  title: string;
  description: string;
};

export type ProcessContent = {
  eyebrow: string;
  title: string;
  description: string;
  steps: ProcessStep[];
};

export type TestimonialContent = {
  quote: string;
  name: string;
  role: string;
};

export type ServiceSummary = {
  name: string;
  summary: string;
  icon: IconName;
};

export type ServiceDetail = ServiceSummary & {
  slug: string;
  description: string;
  outcomes: string[];
};

export type HomePageContent = {
  slug: "home";
  seo: SeoContent;
  hero: HeroContent;
  clients: { title: string; items: string[] };
  services: {
    eyebrow: string;
    title: string;
    description: string;
    items: ServiceSummary[];
  };
  caseStudies: {
    eyebrow: string;
    title: string;
    description: string;
  };
  stats: StatContent[];
  process: ProcessContent;
  testimonials: {
    eyebrow: string;
    title: string;
    items: TestimonialContent[];
  };
  cta: CtaContent;
};

export type ServicesPageContent = {
  slug: "services";
  seo: SeoContent;
  hero: HeroContent;
  intro: { title: string; paragraphs: string[] };
  services: ServiceDetail[];
  process: ProcessContent;
  cta: CtaContent;
};

export type CaseStudiesPageContent = {
  slug: "case-studies";
  seo: SeoContent;
  hero: HeroContent;
  cta: CtaContent;
};

export type ContactDetail = {
  label: string;
  value: string;
  href?: string;
};

export type ContactPageContent = {
  slug: "contact";
  seo: SeoContent;
  hero: HeroContent;
  form: { title: string; description: string };
  details: ContactDetail[];
  cta: CtaContent;
};

export type LegalPageContent = {
  seo: SeoContent;
  title: string;
  updated: string;
  intro: string;
  sections: { heading: string; paragraphs: string[] }[];
};

export type PageContentMap = {
  home: HomePageContent;
  services: ServicesPageContent;
  "case-studies": CaseStudiesPageContent;
  contact: ContactPageContent;
  privacy: LegalPageContent;
  terms: LegalPageContent;
};

export type PageSlug = keyof PageContentMap;

export type CaseStudyMetric = {
  label: string;
  before: MetricValue;
  after: MetricValue;
};

export type CaseStudySummary = {
  slug: string;
  title: string;
  client: string;
  sector: string;
  year: string;
  publishedAt: string;
  order: number;
  summary: string;
  metrics: CaseStudyMetric[];
};

export type CaseStudy = CaseStudySummary & {
  body: string;
};

export type NavigationItem = {
  label: string;
  href: string;
};

export interface ContentAdapter {
  getNavigation(locale: Locale): Promise<NavigationItem[]>;
  getPage<K extends PageSlug>(locale: Locale, slug: K): Promise<PageContentMap[K]>;
  getCaseStudies(locale: Locale): Promise<CaseStudySummary[]>;
  getCaseStudy(locale: Locale, slug: string): Promise<CaseStudy | null>;
}

const contentRoot = path.join(process.cwd(), "src", "content");

function readJson<T>(...segments: string[]): T {
  const file = path.join(contentRoot, ...segments);
  const raw = fs.readFileSync(file, "utf8");

  return JSON.parse(raw) as T;
}

function asString(value: unknown, field: string, file: string): string {
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`[content-adapter] Expected a non-empty string for "${field}" in ${file}`);
  }

  return value;
}

function asNumber(value: unknown, field: string, file: string): number {
  if (typeof value !== "number" || Number.isNaN(value)) {
    throw new Error(`[content-adapter] Expected a number for "${field}" in ${file}`);
  }

  return value;
}

function asMetricValue(value: unknown, field: string, file: string): MetricValue {
  if (typeof value !== "object" || value === null) {
    throw new Error(`[content-adapter] Expected an object for "${field}" in ${file}`);
  }

  const raw = value as Record<string, unknown>;
  const format = raw.format;

  if (format !== "percent" && format !== "number" && format !== "text") {
    throw new Error(`[content-adapter] Expected a metric format for "${field}" in ${file}`);
  }

  const metric: MetricValue = { format };

  if (typeof raw.value === "number") {
    metric.value = raw.value;
  }

  if (typeof raw.text === "string") {
    metric.text = raw.text;
  }

  if (typeof raw.fractionDigits === "number") {
    metric.fractionDigits = raw.fractionDigits;
  }

  if (typeof raw.suffix === "string") {
    metric.suffix = raw.suffix;
  }

  if (raw.signed === true) {
    metric.signed = true;
  }

  return metric;
}

function asMetrics(value: unknown, file: string): CaseStudyMetric[] {
  if (!Array.isArray(value)) {
    throw new Error(`[content-adapter] Expected a "metrics" array in ${file}`);
  }

  return value.map((entry, index) => {
    if (typeof entry !== "object" || entry === null) {
      throw new Error(`[content-adapter] Invalid metrics[${index}] in ${file}`);
    }

    const metric = entry as Record<string, unknown>;

    return {
      label: asString(metric.label, `metrics[${index}].label`, file),
      before: asMetricValue(metric.before, `metrics[${index}].before`, file),
      after: asMetricValue(metric.after, `metrics[${index}].after`, file),
    };
  });
}

function caseStudyDirectory(locale: Locale): string {
  return path.join(contentRoot, "case-studies", locale);
}

function toCaseStudySummary(data: Record<string, unknown>, file: string): CaseStudySummary {
  return {
    slug: path.basename(file, ".mdx"),
    title: asString(data.title, "title", file),
    client: asString(data.client, "client", file),
    sector: asString(data.sector, "sector", file),
    year: asString(data.year, "year", file),
    publishedAt: asString(data.publishedAt, "publishedAt", file),
    order: asNumber(data.order, "order", file),
    summary: asString(data.summary, "summary", file),
    metrics: asMetrics(data.metrics, file),
  };
}

function toServiceSummary({ name, summary, icon }: ServiceDetail): ServiceSummary {
  return { name, summary, icon };
}

export const localContentAdapter: ContentAdapter = {
  async getNavigation(locale) {
    const dictionary = getDictionary(locale);

    return [
      { label: dictionary.nav.home, href: localizePath(locale) },
      { label: dictionary.nav.services, href: localizePath(locale, "/services") },
      { label: dictionary.nav.caseStudies, href: localizePath(locale, "/case-studies") },
      { label: dictionary.nav.contact, href: localizePath(locale, "/contact") },
    ];
  },

  async getPage<K extends PageSlug>(locale: Locale, slug: K): Promise<PageContentMap[K]> {
    const raw = readJson<unknown>("pages", locale, `${slug}.json`);

    if (slug === "home") {
      const page = raw as HomePageContent;
      const services = readJson<ServiceDetail[]>("services", `${locale}.json`);

      // The home page only needs the service name, summary, and icon.
      return {
        ...page,
        services: { ...page.services, items: services.map(toServiceSummary) },
      } as PageContentMap[K];
    }

    if (slug === "services") {
      const page = raw as ServicesPageContent;
      const services = readJson<ServiceDetail[]>("services", `${locale}.json`);

      return { ...page, services } as PageContentMap[K];
    }

    return raw as PageContentMap[K];
  },

  async getCaseStudies(locale) {
    const directory = caseStudyDirectory(locale);
    const files = fs
      .readdirSync(directory)
      .filter((file) => file.endsWith(".mdx"))
      .sort();

    return files
      .map((file) => {
        const source = fs.readFileSync(path.join(directory, file), "utf8");
        const { data } = matter(source);

        return toCaseStudySummary(data as Record<string, unknown>, file);
      })
      .sort((a, b) => a.order - b.order);
  },

  async getCaseStudy(locale, slug) {
    const file = `${slug}.mdx`;
    const fullPath = path.join(caseStudyDirectory(locale), file);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const source = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(source);

    return {
      ...toCaseStudySummary(data as Record<string, unknown>, file),
      body: content,
    };
  },
};

export const contentAdapter: ContentAdapter = localContentAdapter;
