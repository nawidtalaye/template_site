"use client";

import Image from "next/image";
import { ArrowLeft, CheckCircle, Cpu, Fuel, Layers, Scale } from "lucide-react";
import { showcaseContent } from "@/lib/showcase-content";
import { companyInfo } from "@/lib/site-content";

export default function Intro() {
  const icons = [Scale, Fuel, Layers, Cpu];

  return (
    <section id="intro" className="relative py-16 lg:py-24 bg-white text-slate-900 overflow-hidden" aria-labelledby="intro-heading">
      <div className="absolute inset-0 bg-grid-light opacity-[0.45] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-[#54dcc6]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-sky-100 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#54dcc6]/10 border border-[#54dcc6]/20 text-[#0f766e] text-xs font-bold mb-4">
            <span>{showcaseContent.intro.eyebrow}</span>
          </div>
          <h2 id="intro-heading" className="text-2xl sm:text-3xl md:text-[36px] font-black fat leading-[1.25] text-slate-900 mb-4">
            {showcaseContent.intro.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">{showcaseContent.intro.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-6 relative order-2 lg:order-1">
            <div className="relative rounded-[24px] overflow-hidden border border-slate-200 shadow-[0_20px_60px_rgba(15,23,42,0.08)] bg-slate-50 group">
              <Image src={showcaseContent.media.introImage} alt="نمای پالایشگاه و پایگاه داده" width={1200} height={800} sizes="(min-width:1024px) 50vw, 100vw" className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 sm:right-5 sm:left-5 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 text-slate-900 flex items-center justify-between shadow-lg">
                <div className="flex flex-col">
                  <span className="text-[11px] text-slate-500">یکپارچه‌سازی فرآیندها</span>
                  <span className="text-[13px] font-bold text-slate-900">از خرید مرزی تا فروش در جایگاه</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#54dcc6]/15 text-[#0f766e] text-[11px] font-bold border border-[#54dcc6]/20">{companyInfo.brandName} Soft</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col gap-4 order-1 lg:order-2">
            {showcaseContent.intro.highlights.map((highlight, index) => {
              const IconComponent = icons[index % icons.length];
              return (
                <div key={highlight.title} className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#54dcc6]/40 hover:shadow-[0_12px_32px_rgba(15,23,42,0.06)] transition-all duration-300 flex items-start gap-4 group light-card-hover">
                  <div className="size-11 rounded-xl bg-[#54dcc6]/12 border border-[#54dcc6]/20 text-[#0f766e] flex items-center justify-center shrink-0 group-hover:bg-[#54dcc6] group-hover:text-slate-900 transition-colors">
                    <IconComponent className="size-5" aria-hidden="true" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-[15px] font-bold text-slate-900 group-hover:text-[#0f766e] transition-colors mb-1">{highlight.title}</h3>
                    <p className="text-[13px] text-slate-600 leading-relaxed">{highlight.desc}</p>
                  </div>
                </div>
              );
            })}
            <div className="pt-2">
              <a href="#modules" className="inline-flex items-center gap-2 text-sm font-bold text-[#0f766e] hover:text-slate-900 transition-colors group">
                <span>بررسی تمامی ماژول‌های سامانه</span>
                <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
