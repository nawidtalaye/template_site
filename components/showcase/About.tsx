"use client";

import Image from "next/image";
import { Check } from "lucide-react";

import Reveal from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";
import SectionHeading from "@/components/ui/SectionHeading";
import { about, media } from "@/lib/showcase-content";
import { companyInfo } from "@/lib/site-content";

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-white py-20 lg:py-28" aria-labelledby="about-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index="۱۱" eyebrow={about.eyebrow} title={about.title} lead="نرم‌افزار را همان تیمی پشتیبانی می‌کند که آن را ساخته است." />

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal y={26}>
              <p className="text-[15px] leading-8 text-slate-700 sm:text-base sm:leading-9">{about.lead}</p>
            </Reveal>

            <Reveal delay={140} y={26}>
              <p className="mt-5 text-[15px] leading-8 text-slate-500 sm:text-base sm:leading-9">{about.body}</p>
            </Reveal>

            <Reveal delay={240} y={24}>
              <dl className="mt-10 grid gap-x-10 gap-y-6 border-t border-slate-200 pt-8 sm:grid-cols-2">
                {about.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="text-[11.5px] font-bold text-slate-400">{fact.label}</dt>
                    <dd className="mt-1.5 text-[14px] font-bold text-slate-800">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={340} y={22}>
              <ul className="mt-8 flex flex-col gap-3">
                {about.points.map((point) => (
                  <li key={point} className="flex items-center gap-3 text-[13.5px] text-slate-600">
                    <span
                      className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary-ink"
                      aria-hidden="true"
                    >
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={160} y={40} duration={1050}>
              <Parallax distance={-30}>
                <div className="relative overflow-hidden rounded-[28px]">
                  <Image
                    src={media.aboutImage}
                    alt="تیم توسعه نواتیک در فضای کاری هرات"
                    width={1200}
                    height={1000}
                    sizes="(min-width: 1024px) 40vw, 92vw"
                    className="h-auto w-full object-cover"
                  />
                </div>
              </Parallax>

              <div className="mt-6 flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-slate-50 px-5 py-4">
                <span className="flex h-12 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white px-2.5">
                  <Image
                    src="/images/novatech-logo.webp"
                    alt={`لوگوی ${companyInfo.brandName}`}
                    width={130}
                    height={36}
                    sizes="110px"
                    className="h-6 w-auto object-contain"
                  />
                </span>
                <span className="flex flex-col">
                  <span className="text-[13.5px] font-black text-slate-900">{companyInfo.legalName}</span>
                  <span className="mt-0.5 text-[11.5px] text-slate-500">{about.imageCaption} · هرات</span>
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
