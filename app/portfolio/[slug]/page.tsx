import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Image as ImageIcon } from "lucide-react";

import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import StartReadySection from "@/components/StartReadySection";
import { buildMetadata } from "@/lib/metadata";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import { breadcrumbSchema, graph, webPageSchema } from "@/lib/seo";
import { serviceByKey } from "@/lib/services";
import { companyInfo, siteUrl } from "@/lib/site-content";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    return buildMetadata({
      title: "نمونه کار یافت نشد",
      description: "این نمونه کار وجود ندارد.",
      path: `/portfolio/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    fullTitle:
      study.seoTitle ?? `${study.title} | نمونه کار ${companyInfo.brandName}`,
    title: study.title,
    description: study.seoDescription ?? study.summary,
    path: `/portfolio/${study.slug}`,
    image: study.desktopImage,
    imageAlt: study.desktopImageAlt,
  });
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    notFound();
  }

  const breadcrumbs = [
    { name: "صفحه اصلی", path: "/" },
    { name: "نمونه کارها", path: "/portfolio" },
    { name: study.title, path: `/portfolio/${study.slug}` },
  ];

  const relatedServices = study.services.map((key) => serviceByKey[key]);

  /**
   * `CreativeWork` describes the delivered system itself. No `award`, `review`
   * or client name is published, because none of that is recorded.
   */
  const creativeWorkSchema = {
    "@type": "CreativeWork",
    "@id": `${siteUrl}/portfolio/${study.slug}#project`,
    name: study.title,
    description: study.summary,
    creator: { "@id": `${siteUrl}/#organization` },
    inLanguage: "fa-AF",
    // `image` is omitted rather than guessed when the project has no publishable
    // screenshot; a schema pointing at another system's image would be false.
    ...(study.desktopImage ? { image: `${siteUrl}${study.desktopImage}` } : {}),
    about: study.industry,
    locationCreated: { "@type": "Place", name: study.location },
    keywords: study.capabilities,
  };

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: `/portfolio/${study.slug}`,
            name:
              study.seoTitle ??
              `${study.title} | نمونه کار ${companyInfo.brandName}`,
            description: study.seoDescription ?? study.summary,
          }),
          breadcrumbSchema(breadcrumbs),
          creativeWorkSchema,
        )}
      />

      <article className="overflow-hidden">
        <section className="mx-auto w-full max-w-5xl px-5 pt-32 md:pt-36">
          <Breadcrumbs items={breadcrumbs} />

          <div className="mt-8 flex flex-col gap-4">
            <p className="bold text-primary">{study.industry}</p>
            <h1 className="fat text-2xl font-black leading-normal text-gray-900 lg:text-3xl">
              {study.pageHeading ?? study.title}
            </h1>
            <p className="leading-8 text-gray-700">{study.summary}</p>

            <dl className="mt-2 flex flex-wrap gap-x-10 gap-y-3 text-sm text-gray-600">
              <div className="flex gap-2">
                <dt className="medium text-gray-900">حوزه کاری:</dt>
                <dd>{study.industry}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="medium text-gray-900">لوکیشن مشتری:</dt>
                <dd>{study.location}</dd>
              </div>
            </dl>
          </div>

          {study.desktopImage ? (
            /*
             * Screenshots are wide and fill the frame. The product posters are
             * portrait, so they get a narrower frame and keep their own aspect
             * ratio instead of being cropped to a 16:9 strip of their header.
             */
            <div
              className={`mt-10 overflow-hidden rounded-3xl border border-gray-100 shadow-sm ${
                study.imageOrientation === "portrait"
                  ? "mx-auto w-full max-w-md"
                  : ""
              }`}
            >
              <Image
                src={study.desktopImage}
                alt={study.desktopImageAlt ?? study.title}
                width={study.imageOrientation === "portrait" ? 1122 : 1600}
                height={study.imageOrientation === "portrait" ? 1402 : 900}
                sizes={
                  study.imageOrientation === "portrait"
                    ? "(min-width: 1024px) 448px, 92vw"
                    : "(min-width: 1024px) 900px, 92vw"
                }
                priority
                className={
                  study.imageOrientation === "portrait"
                    ? "h-auto w-full"
                    : "h-full w-full object-cover object-top"
                }
              />
            </div>
          ) : null}
        </section>

        <div className="mx-auto flex w-full max-w-5xl flex-col gap-14 px-5 py-16 lg:py-20">
          <section className="flex flex-col gap-4">
            <h2 className="fat text-2xl leading-normal text-gray-900 md:text-3xl">
              مشکلی که وجود داشت
            </h2>
            {study.problem.map((paragraph) => (
              <p key={paragraph} className="leading-8 text-gray-700">
                {paragraph}
              </p>
            ))}
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="fat text-2xl leading-normal text-gray-900 md:text-3xl">
              راهکاری که ساخته شد
            </h2>
            {study.solution.map((paragraph) => (
              <p key={paragraph} className="leading-8 text-gray-700">
                {paragraph}
              </p>
            ))}
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="fat text-2xl leading-normal text-gray-900 md:text-3xl">
              امکاناتی که پیاده شد
            </h2>
            <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {study.capabilities.map((capability) => (
                <li
                  key={capability}
                  className="flex items-start gap-2 rounded-2xl bg-bg-light p-4 text-sm leading-7 text-gray-700"
                >
                  <Check
                    className="mt-1 size-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span>{capability}</span>
                </li>
              ))}
            </ul>
          </section>

          {study.workflow && study.workflow.length > 0 && (
            <section className="flex flex-col gap-4">
              <h2 className="fat text-2xl leading-normal text-gray-900 md:text-3xl">
                مسیر کار در سیستم
              </h2>
              <p className="leading-8 text-gray-700">
                هر مرحله به همان محموله وصل است، بنابراین زنجیره از ابتدا تا
                گزارش نهایی قابل دنبال کردن می ماند.
              </p>
              <ol className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2">
                {study.workflow.map((stage, index) => (
                  <li
                    key={stage.step}
                    className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-5"
                  >
                    <span
                      aria-hidden="true"
                      className="bold flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm text-primary"
                    >
                      {index + 1}
                    </span>
                    <span className="flex flex-col gap-1">
                      <span className="bold text-base text-gray-900">
                        {stage.step}
                      </span>
                      <span className="text-sm leading-7 text-gray-600">
                        {stage.text}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {study.approach && (
            <section className="flex flex-col gap-4">
              <h2 className="fat text-2xl leading-normal text-gray-900 md:text-3xl">
                {study.approach.heading}
              </h2>
              {study.approach.paragraphs.map((paragraph) => (
                <p key={paragraph} className="leading-8 text-gray-700">
                  {paragraph}
                </p>
              ))}
              {study.approach.bullets && study.approach.bullets.length > 0 && (
                <ul className="mt-2 grid grid-cols-1 gap-3 md:grid-cols-2">
                  {study.approach.bullets.map((bullet) => (
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
              {study.approach.link && (
                <Link
                  href={study.approach.link.href}
                  className="mt-2 flex w-fit items-center gap-1 text-sm text-primary"
                >
                  {study.approach.link.label}
                  <ArrowLeft size={14} aria-hidden="true" />
                </Link>
              )}
            </section>
          )}

          {/* Screenshot slots for a delivered system whose images are not yet
              cleared for publication. Replace this block by adding
              `desktopImage` / `mobileImage` to the entry in lib/case-studies.ts;
              the placeholders disappear on their own once `pendingScreenshots`
              is removed. Never fill these with another system's screenshot. */}
          {!study.desktopImage &&
            study.pendingScreenshots &&
            study.pendingScreenshots.length > 0 && (
              <section className="flex flex-col gap-4">
                <h2 className="fat text-2xl leading-normal text-gray-900 md:text-3xl">
                  تصاویر سیستم
                </h2>
                <p className="leading-8 text-gray-700">
                  تصاویر این سیستم به دلیل محرمانه بودن اطلاعات عملیاتی مشتری
                  هنوز منتشر نشده است. صفحه های زیر بخش های اصلی سیستم را نشان
                  می دهند و به محض دریافت اجازه انتشار، تصویر واقعی همان صفحه
                  اینجا قرار می گیرد.
                </p>
                <ul className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {study.pendingScreenshots.map((caption) => (
                    <li
                      key={caption}
                      className="flex aspect-[16/10] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-gray-300 bg-bg-light p-6 text-center"
                    >
                      <ImageIcon
                        className="size-7 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="text-sm leading-7 text-gray-600">
                        {caption}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

          {study.mobileImage && (
            <section className="flex flex-col gap-4">
              <h2 className="fat text-2xl leading-normal text-gray-900 md:text-3xl">
                نمای موبایل
              </h2>
              <p className="leading-8 text-gray-700">
                همان سیستم روی صفحه گوشی؛ برای کاربرانی که در حرکت یا خارج از
                دفتر به اطلاعات نیاز دارند.
              </p>
              <div className="mx-auto w-full max-w-xs overflow-hidden rounded-3xl border border-gray-100 shadow-sm">
                <Image
                  src={study.mobileImage}
                  alt={study.mobileImageAlt ?? study.desktopImageAlt ?? study.title}
                  width={430}
                  height={932}
                  sizes="320px"
                  loading="lazy"
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </section>
          )}

          <section className="flex flex-col gap-4">
            <h2 className="fat text-2xl leading-normal text-gray-900 md:text-3xl">
              نتیجه در کار روزمره
            </h2>
            {study.outcome.map((paragraph) => (
              <p key={paragraph} className="leading-8 text-gray-700">
                {paragraph}
              </p>
            ))}
            <p className="text-sm leading-7 text-gray-500">
              اطلاعات مشتری، ارقام قرارداد و آمار داخلی این پروژه منتشر نمی شود.
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="fat text-2xl leading-normal text-gray-900 md:text-3xl">
              خدمات مرتبط
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {relatedServices.map((service) => (
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
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="fat text-2xl leading-normal text-gray-900 md:text-3xl">
              نمونه های دیگر
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {caseStudies
                .filter((item) => item.slug !== study.slug)
                .slice(0, 4)
                .map((item) => (
                  <Link
                    key={item.slug}
                    href={`/portfolio/${item.slug}`}
                    className="group flex flex-col gap-2 rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg"
                  >
                    <span className="text-xs text-primary">{item.industry}</span>
                    <span className="bold text-base text-gray-900 transition-colors duration-300 group-hover:text-primary">
                      {item.title}
                    </span>
                    <span className="text-sm leading-7 text-gray-600">
                      {item.summary}
                    </span>
                  </Link>
                ))}
            </div>
            <Link
              href="/portfolio"
              className="mt-2 flex w-fit items-center gap-1 text-sm text-primary"
            >
              همه نمونه کارها
              <ArrowLeft size={14} aria-hidden="true" />
            </Link>
          </section>
        </div>

        <StartReadySection />
      </article>
    </>
  );
}
