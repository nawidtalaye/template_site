"use client";

import { useEffect, useRef, useState } from "react";
import { showcaseContent } from "@/lib/showcase-content";

export default function Statistics() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.25 }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  useEffect(() => {
    if (!inView) return;

    const targets = showcaseContent.statistics.map((s) => s.value);
    const duration = 1800; // ms
    const steps = 40;
    const stepTime = duration / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setCounts(targets.map((target) => Math.round(target * eased)));

      if (currentStep >= steps) {
        clearInterval(interval);
        setCounts(targets);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section
      id="statistics"
      ref={sectionRef}
      className="py-16 lg:py-20 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden border-y border-white/10"
      aria-label="آمار و شاخص‌های نرم افزار"
    >
      {/* Background glow lines */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {showcaseContent.statistics.map((stat, idx) => {
            const displayValue = inView ? counts[idx] : 0;

            return (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center p-5 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm hover:border-primary/30 transition-colors"
              >
                <div className="flex items-baseline gap-1 text-3xl sm:text-4xl md:text-5xl font-black fat text-primary font-mono mb-2">
                  <span>{displayValue}</span>
                  <span className="text-2xl sm:text-3xl font-bold">{stat.suffix}</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white mb-1">
                  {stat.label}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-400 leading-normal max-w-[180px]">
                  {stat.subtext}
                </p>
              </div>
            );
          })}
        </div>

        {/* Disclaimer Note */}
        <p className="text-center text-[11px] text-slate-500 mt-8 regular">
          * ارقام و شاخص‌ها برگرفته از داده‌های مستقر و ظرفیت‌های عملیاتی نرم‌افزار نواتیک در صنعت انرژی است.
        </p>
      </div>
    </section>
  );
}
