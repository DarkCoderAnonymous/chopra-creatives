import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { TextReveal } from "./text-reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <Eyebrow centered={align === "center"}>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <TextReveal
        text={title}
        delay={0.05}
        className="mt-4 text-[2.1rem] font-bold leading-[1.05] tracking-[-0.03em] sm:text-5xl"
      />
      {description && (
        <Reveal delay={0.25}>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}

export function Eyebrow({
  children,
  centered = false,
  className,
  as: Tag = "p",
}: {
  children: React.ReactNode;
  centered?: boolean;
  className?: string;
  as?: "p" | "h2" | "h3";
}) {
  return (
    <Tag
      className={cn(
        "flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted",
        centered && "justify-center",
        className,
      )}
    >
      <span
        aria-hidden
        className="h-px w-8 bg-[linear-gradient(90deg,var(--grad-b),var(--grad-e))]"
      />
      {children}
    </Tag>
  );
}
