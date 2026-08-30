"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";
import { showcaseContent } from "@/lib/showcase-content";

export default function Intro() {
  const { intro, media } = showcaseContent;

  return (
    <section id="intro" className="bg-white py-20 lg:py-28" aria-labelledby="intro-heading">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Text column — first in source order, so it sits on the right in RTL */}
          <div className="lg:col-span-6">
            <Reveal>
              <span className="flex items-center gap-3 text-[11px] font-bold tracking-wide text-[#0f766e]">
                {intro.eyebrow}
                <span className="h-px w-8 bg-[#0f766e]/35" aria-hidden="true" />
              </span>
              <h2
                id="intro-heading"
                className="mt-4 text-[24px] font-black leading-[1.45] text-slate-900 sm:text-[30px] lg:text-[34px]"
              >
                {intro.title}
              </h2>
              <p className="mt-5 text-[14px] leading-[2.1] text-slate-600 sm:text-[15px]">{intro.description}</p>
            </Reveal>

            <dl className="mt-9 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
              {intro.highlights.map((item, index) => (
                <Reveal key={item.title} delay={index * 70}>
                  <div className="border-t border-slate-200 pt-4">
                    <dt className="text-[14px] font-bold text-slate-900">{item.title}</dt>
                    <dd className="mt-1.5 text-[13px] leading-[1.9] text-slate-600">{item.desc}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={80}>
              <figure className="relative">
                <div className="overflow-hidden rounded-[4px] bg-slate-100">
                  <Image
                    src={media.introImage}
                    alt="پایانه سوخت و مخازن ذخیره‌سازی فرآورده‌های نفتی"
                    width={1408}
                    height={768}
                    sizes="(min-width: 1024px) 46vw, 100vw"
                    className="h-auto w-full object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-[11.5px] text-slate-500">
                  از قرارداد خرید در مبدا تا فروش در جایگاه — در یک پایگاه داده
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
