"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import Reveal from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";
import SectionHeading from "@/components/ui/SectionHeading";
import { toPersianDigits } from "@/lib/format";
import { industry, media } from "@/lib/showcase-content";

const TOTAL = toPersianDigits(String(industry.items.length).padStart(2, "0"));

/**
 * «ساخته شده برای صنعت نفت و گاز»
 *
 * با همان زبان ساختاری بخش «کاری که برای برند شما می‌کنیم / سه مسیر» نواتیک:
 * فهرست موضوع‌ها با تایپوگرافی بزرگ در یک ستون جلو می‌رود و تصویرِ هر موضوع
 * در قابِ چسبان کنارش عوض می‌شود؛ شمارنده «۰۱ / ۰۸» مسیر را نشان می‌دهد.
 * موضوعِ فعال روشن است و بقیه کم‌رنگ؛ اسکرول صفحه خودش راوی است.
 */
export default function Industry() {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  // هر موضوع وقتی به میانه دید می‌رسد، تصویرِ صحنه را عوض می‌کند
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.index ?? 0));
          }
        }
      },
      { rootMargin: "-42% 0px -48% 0px", threshold: 0 },
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const current = industry.items[active];

  return (
    <section
      id="industry"
      className="relative isolate overflow-hidden bg-slate-950 py-20 text-white lg:py-28"
      aria-labelledby="industry-heading"
    >
      {/* پس‌زمینه: تصویر صنعتی با حرکت بسیار آرام */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <Parallax distance={-40} scale={0.04} className="absolute inset-0">
          <Image
            src={media.industryWide}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-[0.22] grayscale-[0.2]"
          />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/85 to-slate-950" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          headingId="industry-heading"
          index="۰۴"
          eyebrow={industry.eyebrow}
          title={industry.title}
          lead={industry.lead}
          tone="dark"
        />

        {/* زنجیره حرکت محموله */}
        <Reveal y={28} delay={80} className="mt-14 lg:mt-20">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-[12px] font-bold text-primary">{industry.flowCaption}</span>
              <span className="text-[11px] text-white/40">هر مرحله مستند خودش را دارد</span>
            </div>

            <ol className="mt-7 flex flex-col gap-6 sm:flex-row sm:gap-0">
              {industry.flow.map((node, index) => (
                <li key={node.label} className="flex-1">
                  <div className="flex items-center gap-3">
                    <span
                      className="flex size-2.5 shrink-0 rounded-full bg-primary shadow-[0_0_0_4px_rgba(84,220,198,0.15)]"
                      aria-hidden="true"
                    />
                    {index < industry.flow.length - 1 ? (
                      <span className="flow-rail h-px flex-1" aria-hidden="true" />
                    ) : null}
                  </div>
                  <div className="mt-4 sm:pe-5">
                    <div className="text-[13.5px] font-black text-white">{node.label}</div>
                    <div className="mt-1 text-[11.5px] leading-5 text-white/50">{node.note}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        {/* ---------------------------------------------------------- */}
        {/* هشت حوزه — فهرستِ روایی + صحنه‌ی چسبان                       */}
        {/* ---------------------------------------------------------- */}
        <div className="mt-20 grid gap-10 lg:mt-28 lg:grid-cols-12 lg:gap-16">
          {/* فهرست موضوع‌ها */}
          <div className="lg:col-span-6">
            <ol className="list-none">
              {industry.items.map((item, index) => {
                const isActive = index === active;
                return (
                  <li
                    key={item.number}
                    data-index={index}
                    ref={(el) => {
                      itemRefs.current[index] = el;
                    }}
                    className={`border-t border-white/10 py-9 transition-opacity duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] lg:py-12 ${
                      isActive ? "opacity-100" : "lg:opacity-35"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="num text-[12px] font-black text-primary">{item.number}</span>
                      <span className="num text-[11px] text-white/35">/ {TOTAL}</span>
                      <span
                        className={`h-px flex-1 origin-right bg-primary/50 transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
                          isActive ? "scale-x-100" : "scale-x-0"
                        }`}
                        aria-hidden="true"
                      />
                    </div>
                    <h3
                      className={`mt-4 text-[22px] font-black leading-[1.4] transition-colors duration-500 sm:text-[26px] lg:text-[30px] ${
                        isActive ? "text-white" : "text-white/85"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-lg text-[13.5px] leading-8 text-white/55">{item.text}</p>

                    {/* تصویر همان موضوع — فقط در موبایل، داخل خود روایت */}
                    <figure className="relative mt-6 aspect-[16/10] overflow-hidden rounded-[18px] lg:hidden">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        sizes="92vw"
                        className="object-cover"
                      />
                      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 to-transparent px-4 py-3 text-[11.5px] font-bold text-white">
                        {item.caption}
                      </figcaption>
                    </figure>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* صحنه‌ی چسبان — تصویر موضوعِ فعال */}
          <div className="hidden lg:block lg:col-span-6">
            <Reveal y={36} duration={1000} className="lg:sticky lg:top-24">
              <figure className="relative aspect-[4/4.3] max-h-[calc(100vh-8.5rem)] overflow-hidden rounded-[26px] bg-slate-900">
                {industry.items.map((item, index) => (
                  <Image
                    key={item.number}
                    src={item.image}
                    alt={index === active ? item.imageAlt : ""}
                    fill
                    sizes="(min-width: 1024px) 44vw, 92vw"
                    className={`object-cover transition-[opacity,transform] duration-[900ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
                      index === active ? "z-10 scale-100 opacity-100" : "z-0 scale-[1.04] opacity-0"
                    }`}
                  />
                ))}

                <div
                  className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30"
                  aria-hidden="true"
                />

                <span className="num absolute start-6 top-6 z-30 text-[13px] font-black text-white/90">
                  {current.number} <span className="text-white/45">/ {TOTAL}</span>
                </span>

                <figcaption className="absolute inset-x-6 bottom-6 z-30 flex items-end justify-between gap-4">
                  <span key={current.number} className="animate-[swap_0.55s_cubic-bezier(0.16,1,0.3,1)_both]">
                    <span className="block text-[11px] font-bold text-primary">{industry.eyebrow}</span>
                    <span className="mt-1 block text-[16px] font-black text-white">{current.caption}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
