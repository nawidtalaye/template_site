"use client";

import { useEffect, useRef, useState } from "react";
import { showcaseContent } from "@/lib/showcase-content";

export default function Statistics() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setInView(true); }, { threshold: 0.25 });
    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  useEffect(() => {
    if (!inView) return;
    const targets = showcaseContent.statistics.map((s) => s.value);
    const duration = 1600;
    const steps = 48;
    const stepTime = duration / steps;
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCounts(targets.map((t) => Math.round(t * eased)));
      if (currentStep >= steps) { clearInterval(interval); setCounts(targets); }
    }, stepTime);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section id="statistics" ref={sectionRef} className="py-16 lg:py-20 bg-slate-900 text-white relative overflow-hidden" aria-label="آمار و شاخص‌ها">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-[#54dcc6]/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-grid-light opacity-[0.08]" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#54dcc6] text-xs font-bold mb-3">آمارها با انیمیشن شمارشگر</div>
          <h2 className="text-2xl sm:text-3xl font-black fat text-white mb-2">شاخص‌های عملیاتی در یک نگاه</h2>
          <p className="text-slate-300 text-sm">ارقام واقعی از ظرفیت‌های سامانه نواتیک در صنعت انرژی</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {showcaseContent.statistics.map((stat, idx) => {
            const displayValue = inView ? counts[idx] : 0;
            return (
              <div key={stat.label} className="flex flex-col items-center text-center p-6 rounded-[20px] bg-white/[0.06] border border-white/10 backdrop-blur-sm hover:border-[#54dcc6]/40 hover:bg-white/[0.08] transition-all group">
                <div className="flex items-baseline gap-1 text-3xl sm:text-4xl md:text-5xl font-black fat text-[#54dcc6] font-mono mb-3 animate-counter">
                  <span>{displayValue}</span>
                  <span className="text-2xl sm:text-3xl font-bold">{stat.suffix}</span>
                </div>
                <h3 className="text-sm sm:text-[15px] font-bold text-white mb-1">{stat.label}</h3>
                <p className="text-[11px] sm:text-xs text-slate-400 leading-normal max-w-[200px]">{stat.subtext}</p>
              </div>
            );
          })}
        </div>
        <p className="text-center text-[11px] text-slate-500 mt-8">* ارقام بر اساس داده‌های مستقر و ظرفیت عملیاتی نرم‌افزار نواتیک است.</p>
      </div>
    </section>
  );
}
