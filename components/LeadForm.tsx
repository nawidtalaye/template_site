"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";

import { buildWhatsappLeadLink } from "@/lib/whatsapp-link";

/** Novatech's WhatsApp number. Empty disables the hand-off entirely. */
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

type LeadFormProps = {
  /** Identifies which form on the site produced the lead. */
  source: string;
  className?: string;
  id?: string;
  children: ReactNode;
};

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "ok"; message: string; whatsappUrl?: string }
  | { kind: "error"; message: string };

/**
 * Wraps the hand-styled marketing forms so they actually submit.
 * Markup stays where it is; this only owns submission, state and the live region.
 */
export default function LeadForm({ source, className, id, children }: LeadFormProps) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const statusId = useId();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.kind === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus({ kind: "sending" });

    const lead = {
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      message: String(data.get("message") ?? ""),
    };
    const whatsappUrl = buildWhatsappLeadLink(WHATSAPP_NUMBER, {
      ...lead,
      message: lead.message || undefined,
      source,
    });

    // Popup blockers only allow a window opened directly from the click, so the
    // tab is claimed here and pointed at WhatsApp once the server replies.
    const whatsappTab = whatsappUrl ? window.open("", "_blank") : null;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...lead,
          company: data.get("company") ?? "",
          source,
        }),
      });
      const payload = (await response.json()) as { ok: boolean; message: string };

      if (response.ok && payload.ok) {
        if (whatsappUrl && whatsappTab && !whatsappTab.closed) {
          whatsappTab.location.href = whatsappUrl;
        }
        setStatus({
          kind: "ok",
          message: whatsappUrl
            ? "درخواست شما ثبت شد. برای پیگیری سریع تر، پیام واتساپ را ارسال کنید."
            : payload.message,
          // Offered as a link too, because a blocker can still eat the tab.
          whatsappUrl: whatsappUrl ?? undefined,
        });
        form.reset();
      } else {
        whatsappTab?.close();
        setStatus({ kind: "error", message: payload.message || "ارسال انجام نشد." });
      }
    } catch {
      whatsappTab?.close();
      setStatus({ kind: "error", message: "ارتباط با سرور برقرار نشد. اتصال خود را بررسی کنید." });
    }
  }

  return (
    <form
      id={id}
      className={className}
      onSubmit={handleSubmit}
      noValidate
      aria-describedby={statusId}
      aria-busy={status.kind === "sending"}
      data-pending={status.kind === "sending" ? "true" : undefined}
    >
      {children}

      {/* Honeypot: hidden from users and assistive tech, irresistible to bots. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute h-px w-px -m-px overflow-hidden border-0 p-0 opacity-0"
      />

      <p
        id={statusId}
        role="status"
        aria-live="polite"
        className={
          status.kind === "idle"
            ? "absolute h-px w-px -m-px overflow-hidden p-0"
            : `w-full text-sm leading-6 ${
                status.kind === "error"
                  ? "text-red-600"
                  : status.kind === "ok"
                    ? "text-emerald-600"
                    : "text-gray-500"
              }`
        }
      >
        {status.kind === "sending"
          ? "در حال ارسال..."
          : status.kind === "ok" || status.kind === "error"
            ? status.message
            : "\u00a0"}
        {status.kind === "ok" && status.whatsappUrl ? (
          <>
            {" "}
            <a
              href={status.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4"
            >
              ارسال در واتساپ
            </a>
          </>
        ) : null}
      </p>
    </form>
  );
}
