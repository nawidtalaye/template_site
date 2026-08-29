/**
 * Builds the wa.me link that hands a lead to the visitor's own WhatsApp with
 * the message already written, addressed to the Novatech number.
 *
 * This is the client-side delivery route: the visitor presses send, so the
 * conversation starts from their real number. The server-side record in
 * `/api/contact` is what makes the lead survive if they never press it.
 */

export type WhatsappLeadFields = {
  name: string;
  phone: string;
  message?: string;
  source: string;
};

/** Digits only: wa.me rejects +, spaces and dashes. */
function normalise(raw: string): string {
  return raw.replace(/\D/g, "");
}

export function buildWhatsappLeadLink(
  destination: string,
  lead: WhatsappLeadFields
): string | null {
  const to = normalise(destination);
  if (!to) return null;

  const lines = [`سلام، درخواست مشاوره دارم.`, `نام: ${lead.name}`, `شماره: ${lead.phone}`];
  if (lead.message) lines.push(`پیام: ${lead.message}`);

  return `https://wa.me/${to}?text=${encodeURIComponent(lines.join("\n"))}`;
}
