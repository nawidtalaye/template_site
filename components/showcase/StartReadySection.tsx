"use client";

import { ArrowLeft, PhoneCall, Sparkles } from "lucide-react";
import { companyInfo } from "@/lib/site-content";

export default function StartReadySection() {
  return (
    <section id="start-ready" className="py-20 lg:py-28 bg-white relative overflow-hidden" aria-labelledby="start-ready-heading">
      <div className="absolute inset-0 bg-grid-light opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#54dcc6]/[0.06] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-[32px] bg-slate-900 overflow-hidden border border-slate-800 shadow-[0_24px_80px_rgba(15,23,42,0.22)] min-h-[520px] flex items-center justify-center py-16 px-6">
          {/* Animated circles */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="start-ready-circle w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] border-white/10" />
            <div className="start-ready-circle w-[440px] h-[440px] sm:w-[560px] sm:h-[560px] border-white/5" />
            <div className="start-ready-circle w-[620px] h-[620px] sm:w-[780px] sm:h-[780px] border-white/[0.04]" />
            <div className="start-ready-circle w-[820px] h-[820px] sm:w-[1000px] sm:h-[1000px] border-white/[0.03]" />
            {/* pulsing rings */}
            <div className="absolute w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] rounded-full border border-[#54dcc6]/30">
              <span className="start-ready-pulse" style={{ animationDelay: "0s" }} />
              <span className="start-ready-pulse" style={{ animationDelay: "0.9s" }} />
              <span className="start-ready-pulse" style={{ animationDelay: "1.8s" }} />
            </div>
            {/* glowing dots on circles */}
            <div className="absolute w-[440px] h-[440px] sm:w-[560px] sm:h-[560px] rounded-full">
              <span className="absolute top-0 left-1/2 -translate-x-1/2 size-2 rounded-full bg-[#54dcc6] shadow-[0_0_12px_rgba(84,220,198,0.8)]" />
              <span className="absolute bottom-6 right-10 size-1.5 rounded-full bg-white/60" />
              <span className="absolute top-1/2 -right-1 size-1.5 rounded-full bg-[#54dcc6]/60" />
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#54dcc6] text-xs font-bold mb-6 backdrop-blur-md">
              <Sparkles className="size-3.5" />
              <span>دایره‌های متحرک تماس • StartReadySection</span>
            </div>
            <h2 id="start-ready-heading" className="text-3xl sm:text-4xl lg:text-[42px] font-black fat leading-[1.15] text-white mb-4 text-balance">
              آماده‌اید مدیریت انرژی خود را هوشمند کنید؟
            </h2>
            <p className="text-slate-300 text-sm sm:text-[15px] leading-relaxed mb-8 max-w-xl">
              همین امروز شماره خود را ثبت کنید تا کارشناسان نفت و گاز نواتیک برای دمو اختصاصی و نیازسنجی رایگان با شما تماس بگیرند.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <a href="#contact" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#54dcc6] hover:bg-[#45bba7] text-slate-900 font-black text-sm shadow-[0_12px_32px_rgba(84,220,198,0.35)] transition-all hover:-translate-y-0.5">
                <span>شروع کنید • ثبت درخواست</span>
                <ArrowLeft className="size-4" />
              </a>
              <a href={`tel:${companyInfo.primaryPhoneHref}`} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-sm backdrop-blur-md transition-colors">
                <PhoneCall className="size-4 text-[#54dcc6]" />
                <span dir="ltr" className="font-mono">{companyInfo.primaryPhoneLabel}</span>
              </a>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-2 text-[11px] text-slate-400">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">پشتیبانی ۲۴/۷</span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">استقرار در محل</span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">آموزش پرسنل</span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">مهاجرت داده‌ها</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
