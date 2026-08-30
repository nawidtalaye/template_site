"use client";

import { Headset, Mail, MapPin, PhoneCall, Send } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import Reveal from "@/components/Reveal";
import { showcaseContent } from "@/lib/showcase-content";
import { companyInfo } from "@/lib/site-content";

export default function ContactCta() {
  const { contactCta } = showcaseContent;

  return (
    <section id="contact" className="bg-white py-20 lg:py-28" aria-labelledby="contact-heading">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <span className="flex items-center gap-3 text-[11px] font-bold tracking-wide text-[#0f766e]">
                {contactCta.eyebrow}
                <span className="h-px w-8 bg-[#0f766e]/35" aria-hidden="true" />
              </span>
              <h2
                id="contact-heading"
                className="mt-4 text-[24px] font-black leading-[1.45] text-slate-900 sm:text-[30px] lg:text-[34px]"
              >
                {contactCta.title}
              </h2>
              <p className="mt-4 text-[14px] leading-[2.1] text-slate-600">{contactCta.subtitle}</p>
            </Reveal>

            <Reveal delay={80}>
              <ul className="mt-9 flex flex-col gap-px overflow-hidden rounded-[4px] border border-slate-200 bg-slate-200">
                <li>
                  <a
                    href={`tel:${companyInfo.primaryPhoneHref}`}
                    className="flex items-center justify-between gap-4 bg-white px-5 py-4 transition-colors hover:bg-slate-50"
                  >
                    <span className="flex items-center gap-3">
                      <PhoneCall className="size-4 shrink-0 text-[#0f766e]" aria-hidden="true" />
                      <span className="text-[13.5px] text-slate-700">
                        <span className="block text-[11px] text-slate-500">تماس مستقیم</span>
                        <span dir="ltr" className="font-mono text-[14px] font-bold text-slate-900">
                          {companyInfo.primaryPhoneLabel}
                        </span>
                      </span>
                    </span>
                    <span className="text-[11.5px] font-bold text-[#0f766e]">تماس فوری</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${companyInfo.secondaryPhoneHref}`}
                    className="flex items-center justify-between gap-4 bg-white px-5 py-4 transition-colors hover:bg-slate-50"
                  >
                    <span className="flex items-center gap-3">
                      <PhoneCall className="size-4 shrink-0 text-slate-400" aria-hidden="true" />
                      <span className="text-[13.5px] text-slate-700">
                        <span className="block text-[11px] text-slate-500">خط پشتیبانی</span>
                        <span dir="ltr" className="font-mono text-[14px] font-bold text-slate-900">
                          {companyInfo.secondaryPhoneLabel}
                        </span>
                      </span>
                    </span>
                    <span className="text-[11.5px] font-bold text-slate-500">پاسخگویی در ساعات کاری</span>
                  </a>
                </li>
                <li>
                  <a
                    href={companyInfo.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-4 bg-white px-5 py-4 transition-colors hover:bg-slate-50"
                  >
                    <span className="flex items-center gap-3">
                      <Send className="size-4 shrink-0 text-[#0f766e]" aria-hidden="true" />
                      <span className="text-[13.5px] text-slate-700">
                        <span className="block text-[11px] text-slate-500">{contactCta.whatsappLabel}</span>
                        <span dir="ltr" className="font-mono text-[14px] font-bold text-slate-900">
                          {companyInfo.whatsappLabel}
                        </span>
                      </span>
                    </span>
                    <span className="text-[11.5px] font-bold text-[#0f766e]">ارسال پیام</span>
                  </a>
                </li>
                <li className="flex flex-col gap-2.5 bg-white px-5 py-4 text-[13px] text-slate-600">
                  <span className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-slate-400" aria-hidden="true" />
                    <span>{companyInfo.address}</span>
                  </span>
                  <span className="flex items-start gap-3">
                    <Mail className="mt-0.5 size-4 shrink-0 text-slate-400" aria-hidden="true" />
                    <a href={`mailto:${companyInfo.email}`} className="hover:text-[#0f766e]">
                      {companyInfo.email}
                    </a>
                  </span>
                  <span className="ps-[28px] text-[12px] text-slate-500">
                    ساعات پاسخگویی: {companyInfo.workHours} {companyInfo.workDays}
                  </span>
                </li>
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={100}>
              <div className="rounded-[6px] border border-slate-200 bg-slate-50 p-6 sm:p-8">
                <h3 className="text-[17px] font-black text-slate-900">ثبت درخواست دمو</h3>
                <p className="mt-2 text-[13px] leading-[1.9] text-slate-600">{contactCta.leadPrompt}</p>

                <LeadForm source="contact-cta" id="contact-lead-form" className="mt-6 flex flex-col gap-4">
                  <div>
                    <label htmlFor="lead-name" className="mb-1.5 block text-[12px] font-bold text-slate-700">
                      نام شما یا نام مجموعه
                    </label>
                    <input
                      id="lead-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="مثال: احمد رحیمی (شرکت انرژی آریا)"
                      className="w-full rounded-full border border-slate-200 bg-white px-5 py-3 text-[13.5px] text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-[#54dcc6] focus:ring-4 focus:ring-[#54dcc6]/15"
                    />
                  </div>
                  <div>
                    <label htmlFor="lead-phone" className="mb-1.5 block text-[12px] font-bold text-slate-700">
                      شماره تماس (موبایل یا واتساپ)
                    </label>
                    <input
                      id="lead-phone"
                      name="phone"
                      type="tel"
                      dir="ltr"
                      required
                      autoComplete="tel"
                      placeholder="07XXXXXXXX"
                      className="w-full rounded-full border border-slate-200 bg-white px-5 py-3 text-left font-mono text-[13.5px] font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-[#54dcc6] focus:ring-4 focus:ring-[#54dcc6]/15"
                    />
                  </div>
                  <div>
                    <label htmlFor="lead-message" className="mb-1.5 block text-[12px] font-bold text-slate-700">
                      توضیحات (اختیاری)
                    </label>
                    <textarea
                      id="lead-message"
                      name="message"
                      rows={3}
                      placeholder="تعداد دیپوها، نوع فرآورده یا نحوه حمل..."
                      className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-5 py-3 text-[13.5px] text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-[#54dcc6] focus:ring-4 focus:ring-[#54dcc6]/15"
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-1 flex w-full items-center justify-center gap-2 rounded-full bg-[#54dcc6] py-3.5 text-[13.5px] font-bold text-slate-900 transition-colors hover:bg-[#45bba7]"
                  >
                    <Headset className="size-4" aria-hidden="true" />
                    <span>ثبت و ارسال درخواست</span>
                  </button>
                </LeadForm>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
