"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Activity,
  Award,
  BarChart3,
  Boxes,
  Coins,
  Fuel,
  Home,
  Info,
  Layers,
  Menu,
  PhoneCall,
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
  { href: "#services", label: "خدمات", icon: Layers },
  { href: "#statistics", label: "آمار", icon: BarChart3 },
  { href: "#how-it-works", label: "فرآیند", icon: Workflow },
  { href: "#showcase", label: "داشبورد", icon: Activity },
  { href: "#plans", label: "پلن‌ها", icon: Coins },
  { href: "#about", label: "درباره ما", icon: Award },
  { href: "#contact", label: "تماس", icon: PhoneCall },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = NAV_ITEMS.map((i) => i.href.replace("#", ""));
      const pos = window.scrollY + 160;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= pos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const id = href.substring(1);
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        setIsMobileMenuOpen(false);
      }
    }
  };

  return (
    <>
      <header
        id="header"
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-[0_8px_32px_rgba(15,23,42,0.06)] py-2.5"
            : "bg-white/80 backdrop-blur-md border-b border-slate-100 py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-8">
              <a href="#hero" onClick={(e) => scrollToAnchor(e, "#hero")} className="flex items-center gap-3 group">
                <div className="h-10 w-auto rounded-xl bg-white border border-slate-200 p-1.5 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                  <Image alt={`لوگوی ${companyInfo.brandName}`} src="/images/novatech-logo.webp" width={160} height={44} priority sizes="110px" className="h-7 w-auto object-contain" />
                </div>
                <div className="hidden sm:flex flex-col text-right leading-none">
                  <span className="text-[13px] font-bold text-slate-900 group-hover:text-[#54dcc6] transition-colors">نفت و گاز نواتیک</span>
                  <span className="text-[10px] text-slate-500 mt-0.5">سامانه هوشمند مدیریت و حسابداری</span>
                </div>
              </a>

              <nav aria-label="منوی اصلی" className="hidden xl:block">
                <ul className="flex items-center gap-0.5">
                  {NAV_ITEMS.map((item) => {
                    const isActive = activeSection === item.href.replace("#", "");
                    return (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          onClick={(e) => scrollToAnchor(e, item.href)}
                          className={`px-3 py-2 rounded-full text-[12px] font-medium transition-all ${
                            isActive ? "bg-[#54dcc6]/15 text-slate-900 font-bold border border-[#54dcc6]/30" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
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

            <div className="flex items-center gap-2.5">
              <a
                href={`tel:${companyInfo.primaryPhoneHref}`}
                className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-50 hover:bg-[#54dcc6]/10 border border-slate-200 text-slate-700 hover:text-slate-900 text-[11px] font-bold transition-colors"
              >
                <PhoneCall className="size-3.5 text-[#54dcc6]" />
                <span dir="ltr" className="font-mono">{companyInfo.primaryPhoneLabel}</span>
              </a>
              <a
                href="#contact"
                onClick={(e) => scrollToAnchor(e, "#contact")}
                className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#54dcc6] hover:bg-[#45bba7] text-slate-900 text-[12px] font-bold shadow-[0_8px_20px_rgba(84,220,198,0.28)] transition-all hover:-translate-y-0.5"
              >
                درخواست دمو
              </a>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((p) => !p)}
                className="xl:hidden size-10 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-[#54dcc6]/40 flex items-center justify-center shadow-sm"
                aria-label={isMobileMenuOpen ? "بستن منو" : "باز کردن منو"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </div>
        </div>

        <div
          className="xl:hidden overflow-hidden transition-all duration-300 bg-white/95 backdrop-blur-xl border-b border-slate-200"
          style={{ maxHeight: isMobileMenuOpen ? "78vh" : "0", opacity: isMobileMenuOpen ? 1 : 0 }}
        >
          <nav className="px-4 py-5 overflow-y-auto max-h-[72vh]">
            <div className="grid grid-cols-2 gap-2 mb-4">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.href.replace("#", "");
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => scrollToAnchor(e, item.href)}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border text-[12px] font-medium transition-all ${
                      isActive ? "bg-[#54dcc6]/15 border-[#54dcc6]/30 text-slate-900 font-bold" : "bg-slate-50 border-slate-200 text-slate-600"
                    }`}
                  >
                    <Icon className="size-4 shrink-0" />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>
            <a href={`tel:${companyInfo.primaryPhoneHref}`} className="flex items-center justify-between p-3.5 rounded-xl bg-[#54dcc6] text-slate-900 font-bold text-xs">
              <span className="flex items-center gap-2"><PhoneCall className="size-4" /> تماس با کارشناس</span>
              <span dir="ltr" className="font-mono">{companyInfo.primaryPhoneLabel}</span>
            </a>
          </nav>
        </div>
      </header>
      {isMobileMenuOpen && <div className="fixed inset-0 bg-slate-900/10 backdrop-blur-[2px] z-40 xl:hidden" onClick={() => setIsMobileMenuOpen(false)} />}
    </>
  );
}
