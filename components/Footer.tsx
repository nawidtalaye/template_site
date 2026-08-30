"use client";

import Image from "next/image";
import { ArrowUp, Mail, MapPin, PhoneCall, Send } from "lucide-react";
import type { MouseEvent } from "react";

import { footer, navItems } from "@/lib/showcase-content";
import { companyInfo } from "@/lib/site-content";

const extraLinks = [
  { href: "#statistics", label: "آمار و شاخص‌ها" },
  { href: "#process", label: "فرآیند کار" },
  { href: "#benefits", label: "مزایا" },
  { href: "#customers", label: "مشتریان" },
  { href: "#hero", label: "بالای صفحه" },
];

export default function Footer() {
  const go = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    event.preventDefault();
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className="border-t border-slate-200 bg-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        اطلاعات تماس {companyInfo.brandName}
      </h2>

      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-16">
        {/* ردیف بالا */}
        <div className="flex flex-col items-start justify-between gap-6 border-b border-slate-200 pb-10 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <span className="flex h-12 items-center justify-center rounded-xl border border-slate-200 px-3">
              <Image
                src="/images/novatech-logo.webp"
                alt={`لوگوی ${companyInfo.brandName}`}
                width={150}
                height={40}
                sizes="120px"
                className="h-7 w-auto object-contain"
              />
            </span>
            <span className="flex flex-col">
              <span className="text-[14px] font-black text-slate-900">
                سامانه مدیریت و حسابداری نفت و گاز {companyInfo.brandName}
              </span>
              <span className="mt-0.5 text-[11.5px] text-slate-500">
                ساعت پاسخ‌گویی: {companyInfo.workHours} {companyInfo.workDays}
              </span>
            </span>
          </div>

          <a
            href="#contact"
            onClick={(event) => go(event, "#contact")}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-[13px] font-black text-slate-900 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover"
          >
            <PhoneCall className="size-4" aria-hidden="true" />
            <span>تماس با کارشناسان</span>
          </a>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-3">
            <h3 className="text-[13px] font-black text-slate-900">درباره نواتیک</h3>
            <p className="text-[12.5px] leading-7 text-slate-500">{footer.tagline}</p>
            <p className="mt-1 text-[11.5px] leading-6 text-slate-400">{footer.legalNote}</p>
          </div>

          <nav aria-label="بخش‌های صفحه" className="flex flex-col gap-3">
            <h3 className="text-[13px] font-black text-slate-900">{footer.sectionsTitle}</h3>
            <ul className="flex flex-col gap-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(event) => go(event, item.href)}
                    className="text-[12.5px] text-slate-500 transition-colors duration-300 hover:text-primary-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="بخش‌های دیگر" className="flex flex-col gap-3">
            <h3 className="text-[13px] font-black text-slate-900">بیشتر</h3>
            <ul className="flex flex-col gap-2.5">
              {extraLinks.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(event) => go(event, item.href)}
                    className="text-[12.5px] text-slate-500 transition-colors duration-300 hover:text-primary-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-3">
            <h3 className="text-[13px] font-black text-slate-900">{footer.contactTitle}</h3>
            <ul className="flex flex-col gap-3 text-[12.5px] text-slate-500">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary-ink" aria-hidden="true" />
                <span>{companyInfo.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <PhoneCall className="size-4 shrink-0 text-primary-ink" aria-hidden="true" />
                <a
                  href={`tel:${companyInfo.primaryPhoneHref}`}
                  dir="ltr"
                  className="num font-bold text-slate-700 transition-colors hover:text-primary-ink"
                >
                  {companyInfo.primaryPhoneLabel}
                </a>
                <span className="text-slate-300">/</span>
                <a
                  href={`tel:${companyInfo.secondaryPhoneHref}`}
                  dir="ltr"
                  className="num font-bold text-slate-700 transition-colors hover:text-primary-ink"
                >
                  {companyInfo.secondaryPhoneLabel}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-primary-ink" aria-hidden="true" />
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="font-medium text-slate-700 transition-colors hover:text-primary-ink"
                >
                  {companyInfo.email}
                </a>
              </li>
            </ul>

            <div className="mt-2 flex items-center gap-2.5">
              <a
                href={companyInfo.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`اینستاگرام ${companyInfo.brandName}`}
                className="flex size-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition-colors hover:border-primary/40 hover:text-primary-ink"
              >
                <svg viewBox="0 0 448 512" className="size-4" fill="currentColor" aria-hidden="true">
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                </svg>
              </a>
              <a
                href={companyInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`واتساپ ${companyInfo.brandName}`}
                className="flex size-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition-colors hover:border-primary/40 hover:text-primary-ink"
              >
                <Send className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 text-[11.5px] text-slate-500 sm:flex-row">
          <p>
            تمامی حقوق متعلق به شرکت نرم‌افزاری و تکنالوژی{" "}
            <span className="font-bold text-slate-800">{companyInfo.brandName}</span> ({companyInfo.legalName}) است.
          </p>
          <div className="flex items-center gap-4">
            <span>توسعه‌یافته در هرات، افغانستان</span>
            <span className="text-slate-300">·</span>
            <a
              href="#hero"
              onClick={(event) => go(event, "#hero")}
              className="flex items-center gap-1.5 font-bold text-slate-600 transition-colors hover:text-primary-ink"
            >
              <span>بازگشت به بالا</span>
              <ArrowUp className="size-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
