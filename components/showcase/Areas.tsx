"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import Reveal from "@/components/motion/Reveal";
import { useInView } from "@/components/motion/useInView";
import { prefersReducedMotion } from "@/components/motion/useScrollVar";
import SectionHeading from "@/components/ui/SectionHeading";
import { areas, costExample, headings } from "@/lib/showcase-content";

/**
 * «شش بخشی که این سامانه هر روز مدیریت می‌کند»
 *
 * زبان طراحیِ همان بخشِ «نواتیک / خدمات منتخب — آنچه می‌سازیم» است: یک نوار
 * افقیِ بی‌وقفه از کارت‌های شماره‌دار که عکس واقعی هر بخش را نشان می‌دهند.
 * روی هر کارت فقط شماره، دسته و عنوان می‌نشیند — بدون توضیح اضافه، دقیقاً
 * به همان اندازه‌ی مینیمال. با هاور موس یا لمسِ گوشی، چرخش برای مکث و دیدنِ
 * بهتر متوقف می‌شود و با برداشتن دست دوباره از همان‌جا ادامه می‌یابد.
 */
export default function Areas() {
  const [sectionRef, inView] = useInView<HTMLDivElement>({ threshold: 0.15, once: false });
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const trackRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setReduced(prefersReducedMotion());
  }, []);

  // نوار را دوبار پشت‌سرهم می‌چینیم تا چرخش بدون درز و پرش دیده شود
  const loop = [...areas, ...areas];

  return (
    <section
      id="areas"
      className="relative overflow-hidden bg-white py-20 lg:py-28"
      aria-labelledby="areas-heading"
      ref={sectionRef}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          headingId="areas-heading"
          signature
          index="۰۲"
          eyebrow="نواتیک / نفت و گاز"
          titleLines={headings.areas}
          lead="شش بخشی که کل جریان کار یک شرکت سوختی را از قرارداد تا گزارش مدیریتی پوشش می‌دهند."
        />
      </div>

      {/* ---------------------------------------------------------- */}
      {/* نوار افقیِ کارت‌ها — بدون قاب کناری، تا لبه‌ی صفحه ادامه دارد */}
      {/* ---------------------------------------------------------- */}
      <Reveal y={36} duration={1000} className="mt-14 lg:mt-20">
        <div
          className="group/rail relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {/* پرده‌ی نرم دو سوی نوار، تا برش کارت‌ها لبه‌ی تیز نداشته باشد */}
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent sm:w-24"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent sm:w-24"
            aria-hidden="true"
          />

          <ul
            ref={trackRef}
            className="areas-track flex w-max list-none gap-5 px-5 sm:gap-6 sm:px-8"
            style={
              {
                animationPlayState: paused || reduced || !inView ? "paused" : "running",
              } as React.CSSProperties
            }
          >
            {loop.map((item, index) => (
              <li
                key={`${item.id}-${index}`}
                aria-hidden={index >= areas.length}
                className="group relative aspect-[3/4] w-[240px] shrink-0 overflow-hidden rounded-[22px] bg-slate-100 shadow-[0_18px_40px_-24px_rgba(15,23,42,0.35)] transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 sm:w-[280px] lg:w-[300px]"
              >
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  loading={index < 3 ? "eager" : "lazy"}
                  sizes="(min-width: 1024px) 300px, (min-width: 640px) 280px, 240px"
                  className="object-cover transition-transform duration-[1200ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                />

                {/* پرده‌ی رنگی نرم به‌جای مشکیِ خام — حس برند را نگه می‌دارد */}
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-slate-950/25 to-transparent"
                  aria-hidden="true"
                />

                <span
                  className="num absolute start-4 top-4 text-[13px] font-black text-white/90 [text-shadow:0_1px_10px_rgba(2,6,23,0.5)]"
                  aria-hidden="true"
                >
                  {item.number}
                </span>

                <div className="absolute inset-x-4 bottom-4">
                  <span className="block text-[11px] font-bold text-white/80 [text-shadow:0_1px_10px_rgba(2,6,23,0.5)]">
                    {item.kicker.split("،")[0].split(" و ")[0]}
                  </span>
                  <span className="mt-1 block text-[16px] font-black leading-[1.4] text-white [text-shadow:0_1px_12px_rgba(2,6,23,0.55)] sm:text-[18px]">
                    {item.title}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* ---------------------------------------------------------- */}
      {/* نمونه محاسبه — بدون قاب، فقط خطوط جداکننده                  */}
      {/* ---------------------------------------------------------- */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mt-24 border-t border-slate-200 pt-12 lg:mt-28">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <Reveal y={26}>
                <span className="flex items-center gap-3 text-[12px] font-bold text-primary-ink">
                  <span className="h-px w-9 bg-primary" aria-hidden="true" />
                  {costExample.eyebrow}
                </span>
                <h3 className="mt-4 text-[24px] font-black leading-[1.4] text-slate-900 sm:text-[30px]">
                  {costExample.title}
                </h3>
                <p className="mt-4 text-[14px] leading-8 text-slate-600">{costExample.description}</p>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal delay={140} y={30} duration={1000}>
                <ul className="border-y border-slate-100">
                  {costExample.rows.map((row, index) => (
                    <li
                      key={row.label}
                      className="flex items-baseline justify-between gap-6 py-4"
                      style={{ borderTop: index > 0 ? "1px solid rgb(241 245 249)" : undefined }}
                    >
                      <span className="text-[13.5px] text-slate-600">{row.label}</span>
                      <span className="flex items-baseline gap-2">
                        <span className="num text-[15px] font-black text-slate-900">{row.value}</span>
                        <span className="text-[10.5px] text-slate-400">{row.unit}</span>
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex items-baseline justify-between gap-6 border-t-2 border-primary pt-5">
                  <span className="text-[14.5px] font-black text-primary-ink">{costExample.total.label}</span>
                  <span className="flex items-baseline gap-2">
                    <span className="num text-[24px] font-black text-slate-900">{costExample.total.value}</span>
                    <span className="text-[11px] text-slate-500">{costExample.total.unit}</span>
                  </span>
                </div>

                <p className="mt-4 text-[11px] leading-6 text-slate-400">{costExample.caption}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
