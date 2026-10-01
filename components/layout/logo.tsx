import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Mark + single-line wordmark. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Chopra Creative — home"
      className={cn(
        "group flex items-center gap-2.5 text-foreground md:gap-3",
        className,
      )}
    >
      {/* Tightly cropped mark (no transparent padding), so it can sit at a
          size that balances the wordmark. */}
      <Image
        src="/images/brand/mark-tight.png"
        alt=""
        width={164}
        height={251}
        priority
        className="h-8 w-auto shrink-0 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-[10deg] group-hover:scale-105 md:h-10"
      />
      <span className="whitespace-nowrap text-[1.2rem] font-semibold leading-none tracking-[-0.025em] md:text-[1.5rem]">
        Chopra Creative
      </span>
    </Link>
  );
}
