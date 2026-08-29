/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import Link from "next/link";
import { companyInfo } from "@/lib/site-content";
import LeadForm from "@/components/LeadForm";
import JsonLd from "@/components/JsonLd";
import MapEmbed from "@/components/MapEmbed";
import { buildMetadata } from "@/lib/metadata";
import {
  breadcrumbSchema,
  graph,
  localBusinessSchema,
  webPageSchema,
} from "@/lib/seo";

const breadcrumbs = [
  { name: "صفحه اصلی", path: "/" },
  { name: "تماس با ما", path: "/contact" },
];

const description = `آدرس دفتر، شماره تماس، ایمیل، ساعت کاری و فرم ارتباط با ${companyInfo.brandName} در ${companyInfo.address}`;

export const metadata = buildMetadata({
  fullTitle: `تماس با ${companyInfo.brandName} | دفتر هرات، افغانستان`,
  title: "تماس با ما",
  description,
  path: "/contact",
});

const heroInfo = [
  {
    icon: "/images/contact-loc.png",
    alt: "لوکیشن",
    content: (
      <p className="text-start leading-[30px]">
        {companyInfo.address}
      </p>
    ),
  },
  {
    icon: "/images/contact-call.png",
    alt: "شماره تلفن های ما",
    content: (
      <div className="flex flex-col lg:flex-row gap-x-3 gap-y-2 lg:items-center lg:justify-between w-full text-start">
        <a href={`tel:${companyInfo.secondaryPhoneHref}`}>
          خط ۱ : {companyInfo.secondaryPhoneLabel}
        </a>
        <a href={`tel:${companyInfo.primaryPhoneHref}`}>
          خط ۲ : {companyInfo.primaryPhoneLabel}
        </a>
      </div>
    ),
  },
  {
    icon: "/images/contact-email.png",
    alt: "ایمیل و وبسایت",
    content: (
      <div className="flex flex-col lg:flex-row gap-x-3 gap-y-2 lg:items-center lg:justify-between w-full text-start">
        <a href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a>
        <a href={companyInfo.websiteUrl}>{companyInfo.websiteLabel}</a>
      </div>
    ),
  },
];


