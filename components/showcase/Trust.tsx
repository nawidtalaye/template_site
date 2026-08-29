"use client";

import { Building2, ShieldCheck } from "lucide-react";
import { showcaseContent } from "@/lib/showcase-content";
import { companyInfo } from "@/lib/site-content";

export default function Trust() {
  return (
    <section
      id="trust"
      className="py-16 lg:py-20 bg-slate-900 text-white relative overflow-hidden border-y border-white/10"
      aria-labelledby="trust-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-3">
            <ShieldCheck className="size-3.5" />
            <span>{showcaseContent.trust.eyebrow}</span>
          </div>
          <h2
            id="trust-heading"
            className="text-2xl sm:text-3xl font-bold fat leading-snug text-white mb-3"
          >
            {showcaseContent.trust.title}
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed regular">
            {showcaseContent.trust.subtitle}
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {showcaseContent.trust.partners.map((partner, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-primary/30 transition-all duration-200 flex flex-col items-center text-center justify-center min-h-[110px] group"
            >
              <div className="size-9 rounded-lg bg-white/5 group-hover:bg-primary/20 group-hover:text-primary text-slate-400 flex items-center justify-center mb-2.5 transition-colors">
                <Building2 className="size-4" />
              </div>
              <span className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors line-clamp-1">
                {partner.name}
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5">
                {partner.role}
              </span>
            </div>
          ))}
        </div>

        {/* Assurance Banner */}
        <div className="mt-10 text-center">
          <span className="inline-flex items-center gap-2 text-xs text-slate-400 bg-slate-950 px-4 py-2 rounded-full border border-white/10">
            <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
            <span>پشتیبانی فنی اختصاصی، امنیت اطلاعات و آموزش جامع سازمانی توسط {companyInfo.brandName}</span>
          </span>
        </div>
      </div>
    </section>
  );
}
