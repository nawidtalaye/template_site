"use client";

import Image from "next/image";
import { companyInfo } from "@/lib/site-content";
import { CheckCircle2, Mail, MapPin, PhoneCall, Send, Sparkles } from "lucide-react";

export default function Footer() {
  const showcaseLinks = [
    { href: "#hero", label: "صفحه اصلی و دمو" },
    { href: "#intro", label: "معرفی نرم‌افزار" },
    { href: "#features", label: "امکانات کلیدی" },
    { href: "#modules", label: "ماژول‌های ۱۰ گانه" },
    { href: "#services", label: "خدمات چسبان" },
    { href: "#capabilities", label: "قابلیت‌های تخصصی" },
  ];
  const systemLinks = [
    { href: "#how-it-works", label: "فرآیند ۵ مرحله‌ای" },
    { href: "#showcase", label: "نمای داشبوردها" },
    { href: "#benefits", label: "مزایای سازمانی" },
    { href: "#plans", label: "پلن‌ها و تعرفه‌ها" },
    { href: "#trust", label: "مشتریان و شرکا" },
    { href: "#about", label: "درباره نواتیک" },
  ];

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const id = href.substring(1);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-slate-50 border-t border-slate-200 relative overflow-hidden" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">اطلاعات تماس نواتیک</h2>
      <div className="absolute inset-0 bg-grid-light opacity-[0.35] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        <div className="rounded-[20px] bg-white border border-slate-200 p-5 sm:p-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-4 shadow-[0_12px_32px_rgba(15,23,42,0.06)]">
          <div className="flex items-center gap-4">
            <div className="h-12 rounded-xl bg-white border border-slate-200 p-2 flex items-center justify-center shadow-sm">
              <Image alt={`لوگوی ${companyInfo.brandName}`} src="/images/novatech-logo.webp" width={180} height={50} sizes="100px" className="h-8 w-auto object-contain" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">سامانه مدیریت و حسابداری نفت و گاز نواتیک</div>
              <div className="text-xs text-slate-500">ساعت پاسخگویی: {companyInfo.workHours} {companyInfo.workDays}</div>
            </div>
          </div>
          <a href={`tel:${companyInfo.primaryPhoneHref}`} className="w-full md:w-auto px-6 py-3 rounded-full bg-[#54dcc6] hover:bg-[#45bba7] text-slate-900 font-bold text-xs sm:text-sm transition-colors shadow-[0_8px_20px_rgba(84,220,198,0.25)] flex items-center justify-center gap-2">
            <PhoneCall className="size-4" />
            <span>تماس مستقیم با کارشناسان نواتیک</span>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 pb-12 border-b border-slate-200">
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2"><Sparkles className="size-4 text-[#54dcc6]" /><span>درباره {companyInfo.brandName}</span></h3>
            <p className="text-xs text-slate-600 leading-relaxed">{companyInfo.shortDescription}</p>
            <div className="flex items-center gap-2 text-xs text-slate-600 mt-2"><CheckCircle2 className="size-4 text-[#54dcc6] shrink-0" /><span>طراحی و استقرار اختصاصی بر اساس فرآیند شما</span></div>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-bold text-slate-900">بخش‌های سامانه</h3>
            <ul className="flex flex-col gap-2">
              {showcaseLinks.map((l) => (
                <li key={l.href}><a href={l.href} onClick={(e) => scrollTo(e, l.href)} className="text-xs text-slate-500 hover:text-[#54dcc6] transition-colors flex items-center gap-1.5"><span>•</span><span>{l.label}</span></a></li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-bold text-slate-900">امکانات و فرآیندها</h3>
            <ul className="flex flex-col gap-2">
              {systemLinks.map((l) => (
                <li key={l.href}><a href={l.href} onClick={(e) => scrollTo(e, l.href)} className="text-xs text-slate-500 hover:text-[#54dcc6] transition-colors flex items-center gap-1.5"><span>•</span><span>{l.label}</span></a></li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-bold text-slate-900">اطلاعات ارتباطی</h3>
            <div className="flex flex-col gap-2.5 text-xs text-slate-600">
              <div className="flex items-start gap-2"><MapPin className="size-4 text-[#54dcc6] shrink-0 mt-0.5" /><span>{companyInfo.address}</span></div>
              <div className="flex items-center gap-2"><PhoneCall className="size-4 text-[#54dcc6] shrink-0" /><a href={`tel:${companyInfo.primaryPhoneHref}`} dir="ltr" className="font-mono text-slate-700 hover:text-[#54dcc6]">{companyInfo.primaryPhoneLabel}</a><span>/</span><a href={`tel:${companyInfo.secondaryPhoneHref}`} dir="ltr" className="font-mono text-slate-700 hover:text-[#54dcc6]">{companyInfo.secondaryPhoneLabel}</a></div>
              <div className="flex items-center gap-2"><Mail className="size-4 text-[#54dcc6] shrink-0" /><a href={`mailto:${companyInfo.email}`} className="text-slate-700 hover:text-[#54dcc6]">{companyInfo.email}</a></div>
            </div>
            <div className="flex items-center gap-2.5 mt-2">
              <a href={companyInfo.instagramUrl} target="_blank" rel="noopener noreferrer" className="size-9 rounded-xl bg-white border border-slate-200 hover:border-pink-200 hover:bg-pink-50 flex items-center justify-center text-slate-500 hover:text-pink-500 transition-colors">
                <svg aria-hidden="true" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className="size-4" xmlns="http://www.w3.org/2000/svg"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg>
              </a>
              <a href={companyInfo.whatsappUrl} target="_blank" rel="noopener noreferrer" className="size-9 rounded-xl bg-white border border-slate-200 hover:border-emerald-200 hover:bg-emerald-50 flex items-center justify-center text-slate-500 hover:text-emerald-600 transition-colors">
                <Send className="size-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-right">
          <div>تمامی حقوق متعلق به شرکت نرم‌افزاری و تکنالوژی <span className="text-slate-800 font-bold">{companyInfo.brandName}</span> ({companyInfo.legalName}) است.</div>
          <div className="flex items-center gap-4">
            <span>توسعه‌یافته در هرات، افغانستان</span>
            <span>•</span>
            <a href="#hero" onClick={(e) => scrollTo(e, "#hero")} className="hover:text-[#54dcc6] transition-colors">بازگشت به بالا ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
