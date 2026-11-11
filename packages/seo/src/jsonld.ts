export type JsonLd = Record<string, unknown>;

export type OrganizationInput = {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
};

export function organizationJsonLd({
  name,
  url,
  logo,
  description,
  sameAs,
}: OrganizationInput): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo,
    description,
    sameAs,
  };
}

export type WebSiteInput = {
  name: string;
  url: string;
  inLanguage?: string;
  description?: string;
};

export function websiteJsonLd({ name, url, inLanguage, description }: WebSiteInput): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    inLanguage,
    description,
  };
}

export type BreadcrumbItem = {
  name: string;
  url: string;
};

export function breadcrumbJsonLd(items: BreadcrumbItem[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export type SoftwareApplicationInput = {
  name: string;
  description: string;
  applicationCategory: string;
  operatingSystem?: string;
  url: string;
  price?: string;
  priceCurrency?: string;
};

export function softwareApplicationJsonLd({
  name,
  description,
  applicationCategory,
  operatingSystem = "Web",
  url,
  price = "0",
  priceCurrency = "USD",
}: SoftwareApplicationInput): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    applicationCategory,
    operatingSystem,
    url,
    offers: {
      "@type": "Offer",
      price,
      priceCurrency,
    },
  };
}

export type FaqItem = {
  question: string;
  answer: string;
};

export function faqJsonLd(items: FaqItem[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export type ServiceInput = {
  name: string;
  description: string;
  providerName: string;
  providerUrl: string;
  areaServed?: string;
};

export function serviceJsonLd({
  name,
  description,
  providerName,
  providerUrl,
  areaServed,
}: ServiceInput): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    areaServed,
    provider: {
      "@type": "Organization",
      name: providerName,
      url: providerUrl,
    },
  };
}
