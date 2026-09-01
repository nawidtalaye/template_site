"use client";

import { useState } from "react";
import { ArrowLeft, BellRing, Gauge, ShieldCheck } from "lucide-react";

import Reveal from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";
import SectionHeading from "@/components/ui/SectionHeading";
import { mockViews, type MockKey } from "@/components/ui/mockups/views";
import { showcase } from "@/lib/showcase-content";

const viewKeys: MockKey[] = ["dashboard", "ledger", "tanks", "invoices", "purchases", "report"];

const alerts = [
  { icon: Gauge, text: "مخزن ۳ به کمتر از ۵۰٪ ظرفیت رسیده", time: "۰۹:۲۰" },
  { icon: BellRing, text: "سررسید قرارداد تأمین‌کننده · ۳ روز", time: "۰۸:۴۵" },
  { icon: ShieldCheck, text: "کسری مسیر بارنامه ۸۴۲۳ بالاتر از حد مجاز", time: "دیروز" },
];

export default function ProductShowcase() {
  const [active, setActive] = useState<MockKey>("dashboard");
  const view = showcase.views.find((item) => item.id === active) ?? showcase.views[0];
  const Mock = mockViews[active];

  return (
    <section id="showcase" className="relative overflow-hidden bg-white py-20 lg:py-28" aria-labelledby="showcase-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          headingId="showcase-heading"
          index="۰۷"
          eyebrow={showcase.eyebrow}
          title={showcase.title}
          lead={showcase.lead}
        />

        {/* تب‌ها */}
        <Reveal y={20} className="mt-12">
          <div className="no-scrollbar overflow-x-auto border-b border-slate-200">
            <div role="tablist" aria-label="صفحه‌های نرم‌افزار" className="flex min-w-max gap-7">
              {viewKeys.map((key) => {
                const item = showcase.views.find((entry) => entry.id === key);
                if (!item) return null;
                const isActive = key === active;
                return (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    id={`screen-tab-${key}`}
                    aria-selected={isActive}
                    aria-controls="screen-panel"
                    onClick={() => setActive(key)}
                    className={`relative whitespace-nowrap pb-4 pt-2 text-[14px] font-bold transition-colors duration-300 ${
                      isActive ? "text-slate-900" : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute inset-x-0 -bottom-px h-[2px] origin-right bg-primary transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        <div
          id="screen-panel"
          role="tabpanel"
          aria-labelledby={`screen-tab-${active}`}
          className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12"
        >
          {/* متن و هشدارها */}
          <div className="lg:col-span-4 lg:pt-4">
            <div key={`${active}-text`} className="animate-[swap_0.5s_cubic-bezier(0.16,1,0.3,1)_both]">
              <h3 className="text-[22px] font-black leading-snug text-slate-900 sm:text-[26px]">{view.title}</h3>
              <p className="mt-3 text-[13.5px] leading-7 text-slate-500">{view.desc}</p>
              <ul className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11.5px] font-bold text-slate-400">
                {view.tags.map((tag, index) => (
                  <li key={tag} className="flex items-center gap-3">
                    {index > 0 ? (
                      <span className="h-1 w-1 rounded-full bg-slate-300" aria-hidden="true" />
                    ) : null}
                    {tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 border-t border-slate-200 pt-6">
              <span className="text-[11px] font-bold text-slate-400">هشدارهای فعال</span>
              <ul className="mt-4 flex flex-col divide-y divide-slate-100">
                {alerts.map((alert) => (
                  <li key={alert.text} className="flex items-start gap-3 py-3">
                    <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-primary-ink">
                      <alert.icon className="size-3.5" aria-hidden="true" />
                    </span>
                    <span className="flex-1 text-[12.5px] leading-6 text-slate-600">{alert.text}</span>
                    <span className="num shrink-0 text-[10.5px] text-slate-400">{alert.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="#contact"
              className="group mt-8 inline-flex items-center gap-2 text-[13.5px] font-black text-primary-ink"
            >
              <span>درخواست نمایش زنده نرم‌افزار</span>
              <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
            </a>
          </div>

          {/* نمای نرم‌افزار با عمق و پارالاکس */}
          <div className="lg:col-span-8">
            <Reveal y={44} duration={1100}>
              <Parallax distance={-46} className="relative">
                <div className="[perspective:2000px]">
                  <div className="hidden [transform:rotateY(-6deg)_rotateX(2.5deg)] [transform-style:preserve-3d] transition-transform duration-[900ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:[transform:rotateY(-2.5deg)_rotateX(1deg)] lg:block">
                    <div key={`${active}-screen`} className="animate-[screenSwap_0.7s_cubic-bezier(0.16,1,0.3,1)_both]">
                      <Mock />
                    </div>
                  </div>
                  <div className="lg:hidden">
                    <div key={`${active}-screen-m`} className="animate-[screenSwap_0.7s_cubic-bezier(0.16,1,0.3,1)_both]">
                      <Mock compact />
                    </div>
                  </div>
                </div>

                {/* برچسب روی نمای نرم‌افزار */}
                <div className="pointer-events-none absolute -bottom-5 left-4 hidden items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/95 px-4 py-3 shadow-[0_24px_50px_-30px_rgba(15,23,42,0.6)] backdrop-blur-md sm:flex">
                  <span className="size-2 rounded-full bg-emerald-400" aria-hidden="true" />
                  <span className="text-[12px] font-bold text-slate-800">{view.label}</span>
                  <span className="text-[11px] text-slate-400">نسخه نمایشی · نواتیک</span>
                </div>
              </Parallax>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
