"use client";

import { showcaseContent } from "@/lib/showcase-content";
import { ArrowLeft, CheckCircle2, CircleDot } from "lucide-react";

// 5-stage process as requested
const fiveSteps = [
  {
    number: "۰۱",
    title: "ثبت قرارداد و خرید محموله",
    desc: "ثبت قرارداد خرید در مبدا، تعیین مشخصات فرآورده، نرخ ارزی، تناژ و شرایط پرداخت با تأمین‌کننده خارجی.",
  },
  {
    number: "۰۲",
    title: "بارگیری و اعزام تانکرها",
    desc: "صدور بارنامه الکترونیک، ثبت وزن باسکول مبدا، راننده، شماره تانکر و ردیابی ناوگان تا مرز.",
  },
  {
    number: "۰۳",
    title: "تخلیه در مخازن و محاسبه افت",
    desc: "اندازه‌گیری مقدار تخلیه شده در دیپو، ثبت اختلاف با بارنامه و نگهداری کسری به عنوان رکورد مستقل.",
  },
  {
    number: "۰۴",
    title: "تسهیم مصارف و فروش توزیع",
    desc: "ثبت هزینه‌های ترانزیت، گمرک، عوارض و بیمه روی همان محموله و عرضه نقدی/اعتباری به جایگاه‌ها با کنترل سقف اعتبار.",
  },
  {
    number: "۰۵",
    title: "داشبورد مالی و هوش تجاری",
    desc: "تولید صورت سود و زیان محموله، تراز ارزی، تحلیل بازدهی و تصمیم‌گیری داده‌محور برای مدیران ارشد.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-slate-50 text-slate-900 relative overflow-hidden border-y border-slate-100" aria-labelledby="how-it-works-heading">
      <div className="absolute inset-0 bg-grid-light opacity-30 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-[#0f766e] text-xs font-bold mb-4 shadow-sm">فرآیند ۵ مرحله‌ای</div>
          <h2 id="how-it-works-heading" className="text-2xl sm:text-3xl md:text-[36px] font-black fat leading-snug text-slate-900 mb-4">جریان کار سامانه: از قرارداد تا تصمیم مدیریتی</h2>
          <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">پنج گام یکپارچه که تمامی فرآیندهای فیزیکی و اسناد مالی شرکت‌های نفتی را در یک زنجیره مطمئن متصل می‌سازد.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 relative">
          <div className="hidden lg:block absolute top-[44px] left-[8%] right-[8%] h-0.5 bg-gradient-to-r from-[#54dcc6]/20 via-[#54dcc6]/60 to-[#54dcc6]/20 pointer-events-none" />
          {fiveSteps.map((step, index) => (
            <div key={step.number} className="group relative rounded-[20px] bg-white border border-slate-200 p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)] hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)] hover:border-[#54dcc6]/40 hover:-translate-y-1 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="size-11 rounded-xl bg-[#54dcc6]/12 border border-[#54dcc6]/20 text-[#0f766e] font-mono text-sm font-black flex items-center justify-center group-hover:bg-[#54dcc6] group-hover:text-slate-900 transition-colors">{step.number}</span>
                  <span className="text-[11px] text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full">مرحله {index + 1} از ۵</span>
                </div>
                <h3 className="text-[15px] font-bold text-slate-900 group-hover:text-[#0f766e] transition-colors mb-2 leading-snug">{step.title}</h3>
                <p className="text-[13px] text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-[11px] text-[#0f766e] font-bold">
                <CircleDot className="size-3.5" />
                <span>فرآیند یکپارچه</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="size-5 text-[#54dcc6] shrink-0" />
            <span className="text-[13px] text-slate-700 font-medium">ارتباط بلادرنگ میان دیتابیس دیپوها، واحد حسابداری و تصمیم‌گیرندگان ارشد</span>
          </div>
          <a href="#contact" className="text-[13px] font-bold text-[#0f766e] hover:text-slate-900 flex items-center gap-1.5"><span>درخواست مشاوره فرآیندها</span><ArrowLeft className="size-4" /></a>
        </div>
      </div>
    </section>
  );
}
