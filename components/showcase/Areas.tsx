"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import Parallax from "@/components/motion/Parallax";
import Reveal from "@/components/motion/Reveal";
import { useInView } from "@/components/motion/useInView";
import { prefersReducedMotion } from "@/components/motion/useScrollVar";
import SectionHeading from "@/components/ui/SectionHeading";
import { mockViews } from "@/components/ui/mockups/views";
import { toPersianDigits } from "@/lib/format";
import { areas, costExample, headings } from "@/lib/showcase-content";
import type { AreaItem } from "@/lib/showcase-content";

const AUTOPLAY_MS = 7000;

/**
 * «آنچه می‌سازیم»
 *
 * همان زبانِ بخشِ خدمات نخبه‌ی نواتیک است: یک صحنه بزرگ و یک فهرست شماره‌دار که
 * با انتخاب هر بخش جابه‌جا می‌شود. ردیفِ فعال با اندازه، رنگ و توضیحِ بازِ نرم
 * خودش را نشان می‌دهد؛ بقیه با فاصله و وزنِ کمتر کنار می‌نشینند. تصویر با ماسکِ
 * نرم عوض می‌شود و همزمان یک شمارنده «۰۱ / ۰۶» و خطِ پیشرفت روی صحنه به‌روز
 * می‌شود.
 */
