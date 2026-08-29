import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { blogArticles } from "@/lib/blog-content";
import { caseStudies } from "@/lib/case-studies";
import { relatedServicesFor, type ServiceKey } from "@/lib/services";

/**
 * Contextual internal links at the end of a service page: the sibling services a
 * reader plausibly needs next, and the delivered systems that prove this service
 * exists. The links are hand-mapped in `lib/services.ts`, not generated from a
 * keyword list, and each one carries a sentence explaining where it leads.
 */
export default function RelatedLinks({
  serviceKey,
  caseStudySlugs,
  heading = "ادامه مسیر",
}: {
  serviceKey: ServiceKey;
  caseStudySlugs?: string[];
  heading?: string;
}) {
  const siblings = relatedServicesFor(serviceKey);
  const reading = blogArticles.filter(
    (article) => article.relatedService === serviceKey,
  );
  const proof = (caseStudySlugs ?? [])
    .map((slug) => caseStudies.find((study) => study.slug === slug))
    .filter((study): study is (typeof caseStudies)[number] => Boolean(study));

  return (
    <section
      className="mx-auto w-full max-w-6xl px-5 py-16 lg:py-20"
      aria-labelledby="related-links-title"
    >
      <h2 id="related-links-title" className="fat text-2xl md:text-3xl">
        {heading}
      </h2>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {siblings.map((service) => (
          <Link
            key={service.key}
            href={service.path}
            className="group flex h-full flex-col gap-2 rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg"
          >
            <span className="bold text-base text-gray-900 transition-colors duration-300 group-hover:text-primary">
              {service.navLabel}
            </span>
            <span className="text-sm leading-7 text-gray-600">
              {service.teaser}
            </span>
            <span className="mt-auto flex items-center gap-1 pt-3 text-xs text-primary">
              مشاهده صفحه
              <ArrowLeft size={14} aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>

      {proof.length > 0 && (
        <>
          <h3 className="bold mt-12 text-lg text-gray-900">
            نمونه های اجرا شده مرتبط
          </h3>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            {proof.map((study) => (
              <Link
                key={study.slug}
                href={`/portfolio/${study.slug}`}
                className="group flex flex-col gap-2 rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg"
              >
                <span className="text-xs text-primary">{study.industry}</span>
                <span className="bold text-base text-gray-900 transition-colors duration-300 group-hover:text-primary">
                  {study.title}
                </span>
                <span className="text-sm leading-7 text-gray-600">
                  {study.summary}
                </span>
              </Link>
            ))}
          </div>
        </>
      )}
      {reading.length > 0 && (
        <>
          <h3 className="bold mt-12 text-lg text-gray-900">خواندنی مرتبط</h3>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
            {reading.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group flex h-full flex-col gap-2 rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg"
              >
                <span className="text-xs text-primary">{article.category}</span>
                <span className="bold text-sm leading-7 text-gray-900 transition-colors duration-300 group-hover:text-primary">
                  {article.title}
                </span>
              </Link>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
