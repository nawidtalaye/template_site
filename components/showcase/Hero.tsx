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

    // Attempt autoplay
    video.play().catch(() => {
      // Autoplay blocked by browser policy - poster remains visible
    });

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] lg:min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-950 text-white pt-24 pb-16 lg:pt-28 lg:pb-20"
      aria-label="بخش معرفی سامانه نفت و گاز"
    >
      {/* Background Video Layer */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={showcaseContent.media.heroPoster}
          className={`w-full h-full object-cover object-center transition-opacity duration-1000 ${
            videoLoaded ? "opacity-45" : "opacity-0"
          }`}
          aria-hidden="true"
        >
          <source src={showcaseContent.media.heroVideo} type="video/mp4" />
        </video>

        {/* Fallback Poster Background if video is loading/unsupported */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            videoLoaded ? "opacity-0" : "opacity-40"
          }`}
          style={{ backgroundImage: `url(${showcaseContent.media.heroPoster})` }}
          aria-hidden="true"
        />

        {/* Gradient & Dark Overlays for Ultra-High Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#00d2b4]/10 via-transparent to-transparent" />

        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center">
        {/* Brand & Sector Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-primary text-xs sm:text-sm font-medium mb-6 shadow-inner animate-fade-up">
          <Sparkles className="size-3.5 text-primary animate-pulse" aria-hidden="true" />
          <span>{showcaseContent.hero.badge}</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold fat leading-tight sm:leading-tight lg:leading-tight tracking-tight text-white max-w-4xl mb-5 drop-shadow-sm">
          {showcaseContent.hero.title}
        </h1>

        {/* Subtitle / Value Proposition */}
        <p className="text-base sm:text-lg md:text-xl text-slate-300 regular max-w-2xl sm:max-w-3xl leading-relaxed mb-8 md:mb-10 text-balance">
          {showcaseContent.hero.subtitle}
        </p>

        {/* Minimal Lead Capture Form */}
        <div className="w-full max-w-xl bg-white/10 backdrop-blur-xl border border-white/20 p-4 sm:p-5 rounded-2xl shadow-2xl mb-8">
          <p className="text-xs sm:text-sm font-medium text-slate-200 text-center mb-3.5">
            {showcaseContent.hero.leadFormPrompt}
          </p>

          <LeadForm
            source="hero-oil-gas-showcase"
            id="hero-lead-form"
            className="flex flex-col sm:flex-row items-center gap-2.5"
          >
            <div className="relative w-full flex-1">
              <input
                id="hero-lead-phone"
                name="phone"
                type="tel"
                dir="ltr"
                required
                aria-label="شماره تماس"
                className="w-full rounded-xl border border-white/25 bg-white/90 text-slate-900 placeholder:text-slate-500 py-3 px-4 text-left font-medium outline-none focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/40 transition-all duration-200"
                placeholder="07XXXXXXXX"
              />
              <PhoneCall
                className="absolute left-3.5 top-3.5 size-4 text-slate-400 pointer-events-none"
                aria-hidden="true"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto shrink-0 bg-primary hover:bg-primary-hover text-slate-950 font-bold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span>{showcaseContent.hero.ctaButtonText}</span>
              <ChevronLeft className="size-4" aria-hidden="true" />
            </button>
          </LeadForm>
        </div>

        {/* Value Highlights Pill Bar */}
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-300 mb-8">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="size-4 text-primary shrink-0" aria-hidden="true" />
            <span>حسابداری دو ارزی (USD / AFN)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="size-4 text-primary shrink-0" aria-hidden="true" />
            <span>کنترل افت، دما و کسری دیپوها</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="size-4 text-primary shrink-0" aria-hidden="true" />
            <span>پایداری کامل در شرایط آفلاین</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="size-4 text-primary shrink-0" aria-hidden="true" />
            <span>پشتیبانی و استقرار در محل توسط {companyInfo.brandName}</span>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <button
          type="button"
          onClick={() => scrollToSection("intro")}
          aria-label="اسکرول به بخش معرفی نرم افزار"
          className="inline-flex flex-col items-center gap-1.5 text-xs text-slate-400 hover:text-primary transition-colors duration-200 mt-2 group cursor-pointer"
        >
          <span className="text-[11px] font-medium tracking-wide">مشاهده امکانات و ماژول‌ها</span>
          <div className="size-8 rounded-full border border-white/15 bg-white/5 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-200">
            <ArrowDown className="size-4 text-slate-300 group-hover:text-primary transition-colors animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
}
