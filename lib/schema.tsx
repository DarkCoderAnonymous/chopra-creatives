import { founder, siteConfig, type CaseStudy, type Service } from "./data";

type Schema = Record<string, unknown>;

const abs = (path: string) => new URL(path, siteConfig.url).toString();
const hasRealFounder = !founder.name.startsWith("[");

/** Renders schema.org JSON-LD. `<` is escaped so content can't close the tag. */
export function JsonLd({ data }: { data: Schema | Schema[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function organizationSchema(): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": abs("/#organization"),
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    email: siteConfig.email,
    logo: abs("/images/brand/mark.png"),
    image: abs("/opengraph-image"),
    slogan: siteConfig.headline,
    knowsAbout: [
      "Product packaging design",
      "Production-ready packaging artwork",
      "Packaging dieline design",
      "3D product visualization",
      "Amazon product images",
      "Amazon A+ Content design",
      "Shopify product design",
    ],
    ...(hasRealFounder && {
      founder: { "@type": "Person", name: founder.name, jobTitle: founder.role },
    }),
    ...(siteConfig.socials.length > 0 && { sameAs: siteConfig.socials.map((s) => s.href) }),
  };
}

export function personSchema(): Schema | null {
  if (!hasRealFounder) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: founder.name,
    jobTitle: founder.role,
    worksFor: { "@id": abs("/#organization") },
  };
}

export function serviceSchema(service: Pick<Service, "name" | "summary" | "includes">, path: string): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.summary,
    url: abs(path),
    provider: { "@id": abs("/#organization") },
    serviceType: service.name,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.name} deliverables`,
      itemListElement: service.includes.map((item) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: item },
      })),
    },
  };
}

export function caseStudySchema(study: CaseStudy): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: study.title,
    headline: study.title,
    description: study.tagline,
    url: abs(`/work/${study.slug}`),
    image: abs(study.heroImage.src),
    genre: `${study.industry} packaging design`,
    keywords: [study.packagingType, ...study.scope].join(", "),
    creator: { "@id": abs("/#organization") },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

export function articleSchema(a: { title: string; description: string; path: string }): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    url: abs(a.path),
    mainEntityOfPage: abs(a.path),
    author: hasRealFounder
      ? { "@type": "Person", name: founder.name }
      : { "@id": abs("/#organization") },
    publisher: { "@id": abs("/#organization") },
  };
}

export function faqSchema(faqs: { q: string; a: string }[]): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
