"use client";

import { useState } from "react";
import { Check, Minus } from "lucide-react";

import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { plans } from "@/lib/showcase-content";

type VariantId = keyof typeof plans.matrix;

/**
 * پلن‌ها — با همان ساختار بخش «امکانات هر پلن» در سایت نواتیک:
 * یک انتخاب‌گر بالای بخش نوع استقرار را عوض می‌کند و سه پلن کنار هم
 * می‌نشینند؛ هر پلن فهرست «کامل» امکانات را دارد و جلوی هر ردیف مشخص
 * است که «شامل این پلن» هست یا «در این پلن نیست». ستون‌ها قاب و سایه
 * ندارند؛ فقط خط جداکننده و یک زمینه‌ی ملایم برای پلن پیشنهادی.
 */
export default function Plans() {
  const [variant, setVariant] = useState<VariantId>("cloud");
  const [mobilePlan, setMobilePlan] = useState(1);
  const matrix = plans.matrix[variant];

  const includedCount = (column: number) => matrix.filter((row) => row[column]).length;

  const featureRows = (column: number) =>
    plans.labels.map((label, rowIndex) => ({ label, has: matrix[rowIndex][column] }));

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
        {/* دسکتاپ — سه پلن کنار هم، هر کدام با فهرست کامل امکانات       */}
        {/* ---------------------------------------------------------- */}
        <Reveal y={30} duration={1000} className="mt-10 hidden lg:block">
          <div className="grid grid-cols-3">
            {plans.columns.map((plan, index) => (
              <div
                key={plan.key}
                className={`flex flex-col px-7 pb-8 pt-7 ${
                  plan.highlight
                    ? "rounded-[24px] bg-primary/[0.06]"
                    : index > 0
                      ? "border-s border-slate-200/80"
                      : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <h3 className="text-[20px] font-black text-slate-900">{plan.name}</h3>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-black ${
                      plan.highlight ? "bg-primary text-slate-900" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {plan.badge}
                  </span>
                </div>
                <p className="mt-2 min-h-[42px] text-[12px] leading-6 text-slate-500">{plan.target}</p>

                <div className="mt-4 flex items-baseline justify-between gap-3 border-y border-slate-200/80 py-3.5">
                  <div>
                    <div className="text-[13.5px] font-black text-slate-900">{plan.price}</div>
                    <div className="mt-0.5 text-[11px] text-slate-400">{plan.priceNote}</div>
                  </div>
                  <span className="text-[11.5px] font-bold text-slate-400">
                    <span className="num text-slate-700">{includedCount(index)}</span> از {plans.labels.length} امکان
                  </span>
                </div>

                {/* فهرست کامل امکانات — مثل نواتیک، شامل و غیرشامل کنار هم */}
                <ul key={variant} className="mt-2 flex-1 animate-[swap_0.55s_cubic-bezier(0.16,1,0.3,1)_both]">
                  {featureRows(index).map((row) => (
                    <li
                      key={row.label}
                      className="flex items-start gap-2.5 border-b border-slate-100 py-2.5 last:border-b-0"
                    >
                      <span
                        className={`mt-1 flex size-4 shrink-0 items-center justify-center rounded-full ${
                          row.has ? "bg-primary/18 text-primary-ink" : "text-slate-300"
                        }`}
                        aria-hidden="true"
                      >
                        {row.has ? (
                          <Check className="size-2.5" strokeWidth={3.5} />
                        ) : (
                          <Minus className="size-2.5" strokeWidth={3.5} />
                        )}
                      </span>
                      <span className={`text-[12.5px] leading-6 ${row.has ? "text-slate-700" : "text-slate-400"}`}>
                        {row.label}
                        <span className="sr-only">{row.has ? " — شامل این پلن" : " — در این پلن نیست"}</span>
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`mt-7 flex items-center justify-center rounded-full px-4 py-3 text-[13px] font-black transition-all duration-300 ${
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
        </Reveal>

        {/* ---------------------------------------------------------- */}
        {/* موبایل و تبلت — انتخاب پلن و فهرست کامل همان پلن            */}
        {/* ---------------------------------------------------------- */}
        <div className="mt-10 lg:hidden">
          <Reveal y={24}>
            <div role="tablist" aria-label="انتخاب پلن" className="flex border-b border-slate-200">
              {plans.columns.map((plan, index) => {
                const isActive = index === mobilePlan;
                return (
                  <button
                    key={plan.key}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setMobilePlan(index)}
                    className={`relative flex-1 pb-3 pt-2 text-center text-[14px] font-black transition-colors duration-300 ${
                      isActive ? "text-slate-900" : "text-slate-400"
                    }`}
                  >
                    {plan.name}
                    <span
                      className={`absolute inset-x-4 bottom-0 h-[2.5px] rounded-full bg-primary transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>
          </Reveal>

          {(() => {
            const plan = plans.columns[mobilePlan];
            return (
              <div
                key={`${plan.key}-${variant}`}
                className={`animate-[swap_0.55s_cubic-bezier(0.16,1,0.3,1)_both] ${
                  plan.highlight ? "-mx-2 mt-6 rounded-[24px] bg-primary/[0.06] px-5 py-7" : "mt-6"
                }`}
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

                <ul className="mt-4">
                  {featureRows(mobilePlan).map((row) => (
                    <li
                      key={row.label}
                      className="flex items-start gap-2.5 border-b border-slate-100 py-2.5 last:border-b-0"
                    >
                      <span
                        className={`mt-1 flex size-4 shrink-0 items-center justify-center rounded-full ${
                          row.has ? "bg-primary/18 text-primary-ink" : "text-slate-300"
                        }`}
                        aria-hidden="true"
                      >
                        {row.has ? (
                          <Check className="size-2.5" strokeWidth={3.5} />
                        ) : (
                          <Minus className="size-2.5" strokeWidth={3.5} />
                        )}
                      </span>
                      <span className={`text-[13px] leading-6 ${row.has ? "text-slate-700" : "text-slate-400"}`}>
                        {row.label}
                        <span className="sr-only">{row.has ? " — شامل این پلن" : " — در این پلن نیست"}</span>
                      </span>
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
              </div>
            );
          })()}
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
