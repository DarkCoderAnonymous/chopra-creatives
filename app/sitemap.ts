import type { MetadataRoute } from "next";
import { caseStudies, siteConfig } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/work", "/about", "/contact"].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
  }));

  const work = caseStudies.map((study) => ({
    url: `${siteConfig.url}/work/${study.slug}`,
    lastModified: new Date(),
  }));

  return [...routes, ...work];
}
