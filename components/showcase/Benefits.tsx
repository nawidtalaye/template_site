"use client";

import Image from "next/image";
import { ArrowLeft } from "lucide-react";

import Reveal from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";
import SectionHeading from "@/components/ui/SectionHeading";
import { benefits, media } from "@/lib/showcase-content";

export default function Benefits() {
  return (
    <section
      id="benefits"
      className="relative bg-slate-50/60 py-20 lg:py-28"
      aria-labelledby="benefits-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index="۰۸" eyebrow={benefits.eyebrow} title={benefits.title} lead={benefits.lead} />

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          {/* تصویر */}
          <div className="lg:col-span-5">
            <Reveal y={40} duration={1000} className="lg:sticky lg:top-28 lg:self-start">
              <Parallax distance={-28}>
                <figure className="overflow-hidden rounded-[26px] bg-slate-100">
                  <Image
                    src={media.benefitsImage}
                    alt="اپراتور در حال بازدید و اندازه‌گیری تجهیزات دیپو"
                    width={900}
                    height={1125}
                    sizes="(min-width: 1024px) 38vw, 92vw"
                    className="h-auto w-full object-cover"
                  />
                </figure>
              </Parallax>
              <figcaption className="mt-4 flex items-center justify-between gap-4 border-t border-slate-200 pt-4">
                <span className="text-[12.5px] font-bold text-slate-800">{benefits.imageCaption}</span>
                <span className="text-[11.5px] text-slate-500">{benefits.imageNote}</span>
              </figcaption>
            </Reveal>
          </div>

          {/* ردیف‌های مزایا */}
          <div className="lg:col-span-7">
            <ul className="flex flex-col border-t border-slate-200">
              {benefits.items.map((item, index) => (
                <Reveal
                  as="li"
                  key={item.number}
                  delay={index * 70}
                  y={24}
                  duration={800}
                  className="group border-b border-slate-200 py-7"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex gap-5">
                      <span className="num mt-1 text-[12px] font-bold text-primary-ink">{item.number}</span>
                      <div>
                        <h3 className="text-[17px] font-black leading-snug text-slate-900 transition-colors duration-300 group-hover:text-primary-ink">
                          {item.title}
                        </h3>
                        <p className="mt-2 max-w-lg text-[13.5px] leading-7 text-slate-500">{item.text}</p>
                      </div>
                    </div>
                    <span className="hidden shrink-0 items-center gap-2 sm:flex">
                      <span className="rounded-full bg-white px-3 py-1.5 text-[11px] font-bold text-slate-500 ring-1 ring-slate-200">
                        {item.metric}
                      </span>
                      <ArrowLeft
                        className="size-4 -translate-x-2 text-primary opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
