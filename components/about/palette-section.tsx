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
    <section className="border-t border-border bg-surface py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Our own identity"
          title="A palette built the same way we build a client's."
          description="Every packaging system starts with color architecture and type before a single panel gets laid out — including ours."
        />

        <Reveal delay={0.1}>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {SWATCHES.map((s) => (
              <div key={s.hex} className="group">
                <div
                  className="aspect-square w-full rounded-2xl border border-border transition-transform duration-300 group-hover:scale-[1.04]"
                  style={{ backgroundColor: s.hex }}
                />
                <p className="mt-3 text-sm font-medium">{s.name}</p>
                <p className="text-xs uppercase tracking-wide text-muted">
                  {s.hex}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
