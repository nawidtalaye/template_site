"use client";

import Image from "next/image";
import { useState } from "react";

type SiteType = "shop" | "company";
type PlanKey = "pro" | "plus" | "vip";

type PricingPlan = {
  key: PlanKey;
  name: string;
};

type FeatureItem = {
  text: string;
  plans: PlanKey[];
};

const SHOP_PLANS: PricingPlan[] = [
  {
    key: "pro",
    name: "فروشگاهی حرفه ای",
  },
  {
    key: "plus",
    name: "فروشگاهی فوق حرفه ای",
  },
  {
    key: "vip",
    name: "فروشگاهی VIP PRO",
  },
];

const COMPANY_PLANS: PricingPlan[] = [
  {
    key: "pro",
    name: "شرکتی پایه",
  },
  {
    key: "plus",
    name: "شرکتی حرفه ای",
  },
  {
    key: "vip",
    name: "شرکتی اختصاصی",
  },
];

const SHOP_FEATURES: FeatureItem[] = [
  {
    text: "انجام سلیقه یابی و آنالیز رقبا و تعیین پالت رنگی سایت",
    plans: ["pro", "plus", "vip"],
  },
  { text: "تعیین فونت مناسب حوزه کاری", plans: ["pro", "plus", "vip"] },
  { text: "صفحه تماس با ما و درباره ما", plans: ["pro", "plus", "vip"] },
  {
    text: "امکان ثبت بینهایت محصول و بینهایت دسته بندی",
    plans: ["pro", "plus", "vip"],
  },
  { text: "گالری تصاویر محصول", plans: ["pro", "plus", "vip"] },
  { text: "اتصال به شبکه های مجازی", plans: ["pro", "plus", "vip"] },
  { text: "نمایش محل کار روی نقشه", plans: ["pro", "plus", "vip"] },
  { text: "سیستم تخفیف گذاری", plans: ["pro", "plus", "vip"] },
  { text: "ثبت نام کاربر", plans: ["pro", "plus", "vip"] },
  { text: "نمایش کالای مشابه و مرتبط", plans: ["pro", "plus", "vip"] },
  {
    text: "امکان توسعه نامحدود گرافیکی و سیستمی",
    plans: ["pro", "plus", "vip"],
  },
  { text: "امتیاز به محصول", plans: ["pro", "plus", "vip"] },
  {
    text: "لیست علاقمندی شخصی برای هر کاربر",
    plans: ["pro", "plus", "vip"],
  },
  { text: "فروش شگفت انگیز تخفیف زمان دار", plans: ["pro", "plus", "vip"] },
  { text: "فیلتر محصولات بر اساس ویژگی", plans: ["pro", "plus", "vip"] },
  { text: "بخش بلاگ و مقالات", plans: ["pro", "plus", "vip"] },
  {
    text: "افزودن ادمین و مدیر و تعیین سطح دسترسی",
    plans: ["pro", "plus", "vip"],
  },
  { text: "سیستم گزارش گیری از فروش", plans: ["pro", "plus", "vip"] },
  { text: "اجرای پروتکل امنیتی SSL", plans: ["pro", "plus", "vip"] },
  { text: "مالکیت کامل سایت", plans: ["pro", "plus", "vip"] },
  {
    text: "نمایش صحیح در موبایل و دسکتاپ (ریسپانسیو)",
    plans: ["pro", "plus", "vip"],
  },
  {
    text: "قابلیت کامنت در صفحات مد نظر با امکان تایید یا رد",
    plans: ["pro", "plus", "vip"],
  },
  { text: "بهینه سازی سرعت سایت", plans: ["pro", "plus", "vip"] },
  { text: "بکاپ منظم", plans: ["pro", "plus", "vip"] },
  {
    text: "آموزش و پشتیبانی رایگان به همراه قرارداد رسمی",
    plans: ["pro", "plus", "vip"],
  },
  {
    text: "فعال سازی سیستم کش با تاثیر مستقیم روی سرعت سایت",
    plans: ["plus", "vip"],
  },
  {
    text: "فشرده سازی کدهای سایت جهت افزایش سرعت",
    plans: ["plus", "vip"],
  },
  { text: "چک لیست سئو اولیه", plans: ["plus", "vip"] },
  { text: "اتصال درگاه پرداخت مورد استفاده کسب و کار شما", plans: ["plus", "vip"] },
  { text: "امکان اتصال به سیستم حسابداری و انبار نواتیک", plans: ["vip"] },
  { text: "انتقال اطلاعات محصول از اکسل یا سیستم قبلی", plans: ["vip"] },
  { text: "بنر متحرک و موشن مرتبط", plans: ["vip"] },
  { text: "چت آنلاین، اینستاگرام و واتس اپ شناور", plans: ["vip"] },
  { text: "انتخاب سبک UI و UX", plans: ["vip"] },
];

