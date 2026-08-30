"use client";

import { Check } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { showcaseContent } from "@/lib/showcase-content";

const gridColumns = "grid grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-[minmax(0,0.8fr)_1.1fr_1.1fr] md:items-start";

export default function Comparison() {
  const { comparison } = showcaseContent;

  return (
    <section id="comparison" className="bg-white py-20 lg:py-28" aria-labelledby="comparison-heading">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={comparison.eyebrow}
            title={comparison.title}
            description={comparison.subtitle}
            align="start"
          />
        </Reveal>

        <div className="mt-12">
          <div className={`hidden border-b border-slate-900 pb-3 md:grid ${gridColumns}`} aria-hidden="true">
            <span className="text-[11.5px] font-bold tracking-wide text-slate-500">موضوع</span>
            <span className="text-[11.5px] font-bold tracking-wide text-slate-500">{comparison.beforeLabel}</span>
            <span className="text-[11.5px] font-bold tracking-wide text-[#0f766e]">{comparison.afterLabel}</span>
          </div>

          <ul>
            {comparison.rows.map((row, index) => (
              <Reveal
                as="li"
                key={row.topic}
                delay={index * 60}
                className={`border-b border-slate-200 py-6 ${gridColumns}`}
              >
                <h3 className="text-[14.5px] font-bold text-slate-900">{row.topic}</h3>

                <div>
                  <span className="mb-1.5 block text-[11px] font-bold text-slate-400 md:hidden">
                    {comparison.beforeLabel}
                  </span>
                  <p className="text-[13.5px] leading-[1.95] text-slate-500">{row.before}</p>
                </div>

                <div>
                  <span className="mb-1.5 block text-[11px] font-bold text-[#0f766e] md:hidden">
                    {comparison.afterLabel}
                  </span>
                  <p className="flex items-start gap-2 text-[13.5px] font-medium leading-[1.95] text-slate-900">
                    <Check className="mt-1.5 size-4 shrink-0 text-[#0f766e]" aria-hidden="true" />
                    <span>{row.after}</span>
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
