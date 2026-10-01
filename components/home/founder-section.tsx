import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { founder } from "@/lib/data";

/** Founder-led positioning: the expert behind the studio is visible. */
export function FounderSection({ linkToAbout = true }: { linkToAbout?: boolean }) {
  return (
    <section className="py-24 md:py-32">
      <Container className="grid items-center gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16 lg:gap-24">
        <Reveal>
          <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[28px] border border-border bg-surface">
            {founder.photo ? (
              <Image
                src={founder.photo}
                alt={`${founder.name}, ${founder.role} at Chopra Creative`}
                fill
                sizes="(min-width: 768px) 30vw, 90vw"
                className="object-cover"
              />
            ) : (
              // No photo yet: a quiet monogram instead of a stock portrait.
              <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                <span className="font-display text-8xl italic leading-none text-foreground/15">
                  CC
                </span>
                <span className="text-xs font-medium text-muted">[FOUNDER PHOTO]</span>
              </div>
            )}
          </div>
        </Reveal>

        <div>
          <Reveal>
            <Eyebrow>About the founder</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-[1.9rem] font-bold leading-[1.1] tracking-[-0.03em] sm:text-4xl">
              {founder.intro}
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-7 max-w-xl space-y-4 text-base leading-relaxed text-muted sm:text-lg">
              <p>{founder.approach}</p>
              <p>{founder.extension}</p>
            </div>
          </Reveal>
          {founder.credentials.length > 0 && (
            <Reveal delay={0.2}>
              <ul className="mt-7 flex flex-wrap gap-2">
                {founder.credentials.map((c) => (
                  <li key={c} className="rounded-full border border-border px-3 py-1.5 text-xs font-medium">
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
          <Reveal delay={0.25}>
            <p className="mt-8 text-sm">
              <span className="font-semibold">{founder.name}</span>
              <span className="text-muted">, {founder.role}, Chopra Creative</span>
            </p>
          </Reveal>
          {linkToAbout && (
            <Reveal delay={0.3}>
              <div className="mt-8">
                <ButtonLink href="/about" variant="secondary" arrow magnetic={false}>
                  More about the studio
                </ButtonLink>
              </div>
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}
