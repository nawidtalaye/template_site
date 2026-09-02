"use client";

import Image from "next/image";
import { useState } from "react";

import Reveal from "@/components/motion/Reveal";
import { useInView } from "@/components/motion/useInView";
import { prefersReducedMotion } from "@/components/motion/useScrollVar";
import CostCalculator from "@/components/showcase/CostCalculator";
import SectionHeading from "@/components/ui/SectionHeading";
import { areas, headings } from "@/lib/showcase-content";

/**
 * «شش بخشی که این سامانه هر روز مدیریت می‌کند»
 *
 * دقیقاً همان زبان بخش «نواتیک / خدمات منتخب — آنچه می‌سازیم»: نوار افقیِ
 * بی‌وقفه‌ای از کارت‌های شماره‌دار. لیست دو بار پشت‌سرهم چیده شده، پس هیچ
 * درزی دیده نمی‌شود — کارت از یک سو بیرون می‌رود درست همان لحظه که نسخه‌ی
 * دومش از سوی دیگر وارد می‌شود. با هاور موس، فوکوس کیبورد یا لمس گوشی مکث
 * می‌کند تا بشود کارت را درست خواند.
 */
export default function Areas() {
  const [sectionRef, inView] = useInView<HTMLDivElement>({ threshold: 0.1, once: false });
  const [paused, setPaused] = useState(false);

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
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent sm:w-24"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent sm:w-24"
            aria-hidden="true"
          />

          <ul
            className="areas-track flex w-max list-none"
            style={
              {
                animationPlayState: paused || !inView || prefersReducedMotion() ? "paused" : "running",
              } as React.CSSProperties
            }
          >
            {loop.map((item, index) => (
              <li
                key={`${item.id}-${index}`}
                aria-hidden={index >= areas.length}
                tabIndex={index >= areas.length ? -1 : 0}
                className="group relative me-5 aspect-[3/4] w-[240px] shrink-0 overflow-hidden rounded-[22px] bg-slate-100 shadow-[0_18px_40px_-24px_rgba(15,23,42,0.35)] transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 focus-visible:-translate-y-2 focus-visible:outline-none sm:me-6 sm:w-[280px] lg:w-[300px]"
              >
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  loading={index < 3 ? "eager" : "lazy"}
                  sizes="(min-width: 1024px) 300px, (min-width: 640px) 280px, 240px"
                  className="object-cover transition-transform duration-[1200ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                />

                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-slate-950/25 to-transparent"
                  aria-hidden="true"
                />

                <span
                  className="num absolute start-4 top-4 text-[14px] font-black text-white/90 [text-shadow:0_1px_10px_rgba(2,6,23,0.5)]"
                  aria-hidden="true"
                >
                  {item.number}
                </span>

                <div className="absolute inset-x-4 bottom-4">
                  <span className="block text-[12.5px] font-bold text-white/80 [text-shadow:0_1px_10px_rgba(2,6,23,0.5)]">
                    {item.kicker.split("،")[0].split(" و ")[0]}
                  </span>
                  <span className="mt-1 block text-[18px] font-black leading-[1.4] text-white [text-shadow:0_1px_12px_rgba(2,6,23,0.55)] sm:text-[20px]">
                    {item.title}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* ---------------------------------------------------------- */}
      {/* محاسبه دقیق — ماشین‌حساب بهای تمام‌شده                       */}
      {/* ---------------------------------------------------------- */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mt-24 border-t border-slate-200 pt-12 lg:mt-28">
          <CostCalculator />
        </div>
      </div>
    </section>
  );
}
