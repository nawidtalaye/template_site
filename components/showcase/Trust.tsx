"use client";

import { Building2, ShieldCheck } from "lucide-react";
import { showcaseContent } from "@/lib/showcase-content";
import { companyInfo } from "@/lib/site-content";

export default function Trust() {
  return (
    <section id="trust" className="py-16 lg:py-20 bg-slate-50 text-slate-900 relative overflow-hidden border-y border-slate-100" aria-labelledby="trust-heading">
      <div className="absolute inset-0 bg-grid-light opacity-30 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-[#0f766e] text-xs font-bold mb-4 shadow-sm"><ShieldCheck className="size-3.5" /><span>{showcaseContent.trust.eyebrow}</span></div>
          <h2 id="trust-heading" className="text-2xl sm:text-3xl font-black fat leading-snug text-slate-900 mb-3">{showcaseContent.trust.title}</h2>
          <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed">{showcaseContent.trust.subtitle}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {showcaseContent.trust.partners.map((partner, index) => (
            <div key={index} className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#54dcc6]/40 hover:shadow-[0_12px_28px_rgba(15,23,42,0.06)] transition-all flex flex-col items-center text-center justify-center min-h-[120px] group light-card-hover">
              <div className="size-10 rounded-xl bg-slate-50 border border-slate-200 group-hover:bg-[#54dcc6]/15 group-hover:border-[#54dcc6]/20 group-hover:text-[#0f766e] text-slate-400 flex items-center justify-center mb-3 transition-colors">
                <Building2 className="size-5" />
              </div>
              <span className="text-xs font-bold text-slate-800 group-hover:text-slate-900 transition-colors line-clamp-1">{partner.name}</span>
              <span className="text-[11px] text-slate-500 mt-0.5">{partner.role}</span>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <span className="inline-flex items-center gap-2 text-xs text-slate-600 bg-white px-5 py-2.5 rounded-full border border-slate-200 shadow-sm">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>پشتیبانی فنی اختصاصی، امنیت اطلاعات و آموزش جامع سازمانی توسط {companyInfo.brandName}</span>
          </span>
        </div>
      </div>
    </section>
  );
}
