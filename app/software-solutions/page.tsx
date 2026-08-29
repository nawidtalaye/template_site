import JsonLd from "@/components/JsonLd";
import RelatedLinks from "@/components/RelatedLinks";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, graph, serviceSchema, webPageSchema } from "@/lib/seo";
import { serviceByKey } from "@/lib/services";
import { companyInfo } from "@/lib/site-content";
import SoftwareSolutionsClient from "./SoftwareSolutionsClient";
import { softwareSolutionsFaq } from "./faq-items";

const service = serviceByKey["software-solutions"];

const breadcrumbs = [
  { name: "صفحه اصلی", path: "/" },
  { name: "توسعه نرم افزار اختصاصی", path: service.path },
];

const description =
  "توسعه نرم افزار اختصاصی در هرات و افغانستان: سیستم های مالی، انبار، لجستیک، فروش و منابع بشری که روی تحلیل فرایند و دیتابس اختصاصی شما ساخته می شوند.";

export const metadata = buildMetadata({
  fullTitle: `توسعه نرم افزار اختصاصی در هرات و افغانستان | ${companyInfo.brandName}`,
  title: "توسعه نرم افزار اختصاصی",
  description,
  path: service.path,
  image: "/images/portfolio/novatech-financial-exchange-system.png",
  imageAlt: "نمایی از یک سامانه اختصاصی ساخته شده توسط نواتیک",
});

export default function SoftwareSolutionsPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: service.path,
            name: `توسعه نرم افزار اختصاصی در هرات و افغانستان | ${companyInfo.brandName}`,
            description,
          }),
          breadcrumbSchema(breadcrumbs),
          serviceSchema({
            path: service.path,
            name: "توسعه نرم افزار اختصاصی",
            description,
            serviceType: service.serviceType,
            offerCatalog: [
              "نرم افزار سوپرمارکت و فروشگاه",
              "سیستم مدیریت گدام و انبار",
              "سیستم مدیریت لجستیک و باربری",
              "نرم افزار فروش رستوران",
              "سیستم مدیریت آژانس مسافرتی",
              "سیستم حضور و غیاب",
            ],
          }),
          // Built from the same array the page renders, so every question and
          // answer in the markup is visible on the page.
          faqSchema(softwareSolutionsFaq),
        )}
      />
      <SoftwareSolutionsClient />
      <RelatedLinks
        serviceKey={service.key}
        caseStudySlugs={service.caseStudies}
      />
    </>
  );
}
