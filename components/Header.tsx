"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { companyInfo } from "@/lib/site-content";
import { useState } from "react";
import {
  ChevronLeft,
  Database,
  FolderOpen,
  Globe,
  Headset,
  House,
  Menu,
  PhoneCall,
  Users,
  X,
} from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "c", label: "صفحه اصلی", icon: House },
    { href: "/software-solutions", label: "نرم افزار و دیتابیس", icon: Database },
    { href: "/web-design", label: "طراحی سایت", icon: Globe },
    { href: "/portfolio", label: "نمونه کارها", icon: FolderOpen },
    { href: "/about", label: "درباره ما", icon: Users },
    { href: "/contact", label: "تماس با ما", icon: PhoneCall },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((previousValue) => !previousValue);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActiveLink = (href: string) => pathname === href;

  return (
    <>
      <header
        id="header"
        className="fixed top-0 mx-auto z-40 bg-white w-full shadow-md"
      >
        <div className="bg-white max-w-screen-2xl mx-auto w-full">
          <div className="2xl:w-[1540px] w-full md:drop-shadow-none bg-white z-20 duration-200 py-4 px-[30px] lg:px-[130px]">
          <div className="flex justify-between items-center medium">
            <div className="flex gap-10">
              <Link href="/">
                <Image
                  alt={`لوگوی ${companyInfo.brandName}`}
                  src="/images/novatech-logo.webp"
                  width={960}
                  height={803}
                  priority
                  sizes="80px"
                  className="h-10 w-auto object-contain md:h-11"
                />
              </Link>
              <nav aria-label="منوی اصلی" className="hidden lg:block">
                <ul className="flex justify-center gap-5 items-center">
                  {navItems.map((item) => (
                    <li
                      key={item.href}
                      className="lg:hover:text-primary text-slate-700 h-full duration-200 flex justify-center items-center gap-2 mt-0"
                    >
                      <Link
                        className={`flex justify-center items-center gap-2 ${isActiveLink(item.href) ? "text-primary" : ""}`}
                        href={item.href}
                        aria-current={isActiveLink(item.href) ? "page" : undefined}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div className="flex justify-end items-center gap-3">
              <a
                className="flex items-center gap-2 border rounded-full p-2 text-slate-700 lg:hover:text-primary duration-200 cursor-pointer lg:hover:shadow-md"
                href={`tel:${companyInfo.primaryPhoneHref}`}
              >
                <PhoneCall className="text-2xl" aria-hidden="true" />
                <p className="hidden md:block">تماس مستقیم با کارشناسان</p>
              </a>
              <button
                onClick={toggleMobileMenu}
                className="border rounded-full p-2 text-slate-700 lg:hover:text-primary duration-200 cursor-pointer lg:hover:shadow-md lg:hidden"
                aria-label={isMobileMenuOpen ? "بستن منو" : "باز کردن منو"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-navigation"
              >
                {isMobileMenuOpen ? (
                  <X className="text-2xl" aria-hidden="true" />
                ) : (
                  <Menu className="text-2xl" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
        </div>

        <div
          id="mobile-navigation"
          className="mobile-header-menu lg:hidden"
          aria-hidden={!isMobileMenuOpen}
          inert={!isMobileMenuOpen}
          style={{
            opacity: isMobileMenuOpen ? 1 : 0,
            visibility: isMobileMenuOpen ? "visible" : "hidden",
            pointerEvents: isMobileMenuOpen ? "auto" : "none",
            transform: isMobileMenuOpen ? "translateY(0)" : "translateY(-0.75rem)",
          }}
        >
          <nav aria-label="منوی موبایل" className="px-[30px] py-6 max-h-[calc(100vh-72px)] overflow-y-auto">
            <ul className="flex flex-col gap-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActiveLink(item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={closeMobileMenu}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex items-center justify-between gap-3 py-3.5 px-4 rounded-2xl border transition-all duration-200 ${
                        isActive
                          ? "bg-primary/10 border-primary/20 text-primary shadow-sm"
                          : "bg-white border-gray-100 text-slate-700 hover:bg-gray-50 hover:border-gray-200"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`size-11 rounded-2xl flex items-center justify-center ${
                            isActive ? "bg-primary text-white" : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          <Icon className="size-5" aria-hidden="true" />
                        </span>
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <ChevronLeft aria-hidden="true" className={`size-5 ${isActive ? "text-primary" : "text-gray-400"}`} />
                    </Link>
                  </li>
                );
              })}
              <li className="pt-2">
                <a
                  href={`tel:${companyInfo.primaryPhoneHref}`}
                  className="flex items-center justify-between gap-3 py-3.5 px-4 rounded-2xl bg-[#45505F] text-white shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="size-11 rounded-2xl flex items-center justify-center bg-primary/20 text-primary">
                      <Headset className="size-5" aria-hidden="true" />
                    </span>
                    <div className="flex flex-col">
                      <span className="font-medium">ارتباط با پشتیبانی</span>
                      <span className="text-xs text-white/70">تماس سریع با کارشناسان</span>
                    </div>
                  </div>
                  <PhoneCall className="size-5 text-primary" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {!isMobileMenuOpen && (
        <a
          href={`tel:${companyInfo.primaryPhoneHref}`}
          className="fixed bottom-5 left-5 lg:hidden z-30 size-14 rounded-full bg-[#45505F] text-white shadow-2xl flex items-center justify-center border border-white/20"
          aria-label="ارتباط با پشتیبانی"
        >
          <Headset className="size-6 text-primary" aria-hidden="true" />
        </a>
      )}
    </>
  );
}
