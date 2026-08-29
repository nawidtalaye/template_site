"use client";

import { Headset, Mail, MapPin, PhoneCall, Send, Sparkles } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import { showcaseContent } from "@/lib/showcase-content";
import { companyInfo } from "@/lib/site-content";

export default function ContactCta() {
  return (
    <section
      id="contact"
      className="py-16 lg:py-24 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 text-white relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl border border-white/15 bg-slate-900/90 shadow-2xl p-6 sm:p-10 lg:p-12 backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Headline & Direct Contact Info */}
            <div className="lg:col-span-6 flex flex-col">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-3.5 self-start">
                <Sparkles className="size-3.5" />
                <span>مشاوره و استقرار تخصصی</span>
              </div>

              <h2
                id="contact-heading"
                className="text-2xl sm:text-3xl md:text-4xl font-bold fat leading-snug text-white mb-4"
              >
                {showcaseContent.contactCta.title}
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed regular mb-8">
                {showcaseContent.contactCta.subtitle}
              </p>

              {/* Contact Channels */}
              <div className="flex flex-col gap-3.5">
                <a
                  href={`tel:${companyInfo.primaryPhoneHref}`}
                  className="p-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-primary/40 flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
                      <PhoneCall className="size-5" />
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-xs text-slate-400">تماس مستقیم با کارشناسان</span>
                      <span className="text-sm font-bold text-white font-mono" dir="ltr">
                        {companyInfo.primaryPhoneLabel}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-primary font-bold">تماس فوری ←</span>
                </a>

                <a
                  href={`tel:${companyInfo.secondaryPhoneHref}`}
                  className="p-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-primary/40 flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
                      <PhoneCall className="size-5" />
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-xs text-slate-400">خط پشتیبانی و مشاوره</span>
                      <span className="text-sm font-bold text-white font-mono" dir="ltr">
                        {companyInfo.secondaryPhoneLabel}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-primary font-bold">تماس مستقیم ←</span>
                </a>

                <a
                  href={companyInfo.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center">
                      <Send className="size-5" />
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-xs text-slate-300">واتساپ واحد نفت و گاز</span>
                      <span className="text-sm font-bold text-emerald-400">
                        {showcaseContent.contactCta.whatsappLabel}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-emerald-400 font-bold">ارسال پیام ←</span>
                </a>
              </div>
            </div>

            {/* Right Column: Interactive Consultation Lead Form */}
            <div className="lg:col-span-6 bg-slate-950/90 border border-white/15 p-6 sm:p-8 rounded-2xl shadow-xl">
              <h3 className="text-lg font-bold fat text-white mb-2">
                ثبت درخواست دمو و تماس کارشناس
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mb-6 regular">
                {showcaseContent.contactCta.leadPrompt}
              </p>

              <LeadForm
                source="bottom-cta-showcase"
                id="contact-lead-form"
                className="flex flex-col gap-4"
              >
                <div>
                  <label htmlFor="contact-form-name" className="block text-xs font-medium text-slate-300 mb-1.5">
                    نام و نام خانوادگی / نام مجموعه:
                  </label>
                  <input
                    id="contact-form-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="مثال: احمد رحیمی (شرکت انرژی آریا)"
                    className="w-full rounded-xl border border-white/20 bg-slate-900 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-primary focus:ring-2 focus:ring-primary/40 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="contact-form-phone" className="block text-xs font-medium text-slate-300 mb-1.5">
                    شماره تماس (موبایل یا واتساپ):
                  </label>
                  <input
                    id="contact-form-phone"
                    name="phone"
                    type="tel"
                    dir="ltr"
                    required
                    autoComplete="tel"
                    placeholder="07XXXXXXXX"
                    className="w-full rounded-xl border border-white/20 bg-slate-900 px-4 py-3 text-sm text-white placeholder:text-slate-500 text-left outline-none focus:border-primary focus:ring-2 focus:ring-primary/40 transition-all font-medium"
                  />
                </div>

                <div>
                  <label htmlFor="contact-form-message" className="block text-xs font-medium text-slate-300 mb-1.5">
                    توضیحات یا نیازمندی‌های خاص (اختیاری):
                  </label>
                  <textarea
                    id="contact-form-message"
                    name="message"
                    rows={3}
                    placeholder="تعداد دیپوها، نحوه حمل یا نوع فرآورده‌های مورد نظر..."
                    className="w-full rounded-xl border border-white/20 bg-slate-900 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-primary focus:ring-2 focus:ring-primary/40 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-slate-950 font-bold text-sm shadow-lg shadow-primary/20 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-98 mt-2"
                >
                  <Headset className="size-4" />
                  <span>ثبت و ارسال درخواست مشاوره</span>
                </button>
              </LeadForm>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
