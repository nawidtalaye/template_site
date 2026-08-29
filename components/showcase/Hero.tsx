"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, CheckCircle2, ChevronLeft, PhoneCall, ShieldCheck, Sparkles } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import { showcaseContent } from "@/lib/showcase-content";
import { companyInfo } from "@/lib/site-content";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleCanPlay = () => setVideoLoaded(true);
    video.addEventListener("canplay", handleCanPlay);
    video.play().catch(() => {});
    return () => video.removeEventListener("canplay", handleCanPlay);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-[88vh] lg:min-h-[92vh] w-full flex items-center justify-center overflow-hidden bg-slate-950 text-white pt-24 pb-16 lg:pt-28 lg:pb-20" aria-label="سامانه نفت و گاز">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
        <video ref={videoRef} autoPlay muted loop playsInline poster={showcaseContent.media.heroPoster} className={`w-full h-full object-cover object-center transition-opacity duration-1000 ${videoLoaded ? "opacity-55" : "opacity-0"}`} aria-hidden="true">
          <source src="/images/showcase/oil-gas-hero.mp4" type="video/mp4" />
          <source src={showcaseContent.media.heroVideo} type="video/mp4" />
        </video>
        <div className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${videoLoaded ? "opacity-0" : "opacity-50"}`} style={{ backgroundImage: `url(${showcaseContent.media.heroPoster})` }} aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#54dcc6]/20 via-transparent to-transparent" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)`, backgroundSize: "26px 26px" }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#54dcc6] text-xs sm:text-[13px] font-medium mb-6 shadow-inner animate-fade-up">
          <Sparkles className="size-3.5 animate-pulse" aria-hidden="true" />
          <span>{showcaseContent.hero.badge}</span>
        </div>

        <h1 className="text-[28px] sm:text-4xl md:text-5xl lg:text-[56px] font-black fat leading-[1.15] tracking-tight text-white max-w-4xl mb-5 drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)]">
          {showcaseContent.hero.title}
        </h1>

        <p className="text-[15px] sm:text-lg md:text-xl text-slate-200 regular max-w-3xl leading-relaxed mb-8 md:mb-10 text-balance">
          {showcaseContent.hero.subtitle}
        </p>

        <div className="w-full max-w-[560px] bg-white/95 backdrop-blur-xl border border-white/30 p-4 sm:p-5 rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.25)] mb-8">
          <p className="text-[13px] sm:text-sm font-bold text-slate-800 text-center mb-3.5">{showcaseContent.hero.leadFormPrompt}</p>
          <LeadForm source="hero-oil-gas-showcase" id="hero-lead-form" className="flex flex-col sm:flex-row items-stretch gap-2.5">
            <div className="relative w-full flex-1">
              <input id="hero-lead-phone" name="phone" type="tel" dir="ltr" required aria-label="شماره تماس" className="w-full rounded-full border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 py-3 px-5 pr-5 text-left font-medium outline-none focus:border-[#54dcc6] focus:ring-4 focus:ring-[#54dcc6]/20 transition-all" placeholder="07XXXXXXXX" />
              <PhoneCall className="absolute left-4 top-3.5 size-4 text-slate-400 pointer-events-none" aria-hidden="true" />
            </div>
            <button type="submit" className="shrink-0 bg-[#54dcc6] hover:bg-[#45bba7] text-slate-900 font-bold px-7 py-3 rounded-full transition-all shadow-[0_8px_20px_rgba(84,220,198,0.35)] flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]">
              <span>{showcaseContent.hero.ctaButtonText}</span>
              <ChevronLeft className="size-4" aria-hidden="true" />
            </button>
          </LeadForm>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2.5 text-[12px] sm:text-[13px] text-slate-200 mb-8">
          <div className="flex items-center gap-1.5"><CheckCircle2 className="size-4 text-[#54dcc6] shrink-0" /><span>حسابداری دو ارزی (USD / AFN)</span></div>
          <div className="flex items-center gap-1.5"><CheckCircle2 className="size-4 text-[#54dcc6] shrink-0" /><span>کنترل افت، دما و کسری دیپوها</span></div>
          <div className="flex items-center gap-1.5"><CheckCircle2 className="size-4 text-[#54dcc6] shrink-0" /><span>پایداری کامل در شرایط آفلاین</span></div>
          <div className="flex items-center gap-1.5"><ShieldCheck className="size-4 text-[#54dcc6] shrink-0" /><span>استقرار توسط {companyInfo.brandName}</span></div>
        </div>

        <button type="button" onClick={() => scrollToSection("intro")} aria-label="مشاهده معرفی" className="inline-flex flex-col items-center gap-1.5 text-xs text-slate-300 hover:text-[#54dcc6] transition-colors mt-2 group cursor-pointer">
          <span className="text-[11px] font-medium tracking-wide">مشاهده امکانات و ماژول‌ها</span>
          <div className="size-9 rounded-full border border-white/20 bg-white/10 flex items-center justify-center group-hover:border-[#54dcc6]/50 group-hover:bg-[#54dcc6]/15 transition-all">
            <ArrowDown className="size-4 text-white group-hover:text-[#54dcc6] transition-colors animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
}
