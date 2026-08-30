"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, PhoneCall, X } from "lucide-react";
import { headerNav, sectionIds } from "@/lib/navigation";
import { companyInfo } from "@/lib/site-content";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      // Last section whose top has passed under the sticky header wins.
      let current: string = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setActiveSection(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const goTo = (href: string) => {
    setMenuOpen(false);
    const el = document.getElementById(href.replace("#", ""));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-slate-200 bg-white/95 py-2.5 shadow-[0_6px_24px_rgba(15,23,42,0.05)] backdrop-blur-md"
            : "border-b border-transparent bg-white/80 py-4 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-5 sm:px-6 lg:px-8">
          <a
            href="#hero"
            onClick={(event) => {
              event.preventDefault();
              goTo("#hero");
            }}
            className="flex items-center gap-3"
          >
            <span className="relative block h-9 w-[128px]">
              <Image
                src="/images/novatech-logo.webp"
                alt={`لوگوی ${companyInfo.brandName}`}
                fill
                priority
                sizes="128px"
                className="object-contain object-right"
              />
            </span>
            <span className="hidden flex-col leading-tight xl:flex">
              <span className="text-[12.5px] font-bold text-slate-900">نفت و گاز نواتیک</span>
              <span className="text-[10.5px] text-slate-500">سامانه مدیریت و حسابداری</span>
            </span>
          </a>

          <nav aria-label="منوی اصلی" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {headerNav.map((item) => {
                const isActive = activeSection === item.href.replace("#", "");
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(event) => {
                        event.preventDefault();
                        goTo(item.href);
                      }}
                      aria-current={isActive ? "true" : undefined}
                      className={`whitespace-nowrap rounded-full px-2.5 py-2 text-[12.5px] transition-colors ${
                        isActive
                          ? "font-bold text-slate-900 underline decoration-[#54dcc6] decoration-2 underline-offset-[6px]"
                          : "font-medium text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href={`tel:${companyInfo.primaryPhoneHref}`}
              className="hidden items-center gap-2 rounded-full border border-slate-200 px-3.5 py-2 text-[11.5px] font-bold text-slate-700 transition-colors hover:border-[#54dcc6] hover:text-slate-900 xl:flex"
            >
              <PhoneCall className="size-3.5 text-[#0f766e]" aria-hidden="true" />
              <span dir="ltr" className="font-mono">
                {companyInfo.primaryPhoneLabel}
              </span>
            </a>
            <a
              href="#contact"
              onClick={(event) => {
                event.preventDefault();
                goTo("#contact");
              }}
              className="hidden rounded-full bg-slate-900 px-5 py-2.5 text-[12.5px] font-bold text-white transition-colors hover:bg-[#0f766e] sm:inline-flex"
            >
              درخواست دمو
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "بستن منو" : "باز کردن منو"}
              className="flex size-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 lg:hidden"
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 top-0 z-40 lg:hidden ${menuOpen ? "visible" : "invisible pointer-events-none"}`}
        aria-hidden={!menuOpen}
      >
        <div
          className={`absolute inset-0 bg-slate-900/30 transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
        />
        <nav
          aria-label="منوی موبایل"
          className={`absolute inset-x-0 top-0 bg-white px-5 pb-6 pt-24 shadow-xl transition-transform duration-300 ${
            menuOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <ul className="grid grid-cols-2 gap-2">
            {headerNav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(event) => {
                    event.preventDefault();
                    goTo(item.href);
                  }}
                  className="block rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-[13px] font-medium text-slate-700"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={`tel:${companyInfo.primaryPhoneHref}`}
            className="mt-3 flex items-center justify-between rounded-lg bg-[#54dcc6] px-4 py-3 text-[13px] font-bold text-slate-900"
          >
            <span>تماس با کارشناس</span>
            <span dir="ltr" className="font-mono">
              {companyInfo.primaryPhoneLabel}
            </span>
          </a>
        </nav>
      </div>
    </>
  );
}
