"use client";

import Image from "next/image";
import { ArrowLeft, Check } from "lucide-react";

import Reveal from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";
import SectionHeading from "@/components/ui/SectionHeading";
import { intro, media } from "@/lib/showcase-content";

export default function Intro() {
  return (
    <section id="intro" className="relative overflow-hidden bg-white py-20 lg:py-28" aria-labelledby="intro-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="۰۱"
          eyebrow={intro.eyebrow}
          title={intro.title}
          lead="سامانه‌ای که برای واقعیت بازار سوخت افغانستان نوشته شده است، نه یک نرم‌افزار عمومی که با آن تطبیق داده شده باشد."
        />

        <div className="mt-14 grid items-center gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          {/* متن */}
          <div className="lg:col-span-6">
            <Reveal delay={80} y={26}>
              <p className="text-[15px] leading-8 text-slate-600 sm:text-base sm:leading-9">{intro.lead}</p>
            </Reveal>

            <Reveal delay={200} y={26}>
              <p className="mt-5 text-[15px] leading-8 text-slate-800 sm:text-base sm:leading-9">{intro.body}</p>
            </Reveal>

            <Reveal delay={320} y={24}>
              <ul className="mt-8 flex flex-col divide-y divide-slate-100 border-y border-slate-100">
                {intro.checkpoints.map((item) => (
                  <li key={item} className="flex items-start gap-3 py-3.5 text-[14px] text-slate-700">
                    <span
                      className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary-ink"
                      aria-hidden="true"
                    >
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* سه نکته کلیدی — تقسیم‌کننده به جای کارت */}
            <Reveal delay={420} y={22}>
              <dl className="mt-10 grid grid-cols-3 divide-x divide-x-reverse divide-slate-200">
                {intro.stats.map((stat) => (
                  <div key={stat.label} className="px-4 first:pe-0 last:ps-0">
                    <dt className="num text-[28px] font-black leading-none text-slate-900">{stat.value}</dt>
                    <dd className="mt-2 text-[13px] font-bold text-slate-800">{stat.label}</dd>
                    <dd className="mt-1 text-[11px] leading-5 text-slate-500">{stat.note}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={520} y={18}>
              <a
                href="#modules"
                className="group mt-10 inline-flex items-center gap-2 text-[14px] font-black text-primary-ink"
              >
                <span>دیدن ماژول‌های سامانه</span>
                <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
              </a>
            </Reveal>
          </div>

          {/* تصویر */}
          <div className="lg:col-span-6">
            <Reveal delay={160} y={40} duration={1100}>
              <Parallax distance={-34} className="relative">
                <div className="relative overflow-hidden rounded-[28px] bg-slate-100">
                  <Image
                    src={media.introImage}
                    alt="اپراتورهای دیپو در حال پایش سطح مخازن و تخلیه تانکرها"
                    width={1200}
                    height={900}
                    sizes="(min-width: 1024px) 46vw, 92vw"
                    className="h-auto w-full object-cover"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent"
                    aria-hidden="true"
                  />
                </div>

                {/* نوار داده روی تصویر */}
                <div className="absolute -bottom-6 left-4 right-4 flex items-center justify-between gap-4 rounded-2xl border border-slate-200/70 bg-white/95 px-5 py-4 shadow-[0_24px_50px_-30px_rgba(15,23,42,0.55)] backdrop-blur-md sm:left-8">
                  <div className="flex flex-col">
                    <span className="text-[11px] text-slate-500">{intro.imageCaption}</span>
                    <span className="mt-0.5 text-[13px] font-bold text-slate-900">{intro.imageNote}</span>
                  </div>
                  <span className="hidden shrink-0 items-center gap-2 rounded-full bg-primary/12 px-3 py-1.5 text-[11px] font-bold text-primary-ink sm:flex">
                    <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
                    به‌روزرسانی لحظه‌ای
                  </span>
                </div>
              </Parallax>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
