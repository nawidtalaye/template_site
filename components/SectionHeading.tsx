import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  /** `start` keeps the text flush with the content column (right in RTL). */
  align?: "start" | "center";
  tone?: "dark" | "light";
  className?: string;
  children?: ReactNode;
};

const alignClass = {
  start: "text-right items-start",
  center: "text-center items-center mx-auto",
} as const;

/**
 * The one repeated heading pattern on the page. Deliberately plain — an
 * eyebrow rule, a headline, one supporting line — so the sections around it
 * carry the visual variety instead of the headings competing for attention.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "dark",
  className = "",
  children,
}: SectionHeadingProps) {
  const isLight = tone === "light";

  return (
    <div className={`flex flex-col gap-3 max-w-2xl ${alignClass[align]} ${className}`}>
      <span
        className={`flex items-center gap-2.5 text-[11px] font-bold tracking-wide ${
          align === "center" ? "justify-center" : ""
        } ${isLight ? "text-[#54dcc6]" : "text-[#0f766e]"}`}
      >
        {align === "start" ? null : <span className="h-px w-6 bg-current opacity-50" aria-hidden="true" />}
        {eyebrow}
        {align === "start" ? <span className="h-px w-8 bg-current opacity-40" aria-hidden="true" /> : null}
      </span>
      <h2
        className={`text-[24px] sm:text-[30px] lg:text-[34px] font-black leading-[1.35] ${
          isLight ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`text-[13.5px] sm:text-[15px] leading-[2] ${isLight ? "text-slate-300" : "text-slate-600"}`}>
          {description}
        </p>
      ) : null}
      {children}
    </div>
  );
}
