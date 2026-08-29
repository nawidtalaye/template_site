/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeftRight,
  BarChart3,
  CheckCircle,
  Landmark,
  Link2,
  Package,
  PaintBucket,
  PenTool,
  ShieldCheck,
  ShoppingCart,
  Truck,
  Users,
} from "lucide-react";
import { companyInfo } from "@/lib/site-content";
import OrbitingLogos from "@/components/OrbitingLogos";
import LeadForm from "@/components/LeadForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import RelatedLinks from "@/components/RelatedLinks";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, graph, serviceSchema, webPageSchema } from "@/lib/seo";
import { serviceByKey } from "@/lib/services";

const service = serviceByKey["accounting-software"];

const breadcrumbs = [
  { name: "صفحه اصلی", path: "/" },
  { name: "نرم افزار حسابداری", path: service.path },
];

const description =
  "نرم افزار حسابداری برای شرکت ها و فروشگاه های افغانستان: ثبت سند، خزانه، انبار، حقوق و دستمزد و گزارش های مدیریتی، قابل شخصی سازی برای مدل کاری شما.";

export const metadata = buildMetadata({
  fullTitle: `نرم افزار حسابداری و مدیریت مالی در افغانستان | ${companyInfo.brandName}`,
  title: "نرم افزار حسابداری",
  description,
  path: service.path,
});

const accountingModules = [
  { name: "حسابداری فروشگاهی", type: "ثبت فروش و صدور فاکتور", icon: ShoppingCart },
  { name: "خزانه و بانک", type: "کنترل گردش نقدی و حساب ها", icon: Landmark },
  { name: "دریافت و پرداخت", type: "اسناد مالی و تسویه حساب", icon: ArrowLeftRight },
  { name: "گزارشات مدیریتی", type: "داشبورد و گزارش سود و زیان", icon: BarChart3 },
  { name: "انبار و کالا", type: "کنترل موجودی و نقطه سفارش", icon: Package },
  { name: "پخش و توزیع", type: "مدیریت سفارش و مسیر فروش", icon: Truck },
  { name: "حقوق و دستمزد", type: "کارکرد پرسنل و پرداخت ماهانه", icon: Users },
  { name: "اتصال وب سایت", type: "یکپارچه سازی با سایت و سامانه ها", icon: Link2 },
];

