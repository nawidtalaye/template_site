"use client";

import Reveal from "@/components/motion/Reveal";
import ScrollProgress from "@/components/motion/ScrollProgress";
import SectionHeading from "@/components/ui/SectionHeading";
import { process } from "@/lib/showcase-content";

export default function HowItWorks() {
  return (
    <section
      id="process"
      className="relative overflow-hidden border-y border-slate-200/70 bg-slate-50/60 py-20 lg:py-28"
      aria-labelledby="process-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index="۰۶" eyebrow={process.eyebrow} title={process.title} lead={process.lead} headingId="process-heading" />

        <ScrollProgress from={0.9} to={0.45} className="mt-16 lg:mt-24">
          <ol className="relative flex flex-col gap-10 lg:flex-row lg:gap-0">
            {/* خط مسیر — با اسکرول پر می‌شود */}
            <span
              className="absolute start-0 end-0 top-[6px] hidden h-px bg-slate-200 lg:block"
              aria-hidden="true"
            />
            <span
              className="absolute start-0 end-0 top-[6px] hidden h-px origin-right bg-primary lg:block"
              style={{ transform: "scaleX(var(--progress, 0))" }}
              aria-hidden="true"
            />

            {process.steps.map((step, index) => (
              <li key={step.number} className="relative flex-1 lg:pe-8">
                <Reveal delay={index * 90} y={28} duration={850}>
                  <span className="flex items-center gap-3 lg:block">
                    <span
                      className="relative z-10 flex size-3 shrink-0 items-center justify-center rounded-full bg-white ring-4 ring-slate-50"
                      aria-hidden="true"
                    >
                      <span
                        className="size-3 rounded-full bg-primary"
                        style={{
                          transform: `scale(calc(0.5 + min(1, var(--progress, 0) * ${2.2 - index * 0.3})))`,
                          opacity: `calc(0.2 + min(1, var(--progress, 0) * ${2.6 - index * 0.35}))`,
                        }}
                      />
                    </span>
                    <span className="num text-[12px] font-bold text-primary-ink lg:mt-5 lg:block">
                      {step.number}
                    </span>
                  </span>

                  <h3 className="mt-3 text-[17px] font-black leading-snug text-slate-900 lg:mt-4">{step.title}</h3>
                  <p className="mt-2.5 text-[13px] leading-7 text-slate-500">{step.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </ScrollProgress>

        <Reveal y={20} delay={120}>
          <div className="mt-16 flex flex-col items-start justify-between gap-5 border-t border-slate-200 pt-8 sm:flex-row sm:items-center">
            <p className="text-[13.5px] leading-7 text-slate-600">
              هر مرحله به صورت خودکار به مرحله بعد تحویل داده می‌شود؛ نیازی به ورود دوباره اطلاعات نیست.
            </p>
            <a
              href="#contact"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-[13px] font-black text-white transition-colors duration-300 hover:bg-slate-800"
            >
              <span>دریافت توضیح درباره فرآیند استقرار</span>
              <span className="text-primary transition-transform duration-300 group-hover:-translate-x-1">←</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
