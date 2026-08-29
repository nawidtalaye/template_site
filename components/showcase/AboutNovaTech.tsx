"use client";

import Image from "next/image";
import { CheckCircle2, Code2, Database, Shield, Sparkles } from "lucide-react";
import { showcaseContent } from "@/lib/showcase-content";
import { companyInfo } from "@/lib/site-content";

export default function AboutNovaTech() {
  return (
    <section
      id="about"
      className="py-16 lg:py-24 bg-slate-950 text-white relative overflow-hidden"
      aria-labelledby="about-novatech-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left / Info & Brand Context */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-3.5 self-start">
              <Sparkles className="size-3.5" />
              <span>{showcaseContent.about.eyebrow}</span>
            </div>

            <h2
              id="about-novatech-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-bold fat leading-snug text-white mb-4"
            >
              {showcaseContent.about.title}
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed regular mb-6">
              {showcaseContent.about.description}
            </p>

            {/* Quote Box */}
            <div className="p-4 sm:p-5 rounded-xl bg-slate-900 border-r-4 border-primary border-y border-l border-white/10 mb-6 italic text-slate-200 text-xs sm:text-sm leading-relaxed">
              {showcaseContent.about.quote}
              <div className="mt-2 text-primary font-bold not-italic text-xs">
                — تیم مهندسی {companyInfo.brandName}
              </div>
            </div>

            {/* Core Values / Competencies */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {showcaseContent.about.points.map((point) => (
                <div key={point} className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="size-4 text-primary shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right / Visual Badge & Team Presence */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl border border-white/15 bg-slate-900/90 p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
              <div className="size-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-3 mb-4 shadow-inner">
                <Image
                  src="/images/novatech-logo.webp"
                  alt={`لوگوی ${companyInfo.brandName}`}
                  width={300}
                  height={150}
                  className="w-full h-auto object-contain"
                />
              </div>

              <h3 className="text-lg font-bold text-white mb-1">
                {companyInfo.legalName}
              </h3>
              <p className="text-xs text-primary font-medium mb-4">
                توسعه نرم‌افزار، طراحی دیتابیس و سیستم‌های سازمانی ERP
              </p>

              <div className="w-full pt-4 border-t border-white/10 flex flex-col gap-2.5 text-xs text-slate-300 text-right">
                <div className="flex items-center gap-2">
                  <Database className="size-4 text-primary shrink-0" />
                  <span>دفتر مرکزی: {companyInfo.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Code2 className="size-4 text-primary shrink-0" />
                  <span>پایگاه توسعه: هرات، افغانستان</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="size-4 text-primary shrink-0" />
                  <span>تضمین اصالت کد و امنیت داده‌های سازمانی</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
