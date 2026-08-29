"use client";

import {
  CheckCircle,
  Clock,
  DollarSign,
  Headset,
  Lock,
  PieChart,
  RefreshCw,
  Server,
  ShieldCheck,
} from "lucide-react";
import { showcaseContent } from "@/lib/showcase-content";

const benefitIcons = [
  CheckCircle,
  DollarSign,
  ShieldCheck,
  Server,
  RefreshCw,
  PieChart,
  Lock,
  Headset,
];

export default function Benefits() {
  return (
    <section
      id="benefits"
      className="py-16 lg:py-24 bg-slate-900 text-white relative overflow-hidden"
      aria-labelledby="benefits-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-3.5">
            <span>مزایای استراتژیک برای سازمان</span>
          </div>
          <h2
            id="benefits-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold fat leading-snug text-white mb-4"
          >
            چرا شرکت‌های برتر انرژی سامانه نواتیک را انتخاب می‌کنند؟
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed regular">
            دستیابی به حداکثر سودآوری، کنترل هدررفت فرآورده‌ها و شفافیت مطلق در گزارش‌های مالی
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {showcaseContent.benefits.map((benefit, index) => {
            const Icon = benefitIcons[index % benefitIcons.length];

            return (
              <div
                key={benefit.title}
                className="group p-5 sm:p-6 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-primary/40 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  <div className="size-11 rounded-xl bg-primary/10 group-hover:bg-primary group-hover:text-slate-950 text-primary border border-primary/20 flex items-center justify-center mb-4 transition-all duration-300">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-primary transition-colors duration-200 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed regular">
                    {benefit.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/5 flex items-center gap-1.5 text-xs text-primary font-medium">
                  <span>تأثیر تضمین شده نواتیک</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
