"use client";

import { useId, useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { siteConfig } from "@/lib/data";

export function ContactForm() {
  const formId = useId();
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
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

    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    setStatus("sent");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor={`${formId}-name`}
            className="mb-2 block text-sm font-medium text-foreground"
          >
            Name
          </label>
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            required
            autoComplete="name"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <div>
          <label
            htmlFor={`${formId}-email`}
            className="mb-2 block text-sm font-medium text-foreground"
          >
            Email
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor={`${formId}-product`}
          className="mb-2 block text-sm font-medium text-foreground"
        >
          Product or brand
        </label>
        <input
          id={`${formId}-product`}
          name="product"
          type="text"
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      <div>
        <label
          htmlFor={`${formId}-message`}
          className="mb-2 block text-sm font-medium text-foreground"
        >
          Tell us about the project
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={5}
          required
          placeholder="Packaging structure, timeline, number of SKUs — whatever you've got."
          className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.01] active:scale-[0.99] sm:w-auto"
      >
        Send via email
        <Send className="h-4 w-4" aria-hidden />
      </button>

      <p role="status" className="text-xs text-muted">
        {status === "sent"
          ? "Opening your email client with the details filled in…"
          : `This opens your email client addressed to ${siteConfig.email}.`}
      </p>
    </form>
  );
}
