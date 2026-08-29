/* eslint-disable @next/next/no-img-element */

import Image from "next/image";

import StartReadySection from "../../components/StartReadySection";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, graph, webPageSchema } from "@/lib/seo";
import { companyInfo } from "@/lib/site-content";

const breadcrumbs = [
  { name: "صفحه اصلی", path: "/" },
  { name: "درباره ما", path: "/about" },
];

const description = `${companyInfo.legalName}؛ تیم تحلیل، توسعه و پشتیبانی نرم افزار در هرات افغانستان. مسیر شکل گیری ${companyInfo.brandName}، حوزه های کاری و روش کار آن.`;

export const metadata = buildMetadata({
  fullTitle: `درباره ${companyInfo.brandName} | تیم توسعه نرم افزار در هرات`,
  title: "درباره ما",
  description,
  path: "/about",
});

const stats = [
  {
    mobileImage: "/images/project-logo-m.png",
    desktopImage: "/images/project-logo.png",
    value: "۹",
    label: "سامانه و وب سایت منتشر شده",
  },
  {
    mobileImage: "/images/web-des.png",
    desktopImage: "/images/web-des-lg.png",
    value: "۶",
    label: "حوزه کاری تحت پوشش نرم افزارها",
  },
  {
    mobileImage: "/images/experience-logo-m.png",
    desktopImage: "/images/experience-logo.png",
    value: "۱۴۰۰",
    label: "سال آغاز فعالیت نواتیک",
  },
];

const timelineItems = [
  {
    title: "شروع تجربه های مالی - سال ۱۴۰۰",
    description:
      "همه چیز از تحلیل فرایندهای مالی و ساخت ابزارهای ساده برای ثبت دقیق اطلاعات کسب و کارها شروع شد.",
    image:
      "/images/step1-logo-about.png",
  },
  {
    title: "ورود به پروژه های حرفه ای - سال ۱۴۰۱",
    description:
      "در این مرحله طراحی دیتابیس های اختصاصی و توسعه اولین نسخه های نرم افزار حسابداری برای مشتریان واقعی آغاز شد.",
    image:
      "/images/step2-logo-about.png",
  },
  {
    title: "تشکیل تیم محصول - سال ۱۴۰۲",
    description:
      "تیم فنی، تحلیل کسب و کار و پشتیبانی کنار هم قرار گرفتند تا راهکارهایی یکپارچه برای حسابداری، گزارش گیری و اتوماسیون ساخته شود.",
    image:
      "/images/step3-logo-about.png",
  },
  {
    title: "توسعه راهکارهای سازمانی - سال ۱۴۰۴",
    description:
      "سبد کاری به سیستم های عملیاتی گسترده تر شد: لجستیک، فروش رستوران، آژانس مسافرتی و حضور و غیاب، در کنار حسابداری و طراحی سایت.",
    image:
      "/images/step4-logo-about.png",
  },
];

