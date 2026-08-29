"use client";

import Image from "next/image";
import { ArrowLeft, Boxes, Fuel, Layers, ShieldCheck, Truck, Zap } from "lucide-react";

const services = [
  {
    id: "01",
    title: "یکپارچه‌سازی بازرگانی و مالی",
    desc: "اتصال کامل قراردادهای خرید خارجی، هزینه‌های ترانزیت و گمرک، و تسهیم خودکار مصارف روی هر پارت بار برای محاسبه بهای تمام‌شده واقعی هر لیتر.",
    points: ["حسابداری دو ارزی USD/AFN", "تسهیم هزینه‌های جانبی", "سود و زیان محموله‌محور"],
    color: "from-[#54dcc6] to-[#2ab8a0]",
    icon: Boxes,
    image: "/images/showcase/dashboard-main.jpg",
  },
  {
    id: "02",
    title: "پایش مخازن و کنترل افت هوشمند",
    desc: "مدیریت مخازن استوانه‌ای و مکعبی با جدول کالیبراسیون، ثبت لیتر طبیعی و استاندارد، تشخیص افت مجاز از کسری غیرمجاز و هشدار سرریز.",
    points: ["کالیبراسیون دقیق تانک", "تشخیص تبخیر و سرریز", "انبارگردانی بدون توقف"],
    color: "from-sky-400 to-cyan-500",
    icon: Fuel,
    image: "/images/showcase/dashboard-depot.jpg",
  },
  {
    id: "03",
    title: "ناوگان تانکرها و بارنامه الکترونیک",
    desc: "تخصیص راننده و تانکر، صدور بارنامه دیجیتال، ثبت وزن مبدا و مقصد، محاسبه کسری مسیر و تسویه خودکار کرایه حمل.",
    points: ["بارنامه الکترونیک", "کنترل کسری رانندگان", "تسویه کرایه تن/کیلومتر"],
    color: "from-amber-300 to-orange-400",
    icon: Truck,
    image: "/images/showcase/dashboard-fleet.jpg",
  },
  {
    id: "04",
    title: "فروش اعتباری و سقف بدهی",
    desc: "قیمت‌گذاری پویا بر اساس فرآورده و منطقه، قفل هوشمند فروش هنگام عبور از سقف اعتبار، صدور حواله خروج و گزارش گردش حساب مشتریان عمده.",
    points: ["قفل هوشمند اعتبار", "حواله خروج اتوماتیک", "گزارش بدهکاران لحظه‌ای"],
    color: "from-violet-400 to-purple-500",
    icon: ShieldCheck,
    image: "/images/showcase/dashboard-accounting.jpg",
  },
  {
    id: "05",
    title: "هوش تجاری و تصمیم داده‌محور",
    desc: "داشبورد مدیریتی لحظه‌ای، تحلیل سود خالص فصلی، پیش‌بینی اتمام موجودی مخازن، نقشه توزیع و خروجی اکسل/PDF با یک کلیک.",
    points: ["تحلیل سود فصلی", "پیش‌بینی تقاضا", "نقشه توزیع تعاملی"],
    color: "from-emerald-300 to-teal-500",
    icon: Zap,
    image: "/images/showcase/dashboard-reports.jpg",
  },
];

export default function HomeServicesScroll() {
  return (
    <section id="services" className="py-16 lg:py-24 bg-slate-50 relative overflow-hidden border-y border-slate-100" aria-labelledby="services-heading">
      <div className="absolute inset-0 bg-grid-light opacity-40 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-[#0f766e] text-xs font-bold mb-4 shadow-sm">دک کارت‌های چسبان • HomeServicesScroll</div>
            <h2 id="services-heading" className="text-2xl sm:text-3xl md:text-[36px] font-black fat leading-[1.2] text-slate-900 mb-3">سرویس‌های کلیدی نواتیک در یک نگاه چسبان</h2>
            <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">اسکرول کنید تا هر سرویس به صورت کارت‌های چسبان روی هم قرار گیرد — تجربه‌ای آشنا از لندینگ‌های مدرن SaaS با تم روشن نواتیک.</p>
          </div>
          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-500">
            <span className="size-2 rounded-full bg-[#54dcc6] animate-pulse" />
            <span>اسکرول تعاملی • Sticky Stack</span>
          </div>
        </div>

        <div className="home-services-stack flex flex-col gap-6 lg:gap-0">
          {services.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                className="home-services-card group rounded-[24px] bg-white border border-slate-200 shadow-[0_18px_50px_rgba(15,23,42,0.08)] p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row gap-8 items-start lg:items-center"
                style={{ zIndex: idx + 1, transform: `translateY(${idx * 6}px)` }}
              >
                <div className="flex-1 flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <div className={`size-12 rounded-xl bg-gradient-to-br ${s.color} text-white flex items-center justify-center shadow-md`}>
                      <Icon className="size-6" />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono font-bold text-slate-500">SERVICE • {s.id}</div>
                      <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">{s.title}</h3>
                    </div>
                  </div>
                  <p className="text-[14px] text-slate-600 leading-relaxed">{s.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {s.points.map((p) => (
                      <span key={p} className="px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-[11px] font-medium text-slate-700">{p}</span>
                    ))}
                  </div>
                  <a href="#contact" className="inline-flex items-center gap-2 text-sm font-bold text-[#0f766e] hover:text-slate-900 transition-colors mt-1">
                    <span>درخواست دمو برای این سرویس</span>
                    <ArrowLeft className="size-4" />
                  </a>
                </div>
                <div className="w-full lg:w-[380px] shrink-0 rounded-[16px] overflow-hidden border border-slate-200 bg-slate-50 shadow-inner group-hover:shadow-lg transition-shadow">
                  <Image src={s.image} alt={s.title} width={600} height={400} className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-700" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center lg:hidden">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-xs text-slate-500">↑ اسکرول کنید تا کارت‌ها روی هم قرار گیرند</span>
        </div>
      </div>
    </section>
  );
}
