"use client";

import { createContext, useContext, useId, useRef, useState, type FormEvent, type ReactNode } from "react";

import { isValidPhone } from "@/lib/lead";
import { buildWhatsappLeadLink } from "@/lib/whatsapp-link";

/** Novatech's WhatsApp number. Empty disables the hand-off entirely. */
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

type LeadFormProps = {
  /** Identifies which form on the site produced the lead. */
  source: string;
  className?: string;
  id?: string;
  /** `children` is a render prop so inputs can show the live error state. */
  children: (state: { pending: boolean; error: string | null; done: boolean }) => ReactNode;
};

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "ok"; message: string; whatsappUrl?: string }
  | { kind: "error"; message: string };

type LeadState = { pending: boolean; error: string | null; done: boolean };

const LeadStateContext = createContext<LeadState>({ pending: false, error: null, done: false });

/** Lets the phone field react to the form's validation and submission state. */
export function useLeadState(): LeadState {
  return useContext(LeadStateContext);
}

/**
 * Owns submission, validation and the live region for every lead form.
 * The markup is written by the sections themselves; this only wires it up.
 */
export default function LeadForm({ source, className, id, children }: LeadFormProps) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const statusId = useId();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.kind === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const phone = String(data.get("phone") ?? "").trim();

    // Client-side check first: it keeps an obviously wrong number off the wire
    // and lets the input show its invalid state immediately.
    if (!isValidPhone(phone)) {
      setStatus({ kind: "error", message: "شماره تماس را به صورت کامل وارد کنید؛ مثال: ۰۷۰۲۰۰۸۴۵۴" });
      form.querySelector<HTMLInputElement>("input[name='phone']")?.focus();
      return;
    }

    setStatus({ kind: "sending" });

    const lead = {
      name: String(data.get("name") ?? "").trim(),
      phone,
      message: String(data.get("message") ?? "").trim(),
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
          name: lead.name || "درخواست تماس",
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
            ? "درخواست شما ثبت شد. برای پیگیری سریع‌تر، پیام واتساپ را ارسال کنید."
            : payload.message,
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

  const state: LeadState = {
    pending: status.kind === "sending",
    error: status.kind === "error" ? status.message : null,
    done: status.kind === "ok",
  };

  return (
    <LeadStateContext.Provider value={state}>
      <form
        id={id}
        className={className}
        onSubmit={handleSubmit}
        noValidate
        aria-describedby={statusId}
        aria-busy={state.pending}
      >
        {children(state)}

        {/* Honeypot: hidden from users and assistive tech, irresistible to bots. */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute size-px -m-px overflow-hidden border-0 p-0 opacity-0"
        />

        <p
          id={statusId}
          role="status"
          aria-live="polite"
          className={
            status.kind === "idle"
              ? "absolute size-px -m-px overflow-hidden p-0"
              : `mt-3 w-full text-[12px] leading-6 ${
                  status.kind === "error"
                    ? "text-rose-200 sm:text-rose-600"
                    : status.kind === "ok"
                      ? "text-emerald-200 sm:text-emerald-600"
                      : "text-white/70 sm:text-slate-500"
                }`
          }
        >
          {status.kind === "sending"
            ? "در حال ارسال…"
            : status.kind === "ok" || status.kind === "error"
              ? status.message
              : " "}
          {status.kind === "ok" && status.whatsappUrl ? (
            <>
              {" "}
              <a
                href={status.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline underline-offset-4"
              >
                ارسال در واتساپ
              </a>
            </>
          ) : null}
        </p>
      </form>
    </LeadStateContext.Provider>
  );
}
