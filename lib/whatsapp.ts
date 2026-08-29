import type { LeadPayload } from "@/lib/lead";

/**
 * WhatsApp delivery for contact-form leads, via the official WhatsApp Cloud API.
 *
 * Two shapes of message exist and only one of them works at any given moment:
 *
 * - A *template* message can be sent at any time, but the template must be
 *   approved in the WhatsApp Manager first and its variables may not contain
 *   newlines, tabs, or runs of spaces.
 * - A plain *text* message is only accepted inside the 24-hour window that
 *   opens when the recipient messages the business number.
 *
 * So a template is used whenever WHATSAPP_TEMPLATE_NAME is set, and plain text
 * otherwise. Everything is configured through the environment; no number,
 * token, or template name is hard-coded here.
 */

const GRAPH_VERSION = process.env.WHATSAPP_GRAPH_VERSION || "v25.0";
const TIMEOUT_MS = 10_000;

export function isWhatsappConfigured(): boolean {
  return Boolean(
    process.env.WHATSAPP_TO &&
      process.env.WHATSAPP_PHONE_NUMBER_ID &&
      process.env.WHATSAPP_ACCESS_TOKEN
  );
}

/** Digits only: the Cloud API wants the number without + or separators. */
function normalisePhone(raw: string): string {
  return raw.replace(/\D/g, "");
}

/** Multi-line body, used for plain text messages. */
export function formatLeadMessage(lead: LeadPayload, at: Date): string {
  const lines = [
    "درخواست تماس جدید - نواتیک",
    `نام: ${lead.name}`,
    `شماره: ${lead.phone}`,
  ];
  if (lead.message) lines.push(`پیام: ${lead.message}`);
  lines.push(`فرم: ${lead.source}`, `زمان: ${formatTime(at)}`);

  return lines.join("\n");
}

function formatTime(at: Date): string {
  return new Intl.DateTimeFormat("fa-AF", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Asia/Kabul",
  }).format(at);
}

/**
 * Template variables reject newlines and double spaces, so the same lead is
 * flattened into one line per variable.
 */
function templateParameters(lead: LeadPayload, at: Date): string[] {
  const clean = (value: string) => value.replace(/\s+/g, " ").trim();
  return [
    clean(lead.name),
    clean(lead.phone),
    clean(lead.message || "بدون پیام"),
    clean(`${lead.source} - ${formatTime(at)}`),
  ];
}

function buildBody(lead: LeadPayload, at: Date, to: string): Record<string, unknown> {
  const template = process.env.WHATSAPP_TEMPLATE_NAME;

  if (template) {
    return {
      messaging_product: "whatsapp",
      to,
      type: "template",
      template: {
        name: template,
        language: { code: process.env.WHATSAPP_TEMPLATE_LANG || "en_US" },
        components: [
          {
            type: "body",
            parameters: templateParameters(lead, at).map((text) => ({ type: "text", text })),
          },
        ],
      },
    };
  }

  return {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to,
    type: "text",
    text: { preview_url: false, body: formatLeadMessage(lead, at) },
  };
}

/**
 * Sends one lead. Throws when the Cloud API refuses it, so the caller can fall
 * back to another delivery route.
 */
export async function sendWhatsAppLead(lead: LeadPayload, at: Date): Promise<void> {
  const to = process.env.WHATSAPP_TO;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  if (!to || !phoneNumberId || !token) throw new Error("whatsapp not configured");

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(buildBody(lead, at, normalisePhone(to))),
        signal: controller.signal,
      }
    );
    if (!res.ok) {
      // The error body names the actual cause (expired token, unapproved
      // template, closed 24h window), so it is worth keeping in the log.
      const detail = await res.text();
      throw new Error(`whatsapp cloud api responded ${res.status}: ${detail.slice(0, 300)}`);
    }
  } finally {
    clearTimeout(timer);
  }
}
