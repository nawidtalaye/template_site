"use client";

import { useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";

import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { mockViews, type MockKey } from "@/components/ui/mockups/views";
import { headings, modules, type ModuleItem } from "@/lib/showcase-content";

/** Maps a module to the screen shown beside it; two modules share a screen. */
const mockFor: Record<ModuleItem["mock"], MockKey> = {
  ledger: "ledger",
  tanks: "tanks",
  invoices: "invoices",
  purchases: "purchases",
  inventory: "tanks",
  expenses: "expenses",
  waybills: "waybills",
  report: "report",
  dashboard: "dashboard",
  analytics: "analytics",
};

export default function Modules() {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const activeModule = modules[active];
  const Mock = mockViews[mockFor[activeModule.mock]];

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const next = event.key === "ArrowDown" ? (index + 1) % modules.length : (index - 1 + modules.length) % modules.length;
    setActive(next);
    buttons.current[next]?.focus();
  };

  return (
    <section id="modules" className="relative bg-white py-20 lg:py-28" aria-labelledby="modules-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          headingId="modules-heading"
          index="۰۳"
          eyebrow="ماژول‌ها"
          titleLines={headings.modules}
          lead="هر ماژول را انتخاب کنید تا توضیح، قابلیت‌ها و نمای صفحه آن را ببینید؛ همه چیز در همین صفحه است."
        />

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-14">
          {/* فهرست ماژول‌ها */}
          <div className="lg:col-span-5">
            <Reveal y={26}>
              <div
                role="tablist"
                aria-label="ماژول‌های سامانه"
                aria-orientation="vertical"
                className="flex flex-col border-t border-slate-200"
              >
                {modules.map((item, index) => {
                  const isActive = index === active;
                  return (
                    <button
                      key={item.id}
                      ref={(node) => {
                        buttons.current[index] = node;
                      }}
                      type="button"
                      role="tab"
                      id={`module-tab-${item.id}`}
                      aria-selected={isActive}
                      aria-controls="module-panel"
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => setActive(index)}
                      onKeyDown={(event) => onKeyDown(event, index)}
                      className={`group relative flex items-center justify-between gap-4 border-b border-slate-200 py-4 ps-4 pe-0 text-right transition-colors duration-300 ${
                        isActive ? "bg-slate-50/80" : "hover:bg-slate-50/60"
                      }`}
                    >
                      <span
                        className={`absolute inset-y-0 right-0 w-[3px] origin-top bg-primary transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
                          isActive ? "scale-y-100" : "scale-y-0"
                        }`}
                        aria-hidden="true"
                      />
                      <span className="flex min-w-0 flex-col">
                        <span
                          className={`text-[15px] font-black transition-colors duration-300 ${
                            isActive ? "text-primary-ink" : "text-slate-800 group-hover:text-slate-900"
                          }`}
                        >
                          {item.name}
                        </span>
                        <span className="mt-0.5 truncate text-[11.5px] text-slate-500">{item.tag}</span>
                      </span>
                      <span className="flex shrink-0 items-center gap-3">
                        <span className="hidden text-[11px] text-slate-400 sm:inline">{item.kpi.label}</span>
                        <span className="num text-[13px] font-bold text-slate-300">{item.number}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </Reveal>
          </div>

          {/* پنل توضیح و نمای نرم‌افزار */}
          <div className="lg:col-span-7">
            <Reveal delay={120} y={34}>
              <div
                id="module-panel"
                role="tabpanel"
                aria-labelledby={`module-tab-${activeModule.id}`}
                className="lg:sticky lg:top-28"
              >
                <div key={activeModule.id} className="animate-[swap_0.55s_cubic-bezier(0.16,1,0.3,1)_both]">
                  <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-5">
                    <div>
                      <span className="num text-[12px] font-bold text-primary-ink">ماژول {activeModule.number}</span>
                      <h3 className="mt-2 text-[24px] font-black text-slate-900 sm:text-[28px]">{activeModule.name}</h3>
                    </div>
                    <span className="text-[11.5px] font-bold text-slate-400">{activeModule.tag}</span>
                  </div>

                  <p className="mt-5 text-[14px] leading-8 text-slate-600">{activeModule.summary}</p>

                  <ul className="mt-6 grid gap-y-2.5 sm:grid-cols-2 sm:gap-x-8">
                    {activeModule.capabilities.map((capability) => (
                      <li
                        key={capability}
                        className="flex items-center gap-2.5 text-[13px] font-medium text-slate-600"
                      >
                        <span className="h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                        {capability}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 flex items-baseline justify-between gap-4 border-t border-slate-200 pt-4">
                    <span className="text-[12px] text-slate-500">{activeModule.kpi.label}</span>
                    <span className="num text-[15px] font-black text-primary-ink">{activeModule.kpi.value}</span>
                  </div>
                </div>

                <div key={`${activeModule.id}-screen`} className="mt-6 animate-[screenSwap_0.7s_cubic-bezier(0.16,1,0.3,1)_both]">
                  <Mock compact />
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={200} y={20}>
          <a
            href="#showcase"
            className="group mt-14 inline-flex items-center gap-2 text-[14px] font-black text-primary-ink"
          >
            <span>نمای کامل صفحه‌های نرم‌افزار</span>
            <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
