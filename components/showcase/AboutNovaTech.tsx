"use client";

import Image from "next/image";
import { CheckCircle2, Code2, Database, Shield, Sparkles } from "lucide-react";
import { showcaseContent } from "@/lib/showcase-content";
import { companyInfo } from "@/lib/site-content";

export default function AboutNovaTech() {
  return (
    <section id="about" className="py-16 lg:py-24 bg-white text-slate-900 relative overflow-hidden" aria-labelledby="about-novatech-heading">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#54dcc6]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#54dcc6]/10 border border-[#54dcc6]/20 text-[#0f766e] text-xs font-bold mb-4 self-start"><Sparkles className="size-3.5" /><span>{showcaseContent.about.eyebrow}</span></div>
            <h2 id="about-novatech-heading" className="text-2xl sm:text-3xl md:text-[34px] font-black fat leading-snug text-slate-900 mb-4">{showcaseContent.about.title}</h2>
            <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed mb-6">{showcaseContent.about.description}</p>
            <div className="p-5 rounded-2xl bg-slate-50 border-r-4 border-[#54dcc6] border-y border-l border-slate-200 mb-6 italic text-slate-700 text-[13px] sm:text-sm leading-relaxed">
              {showcaseContent.about.quote}
              <div className="mt-2 text-[#0f766e] font-bold not-italic text-xs">— تیم مهندسی {companyInfo.brandName}</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {showcaseContent.about.points.map((point) => (
                <div key={point} className="flex items-center gap-2 text-[13px] text-slate-700 bg-white border border-slate-200 rounded-full px-3.5 py-2">
                  <CheckCircle2 className="size-4 text-[#54dcc6] shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] relative overflow-hidden flex flex-col items-center text-center">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#54dcc6]/10 rounded-full blur-2xl pointer-events-none" />
              <div className="size-20 rounded-2xl bg-white border border-slate-200 flex items-center justify-center p-3 mb-4 shadow-sm">
                <Image src="/images/novatech-logo.webp" alt={`لوگوی ${companyInfo.brandName}`} width={300} height={150} className="w-full h-auto object-contain" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-1">{companyInfo.legalName}</h3>
              <p className="text-xs text-[#0f766e] font-bold mb-6 bg-[#54dcc6]/10 border border-[#54dcc6]/20 px-3 py-1 rounded-full">توسعه نرم‌افزار، طراحی دیتابیس و ERP</p>
              <div className="w-full pt-5 border-t border-slate-100 flex flex-col gap-3 text-xs text-slate-600 text-right">
                <div className="flex items-center gap-2"><Database className="size-4 text-[#54dcc6] shrink-0" /><span>دفتر مرکزی: {companyInfo.address}</span></div>
                <div className="flex items-center gap-2"><Code2 className="size-4 text-[#54dcc6] shrink-0" /><span>پایگاه توسعه: هرات، افغانستان</span></div>
                <div className="flex items-center gap-2"><Shield className="size-4 text-[#54dcc6] shrink-0" /><span>تضمین اصالت کد و امنیت داده‌های سازمانی</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
