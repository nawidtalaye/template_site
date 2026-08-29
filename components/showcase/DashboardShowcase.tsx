"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Activity,
  BarChart3,
  Coins,
  Fuel,
  Maximize2,
  Sparkles,
  Truck,
} from "lucide-react";
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
    <section
      id="showcase"
      className="py-16 lg:py-24 bg-slate-950 text-white relative overflow-hidden"
      aria-labelledby="dashboard-showcase-heading"
    >
      {/* Background glow effects */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-3.5">
            <Sparkles className="size-3.5" />
            <span>{showcaseContent.dashboardShowcase.eyebrow}</span>
          </div>
          <h2
            id="dashboard-showcase-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold fat leading-snug text-white mb-4"
          >
            {showcaseContent.dashboardShowcase.title}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed regular">
            {showcaseContent.dashboardShowcase.subtitle}
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex justify-center mb-8 sm:mb-10 overflow-x-auto pb-2 no-scrollbar">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-white/10 shadow-xl gap-1.5">
            {views.map((view) => {
              const Icon = viewIcons[view.id] || Activity;
              const isActive = view.id === activeViewId;

              return (
                <button
                  key={view.id}
                  type="button"
                  onClick={() => setActiveViewId(view.id)}
                  className={`flex items-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "bg-primary text-slate-950 font-bold shadow-lg shadow-primary/20"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                  aria-pressed={isActive}
                >
                  <Icon className={`size-4 ${isActive ? "text-slate-950" : "text-primary"}`} />
                  <span>{view.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active View Stage / Visual Showcase */}
        <div className="relative rounded-2xl sm:rounded-3xl border border-white/15 bg-slate-900/90 shadow-2xl p-4 sm:p-6 lg:p-8 backdrop-blur-md">
          {/* Top Bar for View Info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
            <div>
              <h3 className="text-lg sm:text-xl font-bold fat text-white mb-1">
                {activeView.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 regular">
                {activeView.desc}
              </p>
            </div>

            {/* Feature Tags */}
            <div className="flex flex-wrap items-center gap-1.5 shrink-0">
              {activeView.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] text-slate-300 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* High-Resolution Screen Mockup Container */}
          <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-slate-950 group">
            {/* Mac-style Window Top Header */}
            <div className="h-8 bg-slate-900 border-b border-white/10 px-4 flex items-center justify-between select-none">
              <div className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-red-500/80" />
                <span className="size-2.5 rounded-full bg-amber-500/80" />
                <span className="size-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                NovaTech Oil & Gas Suite • {activeView.label}
              </div>
              <div className="size-4" />
            </div>

            <div className="relative overflow-hidden">
              <Image
                src={activeView.image}
                alt={activeView.title}
                width={1600}
                height={900}
                priority
                sizes="(min-width: 1024px) 80vw, 100vw"
                className="w-full h-auto object-cover group-hover:scale-101 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
