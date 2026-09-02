"use client";

import Image from "next/image";

import Reveal from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";
import SectionHeading from "@/components/ui/SectionHeading";
import { toPersianDigits } from "@/lib/format";
import { industry, media } from "@/lib/showcase-content";

const TOTAL = toPersianDigits(String(industry.items.length).padStart(2, "0"));

/**
 * «ساخته شده برای صنعت نفت و گاز»
 *
 * هشت حوزه دقیقاً با ساختار بخش «تیم نواتیک / افرادی که پشت راهکارهای
 * نواتیک هستند» در novatechsoft.com: تصویر پرتره‌ای با شماره‌ی «۰۱ / ۰۸»
 * روی گوشه، و زیرِ عکس — نه روی آن — عنوان و یک خط توضیح، دقیقاً مثل
 * نام و سمتِ هر عضو تیم. این‌جا به‌جای عکس افراد، عکس همان بخش از کار
 * می‌نشیند.
 */
export default function Industry() {
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
        {/* هشت حوزه — همان قاب «تیم نواتیک»: پرتره + شماره + عنوان زیرش */}
        {/* ---------------------------------------------------------- */}
        <ul className="mt-20 grid list-none grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 sm:gap-x-8 lg:mt-28 lg:grid-cols-4">
          {industry.items.map((item, index) => (
            <Reveal as="li" key={item.number} y={26} delay={index * 70}>
              <figure className="relative aspect-[3/4] overflow-hidden rounded-[20px] bg-slate-900">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  loading={index < 4 ? "eager" : "lazy"}
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 44vw"
                  className="object-cover transition-transform duration-[1100ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.06]"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent"
                  aria-hidden="true"
                />
                <span className="num absolute start-3.5 top-3.5 text-[12.5px] font-black text-white/90 [text-shadow:0_1px_8px_rgba(2,6,23,0.55)]">
                  {item.number} <span className="text-white/45">/ {TOTAL}</span>
                </span>
              </figure>

              <h3 className="mt-4 text-[18px] font-black leading-[1.4] text-white sm:text-[20px]">{item.title}</h3>
              <p className="mt-1.5 text-[13px] font-bold text-primary">{item.caption}</p>
              <p className="mt-2 text-[12.5px] leading-6 text-white/45 line-clamp-3">{item.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
