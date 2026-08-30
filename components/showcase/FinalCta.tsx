"use client";

import Image from "next/image";
import { Clock, Mail, MapPin, PhoneCall } from "lucide-react";

import LeadForm from "@/components/LeadForm";
import Reveal from "@/components/motion/Reveal";
import PhoneField from "@/components/ui/PhoneField";
import SubmitButton from "@/components/ui/SubmitButton";
import { finalCta, media } from "@/lib/showcase-content";
import { companyInfo } from "@/lib/site-content";

const contacts = [
  { icon: PhoneCall, label: "تماس مستقیم", value: companyInfo.primaryPhoneLabel, href: `tel:${companyInfo.primaryPhoneHref}`, mono: true },
  { icon: PhoneCall, label: "خط پشتیبانی", value: companyInfo.secondaryPhoneLabel, href: `tel:${companyInfo.secondaryPhoneHref}`, mono: true },
  { icon: Mail, label: "ایمیل", value: companyInfo.email, href: `mailto:${companyInfo.email}`, mono: false },
  { icon: MapPin, label: "دفتر", value: companyInfo.address, href: undefined, mono: false },
  { icon: Clock, label: "ساعات کاری", value: `${companyInfo.workHours} ${companyInfo.workDays}`, href: undefined, mono: false },
];

export default function FinalCta() {
  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden bg-slate-950 py-20 text-white lg:py-28"
      aria-labelledby="contact-heading"
    >
      {/* پس‌زمینه ملایم */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <Image
          src={media.supportImage}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-top opacity-[0.16]"
        />
        <div className="absolute inset-0 bg-slate-950/85" />
        <div className="absolute -left-40 top-1/3 size-[520px] rounded-full bg-primary/10 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* فراخوان و فرم */}
          <div className="lg:col-span-7">
            <Reveal y={24}>
              <span className="flex items-center gap-3 text-[12px] font-bold text-primary">
                <span className="h-px w-9 bg-primary" aria-hidden="true" />
                {finalCta.eyebrow}
              </span>
            </Reveal>

            <Reveal delay={120} y={28}>
              <h2
                id="contact-heading"
                className="mt-5 text-[28px] font-black leading-[1.35] text-white sm:text-[36px] lg:text-[42px]"
              >
                {finalCta.title}
              </h2>
            </Reveal>

            <Reveal delay={220} y={24}>
              <p className="mt-5 max-w-xl text-[15px] leading-8 text-white/70">{finalCta.text}</p>
            </Reveal>

            <Reveal delay={340} y={24} className="mt-10 max-w-xl">
              <p className="mb-3 text-[13px] font-medium text-white/70">{finalCta.formPrompt}</p>
              <LeadForm source="final-cta-oil-gas" id="final-lead-form">
                {() => (
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                    <PhoneField
                      id="final-phone"
                      label="شماره تلفن شما"
                      placeholder={finalCta.phonePlaceholder}
                      tone="dark"
                    />
                    <SubmitButton label={finalCta.submitLabel} />
                  </div>
                )}
              </LeadForm>
              <p className="mt-5 text-[12px] text-white/50">{finalCta.note}</p>
            </Reveal>

            <Reveal delay={460} y={20}>
              <ul className="mt-8 flex flex-col gap-2.5">
                {finalCta.points.map((point) => (
                  <li key={point} className="flex items-center gap-2.5 text-[13px] text-white/60">
                    <span className="h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* اطلاعات تماس */}
          <div className="lg:col-span-5">
            <Reveal delay={180} y={32} className="rounded-[26px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-8">
              <h3 className="text-[13px] font-black text-white">راه‌های ارتباط با تیم نفت و گاز نواتیک</h3>
              <ul className="mt-6 flex flex-col divide-y divide-white/10 border-t border-white/10">
                {contacts.map((contact) => {
                  const content = (
                    <>
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-primary">
                        <contact.icon className="size-4" aria-hidden="true" />
                      </span>
                      <span className="flex min-w-0 flex-col">
                        <span className="text-[11px] text-white/45">{contact.label}</span>
                        <span className={`mt-0.5 truncate text-[14px] font-bold text-white ${contact.mono ? "num" : ""}`}>
                          {contact.value}
                        </span>
                      </span>
                    </>
                  );

                  return (
                    <li key={contact.label}>
                      {contact.href ? (
                        <a
                          href={contact.href}
                          dir={contact.mono ? "ltr" : undefined}
                          className="flex items-center gap-3 py-3.5 transition-opacity duration-300 hover:opacity-80"
                        >
                          {content}
                        </a>
                      ) : (
                        <div className="flex items-center gap-3 py-3.5">{content}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
