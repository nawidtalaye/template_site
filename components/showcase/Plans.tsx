"use client";

import { useState } from "react";
import { Check, Minus } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { showcaseContent } from "@/lib/showcase-content";

export default function Plans() {
  const { plans } = showcaseContent;
  const [activeKey, setActiveKey] = useState(plans.categories[0].key);
  const category = plans.categories.find((item) => item.key === activeKey) ?? plans.categories[0];

  return (
    <section id="plans" className="bg-slate-50 py-20 lg:py-28" aria-labelledby="plans-heading">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow={plans.eyebrow} title={plans.title} description={plans.subtitle} />
        </Reveal>

        <Reveal delay={60}>
          <div
            role="tablist"
            aria-label="نوع فعالیت"
            className="mt-9 flex flex-wrap justify-center gap-2"
          >
            {plans.categories.map((item) => {
              const isActive = item.key === activeKey;
              return (
                <button
                  key={item.key}
                  id={`plan-tab-${item.key}`}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  aria-controls="plan-panel"
                  onClick={() => setActiveKey(item.key)}
                  className={`rounded-full px-5 py-2.5 text-[12.5px] font-bold transition-colors sm:px-6 ${
                    isActive
                      ? "bg-slate-900 text-white"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div
          id="plan-panel"
          role="tabpanel"
          aria-labelledby={`plan-tab-${category.key}`}
          key={category.key}
          className="panel-swap mt-6"
        >
          <p className="text-center text-[12.5px] text-slate-500">{category.description}</p>

          <div className="mt-8 grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
            {category.plans.map((plan, index) => (
              <Reveal key={plan.key} delay={index * 80} className="h-full">
                <div
                  className={`flex h-full flex-col rounded-[6px] p-7 ${
                    plan.highlighted
                      ? "border-2 border-[#54dcc6] bg-slate-900"
                      : "border border-slate-200 bg-white"
                  }`}
                >
                  <div>
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-[11px] font-bold ${
                        plan.highlighted
                          ? "bg-[#54dcc6] text-slate-900"
                          : "border border-slate-200 bg-slate-50 text-slate-500"
                      }`}
                    >
                      {plan.badge}
                    </span>
                    <h3
                      className={`mt-4 text-[19px] font-black ${
                        plan.highlighted ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {plan.name}
                    </h3>
                    <p className={`mt-1.5 text-[13px] ${plan.highlighted ? "text-slate-300" : "text-slate-600"}`}>
                      {plan.target}
                    </p>
                    <p
                      className={`mt-5 border-t pt-4 text-[12.5px] ${
                        plan.highlighted ? "border-white/10 text-slate-400" : "border-slate-100 text-slate-500"
                      }`}
                    >
                      شامل استقرار، آموزش پرسنل و پشتیبانی
                    </p>
                  </div>

                  <ul className="mt-6 flex flex-col gap-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature.text}
                        className={`flex items-start gap-2.5 text-[13px] leading-[1.85] ${
                          feature.included
                            ? plan.highlighted
                              ? "text-slate-100"
                              : "text-slate-700"
                            : plan.highlighted
                              ? "text-slate-500"
                              : "text-slate-400"
                        }`}
                      >
                        {feature.included ? (
                          <Check className="mt-1 size-4 shrink-0 text-[#54dcc6]" aria-hidden="true" />
                        ) : (
                          <Minus className="mt-1 size-4 shrink-0 opacity-60" aria-hidden="true" />
                        )}
                        <span className={feature.included ? "" : "line-through decoration-slate-300"}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    className={`mt-7 block rounded-full py-3 text-center text-[13.5px] font-bold transition-colors ${
                      plan.highlighted
                        ? "bg-[#54dcc6] text-slate-900 hover:bg-[#45bba7]"
                        : "bg-slate-900 text-white hover:bg-slate-800"
                    }`}
                  >
                    درخواست دمو
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
