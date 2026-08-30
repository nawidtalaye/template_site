export type LeadPayload = {
  name: string;
  phone: string;
  message?: string;
  source: string;
};

export type LeadResult =
  | { ok: true; message: string }
  | { ok: false; message: string; field?: keyof LeadPayload };

/** Afghan mobile number, with 0, +93, or 93 prefix and Persian digits. */
const PHONE_RE = /^(?:(?:\+?93)?7\d{8}|07\d{8})$/;

/** True for a number the team can actually call back. Used by the forms too. */
export function isValidPhone(raw: string): boolean {
  return PHONE_RE.test(toLatinDigits(String(raw ?? "")).replace(/[\s\-()]/g, ""));
}

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";

export function toLatinDigits(input: string): string {
  return input.replace(/[۰-۹٠-٩]/g, (d) => {
    const p = PERSIAN_DIGITS.indexOf(d);
    return String(p >= 0 ? p : ARABIC_DIGITS.indexOf(d));
  });
}

export function validateLead(raw: unknown): LeadResult & { data?: LeadPayload } {
  if (typeof raw !== "object" || raw === null) {
    return { ok: false, message: "درخواست نامعتبر است." };
  }
  const body = raw as Record<string, unknown>;

  const name = String(body.name ?? "").trim();
  const phone = toLatinDigits(String(body.phone ?? "")).replace(/[\s\-()]/g, "");
  const message = String(body.message ?? "").trim();
  const source = String(body.source ?? "unknown").slice(0, 64);

  // Phone-only leads (the hero and the closing call to action) are valid:
  // the team calls the number back, so a name is optional.
  if (name.length > 0 && name.length < 3) {
    return { ok: false, message: "نام و نام خانوادگی را کامل وارد کنید.", field: "name" };
  }
  if (name.length > 120) {
    return { ok: false, message: "نام وارد شده بیش از حد طولانی است.", field: "name" };
  }
  if (!isValidPhone(phone)) {
    return { ok: false, message: "شماره تماس معتبر نیست.", field: "phone" };
  }
  if (message.length > 2000) {
    return { ok: false, message: "متن پیام بیش از حد طولانی است.", field: "message" };
  }

  return {
    ok: true,
    message: "درخواست شما ثبت شد. همکاران ما در اولین فرصت تماس می گیرند.",
    data: { name, phone, message: message || undefined, source },
  };
}
