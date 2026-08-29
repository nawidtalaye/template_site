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
 * TODO (business input required before publishing product-level claims):
 * Novatech's packaged ERP product has not been recorded anywhere in this
 * project, so this page describes the ERP capability and implementation service
 * only. Once the following are confirmed, a `SoftwareApplication` node can be
 * added here and the copy can name the product:
 *   - product name and current version
 *   - the exact module list shipped in the package
 *   - licensing / pricing model (per user, per branch, one-off)
 *   - operating requirements (on-premise server, cloud, or both)
 * Until then nothing on this page names or rates a product, because none of
 * that can be verified from the repository.
 */

const service = serviceByKey.erp;

const breadcrumbs = [
  { name: "صفحه اصلی", path: "/" },
  { name: "نرم افزار ERP", path: service.path },
];

const faq = [
  {
    question: "ERP دقیقاً چه چیزی را حل می کند؟",
    answer:
      "ERP یعنی بخش های مختلف شرکت — مالی، انبار، خرید، فروش و منابع بشری — روی یک دیتابس مشترک کار کنند. مشکلی که حل می کند این است که یک رویداد، مثل ورود کالا به انبار، دیگر لازم نیست جداگانه در انبار، حسابداری و گزارش مدیریتی ثبت شود؛ یک بار ثبت می شود و همه بخش ها همان را می بینند.",
  },
  {
    question: "شرکت ما چند نفر است؛ ERP برای ما زود نیست؟",
    answer:
      "معیار تعداد پرسنل نیست، تعداد نقطه ثبت اطلاعات است. یک شرکت ده نفره با سه انبار و دو شعبه، بیشتر از یک شرکت پنجاه نفره تک شعبه به یکپارچگی نیاز دارد. اگر امروز کسی وقتش را صرف تطبیق دستی گزارش ها می کند، شرایط ERP وجود دارد.",
  },
  {
    question: "کار با ارزهای مختلف پشتیبانی می شود؟",
    answer:
      "بله. در فضای کاری افغانستان ثبت هم زمان افغانی و دالر و نرخ تبدیل روز، یک نیاز معمول است و در ساختار حساب ها و اسناد در نظر گرفته می شود؛ نه به عنوان یک افزونه بعدی.",
  },
  {
    question: "استقرار ERP چقدر طول می کشد؟",
    answer:
      "به دامنه کار بستگی دارد و بعد از نیازسنجی زمان بندی دقیق اعلام می شود. آنچه مشخص است این است که استقرار مرحله ای انجام می شود: هیچ شرکتی نباید در یک روز همه بخش هایش را روی سیستم جدید ببرد.",
  },
  {
    question: "اطلاعات سیستم فعلی ما چه می شود؟",
    answer:
      "انتقال داده بخشی از پروژه است. حساب ها، مشتریان، تامین کنندگان، موجودی کالا و سوابق مالی از سیستم قبلی یا فایل های اکسل پاکسازی و به ساختار جدید منتقل می شوند و نتیجه قبل از بهره برداری با داده قدیمی مقایسه می شود.",
  },
];

export const metadata = buildMetadata({
  fullTitle: `نرم افزار ERP و سیستم یکپارچه سازمانی در افغانستان | ${companyInfo.brandName}`,
  title: "نرم افزار ERP",
  description:
    "پیاده سازی ERP و سیستم یکپارچه سازمانی در افغانستان: مالی، انبار، خرید، فروش و منابع بشری روی یک دیتابس مشترک، همراه با انتقال داده و آموزش کاربران.",
  path: service.path,
  image: "/images/portfolio/novatech-custom-software-service.webp",
  imageAlt: "نمایی از سیستم یکپارچه سازمانی ساخته شده توسط نواتیک",
});

