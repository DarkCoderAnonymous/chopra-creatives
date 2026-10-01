import { formatInquiry, inquirySubject, parseInquiry, validateInquiry } from "@/lib/inquiry";

/**
 * Receives project inquiries and emails them via Resend
 * (https://resend.com). Configure in the hosting environment:
 *
 *   RESEND_API_KEY      API key
 *   INQUIRY_TO_EMAIL    where inquiries are delivered
 *   INQUIRY_FROM_EMAIL  a sender on a domain verified in Resend
 *
 * Without them the route answers 503 and the form falls back to
 * opening the visitor's email client, so no lead is lost.
 */
export async function POST(request: Request) {
  let raw: Record<string, unknown>;
  try {
    raw = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field.
  if (typeof raw.company_url === "string" && raw.company_url.length > 0) {
    return Response.json({ ok: true });
  }

  const inquiry = parseInquiry(raw);
  const errors = validateInquiry(inquiry);
  if (Object.keys(errors).length > 0) {
    return Response.json({ ok: false, errors }, { status: 422 });
  }

  const { RESEND_API_KEY, INQUIRY_TO_EMAIL, INQUIRY_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !INQUIRY_TO_EMAIL || !INQUIRY_FROM_EMAIL) {
    return Response.json({ ok: false, fallback: "mailto" }, { status: 503 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: INQUIRY_FROM_EMAIL,
      to: [INQUIRY_TO_EMAIL],
      reply_to: inquiry.email,
      subject: inquirySubject(inquiry),
      text: formatInquiry(inquiry),
    }),
  });

  if (!res.ok) {
    console.error("Inquiry email failed", res.status, await res.text().catch(() => ""));
    return Response.json({ ok: false, fallback: "mailto" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
