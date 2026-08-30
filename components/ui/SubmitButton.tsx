"use client";

import { ArrowLeft, LoaderCircle } from "lucide-react";

import { useLeadState } from "@/components/LeadForm";

type SubmitButtonProps = {
  label: string;
  pendingLabel?: string;
  doneLabel?: string;
  className?: string;
  variant?: "primary" | "dark";
};

/** Primary call to action of every lead form; reflects the form's own state. */
export default function SubmitButton({
  label,
  pendingLabel = "در حال ارسال",
  doneLabel,
  className = "",
  variant = "primary",
}: SubmitButtonProps) {
  const { pending, done } = useLeadState();

  const skin =
    variant === "primary"
      ? "bg-primary text-slate-900 hover:bg-primary-hover shadow-[0_14px_34px_-12px_rgba(84,220,198,0.7)]"
      : "bg-slate-900 text-white hover:bg-slate-800 shadow-[0_14px_34px_-14px_rgba(15,23,42,0.7)]";

  return (
    <button
      type="submit"
      disabled={pending}
      className={`group inline-flex shrink-0 items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-black transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0 ${skin} ${className}`}
    >
      {pending ? (
        <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
      ) : (
        <ArrowLeft
          className="size-4 transition-transform duration-300 group-hover:-translate-x-1"
          aria-hidden="true"
        />
      )}
      <span>{pending ? pendingLabel : done && doneLabel ? doneLabel : label}</span>
    </button>
  );
}
