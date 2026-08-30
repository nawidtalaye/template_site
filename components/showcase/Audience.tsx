"use client";

import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { showcaseContent } from "@/lib/showcase-content";

export default function Audience() {
  const { audience } = showcaseContent;

  return (
    <section id="trust" className="bg-white py-20 lg:py-24" aria-labelledby="trust-heading">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={audience.eyebrow}
            title={audience.title}
            description={audience.subtitle}
            align="start"
          />
        </Reveal>

        <ul className="mt-12 grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {audience.segments.map((segment, index) => (
            <Reveal as="li" key={segment.name} delay={index * 50} className="border-t border-slate-200 py-6">
              <span className="text-[11px] font-bold text-[#0f766e]" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-[15px] font-bold text-slate-900">{segment.name}</h3>
              <p className="mt-1.5 text-[13px] leading-[1.9] text-slate-600">{segment.note}</p>
            </Reveal>
          ))}
        </ul>

        <p className="mt-8 text-[12px] text-slate-400">{audience.footnote}</p>
      </div>
    </section>
  );
}
