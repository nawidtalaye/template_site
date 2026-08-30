"use client";

import Counter from "@/components/motion/Counter";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { statistics, statisticsNote } from "@/lib/showcase-content";

export default function Statistics() {
  return (
    <section
      id="statistics"
      className="relative overflow-hidden bg-white py-20 lg:py-28"
      aria-labelledby="statistics-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="۰۵"
          eyebrow="آمار"
          title="اعدادی که تصویر کلی را نشان می‌دهند"
          lead="این بخش برای معرفی ظرفیت تیم و سامانه است؛ ارقام نهایی بعد از تأیید شما جایگزین می‌شود."
        />

        <Reveal
          className="mt-12 h-px w-full origin-right bg-gradient-to-l from-slate-300 via-slate-200 to-transparent"
          scaleX={0}
          y={0}
          duration={1400}
        />

        <dl className="mt-12 grid gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0">
          {statistics.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * 110}
              y={34}
              duration={900}
              className="border-t border-slate-200 pt-8 lg:border-t-0 lg:border-s lg:border-slate-200 lg:ps-10 lg:pt-0 first:lg:border-s-0 first:lg:ps-0"
            >
              <dd className="flex items-baseline gap-1">
                <span className="num text-[52px] font-black leading-none text-slate-900 sm:text-[64px] lg:text-[72px]">
                  <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </span>
              </dd>
              <dt className="mt-5 text-[15px] font-black text-slate-800">{stat.label}</dt>
              <p className="mt-2 max-w-[220px] text-[12.5px] leading-6 text-slate-500">{stat.note}</p>
            </Reveal>
          ))}
        </dl>

        <Reveal y={16} delay={200}>
          <p className="mt-14 border-t border-slate-200 pt-6 text-[11.5px] leading-6 text-slate-400">
            {statisticsNote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
