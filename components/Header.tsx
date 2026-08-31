"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Menu, PhoneCall, X } from "lucide-react";

import { navItems } from "@/lib/showcase-content";
import { companyInfo } from "@/lib/site-content";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const [active, setActive] = useState<string>("");
  const [progress, setProgress] = useState(0);
  const frame = useRef(0);

  useEffect(() => {
    const ids = navItems.map((item) => item.href.replace("#", ""));

    const measure = () => {
      const hero = document.getElementById("hero");
      const threshold = (hero?.offsetHeight ?? window.innerHeight) - 90;
      setOverHero(window.scrollY < threshold);

      const line = window.scrollY + 180;
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= line) current = id;
      }
      setActive(current);

      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };

    const onScroll = () => {
      if (frame.current) return;
      frame.current = requestAnimationFrame(() => {
        frame.current = 0;
        measure();
      });
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  const go = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    event.preventDefault();
    const el = document.getElementById(href.slice(1));
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  const dark = overHero && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        dark
          ? "border-b border-transparent bg-gradient-to-b from-slate-950/70 via-slate-950/30 to-transparent py-4"
          : "border-b border-slate-200/80 bg-white/85 py-2.5 backdrop-blur-xl"
      }`}
    >
      <div
        className="absolute inset-x-0 top-0 h-px origin-right bg-primary"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#hero" onClick={(event) => go(event, "#hero")} className="flex items-center gap-3">
          <span className="flex h-10 items-center justify-center rounded-xl border border-slate-200/70 bg-white px-2 shadow-sm">
            <Image
              src="/images/novatech-logo.webp"
              alt={`لوگوی ${companyInfo.brandName}`}
              width={140}
              height={38}
              priority
              sizes="110px"
              className="h-6 w-auto object-contain"
            />
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span
              className={`text-[13px] font-black transition-colors ${
                dark ? "text-white [text-shadow:0_1px_10px_rgba(2,6,23,0.55)]" : "text-slate-900"
              }`}
            >
              نفت و گاز {companyInfo.brandName}
            </span>
            <span className={`text-[10px] transition-colors ${dark ? "text-white/60" : "text-slate-500"}`}>
              سامانه مدیریت و حسابداری
            </span>
          </span>
        </a>

        <nav aria-label="بخش‌های صفحه" className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isActive = active === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => go(event, item.href)}
                aria-current={isActive ? "true" : undefined}
                className={`relative rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-300 ${
                  dark
                    ? isActive
                      ? "text-primary"
                      : "text-white/75 hover:text-white"
                    : isActive
                      ? "text-primary-ink"
                      : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {item.label}
                <span
                  className={`absolute inset-x-3.5 -bottom-0.5 h-px origin-right bg-primary transition-transform duration-300 ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                  aria-hidden="true"
                />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${companyInfo.primaryPhoneHref}`}
            className={`hidden h-10 items-center gap-2 rounded-full border px-4 text-[13px] font-bold transition-colors sm:flex ${
              dark
                ? "border-white/25 text-white hover:border-white/50"
                : "border-slate-200 text-slate-700 hover:border-slate-300"
            }`}
          >
            <PhoneCall className="size-4 text-primary" aria-hidden="true" />
            <span dir="ltr" className="num">
              {companyInfo.primaryPhoneLabel}
            </span>
          </a>

          <a
            href="#contact"
            onClick={(event) => go(event, "#contact")}
            className="hidden rounded-full bg-primary px-5 py-2.5 text-[13px] font-black text-slate-900 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover lg:inline-flex"
          >
            درخواست تماس
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "بستن منو" : "باز کردن منو"}
            className={`flex size-10 items-center justify-center rounded-xl border transition-colors lg:hidden ${
              dark
                ? "border-white/25 text-white"
                : "border-slate-200 text-slate-700"
            }`}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={`overflow-hidden border-t border-slate-200/70 bg-white/95 backdrop-blur-xl transition-[max-height,opacity] duration-500 lg:hidden ${
          open ? "max-h-[80svh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav aria-label="بخش‌های صفحه در موبایل" className="flex flex-col px-5 py-3">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(event) => go(event, item.href)}
              className="border-b border-slate-100 py-3 text-[15px] font-medium text-slate-700 last:border-0"
            >
              {item.label}
            </a>
          ))}
          <div className="mt-4 flex flex-col gap-2.5 pb-4">
            <a
              href="#contact"
              onClick={(event) => go(event, "#contact")}
              className="flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-black text-slate-900"
            >
              درخواست تماس
            </a>
            <a
              href={`tel:${companyInfo.primaryPhoneHref}`}
              className="flex items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700"
            >
              <PhoneCall className="size-4 text-primary-ink" aria-hidden="true" />
              <span dir="ltr" className="num">
                {companyInfo.primaryPhoneLabel}
              </span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
