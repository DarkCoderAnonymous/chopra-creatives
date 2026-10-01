import Link from "next/link";
import { Container } from "./container";
import { Logo } from "./logo";
import { BackToTop } from "./back-to-top";
import { FooterWordmark } from "./footer-wordmark";
import { siteConfig } from "@/lib/data";

const FOOTER_LINKS = [
  {
    heading: "Studio",
    links: [
      { href: "/work", label: "Work" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "Work",
    links: [
      { href: "/work/mitrocore", label: "MitroCore" },
      { href: "/work/natur-paws", label: "Natur Paws" },
      { href: "/work/dumbbell-nuts", label: "Dumbbell Nuts" },
      { href: "/work/carolina-rice", label: "Carolina Jasmine Rice" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      <Container className="pt-20 md:pt-28">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-muted">
              {siteConfig.description}
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="link-underline mt-6 inline-block pb-0.5 font-display text-2xl italic text-foreground"
            >
              {siteConfig.email}
            </a>
          </div>

          {FOOTER_LINKS.map((group) => (
            <div key={group.heading}>
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
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
          <div className="flex items-center gap-5">
            <p>Packaging design &amp; structural dieline studio.</p>
            <BackToTop />
          </div>
        </div>
      </Container>

      <FooterWordmark />
    </footer>
  );
}
