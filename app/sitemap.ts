import type { MetadataRoute } from "next";
import { caseStudies, siteConfig } from "@/lib/data";
import { insights } from "@/lib/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${siteConfig.url}${path}`;
  const lastModified = new Date();

  const pages: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/production-ready-packaging-design", priority: 0.9 },
    { path: "/services", priority: 0.9 },
    { path: "/work", priority: 0.8 },
    { path: "/contact", priority: 0.8 },
    { path: "/about", priority: 0.6 },
    { path: "/insights", priority: 0.6 },
  ];

  return [
    ...pages.map((p) => ({ url: url(p.path), lastModified, priority: p.priority })),
    ...caseStudies.map((s) => ({ url: url(`/work/${s.slug}`), lastModified, priority: 0.7 })),
    ...insights.map((i) => ({ url: url(`/insights/${i.slug}`), lastModified, priority: 0.5 })),
  ];
}
