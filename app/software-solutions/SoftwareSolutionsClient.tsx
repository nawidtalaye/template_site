import Image from "next/image";
import { Check, ChevronDown, Phone } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { companyInfo } from "@/lib/site-content";
import SoftwareSolutionsFaq from "./SoftwareSolutionsFaq";
import { softwareSolutionsFaq } from "./faq-items";
import LeadForm from "@/components/LeadForm";
const BRAND_IMAGE_BASE = "/images/brand-registration-discount";

const heroServices = [
  {
    title: "نرم‌افزارهای یکپارچه مالی",
    description: "مدیریت حساب‌ها، صرافی و تبادلات ارزی.",
    image: `${BRAND_IMAGE_BASE}/brand-ownership.png`,
  },
  {
    title: "سیستم‌های داشبورد مدیریتی",
    description: "گزارش‌گیری زنده از فروش و منابع انسانی.",
    image: `${BRAND_IMAGE_BASE}/brand-naming.png`,
  },
  {
    title: "راهکارهای لجستیک و فروش",
    description: "نرم‌افزارهای POS رستوران و مدیریت باربری.",
    image: `${BRAND_IMAGE_BASE}/company-registration.png`,
  },
  {
    title: "سیستم‌های اداری و سازمانی",
    description: "مدیریت حضور و غیاب و اتوماسیون آژانس‌ها.",
    image: `${BRAND_IMAGE_BASE}/trade-license.png`,
  },
];



const serviceOptions = [
  "سیستم مدیریت لجستیک و باربری",
  "نرم‌افزار فروش رستوران (POS)",
  "نرم‌افزار سوپرمارکت و فروشگاه",
  "سیستم مدیریت گدام و انبار",
  "نرم‌افزار کارگاه خیاطی",
  "مدیریت یکپارچه آژانس مسافرتی",
  "سیستم هوشمند حضور و غیاب",
  "نرم‌افزار اختصاصی دیگر"
];

