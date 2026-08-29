import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { blogArticles } from "@/lib/blog-content";
import { companyInfo, siteUrl } from "@/lib/site-content";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, graph, webPageSchema } from "@/lib/seo";

const breadcrumbs = [
  { name: "صفحه اصلی", path: "/" },
  { name: "وبلاگ", path: "/blog" },
];

const description =
  "یادداشت های تیم نواتیک از پروژه های واقعی: انتخاب سیستم مالی، طراحی دیتابس، انتقال اطلاعات از اکسل و ساخت گزارش مدیریتی قابل استفاده.";

export const metadata = buildMetadata({
  fullTitle: `وبلاگ ${companyInfo.brandName} | نرم افزار، دیتابس و گزارش مدیریتی`,
  title: "وبلاگ",
  description,
  path: "/blog",
});

const blogListSchema = {
  "@type": "Blog",
  "@id": `${siteUrl}/blog#blog`,
  name: `وبلاگ ${companyInfo.brandName}`,
  description,
  inLanguage: "fa-AF",
  publisher: { "@id": `${siteUrl}/#organization` },
  blogPost: blogArticles.map((article) => ({
    "@type": "BlogPosting",
    headline: article.title,
    url: `${siteUrl}/blog/${article.slug}`,
    datePublished: article.isoDate,
  })),
};

export default function BlogPage() {
  return (
    <section className="bg-white pb-20 pt-32 md:pt-36">
      <JsonLd
        data={graph(
          webPageSchema({
            path: "/blog",
            name: `وبلاگ ${companyInfo.brandName}`,
            description,
          }),
          breadcrumbSchema(breadcrumbs),
          blogListSchema,
        )}
      />
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-14 px-4 md:px-8 lg:px-[130px]">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <span className="rounded-full bg-[#e6f9f5] px-4 py-2 text-sm font-medium text-primary">
            وبلاگ {companyInfo.brandName}
          </span>
          <h1 className="text-3xl font-iranyekan-heavy leading-tight text-text-dark md:text-5xl">
            جدیدترین مطالب و راهنماهای کاربردی
          </h1>
          <p className="leading-8 text-text-muted">
            آنچه در پروژه های واقعی به آن برخورده ایم: انتخاب سیستم مالی، طراحی
            دیتابیس، انتقال اطلاعات قدیمی و ساخت گزارش هایی که واقعاً استفاده
            می شوند.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
          {blogArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#f5f5f5]">
                <Image
                  src={article.img}
                  alt={article.imageAlt}
                  width={640}
                  height={480}
                  sizes="(min-width: 1280px) 22vw, (min-width: 768px) 45vw, 92vw"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col gap-4 p-5">
                <span className="w-fit rounded-full bg-[#e6f9f5] px-3 py-1 text-xs font-bold text-primary">
                  {article.category}
                </span>
                <h2 className="text-base font-iranyekan-bold leading-8 text-text-dark transition-colors duration-300 group-hover:text-primary">
                  {article.title}
                </h2>
                <p className="line-clamp-3 text-sm leading-7 text-text-muted">
                  {article.excerpt}
                </p>

                <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4 text-xs text-text-muted">
                  <span dir="rtl">{article.date}</span>
                  <div className="flex items-center gap-1">
                    <Clock size={14} className="text-primary" aria-hidden="true" />
                    <span>{article.time}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}