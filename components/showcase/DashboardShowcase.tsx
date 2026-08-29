"use client";

import { useState } from "react";
import Image from "next/image";
import { Activity, BarChart3, Coins, Fuel, Sparkles, Truck } from "lucide-react";
import { showcaseContent } from "@/lib/showcase-content";

const viewIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  main: Activity,
  accounting: Coins,
  depot: Fuel,
  fleet: Truck,
  reports: BarChart3,
};

export default function DashboardShowcase() {
  const [activeViewId, setActiveViewId] = useState("main");
  const views = showcaseContent.dashboardShowcase.views;
  const activeView = views.find((v) => v.id === activeViewId) || views[0];

  return (
    <section id="showcase" className="py-16 lg:py-24 bg-white text-slate-900 relative overflow-hidden" aria-labelledby="dashboard-showcase-heading">
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#54dcc6]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-sky-100 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#54dcc6]/10 border border-[#54dcc6]/20 text-[#0f766e] text-xs font-bold mb-4"><Sparkles className="size-3.5" /><span>{showcaseContent.dashboardShowcase.eyebrow}</span></div>
          <h2 id="dashboard-showcase-heading" className="text-2xl sm:text-3xl md:text-[36px] font-black fat leading-snug text-slate-900 mb-4">{showcaseContent.dashboardShowcase.title}</h2>
          <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">{showcaseContent.dashboardShowcase.subtitle}</p>
        </div>

        <div className="flex justify-center mb-8 sm:mb-10 overflow-x-auto pb-2 no-scrollbar">
          <div className="inline-flex p-1.5 rounded-full bg-slate-50 border border-slate-200 shadow-sm gap-1.5">
            {views.map((view) => {
              const Icon = viewIcons[view.id] || Activity;
              const isActive = view.id === activeViewId;
              return (
                <button
                  key={view.id}
                  type="button"
                  onClick={() => setActiveViewId(view.id)}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-[13px] font-bold transition-all cursor-pointer whitespace-nowrap ${isActive ? "bg-slate-900 text-white shadow-md" : "text-slate-600 hover:text-slate-900 hover:bg-white"}`}
                  aria-pressed={isActive}
                >
                  <Icon className={`size-4 ${isActive ? "text-[#54dcc6]" : "text-slate-400"}`} />
                  <span>{view.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative rounded-[24px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
            <div>
              <h3 className="text-lg sm:text-xl font-black fat text-slate-900 mb-1">{activeView.title}</h3>
              <p className="text-[13px] sm:text-sm text-slate-600">{activeView.desc}</p>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 shrink-0">
              {activeView.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-[11px] text-slate-600 font-medium">{tag}</span>
              ))}
            </div>
          </div>

          <div className="relative rounded-[18px] overflow-hidden border border-slate-200 shadow-xl bg-slate-50 group">
            <div className="h-9 bg-white border-b border-slate-200 px-4 flex items-center justify-between select-none">
              <div className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-red-400" /><span className="size-2.5 rounded-full bg-amber-400" /><span className="size-2.5 rounded-full bg-emerald-400" /></div>
              <div className="text-[11px] text-slate-500 font-mono">NovaTech Oil & Gas Suite • {activeView.label}</div>
              <div className="size-4" />
            </div>
            <div className="relative overflow-hidden">
              <Image src={activeView.image} alt={activeView.title} width={1600} height={900} sizes="(min-width:1024px) 80vw, 100vw" className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-700" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
