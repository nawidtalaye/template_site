"use client";

import Image from "next/image";
import { Mail, MapPin, PhoneCall, Send } from "lucide-react";
import { footerSecondaryNav, headerNav } from "@/lib/navigation";
import { companyInfo } from "@/lib/site-content";

export default function Footer() {
  const goTo = (href: string) => {
    const el = document.getElementById(href.replace("#", ""));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-900 pt-16 text-slate-300">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <span className="relative block h-10 w-[144px]">
                <Image
                  src="/images/novatech-logo.webp"
                  alt={`لوگوی ${companyInfo.brandName}`}
                  fill
                  sizes="144px"
                  className="object-contain object-right"
                />
              </span>
            </div>
            <p className="mt-5 text-[12.5px] leading-[2] text-slate-400">{companyInfo.longDescription}</p>
            <div className="mt-6 flex flex-col gap-2.5 text-[12.5px] text-slate-400">
              <span className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-[#54dcc6]" aria-hidden="true" />
                {companyInfo.address}
              </span>
              <a
                href={`mailto:${companyInfo.email}`}
                className="flex items-start gap-2.5 transition-colors hover:text-[#54dcc6]"
              >
                <Mail className="mt-0.5 size-4 shrink-0 text-[#54dcc6]" aria-hidden="true" />
                {companyInfo.email}
              </a>
            </div>
          </div>

          <nav aria-label="بخش‌های صفحه" className="lg:col-span-3">
            <h2 className="text-[11.5px] font-bold tracking-wide text-white">بخش‌های صفحه</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {headerNav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(event) => {
                      event.preventDefault();
                      goTo(item.href);
                    }}
                    className="text-[12.5px] text-slate-400 transition-colors hover:text-[#54dcc6]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="اطلاعات بیشتر" className="lg:col-span-3">
            <h2 className="text-[11.5px] font-bold tracking-wide text-white">اطلاعات بیشتر</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {footerSecondaryNav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(event) => {
                      event.preventDefault();
                      goTo(item.href);
                    }}
                    className="text-[12.5px] text-slate-400 transition-colors hover:text-[#54dcc6]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h2 className="text-[11.5px] font-bold tracking-wide text-white">تماس</h2>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a
                  href={`tel:${companyInfo.primaryPhoneHref}`}
                  className="flex items-center gap-2 text-[13px] font-mono font-bold text-white transition-colors hover:text-[#54dcc6]"
                  dir="ltr"
                >
                  <PhoneCall className="size-3.5 text-[#54dcc6]" aria-hidden="true" />
                  {companyInfo.primaryPhoneLabel}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${companyInfo.secondaryPhoneHref}`}
                  className="flex items-center gap-2 font-mono text-[13px] text-slate-400 transition-colors hover:text-[#54dcc6]"
                  dir="ltr"
                >
                  <PhoneCall className="size-3.5 text-slate-500" aria-hidden="true" />
                  {companyInfo.secondaryPhoneLabel}
                </a>
              </li>
              <li>
                <a
                  href={companyInfo.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[13px] text-slate-400 transition-colors hover:text-[#54dcc6]"
                >
                  <Send className="size-3.5 text-slate-500" aria-hidden="true" />
                  واتساپ
                </a>
              </li>
            </ul>
            <p className="mt-5 text-[11.5px] leading-[1.9] text-slate-500">
              {companyInfo.workHours}
              <br />
              {companyInfo.workDays}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-[11.5px] text-slate-500 sm:flex-row">
          <p>تمامی حقوق متعلق به شرکت نرم‌افزاری و تکنالوژی {companyInfo.brandName} ({companyInfo.legalName}) است.</p>
          <p>توسعه‌یافته در {companyInfo.addressCity}، افغانستان</p>
        </div>
      </div>
    </footer>
  );
}
