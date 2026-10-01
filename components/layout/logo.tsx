import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "group flex items-center gap-2.5 text-foreground",
        className,
      )}
    >
      <Image
        src="/images/brand/mark.png"
        alt=""
        width={28}
        height={28}
        priority
        className="h-7 w-7 shrink-0 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-[14deg] group-hover:scale-110"
      />
      <span className="text-[1.05rem] font-semibold leading-none tracking-tight">
        Chopra{" "}
        <span className="font-display text-[1.2rem] italic text-muted transition-colors duration-300 group-hover:text-foreground">
          Creative
        </span>
      </span>
    </Link>
  );
}
