"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import Reveal from "@/components/motion/Reveal";
import { prefersReducedMotion, rangeProgress, useScrollVar } from "@/components/motion/useScrollVar";
import CostCalculator from "@/components/showcase/CostCalculator";
import SectionHeading from "@/components/ui/SectionHeading";
import { areas, headings } from "@/lib/showcase-content";

/**
 * «شش بخشی که این سامانه هر روز مدیریت می‌کند»
 *
 * نوار افقی به اسکرول خود صفحه گره خورده است: با پایین آمدن کاربر، کارت‌ها
 * از یک سو وارد و به‌آرامی به سوی دیگر می‌روند — اما حرکت محدود است؛ کارت
 * اول از لبه شروع می‌کند و کارت آخر دقیقاً در لبه مقابل می‌ایستد. بنابراین
 * هیچ لحظه‌ای وجود ندارد که محتوا «از صفحه بیرون رفته» به نظر برسد.
 * روی موبایل و در حالت کاهش حرکت، همان نوار با لمس ورق می‌خورد.
 */
export default function Areas() {
  /** پیشرفت عبور بخش از دید (۰ تا ۱) — روی --p نوشته می‌شود */
  const railRef = useScrollVar<HTMLDivElement>(rangeProgress(0.95, 0.12));
  const trackRef = useRef<HTMLUListElement>(null);
  const [overflow, setOverflow] = useState(0);
  const [linked, setLinked] = useState(false);

  // فقط روی صفحه‌های بزرگ و بدون «کاهش حرکت»، نوار به اسکرول صفحه وصل می‌شود
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setLinked(query.matches && !prefersReducedMotion());
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // اندازه اضافه‌ی نوار نسبت به قاب — دامنه حرکت همین است و نه بیشتر
  useEffect(() => {
    const rail = railRef.current;
    const track = trackRef.current;
    if (!rail || !track) return;

    const measure = () => setOverflow(Math.max(0, track.scrollWidth - rail.clientWidth));
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(rail);
    observer.observe(track);
    return () => observer.disconnect();
  }, [railRef, linked]);

  return (
    <section
      id="areas"
      className="relative overflow-hidden bg-white py-20 lg:py-28"
      aria-labelledby="areas-heading"
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
      {/* نوار افقی کارت‌ها — حرکتِ محدود و گره‌خورده به اسکرول صفحه   */}
      {/* ---------------------------------------------------------- */}
      <Reveal y={36} duration={1000} className="mt-14 lg:mt-20">
        <div
          ref={railRef}
          className={`relative ${
            linked ? "overflow-hidden" : "snap-x snap-mandatory overflow-x-auto no-scrollbar scroll-px-5 sm:scroll-px-8"
          }`}
          style={{ "--rail-overflow": `${overflow}px` } as React.CSSProperties}
        >
          {/* پرده‌ی نرم دو سوی نوار، تا برش کارت‌ها لبه‌ی تیز نداشته باشد */}
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-10 bg-gradient-to-l from-white to-transparent lg:block sm:w-24"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-10 bg-gradient-to-r from-white to-transparent lg:block sm:w-24"
            aria-hidden="true"
          />

          <ul
            ref={trackRef}
            className="flex w-max list-none gap-5 px-5 pb-10 pt-3 sm:gap-6 sm:px-8"
            style={
              linked
                ? { transform: "translate3d(calc(var(--p, 0) * var(--rail-overflow, 0px)), 0, 0)" }
                : undefined
            }
          >
            {areas.map((item, index) => (
              <li
                key={item.id}
                className="group relative aspect-[3/4] w-[240px] shrink-0 snap-start overflow-hidden rounded-[22px] bg-slate-100 shadow-[0_18px_40px_-24px_rgba(15,23,42,0.35)] transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 sm:w-[280px] lg:w-[300px]"
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

          {/* خط پیشرفت — نشان می‌دهد نوار تا کجای مسیرش رفته است */}
          {linked ? (
            <div className="mx-5 mt-2 h-px bg-slate-200 sm:mx-8" aria-hidden="true">
              <div
                className="h-px origin-right bg-primary"
                style={{ transform: "scaleX(var(--p, 0))" }}
              />
            </div>
          ) : null}
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
