"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, ChevronLeft, Coins, FileCheck2, Fuel, Gauge, Layers, PieChart, ShieldAlert, Truck, Users2 } from "lucide-react";
import { showcaseContent } from "@/lib/showcase-content";

const moduleIcons = [Coins, Coins, FileCheck2, Fuel, Truck, Layers, FileCheck2, ShieldAlert, Gauge, Users2];

export default function Modules() {
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const activeModule = showcaseContent.modules[activeModuleIndex];

  return (
    <section id="modules" className="py-16 lg:py-24 bg-white text-slate-900 relative overflow-hidden" aria-labelledby="modules-heading">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-[#54dcc6]/[0.06] rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#54dcc6]/10 border border-[#54dcc6]/20 text-[#0f766e] text-xs font-bold mb-4">ماژول‌های تخصصی سامانه</div>
          <h2 id="modules-heading" className="text-2xl sm:text-3xl md:text-[36px] font-black fat leading-snug text-slate-900 mb-4">۱۰ ماژول یکپارچه برای پوشش کامل چرخه انرژی</h2>
          <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">روی هر ماژول کلیک کنید تا عملکرد، امکانات و نمای نرم‌افزاری آن را با موشن تعاملی مشاهده نمایید.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 flex flex-col gap-2.5 max-h-[640px] overflow-y-auto pr-1 no-scrollbar">
            {showcaseContent.modules.map((mod, index) => {
              const Icon = moduleIcons[index % moduleIcons.length];
              const isActive = activeModuleIndex === index;
              return (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => setActiveModuleIndex(index)}
                  className={`w-full text-right p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-3 cursor-pointer text-right ${
                    isActive ? "bg-[#54dcc6]/12 border-[#54dcc6]/40 text-slate-900 shadow-[0_10px_28px_rgba(84,220,198,0.18)] font-bold scale-[1.01]" : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:shadow-sm"
                  }`}
                  aria-pressed={isActive}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`size-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${isActive ? "bg-[#54dcc6] text-slate-900" : "bg-slate-50 border border-slate-200 text-slate-500"}`}>
                      <Icon className="size-4" />
                    </span>
                    <div className="flex flex-col min-w-0 text-right">
                      <span className="text-[13px] font-bold truncate">{mod.name}</span>
                      <span className="text-[11px] text-slate-500 font-medium">{mod.tag}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-xs font-mono px-2.5 py-1 rounded-full ${isActive ? "bg-[#54dcc6] text-slate-900 font-bold" : "bg-slate-50 border border-slate-200 text-slate-500"}`}>{mod.number}</span>
                    <ChevronLeft className={`size-4 transition-transform ${isActive ? "text-[#0f766e] -translate-x-0.5" : "text-slate-400"}`} />
                  </div>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-[24px] p-6 sm:p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#54dcc6]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-6 border-b border-slate-100 relative z-10">
              <div>
                <div className="inline-flex items-center gap-2 text-xs text-[#0f766e] font-bold mb-1.5"><span>ماژول تخصصی {activeModule.number}</span><span>•</span><span>{activeModule.tag}</span></div>
                <h3 className="text-xl sm:text-2xl font-black fat text-slate-900">{activeModule.name}</h3>
              </div>
              <div className="px-3.5 py-1.5 rounded-full bg-slate-900 text-[#54dcc6] text-xs font-bold border border-slate-800">{activeModule.kpi}</div>
            </div>

            <p className="text-sm sm:text-[15px] text-slate-700 leading-relaxed mb-6 relative z-10">{activeModule.summary}</p>

            <div className="mb-7 relative z-10">
              <h4 className="text-[11px] font-bold text-slate-500 mb-3 tracking-wide">قابلیت‌ها و خروجی‌های این ماژول:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeModule.capabilities.map((cap, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-[13px] text-slate-700 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <Check className="size-4 text-[#0f766e] shrink-0 mt-0.5" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[18px] overflow-hidden border border-slate-200 shadow-lg relative bg-slate-50 group">
              <Image src={activeModule.previewImage} alt={`نمای ${activeModule.name}`} width={900} height={520} sizes="(min-width:1024px) 50vw, 100vw" className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 right-3 left-3 flex justify-between items-center text-[11px] text-slate-700 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-full border border-slate-200 shadow-sm">
                <span>نمای داشبورد عملیاتی نواتیک</span>
                <span className="text-[#0f766e] font-bold">زنده و قابل اتصال</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
