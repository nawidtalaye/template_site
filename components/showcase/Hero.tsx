"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import LeadForm from "@/components/LeadForm";
import Parallax from "@/components/motion/Parallax";
import Reveal, { RevealLine } from "@/components/motion/Reveal";
import PhoneField from "@/components/ui/PhoneField";
import SubmitButton from "@/components/ui/SubmitButton";
import { hero, media } from "@/lib/showcase-content";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

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
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-slate-950 text-white"
      aria-labelledby="hero-heading"
    >
      {/* ---------------------------------------------------------- */}
      {/* Background: refinery footage, only one localised scrim      */}
      {/* ---------------------------------------------------------- */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Parallax distance={-90} scale={0.06} className="absolute -bottom-24 -top-24 inset-x-0">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={media.heroPoster}
            aria-hidden="true"
            className={`h-full w-full object-cover transition-opacity duration-[1400ms] ease-out ${
              ready ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src={media.heroVideoWebm} type="video/webm" />
            <source src={media.heroVideoMp4} type="video/mp4" />
          </video>
        </Parallax>

        <Image
          src={media.heroPoster}
          alt=""
          fill
          priority
          sizes="100vw"
          className={`object-cover transition-opacity duration-[1400ms] ${
            ready ? "opacity-0" : "opacity-100"
          }`}
        />

        <div className="hero-scrim absolute inset-0" aria-hidden="true" />
      </div>

      {/* ---------------------------------------------------------- */}
      {/* Content                                                    */}
      {/* ---------------------------------------------------------- */}
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-32 pt-36 sm:px-8 lg:pb-36 lg:pt-44">
        <div className="max-w-2xl">
          <Reveal y={16} duration={700}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/[0.07] px-4 py-1.5 text-[12px] font-bold text-primary backdrop-blur-sm">
              <span
                className="size-1.5 rounded-full bg-primary shadow-[0_0_0_4px_rgba(84,220,198,0.18)]"
                aria-hidden="true"
              />
              {hero.eyebrow}
            </span>
          </Reveal>

          <Reveal delay={140} y={22} duration={900} className="mt-6">
            <h1
              id="hero-heading"
              className="text-[34px] font-black leading-[1.28] text-white sm:text-[46px] lg:text-[58px] [text-shadow:0_2px_30px_rgba(2,6,23,0.5)]"
            >
              {hero.titleLines.map((line, index) => (
                <RevealLine key={line} delay={180 + index * 150}>
                  {line}
                </RevealLine>
              ))}
            </h1>
          </Reveal>

          <Reveal delay={520} y={20} duration={900}>
            <p className="mt-6 max-w-xl text-[15px] leading-8 text-white/80 sm:text-[17px]">
              {hero.subtitle}
            </p>
          </Reveal>

          <Reveal delay={760} y={18} duration={900} className="mt-10">
            <p className="mb-3 text-[13px] font-medium text-white/75">{hero.formPrompt}</p>
            <LeadForm source="hero-oil-gas" id="hero-lead-form">
              {() => (
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                  <PhoneField
                    id="hero-phone"
                    label="شماره تلفن شما"
                    placeholder={hero.phonePlaceholder}
                    tone="dark"
                  />
                  <SubmitButton label={hero.submitLabel} />
                </div>
              )}
            </LeadForm>
            <p className="mt-5 text-[12px] text-white/65">{hero.note}</p>
          </Reveal>

          <Reveal delay={980} y={14} duration={900}>
            <ul className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] font-medium text-white/70">
              {hero.facts.map((fact, index) => (
                <li key={fact.label} className="flex items-center gap-2">
                  {index > 0 ? (
                    <span className="h-1 w-1 rounded-full bg-primary/70" aria-hidden="true" />
                  ) : null}
                  <span className="text-white/55">{fact.label}:</span>
                  <span className="text-white/90">{fact.value}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex">
        <span className="text-[11px] font-medium text-white/60">{hero.scrollLabel}</span>
        <span className="relative block h-10 w-px overflow-hidden bg-white/25" aria-hidden="true">
          <span className="scroll-hint-dot absolute inset-x-0 top-0 block h-3 w-px bg-primary" />
        </span>
      </div>
    </section>
  );
}
