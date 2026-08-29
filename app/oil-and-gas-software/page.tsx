import ServicePageShell from "@/components/ServicePageShell";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import {
  breadcrumbSchema,
  faqSchema,
  graph,
  serviceSchema,
  webPageSchema,
} from "@/lib/seo";
import { serviceByKey } from "@/lib/services";
import { companyInfo } from "@/lib/site-content";

/*
 * The delivered petroleum system is now documented as a case study at
 * /portfolio/oil-and-gas-management-system, linked from the first block below
 * and from the related-work strip (via `caseStudies` in lib/services.ts).
 *
 * TODO (business input still required): that case study leads with the product
 * poster, not a screenshot, and publishes no client name and no figures,
 * because none of those is on record here. To finish it, supply:
 *   - screenshots of the delivered system that may be published, to sit
 *     alongside the poster set in lib/case-studies.ts
 *   - whether the operator permits being named, and if not, the sector and
 *     scale that may be described instead
 * Do not publish an invented client or an invented volume/saving figure.
 */

const service = serviceByKey["oil-and-gas-software"];

const breadcrumbs = [
  { name: "صفحه اصلی", path: "/" },
  { name: "نرم افزار نفت و گاز", path: service.path },
];

const faq = [
  {
    question: "چرا نرم افزار حسابداری عمومی برای شرکت نفتی کافی نیست؟",
    answer:
      "چون واحد کار در این صنعت با بقیه فرق دارد. مقدار سوخت با لیتر و تن و در دماهای مختلف ثبت می شود، بین انبار و تانکر کسری طبیعی وجود دارد و قیمت خرید یک محموله تا رسیدن به مقصد با کرایه، گمرک و افت تغییر می کند. سیستم حسابداری عمومی این ها را به عنوان خطای ثبت می بیند، نه واقعیت عملیاتی.",
  },
  {
    question: "محاسبه کسری و افت چطور انجام می شود؟",
    answer:
      "با ثبت مقدار در هر نقطه انتقال — بارگیری، رسیدن به دیپو، تخلیه در تانک و تحویل به مشتری — تفاوت هر مرحله به صورت جداگانه نگه داشته می شود. در نتیجه به جای یک عدد کلی کسری در پایان ماه، مشخص است اختلاف در کدام مرحله و کدام مسیر ایجاد شده است.",
  },
  {
    question: "کار با افغانی و دالر هم زمان ممکن است؟",
    answer:
      "بله. خرید محموله معمولاً به دالر و فروش داخلی به افغانی انجام می شود. ثبت دو ارزی با نرخ روز و نگهداری سود و زیان تبدیل ارز، بخشی از طراحی حساب ها است و بعداً به سیستم اضافه نمی شود.",
  },
  {
    question: "سیستم بدون اینترنت پایدار کار می کند؟",
    answer:
      "دیپو و ایستگاه ها همیشه اینترنت پایدار ندارند. بسته به شرایط، سیستم روی سرور محلی راه اندازی می شود یا با قابلیت کار آفلاین و همگام سازی بعد از وصل شدن طراحی می شود. این تصمیم در مرحله تحلیل و بر اساس وضعیت واقعی نقاط شما گرفته می شود.",
  },
];

export const metadata = buildMetadata({
  fullTitle: `نرم افزار نفت و گاز افغانستان | سیستم مدیریت شرکت نفتی | ${companyInfo.brandName}`,
  title: "نرم افزار نفت و گاز",
  description:
    "نرم افزار تخصصی شرکت های نفتی در افغانستان: مدیریت واردات مواد نفتی، دیپو و تانک، توزیع و ایستگاه، قیمت گذاری دو ارزی و حسابداری مخصوص سوخت.",
  path: service.path,
});

