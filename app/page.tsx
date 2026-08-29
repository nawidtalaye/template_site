import HomeClient from "./HomeClient";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, graph, webPageSchema } from "@/lib/seo";
import { companyInfo } from "@/lib/site-content";

/**
 * The home page is a server component so it can own its metadata and structured
 * data; the interactive hero, portfolio slider and tabs live in `HomeClient`.
 */

const homeTitle = `${companyInfo.brandName} | شرکت نرم افزاری و تکنالوژی در هرات، افغانستان`;

const homeDescription =
  "نواتیک شرکت نرم افزاری در هرات، افغانستان: توسعه نرم افزار اختصاصی، سیستم مدیریت کسب و کار، طراحی دیتابس، ERP و طراحی سایت.";

export const metadata = buildMetadata({
  fullTitle: homeTitle,
  title: homeTitle,
  description: homeDescription,
  path: "/",
});

export default function Home() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: "/",
            name: homeTitle,
            description: homeDescription,
          }),
          breadcrumbSchema([{ name: "صفحه اصلی", path: "/" }]),
        )}
      />
      <HomeClient />
    </>
  );
}