const COMPANY_FEATURES: FeatureItem[] = [
  { text: "طراحی صفحه اصلی اختصاصی", plans: ["pro", "plus", "vip"] },
  { text: "صفحه خدمات، درباره ما و تماس با ما", plans: ["pro", "plus", "vip"] },
  { text: "معرفی کامل خدمات یا نمونه کارها", plans: ["pro", "plus", "vip"] },
  { text: "فرم دریافت مشاوره و ثبت درخواست", plans: ["pro", "plus", "vip"] },
  { text: "اتصال به واتس اپ و شبکه های اجتماعی", plans: ["pro", "plus", "vip"] },
  { text: "ریسپانسیو کامل در موبایل و دسکتاپ", plans: ["pro", "plus", "vip"] },
  { text: "سئو تکنیکال اولیه و سرعت مناسب", plans: ["plus", "vip"] },
  { text: "بلاگ یا بخش اخبار شرکت", plans: ["plus", "vip"] },
  { text: "چند لندینگ اختصاصی برای خدمات", plans: ["plus", "vip"] },
  { text: "پنل مدیریت پیشرفته محتوا", plans: ["plus", "vip"] },
  { text: "طراحی UI اختصاصی تر برای برند", plans: ["vip"] },
  { text: "چندزبانه یا چندشعبه ای", plans: ["vip"] },
];

function tabClassName(active: boolean) {
  return active
    ? "rounded-md bg-white text-gray-900 shadow-sm"
    : "rounded-md text-gray-600 hover:bg-gray-100";
}

function FeatureRow({ enabled, text }: { enabled: boolean; text: string }) {
  return (
    <li className="text-gray-600 font-bold flex gap-2 justify-center items-center">
      {enabled ? (
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth={0}
          viewBox="0 0 16 16"
          aria-hidden="true"
          className="text-[#333] mb-1 shrink-0"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
        </svg>
      ) : (
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth={0}
          viewBox="0 0 16 16"
          aria-hidden="true"
          className="text-[#B8B8B8] mb-1 shrink-0"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"></path>
        </svg>
      )}
      <span className={enabled ? "text-xs" : "text-xs opacity-30"}>
        {text}
        <span className="absolute h-px w-px -m-px overflow-hidden p-0">
          {enabled ? " (شامل این پلن)" : " (در این پلن نیست)"}
        </span>
      </span>
    </li>
  );
}

function PlanFeaturesCards({
  plans,
  features,
}: {
  plans: PricingPlan[];
  features: FeatureItem[];
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 w-full mt-10 gap-5 transition-all duration-300">
      {plans.map((plan) => (
        <div
          key={plan.key}
          className="flex flex-col justify-start items-center gap-5 rounded-xl px-8 py-7 bg-white transition-all duration-500 shadow-2xl"
        >
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-primary fat text-xl text-center">{plan.name}</h3>
          </div>
          <ul className="flex flex-col justify-center items-start w-full gap-3 mt-2">
            {features.map((feature) => (
              <FeatureRow
                key={`${plan.key}-${feature.text}`}
                enabled={feature.plans.includes(plan.key)}
                text={feature.text}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default function WebDesignPricingTabs() {
  const [activeSiteType, setActiveSiteType] = useState<SiteType>("shop");

  return (
    <>
      <div
        id="options"
        className="relative max-w-6xl m-auto mt-16 md:mt-20 px-6 md:px-0 z-10"
      >
        <Image
          alt=""
          aria-hidden="true"
          loading="lazy"
          width={100}
          height={100}
          className="absolute hidden xl:block xl:top-10 xl:-left-40"
          src="/images/portfolio/right-baloon.webp"
        />
        <Image
          alt=""
          aria-hidden="true"
          loading="lazy"
          width={30}
          height={30}
          className="absolute top-0 left-5 xl:top-60 xl:-left-10"
          src="/images/portfolio/right-baloon.webp"
        />
        <Image
          alt=""
          aria-hidden="true"
          loading="lazy"
          width={50}
          height={50}
          className="absolute -top-10 right-0 xl:top-40 xl:-right-20"
          src="/images/portfolio/right-baloon.webp"
        />
        <div className="flex flex-col justify-center items-center gap-2 md:gap-5 w-full">
          <h2 className="text-[#0F0F0F] font-bold fat text-2xl md:text-3xl leading-normal text-center">
            امکانات هر پلن
          </h2>
          <p className="text-gray-700 font-bold leading-7 text-center md:max-w-[56%]">
            نوع سایت را انتخاب کنید تا امکانات هر پلن را ببینید. دامنه دقیق کار
            و هزینه پس از نیازسنجی مشخص می شود.
          </p>
          <div className="flex gap-1 rounded-md bg-gray-200 p-2 mt-5 md:mt-0">
            <button
              type="button"
              onClick={() => setActiveSiteType("shop")}
              className={`transition-all duration-300 font-bold px-5 py-3 ${tabClassName(activeSiteType === "shop")}`}
              aria-pressed={activeSiteType === "shop"}
              aria-controls="pricing-plans"
            >
              سایت فروشگاهی
            </button>
            <button
              type="button"
              onClick={() => setActiveSiteType("company")}
              className={`transition-all duration-300 font-bold px-5 py-3 ${tabClassName(activeSiteType === "company")}`}
              aria-pressed={activeSiteType === "company"}
              aria-controls="pricing-plans"
            >
              سایت شرکتی
            </button>
          </div>
        </div>

        <div id="pricing-plans">
          {activeSiteType === "shop" ? (
            <PlanFeaturesCards plans={SHOP_PLANS} features={SHOP_FEATURES} />
          ) : (
            <PlanFeaturesCards plans={COMPANY_PLANS} features={COMPANY_FEATURES} />
          )}
        </div>
      </div>
    </>
  );
}