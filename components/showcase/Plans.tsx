"use client";

import { useState } from "react";
import { Check, ChevronLeft, Sparkles, X } from "lucide-react";
import { showcaseContent } from "@/lib/showcase-content";

export default function Plans() {
  const [activeCategoryKey, setActiveCategoryKey] = useState<string>("trade");
  const categories = showcaseContent.plans.categories;
  const currentCategory =
    categories.find((c) => c.key === activeCategoryKey) || categories[0];

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="plans"
      className="py-16 lg:py-24 bg-slate-950 text-white relative overflow-hidden"
      aria-labelledby="plans-heading"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/[0.04] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-3.5">
            <Sparkles className="size-3.5" />
            <span>{showcaseContent.plans.eyebrow}</span>
          </div>
          <h2
            id="plans-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold fat leading-snug text-white mb-4"
          >
            {showcaseContent.plans.title}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed regular">
            {showcaseContent.plans.subtitle}
          </p>

          {/* Category Switcher Tabs (Inspired by the original website's pricing tabs) */}
          <div className="flex justify-center mt-8">
            <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-white/15 shadow-xl max-w-full overflow-x-auto no-scrollbar gap-1">
              {categories.map((cat) => {
                const isActive = cat.key === activeCategoryKey;
                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setActiveCategoryKey(cat.key)}
                    className={`px-4 sm:px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                      isActive
                        ? "bg-primary text-slate-950 shadow-lg shadow-primary/25"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                    aria-pressed={isActive}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Category Description Banner */}
        <div className="text-center text-xs sm:text-sm text-slate-300 mb-8 max-w-2xl mx-auto">
          {currentCategory.description}
        </div>

        {/* 3-Tier Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {currentCategory.plans.map((plan) => {
            return (
              <div
                key={plan.key}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  plan.highlighted
                    ? "bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-primary shadow-2xl shadow-primary/10 lg:-translate-y-2"
                    : "bg-slate-900/80 border border-white/10 hover:border-white/20 shadow-xl"
                }`}
              >
                {/* Popular / Recommended Badge */}
                {plan.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-slate-950 text-xs font-black shadow-md flex items-center gap-1.5">
                    <Sparkles className="size-3.5" />
                    <span>{plan.badge}</span>
                  </div>
                )}

                <div>
                  {/* Plan Name & Target */}
                  <div className="mb-6 pb-6 border-b border-white/10">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="text-xl sm:text-2xl font-bold fat text-white">
                        {plan.name}
                      </h3>
                      {!plan.highlighted && (
                        <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300 font-medium">
                          {plan.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 regular">
                      {plan.target}
                    </p>

                    <div className="mt-4 pt-3 border-t border-white/5 flex items-baseline gap-1 text-primary">
                      <span className="text-sm font-medium text-slate-400">هزینه:</span>
                      <span className="text-sm sm:text-base font-bold text-white">
                        برآورد پس از نیازسنجی سازمان
                      </span>
                    </div>
                  </div>

                  {/* Feature Rows */}
                  <div className="mb-8">
                    <h4 className="text-xs font-bold text-slate-400 mb-4 tracking-wide uppercase">
                      امکانات و خدمات مشمول این پلن:
                    </h4>
                    <ul className="flex flex-col gap-3">
                      {plan.features.map((feature, fIdx) => (
                        <li
                          key={fIdx}
                          className={`flex items-start gap-2.5 text-xs sm:text-sm ${
                            feature.included ? "text-slate-200" : "text-slate-500 opacity-50"
                          }`}
                        >
                          {feature.included ? (
                            <Check className="size-4 text-primary shrink-0 mt-0.5" />
                          ) : (
                            <X className="size-4 text-slate-500 shrink-0 mt-0.5" />
                          )}
                          <span className={feature.included ? "font-medium" : "line-through"}>
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Plan CTA Button */}
                <button
                  type="button"
                  onClick={scrollToContact}
                  className={`w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
                    plan.highlighted
                      ? "bg-primary hover:bg-primary-hover text-slate-950 shadow-lg shadow-primary/20 active:scale-98"
                      : "bg-white/10 hover:bg-white/20 text-white border border-white/15"
                  }`}
                >
                  <span>درخواست دمو و ثبت سفارش</span>
                  <ChevronLeft className="size-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