const detailedServices = [
  {
    title: "سیستم مدیریت لجستیک و باربری",
    image: "/images/portfolio/novatech-logistics-management-system.webp",
    description: "رهگیری کالاها از مبدأ تا مقصد، مدیریت ناوگان حمل‌ونقل و کنترل دقیق بارنامه‌ها به ساده‌ترین شکل.",
    items: [
      "صدور سریع و خودکار بارنامه",
      "مدیریت ناوگان و رانندگان",
      "پیگیری وضعیت لحظه‌ای مرسولات",
      "گزارش‌گیری دقیق هزینه‌ها و درآمدها"
    ]
  },
  {
    title: "نرم‌افزار فروش رستوران (POS)",
    image: "/images/portfolio/novatech-restaurant-pos-system.webp",
    description: "ثبت سریع سفارشات، مدیریت میزها، کنترل موجودی آشپزخانه و حسابداری روزانه با رابط کاربری بسیار نرم.",
    items: [
      "ثبت سفارش سریع با رابط لمسی",
      "ارتباط مستقیم سالن با آشپزخانه",
      "مدیریت موجودی مواد اولیه",
      "گزارش‌گیری فروش روزانه و شیفتی"
    ]
  },
  {
    title: "نرم‌افزار سوپرمارکت و فروشگاه",
    image: "/images/portfolio/novatech-supermarket-management-system.webp",
    description: "فروش با بارکد، کنترل موجودی و تاریخ انقضا و حساب مشتریان و تامین‌کنندگان در یک سیستم واحد.",
    items: [
      "فروش سریع با بارکد و صندوق فروش",
      "کنترل موجودی و هشدار کسری",
      "قیمت‌گذاری و محاسبه سود هر قلم",
      "گزارش فروش روزانه و شیفتی"
    ]
  },
  {
    title: "سیستم مدیریت گدام و انبار",
    image: "/images/portfolio/novatech-warehouse-management-system.webp",
    description: "ثبت ورود و خروج کالا، موجودی به تفکیک گدام و حواله انبار با گزارش لحظه‌ای موجودی.",
    items: [
      "ثبت حواله ورود و خروج کالا",
      "موجودی به تفکیک گدام و کالا",
      "انتقال کالا بین گدام‌ها",
      "حداقل موجودی و هشدار کسری"
    ]
  },
  {
    title: "نرم‌افزار کارگاه خیاطی",
    image: "/images/portfolio/novatech-tailoring-management-system.webp",
    description: "ثبت سفارش و اندازه مشتری، پیگیری مراحل دوخت و محاسبه کارکرد خیاط در یک سیستم.",
    items: [
      "ثبت سفارش و اندازه‌های مشتری",
      "پیگیری مراحل دوخت و تاریخ تحویل",
      "محاسبه کارکرد و دستمزد خیاط",
      "حساب مشتری، بیعانه و باقی‌مانده"
    ]
  },
  {
    title: "مدیریت یکپارچه آژانس مسافرتی",
    image: "/images/portfolio/novatech-travel-agency-system.webp",
    description: "مدیریت تورها، بلیط‌ها، اطلاعات مسافران و حسابداری آژانس به صورت کاملاً یکپارچه و بدون خطا.",
    items: [
      "ثبت و مدیریت اطلاعات تور و پرواز",
      "بایگانی دقیق اطلاعات مسافران",
      "حسابداری اختصاصی خدمات مسافرتی",
      "صدور فاکتور و پیگیری اقساط"
    ]
  },
  {
    title: "سیستم هوشمند حضور و غیاب",
    image: "/images/portfolio/novatech-attendance-system.webp",
    description: "ثبت دقیق ورود و خروج پرسنل، محاسبه کارکرد، مدیریت مرخصی‌ها و اتصال مستقیم به سیستم حقوق و دستمزد.",
    items: [
      "ثبت خودکار ترددها و شیفت‌ها",
      "مدیریت مرخصی‌ها و اضافه‌کاری",
      "محاسبه سریع حقوق پایان ماه",
      "گزارش‌گیری دقیق برای مدیر منابع انسانی"
    ]
  }
];

const trustHighlights = [
  {
    image: "/images/design-landings/box-04.png",
    title: "تحلیل دقیق فرایندها",
    description: "قبل از اجرا، ساختار کسب و کار و نیازهای واقعی شما بررسی می شود.",
  },
  {
    image: "/images/design-landings/box-03.png",
    title: "اجرای امن و قابل توسعه",
    description: "پایگاه داده و نرم افزار به شکلی طراحی می شود که در آینده هم قابل رشد باشد.",
  },
  {
    image: "/images/design-landings/box-02.png",
    title: "تجربه عملی در پروژه های اجرا شده",
    description: "سیستم های معرفی شده در این صفحه نمونه هایی از پروژه های تحویل داده شده نواتیک هستند.",
  },
  {
    image: "/images/design-landings/box-01.png",
    title: "پشتیبانی همیشه در دسترس",
    description: "بعد از استقرار هم برای آموزش، توسعه و رفع نیازهای جدید کنار شما هستیم.",
  },
];


function TextField({
  name,
  placeholder,
  type = "text",
  dir = "rtl",
}: {
  name: string;
  placeholder: string;
  type?: string;
  dir?: "rtl" | "ltr";
}) {
  return (
    <div className="flex flex-col gap-2 transition-all w-full">
      <div className="relative w-full">
        <input
          className={`w-full py-3 px-6 rounded-xl border border-gray-100 bg-gray-50 transition-all focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 outline-none text-right placeholder:text-gray-400 ${dir === "ltr" ? "text-left" : "text-right"}`}
          id={`software-solutions-${name}`}
          name={name}
          type={type}
          inputMode={type === "tel" ? "tel" : undefined}
          autoComplete={type === "tel" ? "tel" : "name"}
          required
          aria-label={placeholder}
          placeholder={placeholder}
          dir={dir}
        />
      </div>
    </div>
  );
}

