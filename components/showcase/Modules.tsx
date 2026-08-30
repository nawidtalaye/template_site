"use client";

import { useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { showcaseContent } from "@/lib/showcase-content";

export default function Modules() {
  const [activeIndex, setActiveIndex] = useState(0);
  const modules = showcaseContent.modules;
  const active = modules[activeIndex];

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const delta = event.key === "ArrowDown" ? 1 : event.key === "ArrowUp" ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const next = (activeIndex + delta + modules.length) % modules.length;
    setActiveIndex(next);
    // Roving tabindex: move focus with the selection, not onto the old tab.
    document.getElementById(`module-tab-${modules[next].id}`)?.focus();
  };

  return (
    <section id="modules" className="bg-slate-50 py-20 lg:py-28" aria-labelledby="modules-heading">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="ماژول‌های سامانه"
            title="ده ماژول که روی یک پایگاه داده کار می‌کنند"
            description="هر ماژول خروجی خود را مستقیماً به ماژول بعدی می‌دهد؛ سند مالی همزمان با بارنامه صادر می‌شود و بهای تمام‌شده در همان لحظه به‌روز می‌گردد."
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:mt-16 lg:grid-cols-12 lg:gap-8">
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label="ماژول‌های سامانه"
            onKeyDown={handleKeyDown}
            className="flex flex-col lg:col-span-5"
          >
            {modules.map((mod, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={mod.id}
                  id={`module-tab-${mod.id}`}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  aria-controls="module-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveIndex(index)}
                  className={`group flex items-center gap-4 border-b px-3 py-4 text-right transition-colors last:border-b-0 ${
                    isActive
                      ? "border-b-[#54dcc6] bg-white"
                      : "border-b-slate-200 hover:bg-white/70"
                  }`}
                >
                  <span
                    className={`text-[12px] font-bold ${
                      isActive ? "text-[#0f766e]" : "text-slate-400"
                    }`}
                    aria-hidden="true"
                  >
                    {mod.number}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={`block truncate text-[14px] ${
                        isActive ? "font-bold text-slate-900" : "font-medium text-slate-700"
                      }`}
                    >
                      {mod.name}
                    </span>
                    <span className="mt-0.5 block text-[11.5px] text-slate-500">{mod.tag}</span>
                  </span>
                  <span
                    className={`h-8 w-[3px] shrink-0 rounded-full transition-colors ${
                      isActive ? "bg-[#54dcc6]" : "bg-transparent"
                    }`}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-7">
            <div
              id="module-panel"
              role="tabpanel"
              aria-labelledby={`module-tab-${active.id}`}
              className="h-full rounded-[6px] border border-slate-200 bg-white p-6 sm:p-8"
            >
              <div key={active.id} className="panel-swap">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <span className="text-[11px] font-bold tracking-wide text-[#0f766e]">
                    ماژول {active.number} · {active.tag}
                  </span>
                  <span className="rounded-full bg-slate-900 px-3 py-1 text-[11px] font-bold text-[#54dcc6]">
                    {active.kpi}
                  </span>
                </div>

                <h3 className="mt-3 text-[20px] font-black text-slate-900 sm:text-[22px]">{active.name}</h3>
                <p className="mt-3 text-[14px] leading-[2] text-slate-600">{active.summary}</p>

                <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                  {active.capabilities.map((capability) => (
                    <li key={capability} className="flex items-start gap-2.5 text-[13px] leading-[1.9] text-slate-700">
                      <Check className="mt-1 size-4 shrink-0 text-[#0f766e]" aria-hidden="true" />
                      <span>{capability}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 overflow-hidden rounded-[4px] border border-slate-200 bg-slate-50">
                  <Image
                    src={active.previewImage}
                    alt={`نمای نرم‌افزار ${active.name}`}
                    width={1408}
                    height={768}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="h-auto w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
