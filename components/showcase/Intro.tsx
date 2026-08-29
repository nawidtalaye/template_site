"use client";

import Image from "next/image";
import { ArrowLeft, CheckCircle, Cpu, Fuel, Layers, Scale } from "lucide-react";
import { showcaseContent } from "@/lib/showcase-content";
import { companyInfo } from "@/lib/site-content";

export default function Intro() {
  const icons = [Scale, Fuel, Layers, Cpu];

  return (
    <section
      id="intro"
      className="relative py-16 lg:py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden"
      aria-labelledby="intro-heading"
    >
      {/* Decorative ambient glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-3.5">
            <span>{showcaseContent.intro.eyebrow}</span>
          </div>
          <h2
            id="intro-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold fat leading-snug text-white mb-4"
          >
            {showcaseContent.intro.title}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed regular">
            {showcaseContent.intro.description}
          </p>
        </div>

        {/* 2-Column Content Grid: Visual + Value Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Visual Showcase Card */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900 group">
              <Image
                src={showcaseContent.media.introImage}
                alt="نمای پالایشگاه و پایگاه داده هوشمند نفت و گاز نواتیک"
                width={1200}
                height={800}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

              {/* Inset Metric Floating Badge */}
              <div className="absolute bottom-4 right-4 left-4 sm:right-6 sm:left-6 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-white/15 text-white flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400">یکپارچه‌سازی فرآیندها</span>
                  <span className="text-sm font-bold text-primary">
                    از خرید مرزی تا فروش در جایگاه
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold">
                  {companyInfo.brandName} Soft
                </span>
              </div>
            </div>
          </div>

          {/* Value Pillars List */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {showcaseContent.intro.highlights.map((highlight, index) => {
              const IconComponent = icons[index % icons.length];
              return (
                <div
                  key={highlight.title}
                  className="p-4 sm:p-5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-primary/40 transition-all duration-300 flex items-start gap-4 group"
                >
                  <div className="size-11 rounded-xl bg-primary/10 group-hover:bg-primary group-hover:text-slate-950 text-primary border border-primary/20 flex items-center justify-center shrink-0 transition-all duration-300">
                    <IconComponent className="size-5" aria-hidden="true" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-base font-bold text-white group-hover:text-primary transition-colors duration-200 mb-1">
                      {highlight.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {highlight.desc}
                    </p>
                  </div>
                </div>
              );
            })}

            <div className="pt-2">
              <a
                href="#modules"
                className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-white transition-colors duration-200 group"
              >
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
