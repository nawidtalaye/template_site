"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { showcaseContent } from "@/lib/showcase-content";
import { companyInfo } from "@/lib/site-content";

export default function About() {
  const { about, team } = showcaseContent;

  return (
    <section id="about" className="bg-slate-50 py-20 lg:py-28" aria-labelledby="about-heading">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionHeading
                eyebrow={about.eyebrow}
                title={about.title}
                description={about.description}
                align="start"
              />
            </Reveal>

            <Reveal delay={80}>
              <blockquote className="mt-9 border-e-[3px] border-[#54dcc6] bg-white px-6 py-6">
                <p className="text-[14.5px] font-medium leading-[2.1] text-slate-800">{about.quote}</p>
                <footer className="mt-3 text-[12px] font-bold text-slate-500">— {about.quoteAuthor}</footer>
              </blockquote>
            </Reveal>

            <ul className="mt-8 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
              {about.points.map((point, index) => (
                <Reveal as="li" key={point} delay={index * 50} className="flex items-start gap-3 border-t border-slate-200 py-4 text-[13.5px] leading-[1.9] text-slate-700">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#54dcc6]" aria-hidden="true" />
                    <span>{point}</span>
                </Reveal>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={100}>
              <Image
                src="/images/novatech-team-workspace.webp"
                alt="تیم نواتیک در حال بررسی فرآیندهای یک شرکت نفتی"
                width={2292}
                height={1644}
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="h-auto w-full rounded-[4px] object-cover"
              />
              <p className="mt-3 text-[11.5px] text-slate-500">
                دفتر {companyInfo.brandName} — {companyInfo.address}
              </p>
            </Reveal>
          </div>
        </div>

        <div id="team" className="mt-20 scroll-mt-16 border-t border-slate-200 pt-12">
          <Reveal>
            <h3 className="text-[11px] font-bold tracking-wide text-[#0f766e]">{team.eyebrow}</h3>
            <p className="mt-2 text-[20px] font-black text-slate-900 sm:text-[24px]">{team.title}</p>
          </Reveal>

          <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
            {team.members.map((member, index) => (
              <Reveal as="li" key={member.name} delay={index * 60}>
                <div className="overflow-hidden rounded-[4px] bg-slate-200">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={600}
                      height={750}
                      sizes="(min-width: 640px) 30vw, 80vw"
                      className="aspect-[4/5] h-auto w-full object-cover"
                    />
                  </div>
                <h4 className="mt-3 text-[14px] font-bold text-slate-900">{member.name}</h4>
                <p className="mt-1 text-[12px] leading-[1.8] text-slate-600">{member.role}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
