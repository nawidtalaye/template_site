"use client";

import { Calculator, FileSpreadsheet, Fuel, GitBranch, Layers, LayoutDashboard, ShieldCheck, TrendingUp, Truck } from "lucide-react";
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
    <section id="features" className="py-16 lg:py-24 bg-slate-50 text-slate-900 relative overflow-hidden border-y border-slate-100" aria-labelledby="features-heading">
      <div className="absolute inset-0 bg-grid-light opacity-30 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-[#0f766e] text-xs font-bold mb-4 shadow-sm">قابلیت‌های کلیدی نرم‌افزار</div>
          <h2 id="features-heading" className="text-2xl sm:text-3xl md:text-[36px] font-black fat leading-snug text-slate-900 mb-4">امکانات پیشرفته برای چابکی عملیات و انضباط مالی</h2>
          <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">طراحی شده بر اساس واقعیت‌های اجرایی و ساختار پیچیده حسابداری صنعت نفت در افغانستان</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {showcaseContent.features.map((feature) => {
            const Icon = iconMap[feature.icon] || GitBranch;
            return (
              <div key={feature.id} className="group relative rounded-[20px] bg-white border border-slate-200 p-6 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)] hover:border-[#54dcc6]/40 hover:-translate-y-1 light-card-hover">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-medium text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full">{feature.category}</span>
                    <span className="text-[11px] px-2.5 py-1 rounded-full bg-[#54dcc6]/12 text-[#0f766e] border border-[#54dcc6]/20 font-bold">{feature.metrics}</span>
                  </div>
                  <div className="size-12 rounded-xl bg-[#54dcc6]/10 border border-[#54dcc6]/20 text-[#0f766e] flex items-center justify-center mb-4 group-hover:bg-[#54dcc6] group-hover:text-slate-900 transition-colors">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="text-[15px] font-bold text-slate-900 group-hover:text-[#0f766e] transition-colors mb-2">{feature.title}</h3>
                  <p className="text-[13px] text-slate-600 leading-relaxed">{feature.description}</p>
                </div>
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>سامانه نواتیک</span>
                  <span className="text-[#0f766e] font-bold">فعال ✓</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
