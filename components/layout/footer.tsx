import Link from "next/link";
import { Container } from "./container";
import { Logo } from "./logo";
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
    <footer className="border-t border-border bg-surface">
      <Container className="py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {siteConfig.description}
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-5 inline-block text-sm font-medium text-accent hover:underline"
            >
              {siteConfig.email}
            </a>
          </div>

          {FOOTER_LINKS.map((group) => (
            <div key={group.heading}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
                {group.heading}
              </h3>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/80 transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
          <p>Packaging design &amp; structural dieline studio.</p>
        </div>
      </Container>
    </footer>
  );
}
