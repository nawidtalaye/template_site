"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Check,
  ChevronLeft,
  Coins,
  FileCheck2,
  Fuel,
  Gauge,
  Layers,
  PieChart,
  ShieldAlert,
  Truck,
  Users2,
} from "lucide-react";
import { showcaseContent } from "@/lib/showcase-content";

const moduleIcons = [
  Coins,
  Coins,
  FileCheck2,
  Fuel,
  Truck,
  Layers,
  FileCheck2,
  ShieldAlert,
  Gauge,
  Users2,
];

export default function Modules() {
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const activeModule = showcaseContent.modules[activeModuleIndex];

  return (
    <section
      id="modules"
      className="py-16 lg:py-24 bg-slate-950 text-white relative overflow-hidden"
      aria-labelledby="modules-heading"
    >
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/[0.04] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-3.5">
            <span>ماژول‌های تخصصی سامانه</span>
          </div>
          <h2
            id="modules-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold fat leading-snug text-white mb-4"
          >
            ۱۰ ماژول یکپارچه برای پوشش کامل چرخه انرژی
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed regular">
            روی هر ماژول کلیک کنید تا عملکرد، امکانات و نمای نرم‌افزاری آن را مشاهده نمایید.
          </p>
        </div>

        {/* Interactive Layout: Left/Top Module Selector Grid + Right/Bottom Deep-Dive Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Module Selector Buttons List */}
          <div className="lg:col-span-5 flex flex-col gap-2.5 max-h-[620px] overflow-y-auto pr-1 no-scrollbar">
            {showcaseContent.modules.map((mod, index) => {
              const Icon = moduleIcons[index % moduleIcons.length];
              const isActive = activeModuleIndex === index;

              return (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => setActiveModuleIndex(index)}
                  className={`w-full text-right p-3.5 sm:p-4 rounded-xl border transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer ${
                    isActive
                      ? "bg-primary/15 border-primary text-white shadow-lg shadow-primary/10 font-bold"
                      : "bg-white/[0.03] border-white/10 text-slate-300 hover:bg-white/[0.07] hover:border-white/20"
                  }`}
                  aria-pressed={isActive}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`size-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isActive
                          ? "bg-primary text-slate-950 font-black"
                          : "bg-white/10 text-slate-300"
                      }`}
                    >
                      <Icon className="size-4" />
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-bold truncate">{mod.name}</span>
                      <span className="text-[11px] text-slate-400 font-normal">
                        {mod.tag}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-xs font-mono px-2 py-0.5 rounded-full ${
                        isActive ? "bg-primary text-slate-950 font-bold" : "bg-white/10 text-slate-400"
                      }`}
                    >
                      {mod.number}
                    </span>
                    <ChevronLeft
                      className={`size-4 transition-transform ${
                        isActive ? "text-primary -translate-x-0.5" : "text-slate-500"
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Module Detail Interactive Stage */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md">
            {/* Ambient inner glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-6 border-b border-white/10">
              <div>
                <div className="inline-flex items-center gap-2 text-xs text-primary font-bold mb-1">
                  <span>ماژول تخصصی {activeModule.number}</span>
                  <span>•</span>
                  <span>{activeModule.tag}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold fat text-white">
                  {activeModule.name}
                </h3>
              </div>
              <div className="px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-bold">
                {activeModule.kpi}
              </div>
            </div>

            {/* Summary text */}
            <p className="text-sm sm:text-base text-slate-200 regular leading-relaxed mb-6">
              {activeModule.summary}
            </p>

            {/* Key Capabilities List */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-slate-400 mb-3 tracking-wide uppercase">
                قابلیت‌ها و خروجی‌های این ماژول:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeModule.capabilities.map((cap, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-xs sm:text-sm text-slate-300 p-2.5 rounded-lg bg-white/[0.02] border border-white/5"
                  >
                    <Check className="size-4 text-primary shrink-0 mt-0.5" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Software UI Preview Screen */}
            <div className="rounded-xl overflow-hidden border border-white/15 shadow-xl relative bg-slate-950 group">
              <Image
                src={activeModule.previewImage}
                alt={`نمای نرم‌افزاری ${activeModule.name}`}
                width={900}
                height={520}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-3 right-3 left-3 flex justify-between items-center text-[11px] text-slate-300 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                <span>نمای داشبورد عملیاتی نواتیک</span>
                <span className="text-primary font-bold">زنده و قابل اتصال</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