export default function ErpPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: service.path,
            name: `نرم افزار ERP و سیستم یکپارچه سازمانی در افغانستان | ${companyInfo.brandName}`,
            description: metadata.description as string,
          }),
          breadcrumbSchema(breadcrumbs),
          serviceSchema({
            path: service.path,
            name: "پیاده سازی نرم افزار ERP",
            description: metadata.description as string,
            serviceType: service.serviceType,
            offerCatalog: [
              "نیازسنجی و طراحی ساختار ERP",
              "ماژول مالی و حسابداری",
              "ماژول انبار و کنترل موجودی",
              "ماژول خرید و تامین",
              "ماژول فروش و توزیع",
              "ماژول منابع بشری و حقوق",
              "انتقال داده و آموزش کاربران",
            ],
          }),
          faqSchema(faq),
        )}
      />

      <ServicePageShell
        breadcrumbs={breadcrumbs}
        eyebrow="ERP و سیستم یکپارچه سازمانی"
        title="نرم افزار ERP برای شرکت ها و سازمان های افغانستان"
        intro={[
          "ERP وقتی ارزش دارد که شرکت به مرحله ای رسیده باشد که هیچ کس تصویر کامل وضعیت را ندارد: انبار می گوید کالا هست، فروش می گوید نیست و مالی عدد سومی می دهد. ریشه این اختلاف در نبود گزارش نیست؛ در این است که هر بخش داده خودش را جدا نگه می دارد.",
          `${companyInfo.brandName} ماژول های مالی، انبار، خرید، فروش و منابع بشری را روی یک دیتابس مشترک پیاده می کند و مسیر مهاجرت از وضعیت فعلی را مرحله به مرحله اجرا می کند.`,
        ]}
        heroImage="/images/portfolio/novatech-custom-software-service.webp"
        heroImageAlt="نمایی از سیستم یکپارچه سازمانی ساخته شده توسط نواتیک"
        highlights={[
          "ماژول ها روی یک دیتابس مشترک، نه چند سیستم متصل شده",
          "پشتیبانی از چند شعبه، چند انبار و چند ارز",
          "استقرار مرحله ای بدون توقف کار روزانه",
          "انتقال داده از سیستم فعلی به عنوان بخشی از پروژه",
        ]}
        blocks={[
          {
            heading: "ماژول های اصلی",
            groups: [
              {
                heading: "مالی و حسابداری",
                text: "ساختار حساب ها، اسناد خودکار عملیات، خزانه، دریافت و پرداخت و گزارش های مالی دوره ای.",
              },
              {
                heading: "انبار و کنترل موجودی",
                text: "چند انبار، حواله ورود و خروج، نقطه سفارش، انبارگردانی و ردیابی اختلاف موجودی.",
              },
              {
                heading: "خرید و تامین",
                text: "درخواست خرید، سفارش به تامین کننده، رسید کالا و تطبیق فاکتور خرید با ورود انبار.",
              },
              {
                heading: "فروش و توزیع",
                text: "سفارش مشتری، قیمت گذاری و تخفیف، صدور فاکتور و اتصال به مسیر توزیع.",
              },
              {
                heading: "منابع بشری",
                text: "پرسنل، حضور و غیاب، مرخصی، اضافه کاری و محاسبه حقوق پایان ماه.",
              },
              {
                heading: "گزارش و داشبورد",
                text: "شاخص های عملیاتی و مالی روی همان داده ای که کاربران در جریان کار ثبت می کنند.",
              },
            ],
          },
          {
            heading: "ERP آماده یا سیستم اختصاصی؟",
            paragraphs: [
              "این سوال معمولاً اول پرسیده می شود و جواب یکسانی ندارد. اگر فرایند شما با یک روش استاندارد صنعتی می خواند، بسته آماده سریع تر و ارزان تر است. اگر مزیت کاری شما دقیقاً در همان جایی است که با استاندارد فرق دارد، تحمیل بسته آماده به معنی از دست دادن همان مزیت است.",
              "در نیازسنجی مشخص می شود کدام بخش ها استاندارد است و کدام بخش باید اختصاصی ساخته شود. ترکیب این دو معمولاً نتیجه بهتری از انتخاب مطلق یکی از آن ها می دهد.",
            ],
          },
          {
            heading: "چه چیزی پروژه ERP را شکست می دهد",
            paragraphs: [
              "تجربه پروژه های سیستمی نشان می دهد شکست معمولاً فنی نیست. سه دلیل رایج تر است و هر سه قابل پیشگیری اند.",
            ],
            bullets: [
              "راه اندازی هم زمان همه ماژول ها به جای استقرار مرحله ای",
              "بی توجهی به انتقال داده تا هفته آخر پروژه",
              "نبود آموزش کاربر برای همان کاری که هر روز انجام می دهد",
              "نبود یک تصمیم گیرنده مشخص از طرف کارفرما",
              "تغییر دامنه کار در میانه اجرا بدون بازنگری زمان بندی",
              "نداشتن برنامه پشتیبان گیری و بازیابی از روز اول",
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
