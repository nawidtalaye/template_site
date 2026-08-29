import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";

import Breadcrumbs, { type Crumb } from "@/components/Breadcrumbs";
import RelatedLinks from "@/components/RelatedLinks";
import StartReadySection from "@/components/StartReadySection";
import { companyInfo } from "@/lib/site-content";
import type { ServiceKey } from "@/lib/services";

export type ContentBlock = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  /** Optional sub-sections, rendered as H3 groups. */
  groups?: { heading: string; text: string }[];
  /** One contextual link closing the block, in the site's existing link style. */
  link?: { href: string; label: string };
};

/**
 * Shared shell for the service pages so they inherit the site's existing type
 * scale, spacing, card radius and brand colour rather than introducing a new
 * visual language. The content itself is passed in per page — the shell holds no
 * copy of its own beyond labels.
 */
export default function ServicePageShell({
  breadcrumbs,
  eyebrow,
  title,
  intro,
  heroImage,
  heroImageAlt,
  highlights,
  blocks,
  serviceKey,
  caseStudySlugs,
  faq,
}: {
  breadcrumbs: Crumb[];
  eyebrow: string;
  title: string;
  intro: string[];
  heroImage?: string;
  heroImageAlt?: string;
  highlights?: string[];
  blocks: ContentBlock[];
  serviceKey: ServiceKey;
  caseStudySlugs?: string[];
  faq?: { question: string; answer: string }[];
}) {
  return (
    <div className="overflow-hidden">
      <section className="mx-auto w-full max-w-6xl px-5 pt-32 md:pt-36">
        <Breadcrumbs items={breadcrumbs} />

        <div className="mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <p className="bold text-primary">{eyebrow}</p>
            <h1 className="fat text-2xl font-black leading-normal text-gray-900 lg:text-3xl">
              {title}
            </h1>
            {intro.map((paragraph) => (
              <p key={paragraph} className="leading-8 text-gray-700">
                {paragraph}
              </p>
            ))}

            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-full bg-primary px-7 py-3 text-white transition-opacity duration-300 hover:opacity-90"
              >
                درخواست مشاوره رایگان
              </Link>
              <a
                href={`tel:${companyInfo.primaryPhoneHref}`}
                className="rounded-full border border-primary px-7 py-3 text-primary transition-colors duration-300 hover:bg-primary hover:text-white"
              >
                تماس با {companyInfo.brandName}
              </a>
            </div>
          </div>

          {heroImage && (
            <div className="overflow-hidden rounded-3xl border border-gray-100 shadow-sm">
              <Image
                src={heroImage}
                alt={heroImageAlt ?? ""}
                width={1200}
                height={900}
                sizes="(min-width: 1024px) 50vw, 92vw"
                priority
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>

        {highlights && highlights.length > 0 && (
          <ul className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 rounded-2xl border border-gray-100 bg-white p-4 text-sm leading-7 text-gray-700 shadow-sm"
              >
                <Check
                  className="mt-1 size-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-5 py-16 lg:py-20">
        {blocks.map((block) => (
          <section key={block.heading} className="flex flex-col gap-4">
            <h2 className="fat text-2xl leading-normal text-gray-900 md:text-3xl">
              {block.heading}
            </h2>

            {block.paragraphs?.map((paragraph) => (
              <p key={paragraph} className="leading-8 text-gray-700">
                {paragraph}
              </p>
            ))}

            {block.bullets && block.bullets.length > 0 && (
              <ul className="mt-2 grid grid-cols-1 gap-3 md:grid-cols-2">
                {block.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-2 rounded-2xl bg-bg-light p-4 text-sm leading-7 text-gray-700"
                  >
                    <Check
                      className="mt-1 size-4 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}

            {block.groups && block.groups.length > 0 && (
              <div className="mt-2 grid grid-cols-1 gap-5 md:grid-cols-2">
                {block.groups.map((group) => (
                  <div
                    key={group.heading}
                    className="flex flex-col gap-2 rounded-2xl border border-gray-200 bg-white p-5"
                  >
                    <h3 className="bold text-base text-gray-900">
                      {group.heading}
                    </h3>
                    <p className="text-sm leading-7 text-gray-600">
                      {group.text}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {block.link && (
              <Link
                href={block.link.href}
                className="mt-2 flex w-fit items-center gap-1 text-sm text-primary"
              >
                {block.link.label}
                <ArrowLeft size={14} aria-hidden="true" />
              </Link>
            )}
          </section>
        ))}

        {faq && faq.length > 0 && (
          <section className="flex flex-col gap-4">
            <h2 className="fat text-2xl leading-normal text-gray-900 md:text-3xl">
              سوالات متداول
            </h2>
            <div className="flex flex-col gap-3">
              {faq.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-2xl border border-gray-200 bg-white p-5"
                >
                  <summary className="bold cursor-pointer list-none text-base text-gray-900 transition-colors duration-200 group-open:text-primary">
                    {item.question}
                  </summary>
                  <p className="mt-3 text-sm leading-8 text-gray-600">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}
      </div>

      <RelatedLinks serviceKey={serviceKey} caseStudySlugs={caseStudySlugs} />

      <StartReadySection />
    </div>
  );
}
