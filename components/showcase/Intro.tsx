"use client";

import Image from "next/image";
import { ArrowLeft, Check, Quote } from "lucide-react";

import Reveal from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";
import SectionHeading from "@/components/ui/SectionHeading";
import { intro, media } from "@/lib/showcase-content";

/**
 * «معرفی سامانه»
 *
 * ساختار عیناً بخش «شرکت نواتیک | ما که هستیم؟» در novatechsoft.com است:
 * تیتر → یک پاراگراف معرفی (تک‌ستونه، نه دو ستون کنار هم) → یک قاب تصویر
 * بزرگ زیر متن → جعبه‌ی برجسته با آیکون نقل‌قول برای نکته‌ی کلیدی. آمار و
 * فهرست ویژگی‌ها که در نمونه‌ی اصلی نبودند، به‌عنوان یک ردیف پشتیبان بعد
 * از همین قالب می‌آیند تا محتوا حذف نشود.
 */
export default function Intro() {
  return (
    <section id="intro" className="relative overflow-hidden bg-white py-20 lg:py-28" aria-labelledby="intro-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          headingId="intro-heading"
          signature
          index="۰۱"
          eyebrow={intro.eyebrow}
          title={intro.title}
        />

        {/* پاراگراف معرفی — تک‌ستونه، مثل نمونه‌ی اصلی */}
        <div className="mt-12 max-w-3xl lg:mt-16">
          <Reveal delay={80} y={26}>
            <p className="text-[16px] leading-9 text-slate-600 sm:text-[17px] sm:leading-10">{intro.lead}</p>
          </Reveal>
          <Reveal delay={200} y={26}>
            <p className="mt-5 text-[16px] leading-9 text-slate-800 sm:text-[17px] sm:leading-10">{intro.body}</p>
          </Reveal>
        </div>

        {/* قاب تصویر بزرگ — زیر متن، تمام‌عرض */}
        <Reveal delay={160} y={40} duration={1100} className="mt-12 lg:mt-16">
          <Parallax distance={-24} className="relative">
            <div className="relative aspect-[16/8] overflow-hidden rounded-[28px] bg-slate-100 sm:aspect-[16/6.5]">
              <Image
                src={media.introImage}
                alt="اپراتورهای دیپو در حال پایش سطح مخازن و تخلیه تانکرها"
                fill
                sizes="(min-width: 1024px) 1120px, 92vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent"
                aria-hidden="true"
              />
            </div>

            <div className="absolute -bottom-6 left-4 right-4 flex items-center justify-between gap-4 rounded-2xl border border-slate-200/70 bg-white/95 px-5 py-4 shadow-[0_24px_50px_-30px_rgba(15,23,42,0.55)] backdrop-blur-md sm:left-8">
              <div className="flex flex-col">
                <span className="text-[12px] text-slate-500">{intro.imageCaption}</span>
                <span className="mt-0.5 text-[14.5px] font-bold text-slate-900">{intro.imageNote}</span>
              </div>
              <span className="hidden shrink-0 items-center gap-2 rounded-full bg-primary/12 px-3 py-1.5 text-[12px] font-bold text-primary-ink sm:flex">
                <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
                به‌روزرسانی لحظه‌ای
              </span>
            </div>
          </Parallax>
        </Reveal>

        {/* جعبه‌ی برجسته — همان قاب نقل‌قول novatechsoft، اینجا برای نتیجه‌ی محصول */}
        <Reveal y={26} delay={120} className="mt-16 max-w-3xl lg:mt-20">
          <div className="relative rounded-2xl bg-primary/10 px-6 py-6 sm:px-8 sm:py-8">
            <Quote className="size-7 text-primary" aria-hidden="true" />
            <p className="mt-3 text-[17px] font-medium leading-9 text-slate-800 sm:text-[19px] sm:leading-10">
              «بهای تمام‌شده واقعی هر لیتر، به دالر و به افغانی، در هر لحظه معلوم است.»
            </p>
            <span className="mt-3 block text-[13px] font-bold text-primary-ink">نتیجه‌ی سامانه در یک جمله</span>
          </div>
        </Reveal>

        {/* ردیف پشتیبان — آمار، نکات کلیدی و لینک ادامه */}
        <div className="mt-16 grid gap-12 border-t border-slate-100 pt-12 lg:mt-20 lg:grid-cols-12 lg:gap-16 lg:pt-16">
          <div className="lg:col-span-7">
            <Reveal delay={40} y={22}>
              <ul className="flex flex-col divide-y divide-slate-100 border-y border-slate-100">
                {intro.checkpoints.map((item) => (
                  <li key={item} className="flex items-start gap-3 py-3.5 text-[14.5px] text-slate-700">
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

            <Reveal delay={140} y={18}>
              <a
                href="#modules"
                className="group mt-8 inline-flex items-center gap-2 text-[14.5px] font-black text-primary-ink"
              >
                <span>دیدن ماژول‌های سامانه</span>
                <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
              </a>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={100} y={22}>
              <dl className="grid grid-cols-3 divide-x divide-x-reverse divide-slate-200">
                {intro.stats.map((stat) => (
                  <div key={stat.label} className="px-4 first:pe-0 last:ps-0">
                    <dt className="num text-[30px] font-black leading-none text-slate-900">{stat.value}</dt>
                    <dd className="mt-2 text-[13.5px] font-bold text-slate-800">{stat.label}</dd>
                    <dd className="mt-1 text-[12px] leading-5 text-slate-500">{stat.note}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
