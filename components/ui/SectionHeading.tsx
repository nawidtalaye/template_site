import Image from "next/image";
import type { ReactNode } from "react";

import Reveal, { RevealLine } from "@/components/motion/Reveal";

type SectionHeadingProps = {
  /** Persian section number, e.g. "۰۲" — gives the page an editorial spine. */
  index: string;
  eyebrow: string;
  title?: ReactNode;
  lead?: string;
  tone?: "light" | "dark";
  className?: string;
  /** id اختیاری برای تیتر؛ هر بخش با aria-labelledby به همین id اشاره می‌کند. */
  headingId?: string;
  /** Splits the headline into masked lines that rise into place. */
  titleLines?: string[];
  /** امضای دست‌نویس برند — همان نشانه‌ای که نواتیک زیر عنوان بخش‌ها می‌گذارد. */
  signature?: boolean;
};

export default function SectionHeading({
  index,
  eyebrow,
  title,
  lead,
  tone = "light",
  className = "",
  headingId,
  titleLines,
  signature = false,
}: SectionHeadingProps) {
  const dark = tone === "dark";

  return (
    <Reveal
      className={`flex flex-col gap-6 border-b pb-8 lg:flex-row lg:items-end lg:justify-between ${
        dark ? "border-white/10" : "border-slate-200/80"
      } ${className}`}
      y={24}
    >
      <div className="max-w-2xl">
        <span
          className={`flex items-center gap-3 text-[12px] font-bold ${
            dark ? "text-primary" : "text-primary-ink"
          }`}
        >
          <span className="h-px w-9 bg-primary" aria-hidden="true" />
          <span className="num">{index}</span>
          <span className="h-px w-9 bg-primary/40" aria-hidden="true" />
          <span>{eyebrow}</span>
        </span>
        {titleLines ? (
          <h2
            id={headingId}
            className={`mt-4 text-[26px] font-black leading-[1.4] sm:text-[32px] lg:text-[38px] ${
              dark ? "text-white" : "text-slate-900"
            }`}
          >
            {titleLines.map((line, i) => (
              <RevealLine key={line} delay={120 + i * 110}>
                {line}
              </RevealLine>
            ))}
          </h2>
        ) : (
          <h2
            id={headingId}
            className={`mt-4 text-[26px] font-black leading-[1.4] sm:text-[32px] lg:text-[38px] ${
              dark ? "text-white" : "text-slate-900"
            }`}
          >
            {title}
          </h2>
        )}

        {signature && !dark ? (
          <Image
            src="/images/signature.jpg"
            alt=""
            width={129}
            height={19}
            aria-hidden="true"
            className="mt-5 h-[19px] w-[129px] object-contain opacity-70"
          />
        ) : null}
      </div>
      {lead ? (
        <p
          className={`max-w-md text-[13px] leading-7 sm:text-sm lg:text-left ${
            dark ? "text-slate-400" : "text-slate-500"
          }`}
        >
          {lead}
        </p>
      ) : null}
    </Reveal>
  );
}
