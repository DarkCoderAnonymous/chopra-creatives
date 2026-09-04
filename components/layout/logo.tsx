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
        className="h-7 w-7 shrink-0 transition-transform duration-500 group-hover:rotate-[8deg]"
      />
      <span className="font-semibold tracking-tight text-[1.05rem] leading-none">
        Chopra <span className="text-muted font-medium">Creative</span>
      </span>
    </Link>
  );
}
