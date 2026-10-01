"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { buttonClasses } from "@/components/ui/button-link";
import { cn } from "@/lib/utils";

type FieldName = "name" | "email" | "message";
type Errors = Partial<Record<FieldName, string>>;

const FIELD_CLASS =
  "w-full rounded-2xl border bg-background/70 px-4 py-3.5 text-[15px] text-foreground outline-none transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-muted/70 hover:border-foreground/25 focus:border-accent focus:bg-background focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent)_18%,transparent)]";

function validate(data: FormData): Errors {
  const errors: Errors = {};
  if (!String(data.get("name") ?? "").trim()) errors.name = "Please add your name.";
  const email = String(data.get("email") ?? "").trim();
  if (!email) errors.email = "Please add an email we can reply to.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "That email doesn't look quite right.";
  if (!String(data.get("message") ?? "").trim())
    errors.message = "A line or two about the project helps us scope it.";
  return errors;
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-foreground">
        {label}
      </label>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, height: 0, y: -4 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -4 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden pt-2 text-xs font-medium text-highlight"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ContactForm() {
  const formId = useId();
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [errors, setErrors] = useState<Errors>({});

  const ids = {
    name: `${formId}-name`,
    email: `${formId}-email`,
    product: `${formId}-product`,
    message: `${formId}-message`,
  };

  function fieldProps(name: FieldName) {
    return {
      id: ids[name],
      name,
      "aria-invalid": errors[name] ? true : undefined,
      "aria-describedby": errors[name] ? `${ids[name]}-error` : undefined,
      onInput: () =>
        errors[name] && setErrors((prev) => ({ ...prev, [name]: undefined })),
      className: cn(FIELD_CLASS, errors[name] ? "border-highlight" : "border-border"),
    };
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const nextErrors = validate(data);
    setErrors(nextErrors);

    const firstInvalid = (Object.keys(nextErrors) as FieldName[])[0];
    if (firstInvalid) {
      document.getElementById(ids[firstInvalid])?.focus();
      return;
    }

    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const product = String(data.get("product") ?? "");
    const message = String(data.get("message") ?? "");

    const subject = `Packaging project — ${name || "New inquiry"}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Product / brand: ${product}`,
      "",
      message,
    ].join("\n");

    window.location.assign(
      `mailto:${siteConfig.email}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`,
    );

    setStatus("sent");
  }

  return (
    <form onSubmit={handleSubmit} className="relative space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={ids.name} label="Name" error={errors.name}>
          <input type="text" required autoComplete="name" {...fieldProps("name")} />
        </Field>
        <Field id={ids.email} label="Email" error={errors.email}>
          <input
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            {...fieldProps("email")}
          />
        </Field>
      </div>

      <Field id={ids.product} label="Product or brand">
        <input
          id={ids.product}
          name="product"
          type="text"
          className={cn(FIELD_CLASS, "border-border")}
        />
      </Field>

      <Field id={ids.message} label="Tell us about the project" error={errors.message}>
        <textarea
          rows={5}
          required
          placeholder="Packaging structure, timeline, number of SKUs — whatever you've got."
          {...fieldProps("message")}
          className={cn(fieldProps("message").className, "resize-none")}
        />
      </Field>

      <button type="submit" className={cn(buttonClasses("primary"), "w-full sm:w-auto")}>
        Send via email
        <Send
          className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
          aria-hidden
        />
      </button>

      <p role="status" className="text-xs text-muted">
        {status === "sent"
          ? "Opening your email client with the details filled in…"
          : `This opens your email client addressed to ${siteConfig.email}.`}
      </p>
    </form>
  );
}
