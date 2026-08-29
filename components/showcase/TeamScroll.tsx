"use client";

import Image from "next/image";
import { Sparkles } from "lucide-react";

const team = [
  { name: "مهندس مهدی", role: "مدیر فنی و معماری دیتابیس", image: "/images/mahdi.webp", fallback: "/images/mahdi.png" },
  { name: "علی حسینی", role: "توسعه‌دهنده ارشد ERP", image: "/images/ali.webp", fallback: "/images/novatech-team.webp" },
  { name: "تیم پشتیبانی", role: "پشتیبانی و استقرار در محل", image: "/images/novatech-support-agent.webp", fallback: "/images/novatech-team.webp" },
  { name: "تیم نواتیک", role: "توسعه نرم‌افزار نفت و گاز", image: "/images/novatech-team.webp", fallback: "/images/novatech-team-workspace.webp" },
  { name: "کارگاه نواتیک", role: "فضای کاری و تحقیق و توسعه", image: "/images/novatech-team-workspace.webp", fallback: "/images/novatech-team.webp" },
  { name: "واحد طراحی", role: "UI/UX و تجربه کاربری", image: "/images/graphic.webp", fallback: "/images/novatech-logo.webp" },
];

export default function TeamScroll() {
  return (
    <section id="team" className="py-16 lg:py-20 bg-slate-50 border-y border-slate-100 overflow-hidden relative" aria-labelledby="team-heading">
      <div className="absolute inset-0 bg-grid-light opacity-30 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-[#0f766e] text-xs font-bold mb-3 shadow-sm"><Sparkles className="size-3.5" /><span>اسکرول تیم نواتیک</span></div>
            <h2 id="team-heading" className="text-2xl sm:text-3xl font-black fat text-slate-900">تیم متخصص پشت سامانه نفت و گاز</h2>
            <p className="text-sm text-slate-600 mt-2">مهندسان نرم‌افزار، تحلیل‌گران مالی و متخصصان استقرار در کنار شما</p>
          </div>
          <div className="text-xs text-slate-500 bg-white border border-slate-200 rounded-full px-4 py-2 w-fit">هاور کنید تا اسکرول متوقف شود • Drag to explore</div>
        </div>
      </div>

      <div className="team-scroll relative w-full overflow-hidden py-2">
        <div className="team-scroll-track px-4">
          {[...team, ...team].map((member, idx) => (
            <div key={`${member.name}-${idx}`} className="group w-[260px] shrink-0 rounded-[20px] bg-white border border-slate-200 overflow-hidden shadow-[0_10px_30px_rgba(15,23,42,0.06)] hover:shadow-[0_18px_40px_rgba(15,23,42,0.10)] hover:border-[#54dcc6]/40 transition-all hover:-translate-y-1">
              <div className="relative h-[220px] overflow-hidden bg-slate-100">
                <Image src={member.image} alt={member.name} width={400} height={400} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
                <div className="absolute bottom-3 right-3 left-3">
                  <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-full px-3 py-1.5 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-900">{member.role}</span>
                    <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-[15px] font-bold text-slate-900">{member.name}</h3>
                <p className="text-[12px] text-slate-500 mt-1">{member.role}</p>
                <div className="mt-3 flex items-center gap-2 text-[11px] text-[#0f766e] font-bold">
                  <span className="px-2.5 py-1 rounded-full bg-[#54dcc6]/12 border border-[#54dcc6]/20">نواتیک • Herat</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
