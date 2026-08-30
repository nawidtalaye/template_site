"use client";

import { Check } from "lucide-react";

import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { plans } from "@/lib/showcase-content";

export default function Plans() {
  return (
    <section id="plans" className="relative overflow-hidden bg-white py-20 lg:py-28" aria-labelledby="plans-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index="۰۹" eyebrow={plans.eyebrow} title={plans.title} lead={plans.lead} />

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-3 lg:gap-0">
          {plans.plans.map((plan, index) => (
            <Reveal
              key={plan.key}
              delay={index * 120}
              y={36}
              duration={950}
              className={
                plan.highlight
                  ? "relative rounded-[28px] border border-primary/25 bg-primary/[0.05] p-7 lg:-mt-6 lg:mb-6 lg:mx-2 lg:p-9"
                  : "relative px-0 lg:px-9"
              }
            >
              {plan.highlight ? (
                <span className="absolute -top-3 right-7 rounded-full bg-primary px-3.5 py-1 text-[11px] font-black text-slate-900">
                  {plan.badge}
                </span>
              ) : null}

              <div className="flex items-start justify-between gap-3">
                <h3 className="text-[26px] font-black text-slate-900">{plan.name}</h3>
                {!plan.highlight ? (
                  <span className="mt-2 rounded-full border border-slate-200 px-3 py-1 text-[10.5px] font-bold text-slate-500">
                    {plan.badge}
                  </span>
                ) : null}
              </div>
              <p className="mt-1.5 text-[13px] font-medium text-slate-500">{plan.target}</p>

              <div className="mt-6 border-y border-slate-200/80 py-5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-[13px] font-black text-slate-900">{plan.price}</span>
                  <span className="text-[11.5px] text-slate-500">{plan.priceNote}</span>
                </div>
              </div>

              <p className="mt-5 text-[13.5px] leading-7 text-slate-600">{plan.summary}</p>

              <ul className="mt-6 flex flex-col gap-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-[13px] text-slate-700">
                    <span
                      className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/18 text-primary-ink"
                      aria-hidden="true"
                    >
                      <Check className="size-2.5" strokeWidth={3.5} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={
                  plan.highlight
                    ? "mt-8 flex items-center justify-center rounded-full bg-primary px-6 py-3.5 text-[14px] font-black text-slate-900 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover"
                    : "mt-8 flex items-center justify-center rounded-full border border-slate-300 px-6 py-3.5 text-[14px] font-black text-slate-800 transition-colors duration-300 hover:border-slate-900 hover:bg-slate-900 hover:text-white"
                }
              >
                {plan.cta}
              </a>
            </Reveal>
          ))}
        </div>

        {/* در همه پلن‌ها */}
        <Reveal y={24} delay={140} className="mt-16 border-t border-slate-200 pt-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <span className="text-[13px] font-black text-slate-900">{plans.includesTitle}</span>
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {plans.includes.map((item) => (
                <li key={item} className="flex items-center gap-2 text-[13px] text-slate-600">
                  <span className="h-1 w-1 rounded-full bg-primary" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-6 text-[11.5px] leading-6 text-slate-400">{plans.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
