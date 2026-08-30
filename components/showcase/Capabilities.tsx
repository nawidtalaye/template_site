"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { showcaseContent } from "@/lib/showcase-content";

export default function Capabilities() {
  const { capabilities, media } = showcaseContent;

  return (
    <section
      id="capabilities"
      className="relative overflow-hidden bg-slate-900 py-20 lg:py-28"
      aria-labelledby="capabilities-heading"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <SectionHeading
                eyebrow={capabilities.eyebrow}
                title={capabilities.title}
                description={capabilities.subtitle}
                tone="light"
                align="start"
              />
            </Reveal>

            <ol className="mt-10 flex flex-col">
              {capabilities.items.map((item, index) => (
                <Reveal as="li" key={item.title} delay={index * 60} className="flex gap-5 border-t border-white/10 py-5 first:border-t-0 first:pt-0">
                  <span className="text-[12px] font-bold text-[#54dcc6]" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[15px] font-bold text-white">{item.title}</h3>
                    <p className="mt-1.5 text-[13px] leading-[2] text-slate-300">{item.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={100}>
              <Image
                src={media.capabilitiesImage}
                alt="تجهیزات اندازه‌گیری سطح و دمای مخازن سوخت"
                width={1408}
                height={768}
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="h-auto w-full rounded-[4px] object-cover"
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
