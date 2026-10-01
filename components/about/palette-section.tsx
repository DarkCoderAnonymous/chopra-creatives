import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const SWATCHES = [
  { hex: "#1E1B42", name: "Ink" },
  { hex: "#332B6B", name: "Indigo" },
  { hex: "#533A9C", name: "Violet" },
  { hex: "#39B8FD", name: "Sky" },
  { hex: "#FF0A45", name: "Signal" },
  { hex: "#FF8F88", name: "Coral" },
];

export function PaletteSection() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Our own identity"
          title="A palette built the same way we build a *client's.*"
          description="Every packaging system starts with color architecture and type before a single panel gets laid out — including ours."
        />

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {SWATCHES.map((s, i) => (
            <Reveal key={s.hex} delay={i * 0.07} y={40}>
              <div className="group">
                <div
                  className="aspect-[3/4] w-full rounded-3xl border border-border shadow-[0_20px_40px_-24px_rgba(10,9,23,0.5)] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-2 group-hover:-rotate-2"
                  style={{ backgroundColor: s.hex }}
                />
                <p className="mt-4 text-sm font-semibold">{s.name}</p>
                <p className="font-mono text-xs uppercase tracking-wide text-muted">
                  {s.hex}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
