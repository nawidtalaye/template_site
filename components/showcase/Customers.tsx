"use client";

import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import ClientMark from "@/components/ui/ClientMark";
import { customers } from "@/lib/showcase-content";

export default function Customers() {
  return (
    <section
      id="customers"
      className="relative overflow-hidden border-y border-slate-200/70 bg-slate-50/60 py-20 lg:py-24"
      aria-labelledby="customers-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index="۱۰" eyebrow={customers.eyebrow} title={customers.title} lead={customers.lead} headingId="customers-heading"
          signature />

        {/* نشان‌های انتزاعی — آماده جایگزینی با لوگوی واقعی */}
        <div className="mt-14 grid grid-cols-2 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {customers.marks.map((mark, index) => (
            <Reveal
              key={mark.name}
              delay={(index % 6) * 70}
              y={22}
              duration={800}
              className="group flex flex-col items-center gap-3 text-center"
            >
              <span className="text-slate-300 transition-all duration-500 group-hover:-translate-y-1 group-hover:text-primary-ink">
                <ClientMark index={index} monogram={mark.monogram} />
              </span>
              <span className="text-[12.5px] font-bold text-slate-500 transition-colors duration-300 group-hover:text-slate-800">
                {mark.name}
              </span>
              <span className="max-w-[150px] text-[11px] leading-5 text-slate-400">{mark.role}</span>
            </Reveal>
          ))}
        </div>

        {/* نقل‌قول */}
        <Reveal y={30} delay={120} className="mt-16">
          <blockquote className="border-r-2 border-primary pr-6 sm:pr-8">
            <p className="max-w-3xl text-[19px] font-bold leading-[1.8] text-slate-800 sm:text-[24px] sm:leading-[1.7]">
              «{customers.quote}»
            </p>
            <footer className="mt-4 text-[12.5px] font-medium text-slate-500">— {customers.quoteRole}</footer>
          </blockquote>
        </Reveal>

        <Reveal y={20} delay={200}>
          <ul className="mt-12 grid gap-x-8 gap-y-3 border-t border-slate-200 pt-8 sm:grid-cols-3">
            {customers.points.map((point) => (
              <li key={point} className="flex items-center gap-2 text-[13px] text-slate-600">
                <span className="h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
