"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Activity,
  Award,
  BarChart3,
  Boxes,
  CheckCircle2,
  ChevronLeft,
  Coins,
  FileSpreadsheet,
  Fuel,
  Headset,
  Home,
  Info,
  Layers,
  Menu,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Workflow,
  X,
} from "lucide-react";
import { companyInfo } from "@/lib/site-content";

const NAV_ITEMS = [
  { href: "#hero", label: "خانه", icon: Home },
  { href: "#intro", label: "معرفی", icon: Info },
  { href: "#features", label: "امکانات", icon: Sparkles },
  { href: "#modules", label: "ماژول‌ها", icon: Boxes },
  { href: "#capabilities", label: "راهکارها", icon: Fuel },
  { href: "#statistics", label: "آمار", icon: BarChart3 },
  { href: "#how-it-works", label: "فرآیند", icon: Workflow },
  { href: "#showcase", label: "نمای نرم‌افزار", icon: Activity },
  { href: "#plans", label: "پلن‌ها", icon: Coins },
  { href: "#about", label: "درباره نواتیک", icon: Award },
  { href: "#contact", label: "تماس", icon: PhoneCall },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Scrollspy active section detection
      const sections = NAV_ITEMS.map((item) => item.href.replace("#", ""));
      const scrollPosition = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const scrollToAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        closeMobileMenu();
      }
    }
  };

  return (
    <>
      <header
        id="header"
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-slate-950/95 backdrop-blur-md border-b border-white/10 shadow-xl py-3"
            : "bg-slate-950/80 backdrop-blur-sm border-b border-white/5 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo & Brand Tagline */}
            <div className="flex items-center gap-6">
              <a
                href="#hero"
                onClick={(e) => scrollToAnchor(e, "#hero")}
                className="flex items-center gap-3 group"
              >
                <div className="h-10 w-auto rounded-lg bg-white p-1.5 flex items-center justify-center shadow-md">
                  <Image
                    alt={`لوگوی ${companyInfo.brandName}`}
                    src="/images/novatech-logo.webp"
                    width={180}
                    height={50}
                    priority
                    sizes="120px"
                    className="h-7 w-auto object-contain"
                  />
                </div>
                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-sm font-bold text-white group-hover:text-primary transition-colors">
                    نفت و گاز نواتیک
                  </span>
                  <span className="text-[10px] text-slate-400">
                    سامانه هوشمند مدیریت و حسابداری
                  </span>
                </div>
              </a>

              {/* Desktop Navigation Links */}
              <nav aria-label="منوی اصلی سامانه" className="hidden xl:block">
                <ul className="flex items-center gap-1">
                  {NAV_ITEMS.map((item) => {
                    const isActive = activeSection === item.href.replace("#", "");
                    return (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          onClick={(e) => scrollToAnchor(e, item.href)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                            isActive
                              ? "text-primary bg-primary/10 font-bold"
                              : "text-slate-300 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          {item.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>

            {/* Actions: Direct Phone CTA & Mobile Hamburger */}
            <div className="flex items-center gap-2.5">
              <a
                href={`tel:${companyInfo.primaryPhoneHref}`}
                className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/10 hover:bg-primary hover:text-slate-950 border border-white/15 text-white text-xs font-bold transition-all duration-200 shadow-sm"
              >
                <PhoneCall className="size-3.5 text-primary group-hover:text-slate-950" />
                <span dir="ltr" className="font-mono">{companyInfo.primaryPhoneLabel}</span>
              </a>

              <a
                href="#contact"
                onClick={(e) => scrollToAnchor(e, "#contact")}
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary hover:bg-primary-hover text-slate-950 text-xs font-bold transition-all duration-200 shadow-md shadow-primary/20 active:scale-95"
              >
                <span>درخواست دمو</span>
              </a>

              {/* Mobile Menu Toggle Button */}
              <button
                type="button"
                onClick={toggleMobileMenu}
                className="xl:hidden p-2 rounded-xl bg-white/10 border border-white/15 text-white hover:text-primary transition-colors"
                aria-label={isMobileMenuOpen ? "بستن منو" : "باز کردن منوی ناوبری"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          id="mobile-navigation"
          className="xl:hidden transition-all duration-300 overflow-hidden bg-slate-950/98 border-b border-white/10"
          style={{
            maxHeight: isMobileMenuOpen ? "80vh" : "0",
            opacity: isMobileMenuOpen ? 1 : 0,
            visibility: isMobileMenuOpen ? "visible" : "hidden",
          }}
        >
          <nav aria-label="منوی موبایل" className="px-4 py-5 overflow-y-auto max-h-[75vh]">
            <div className="grid grid-cols-2 gap-2 mb-4">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.href.replace("#", "");

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => scrollToAnchor(e, item.href)}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-medium transition-all ${
                      isActive
                        ? "bg-primary/20 border-primary text-primary font-bold shadow-sm"
                        : "bg-white/[0.04] border-white/10 text-slate-300 hover:bg-white/[0.08]"
                    }`}
                  >
                    <Icon className="size-4 shrink-0" />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <a
                href={`tel:${companyInfo.primaryPhoneHref}`}
                className="flex items-center justify-between p-3 rounded-xl bg-primary text-slate-950 font-bold text-xs"
              >
                <div className="flex items-center gap-2">
                  <PhoneCall className="size-4" />
                  <span>تماس با کارشناس نفتی</span>
                </div>
                <span dir="ltr" className="font-mono">{companyInfo.primaryPhoneLabel}</span>
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Backdrop overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 xl:hidden"
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
}