export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <JsonLd
        data={graph(
          {
            ...webPageSchema({
              path: "/contact",
              name: `تماس با ${companyInfo.brandName}`,
              description,
            }),
            "@type": "ContactPage",
          },
          breadcrumbSchema(breadcrumbs),
          localBusinessSchema,
        )}
      />
      <div className="relative md:mt-16">
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

        <div className="flex flex-col pt-28 gap-5 max-w-screen-2xl mx-auto lg:gap-0 lg:gap-y-5 text-center lg:justify-start md:grid md:grid-cols-2 xl:pt-[80px] lg:grid-rows-3">
          <div className="flex flex-col lg:text-start xl:pr-[130px] lg:pr-[80px] md:pr-[11px] md:row-span-1 md:justify-end">
            <h1 className="regular text-lg">تماس با {companyInfo.brandName}</h1>
            <span className="heavy mx-[30px] md:mx-0 text-[26px] xl:text-[39px] lg:leading-[60px]">
              همیشه در دسترس، همیشه پاسخگو
            </span>
          </div>

          <div className="flex justify-center md:row-span-3">
            {/* The source file is square (1080x1080). The old 324x287 and
                738x490 boxes reserved the wrong shape, so the whole hero moved
                down once the file arrived - the largest layout shift on the
                site. */}
            <Image
              alt="اپراتور تماس با شرکت"
              src="/images/portfolio/novatech-contact-operator.jpg"
              width={324}
              height={324}
              sizes="324px"
              className="lg:hidden"
            />
            <Image
              alt="اپراتور تماس با شرکت"
              src="/images/portfolio/novatech-contact-operator.jpg"
              width={738}
              height={738}
              sizes="738px"
              className="lg:block hidden"
            />
          </div>

          <div className="xl:pr-[130px] lg:pr-[80px] flex justify-center text-center lg:justify-start md:row-span-2 lg:flex lg:flex-col lg:gap-[42px]">
            <div className="flex flex-col gap-7 mx-[30px] w-[306px] lg:w-full md:mx-0">
              {heroInfo.map((item) => (
                <div key={item.alt} className="flex items-center gap-3">
                  <Image alt="" aria-hidden="true" src={item.icon} width={50} height={48} />
                  {item.content}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col pt-[30px] gap-8 text-center mx-[30px] md:mx-[40px] xl:mx-auto">
          <div className="flex flex-col items-center gap-3">
            <h2 className="flex text-[26px]">
              <span className="light"> فرم</span>
              <span className="heavy mr-1"> تماس با ما </span>
            </h2>
            <Image
              alt=""
              aria-hidden="true"
              src="/images/signature.jpg"
              width={145}
              height={22}
              className="flex"
            />
          </div>

          <div className="flex flex-col gap-[32px] sm:mx-[20px] md:mx-[50px] xl:mx-[130px] md:gap-[28px] md:grid md:grid-cols-2 mb-[60px] md:mb-0">
            <LeadForm source="contact-page" className="flex flex-col gap-[20px] md:grid md:grid-cols-6 md:grid-rows-6">
              <div className="flex gap-2 justify-between items-center border-2 rounded-md md:row-span-1 md:col-span-3 h-[50px] pl-[13px]">
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  aria-label="نام و نام خانوادگی"
                  placeholder="نام و نام خانوادگی"
                  className="px-[15px] w-full medium h-full outline-none"
                />
                <svg aria-hidden="true" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path></svg>
              </div>

              <div className="flex gap-2 justify-between items-center border-2 rounded-md md:row-span-1 md:col-span-3 h-[50px] pl-[13px]">
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  aria-label="شماره تماس"
                  placeholder="شماره تماس*"
                  className="px-[15px] w-full medium h-full outline-none"
                />
                <svg aria-hidden="true" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><g><g><path d="M16.73,2.065H7.27a2.386,2.386,0,0,0-2.24,2.5v14.87a2.386,2.386,0,0,0,2.24,2.5h9.46a2.386,2.386,0,0,0,2.24-2.5V4.565A2.386,2.386,0,0,0,16.73,2.065Zm1.24,17.37a1.391,1.391,0,0,1-1.24,1.5H7.27a1.391,1.391,0,0,1-1.24-1.5V4.565a1.391,1.391,0,0,1,1.24-1.5H8.8v.51a1,1,0,0,0,1,1h4.4a1,1,0,0,0,1-1v-.51h1.53a1.391,1.391,0,0,1,1.24,1.5Z"></path><path d="M10,18.934h4a.5.5,0,0,0,0-1H10a.5.5,0,0,0,0,1Z"></path></g></g></svg>
              </div>

              <div className="flex md:col-span-6 md:row-span-3">
                <textarea
                  id="contact-message"
                  name="message"
                  aria-label="پیام شما"
                  placeholder="پیام شما"
                  className="resize-none w-full border-2 outline-none rounded-md h-[118px] md:h-full p-[15px]"
                />
              </div>

              <button
                type="submit"
                className="flex md:col-start-1 mr-2 md:w-[152px] md:col-end-3 md:row-start-5 md:row-end-6 items-center justify-between bg-[#54dcc6] hover:bg-[#45bba7] duration-300 text-white rounded-[50px]"
              >
                <span className="medium pr-[16px] flex lg:text-[14px]">ارسال پیام</span>
                <div className="p-2">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="p-1 bg-white text-4xl hover:bg-[#45bba7] bg-opacity-20 rounded-full"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.28 7.72a.75.75 0 0 1 0 1.06l-2.47 2.47H21a.75.75 0 0 1 0 1.5H4.81l2.47 2.47a.75.75 0 1 1-1.06 1.06l-3.75-3.75a.75.75 0 0 1 0-1.06l3.75-3.75a.75.75 0 0 1 1.06 0Z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </button>
            </LeadForm>

            <div className="h-full min-h-[340px] rounded-md overflow-hidden border-2 border-slate-200 bg-slate-50">
              <MapEmbed
                title={`موقعیت ${companyInfo.brandName}`}
                src="https://www.openstreetmap.org/export/embed.html?bbox=62.1851%2C34.3423%2C62.2051%2C34.3623&layer=mapnik&marker=34.3523%2C62.1952"
                href="https://www.openstreetmap.org/?mlat=34.3523&mlon=62.1952#map=16/34.3523/62.1952"
                minHeight={340}
              />
            </div>
          </div>

          <div className="pb-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-primary transition-colors"
            >
              بازگشت به صفحه اصلی
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

