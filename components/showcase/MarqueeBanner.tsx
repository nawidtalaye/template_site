"use client";

const items = [
  "سامانه مدیریت نفت و گاز نواتیک",
  "حسابداری دو ارزی USD / AFN",
  "کنترل افت و کسری مخازن",
  "بارنامه الکترونیک و ناوگان تانکر",
  "بهای تمام‌شده واقعی هر لیتر",
  "داشبورد هوش تجاری Real-Time",
  "پایداری آفلاین در دیپوهای دورافتاده",
  "امنیت داده و سطوح دسترسی",
];

export default function MarqueeBanner() {
  return (
    <section className="relative py-0 bg-slate-900 overflow-hidden" aria-label="بنر متحرک">
      <div className="marquee-banner py-3 sm:py-4 border-y border-white/10">
        <div className="marquee-banner-track flex items-center gap-8">
          {[...items, ...items, ...items].map((text, idx) => (
            <div key={`${text}-${idx}`} className="flex items-center gap-8 shrink-0">
              <span className="text-sm sm:text-[15px] font-bold text-white tracking-wide">{text}</span>
              <span className="size-2 rounded-full bg-[#54dcc6] shadow-[0_0_12px_rgba(84,220,198,0.6)]" />
            </div>
          ))}
        </div>
      </div>

      {/* second reverse line */}
      <div className="bg-[#54dcc6] py-2.5 sm:py-3 overflow-hidden">
        <div className="flex animate-marquee-reverse whitespace-nowrap will-change-transform">
          <div className="flex items-center gap-10 shrink-0 px-4">
            {[...items, ...items, ...items].map((text, idx) => (
              <span key={`rev-${idx}`} className="flex items-center gap-10 shrink-0">
                <span className="text-[13px] sm:text-sm font-black text-slate-900">{text}</span>
                <span className="text-slate-900/30">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
