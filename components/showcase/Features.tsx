"use client";

import { ChartColumn, Coins, FileText, Fuel, Truck, TrendingUp } from "lucide-react";

import Reveal from "@/components/motion/Reveal";
import Glyph from "@/components/ui/Glyph";
import SectionHeading from "@/components/ui/SectionHeading";
import { toPersianDigits } from "@/lib/format";
import { featureSpotlight, features, headings, type Feature } from "@/lib/showcase-content";

const iconMap: Record<string, typeof Coins> = {
  coins: Coins,
  file: FileText,
  tank: Fuel,
  truck: Truck,
  trend: TrendingUp,
  chart: ChartColumn,
};

export default function Features() {
  return (
    <section
      id="features"
      className="relative overflow-hidden border-y border-slate-200/70 bg-slate-50/60 py-20 lg:py-28"
      aria-labelledby="features-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="۰۲"
          eyebrow="امکانات"
          titleLines={headings.features}
          lead="هر بخش به صورت مستقل کار می‌کند و در عین حال به بقیه متصل است؛ یک بار وارد می‌کنید، همه جا دیده می‌شود."
        />

        {/* بلوک‌های آیکون‌محور — بدون قاب و سایه */}
        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-x-12">
          {features.map((feature: Feature, index) => {
            const Icon = iconMap[feature.icon] ?? Coins;
            return (
              <Reveal
                key={feature.id}
                delay={index * 90}
                y={34}
                duration={850}
                className="group relative border-t border-slate-200 pt-7"
              >
                <span
                  className="absolute inset-x-0 -top-px h-px origin-right scale-x-0 bg-primary transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                  aria-hidden="true"
                />
                <Glyph icon={Icon} size="lg" />
                <h3 className="mt-6 text-[18px] font-black leading-snug text-slate-900 transition-colors duration-300 group-hover:text-primary-ink">
                  {feature.title}
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-7 text-slate-500">{feature.description}</p>
                <ul className="mt-4 flex flex-col gap-1.5">
                  {feature.points.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-[12.5px] text-slate-600">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>

        {/* بخش برجسته — ترکیب نامتقارن متن و جدول محاسبه */}
        <div className="mt-20 grid items-center gap-12 lg:mt-28 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal y={30}>
              <span className="flex items-center gap-3 text-[12px] font-bold text-primary-ink">
                <span className="h-px w-9 bg-primary" aria-hidden="true" />
                {featureSpotlight.eyebrow}
              </span>
              <h3 className="mt-4 text-[24px] font-black leading-[1.4] text-slate-900 sm:text-[30px]">
                {featureSpotlight.title}
              </h3>
              <p className="mt-4 text-[14px] leading-8 text-slate-600">{featureSpotlight.description}</p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={140} y={40} duration={1000}>
              <div className="rounded-[26px] border border-slate-200/80 bg-white p-6 shadow-[0_40px_100px_-60px_rgba(15,23,42,0.6)] sm:p-8">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <span className="text-[12px] font-bold text-slate-500">تسهیم هزینه‌های یک محموله</span>
                  <span className="rounded-full bg-slate-900 px-3 py-1 text-[10px] font-black text-primary">
                    نمونه محاسبه
                  </span>
                </div>

                <ul className="flex flex-col divide-y divide-slate-100">
                  {featureSpotlight.rows.map((row, index) => (
                    <li
                      key={row.label}
                      className="flex items-baseline justify-between gap-4 py-3.5"
                    >
                      <span className="text-[13.5px] text-slate-600">{row.label}</span>
                      <span className="flex items-baseline gap-1.5">
                        <span className="num text-[15px] font-black text-slate-900">{row.value}</span>
                        <span className="text-[10.5px] text-slate-400">{row.unit}</span>
                        <span className="num w-6 text-[10px] text-slate-300">۰{index + 1}</span>
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-2 flex items-baseline justify-between gap-4 rounded-2xl bg-primary/12 px-5 py-4">
                  <span className="text-[14px] font-black text-primary-ink">{featureSpotlight.total.label}</span>
                  <span className="flex items-baseline gap-1.5">
                    <span className="num text-[22px] font-black text-slate-900">
                      {featureSpotlight.total.value}
                    </span>
                    <span className="text-[11px] text-slate-500">{featureSpotlight.total.unit}</span>
                  </span>
                </div>

                <p className="mt-4 text-[11px] leading-6 text-slate-400">{featureSpotlight.caption}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
