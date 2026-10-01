import Link from "next/link";
import { Container } from "./container";
import { Logo } from "./logo";
import { BackToTop } from "./back-to-top";
import { FooterWordmark } from "./footer-wordmark";
import { ButtonLink } from "@/components/ui/button-link";
import { caseStudies, services, siteConfig } from "@/lib/data";

const FOOTER_LINKS = [
  {
    heading: "Services",
    links: [
      ...services.map((s) => ({ href: s.href, label: s.name })),
      { href: "/services#product-launch-audit", label: "Product Launch Audit" },
      { href: "/#pricing", label: "Packages & pricing" },
    ],
  },
  {
    heading: "Work",
    links: caseStudies.map((s) => ({ href: `/work/${s.slug}`, label: s.client })),
  },
  {
    heading: "Studio",
    links: [
      { href: "/about", label: "About" },
      { href: "/insights", label: "Insights" },
      { href: "/#process", label: "Process" },
      { href: "/contact", label: "Start a project" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      <Container className="pt-20 md:pt-28">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm font-semibold">{siteConfig.tagline}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Strategic packaging design and production-ready artwork, extended
              into Amazon, Shopify and product launch creative.
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="link-underline mt-6 inline-block pb-0.5 font-display text-2xl italic text-foreground"
            >
              {siteConfig.email}
            </a>
            <div className="mt-6">
              <ButtonLink href="/contact" size="sm" arrow magnetic={false}>
                Start a project
              </ButtonLink>
            </div>
          </div>

          {FOOTER_LINKS.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
                {group.heading}
              </h3>
              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="link-underline pb-0.5 text-sm text-foreground/80 hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {siteConfig.socials.map((s) => (
              <a key={s.href} href={s.href} className="hover:text-foreground" rel="me noopener">
                {s.label}
              </a>
            ))}
            <p>{siteConfig.tagline}</p>
            <BackToTop />
          </div>
        </div>
      </Container>

      <FooterWordmark />
    </footer>
  );
}
