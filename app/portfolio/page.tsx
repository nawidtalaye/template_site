/* eslint-disable @next/next/no-img-element */

import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import PortfolioGallery from "@/components/PortfolioGallery";
import { buildMetadata } from "@/lib/metadata";
import { caseStudies } from "@/lib/case-studies";
import { breadcrumbSchema, graph, webPageSchema } from "@/lib/seo";
import { companyInfo, siteUrl } from "@/lib/site-content";

const breadcrumbs = [
  { name: "صفحه اصلی", path: "/" },
  { name: "نمونه کارها", path: "/portfolio" },
];

export const metadata = buildMetadata({
  fullTitle: `نمونه کارها | سامانه ها و وب سایت های تحویل شده ${companyInfo.brandName}`,
  title: "نمونه کارها",
  description:
    "سامانه های تحویل شده نواتیک: لجستیک و کارگو، نفت و گاز، فروش رستوران، سوپرمارکت، گدام، خیاطی، آژانس مسافرتی و حضور و غیاب، همراه با وب سایت های شرکتی.",
  path: "/portfolio",
});

/** ItemList of the case studies, so the collection is understood as a set. */
const itemListSchema = {
  "@type": "ItemList",
  name: `نمونه کارهای ${companyInfo.brandName}`,
  itemListElement: caseStudies.map((study, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: study.title,
    url: `${siteUrl}/portfolio/${study.slug}`,
  })),
};

export default function PortfolioPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: "/portfolio",
            name: `نمونه کارهای ${companyInfo.brandName}`,
            description: metadata.description as string,
          }),
          breadcrumbSchema(breadcrumbs),
          itemListSchema,
        )}
      />

      <div className="min-h-screen pt-32">
        <div className="lg:mx-[130px] mx-[30px]">
          <Breadcrumbs items={breadcrumbs} />
          <div className="relative mt-6 flex justify-center items-center bg-no-repeat bg-cover h-60 lg:h-96 w-full rounded-2xl bg-[url('/images/website-logo.jpg')]">
            <div className="absolute flex flex-col md:flex-row md:justify-between gap-5 justify-center w-[90%] items-center -bottom-10 bg-[#F5F5F5] p-5 rounded-2xl">
              <div className="flex text-[26px] md:text-3xl">
                <h1 className="light ml-1">
                  نمونه کارهای <span className="heavy">{companyInfo.brandName}</span>
                </h1>
              </div>
            </div>
          </div>
        </div>

        <PortfolioGallery />

        <div className="mx-[30px] lg:mx-[130px] sticky bottom-5 z-20"><a className="min-[1100px]:h-[142px] flex flex-col justify-around my-[60px] min-[1100px]:mt-[10px]" href="/contact"><div className="relative rounded-full hidden min-[1100px]:flex left-2 top-6 sm:top-8 min-[1100px]:top-0 w-full h-full  justify-center"><img alt="" aria-hidden="true" loading="lazy" width="145" height="149" decoding="async" data-nimg="1" className="absolute min-[1100px]:right-[20px] rounded-full" src="/images/operator-image.png" /></div><div className="min-[1100px]:h-fit min-[1100px]:justify-between min-[1100px]:pr-[200px] flex sm:flex-row justify-between gap-2 min-[1100px]:flex-row p-[10px] sm:p-[20px]  bg-[#222222] min-[1100px]:p-[20px] rounded-2xl items-center"><span className="text-white text-sm hidden md:block medium leading-[30px] text-center">برای ارتباط با کارشناسان و دریافت مشاوره کلیک کنید</span><span className="text-white text-sm md:hidden medium leading-[30px] text-center">ارتباط با کارشناسان</span><div className="flex items-center justify-between bg-white text-white rounded-3xl pr-3 min-[1100px]:mt-0 "><div className="medium hidden md:block text-primary">درخواست مشاوره</div><div className="text-xs medium md:hidden text-primary">درخواست مشاوره</div><div className="p-2"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" aria-hidden="true" className="p-1 bg-primary text-2xl bg-opacity-20 rounded-full" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.28 7.72a.75.75 0 0 1 0 1.06l-2.47 2.47H21a.75.75 0 0 1 0 1.5H4.81l2.47 2.47a.75.75 0 1 1-1.06 1.06l-3.75-3.75a.75.75 0 0 1 0-1.06l3.75-3.75a.75.75 0 0 1 1.06 0Z" clipRule="evenodd"></path></svg></div></div></div></a></div>
      </div>
    </>
  );
}
