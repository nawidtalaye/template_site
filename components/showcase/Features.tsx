"use client";

import {
  Calculator,
  FileSpreadsheet,
  Fuel,
  GitBranch,
  Layers,
  LayoutDashboard,
  ShieldCheck,
  TrendingUp,
  Truck,
} from "lucide-react";
import { showcaseContent } from "@/lib/showcase-content";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  calculator: Calculator,
  "file-text": FileSpreadsheet,
  cylinder: Fuel,
  truck: Truck,
  "trending-up": TrendingUp,
  "shield-alert": ShieldCheck,
  "layout-dashboard": LayoutDashboard,
  lock: ShieldCheck,
};

export default function Features() {
  return (
    <section
      id="features"
      className="py-16 lg:py-24 bg-slate-900 text-white relative overflow-hidden"
      aria-labelledby="features-heading"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(#54dcc6_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-3.5">
            <span>قابلیت‌های کلیدی نرم‌افزار</span>
          </div>
          <h2
            id="features-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold fat leading-snug text-white mb-4"
          >
            امکانات پیشرفته برای چابکی عملیات و انضباط مالی
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed regular">
            طراحی شده بر اساس واقعیت‌های اجرایی و ساختار پیچیده حسابداری صنعت نفت در افغانستان
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {showcaseContent.features.map((feature) => {
            const Icon = iconMap[feature.icon] || GitBranch;

            return (
              <div
                key={feature.id}
                className="group relative rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-primary/40 p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
              >
                <div>
                  {/* Category Pill & Metrics Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-medium text-slate-400">
                      {feature.category}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/30 font-semibold">
                      {feature.metrics}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="size-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/25 text-primary flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary group-hover:text-slate-950 transition-all duration-300">
                    <Icon className="size-6" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base font-bold text-white group-hover:text-primary transition-colors duration-200 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed regular">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 group-hover:text-slate-200 transition-colors">
                  <span>سامانه نواتیک</span>
                  <span className="text-primary font-bold">فعال ✓</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