export default function AccountingSoftwarePage() {
  return (
    <div className="overflow-hidden">
      <JsonLd
        data={graph(
          webPageSchema({
            path: service.path,
            name: `نرم افزار حسابداری و مدیریت مالی در افغانستان | ${companyInfo.brandName}`,
            description,
          }),
          breadcrumbSchema(breadcrumbs),
          serviceSchema({
            path: service.path,
            name: "نرم افزار حسابداری",
            description,
            serviceType: service.serviceType,
            offerCatalog: [
              "حسابداری فروشگاهی",
              "خزانه و بانک",
              "دریافت و پرداخت",
              "انبار و کالا",
              "حقوق و دستمزد",
              "گزارش های مدیریتی",
            ],
          }),
        )}
      />

      <div className="container max-w-7xl sm:px-8 2xl:px-0 mx-auto px-5 pt-32 md:pt-36">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* 1. HERO SECTION */}
      <section className="container max-w-7xl sm:px-8 2xl:px-0 mx-auto grid grid-cols-1 overflow-hidden 2xl:overflow-visible lg:grid-cols-10 gap-16 pt-10 md:pt-16 lg:pt-12 pb-28 lg:pb-48">
        {/* Right side (Text) */}
        <div
          className="flex flex-col gap-4 justify-center items-start col-span-1 order-2 lg:order-1 lg:col-span-6 mt-10 md:mt-28 lg:mt-auto"
          style={{ animation: "fadeUp 0.8s ease-out forwards" }}
        >
          <p className="bold font-bold text-primary">نرم افزار حسابداری</p>
          <h1 className="text-2xl lg:text-3xl fat font-black text-gray-900 leading-normal">
            حسابداری، خزانه و انبار کسب و کار شما در یک سیستم
          </h1>
          <p className="mt-3 mb-5 text-gray-700 leading-8 text-sm">
            <strong>نرم افزار حسابداری</strong> برای {companyInfo.brandName}
            فقط ابزار ثبت سند نیست؛ هسته ای برای مدیریت فروش، خزانه، انبار،
            حقوق و دستمزد و گزارش های مدیریتی است. سیستم متناسب با مدل کاری هر
            کسب و کار شخصی سازی می شود و در صورت نیاز به سایت یا سایر سامانه ها
            وصل می شود.
          </p>

          <div className="w-full lg:w-auto grid grid-cols-2 gap-3 px-3 lg:gap-0 lg:px-0 lg:flex lg:justify-center lg:space-x-4 lg:space-x-reverse">
            <Link
              href="#order"
              className="bg-transparent shadow-md hover:shadow-2xl transition-all duration-300 border hover:border-2 border-gray-100 text-gray-950 py-5 lg:px-14 rounded-md text-xs lg:text-sm bold flex flex-col lg:flex-row gap-3 justify-center items-center lg:gap-1"
            >
              <span className="w-10 h-10 lg:w-8 lg:h-8 flex justify-center items-center">
                <PenTool size={24} className="text-gray-400" aria-hidden="true" />
              </span>
              <span>درخواست دمو</span>
            </Link>
            <Link
              href="#order"
              className="bg-transparent shadow-md hover:shadow-2xl transition-all duration-300 border hover:border-2 border-gray-100 text-gray-950 py-5 lg:px-14 rounded-md text-xs lg:text-sm bold flex flex-col lg:flex-row gap-3 justify-center items-center lg:gap-1"
            >
              <span className="w-10 h-10 lg:w-8 lg:h-8 flex justify-center items-center">
                <PaintBucket size={24} className="text-[#54dcc6]" aria-hidden="true" />
              </span>
              <span>نسخه اختصاصی</span>
            </Link>
          </div>
        </div>

        {/* Left side (Animated Graphics) */}
        <div className="order-1 col-span-1 flex items-center justify-center md:scale-90 lg:order-2 lg:col-span-4 2xl:scale-100">
          <OrbitingLogos />
        </div>
      </section>

      {/* 2. PORTFOLIO GRID */}
      <section className="container max-w-7xl mx-auto mb-40 px-5">
        <div className="w-full flex flex-col justify-center items-center gap-5 mb-12">
          <h2 className="text-2xl md:text-3xl fat font-black text-gray-900 text-center">
            سناریوهای قابل پیاده سازی
          </h2>
          <p className="text-gray-600 text-center text-sm md:text-base">
            بخشی از ماژول ها و راهکارهایی که برای کسب و کارها قابل پیاده سازی است
          </p>
          <p className="text-gray-500 text-center text-xs md:text-sm max-w-2xl leading-7">
            {companyInfo.brandName} نرم افزار حسابداری را برای مدل های مختلف کسب و
            کار شخصی سازی می کند و موارد زیر نمونه ای از نیازهای اجرایی رایج در
            پروژه ها هستند.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-4 gap-5 content-center">
          {accountingModules.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                className="col-span-1 flex flex-col justify-center items-center gap-3 p-5 rounded-md border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 bg-white text-center"
              >
                <span className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <span className="bold font-bold text-sm text-gray-900">{item.name}</span>
                <span className="text-xs text-gray-500 leading-6">{item.type}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. CTA MIDDLE */}
      <section className="w-full mx-auto mb-28 relative min-h-[550px] md:min-h-[406px] bg-no-repeat bg-[auto_100%] md:bg-cover bg-[url('/images/normal-logo-design/lets-starts-background-lg.jpg')] flex justify-center items-center">
        <div className="w-full h-full z-10 flex flex-col justify-center items-center gap-5 max-w-4xl px-4 md:px-0">
          <h2 className="text-2xl md:text-4xl fat font-black text-gray-900 text-center">
            دریافت دموی سریع
          </h2>
          <p className="text-primary bold font-bold text-center text-lg">
            نرم افزار مناسب کسب و کار خود را سریع تر انتخاب کنید
          </p>
          <p className="text-gray-700 text-center text-sm md:text-base leading-8 max-w-2xl">
            کافی است نوع کسب و کار، حجم عملیات و نیازهای اصلی خود را مشخص کنید
            تا تیم {companyInfo.brandName} مناسب ترین نسخه نرم افزار حسابداری یا
            راهکار سفارشی را پیشنهاد دهد.
          </p>
          <Link
            href="#order"
            className="bg-primary text-white px-10 py-4 rounded-md bold font-bold text-sm shadow-xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 mt-4"
          >
            شروع مشاوره
          </Link>
        </div>
      </section>

      {/* 4. PROCESS */}

      <section className="max-w-full mx-auto mb-20 md:mb-40 sm:px-8 xl:px-0">
        <div className="w-full max-w-4xl mx-auto px-5 flex flex-col justify-center items-center gap-5 mb-12">
          <strong className="heavy font-bold text-primary text-lg">
            خدمات ما
          </strong>
          <span className="text-3xl fat font-black text-gray-900 text-center leading-[50px]">
            با <strong className="text-primary">{companyInfo.brandName}</strong>{" "}
            راهکار مالی متناسب با کسب و کار خود را انتخاب کنید
          </span>
          <p className="leading-8 text-center text-gray-500">
            خدمات نرم افزاری ما از تحلیل نیاز، طراحی ساختار اطلاعات و شخصی سازی
            فرایندها تا آموزش و پشتیبانی بعد از استقرار ادامه پیدا می کند.
          </p>
        </div>
        <div className="bg-[100%_auto] flex select-none justify-center items-center min-h-[300px] bg-bottom bg-no-repeat bg-[url('/images/normal-logo-design/services-background-lg.jpg')] my-10">
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 content-center place-content-center place-items-center px-10 md:px-0">
            <div className="transition-all duration-300 cursor-pointer hover:scale-105 relative flex justify-evenly md:justify-center items-center col-span-1 w-full md:w-[180px] h-[180px] flex-row-reverse md:flex-row">
              <img
                alt=""
                aria-hidden="true"
                loading="lazy"
                width="215"
                height="215"
                decoding="async"
                data-nimg="1"
                className="w-[150px] md:w-[180px]"
                srcSet="/images/normal-logo-design/services-icon-1.png 1x, /images/normal-logo-design/services-icon-1.png 2x"
                src="/images/normal-logo-design/services-icon-1.png"
              />
              <span className="md:absolute -top-3 right-0 text-gray-800 text-sm bold text-center">
                تحلیل نیاز و مشاوره
              </span>
              <span className="absolute top-2 left-3 md:bottom-2 md:right-0 flex justify-center items-center bg-[#45505F] w-7 h-7 rounded-full text-white">
                1
              </span>
            </div>
            <div className="transition-all duration-300 cursor-pointer hover:scale-105 relative flex justify-evenly md:justify-center items-center col-span-1 w-full md:w-[180px] h-[180px]">
              <img
                alt=""
                aria-hidden="true"
                loading="lazy"
                width="215"
                height="215"
                decoding="async"
                data-nimg="1"
                className="w-[150px] md:w-[180px]"
                srcSet="/images/normal-logo-design/services-icon-2.png 1x, /images/normal-logo-design/services-icon-2.png 2x"
                src="/images/normal-logo-design/services-icon-2.png"
              />
              <span className="md:absolute -bottom-5 text-center md:text-right text-gray-800 text-sm bold">
                طراحی فرم ها و <br /> ماژول های اجرایی
              </span>
              <span className="absolute top-2 right-0 flex justify-center items-center bg-primary w-7 h-7 rounded-full text-white">
                2
              </span>
            </div>
            <div className="transition-all duration-300 cursor-pointer hover:scale-105 relative flex justify-evenly md:justify-center items-center col-span-1 w-full md:w-[180px] h-[180px] flex-row-reverse md:flex-row">
              <img
                alt=""
                aria-hidden="true"
                loading="lazy"
                width="215"
                height="215"
                decoding="async"
                data-nimg="1"
                className="w-[150px] md:w-[180px]"
                srcSet="/images/normal-logo-design/services-icon-3.png 1x, /images/normal-logo-design/services-icon-3.png 2x"
                src="/images/normal-logo-design/services-icon-3.png"
              />
              <span className="md:absolute -top-3 right-0 text-gray-800 text-sm bold text-center">
                تحلیل داده ها <br className="block md:hidden" /> و ساختار
                <br className="block md:hidden" /> دیتابیس
              </span>
              <span className="absolute top-2 left-3 md:bottom-2 md:right-0 flex justify-center items-center bg-[#45505F] w-7 h-7 rounded-full text-white">
                3
              </span>
            </div>
            <div className="transition-all duration-300 cursor-pointer hover:scale-105 relative flex justify-evenly md:justify-center items-center col-span-1 w-full md:w-[180px] h-[180px]">
              <img
                alt=""
                aria-hidden="true"
                loading="lazy"
                width="215"
                height="215"
                decoding="async"
                data-nimg="1"
                className="w-[150px] md:w-[180px]"
                srcSet="/images/normal-logo-design/services-icon-4.png 1x, /images/normal-logo-design/services-icon-4.png 2x"
                src="/images/normal-logo-design/services-icon-4.png"
              />
              <span className="md:absolute -bottom-5 text-gray-800 text-sm bold">
                تست، بازخورد <br className="block md:hidden" /> و بهینه سازی
              </span>
              <span className="absolute top-2 right-0 flex justify-center items-center bg-primary w-7 h-7 rounded-full text-white">
                4
              </span>
            </div>
            <div className="transition-all duration-300 cursor-pointer hover:scale-105 relative flex justify-evenly md:justify-center items-center col-span-1 w-full md:w-[180px] h-[180px] flex-row-reverse md:flex-row">
              <img
                alt=""
                aria-hidden="true"
                loading="lazy"
                width="215"
                height="215"
                decoding="async"
                data-nimg="1"
                className="w-[150px] md:w-[180px]"
                srcSet="/images/normal-logo-design/services-icon-5.png 1x, /images/normal-logo-design/services-icon-5.png 2x"
                src="/images/normal-logo-design/services-icon-5.png"
              />
              <span className="md:absolute -top-3 right-0 text-gray-800 text-sm bold text-center">
                استقرار، آموزش و پشتیبانی
              </span>
              <span className="absolute top-2 left-3 md:bottom-2 md:right-0 flex justify-center items-center bg-[#45505F] w-7 h-7 rounded-full text-white">
                5
              </span>
            </div>
          </div>
        </div>
        <div className="hidden w-full md:flex flex-col justify-center items-center">
          <a
            id="btn2"
            className="bg-primary hover:shadow-xl transition-all duration-300 mt-3 rounded-md flex justify-center items-center gap-2 px-10 py-4"
            href="#order"
          >
            <span className="bold text-white">درخواست نسخه اختصاصی</span>
            <span className="size-4 mb-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  strokeWidth="1.5"
                  d="M12.396 16.6l-5.207-5.433a1.706 1.706 0 010-2.334L12.396 3.4"
                ></path>
              </svg>
            </span>
          </a>
        </div>
      </section>

      {/* 5. PRICING */}
      <section className="mb-40">
        <div className="container max-w-7xl mx-auto px-5 w-full flex flex-col justify-center items-center gap-5 mb-14">
          <h2 className="text-2xl md:text-4xl font-iranyekan-fat text-gray-900 text-center">
            پلن های استقرار
          </h2>
          <p className="text-gray-700 text-center font-iranyekan text-sm md:text-base leading-8">
            پلن های زیر برای شروع، توسعه و شخصی سازی راهکارهای مالی در{" "}
            <span className="font-iranyekan-bold text-primary">
              {companyInfo.brandName}
            </span>{" "}
            طراحی شده اند
          </p>
        </div>

        <div className="container max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Plan 1 */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col group">
              <div className="p-8 text-center bg-gray-50 border-b border-gray-100 flex flex-col items-center">
                <Image
                  src="/images/star.png"
                  alt=""
                  aria-hidden="true"
                  width={24}
                  height={24}
                  unoptimized
                  className="mb-2"
                />
                <h3 className="font-iranyekan-fat text-2xl text-gray-900 mb-2">
                  پایه
                </h3>
                <div className="text-primary font-iranyekan-bold text-3xl mb-1 flex items-baseline justify-center gap-1">
                  <span>استعلام</span>
                  <span className="text-sm text-gray-500 font-iranyekan">
                    قیمت پس از نیازسنجی
                  </span>
                </div>
              </div>
              <div className="p-8 flex-grow flex flex-col gap-4 font-iranyekan text-sm text-gray-600">
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span>تعداد کاربران</span>
                  <span className="font-iranyekan-bold text-gray-900">
                    3 کاربر
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span>مدت استقرار</span>
                  <span className="font-iranyekan-bold text-gray-900">7</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span>نوع پشتیبانی</span>
                  <span className="font-iranyekan-bold text-gray-900">1</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle size={18} />
                  <span>تعریف سرفصل ها و حساب ها</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle size={18} />
                  <span>آموزش اولیه تیم مالی</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle size={18} />
                  <span>گزارشات پایه و خروجی اکسل</span>
                </div>
              </div>
              <div className="p-6">
                <Link
                  href="#order"
                  className="block w-full py-4 text-center rounded-xl bg-gray-900 text-white font-iranyekan-bold hover:bg-primary transition-colors duration-300"
                >
                  درخواست مشاوره
                </Link>
              </div>
            </div>

            {/* Plan 2 (Highlighted) */}
            <div className="bg-white border-2 border-primary rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col transform md:-translate-y-4 relative">
              <div className="absolute top-0 left-0 right-0 bg-primary text-white text-center py-1 text-xs font-iranyekan-bold tracking-wider">
                پيشنهاد ويژه
              </div>
              <div className="p-8 text-center bg-red-50/50 border-b border-gray-100 flex flex-col items-center mt-6">
                <div className="flex gap-1 mb-2">
                  <Image
                    src="/images/star.png"
                    alt=""
                  aria-hidden="true"
                    width={24}
                    height={24}
                    unoptimized
                  />
                  <Image
                    src="/images/star.png"
                    alt=""
                  aria-hidden="true"
                    width={24}
                    height={24}
                    unoptimized
                  />
                </div>
                <h3 className="font-iranyekan-fat text-2xl text-gray-900 mb-2">
                  حرفه ای
                </h3>
                <div className="text-primary font-iranyekan-bold text-3xl mb-1 flex items-baseline justify-center gap-1">
                  <span>استعلام</span>
                  <span className="text-sm text-gray-500 font-iranyekan">
                    قیمت پس از نیازسنجی
                  </span>
                </div>
              </div>
              <div className="p-8 flex-grow flex flex-col gap-4 font-iranyekan text-sm text-gray-600">
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span>سطح پوشش</span>
                  <span className="font-iranyekan-bold text-primary">
                    چندبخشی
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span>مدت استقرار</span>
                  <span className="font-iranyekan-bold text-gray-900">10</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span>تعداد کاربران</span>
                  <span className="font-iranyekan-bold text-gray-900">2</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle size={18} />
                  <span>تعریف فرایند فروش و خزانه</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle size={18} />
                  <span>گزارشات مدیریتی سفارشی</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle size={18} />
                  <span>اتصال به انبار و کالا</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle size={18} />
                  <span>پشتیبانی راه اندازی</span>
                </div>
              </div>
              <div className="p-6">
                <Link
                  href="#order"
                  className="block w-full py-4 text-center rounded-xl bg-primary text-white font-iranyekan-bold hover:bg-gray-900 transition-colors duration-300"
                >
                  درخواست مشاوره
                </Link>
              </div>
            </div>

            {/* Plan 3 */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col">
              <div className="p-8 text-center bg-gray-50 border-b border-gray-100 flex flex-col items-center">
                <div className="flex gap-1 mb-2">
                  <Image
                    src="/images/star.png"
                    alt=""
                  aria-hidden="true"
                    width={24}
                    height={24}
                    unoptimized
                  />
                  <Image
                    src="/images/star.png"
                    alt=""
                  aria-hidden="true"
                    width={24}
                    height={24}
                    unoptimized
                  />
                  <Image
                    src="/images/star.png"
                    alt=""
                  aria-hidden="true"
                    width={24}
                    height={24}
                    unoptimized
                  />
                </div>
                <h3 className="font-iranyekan-fat text-2xl text-gray-900 mb-2">
                  سازمانی
                </h3>
                <div className="text-primary font-iranyekan-bold text-3xl mb-1 flex items-baseline justify-center gap-1">
                  <span>استعلام</span>
                  <span className="text-sm text-gray-500 font-iranyekan">
                    قیمت پس از نیازسنجی
                  </span>
                </div>
              </div>
              <div className="p-8 flex-grow flex flex-col gap-4 font-iranyekan text-sm text-gray-600">
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span>نوع استقرار</span>
                  <span className="font-iranyekan-bold text-primary">
                    اختصاصی
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span>مدت استقرار</span>
                  <span className="font-iranyekan-bold text-gray-900">15</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span>تیم اجرایی</span>
                  <span className="font-iranyekan-bold text-gray-900">
                    تیم کامل
                  </span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle size={18} />
                  <span>تمامی امکانات پلن قبلی</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle size={18} />
                  <span>طراحی دیتابیس اختصاصی</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle size={18} />
                  <span>داشبورد مدیریتی و KPI</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle size={18} />
                  <span>یکپارچه سازی با سایت و ابزارها</span>
                </div>
              </div>
              <div className="p-6">
                <Link
                  href="#order"
                  className="block w-full py-4 text-center rounded-xl bg-gray-900 text-white font-iranyekan-bold hover:bg-primary transition-colors duration-300"
                >
                  درخواست مشاوره
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ORDER FORM */}
      <section
        id="order"
        className="container max-w-7xl mx-auto mb-40 px-8 md:px-14 shadow-2xl rounded-3xl h-auto md:h-[400px] grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-5 py-10 mt-32 bg-white relative overflow-hidden"
      >
        {/* Decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-50 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2"></div>

        <div className="flex flex-col justify-center items-center md:items-start col-span-1 md:col-span-6 gap-4 z-10">
          <h3 className="font-iranyekan-fat text-3xl text-gray-900">
            فرم را پر کنید تا برای دریافت دمو با شما تماس بگیریم
          </h3>
          <p className="text-gray-600 font-iranyekan text-sm leading-8 text-center md:text-right">
            اگر برای انتخاب نسخه مناسب نرم افزار حسابداری، طراحی دیتابیس یا
            یکپارچه سازی فرایندهای مالی نیاز به مشاوره دارید، اطلاعات خود را ثبت
            کنید تا تیم {companyInfo.brandName} با شما تماس بگیرد.
          </p>
        </div>

        <div className="flex w-full md:px-10 flex-col justify-center items-start gap-6 col-span-1 md:col-span-6 z-10">
          <LeadForm source="accounting-demo" className="w-full flex flex-col gap-4">
            <input
              id="accounting-demo-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              aria-label="نام و نام خانوادگی"
              placeholder="نام و نام خانوادگی"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-sm font-iranyekan focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
            />
            <input
              id="accounting-demo-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              aria-label="شماره تماس"
              placeholder="شماره تماس"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-sm font-iranyekan focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-left"
              dir="ltr"
            />
            <button
              type="submit"
              className="w-full bg-primary text-white py-4 rounded-xl text-sm font-iranyekan-bold hover:bg-primary-hover duration-300 shadow-md hover:shadow-xl mt-2 flex justify-center items-center gap-2"
            >
              <span>ثبت درخواست</span>
              <ShieldCheck size={18} aria-hidden="true" />
            </button>
          </LeadForm>
        </div>
      </section>

      <RelatedLinks
        serviceKey={service.key}
        caseStudySlugs={service.caseStudies}
      />
    </div>
  );
}
