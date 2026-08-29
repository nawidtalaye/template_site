"use client";

import Image from "next/image";
import { CheckCircle2, Factory, Gauge, ShieldCheck, ThermometerSnowflake } from "lucide-react";
import { showcaseContent } from "@/lib/showcase-content";

const capIcons = [ThermometerSnowflake, Gauge, Factory, ShieldCheck];

export default function Capabilities() {
  return (
    <section
      id="capabilities"
      className="py-16 lg:py-24 bg-slate-900 text-white relative overflow-hidden"
      aria-labelledby="capabilities-heading"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 bg-radial from-primary/[0.07] via-transparent to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-3.5">
            <span>{showcaseContent.capabilities.eyebrow}</span>
          </div>
          <h2
            id="capabilities-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold fat leading-snug text-white mb-4"
          >
            {showcaseContent.capabilities.title}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed regular">
            {showcaseContent.capabilities.subtitle}
          </p>
        </div>

        {/* 2-Column Immersive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left / Visual side */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-slate-950 group">
              <Image
                src={showcaseContent.media.capabilitiesImage}
                alt="تجهیزات و خطوط لوله انتقال سوخت و پایش هوشمند"
                width={800}
                height={600}
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

              <div className="absolute bottom-4 right-4 left-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-white/10 text-white flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">حفاظت از سرمایه انرژی</span>
                  <span className="text-xs font-bold text-primary">تضمین حداقل افت</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  فرمول‌های کالیبره شده با اقلیم افغانستان و مسیرهای ترانزیت مرزی
                </p>
              </div>
            </div>
          </div>

          {/* Right / Capabilities Pillars */}
          <div className="lg:col-span-7 flex flex-col gap-4 order-1 lg:order-2">
            {showcaseContent.capabilities.items.map((item, idx) => {
              const Icon = capIcons[idx % capIcons.length];

              return (
                <div
                  key={item.title}
                  className="p-5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-primary/40 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="size-10 rounded-lg bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-slate-950 transition-colors duration-300 mt-0.5">
                      <Icon className="size-5" />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-base font-bold text-white group-hover:text-primary transition-colors duration-200 mb-1.5">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
