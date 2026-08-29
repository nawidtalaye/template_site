"use client";

import { showcaseContent } from "@/lib/showcase-content";
import { ArrowLeft, CheckCircle2, ChevronDown, CircleDot } from "lucide-react";

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-16 lg:py-24 bg-slate-900 text-white relative overflow-hidden"
      aria-labelledby="how-it-works-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-3.5">
            <span>{showcaseContent.howItWorks.eyebrow}</span>
          </div>
          <h2
            id="how-it-works-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold fat leading-snug text-white mb-4"
          >
            {showcaseContent.howItWorks.title}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed regular">
            {showcaseContent.howItWorks.subtitle}
          </p>
        </div>

        {/* 6-Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {showcaseContent.howItWorks.steps.map((step, index) => (
            <div
              key={step.number}
              className="group relative rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-primary/40 p-6 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1"
            >
              <div>
                {/* Step number badge & icon */}
                <div className="flex items-center justify-between mb-4">
                  <span className="size-10 rounded-xl bg-primary/15 border border-primary/30 text-primary font-mono text-sm font-black flex items-center justify-center group-hover:bg-primary group-hover:text-slate-950 transition-colors duration-300">
                    {step.number}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    مرحله {index + 1} از ۶
                  </span>
                </div>

                {/* Title & Desc */}
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-primary transition-colors duration-200 mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed regular">
                  {step.desc}
                </p>
              </div>

              {/* Bottom progress indicator */}
              <div className="mt-6 pt-3 border-t border-white/5 flex items-center gap-2 text-xs text-primary font-medium">
                <CircleDot className="size-3.5 text-primary" />
                <span>فرآیند یکپارچه سامانه</span>
              </div>
            </div>
          ))}
        </div>

        {/* Workflow Summary Strip */}
        <div className="mt-12 p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="size-5 text-primary shrink-0" />
            <span className="text-xs sm:text-sm text-slate-200 font-medium">
              ارتباط بلادرنگ میان دیتابیس دیپوها، واحد حسابداری و تصمیم‌گیرندگان ارشد
            </span>
          </div>
          <a
            href="#contact"
            className="text-xs sm:text-sm font-bold text-primary hover:text-white transition-colors flex items-center gap-1.5"
          >
            <span>درخواست مشاوره فرآیندها</span>
            <ArrowLeft className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