export default function Areas() {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [taken, setTaken] = useState(false);
  const [sectionRef, inView] = useInView<HTMLDivElement>({ threshold: 0.2, once: false });
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  const area = areas[active];
  const Fragment = area.mock ? mockViews[area.mock] : null;

  const select = useCallback((index: number) => {
    setActive(index);
    setTaken(true);
  }, []);

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const keys = ["ArrowDown", "ArrowUp", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const last = areas.length - 1;
    const next =
      event.key === "ArrowDown"
        ? (index + 1) % areas.length
        : event.key === "ArrowUp"
          ? (index - 1 + areas.length) % areas.length
          : event.key === "Home"
            ? 0
            : last;
    select(next);
    buttons.current[next]?.focus();
  };

  // چرخشِ آرام فقط وقتی بخش در دید است و کاربر خودش کنترل را نگرفته باشد
  useEffect(() => {
    if (taken || hovering || !inView) return;
    if (prefersReducedMotion()) return;
    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % areas.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [taken, hovering, inView]);

  return (
    <section
      id="areas"
      className="relative bg-white py-20 lg:py-28"
      aria-labelledby="areas-heading"
      ref={sectionRef}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          headingId="areas-heading"
          signature
          index="۰۲"
          eyebrow="نواتیک / خدمات منتخب"
          titleLines={headings.areas}
          lead="روی هر بخش بایستید تا تصویر، توضیح و رابط نمونه‌ی همان حوزه را ببینید؛ این شش بخش، کل جریان کار یک شرکت سوختی را پوشش می‌دهد."
        />

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-14">
          {/* ---------------------------------------------------------- */}
          {/* فهرست بخش‌ها — در RTL سمت راست                             */}
          {/* ---------------------------------------------------------- */}
          <div className="lg:col-span-5">
            <Reveal y={24}>
              <div
                role="tablist"
                aria-label="بخش‌های اصلی سامانه"
                aria-orientation="vertical"
                className="border-t border-slate-200"
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
              >
                {areas.map((item: AreaItem, index) => {
                  const isActive = index === active;
                  return (
                    <button
                      key={item.id}
                      ref={(node) => {
                        buttons.current[index] = node;
                      }}
                      type="button"
                      role="tab"
                      id={`area-tab-${item.id}`}
                      aria-selected={isActive}
                      aria-controls="area-stage"
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => select(index)}
                      onMouseEnter={() => setActive(index)}
                      onFocus={() => setActive(index)}
                      onKeyDown={(event) => onKeyDown(event, index)}
                      className="block w-full border-b border-slate-200 py-6 text-right outline-none transition-colors duration-500"
                    >
                      <span className="flex items-baseline gap-4">
                        <span
                          className={`num shrink-0 text-[12px] font-bold transition-colors duration-500 ${
                            isActive ? "text-primary-ink" : "text-slate-300"
                          }`}
                        >
                          {item.number}
                        </span>

                        <span
                          className={`min-w-0 flex-1 origin-right font-black leading-[1.45] transition-[transform,color,opacity] duration-[600ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
                            isActive
                              ? "translate-x-0 scale-100 text-slate-900 opacity-100"
                              : "-translate-x-1.5 scale-[0.93] text-slate-400 opacity-90"
                          } text-[18px] sm:text-[21px] lg:text-[24px]`}
                        >
                          {item.title}
                        </span>
                      </span>

                      {/* توضیحِ ردیفِ فعال — با grid برای باز شدن نرم */}
                      <span
                        className="grid ps-8 transition-[grid-template-rows,opacity] duration-[600ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
                        style={{
                          gridTemplateRows: isActive ? "1fr" : "0fr",
                          opacity: isActive ? 1 : 0,
                        }}
                      >
                        <span className="overflow-hidden">
                          <span className="block pt-3">
                            <span className="block text-[12px] font-bold text-primary-ink">{item.kicker}</span>
                            <span className="mt-2 block text-[13.5px] leading-7 text-slate-500">{item.summary}</span>

                            <span className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-1.5">
                              {item.points.map((point) => (
                                <span
                                  key={point}
                                  className="flex items-center gap-1.5 text-[12px] font-medium text-slate-600"
                                >
                                  <span className="h-1 w-1 rounded-full bg-primary" aria-hidden="true" />
                                  {point}
                                </span>
                              ))}
                            </span>

                            <span className="mt-4 flex items-baseline gap-2 border-t border-slate-100 pt-3">
                              <span className="text-[11.5px] text-slate-400">{item.stat.label}</span>
                              <span className="num text-[13px] font-black text-slate-800">{item.stat.value}</span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </Reveal>
          </div>

          {/* ---------------------------------------------------------- */}
          {/* صحنه — تصویر بزرگ + قطعه‌ای از رابط نرم‌افزار              */}
          {/* در موبایل صحنه بالاتر از فهرست می‌آید                      */}
          {/* ---------------------------------------------------------- */}
          <div className="order-first lg:order-none lg:col-span-7">
            <div
              id="area-stage"
              role="tabpanel"
              aria-labelledby={`area-tab-${area.id}`}
              className="relative lg:sticky lg:top-28"
            >
              <Reveal y={40} duration={1100}>
                <Parallax distance={-24}>
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[26px] bg-slate-100 sm:aspect-[16/11]">
                    {areas.map((item, index) => (
                      <div
                        key={item.id}
                        aria-hidden={index !== active}
                        className={`absolute inset-0 transition-[opacity,transform,clip-path] duration-[900ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
                          index === active
                            ? "scale-100 opacity-100 [clip-path:inset(0%_0%_0%_0%)]"
                            : "scale-[1.04] opacity-0 [clip-path:inset(0%_0%_12%_0%)]"
                        }`}
                      >
                        <Image
                          src={item.image}
                          alt={item.imageAlt}
                          fill
                          priority={index === 0}
                          sizes="(min-width: 1024px) 55vw, 92vw"
                          className="object-cover"
                        />
                      </div>
                    ))}

                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent"
                      aria-hidden="true"
                    />

                    <span
                      className="absolute left-5 top-4 flex items-center gap-2 rounded-full bg-slate-950/60 px-3 py-1.5 text-white backdrop-blur-sm [text-shadow:0_1px_12px_rgba(2,6,23,0.6)]"
                      aria-hidden="true"
                    >
                      <span className="num text-[12px] font-black">{area.number}</span>
                      <span className="h-3 w-px bg-white/25" />
                      <span className="num text-[11px] font-bold text-white/75">{toPersianDigits(areas.length)}</span>
                    </span>

                    <span className="absolute bottom-6 right-5 flex items-center gap-2.5 text-[12px] font-bold text-white [text-shadow:0_1px_12px_rgba(2,6,23,0.6)]">
                      <span className="h-px w-6 bg-primary" aria-hidden="true" />
                      {area.caption}
                    </span>

                    {/* خط پیشرفتِ صحنه — با تغییر بخش، آرام پر می‌شود */}
                    <span className="absolute inset-x-5 bottom-4 block h-px overflow-hidden bg-white/20" aria-hidden="true">
                      <span
                        className="block h-full origin-right bg-primary transition-transform duration-[900ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
                        style={{ transform: `scaleX(${(active + 1) / areas.length})` }}
                      />
                    </span>
                  </div>
                </Parallax>
              </Reveal>

              {/* قطعه رابط نرم‌افزار — روی لبه تصویر (فقط دسکتاپ) */}
              {Fragment ? (
                <div
                  className="pointer-events-none absolute bottom-[-12%] left-3 hidden w-[54%] max-w-[360px] lg:block"
                  aria-hidden="true"
                >
                  {areas.map(
                    (item, index) =>
                      item.mock && (
                        <div
                          key={item.id}
                          className={`absolute inset-x-0 bottom-0 origin-bottom transition-[opacity,transform] duration-[800ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
                            index === active
                              ? "translate-y-0 opacity-100"
                              : "pointer-events-none translate-y-5 opacity-0"
                          }`}
                        >
                          <div className="[perspective:1600px]">
                            <div className="[transform:rotateY(-7deg)_rotateX(3deg)] [transform-style:preserve-3d]">
                              {(() => {
                                const Mock = mockViews[item.mock];
                                return <Mock compact />;
                              })()}
                            </div>
                          </div>
                        </div>
                      ),
                  )}
                </div>
              ) : null}

              {/* همان قطعه در موبایل، زیر تصویر */}
              {Fragment ? (
                <div key={`${area.id}-fragment-mobile`} className="mt-6 lg:hidden">
                  <Fragment compact />
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------- */}
        {/* نمونه محاسبه — بدون قاب، فقط خطوط جداکننده                  */}
        {/* ---------------------------------------------------------- */}
        <div className="mt-24 border-t border-slate-200 pt-12 lg:mt-32">
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
