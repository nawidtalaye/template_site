"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { showcaseContent } from "@/lib/showcase-content";

export default function DashboardShowcase() {
  const { showcase } = showcaseContent;
  const [activeId, setActiveId] = useState(showcase.views[0].id);
  const active = showcase.views.find((view) => view.id === activeId) ?? showcase.views[0];

  return (
    <section id="showcase" className="bg-slate-50 py-20 lg:py-28" aria-labelledby="showcase-heading">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={showcase.eyebrow}
            title={showcase.title}
            description={showcase.subtitle}
          />
        </Reveal>

        <Reveal delay={60}>
          <div
            role="tablist"
            aria-label="صفحه‌های نرم‌افزار"
            className="mt-10 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {showcase.views.map((view) => {
              const isActive = view.id === activeId;
              return (
                <button
                  key={view.id}
                  id={`view-tab-${view.id}`}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  aria-controls="view-panel"
                  onClick={() => setActiveId(view.id)}
                  className={`shrink-0 rounded-full px-4 py-2.5 text-[12.5px] font-bold transition-colors sm:px-5 ${
                    isActive
                      ? "bg-slate-900 text-white"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
                  }`}
                >
                  {view.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div
            id="view-panel"
            role="tabpanel"
            aria-labelledby={`view-tab-${active.id}`}
            className="mt-6 overflow-hidden rounded-[6px] border border-slate-200 bg-white"
          >
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 px-5 py-5 sm:px-7">
              <div className="max-w-xl">
                <h3 className="text-[17px] font-black text-slate-900 sm:text-[19px]">{active.title}</h3>
                <p className="mt-1.5 text-[13.5px] leading-[1.9] text-slate-600">{active.desc}</p>
              </div>
              <ul className="flex flex-wrap gap-1.5">
                {active.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] text-slate-600"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>

            <div key={active.id} className="panel-swap bg-slate-100">
              <Image
                src={active.image}
                alt={`نمای ${active.title}`}
                width={1408}
                height={768}
                sizes="(min-width: 1024px) 80vw, 100vw"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
