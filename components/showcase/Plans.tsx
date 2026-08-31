"use client";

import { useState } from "react";
import { Check, Minus } from "lucide-react";

import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { plans } from "@/lib/showcase-content";

type VariantId = keyof typeof plans.matrix;

/**
 * پلن‌ها — با ساختار صفحه‌ی خدمات نواتیک:
 * یک انتخاب‌گرِ نوع استقرار، سه ستون و یک فهرست مشترک که جلوی هر امکان
 * مشخص می‌کند در کدام پلن هست و در کدام نیست. خبری از قاب و سایه نیست؛
 * ستون‌ها را فقط یک خط عمودی و یک زمینه‌ی خیلی ملایم جدا می‌کند.
 */
export default function Plans() {
  const [variant, setVariant] = useState<VariantId>("cloud");
  const matrix = plans.matrix[variant];

  const includedCount = (column: number) => matrix.filter((row) => row[column]).length;

  return (
    <section id="plans" className="relative overflow-hidden bg-white py-20 lg:py-28" aria-labelledby="plans-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index="۰۹" eyebrow={plans.eyebrow} title={plans.title} lead={plans.lead} headingId="plans-heading" />

        {/* انتخاب نوع استقرار */}
        <Reveal y={20} className="mt-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-[12px] font-bold text-slate-400">{plans.toggleLabel}</span>

            <div
              role="group"
              aria-label={plans.toggleLabel}
              className="inline-flex items-center gap-1 self-start rounded-full border border-slate-200 p-1"
            >
              {plans.variants.map((option) => {
                const isActive = option.id === variant;
                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setVariant(option.id as VariantId)}
                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-bold transition-all duration-300 ${
                      isActive ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {option.label}
                    <span
                      className={`hidden text-[11px] font-medium sm:inline ${
                        isActive ? "text-white/60" : "text-slate-400"
                      }`}
                    >
                      {option.note}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* ---------------------------------------------------------- */}
        {/* ماتریس دسکتاپ                                              */}
        {/* ---------------------------------------------------------- */}
        <Reveal y={30} duration={1000} className="mt-8 hidden lg:block">
          <div className="grid grid-cols-12 items-end gap-0 border-b border-slate-200">
            <div className="col-span-6 pb-8">
              <span className="text-[11.5px] font-bold text-slate-400">امکانات هر پلن</span>
            </div>

            {plans.columns.map((plan, index) => (
              <div
                key={plan.key}
                className={`col-span-2 px-5 pb-8 ${plan.highlight ? "rounded-t-[20px] bg-primary/[0.06] pt-6" : ""}`}
              >
                <div className="flex items-center gap-2">
                  <h3 className="text-[19px] font-black text-slate-900">{plan.name}</h3>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-black ${
                      plan.highlight ? "bg-primary text-slate-900" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {plan.badge}
                  </span>
                </div>
                <p className="mt-2 min-h-[42px] text-[12px] leading-6 text-slate-500">{plan.target}</p>

                <div className="mt-4 border-t border-slate-200/80 pt-3">
                  <div className="text-[13px] font-black text-slate-900">{plan.price}</div>
                  <div className="mt-0.5 text-[11px] text-slate-400">{plan.priceNote}</div>
                </div>

                <div className="mt-4 text-[11.5px] font-bold text-slate-400">
                  <span className="num text-slate-700">{includedCount(index)}</span> از {matrix.length} امکان
                </div>

                <a
                  href="#contact"
                  className={`mt-4 flex items-center justify-center rounded-full px-4 py-2.5 text-[12.5px] font-black transition-all duration-300 ${
                    plan.highlight
                      ? "bg-primary text-slate-900 hover:bg-primary-hover"
                      : "border border-slate-300 text-slate-700 hover:border-slate-900 hover:bg-slate-900 hover:text-white"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>

          <ul>
            {plans.labels.map((label, rowIndex) => (
              <li
                key={label}
                className="grid grid-cols-12 items-center border-b border-slate-100 transition-colors duration-300 hover:bg-slate-50/70"
              >
                <span className="col-span-6 py-3.5 text-[13.5px] text-slate-700">{label}</span>

                {plans.columns.map((plan, columnIndex) => {
                  const has = matrix[rowIndex][columnIndex];
                  const last = rowIndex === plans.labels.length - 1;
                  return (
                    <span
                      key={plan.key}
                      className={`col-span-2 flex items-center justify-center px-5 py-3.5 ${
                        plan.highlight ? `bg-primary/[0.06] ${last ? "rounded-b-[20px]" : ""}` : ""
                      }`}
                    >
                      <span
                        className={`flex size-6 items-center justify-center rounded-full ${
                          has ? "bg-primary/18 text-primary-ink" : "text-slate-300"
                        }`}
                        title={has ? "شامل این پلن" : "در این پلن نیست"}
                      >
                        {has ? (
                          <Check className="size-3.5" strokeWidth={3} />
                        ) : (
                          <Minus className="size-3.5" strokeWidth={3} />
                        )}
                        <span className="sr-only">{has ? "شامل این پلن است" : "در این پلن نیست"}</span>
                      </span>
                    </span>
                  );
                })}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* ---------------------------------------------------------- */}
        {/* موبایل و تبلت — هر پلن جداگانه با فهرست خودش               */}
        {/* ---------------------------------------------------------- */}
        <div className="mt-10 flex flex-col gap-12 lg:hidden">
          {plans.columns.map((plan, index) => {
            const rows = plans.labels
              .map((label, rowIndex) => ({ label, has: matrix[rowIndex][index] }))
              .filter((row) => row.has);

            return (
              <Reveal
                key={plan.key}
                delay={index * 90}
                y={30}
                duration={900}
                className={plan.highlight ? "-mx-2 rounded-[24px] bg-primary/[0.06] px-5 py-7" : ""}
              >
                <div className="flex items-center gap-2">
                  <h3 className="text-[21px] font-black text-slate-900">{plan.name}</h3>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-black ${
                      plan.highlight ? "bg-primary text-slate-900" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {plan.badge}
                  </span>
                </div>
                <p className="mt-2 text-[12.5px] leading-6 text-slate-500">{plan.target}</p>

                <div className="mt-5 flex items-baseline justify-between gap-3 border-y border-slate-200/80 py-4">
                  <span className="text-[14px] font-black text-slate-900">{plan.price}</span>
                  <span className="text-[11.5px] text-slate-500">{plan.priceNote}</span>
                </div>

                <ul className="mt-5 flex flex-col gap-2.5">
                  {rows.map((row) => (
                    <li key={row.label} className="flex items-start gap-2.5 text-[13px] leading-6 text-slate-600">
                      <span
                        className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/18 text-primary-ink"
                        aria-hidden="true"
                      >
                        <Check className="size-2.5" strokeWidth={3.5} />
                      </span>
                      {row.label}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`mt-7 flex items-center justify-center rounded-full px-6 py-3.5 text-[14px] font-black transition-colors duration-300 ${
                    plan.highlight
                      ? "bg-primary text-slate-900 hover:bg-primary-hover"
                      : "border border-slate-300 text-slate-800 hover:border-slate-900 hover:bg-slate-900 hover:text-white"
                  }`}
                >
                  {plan.cta}
                </a>
              </Reveal>
            );
          })}
        </div>

        {/* در همه پلن‌ها */}
        <Reveal y={24} delay={120} className="mt-16 border-t border-slate-200 pt-8">
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
