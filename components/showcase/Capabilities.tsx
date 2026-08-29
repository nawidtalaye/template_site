"use client";

import Image from "next/image";
import { Factory, Gauge, ShieldCheck, ThermometerSnowflake } from "lucide-react";
import { showcaseContent } from "@/lib/showcase-content";

const capIcons = [ThermometerSnowflake, Gauge, Factory, ShieldCheck];

export default function Capabilities() {
  return (
    <section id="capabilities" className="py-16 lg:py-24 bg-white text-slate-900 relative overflow-hidden" aria-labelledby="capabilities-heading">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#54dcc6]/10 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#54dcc6]/10 border border-[#54dcc6]/20 text-[#0f766e] text-xs font-bold mb-4">{showcaseContent.capabilities.eyebrow}</div>
          <h2 id="capabilities-heading" className="text-2xl sm:text-3xl md:text-[36px] font-black fat leading-snug text-slate-900 mb-4">{showcaseContent.capabilities.title}</h2>
          <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">{showcaseContent.capabilities.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative rounded-[24px] overflow-hidden border border-slate-200 shadow-[0_20px_60px_rgba(15,23,42,0.08)] bg-slate-50 group">
              <Image src={showcaseContent.media.capabilitiesImage} alt="تجهیزات پایش سوخت" width={800} height={600} sizes="(min-width:1024px) 45vw, 100vw" className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-lg flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">حفاظت از سرمایه انرژی</span>
                  <span className="text-[11px] font-bold text-[#0f766e] bg-[#54dcc6]/15 px-2.5 py-1 rounded-full border border-[#54dcc6]/20">تضمین حداقل افت</span>
                </div>
                <p className="text-[12px] text-slate-600">فرمول‌های کالیبره شده با اقلیم افغانستان و مسیرهای ترانزیت مرزی</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-4 order-1 lg:order-2">
            {showcaseContent.capabilities.items.map((item, idx) => {
              const Icon = capIcons[idx % capIcons.length];
              return (
                <div key={item.title} className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 hover:border-[#54dcc6]/40 hover:shadow-[0_12px_32px_rgba(15,23,42,0.06)] transition-all group light-card-hover">
                  <div className="flex items-start gap-4">
                    <div className="size-11 rounded-xl bg-slate-50 border border-slate-200 text-[#0f766e] flex items-center justify-center shrink-0 group-hover:bg-[#54dcc6] group-hover:text-slate-900 group-hover:border-[#54dcc6] transition-colors">
                      <Icon className="size-5" />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-[15px] font-bold text-slate-900 group-hover:text-[#0f766e] transition-colors mb-1.5">{item.title}</h3>
                      <p className="text-[13px] text-slate-600 leading-relaxed">{item.text}</p>
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
