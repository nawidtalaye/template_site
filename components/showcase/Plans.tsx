"use client";

import { useState } from "react";
import { Check, ChevronLeft, Sparkles, X } from "lucide-react";
import { showcaseContent } from "@/lib/showcase-content";

export default function Plans() {
  const [activeCategoryKey, setActiveCategoryKey] = useState<string>("trade");
  const categories = showcaseContent.plans.categories;
  const currentCategory = categories.find((c) => c.key === activeCategoryKey) || categories[0];

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="plans" className="py-16 lg:py-24 bg-white text-slate-900 relative overflow-hidden" aria-labelledby="plans-heading">
      {/* Balloon graphics background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="balloon w-[72px] h-[88px] top-[8%] left-[6%] opacity-80" style={{ animationDelay: "0s" }} />
        <div className="balloon w-[54px] h-[66px] top-[18%] right-[8%] opacity-70" style={{ animationDelay: "1.2s" }} />
        <div className="balloon w-[64px] h-[78px] bottom-[22%] left-[10%] opacity-60" style={{ animationDelay: "0.6s" }} />
        <div className="balloon w-[48px] h-[58px] bottom-[12%] right-[12%] opacity-50" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#54dcc6]/[0.05] rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#54dcc6]/10 border border-[#54dcc6]/20 text-[#0f766e] text-xs font-bold mb-4"><Sparkles className="size-3.5" /><span>{showcaseContent.plans.eyebrow}</span></div>
          <h2 id="plans-heading" className="text-2xl sm:text-3xl md:text-[36px] font-black fat leading-snug text-slate-900 mb-4">{showcaseContent.plans.title}</h2>
          <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">{showcaseContent.plans.subtitle}</p>

          <div className="flex justify-center mt-8">
            <div className="inline-flex p-1.5 rounded-full bg-slate-50 border border-slate-200 shadow-sm max-w-full overflow-x-auto no-scrollbar gap-1">
              {categories.map((cat) => {
                const isActive = cat.key === activeCategoryKey;
                return (
                  <button key={cat.key} type="button" onClick={() => setActiveCategoryKey(cat.key)} className={`px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-[13px] font-bold transition-all cursor-pointer whitespace-nowrap ${isActive ? "bg-slate-900 text-white shadow-md" : "text-slate-600 hover:text-slate-900 hover:bg-white"}`} aria-pressed={isActive}>{cat.label}</button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="text-center text-xs sm:text-[13px] text-slate-500 mb-8 max-w-2xl mx-auto bg-slate-50 border border-slate-200 rounded-full px-4 py-2 inline-flex mx-auto w-fit justify-center">{currentCategory.description}</div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch max-w-6xl mx-auto">
          {currentCategory.plans.map((plan) => (
            <div key={plan.key} className={`relative rounded-[24px] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${plan.highlighted ? "bg-slate-900 text-white border-2 border-[#54dcc6] shadow-[0_20px_60px_rgba(15,23,42,0.18)] lg:-translate-y-2 lg:scale-[1.02]" : "bg-white border border-slate-200 shadow-[0_12px_32px_rgba(15,23,42,0.06)] hover:shadow-[0_20px_50px_rgba(15,23,42,0.10)]"}`}>
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[#54dcc6] text-slate-900 text-xs font-black shadow-md flex items-center gap-1.5">
                  <Sparkles className="size-3.5" /><span>{plan.badge}</span>
                </div>
              )}
              <div>
                <div className="mb-6 pb-6 border-b border-slate-200/60">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className={`text-xl sm:text-2xl font-black fat ${plan.highlighted ? "text-white" : "text-slate-900"}`}>{plan.name}</h3>
                    {!plan.highlighted && <span className="text-[11px] px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600 font-medium">{plan.badge}</span>}
                  </div>
                  <p className={`text-xs sm:text-[13px] ${plan.highlighted ? "text-slate-300" : "text-slate-600"}`}>{plan.target}</p>
                  <div className={`mt-4 pt-3 border-t ${plan.highlighted ? "border-white/10" : "border-slate-100"} flex items-baseline gap-1.5`}>
                    <span className={`text-[11px] font-medium ${plan.highlighted ? "text-slate-400" : "text-slate-500"}`}>هزینه:</span>
                    <span className={`text-sm font-bold ${plan.highlighted ? "text-white" : "text-slate-900"}`}>برآورد پس از نیازسنجی</span>
                  </div>
                </div>
                <div className="mb-8">
                  <h4 className={`text-[11px] font-bold mb-4 tracking-wide uppercase ${plan.highlighted ? "text-slate-400" : "text-slate-500"}`}>امکانات این پلن:</h4>
                  <ul className="flex flex-col gap-3">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className={`flex items-start gap-2.5 text-[13px] ${feature.included ? (plan.highlighted ? "text-slate-200" : "text-slate-700") : "text-slate-400 opacity-60"}`}>
                        {feature.included ? <Check className="size-4 text-[#54dcc6] shrink-0 mt-0.5" /> : <X className="size-4 text-slate-400 shrink-0 mt-0.5" />}
                        <span className={feature.included ? "font-medium" : "line-through"}>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <button type="button" onClick={scrollToContact} className={`w-full py-3.5 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${plan.highlighted ? "bg-[#54dcc6] hover:bg-[#45bba7] text-slate-900 shadow-[0_8px_20px_rgba(84,220,198,0.3)]" : "bg-slate-900 hover:bg-black text-white"}`}>
                <span>درخواست دمو و ثبت سفارش</span><ChevronLeft className="size-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
