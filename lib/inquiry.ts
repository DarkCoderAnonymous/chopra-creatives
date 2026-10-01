import { inquiryOptions } from "./data";

/** Shape of a project inquiry, shared by the form and the API route. */
export type Inquiry = {
  name: string;
  company: string;
  email: string;
  website: string;
  product: string;
  category: string;
  skus: string;
  channels: string[];
  services: string[];
  package: string;
  timeline: string;
  budget: string;
  details: string;
  /** Lead source: utm_source or referring host, captured client-side. */
  source: string;
};

export type InquiryErrors = Partial<Record<keyof Inquiry, string>>;

export const productCategories = [
  "Food & beverage",
  "Supplements & wellness",
  "Pet care",
  "Beauty & personal care",
  "Household & kitchen",
  "Other consumer product",
];

const str = (v: unknown, max = 500) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const list = (v: unknown, allowed: string[]) =>
  Array.isArray(v) ? v.filter((x): x is string => typeof x === "string" && allowed.includes(x)) : [];

/** Normalize untrusted input into an Inquiry, dropping unknown option values. */
export function parseInquiry(raw: Record<string, unknown>): Inquiry {
  return {
    name: str(raw.name, 120),
    company: str(raw.company, 160),
    email: str(raw.email, 200),
    website: str(raw.website, 300),
    product: str(raw.product, 200),
    category: productCategories.includes(str(raw.category)) ? str(raw.category) : "",
    skus: inquiryOptions.skus.includes(str(raw.skus)) ? str(raw.skus) : "",
    channels: list(raw.channels, inquiryOptions.channels),
    services: list(raw.services, inquiryOptions.services),
    package: inquiryOptions.packages.some((p) => p.value === str(raw.package)) ? str(raw.package) : "",
    timeline: inquiryOptions.timelines.includes(str(raw.timeline)) ? str(raw.timeline) : "",
    budget: inquiryOptions.budgets.includes(str(raw.budget)) ? str(raw.budget) : "",
    details: str(raw.details, 5000),
    source: str(raw.source, 200),
  };
}

export function validateInquiry(data: Inquiry): InquiryErrors {
  const errors: InquiryErrors = {};
  if (!data.name) errors.name = "Please add your name.";
  if (!data.email) errors.email = "Please add an email I can reply to.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "That email doesn't look quite right.";
  if (!data.product) errors.product = "Tell me which product this is for.";
  if (data.services.length === 0) errors.services = "Pick at least one thing you need.";
  if (!data.details) errors.details = "A few lines about the project helps me scope it.";
  return errors;
}

const packageLabel = (value: string) =>
  inquiryOptions.packages.find((p) => p.value === value)?.label ?? "Not sure yet";

/** Plain-text summary used for both the email body and the mailto fallback. */
export function formatInquiry(d: Inquiry) {
  const line = (label: string, value: string) => `${label}: ${value || "Not provided"}`;
  return [
    line("Name", d.name),
    line("Company", d.company),
    line("Email", d.email),
    line("Website", d.website),
    "",
    line("Product", d.product),
    line("Category", d.category),
    line("Number of SKUs", d.skus),
    line("Sales channels", d.channels.join(", ")),
    "",
    line("Needs", d.services.join(", ")),
    line("Package of interest", packageLabel(d.package)),
    line("Timeline", d.timeline),
    line("Budget", d.budget),
    "",
    "Project details:",
    d.details,
    "",
    line("Lead source", d.source),
  ].join("\n");
}

export const inquirySubject = (d: Inquiry) =>
  `New project inquiry: ${d.company || d.name}${d.product ? ` (${d.product})` : ""}`;