function SelectField({ name, placeholder, options }: { name: string; placeholder: string; options: string[] }) {
  return (
    <div className="w-full relative group select-none">
      <select id={`software-solutions-${name}`} name={name} aria-label={placeholder} className="w-full flex justify-between items-center bg-gray-50 px-6 py-3 rounded-xl border border-gray-100 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 outline-none transition-all appearance-none font-medium text-gray-700">
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown aria-hidden="true" className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 size-[18px] text-gray-400 group-focus-within:text-primary transition-colors" />
    </div>
  );
}

export default function SoftwareSolutionsClient() {
  return (
    <div className="min-h-screen relative mx-auto w-full bg-white overflow-x-hidden" dir="rtl">
      <section
        id="order"
        className="max-w-6xl m-auto px-5 md:px-0 pt-28 md:pt-20 mt-0 md:mt-12"
      >
        <div className="mb-10">
          <Breadcrumbs
            items={[
              { name: "صفحه اصلی", path: "/" },
              { name: "توسعه نرم افزار اختصاصی", path: "/software-solutions" },
            ]}
          />
        </div>
        <div className="flex flex-col items-center text-center gap-6">
          <span className="text-gray-500 font-bold text-sm">
            توسعه نرم افزار و دیتابس در هرات
          </span>
          <h1 className="text-primary font-bold fat text-3xl md:text-5xl lg:text-6xl leading-normal w-full max-w-4xl">
            نرم افزار اختصاصی برای
            <b className="text-[#0F0F0F] leading-normal">
              {" "}
              مدیریت مالی، عملیاتی و داده های کسب و کار در افغانستان
            </b>
          </h1>
          <p className="text-gray-700 font-bold leading-8 text-center max-w-3xl">
            سیستم های عملیاتی که کار روزمره یک کسب و کار را جمع می کنند: ثبت
            تراکنش مالی، کنترل انبار، فروش، لجستیک، پرونده مسافران و حضور و
            غیاب. هر سیستم روی دیتابیسی ساخته می شود که برای فرایند شما طراحی
            شده و در آینده هم قابل توسعه است.
          </p>

          <div className="flex flex-col sm:flex-row w-full justify-center gap-3 mt-2">
            <a
              href="#consultation"
              className="py-4 px-8 bg-primary hover:opacity-90 transition-all duration-300 text-white font-bold rounded-xl text-center"
            >
              دریافت مشاوره رایگان
            </a>
            <a
              href="#services"
              className="py-4 px-8 border border-gray-200 text-gray-700 hover:text-primary hover:border-primary transition-all duration-300 rounded-xl text-center font-bold"
            >
              مشاهده نرم افزارها
            </a>
          </div>

          <div className="relative w-full max-w-5xl mt-3">
            <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-[40px]"></div>
            <div className="relative rounded-[32px] border border-gray-200 bg-white p-3 md:p-4 shadow-[0_25px_80px_rgba(15,15,15,0.08)]">
              <div className="relative aspect-[10/6] overflow-hidden rounded-[24px] bg-[#f4f8f7]">
                <Image
                  src="/images/portfolio/novatech-management-dashboard.png"
                  alt="نرم افزارهای اختصاصی"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 w-full mt-4">
            {heroServices.map((item) => (
              <div
                key={item.title}
                className="rounded-[24px] border border-gray-200/80 bg-white/95 backdrop-blur-sm p-4 md:p-5 shadow-[0_10px_30px_rgba(15,15,15,0.05)] flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(15,15,15,0.08)] hover:border-primary/20"
              >
                <div className="relative size-14 shrink-0 rounded-[18px] overflow-hidden bg-primary/5 ring-1 ring-primary/10">
                  <Image src={item.image} alt={item.title} fill className="object-contain p-2.5" />
                </div>
                <div className="flex flex-col gap-1 text-right">
                  <span className="bold text-gray-900 text-sm md:text-base">{item.title}</span>
                  <span className="text-sm text-gray-500 leading-6">{item.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="why-trust"
        className="max-w-5xl m-auto mt-16 md:mt-20 px-5 xl:px-0"
      >
        <div className="flex flex-col justify-center items-start md:items-center gap-2 md:gap-5 w-full">
          <span className="text-gray-500 font-bold text-sm">
            دلایل انتخاب {companyInfo.brandName}
          </span>
          <h2 className="text-primary font-bold fat text-3xl mb-3 leading-normal">
            چرا
            <b className="text-[#0F0F0F] leading-normal">
              {" "}
              راهکارهای دیتابیس نواتیک
            </b>
            {" "}برای کسب و کارها کاربردی است؟
          </h2>
          <p className="text-gray-700 font-bold leading-7 text-justify">
            بیشتر مشکلات نرم افزاری از ساختار داده شروع می شود، نه از ظاهر
            برنامه. ما اول فرایند و داده کسب و کار را مدل می کنیم، بعد سیستم را
            روی آن می سازیم؛ به همین دلیل افزودن شعبه، ماژول یا گزارش جدید بعداً
            نیاز به بازنویسی ندارد.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 mt-5 md:mt-10 gap-4 xl:gap-10">
          <div className="col-span-2 md:pl-10 relative h-auto flex justify-center items-center">
            <Image
              alt="نمای کلی نرم افزارها"
              loading="lazy"
              width={800}
              height={800}
              sizes="(max-width: 768px) 100vw, 66vw"
              className="rounded-xl w-full h-auto cursor-pointer z-10"
              src="/images/portfolio/novatech-financial-exchange-system.png"
            />
          </div>
          <div className="col-span-1 flex flex-col gap-4 py-2">
            {trustHighlights.map((item) => (
              <div key={item.title} className="flex justify-center items-start gap-3">
                <Image
                  alt={item.title}
                  loading="lazy"
                  width={60}
                  height={60}
                  src={item.image}
                />
                <p className="flex flex-col justify-center items-start text-right">
                  <span className="font-bold text-lg text-gray-900">{item.title}</span>
                  <span className="text-gray-600 text-sm leading-6">
                    {item.description}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="max-w-6xl mx-auto mt-24 px-5">
        <div className="w-full flex-col justify-center items-start gap-4 flex mb-10">
          <span className="text-gray-500 font-bold text-sm">
            نمونه نرم افزارهای اجرا شده
          </span>
          <h2 className="fat text-3xl font-black leading-normal">
            راهکارهای دیتابیس و نرم افزارهای
            <strong className="text-primary"> اختصاصی </strong>
            ما
          </h2>
          <span className="text-gray-600 text-sm bold leading-8">
            هر کارت یک دسته از سیستم هایی است که برای مدیریت عملیات، گزارش گیری،
            فروش، منابع انسانی یا داده های مالی می سازیم. هر کدام قابل شخصی سازی
            برای مدل کاری شماست.
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {detailedServices.map((service) => (
            <div
              key={service.title}
              className="group relative overflow-hidden bg-white rounded-[28px] border border-gray-200/80 shadow-[0_20px_55px_rgba(15,15,15,0.06)] p-4 md:p-5 flex flex-col gap-5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_70px_rgba(15,15,15,0.1)] hover:border-primary/20"
            >
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative aspect-[4/3] rounded-[22px] overflow-hidden bg-background">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="pointer-events-none select-none object-cover object-top group-hover:scale-[1.04] transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-70"></div>
              </div>
              <div className="flex items-start justify-between gap-4 text-right">
                <div className="flex flex-col gap-2">
                  <h3 className="fat !text-lg text-foreground">{service.title}</h3>
                  <p className="text-sm text-gray-500 leading-7">{service.description}</p>
                </div>
                <span className="shrink-0 bg-primary/10 text-primary rounded-2xl p-2.5 ring-1 ring-primary/10">
                  <Check className="size-4" aria-hidden="true" />
                </span>
              </div>
              <ul className="flex flex-col gap-3 pt-1 border-t border-gray-100">
                {service.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-600 text-sm leading-7">
                    <span className="bg-gray-100 text-primary rounded-full p-1 mt-1 ring-1 ring-gray-200">
                      <Check className="size-3.5" aria-hidden="true" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section - World Class Logic */}
      <section id="consultation" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-[#45505F] rounded-[4rem] p-12 md:p-20 relative overflow-hidden flex flex-col lg:flex-row items-center gap-16 shadow-2xl shadow-gray-900/20">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]"></div>
            
            <div className="flex-1 flex flex-col gap-8 text-center lg:text-right relative z-10">
              <h2 className="fat text-4xl md:text-5xl text-white leading-[1.3]">
                آماده هوشمندسازی <br />
                <span className="text-primary">مدیریت داده‌هایتان</span> هستید؟
              </h2>
              <p className="text-gray-300 text-xl leading-relaxed">
                شماره خود را ثبت کنید تا کارشناسان ارشد فنی ما در کوتاه‌ترین زمان برای ارائه مشاوره رایگان و تحلیل سناریو با شما تماس بگیرند.
              </p>
              <div className="flex items-center justify-center lg:justify-start gap-4 text-white/60">
                <Check className="text-primary" aria-hidden="true" />
                <span>مشاوره کاملاً رایگان و تخصصی</span>
              </div>
            </div>

            <div className="flex-1 w-full max-w-md relative z-10">
              <LeadForm source="software-solutions" className="bg-white p-10 rounded-[3rem] shadow-2xl flex flex-col gap-5 border border-white/20">
                <div className="text-center mb-4">
                  <h3 className="fat text-2xl text-gray-900 mb-2">ثبت درخواست مشاوره</h3>
                  <p className="text-gray-500 text-sm">اطلاعات خود را وارد کنید</p>
                </div>
                <TextField name="name" placeholder="نام و نام خانوادگی" />
                <TextField name="phone" type="tel" placeholder="شماره تماس (مثلاً 07...)" dir="ltr" />
                <SelectField name="service" placeholder="نوع خدمت مورد نظر" options={serviceOptions} />
                <button type="submit" className="w-full py-5 bg-primary text-white fat text-lg rounded-2xl hover:brightness-110 hover:shadow-2xl hover:shadow-primary/30 transition-all transform active:scale-95 mt-2">
                  ارسال درخواست و تماس
                </button>
              </LeadForm>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-20 flex flex-col gap-4">
            <span className="text-primary font-bold text-sm uppercase tracking-widest">پاسخ به ابهامات</span>
            <h2 className="fat text-4xl text-gray-950">سوالات متداول شما</h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full mt-2"></div>
          </div>
          <SoftwareSolutionsFaq items={softwareSolutionsFaq} />
        </div>
      </section>
      
      {/* Contact Bar matching Footer Logic */}
      <div className="flex-col md:flex-row w-full shadow-2xl rounded-[2.5rem] p-8 flex mb-20 relative justify-around items-center mt-20 bg-[#45505F] max-w-[90vw] md:max-w-6xl !z-30 mx-auto gap-8">
        <p className="md:text-xl text-center font-bold tracking-wider text-white leading-relaxed max-w-2xl">
          امکانات دیگری فراتر از نرم‌افزارهای عمومی و دیتابیس‌های پایه مد نظر دارید؟
        </p>
        <a href={`tel:${companyInfo.primaryPhoneHref}`}>
          <div className="text-center transition-all bg-primary hover:bg-[#45bba7] hover:scale-105 duration-300 leading-[30px] text-white fat md:text-lg text-sm rounded-2xl py-4 px-12 shadow-xl shadow-primary/20">
            تماس مستقیم با کارشناسان
          </div>
        </a>
      </div>
    </div>
  );
}