export default function Page() {
  return (
    <div className="min-h-screen">
      <JsonLd
        data={graph(
          {
            ...webPageSchema({
              path: "/about",
              name: `درباره ${companyInfo.brandName}`,
              description,
            }),
            "@type": "AboutPage",
          },
          breadcrumbSchema(breadcrumbs),
        )}
      />
      <div className="relative">
        <img
          alt=""
          aria-hidden="true"
          loading="lazy"
          width="50"
          height="120"
          decoding="async"
          data-nimg="1"
          className="hidden lg:block absolute left-0 top-[85px]"
          srcSet="/images/Mask-Group-ac.png 1x, /images/Mask-Group-ac.png 2x"
          src="/images/Mask-Group-ac.png"
        />

        <div className="flex flex-col pt-28 gap-4 max-w-screen-2xl mx-auto text-center lg:grid lg:grid-cols-2 lg:pt-[80px] xl:grid-rows-2 lg:grid-rows-3">
          <div className="flex flex-col lg:text-start lg:pr-[130px] lg:row-span-1 xl:mb-3 lg:justify-end">
            <h1>درباره {companyInfo.brandName}</h1>
            <span className="heavy text-[26px] lg:text-[40px]">
              آشنایی بیشتر با تیم
            </span>
          </div>

          <div className="flex justify-center lg:row-span-3">
            {/* Portrait artwork: sized by its own ratio so it is never squashed
                into the landscape slot the previous photo used. */}
            <Image
              alt={`خدمات ${companyInfo.brandName} برای کسب و کارها`}
              priority
              width={1086}
              height={1448}
              sizes="(max-width: 1023px) 88vw, 0px"
              className="lg:hidden h-auto w-full max-w-[360px]"
              src="/images/aboutus.webp"
            />
            <Image
              alt={`خدمات ${companyInfo.brandName} برای کسب و کارها`}
              priority
              width={1086}
              height={1448}
              sizes="(min-width: 1024px) 460px, 0px"
              className="lg:block hidden h-auto w-[460px]"
              src="/images/aboutus.webp"
            />
          </div>

          <div className="lg:pr-[130px] text-center lg:text-start lg:row-span-2 lg:flex lg:flex-col lg:gap-[15px]">
            <p className="lg:m-0 mx-[30px] leading-[30px]">
              {companyInfo.brandName} یک تیم تحلیل، توسعه و پشتیبانی نرم افزار
              در هرات است. کار ما با بررسی فرایند مالی و عملیاتی هر کسب و کار
              شروع می شود، با طراحی دیتابیس و ساخت سیستم ادامه پیدا می کند و با
              انتقال اطلاعات، آموزش کاربران و پشتیبانی بعد از استقرار کامل
              می شود.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col pt-[90px] gap-8 text-center">
          <div className="flex flex-col items-center gap-3 mb-10">
            <h2 className="flex text-[26px]">
              <span className="heavy">نواتیک</span>{" "}
              <span className="light">در یک نگاه</span>
            </h2>
            <img
              alt=""
            aria-hidden="true"
              loading="lazy"
              width="145"
              height="22"
              decoding="async"
              data-nimg="1"
              className="flex"
              src="/images/signature.jpg"
            />
          </div>
        </div>

        <div className="grid gird-cols-1 gap-6 mx-[30px] lg:grid-cols-3 lg:mx-[130px]">
          {stats.map((item) => (
            <div
              key={item.label}
              className="flex flex-col p-3 border rounded-xl overflow-hidden lg:flex-row"
            >
              <div className="flex flex-col items-center mx-auto lg:hidden">
                <img
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  width="100"
                  height="101"
                  decoding="async"
                  data-nimg="1"
                  className="flex rounded-md"
                  src={item.mobileImage}
                />
              </div>
              <div className="mx-2 m-auto">
                <img
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  width="90"
                  height="90"
                  decoding="async"
                  data-nimg="1"
                  className="rounded-md hidden lg:block"
                  src={item.desktopImage}
                />
              </div>
              <div className="flex flex-col justify-center pt-2 lg:justify-normal lg:my-auto">
                <div className="text-[30px] heavy text-center lg:mt-0 lg:text-start mt-1 text-primary">
                  {item.value}
                </div>
                <p className="text-center lg:text-justify">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex flex-col pt-[90px] gap-8 text-center mb-[20px] lg:mb-[40px]">
          <div className="flex flex-col items-center gap-3">
            <h2 className="flex text-[26px]">
              <span className="heavy">داستان</span>{" "}
              <span className="light">نواتیک</span>
            </h2>
            <img
              alt=""
            aria-hidden="true"
              loading="lazy"
              width="145"
              height="22"
              decoding="async"
              data-nimg="1"
              className="flex"
              src="/images/signature.jpg"
            />
          </div>
        </div>

        <div className="flex flex-col lg:items-center gap-[40px] relative lg:mx-auto lg:w-[848px] xl:mb-20">
          {timelineItems.map((item) => (
            <div
              key={item.title}
              className="flex flex-col gap-5 p-3 lg:mb-0 mb-[78px] mx-[30px] lg:even:flex-row-reverse lg:flex-row overflow-hidden"
            >
              <div className="flex flex-col items-center mx-auto lg:my-auto">
                <img
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  width="100"
                  height="101"
                  decoding="async"
                  data-nimg="1"
                  className="flex rounded-md flex-row-reverse"
                  src={item.image}
                />
              </div>
              <div className="flex flex-col border rounded-xl justify-center lg:my-auto p-2 min-h-[138px]">
                <span className="bold text-lg lg:text-justify text-center mt-2 mb-2">
                  {item.title}
                </span>
                <p className="text-center leading-[30px] lg:text-justify text-base">
                  {item.description}
                </p>
              </div>
            </div>
          ))}

          <div className="absolute right-[50px] top-[270px] lg:top-[94px] lg:right-0">
            <img
              alt=""
              aria-hidden="true"
              loading="lazy"
              width="48"
              height="134"
              decoding="async"
              data-nimg="1"
              srcSet="/images/arrow-dotted.png 1x, /images/arrow-dotted.png 2x"
              src="/images/arrow-dotted.png"
            />
          </div>
          <div className="absolute left-[50px] top-[670px] lg:top-[294px] lg:-left-5 scale-x-[-1]">
            <img
              alt=""
              aria-hidden="true"
              loading="lazy"
              width="48"
              height="134"
              decoding="async"
              data-nimg="1"
              srcSet="/images/arrow-dotted.png 1x, /images/arrow-dotted.png 2x"
              src="/images/arrow-dotted.png"
            />
          </div>
          <div className="absolute right-[50px] top-[1070px] lg:right-0 lg:top-[500px]">
            <img
              alt=""
              aria-hidden="true"
              loading="lazy"
              width="48"
              height="134"
              decoding="async"
              data-nimg="1"
              srcSet="/images/arrow-dotted.png 1x, /images/arrow-dotted.png 2x"
              src="/images/arrow-dotted.png"
            />
          </div>
        </div>
      </div>

      <StartReadySection />
    </div>
  );
}
