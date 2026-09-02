"use client";

import { useMemo, useState } from "react";
import { RotateCcw, TrendingDown, TrendingUp } from "lucide-react";

import Reveal from "@/components/motion/Reveal";
import { toPersianDigits } from "@/lib/format";
import { calculator, type CalculatorField } from "@/lib/showcase-content";

type Values = Record<CalculatorField["id"], number>;

const defaults = Object.fromEntries(
  calculator.fields.map((field) => [field.id, field.defaultValue]),
) as Values;

/** رنگ هر قلمِ هزینه — معنادار، نه تزئینی: هر رنگ یک‌بار در کل صفحه همین معنا را می‌دهد. */
const SHARE_COLOR: Record<string, string> = {
  fob: "#54dcc6", // خرید — رنگ برند
  freight: "#38bdf8", // حمل و ترانزیت — مسیر
  customs: "#a78bfa", // گمرک و عوارض — نهاد رسمی
  loss: "#fbbf24", // افت و تبخیر — هشدار ملایم
};

/** عدد فارسی با تعداد اعشار مشخص؛ اعشار با «/» مثل بقیه صفحه. */
function fa(value: number, decimals: number, grouping = false): string {
  const fixed = value.toFixed(decimals);
  const [int, frac] = fixed.split(".");
  const intFa = toPersianDigits(int, grouping);
  return frac ? `${intFa}/${toPersianDigits(frac)}` : intFa;
}

const R = 54;
const CIRC = 2 * Math.PI * R;

