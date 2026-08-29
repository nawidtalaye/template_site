"use client";

import { CheckCircle, DollarSign, Headset, Lock, PieChart, RefreshCw, Server, ShieldCheck } from "lucide-react";
import { showcaseContent } from "@/lib/showcase-content";

const benefitIcons = [CheckCircle, DollarSign, ShieldCheck, Server, RefreshCw, PieChart, Lock, Headset];

export default function Benefits() {
  return (
    <section id="benefits" className="py-16 lg:py-24 bg-slate-50 text-slate-900 relative overflow-hidden border-y border-slate-100" aria-labelledby="benefits-heading">
      <div className="absolute inset-0 bg-grid-light opacity-30 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-[#0f766e] text-xs font-bold mb-4 shadow-sm">مزایای استراتژیک برای سازمان</div>
          <h2 id="benefits-heading" className="text-2xl sm:text-3xl md:text-[36px] font-black fat leading-snug text-slate-900 mb-4">چرا شرکت‌های برتر انرژی سامانه نواتیک را انتخاب می‌کنند؟</h2>
          <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">دستیابی به حداکثر سودآوری، کنترل هدررفت فرآورده‌ها و شفافیت مطلق در گزارش‌های مالی</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {showcaseContent.benefits.map((benefit, index) => {
            const Icon = benefitIcons[index % benefitIcons.length];
            return (
              <div key={benefit.title} className="group p-6 rounded-[20px] bg-white border border-slate-200 hover:border-[#54dcc6]/40 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)] hover:-translate-y-1 transition-all flex flex-col justify-between light-card-hover">
                <div>
                  <div className="size-11 rounded-xl bg-[#54dcc6]/10 border border-[#54dcc6]/20 text-[#0f766e] flex items-center justify-center mb-4 group-hover:bg-[#54dcc6] group-hover:text-slate-900 transition-colors">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-[15px] font-bold text-slate-900 group-hover:text-[#0f766e] transition-colors mb-2">{benefit.title}</h3>
                  <p className="text-[13px] text-slate-600 leading-relaxed">{benefit.desc}</p>
                </div>
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-[#0f766e] font-bold"><span>تأثیر تضمین شده نواتیک</span></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
