import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Clock, PenLine } from "lucide-react";
import { notFound } from "next/navigation";
import { BLOG_AUTHOR, blogArticles, getBlogArticleBySlug } from "@/lib/blog-content";
import { companyInfo, siteUrl } from "@/lib/site-content";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, graph, webPageSchema } from "@/lib/seo";
import { serviceByKey } from "@/lib/services";

type BlogArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return blogArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug);

  if (!article) {
    return buildMetadata({
      title: "مطلب یافت نشد",
      description: "این مطلب وجود ندارد.",
      path: `/blog/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/blog/${article.slug}`,
    image: article.img,
    imageAlt: article.imageAlt,
    type: "article",
  });
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const breadcrumbs = [
    { name: "صفحه اصلی", path: "/" },
    { name: "وبلاگ", path: "/blog" },
    { name: article.title, path: `/blog/${article.slug}` },
  ];

  /**
   * Article node. `dateModified` is the publication date: the project records no
   * separate revision date, and inventing a fresher one would be a false signal.
   */
  const articleSchema = {
    "@type": "BlogPosting",
    "@id": `${siteUrl}/blog/${article.slug}#article`,
    headline: article.title,
    description: article.excerpt,
    articleSection: article.category,
    inLanguage: "fa-AF",
    datePublished: article.isoDate,
    dateModified: article.isoDate,
    image: `${siteUrl}${article.img}`,
    author: { "@id": `${siteUrl}/#organization` },
    publisher: { "@id": `${siteUrl}/#organization` },
    mainEntityOfPage: `${siteUrl}/blog/${article.slug}`,
  };

  const relatedService = serviceByKey[article.relatedService];
  const otherArticles = blogArticles
    .filter((item) => item.slug !== article.slug)
    .slice(0, 3);

  return (
    <article className="bg-white pb-20 pt-32 md:pt-36">
      <JsonLd
        data={graph(
          webPageSchema({
            path: `/blog/${article.slug}`,
            name: article.title,
            description: article.excerpt,
          }),
          breadcrumbSchema(breadcrumbs),
          articleSchema,
        )}
      />
      <div className="mx-auto flex max-w-4xl flex-col gap-10 px-4 md:px-8">
        <Breadcrumbs items={breadcrumbs} />
        <Link
          href="/blog"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm text-text-muted transition-colors duration-200 hover:border-primary hover:text-primary"
        >
          <ArrowRight size={16} aria-hidden="true" />
          بازگشت به وبلاگ
        </Link>

        <header className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="rounded-full bg-[#e6f9f5] px-3 py-1 font-medium text-primary">
              {article.category}
            </span>
            {/* Byline. The team is the author of record — no individual is
                credited because none is recorded — which matches the
                organization `author` published in the BlogPosting schema. */}
            <span className="flex items-center gap-1 text-text-muted">
              <PenLine size={14} className="text-primary" aria-hidden="true" />
              {BLOG_AUTHOR}
            </span>
            <span className="text-text-muted">{article.date}</span>
            <span className="flex items-center gap-1 text-text-muted">
              <Clock size={14} className="text-primary" aria-hidden="true" />
              {article.time}
            </span>
          </div>

          <h1 className="text-3xl font-iranyekan-heavy leading-tight text-text-dark md:text-5xl">
            {article.title}
          </h1>

          <p className="max-w-3xl text-base leading-8 text-text-muted md:text-lg">
            {article.excerpt}
          </p>
        </header>

        <div className="aspect-[16/9] overflow-hidden rounded-[2rem] bg-[#f5f5f5] shadow-sm">
          <Image
            src={article.img}
            alt={article.imageAlt}
            width={1600}
            height={900}
            sizes="(min-width: 1024px) 56rem, 100vw"
            className="h-full w-full object-cover"
            priority
          />
        </div>

        <div className="flex flex-col gap-8">
          {article.body.map((section, index) => (
            <section key={index} className="flex flex-col gap-4">
              {section.heading ? (
                <h2 className="text-xl font-iranyekan-bold text-text-dark md:text-2xl">
                  {section.heading}
                </h2>
              ) : null}
              {section.paragraphs?.map((paragraph, paragraphIndex) => (
                <p key={paragraphIndex} className="leading-9 text-text-muted">
                  {paragraph}
                </p>
              ))}
              {section.bullets && section.bullets.length > 0 && (
                <ul className="flex flex-col gap-3">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2 rounded-2xl bg-[#f7f7f7] p-4 leading-8 text-text-muted"
                    >
                      <Check
                        className="mt-1.5 size-4 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
              {section.link && (
                <Link
                  href={section.link.href}
                  className="flex w-fit items-center gap-1 text-sm font-medium text-primary"
                >
                  {section.link.label}
                  <ArrowLeft size={14} aria-hidden="true" />
                </Link>
              )}
            </section>
          ))}
        </div>

        <div className="grid gap-6 rounded-[2rem] border border-dashed border-gray-200 bg-[#fcfcfc] p-6 md:p-8">
          <p className="leading-8 text-text-dark">
            اگر با همین موضوع در کسب و کار خود درگیر هستید، تیم
            {` ${companyInfo.brandName} `}
            می تواند وضعیت فعلی شما را بررسی کند و مسیر پیشنهادی را توضیح دهد.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-primary px-5 py-3 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90"
            >
              درخواست مشاوره
            </Link>
            <Link
              href={relatedService.path}
              className="rounded-full border border-primary px-5 py-3 text-sm font-medium text-primary transition-colors duration-200 hover:bg-primary hover:text-white"
            >
              {relatedService.navLabel}
            </Link>
            <Link
              href="/blog"
              className="rounded-full border border-gray-200 px-5 py-3 text-sm font-medium text-text-dark transition-colors duration-200 hover:border-primary hover:text-primary"
            >
              مشاهده همه مطالب
            </Link>
          </div>
        </div>

        <section aria-labelledby="related-articles-title" className="flex flex-col gap-5">
          <h2 id="related-articles-title" className="text-xl font-iranyekan-bold text-text-dark">
            مطالب مرتبط
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {otherArticles.map((item) => (
              <Link
                key={item.slug}
                href={`/blog/${item.slug}`}
                className="group flex h-full flex-col gap-2 rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg"
              >
                <span className="text-xs text-primary">{item.category}</span>
                <span className="text-sm font-iranyekan-bold leading-7 text-text-dark transition-colors duration-300 group-hover:text-primary">
                  {item.title}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}