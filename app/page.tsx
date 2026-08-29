import HomeClient from "./HomeClient";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, graph, serviceSchema, webPageSchema } from "@/lib/seo";
import { companyInfo, siteUrl } from "@/lib/site-content";

const showcaseTitle = `سامانه مدیریت و حسابداری نفت و گاز | ${companyInfo.brandName}`;
const showcaseDescription =
  "سامانه جامع و تخصصی مدیریت عملیات، مخازن، دیپوها، ناوگان تانکر و حسابداری دو ارزی (دالر و افغانی) برای شرکت‌های نفت و گاز، پترولیوم و جایگاه‌های سوخت در افغانستان.";

export const metadata = buildMetadata({
  fullTitle: `${showcaseTitle} | شرکت نرم افزاری ${companyInfo.brandName}`,
  title: showcaseTitle,
  description: showcaseDescription,
  path: "/",
});

const softwareApplicationSchema = {
  "@type": "SoftwareApplication",
  "@id": `${siteUrl}/#software-application`,
  name: "سامانه مدیریت و حسابداری نفت و گاز نواتیک",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, Windows, Android, iOS, Cloud & On-Premise",
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
    "حسابداری چند ارزی تخصصی سوخت (USD / AFN)",
    "مدیریت مخازن، دیپوها و کنترل افت و تبخیر",
    "تخصیص بارنامه و ناوگان تانکرها",
    "محاسبه بهای تمام شده محموله با کرایه و گمرک",
    "فروش نقدی و اعتباری با کنترل سقف بدهی",
    "داشبورد هوش تجاری و گزارشات مدیریتی لحظه ای",
    "کارکرد آفلاین و بدون وابستگی به اینترنت دائم",
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
            name: "سامانه تخصصی نفت و گاز نواتیک",
            description: showcaseDescription,
            serviceType: "Petroleum & Energy ERP and Accounting Software",
            offerCatalog: [
              "حسابداری دو ارزی و تسعیر ارز",
              "مدیریت مخازن، دیپو و پایانه‌های سوخت",
              "مدیریت ناوگان تانکرها و ترانزیت مرزی",
              "محاسبه علمی افت و کسری محموله",
              "کنترل سقف اعتبار جایگاه‌ها و مشتریان عمده",
              "داشبورد گزارشات مالی و هوش تجاری",
            ],
          }),
          softwareApplicationSchema
        )}
      />
      <HomeClient />
    </>
  );
}
