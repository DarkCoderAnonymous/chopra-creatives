import { cn } from "@/lib/utils";

export function Marquee({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
    >
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {[0, 1].map((rep) => (
          <ul
            key={rep}
            aria-hidden={rep === 1}
            className="flex shrink-0 items-center"
          >
            {items.map((item, i) => (
              <li
                key={`${rep}-${i}`}
                className="flex shrink-0 items-center gap-8 pr-8"
              >
                <span className="text-3xl font-bold tracking-tight text-foreground/80 sm:text-4xl">
                  {item}
                </span>
                <span
                  aria-hidden
                  className="h-2 w-2 shrink-0 rounded-full bg-accent"
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
