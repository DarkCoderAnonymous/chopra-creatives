import Image from "next/image";
import { caseStudies } from "@/lib/data";

const FALLBACK_LAYOUT = [
  { i: 0, cls: "left-[38%] top-[8%] w-[22%] max-w-60 rotate-[-9deg]" },
  { i: 3, cls: "right-[1%] top-[4%] w-[27%] max-w-64 rotate-[6deg]" },
  { i: 1, cls: "left-[46%] top-[52%] w-[20%] max-w-52 rotate-[4deg]" },
  { i: 4, cls: "right-[24%] top-[46%] w-[24%] max-w-56 rotate-[-5deg]" },
  { i: 2, cls: "left-[42%] bottom-[4%] w-[20%] max-w-48 rotate-[7deg]" },
  { i: 5, cls: "right-[4%] bottom-[6%] w-[22%] max-w-52 rotate-[-4deg]" },
];

/** Static, non-WebGL composition used when the 3D flythrough can't run. */
export function HeroVisual() {
  return (
    <div className="absolute inset-0 select-none">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_70%_20%,color-mix(in_oklab,var(--accent)_22%,transparent),transparent)]"
      />
      <div className="relative h-full w-full opacity-90">
        {FALLBACK_LAYOUT.map(({ i, cls }) => {
          const study = caseStudies[i];
          return (
            <div
              key={study.slug}
              className={`absolute overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/30 ${cls}`}
            >
              <Image
                src={study.heroImage.src}
                alt=""
                width={500}
                height={375}
                className="h-full w-full object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