/**
 * محاسبه دقیق — برگه‌ی تسویه‌ی محموله.
 *
 * زبان بصری عمداً از بقیه صفحه فاصله می‌گیرد: یک پنل تیره‌ی «تحلیلی»، شبیه
 * صفحه‌ی خروجی نرم‌افزارهای مالی واقعی — نه یک کارت روشنِ نرم و ژنریک.
 * سمت راست ورودی‌های محموله، سمت چپ نمودار حلقه‌ای ترکیب هزینه و دو کارتِ
 * سود/زیان با نشانه‌ی جهت‌دار. رنگ هر بخش معنادار است، نه دکوری.
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
    ].map((row) => ({ ...row, percent: Math.max(0, (row.value / costPerLiter) * 100) }));

    // افست تجمعی هر کمان، برای رسم پیوسته‌ی نمودار حلقه‌ای
    let cumulative = 0;
    const arcs = shares.map((row) => {
      const dash = (row.percent / 100) * CIRC;
      const arc = { ...row, dash, offset: cumulative };
      cumulative += dash;
      return arc;
    });

    return { costPerLiter, deliveredLiters, totalCost, marginPerLiter, totalMargin, shares, arcs };
  }, [values]);

  const labels = calculator.labels;
  const isProfit = result.marginPerLiter >= 0;

  return (
    <div>
      <Reveal y={26}>
        <span className="flex items-center gap-3 text-[13.5px] font-bold text-primary-ink">
          <span className="h-px w-9 bg-primary" aria-hidden="true" />
          {calculator.eyebrow}
        </span>
        <h3 className="mt-4 max-w-2xl text-[26px] font-black leading-[1.4] text-slate-900 sm:text-[34px]">
          {calculator.title}
        </h3>
        <p className="mt-4 max-w-2xl text-[14px] leading-8 text-slate-600">{calculator.description}</p>
      </Reveal>

      <Reveal y={30} delay={100} duration={1000} className="mt-10">
        <div className="overflow-hidden rounded-[26px] bg-slate-950 text-white shadow-[0_44px_90px_-45px_rgba(8,15,30,0.65)]">
          <div className="grid lg:grid-cols-[1fr_1.1fr]">
            {/* ------------------------------------------------------ */}
            {/* ورودی‌ها — مشخصات محموله                                 */}
            {/* ------------------------------------------------------ */}
            <div className="border-b border-white/10 p-7 sm:p-9 lg:border-b-0 lg:border-e lg:border-white/10">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-[13.5px] font-black tracking-wide text-white/90">
                  {calculator.inputsTitle}
                </span>
                <button
                  type="button"
                  onClick={() => setValues(defaults)}
                  className={`flex items-center gap-1.5 text-[12.5px] font-bold text-primary transition-opacity duration-300 ${
                    isDirty ? "opacity-100" : "pointer-events-none opacity-0"
                  }`}
                >
                  <RotateCcw className="size-3" strokeWidth={2.5} />
                  {calculator.resetLabel}
                </button>
              </div>

              <div className="mt-2 flex flex-col divide-y divide-white/[0.07]">
                {calculator.fields.map((field) => {
                  const delta = values[field.id] - field.defaultValue;
                  const hasDelta = Math.abs(delta) > field.step / 2;
                  return (
                    <div key={field.id} className="py-4">
                      <div className="flex items-baseline justify-between gap-4">
                        <label htmlFor={`calc-${field.id}`} className="text-[14.5px] font-bold text-white/80">
                          {field.label}
                        </label>
                        <span className="flex items-baseline gap-2">
                          {hasDelta ? (
                            <span className="num text-[12px] font-bold text-primary">
                              {delta > 0 ? "+" : "−"}
                              {fa(Math.abs(delta), field.decimals)}
                            </span>
                          ) : null}
                          <span className="num text-[16.5px] font-black text-white">
                            {fa(values[field.id], field.decimals, field.id === "volume")}
                          </span>
                          <span className="text-[12px] text-white/40">{field.unit}</span>
                        </span>
                      </div>
                      <input
                        id={`calc-${field.id}`}
                        type="range"
                        className="calc-range calc-range--dark mt-3"
                        min={field.min}
                        max={field.max}
                        step={field.step}
                        value={values[field.id]}
                        onChange={(event) => set(field.id, Number(event.target.value))}
                        aria-label={`${field.label} (${field.unit})`}
                      />
                      {field.note ? <p className="mt-1.5 text-[12px] text-white/35">{field.note}</p> : null}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ------------------------------------------------------ */}
            {/* نتیجه — نمودار حلقه‌ای ترکیب هزینه + سود و زیان           */}
            {/* ------------------------------------------------------ */}
            <div className="p-7 sm:p-9">
              <span className="text-[13.5px] font-black tracking-wide text-white/90">{calculator.resultTitle}</span>

              <div className="mt-6 flex flex-col items-center gap-8 sm:flex-row sm:items-center sm:gap-10">
                {/* نمودار حلقه‌ای */}
                <div className="relative shrink-0" aria-hidden="true">
                  <svg viewBox="0 0 130 130" className="size-[184px] -rotate-90 sm:size-[204px]">
                    <circle cx="65" cy="65" r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="14" />
                    {result.arcs.map((arc) =>
                      arc.dash > 0.4 ? (
                        <circle
                          key={arc.id}
                          cx="65"
                          cy="65"
                          r={R}
                          fill="none"
                          stroke={SHARE_COLOR[arc.id]}
                          strokeWidth="14"
                          strokeDasharray={`${arc.dash} ${CIRC - arc.dash}`}
                          strokeDashoffset={-arc.offset}
                          className="transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
                        />
                      ) : null,
                    )}
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[11px] font-bold text-white/45">{labels.costPerLiter}</span>
                    <span className="num mt-1 text-[30px] font-black leading-none text-white sm:text-[34px]">
                      {fa(result.costPerLiter, 3)}
                    </span>
                    <span className="mt-1 text-[11px] text-white/45">{labels.usdPerLiter}</span>
                  </div>
                </div>

                {/* راهنمای رنگ‌ها */}
                <ul className="w-full min-w-0 flex-1">
                  {calculator.breakdown.rows.map((row, index) => {
                    const share = result.shares[index];
                    return (
                      <li
                        key={row.id}
                        className="flex items-center justify-between gap-4 border-b border-white/[0.07] py-2.5 last:border-b-0"
                      >
                        <span className="flex min-w-0 items-center gap-2.5 text-[14px] text-white/70">
                          <span
                            className="size-2 shrink-0 rounded-full"
                            style={{ backgroundColor: SHARE_COLOR[row.id] }}
                            aria-hidden="true"
                          />
                          <span className="truncate">{row.label}</span>
                        </span>
                        <span className="flex shrink-0 items-baseline gap-2.5">
                          <span className="num text-[12px] text-white/35">٪{fa(share.percent, 1)}</span>
                          <span className="num w-14 text-left text-[14.5px] font-black text-white">
                            {fa(share.value, 3)}
                          </span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="mt-2 flex items-baseline justify-between gap-4 border-t border-white/10 pt-4 text-[12.5px] text-white/40">
                <span>{labels.costPerLiterAfn}</span>
                <span className="flex items-baseline gap-1.5">
                  <span className="num font-bold text-white/70">{fa(result.costPerLiter * values.fx, 2)}</span>
                  {labels.afnPerLiter}
                </span>
              </div>

              {/* سود و زیان — دو کارتِ وضعیت با نشانه‌ی جهت‌دار */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div
                  className={`rounded-2xl border p-4 ${
                    isProfit ? "border-primary/25 bg-primary/[0.08]" : "border-red-400/25 bg-red-400/[0.08]"
                  }`}
                >
                  <span className="flex items-center justify-between gap-2 text-[12px] font-bold text-white/50">
                    {labels.marginPerLiter}
                    {isProfit ? (
                      <TrendingUp className="size-3.5 text-primary" strokeWidth={2.5} />
                    ) : (
                      <TrendingDown className="size-3.5 text-red-400" strokeWidth={2.5} />
                    )}
                  </span>
                  <span
                    className={`num mt-1.5 block text-[21px] font-black ${isProfit ? "text-primary" : "text-red-400"}`}
                  >
                    {isProfit ? "" : "−"}
                    {fa(Math.abs(result.marginPerLiter), 3)}
                    <span className="ms-1.5 text-[11.5px] font-bold text-white/40">{labels.usdPerLiter}</span>
                  </span>
                </div>

                <div
                  className={`rounded-2xl border p-4 ${
                    isProfit ? "border-primary/25 bg-primary/[0.08]" : "border-red-400/25 bg-red-400/[0.08]"
                  }`}
                >
                  <span className="flex items-center justify-between gap-2 text-[12px] font-bold text-white/50">
                    {labels.totalMargin}
                    {isProfit ? (
                      <TrendingUp className="size-3.5 text-primary" strokeWidth={2.5} />
                    ) : (
                      <TrendingDown className="size-3.5 text-red-400" strokeWidth={2.5} />
                    )}
                  </span>
                  <span
                    className={`num mt-1.5 block text-[21px] font-black ${isProfit ? "text-primary" : "text-red-400"}`}
                  >
                    {isProfit ? "" : "−"}
                    {fa(Math.abs(result.totalMargin), 0, true)}
                    <span className="ms-1.5 text-[11.5px] font-bold text-white/40">{labels.usd}</span>
                  </span>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-[12px] text-white/35">
                <span>
                  {labels.deliveredLiters}: <span className="num text-white/60">{fa(result.deliveredLiters, 0, true)}</span>{" "}
                  {labels.liter}
                </span>
                <span>
                  {labels.totalCost}: <span className="num text-white/60">{fa(result.totalCost, 0, true)}</span> {labels.usd}
                </span>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-4 text-[12.5px] leading-6 text-slate-400">{calculator.caption}</p>
      </Reveal>
    </div>
  );
}
