"use client";

import { Headset, Mail, MapPin, PhoneCall, Send, Sparkles } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import { showcaseContent } from "@/lib/showcase-content";
import { companyInfo } from "@/lib/site-content";

export default function ContactCta() {
  return (
    <section id="contact" className="py-16 lg:py-24 bg-slate-50 text-slate-900 relative overflow-hidden border-t border-slate-100" aria-labelledby="contact-heading">
      <div className="absolute inset-0 bg-grid-light opacity-40 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#54dcc6]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-[28px] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)] p-6 sm:p-10 lg:p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-[420px] h-[420px] bg-[#54dcc6]/8 rounded-full blur-3xl pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
            <div className="lg:col-span-6 flex flex-col">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#54dcc6]/10 border border-[#54dcc6]/20 text-[#0f766e] text-xs font-bold mb-4 self-start"><Sparkles className="size-3.5" /><span>مشاوره و استقرار تخصصی</span></div>
              <h2 id="contact-heading" className="text-2xl sm:text-3xl md:text-[34px] font-black fat leading-snug text-slate-900 mb-4">{showcaseContent.contactCta.title}</h2>
              <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed mb-8">{showcaseContent.contactCta.subtitle}</p>

              <div className="flex flex-col gap-3.5">
                <a href={`tel:${companyInfo.primaryPhoneHref}`} className="p-4 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-[#54dcc6]/30 flex items-center justify-between transition-all group shadow-sm hover:shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="size-11 rounded-xl bg-[#54dcc6]/15 text-[#0f766e] border border-[#54dcc6]/20 flex items-center justify-center group-hover:bg-[#54dcc6] group-hover:text-slate-900 transition-colors"><PhoneCall className="size-5" /></div>
                    <div className="flex flex-col text-right"><span className="text-[11px] text-slate-500">تماس مستقیم با کارشناسان</span><span className="text-sm font-bold text-slate-900 font-mono" dir="ltr">{companyInfo.primaryPhoneLabel}</span></div>
                  </div>
                  <span className="text-xs text-[#0f766e] font-bold">تماس فوری ←</span>
                </a>
                <a href={`tel:${companyInfo.secondaryPhoneHref}`} className="p-4 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-[#54dcc6]/30 flex items-center justify-between transition-all group shadow-sm hover:shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="size-11 rounded-xl bg-slate-100 text-slate-600 border border-slate-200 flex items-center justify-center"><PhoneCall className="size-5" /></div>
                    <div className="flex flex-col text-right"><span className="text-[11px] text-slate-500">خط پشتیبانی و مشاوره</span><span className="text-sm font-bold text-slate-900 font-mono" dir="ltr">{companyInfo.secondaryPhoneLabel}</span></div>
                  </div>
                  <span className="text-xs text-slate-500 font-bold">تماس مستقیم ←</span>
                </a>
                <a href={companyInfo.whatsappUrl} target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl bg-emerald-50 hover:bg-emerald-50 border border-emerald-200 flex items-center justify-between transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="size-11 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-sm"><Send className="size-5" /></div>
                    <div className="flex flex-col text-right"><span className="text-[11px] text-emerald-700">واتساپ واحد نفت و گاز</span><span className="text-sm font-bold text-emerald-700">{showcaseContent.contactCta.whatsappLabel}</span></div>
                  </div>
                  <span className="text-xs text-emerald-700 font-bold">ارسال پیام ←</span>
                </a>

                <div className="mt-2 p-4 rounded-2xl bg-white border border-slate-200 flex flex-col gap-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2"><MapPin className="size-4 text-[#54dcc6] shrink-0" /><span>{companyInfo.address}</span></div>
                  <div className="flex items-center gap-2"><Mail className="size-4 text-[#54dcc6] shrink-0" /><a href={`mailto:${companyInfo.email}`} className="hover:text-[#0f766e]">{companyInfo.email}</a></div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-slate-50 border border-slate-200 p-6 sm:p-8 rounded-[20px] shadow-inner">
              <h3 className="text-lg font-black fat text-slate-900 mb-2">ثبت درخواست دمو و تماس کارشناس</h3>
              <p className="text-[13px] text-slate-600 mb-6">{showcaseContent.contactCta.leadPrompt}</p>
              <LeadForm source="bottom-cta-showcase" id="contact-lead-form" className="flex flex-col gap-4">
                <div>
                  <label htmlFor="contact-form-name" className="block text-xs font-bold text-slate-700 mb-1.5">نام و نام خانوادگی / نام مجموعه:</label>
                  <input id="contact-form-name" name="name" type="text" required autoComplete="name" placeholder="مثال: احمد رحیمی (شرکت انرژی آریا)" className="w-full rounded-full border border-slate-200 bg-white px-5 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-[#54dcc6] focus:ring-4 focus:ring-[#54dcc6]/15 transition-all" />
                </div>
                <div>
                  <label htmlFor="contact-form-phone" className="block text-xs font-bold text-slate-700 mb-1.5">شماره تماس (موبایل یا واتساپ):</label>
                  <input id="contact-form-phone" name="phone" type="tel" dir="ltr" required autoComplete="tel" placeholder="07XXXXXXXX" className="w-full rounded-full border border-slate-200 bg-white px-5 py-3 text-sm text-slate-900 placeholder:text-slate-400 text-left outline-none focus:border-[#54dcc6] focus:ring-4 focus:ring-[#54dcc6]/15 transition-all font-medium" />
                </div>
                <div>
                  <label htmlFor="contact-form-message" className="block text-xs font-bold text-slate-700 mb-1.5">توضیحات یا نیازمندی‌های خاص (اختیاری):</label>
                  <textarea id="contact-form-message" name="message" rows={3} placeholder="تعداد دیپوها، نحوه حمل یا نوع فرآورده‌های مورد نظر..." className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-[#54dcc6] focus:ring-4 focus:ring-[#54dcc6]/15 transition-all resize-none" />
                </div>
                <button type="submit" className="w-full py-3.5 rounded-full bg-[#54dcc6] hover:bg-[#45bba7] text-slate-900 font-black text-sm shadow-[0_10px_24px_rgba(84,220,198,0.28)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] mt-2">
                  <Headset className="size-4" /><span>ثبت و ارسال درخواست مشاوره</span>
                </button>
              </LeadForm>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
