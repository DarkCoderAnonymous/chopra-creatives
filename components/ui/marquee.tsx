import { cn } from "@/lib/utils";

export function Marquee({
  items,
  className,
}: {
  items: { primary: string; secondary: string }[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className,
      )}
    >
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {[0, 1].map((rep) => (
          <ul
            key={rep}
            aria-hidden={rep === 1}
            className="flex shrink-0 items-center"
          >
            {items.map((item, i) => (
              <li
                key={`${rep}-${i}`}
                className="flex shrink-0 items-center gap-10 pr-10"
              >
                <span className="flex items-baseline gap-4 whitespace-nowrap">
                  <span className="text-4xl font-bold tracking-[-0.03em] text-foreground sm:text-6xl">
                    {item.primary}
                  </span>
                  <span className="font-display text-3xl italic text-outline sm:text-5xl">
                    {item.secondary}
                  </span>
                </span>
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="h-5 w-5 shrink-0 text-[var(--grad-b)] sm:h-6 sm:w-6"
                >
                  <path
                    fill="currentColor"
                    d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z"
                  />
                </svg>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
