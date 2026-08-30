"use client";

import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { showcaseContent } from "@/lib/showcase-content";
import { companyInfo } from "@/lib/site-content";

export default function Hero() {
  const { hero, media } = showcaseContent;

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[88svh] items-center overflow-hidden bg-slate-950 pb-16 pt-32 lg:min-h-[92svh] lg:pb-24 lg:pt-40"
      aria-labelledby="hero-heading"
    >
      <Image
        src={media.heroImage}
        alt="مخازن و تأسیسات ذخیره‌سازی فرآورده‌های نفتی"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-slate-950/55" aria-hidden="true" />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950 via-slate-950/45 to-slate-950/20"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start text-right">
          <span className="flex items-center gap-3 text-[11px] font-bold tracking-wide text-[#54dcc6]">
            <span className="h-px w-10 bg-[#54dcc6]/60" aria-hidden="true" />
            {hero.eyebrow}
          </span>

          <h1
            id="hero-heading"
            className="mt-5 max-w-3xl text-[30px] font-black leading-[1.4] text-white sm:text-[40px] lg:text-[52px]"
          >
            {hero.title}
          </h1>

          <p className="mt-5 max-w-xl text-[14.5px] leading-[2.1] text-slate-200 sm:text-[16px]">
            {hero.subtitle}
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-[#54dcc6] px-7 py-3.5 text-[14px] font-bold text-slate-900 shadow-[0_10px_30px_rgba(84,220,198,0.28)] transition-colors hover:bg-[#45bba7]"
            >
              {hero.primaryCta}
            </a>
            <a
              href={`tel:${companyInfo.primaryPhoneHref}`}
              className="inline-flex items-center gap-2 text-[14px] font-medium text-slate-300 transition-colors hover:text-white"
            >
              <span>{hero.secondaryCta}</span>
              <span dir="ltr" className="font-semibold text-white">
                {companyInfo.primaryPhoneLabel}
              </span>
            </a>
          </div>

          <p className="mt-10 text-[12px] leading-relaxed text-slate-400">
            نیازسنجی رایگان · استقرار و آموزش در محل · پشتیبانی مستمر در {companyInfo.addressCity}
          </p>
        </div>
      </div>

      <a
        href="#intro"
        className="absolute bottom-6 left-5 hidden items-center gap-2 text-[11px] font-medium text-slate-400 transition-colors hover:text-[#54dcc6] sm:flex lg:left-8"
      >
        <ArrowDown className="size-3.5 animate-bounce" aria-hidden="true" />
        <span>مشاهده معرفی سامانه</span>
      </a>
    </section>
  );
}
