import HomeClient from "./HomeClient";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, graph, localBusinessSchema, serviceSchema, webPageSchema } from "@/lib/seo";
import { modules } from "@/lib/showcase-content";
import { companyInfo, siteUrl } from "@/lib/site-content";

const showcaseTitle = `سامانه مدیریت و حسابداری نفت و گاز | ${companyInfo.brandName}`;
const showcaseDescription =
  "سامانه یکپارچه مدیریت عملیات، مخازن و دیپوها، ناوگان تانکر و حسابداری دو ارزی (دالر و افغانی) برای شرکت‌های نفت و گاز، پترولیوم و جایگاه‌های سوخت در افغانستان.";

export const metadata = buildMetadata({
  fullTitle: `${showcaseTitle} | شرکت نرم افزاری ${companyInfo.brandName}`,
  title: showcaseTitle,
  description: showcaseDescription,
  path: "/",
});

const softwareApplicationSchema = {
  "@type": "SoftwareApplication",
  "@id": `${siteUrl}/#software-application`,
  name: `سامانه مدیریت و حسابداری نفت و گاز ${companyInfo.brandName}`,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, Windows, Android, Cloud & On-Premise",
  description: showcaseDescription,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  provider: {
    "@type": "Organization",
    name: companyInfo.legalName,
    url: siteUrl,
  },
  featureList: [
    "حسابداری دو ارزی (دالر / افغانی) با تسعیر روزانه",
    "مدیریت مخازن، دیپوها و کنترل افت و کسری",
    "تخصیص بارنامه، ناوگان تانکرها و باسکول مبدأ و مقصد",
    "تسهیم هزینه و محاسبه بهای تمام‌شده هر لیتر",
    "فروش نقدی و اعتباری با کنترل سقف بدهی",
    "داشبورد مدیریتی و گزارش‌های لحظه‌ای",
    "کارکرد آفلاین در دیپوهای دور از دسترس",
  ],
};

export default function Home() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: "/",
            name: showcaseTitle,
            description: showcaseDescription,
          }),
          breadcrumbSchema([{ name: "صفحه اصلی", path: "/" }]),
          serviceSchema({
            path: "/",
            name: `سامانه تخصصی نفت و گاز ${companyInfo.brandName}`,
            description: showcaseDescription,
            serviceType: "Petroleum & Energy ERP and Accounting Software",
            offerCatalog: modules.map((module) => module.name),
          }),
          softwareApplicationSchema,
          localBusinessSchema,
        )}
      />
      <HomeClient />
    </>
  );
}
