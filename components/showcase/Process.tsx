"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { showcaseContent } from "@/lib/showcase-content";

export default function Process() {
  const { process } = showcaseContent;
  const steps = process.steps;
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight;
      const travel = Math.max(1, rect.height - viewport * 0.5);
      const scrolled = viewport * 0.5 - rect.top;
      setProgress(Math.min(1, Math.max(0, scrolled / travel)));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const activeStep = Math.min(steps.length - 1, Math.floor(progress * steps.length));

  return (
    <section
      ref={sectionRef}
      id="process"
      className="bg-white py-20 lg:py-28"
      aria-labelledby="process-heading"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                eyebrow={process.eyebrow}
                title={process.title}
                description={process.subtitle}
                align="start"
              />
              <a
                href="#contact"
                className="mt-8 inline-flex items-center gap-2 text-[13.5px] font-bold text-[#0f766e] transition-colors hover:text-slate-900"
              >
                <span>درخواست بررسی فرآیند شرکت شما</span>
                <ArrowLeft className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ol className="relative">
              {/* Track + scroll-linked fill */}
              <div
                className="absolute right-[15px] top-2 bottom-2 w-px bg-slate-200 sm:right-[19px]"
                aria-hidden="true"
              >
                <div
                  className="h-full w-px origin-top bg-[#54dcc6] transition-transform duration-150 ease-out"
                  style={{ transform: `scaleY(${progress})` }}
                />
              </div>

              {steps.map((step, index) => {
                const reached = index <= activeStep;
                return (
                  <li key={step.number} className="relative pb-10 pe-12 last:pb-0 sm:pe-16">
                    <span
                      className={`absolute right-0 top-1 flex size-[31px] items-center justify-center rounded-full border-2 bg-white text-[11px] font-bold transition-colors sm:size-[39px] ${
                        reached ? "border-[#54dcc6] text-[#0f766e]" : "border-slate-200 text-slate-400"
                      }`}
                      aria-hidden="true"
                    >
                      {step.number}
                    </span>

                    <Reveal delay={index * 40}>
                      <h3 className="text-[16px] font-bold text-slate-900 sm:text-[17px]">{step.title}</h3>
                      <p className="mt-2 text-[13.5px] leading-[2] text-slate-600">{step.desc}</p>
                      <span className="mt-3 inline-block rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11.5px] font-medium text-slate-600">
                        خروجی: {step.output}
                      </span>
                    </Reveal>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