export default function OilAndGasSoftwarePage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: service.path,
            name: `نرم افزار نفت و گاز افغانستان | ${companyInfo.brandName}`,
            description: metadata.description as string,
          }),
          breadcrumbSchema(breadcrumbs),
          serviceSchema({
            path: service.path,
            name: "نرم افزار تخصصی نفت و گاز",
            description: metadata.description as string,
            serviceType: service.serviceType,
            offerCatalog: [
              "سیستم مدیریت واردات مواد نفتی",
              "مدیریت دیپو، تانک و ذخیره سازی",
              "مدیریت توزیع و ناوگان تانکر",
              "قیمت گذاری و فروش نقدی و اعتباری",
              "حسابداری دو ارزی شرکت نفتی",
              "گزارش کسری، افت و موجودی سوخت",
            ],
          }),
          faqSchema(faq),
        )}
      />

      <ServicePageShell
        breadcrumbs={breadcrumbs}
        eyebrow="صنعت نفت و گاز"
        title="نرم افزار تخصصی نفت و گاز برای شرکت های افغانستان"
        intro={[
          "زنجیره کار یک شرکت نفتی در افغانستان از خرید محموله در مبدا شروع می شود و تا لیتر تحویل شده در ایستگاه ادامه دارد. در این مسیر مقدار، ارز، کرایه، گمرک، کسری و اعتبار مشتری همه هم زمان تغییر می کنند و کمتر سیستم عمومی ای برای این ترکیب ساخته شده است.",
          `${companyInfo.brandName} سیستم را روی همین زنجیره می سازد: هر محموله از خرید تا فروش قابل ردیابی می ماند و بهای تمام شده هر لیتر، نه تخمینی، بلکه از روی اسناد همان محموله ساخته می شود.`,
        ]}
        highlights={[
          "ردیابی محموله از خرید تا تحویل نهایی",
          "ثبت مقدار در هر نقطه انتقال و محاسبه کسری",
          "ثبت دو ارزی افغانی و دالر با نرخ روز",
          "بهای تمام شده هر محموله شامل کرایه و گمرک",
        ]}
        blocks={[
          {
            heading: "بخش های کاری که سیستم پوشش می دهد",
            groups: [
              {
                heading: "واردات و خرید محموله",
                text: "ثبت قرارداد خرید، اسناد حمل، هزینه گمرک و ترانزیت و کرایه؛ همه به همان محموله وصل می شوند تا بهای تمام شده واقعی به دست بیاید.",
              },
              {
                heading: "دیپو، تانک و ذخیره سازی",
                text: "موجودی هر تانک به تفکیک نوع محصول، ثبت ورود و خروج، انبارگردانی و ثبت اختلاف بین مقدار دفتری و مقدار اندازه گیری شده.",
              },
              {
                heading: "توزیع و ناوگان",
                text: "تخصیص تانکر و راننده، بارنامه، مقدار بارگیری و مقدار تخلیه، و پیگیری مرسوله در مسیر.",
              },
              {
                heading: "فروش و قیمت گذاری",
                text: "قیمت گذاری بر اساس نوع محصول و مشتری، فروش نقدی و اعتباری، سقف اعتبار و پیگیری بدهی مشتریان عمده.",
              },
              {
                heading: "حسابداری تخصصی",
                text: "اسناد خودکار عملیات سوخت، حساب های دو ارزی، سود و زیان تبدیل ارز و صورت سود و زیان به تفکیک محموله یا مسیر.",
              },
              {
                heading: "گزارش مدیریتی",
                text: "موجودی لحظه ای هر تانک، کسری هر مسیر، حاشیه سود هر محصول و وضعیت اعتبار مشتریان در یک داشبورد.",
              },
            ],
            link: {
              href: "/portfolio/oil-and-gas-management-system",
              label: "مشاهده نمونه واقعی سیستم نفت و گاز",
            },
          },
          {
            heading: "چرا محاسبه مقدار در این صنعت خاص است",
            paragraphs: [
              "در بیشتر کسب و کارها موجودی یک عدد است: یا هست یا نیست. در سوخت این طور نیست. مقدار بارگیری شده با مقدار تخلیه شده به دلایل کاملاً طبیعی یکی نیست: دما، تبخیر، ته مانده تانکر و دقت اندازه گیری.",
              "سیستمی که این تفاوت را خطا فرض کند، کاربر را مجبور می کند عددها را دستی «درست» کند و از همان لحظه گزارش ها بی اعتبار می شوند. راه درست، ثبت مقدار در هر نقطه انتقال و نگهداری اختلاف به عنوان یک داده مستقل است؛ آن وقت می شود فهمید کدام مسیر یا کدام راننده به طور مداوم کسری بیشتری دارد.",
            ],
          },
          {
            heading: "شرایط واقعی کار در افغانستان",
            bullets: [
              "کار هم زمان با افغانی و دالر و نرخ تبدیل متغیر",
              "اینترنت ناپایدار در دیپو و ایستگاه های دور",
              "فروش اعتباری گسترده و نیاز به کنترل سقف بدهی",
              "چند نقطه ذخیره سازی با فاصله جغرافیایی زیاد",
              "اسناد گمرکی و ترانزیت به عنوان بخشی از بهای تمام شده",
              "نیاز به گزارش فوری مدیریتی بدون منتظر ماندن تا پایان ماه",
            ],
          },
          {
            heading: "شروع کار",
            paragraphs: [
              "کار با بررسی زنجیره واقعی شما شروع می شود: از کجا خرید می کنید، در چند نقطه ذخیره می کنید، چطور توزیع می کنید و امروز کدام بخش بیشترین اختلاف و بیشترین کار دستی را دارد.",
              "بر اساس همین بررسی، دامنه مرحله اول مشخص می شود. معمولاً منطقی ترین نقطه شروع، همان جایی است که کسری و اختلاف موجودی بیشترین هزینه را ایجاد می کند.",
            ],
          },
        ]}
        serviceKey={service.key}
        caseStudySlugs={service.caseStudies}
        faq={faq}
      />
    </>
  );
}
