"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import { showcaseContent } from "@/lib/showcase-content";

const DURATION = 1400;
const TARGETS = showcaseContent.statistics.map((stat) => stat.value);

export default function Statistics() {
  const sectionRef = useRef<HTMLElement>(null);
  // The real figures are server-rendered, so the section still reads correctly
  // without JavaScript; the count-up is a progressive enhancement on top.
  const [counts, setCounts] = useState<number[]>(TARGETS);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let start = 0;

    const tick = (now: number) => {
      if (!start) start = now;
      const progress = Math.min(1, (now - start) / DURATION);
      // easeOutExpo — fast start, settles softly on the final value
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCounts(TARGETS.map((target) => Math.round(target * eased)));
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };

    // Triggering 20% of a viewport early means the reset to zero happens while
    // the figures are still below the fold, so no flicker is visible.
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        setCounts(TARGETS.map(() => 0));
        frame = window.requestAnimationFrame(tick);
      },
      { threshold: 0, rootMargin: "0px 0px 20% 0px" },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="statistics"
      className="bg-slate-900 py-16 lg:py-20"
      aria-labelledby="statistics-heading"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <h2 id="statistics-heading" className="text-[13px] font-bold tracking-wide text-[#54dcc6]">
            شاخص‌های سامانه
          </h2>
        </Reveal>

        <dl className="mt-8 grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {showcaseContent.statistics.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * 80}
              className="border-t border-slate-700 pt-6 lg:border-t-0 lg:border-e lg:border-e-slate-700 lg:px-8 lg:first:ps-0 lg:last:border-e-0 lg:last:pe-0"
            >
              <dd className="flex items-baseline gap-1">
                <span className="font-mono text-[34px] font-bold leading-none text-white sm:text-[42px]">
                  {counts[index]}
                </span>
                {stat.suffix ? (
                  <span className="font-mono text-[20px] font-bold text-[#54dcc6] sm:text-[24px]">
                    {stat.suffix}
                  </span>
                ) : null}
              </dd>
              <dt className="mt-3 text-[13.5px] font-bold text-white">{stat.label}</dt>
              <p className="mt-1.5 max-w-[240px] text-[12px] leading-[1.9] text-slate-400">{stat.subtext}</p>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
