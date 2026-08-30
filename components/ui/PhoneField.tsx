"use client";

import { useState } from "react";

import { useLeadState } from "@/components/LeadForm";
import { isValidPhone } from "@/lib/lead";

type PhoneFieldProps = {
  id: string;
  name?: string;
  placeholder: string;
  label: string;
  /** `dark` sits on the hero video, `light` on white cards. */
  tone?: "dark" | "light";
  className?: string;
};

/** The phone number field: one line, quiet by default, explicit when wrong. */
export default function PhoneField({
  id,
  name = "phone",
  placeholder,
  label,
  tone = "dark",
  className = "",
}: PhoneFieldProps) {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);
  const { error, pending } = useLeadState();

  const filled = value.trim().length > 0;
  const invalid = Boolean(error) || (touched && filled && !isValidPhone(value));
  const valid = filled && isValidPhone(value) && !error;
  const dark = tone === "dark";

  const surface = dark
    ? "border-white/25 bg-white/10 text-white placeholder:text-white/55 hover:border-white/40 focus:border-primary focus:bg-white/[0.14]"
    : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 hover:border-slate-300 focus:border-primary focus:bg-white";

  return (
    <div className={`relative flex-1 ${className}`}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        dir="ltr"
        required
        value={value}
        disabled={pending}
        aria-invalid={invalid || undefined}
        aria-describedby={`${id}-hint`}
        onChange={(event) => setValue(event.target.value)}
        onBlur={() => setTouched(true)}
        placeholder={placeholder}
        className={`w-full rounded-full border px-5 py-3.5 text-left text-[15px] font-medium outline-none transition-all duration-300 placeholder:text-right disabled:opacity-60 ${surface} ${
          invalid
            ? "!border-rose-400/80 ring-4 ring-rose-400/20"
            : valid
              ? "!border-emerald-400/70 ring-4 ring-emerald-400/15"
              : "ring-4 ring-transparent focus:ring-primary/20"
        }`}
      />
      <span
        id={`${id}-hint`}
        className={`pointer-events-none absolute -bottom-6 right-5 text-[11px] transition-opacity duration-200 ${
          invalid ? "text-rose-200 opacity-100" : "opacity-0"
        }`}
      >
        {invalid ? "شماره را با پیش‌شماره کامل وارد کنید" : ""}
      </span>
    </div>
  );
}
