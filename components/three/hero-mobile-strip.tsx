import Image from "next/image";
import { caseStudies } from "@/lib/data";

const ITEMS = [
  { i: 0, cls: "-rotate-6 z-10" },
  { i: 3, cls: "rotate-2 z-20 -ml-6" },
  { i: 1, cls: "rotate-8 z-10 -ml-6" },
];

export function HeroMobileStrip() {
  return (
    <div className="flex items-center pl-2" aria-hidden>
      {ITEMS.map(({ i, cls }) => {
        const study = caseStudies[i];
        return (
          <div
            key={study.slug}
            className={`h-28 w-24 shrink-0 overflow-hidden rounded-2xl border border-white/10 shadow-xl shadow-black/20 ${cls}`}
          >
            <Image
              src={study.heroImage.src}
              alt=""
              width={200}
              height={230}
              className="h-full w-full object-cover"
            />
          </div>
        );
      })}
      <span className="ml-4 text-xs font-medium text-muted">
        +{caseStudies.length - ITEMS.length} more systems
      </span>
    </div>
  );
}
