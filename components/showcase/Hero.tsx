"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import LeadForm from "@/components/LeadForm";
import Reveal, { RevealLine } from "@/components/motion/Reveal";
import { prefersReducedMotion, useScrollVar } from "@/components/motion/useScrollVar";
import PhoneField from "@/components/ui/PhoneField";
import SubmitButton from "@/components/ui/SubmitButton";
import { hero, media } from "@/lib/showcase-content";

/** ۰ در بالای صفحه، ۱ وقتی هیرو کامل از دید خارج شده باشد. */
const heroProgress = (rect: DOMRect) => (prefersReducedMotion() ? 0 : -rect.top / Math.max(1, rect.height));

/**
 * Hero — one video, one headline, one paragraph, one phone form.
 *
 * The footage is the hero here, so the only darkening is a short gradient
 * behind the text block; the rest of the frame keeps the refinery visible.
 */
export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const scrollRef = useScrollVar<HTMLElement>(heroProgress);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onReady = () => setReady(true);
    // A cached video can reach a playable state before React attaches.
    if (video.readyState >= 3) onReady();
    video.addEventListener("canplay", onReady, { once: true });
    // Autoplay can still be refused (data saver, low power); the poster stays.
    void video.play().catch(() => {});

    return () => video.removeEventListener("canplay", onReady);
  }, []);

  return (
    <section
      id="hero"
      ref={scrollRef}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-slate-950 text-white"
      aria-labelledby="hero-heading"
    >
      {/* ---------------------------------------------------------- */}
      {/* Background: یک ویدیو، بدون چرخش                            */}
      {/* ---------------------------------------------------------- */}
      {/* `--p` روی خودِ بخش نوشته می‌شود و اینجا فقط مصرف می‌شود */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            transform: "scale(calc(1 + var(--p, 0) * 0.07))",
            willChange: "transform",
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={media.heroPoster}
            aria-hidden="true"
            className={`h-full w-full object-cover object-center transition-opacity duration-[1400ms] ease-out ${
              ready ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src={media.heroVideo} type="video/mp4" />
          </video>
        </div>

        {/* پوستر تا لحظه‌ای که ویدیو آماده پخش شود */}
        <Image
          src={media.heroPoster}
          alt=""
          fill
          priority
          sizes="100vw"
          className={`object-cover object-center transition-opacity duration-[1400ms] ${
            ready ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* فقط یک پرده بسیار ملایم پشت متن — نه روی کل ویدیو */}
        <div className="hero-veil absolute inset-0" aria-hidden="true" />
      </div>

      {/* ---------------------------------------------------------- */}
      {/* Content                                                    */}
      {/* ---------------------------------------------------------- */}
      <div
        className="relative mx-auto w-full max-w-7xl px-5 pb-28 pt-32 sm:px-8 lg:pb-32 lg:pt-40"
        style={{
          transform: "translate3d(0, calc(var(--p, 0) * -46px), 0)",
          opacity: "calc(1 - var(--p, 0) * 0.85)",
          willChange: "transform, opacity",
        }}
      >
        <div className="max-w-2xl">
          <Reveal y={14} duration={700}>
            <span className="inline-flex items-center gap-2.5 text-[12.5px] font-bold text-primary [text-shadow:0_1px_12px_rgba(2,6,23,0.55)]">
              <span className="h-px w-8 bg-primary" aria-hidden="true" />
              {hero.eyebrow}
            </span>
          </Reveal>

          <Reveal delay={120} y={18} duration={900} className="mt-5">
            <h1
              id="hero-heading"
              className="text-[32px] font-black leading-[1.32] text-white sm:text-[44px] lg:text-[56px] [text-shadow:0_2px_26px_rgba(2,6,23,0.45)]"
            >
              {hero.titleLines.map((line, index) => (
                <RevealLine key={line} delay={180 + index * 150}>
                  {line}
                </RevealLine>
              ))}
            </h1>
          </Reveal>

          <Reveal delay={520} y={18} duration={900}>
            <p className="mt-6 max-w-xl text-[14.5px] leading-8 text-white/85 sm:text-[16.5px] [text-shadow:0_1px_14px_rgba(2,6,23,0.5)]">
              {hero.subtitle}
            </p>
          </Reveal>

          <Reveal delay={760} y={16} duration={900} className="mt-9">
            <p className="mb-3 text-[13px] font-medium text-white/80 [text-shadow:0_1px_12px_rgba(2,6,23,0.5)]">
              {hero.formPrompt}
            </p>
            <LeadForm source="hero-oil-gas" id="hero-lead-form">
              {() => (
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                  <PhoneField
                    id="hero-phone"
                    label="شماره تلفن شما"
                    placeholder={hero.phonePlaceholder}
                    tone="dark"
                    className="sm:max-w-[300px]"
                  />
                  <SubmitButton label={hero.submitLabel} />
                </div>
              )}
            </LeadForm>
            <p className="mt-4 text-[11.5px] text-white/60 [text-shadow:0_1px_10px_rgba(2,6,23,0.5)]">
              {hero.note}
            </p>
          </Reveal>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex">
        <span className="text-[11px] font-medium text-white/60">{hero.scrollLabel}</span>
        <span className="relative block h-9 w-px overflow-hidden bg-white/25" aria-hidden="true">
          <span className="scroll-hint-dot absolute inset-x-0 top-0 block h-3 w-px bg-primary" />
        </span>
      </div>
    </section>
  );
}
