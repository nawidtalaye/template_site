import Image from "next/image";
import Link from "next/link";
import { companyInfo } from "@/lib/site-content";
import { services } from "@/lib/services";
import styles from "./Footer.module.css";

/**
 * Footer navigation. One link per real page, with the page's own label — no
 * keyword-stuffed anchors and no links to pages that do not exist. It exists so
 * every service page is reachable from every other page, which is what stops
 * them becoming orphans.
 */
const companyLinks = [
  { href: "/herat", label: "نواتیک در هرات" },
  { href: "/portfolio", label: "نمونه کارها" },
  { href: "/about", label: "درباره ما" },
  { href: "/blog", label: "وبلاگ" },
  { href: "/contact", label: "تماس با ما" },
];

export default function Footer() {
  return (
    <footer className={styles.root} aria-labelledby="footer-title">
      <h2 id="footer-title" className="absolute h-px w-px -m-px overflow-hidden p-0">
        اطلاعات تماس {companyInfo.brandName}
      </h2>
      <div className="max-w-screen-2xl mx-auto w-full min-w-0 px-4 sm:px-5 md:px-6 lg:px-10 xl:px-12">
        <div className="py-5 sm:py-6 flex flex-col gap-5 sm:gap-6 min-w-0">
          <div
            className={`${styles.topStrip} p-3 sm:p-4 rounded-xl flex flex-col gap-3 sm:gap-4 md:flex-row md:justify-between md:items-center min-w-0`}
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 sm:gap-3 min-w-0 max-w-full text-center md:text-start">
              <Link className={styles.logoLinkMd} href="/">
                <Image
                  alt={`لوگوی ${companyInfo.brandName}`}
                  src="/images/novatech-logo.webp"
                  width={960}
                  height={803}
                  sizes="80px"
                  className="h-12 w-auto rounded-md bg-white object-contain px-2 py-1.5"
                />
              </Link>
              <Image
                alt=""
                aria-hidden="true"
                src="/images/briefcase.svg"
                width={24}
                height={24}
                sizes="24px"
                className="hidden md:block"
              />
              <span className="text-white bold text-lg">
                ساعت کاری<span className="hidden md:inline">:</span>
              </span>
              <span className="text-white medium">
                {companyInfo.workHours}
              </span>
              <span className="text-white light">
                {companyInfo.workDays}
              </span>
            </div>
            <a
              href={`tel:${companyInfo.primaryPhoneHref}`}
              className="w-full max-w-full md:w-auto shrink-0"
            >
              <div className="text-center bg-[#54dcc6] hover:bg-[#45bba7] duration-200 leading-[30px] text-white medium text-sm sm:text-base rounded-3xl py-2 px-3 md:px-4 whitespace-normal">
                تماس مستقیم با کارشناسان
              </div>
            </a>
          </div>
          <nav
            aria-label="پیوندهای سایت"
            className="grid grid-cols-1 gap-6 border-t border-white/10 pt-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            <div className="flex flex-col gap-3 min-w-0">
              <h3 className="bold text-white">خدمات نواتیک</h3>
              <ul className="flex flex-col gap-2">
                {services.slice(0, 4).map((service) => (
                  <li key={service.key}>
                    <Link
                      href={service.path}
                      className="text-white/80 transition-colors duration-200 hover:text-primary"
                    >
                      {service.navLabel}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3 min-w-0">
              <h3 className="bold text-white">راهکارهای تخصصی</h3>
              <ul className="flex flex-col gap-2">
                {services.slice(4).map((service) => (
                  <li key={service.key}>
                    <Link
                      href={service.path}
                      className="text-white/80 transition-colors duration-200 hover:text-primary"
                    >
                      {service.navLabel}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3 min-w-0">
              <h3 className="bold text-white">شرکت</h3>
              <ul className="flex flex-col gap-2">
                {companyLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-white/80 transition-colors duration-200 hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div
            className={`${styles.midRow} flex flex-col lg:flex-row gap-5 lg:gap-6 lg:justify-between py-5 sm:py-6 min-w-0`}
          >
            <div className={`${styles.addressCol} flex flex-col gap-y-4 min-w-0 flex-1`}>
              <div className="flex items-start sm:items-center gap-2 text-white min-w-0">
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  role="presentation"
                  className="text-xl"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                <p className="min-w-0 break-words">
                  {companyInfo.address}
                </p>
              </div>
              <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 min-w-0">
                <div className="flex items-center gap-2 text-white min-w-0">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="text-xl"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
                    <path d="M15 7a2 2 0 0 1 2 2"></path>
                    <path d="M15 3a6 6 0 0 1 6 6"></path>
                  </svg>
                  <div className="flex flex-col gap-2 min-w-0">
                    <a
                      dir="ltr"
                      aria-label={`تماس با شماره ${companyInfo.primaryPhoneLabel}`}
                      className="break-all sm:break-normal"
                      href={`tel:${companyInfo.primaryPhoneHref}`}
                    >
                      {companyInfo.primaryPhoneLabel}
                    </a>
                    <a
                      dir="ltr"
                      aria-label={`تماس با شماره ${companyInfo.secondaryPhoneLabel}`}
                      className="break-all sm:break-normal"
                      href={`tel:${companyInfo.secondaryPhoneHref}`}
                    >
                      {companyInfo.secondaryPhoneLabel}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-white min-w-0">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="text-xl"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                  <a
                    className="min-w-0 break-all sm:break-normal"
                    href={`mailto:${companyInfo.email}`}
                  >
                    {companyInfo.email}
                  </a>
                </div>
              </div>
            </div>
            <div className="gap-4 sm:gap-6 flex flex-col md:flex-row md:justify-center md:items-center w-full min-w-0 lg:w-auto">
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-white min-w-0">
                <a
                  className={`${styles.socialBtn} flex items-center justify-center gap-2 rounded-lg px-4 py-2 duration-300`}
                  href={companyInfo.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg aria-hidden="true" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg>
                  <span>اینستاگرام</span>
                </a>
                <a
                  className={`${styles.socialBtn} flex items-center justify-center gap-2 rounded-lg px-4 py-2 duration-300`}
                  href={companyInfo.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg aria-hidden="true" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path></svg>
                  <span>واتس اپ</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
