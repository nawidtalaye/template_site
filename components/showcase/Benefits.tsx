"use client";

import Image from "next/image";

import Reveal, { RevealLine } from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";
import SectionHeading from "@/components/ui/SectionHeading";
import { benefits, media } from "@/lib/showcase-content";

/**
 * مزایا — با ساختار «داستان نواتیک» در صفحه درباره ما:
 * یک جمله‌ی بزرگ آغاز می‌کند، یک تصویر واقعی صحنه را می‌سازد و بعد
 * شش ایستگاهِ داستان با همان فلش‌های نقطه‌چینِ خودِ نواتیک به هم وصل
 * می‌شوند. خبری از شبکه‌ی کارت‌ها نیست؛ روایت است که جلو می‌رود.
 */
export default function Benefits() {
  return (
    <section
      id="benefits"
      className="relative bg-slate-50/60 py-20 lg:py-28"
      aria-labelledby="benefits-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="۰۸"
          eyebrow={benefits.eyebrow}
          title={benefits.title}
          lead={benefits.lead}
          headingId="benefits-heading"
          signature
        />

        {/* آغاز داستان — تایپوگرافی بزرگ */}
        <Reveal y={26} className="mt-16 lg:mt-24">
          <p className="max-w-4xl text-[30px] font-black leading-[1.55] text-slate-900 sm:text-[40px] lg:text-[48px]">
            {benefits.storyIntro.map((line, index) => (
              <RevealLine key={line} delay={140 + index * 120}>
                {index === benefits.storyIntro.length - 1 ? (
                  <span className="text-primary-ink">{line}</span>
                ) : (
                  line
                )}
              </RevealLine>
            ))}
          </p>
          <p className="mt-6 max-w-md text-[13.5px] leading-7 text-slate-500">{benefits.storyNote}</p>
        </Reveal>

        {/* صحنه — تصویر واقعی با حرکت آرام */}
        <Reveal y={40} duration={1100} className="mt-14 lg:mt-20">
          <div className="overflow-hidden rounded-[26px]">
            <Parallax distance={-36} scale={0.05}>
              <figure className="relative aspect-[16/9] sm:aspect-[21/9]">
                <Image
                  src={media.benefitsImage}
                  alt="اپراتور در حال بازدید و اندازه‌گیری تجهیزات دیپو"
                  fill
                  sizes="(min-width: 1280px) 1216px, 92vw"
                  className="object-cover"
                />
              </figure>
            </Parallax>
          </div>
          <figcaption className="mt-4 flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <span className="text-[12.5px] font-bold text-slate-800">{benefits.imageCaption}</span>
            <span className="text-[11.5px] text-slate-500">{benefits.imageNote}</span>
          </figcaption>
        </Reveal>

        {/* ایستگاه‌های داستان — سه در هر ردیف، با فلش نقطه‌چین بین‌شان */}
        <div className="mt-16 lg:mt-24">
          <ol className="grid list-none gap-y-14 md:grid-cols-3 md:gap-x-12 lg:gap-x-16">
            {benefits.items.map((item, index) => {
              const isRowEnd = index % 3 === 2;
              return (
                <li key={item.number} className="relative">
                  <Reveal delay={(index % 3) * 130} y={30} duration={900}>
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="num text-[34px] font-black leading-none text-primary-ink/25 sm:text-[40px]">
                        {item.number}
                      </span>
                      <span className="text-[11px] font-bold text-primary-ink">{item.metric}</span>
                    </div>
                    <h3 className="mt-5 text-[18px] font-black leading-snug text-slate-900 sm:text-[19px]">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-xs text-[13.5px] leading-7 text-slate-500">{item.text}</p>
                  </Reveal>

                  {/* فلش نقطه‌چین نواتیک به سوی ایستگاه بعدی — فقط داخل ردیف */}
                  {!isRowEnd && index < benefits.items.length - 1 ? (
                    <Reveal
                      delay={(index % 3) * 130 + 260}
                      y={0}
                      x={-14}
                      duration={800}
                      className="pointer-events-none absolute -end-14 top-1 hidden lg:block"
                      aria-hidden="true"
                    >
                      <Image
                        src="/images/arrow-dotted.png"
                        alt=""
                        width={44}
                        height={78}
                        className="h-[64px] w-auto rotate-45 opacity-70"
                      />
                    </Reveal>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
