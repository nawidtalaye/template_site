"use client";

import Image from "next/image";

import Reveal from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";
import SectionHeading from "@/components/ui/SectionHeading";
import { industry, media } from "@/lib/showcase-content";

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
          <div className="border-t border-white/15 pt-7">
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

        {/* هشت حوزه پوشش */}
        <div className="mt-16 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-x-12">
          {industry.items.map((item, index) => (
            <Reveal
              key={item.title}
              delay={(index % 4) * 80}
              y={30}
              duration={850}
              className="group border-t border-white/12 pt-6"
            >
              <span className="num text-[12px] font-bold text-primary">{item.number}</span>
              <h3 className="mt-3 text-[16px] font-black text-white/90 transition-colors duration-300 group-hover:text-primary">
                {item.title}
              </h3>
              <p className="mt-2.5 text-[13px] leading-7 text-white/55">{item.text}</p>
            </Reveal>
          ))}
        </div>

        {/* دو تصویر با کپشن */}
        <div className="mt-16 grid gap-6 lg:mt-24 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-7" y={36} duration={1000}>
            <figure className="group relative overflow-hidden rounded-[26px]">
              <Image
                src={media.industryImage}
                alt="مخازن و تجهیزات بارگیری یک دیپوی سوخت"
                width={1600}
                height={900}
                sizes="(min-width: 1024px) 58vw, 92vw"
                className="h-auto w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-slate-950/85 to-transparent px-5 py-4">
                <span className="text-[13px] font-bold text-white">دیپو و پایانه سوخت</span>
                <span className="text-[11px] text-white/60">اندازه‌گیری، دما و افت</span>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={120} y={36} duration={1000}>
            <figure className="group relative h-full overflow-hidden rounded-[26px]">
              <Image
                src={media.industrySecondary}
                alt="بررسی اسناد مالی و فاکتورهای خرید محموله"
                width={1400}
                height={900}
                sizes="(min-width: 1024px) 40vw, 92vw"
                className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-slate-950/85 to-transparent px-5 py-4">
                <span className="text-[13px] font-bold text-white">اسناد مالی و تسعیر ارز</span>
                <span className="text-[11px] text-white/60">دالر و افغانی</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
