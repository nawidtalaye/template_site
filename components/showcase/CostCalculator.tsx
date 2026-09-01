"use client";

import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";

import Reveal from "@/components/motion/Reveal";
import { toPersianDigits } from "@/lib/format";
import { calculator, type CalculatorField } from "@/lib/showcase-content";

type Values = Record<CalculatorField["id"], number>;

const defaults = Object.fromEntries(
  calculator.fields.map((field) => [field.id, field.defaultValue]),
) as Values;

/** عدد فارسی با تعداد اعشار مشخص؛ اعشار با «/» مثل بقیه صفحه. */
function fa(value: number, decimals: number, grouping = false): string {
  const fixed = value.toFixed(decimals);
  const [int, frac] = fixed.split(".");
  const intFa = toPersianDigits(int, grouping);
  return frac ? `${intFa}/${toPersianDigits(frac)}` : intFa;
}

/**
 * محاسبه دقیق — ماشین‌حساب بهای تمام‌شده.
 * همان زبان بصری دفتری صفحه: ردیف‌های خط‌کشی‌شده، بدون قاب و سایه.
 * ورودی‌ها با کشویی تنظیم می‌شوند و ستون نتیجه همان لحظه به‌روز می‌شود.
 */
export default function CostCalculator() {
  const [values, setValues] = useState<Values>(defaults);

  const set = (id: CalculatorField["id"], value: number) =>
    setValues((prev) => ({ ...prev, [id]: value }));

  const isDirty = calculator.fields.some((field) => values[field.id] !== field.defaultValue);

  const result = useMemo(() => {
    const { volume, fob, freight, customs, loss, fx, sale } = values;
    const paidPerLiter = fob + freight + customs;
    const lossFactor = Math.max(0.0001, 1 - loss / 100);
    /** هزینه، روی لیترهایی که واقعاً قابل فروش‌اند سرشکن می‌شود */
    const costPerLiter = paidPerLiter / lossFactor;
    const deliveredLiters = volume * lossFactor;
    const totalCost = volume * paidPerLiter;
    const marginPerLiter = sale - costPerLiter;
    const totalMargin = deliveredLiters * sale - totalCost;

    const shares = [
      { id: "fob", value: fob / lossFactor },
      { id: "freight", value: freight / lossFactor },
      { id: "customs", value: customs / lossFactor },
      { id: "loss", value: costPerLiter - paidPerLiter },
    ].map((row) => ({ ...row, percent: (row.value / costPerLiter) * 100 }));

    return { costPerLiter, deliveredLiters, totalCost, marginPerLiter, totalMargin, shares };
  }, [values]);

  const shareTone = ["bg-primary", "bg-primary/60", "bg-slate-400", "bg-slate-300"];
  const labels = calculator.labels;

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
      {/* ------------------------------------------------------------ */}
      {/* معرفی + ورودی‌ها                                             */}
      {/* ------------------------------------------------------------ */}
      <div className="lg:col-span-5">
        <Reveal y={26}>
          <span className="flex items-center gap-3 text-[12px] font-bold text-primary-ink">
            <span className="h-px w-9 bg-primary" aria-hidden="true" />
            {calculator.eyebrow}
          </span>
          <h3 className="mt-4 text-[24px] font-black leading-[1.4] text-slate-900 sm:text-[30px]">
            {calculator.title}
          </h3>
          <p className="mt-4 text-[14px] leading-8 text-slate-600">{calculator.description}</p>
        </Reveal>

        <Reveal y={26} delay={100} className="mt-9">
          <div className="flex items-baseline justify-between gap-4 border-b border-slate-200 pb-3">
            <span className="text-[12px] font-black text-slate-900">{calculator.inputsTitle}</span>
            <button
              type="button"
              onClick={() => setValues(defaults)}
              className={`flex items-center gap-1.5 text-[11.5px] font-bold transition-all duration-300 ${
                isDirty ? "text-primary-ink opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <RotateCcw className="size-3" strokeWidth={2.5} />
              {calculator.resetLabel}
            </button>
          </div>

          <div className="flex flex-col">
            {calculator.fields.map((field) => (
              <div key={field.id} className="border-b border-slate-100 py-4">
                <div className="flex items-baseline justify-between gap-4">
                  <label htmlFor={`calc-${field.id}`} className="text-[13px] font-bold text-slate-700">
                    {field.label}
                  </label>
                  <span className="flex items-baseline gap-1.5">
                    <span className="num text-[14px] font-black text-slate-900">
                      {fa(values[field.id], field.decimals, field.id === "volume")}
                    </span>
                    <span className="text-[10.5px] text-slate-400">{field.unit}</span>
                  </span>
                </div>
                <input
                  id={`calc-${field.id}`}
                  type="range"
                  className="calc-range mt-3"
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  value={values[field.id]}
                  onChange={(event) => set(field.id, Number(event.target.value))}
                  aria-label={`${field.label} (${field.unit})`}
                />
                {field.note ? <p className="mt-1.5 text-[10.5px] text-slate-400">{field.note}</p> : null}
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* ------------------------------------------------------------ */}
      {/* نتیجه                                                        */}
      {/* ------------------------------------------------------------ */}
      <div className="lg:col-span-7">
        <Reveal delay={140} y={30} duration={1000} className="lg:sticky lg:top-28">
          <div aria-live="polite">
            <div className="flex flex-wrap items-end justify-between gap-6 border-b-2 border-primary pb-6">
              <div>
                <span className="text-[12px] font-bold text-slate-500">{labels.costPerLiter}</span>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="num text-[40px] font-black leading-none text-slate-900 sm:text-[48px]">
                    {fa(result.costPerLiter, 3)}
                  </span>
                  <span className="text-[12px] text-slate-500">{labels.usdPerLiter}</span>
                </div>
              </div>
              <div className="text-left">
                <span className="text-[11.5px] text-slate-400">{labels.costPerLiterAfn}</span>
                <div className="mt-1 flex items-baseline gap-1.5">
                  <span className="num text-[20px] font-black text-primary-ink">
                    {fa(result.costPerLiter * values.fx, 2)}
                  </span>
                  <span className="text-[10.5px] text-slate-400">{labels.afnPerLiter}</span>
                </div>
              </div>
            </div>

            {/* ترکیب بهای تمام‌شده — نوار تخت، بدون گرادیان */}
            <div className="mt-7">
              <span className="text-[11.5px] font-bold text-slate-400">{calculator.breakdown.title}</span>
              <div className="mt-3 flex h-2 w-full overflow-hidden rounded-full bg-slate-100" aria-hidden="true">
                {result.shares.map((share, index) => (
                  <span
                    key={share.id}
                    className={`${shareTone[index]} h-full transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]`}
                    style={{ width: `${share.percent}%` }}
                  />
                ))}
              </div>

              <ul className="mt-4">
                {calculator.breakdown.rows.map((row, index) => {
                  const share = result.shares[index];
                  return (
                    <li
                      key={row.id}
                      className="flex items-baseline justify-between gap-6 border-b border-slate-100 py-3"
                    >
                      <span className="flex items-center gap-2.5 text-[13px] text-slate-600">
                        <span className={`size-2 rounded-full ${shareTone[index]}`} aria-hidden="true" />
                        {row.label}
                      </span>
                      <span className="flex items-baseline gap-3">
                        <span className="num text-[11px] text-slate-400">٪{fa(share.percent, 1)}</span>
                        <span className="num w-16 text-left text-[14px] font-black text-slate-900">
                          {fa(share.value, 3)}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* جمع‌بندی محموله */}
            <div className="mt-6 grid gap-x-10 gap-y-4 sm:grid-cols-2">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-[12px] text-slate-500">{labels.deliveredLiters}</span>
                <span className="flex items-baseline gap-1.5">
                  <span className="num text-[14px] font-black text-slate-900">
                    {fa(result.deliveredLiters, 0, true)}
                  </span>
                  <span className="text-[10.5px] text-slate-400">{labels.liter}</span>
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-[12px] text-slate-500">{labels.totalCost}</span>
                <span className="flex items-baseline gap-1.5">
                  <span className="num text-[14px] font-black text-slate-900">{fa(result.totalCost, 0, true)}</span>
                  <span className="text-[10.5px] text-slate-400">{labels.usd}</span>
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-end justify-between gap-6 border-t border-slate-200 pt-5">
              <div>
                <span className="text-[12px] text-slate-500">{labels.marginPerLiter}</span>
                <div className="mt-1 flex items-baseline gap-1.5">
                  <span
                    className={`num text-[22px] font-black ${
                      result.marginPerLiter >= 0 ? "text-primary-ink" : "text-red-600"
                    }`}
                  >
                    {result.marginPerLiter < 0 ? "−" : ""}
                    {fa(Math.abs(result.marginPerLiter), 3)}
                  </span>
                  <span className="text-[10.5px] text-slate-400">{labels.usdPerLiter}</span>
                </div>
              </div>
              <div className="text-left">
                <span className="text-[12px] text-slate-500">{labels.totalMargin}</span>
                <div className="mt-1 flex items-baseline gap-1.5">
                  <span
                    className={`num text-[22px] font-black ${
                      result.totalMargin >= 0 ? "text-slate-900" : "text-red-600"
                    }`}
                  >
                    {result.totalMargin < 0 ? "−" : ""}
                    {fa(Math.abs(result.totalMargin), 0, true)}
                  </span>
                  <span className="text-[10.5px] text-slate-400">{labels.usd}</span>
                </div>
              </div>
            </div>

            <p className="mt-5 text-[11px] leading-6 text-slate-400">{calculator.caption}</p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
