"use client";

import { Suspense, useId, useState, type FormEvent, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { inquiryOptions, siteConfig } from "@/lib/data";
import {
  formatInquiry,
  inquirySubject,
  parseInquiry,
  productCategories,
  validateInquiry,
  type Inquiry,
  type InquiryErrors,
} from "@/lib/inquiry";
import { buttonClasses } from "@/components/ui/button-link";
import { cn } from "@/lib/utils";

const FIELD_CLASS =
  "w-full rounded-2xl border bg-background/70 px-4 py-3.5 text-[15px] text-foreground outline-none transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-muted/70 hover:border-foreground/25 focus:border-accent focus:bg-background focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent)_18%,transparent)]";

const SELECT_STYLE = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23635e7d' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
};
const SELECT_CLASS = "appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-11";

function ErrorText({ id, error }: { id: string; error?: string }) {
  return (
    <AnimatePresence initial={false}>
      {error && (
        <motion.p
          id={id}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25 }}
          className="overflow-hidden pt-2 text-xs font-medium text-highlight"
        >
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

function Field({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-foreground">
        {label}
        {optional && <span className="ml-1.5 font-normal text-muted">(optional)</span>}
      </label>
      {children}
      <ErrorText id={`${id}-error`} error={error} />
    </div>
  );
}

function Select({
  id,
  name,
  options,
  defaultValue = "",
  placeholder = "Select…",
}: {
  id: string;
  name: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
  placeholder?: string;
}) {
  return (
    <select
      id={id}
      name={name}
      defaultValue={defaultValue}
      className={cn(FIELD_CLASS, SELECT_CLASS, "border-border")}
      style={SELECT_STYLE}
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

const toOptions = (values: string[]) => values.map((v) => ({ value: v, label: v }));
const packageOptions = inquiryOptions.packages.filter((p) => p.value !== "");

/** Pre-selects the package clicked on a pricing card (?package=growth). */
function PackageSelectFromQuery({ id }: { id: string }) {
  const requested = useSearchParams().get("package") ?? "";
  const known = packageOptions.some((p) => p.value === requested);
  return (
    <Select
      key={requested}
      id={id}
      name="package"
      options={packageOptions}
      defaultValue={known ? requested : ""}
      placeholder="Not sure yet"
    />
  );
}

/** Captures ?utm_source for lead-source reporting. */
function SourceFromQuery() {
  const source = useSearchParams().get("utm_source") ?? "";
  return <input type="hidden" name="source" value={source} />;
}

function ChipGroup({
  legend,
  name,
  options,
  error,
  errorId,
  onChange,
}: {
  legend: string;
  name: string;
  options: string[];
  error?: string;
  errorId: string;
  onChange?: () => void;
}) {
  return (
    <fieldset aria-describedby={error ? errorId : undefined}>
      <legend className="mb-3 block text-sm font-medium text-foreground">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <label key={opt} className="cursor-pointer">
            <input
              type="checkbox"
              name={name}
              value={opt}
              onChange={onChange}
              className="peer sr-only"
            />
            <span className="inline-flex min-h-10 items-center rounded-full border border-border px-4 py-2 text-sm text-foreground/85 transition-colors duration-200 hover:border-foreground/30 peer-checked:border-foreground peer-checked:bg-foreground peer-checked:text-background peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring">
              {opt}
            </span>
          </label>
        ))}
      </div>
      <ErrorText id={errorId} error={error} />
    </fieldset>
  );
}

function Section({ step, title, children }: { step: string; title: string; children: ReactNode }) {
  return (
    <div className="space-y-5 border-t border-border pt-7 first:border-t-0 first:pt-0">
      <p className="flex items-baseline gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
        <span className="font-display text-xl normal-case italic tracking-normal text-foreground/35">
          {step}
        </span>
        {title}
      </p>
      {children}
    </div>
  );
}

type Status = "idle" | "submitting" | "sent" | "fallback";

export function ContactForm() {
  const formId = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [started, setStarted] = useState(false);

  const id = (name: string) => `${formId}-${name}`;
  const clear = (name: keyof Inquiry) =>
    errors[name] && setErrors((prev) => ({ ...prev, [name]: undefined }));

  function text(name: keyof Inquiry, props: Record<string, unknown> = {}) {
    return {
      id: id(name),
      name,
      "aria-invalid": errors[name] ? true : undefined,
      "aria-describedby": errors[name] ? `${id(name)}-error` : undefined,
      onInput: () => clear(name),
      className: cn(FIELD_CLASS, errors[name] ? "border-highlight" : "border-border"),
      ...props,
    };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    const raw = {
      ...Object.fromEntries(fd.entries()),
      channels: fd.getAll("channels"),
      services: fd.getAll("services"),
      source:
        String(fd.get("source") ?? "") ||
        (document.referrer ? new URL(document.referrer).host : "direct"),
    };
    const inquiry = parseInquiry(raw);
    const nextErrors = validateInquiry(inquiry);
    setErrors(nextErrors);

    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      const el =
        document.getElementById(id(firstInvalid)) ??
        document.querySelector<HTMLInputElement>(`input[name="${firstInvalid}"]`);
      el?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...raw, company_url: fd.get("company_url") }),
      });
      if (res.ok) {
        setStatus("sent");
        return;
      }
      const body = await res.json().catch(() => ({}));
      if (body.errors) {
        setErrors(body.errors);
        setStatus("idle");
        return;
      }
    } catch {
      // Network failure: fall through to the email fallback.
    }

    // No mail service configured (or it failed): hand the full brief to the
    // visitor's email client so the inquiry still reaches the studio.
    window.location.assign(
      `mailto:${siteConfig.email}?subject=${encodeURIComponent(
        inquirySubject(inquiry),
      )}&body=${encodeURIComponent(formatInquiry(inquiry))}`,
    );
    setStatus("fallback");
  }

  if (status === "sent") {
    return (
      <div role="status" className="py-10 text-center">
        <CheckCircle2 aria-hidden className="mx-auto h-10 w-10 text-foreground" />
        <h2 className="mt-5 text-2xl font-bold tracking-tight">Thanks — your project is in.</h2>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted">
          I&apos;ll review the details and reply with next steps and a time for
          a consultation.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      onFocusCapture={() => !started && setStarted(true)}
      data-form-started={started || undefined}
      className="relative space-y-7"
      noValidate
      aria-label="Project inquiry"
    >
      <Section step="01" title="About you">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id={id("name")} label="Name" error={errors.name}>
            <input type="text" autoComplete="name" {...text("name")} />
          </Field>
          <Field id={id("company")} label="Company" optional>
            <input type="text" autoComplete="organization" {...text("company")} />
          </Field>
          <Field id={id("email")} label="Email" error={errors.email}>
            <input type="email" autoComplete="email" inputMode="email" {...text("email")} />
          </Field>
          <Field id={id("website")} label="Website" optional>
            <input
              type="url"
              inputMode="url"
              autoComplete="url"
              placeholder="https://"
              {...text("website")}
            />
          </Field>
        </div>
      </Section>

      <Section step="02" title="Your product">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id={id("product")} label="Product" error={errors.product}>
            <input type="text" placeholder="e.g. Plant protein powder" {...text("product")} />
          </Field>
          <Field id={id("category")} label="Product category" optional>
            <Select id={id("category")} name="category" options={toOptions(productCategories)} />
          </Field>
          <Field id={id("skus")} label="Number of SKUs" optional>
            <Select id={id("skus")} name="skus" options={toOptions(inquiryOptions.skus)} />
          </Field>
        </div>
        <ChipGroup
          legend="Where will it sell?"
          name="channels"
          options={inquiryOptions.channels}
          errorId={`${id("channels")}-error`}
        />
      </Section>

      <Section step="03" title="Scope">
        <ChipGroup
          legend="What do you need?"
          name="services"
          options={inquiryOptions.services}
          error={errors.services}
          errorId={`${id("services")}-error`}
          onChange={() => clear("services")}
        />
        <div className="grid gap-5 sm:grid-cols-3">
          <Field id={id("package")} label="Package" optional>
            {/* Search params are only known in the browser, so the
                prerendered HTML shows the plain select until hydration. */}
            <Suspense
              fallback={
                <Select id={id("package")} name="package" options={packageOptions} placeholder="Not sure yet" />
              }
            >
              <PackageSelectFromQuery id={id("package")} />
            </Suspense>
          </Field>
          <Field id={id("timeline")} label="Timeline" optional>
            <Select id={id("timeline")} name="timeline" options={toOptions(inquiryOptions.timelines)} />
          </Field>
          <Field id={id("budget")} label="Budget" optional>
            <Select id={id("budget")} name="budget" options={toOptions(inquiryOptions.budgets)} />
          </Field>
        </div>
      </Section>

      <Section step="04" title="Project details">
        <Field id={id("details")} label="Tell me about the project" error={errors.details}>
          <textarea
            rows={5}
            placeholder="Packaging structure, what exists today, launch goals — and a link to any files (Drive, Dropbox) if you have them."
            {...text("details")}
            className={cn(text("details").className, "resize-y")}
          />
        </Field>
      </Section>

      {/* Honeypot — hidden from people and assistive tech. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company URL
          <input type="text" name="company_url" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <Suspense fallback={null}>
        <SourceFromQuery />
      </Suspense>

      <div className="space-y-3 pt-1">
        <button
          type="submit"
          disabled={status === "submitting"}
          className={cn(buttonClasses("primary"), "w-full disabled:opacity-60 sm:w-auto")}
        >
          {status === "submitting" ? "Sending…" : "Start my project"}
          <ArrowRight aria-hidden className="h-4 w-4" />
        </button>
        <p role="status" className="text-xs text-muted">
          {status === "fallback"
            ? `Your email app should open with everything filled in. If it doesn't, email ${siteConfig.email}.`
            : "Your details are only used to reply to this inquiry."}
        </p>
      </div>
    </form>
  );
}
