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
 * TODO (business input required): the project ships no graphic-design samples,
 * so this page shows no portfolio of its own and claims no delivered brand work.
 * To make it competitive for «طراحی گرافیک هرات» it needs real artefacts:
 *   - 4-6 logo / brand-identity samples that Novatech is allowed to publish
 *   - one before/after identity example with the reasoning behind the change
 *   - the actual deliverable list and file formats handed to a client
 * Add them as a gallery section here; do not add stock imagery in their place.
 */

const service = serviceByKey["graphic-design"];

const breadcrumbs = [
  { name: "صفحه اصلی", path: "/" },
  { name: "طراحی گرافیک", path: service.path },
];

const faq = [
  {
    question: "فقط لوگو می خواهیم؛ باید کل هویت بصری را سفارش بدهیم؟",
    answer:
      "نه. لوگو به تنهایی قابل سفارش است. اما اگر قرار است لوگو روی تابلو، فاکتور، بسته بندی و سایت استفاده شود، تعریف رنگ، فونت و نسخه های مختلف لوگو از همان ابتدا جلوی دوباره کاری بعدی را می گیرد.",
  },
  {
    question: "فایل های نهایی را تحویل می گیریم؟",
    answer:
      "بله. فایل قابل ویرایش برداری همراه با نسخه های آماده استفاده تحویل داده می شود تا برای چاپ یا استفاده در فضای آنلاین به ما وابسته نباشید.",
  },
  {
    question: "طراحی رابط کاربری هم انجام می دهید؟",
    answer:
      "بله، و این بخش با کار نرم افزاری ما گره خورده است. رابط کاربری یک سیستم انبار یا حسابداری باید بر اساس کاری که کاربر هر روز تکرار می کند طراحی شود، نه فقط بر اساس زیبایی صفحه.",
  },
  {
    question: "چند نمونه طرح ارائه می شود؟",
    answer:
      "تعداد نسخه های اولیه و دفعات اصلاح، قبل از شروع کار و در قرارداد مشخص می شود تا انتظار دو طرف روشن باشد.",
  },
];

export const metadata = buildMetadata({
  fullTitle: `طراحی گرافیک حرفه ای در هرات | لوگو و هویت بصری | ${companyInfo.brandName}`,
  title: "طراحی گرافیک",
  description:
    "طراحی لوگو، هویت بصری، رابط کاربری و اقلام چاپی در هرات؛ هماهنگ با سایت و سیستم های نرم افزاری همان کسب و کار.",
  path: service.path,
});

/*
 * TODO (business input required): this is the only service page with no case
 * study and no related article, because the project holds no publishable
 * branding work — `lib/portfolio-data.json` contains software systems and
 * websites only. To close the gap, supply logo/identity work that may be shown
 * (with client permission or as a neutral, unnamed project) and add it as a
 * portfolio entry plus a `caseStudies` slug on the graphic-design service in
 * lib/services.ts. Do not illustrate this page with work Novatech did not do.
 */
export default function GraphicDesignPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: service.path,
            name: `طراحی گرافیک حرفه ای در هرات | ${companyInfo.brandName}`,
            description: metadata.description as string,
          }),
          breadcrumbSchema(breadcrumbs),
          serviceSchema({
            path: service.path,
            name: "طراحی گرافیک",
            description: metadata.description as string,
            serviceType: service.serviceType,
            offerCatalog: [
              "طراحی لوگو",
              "هویت بصری برند",
              "طراحی رابط کاربری نرم افزار و سایت",
              "اقلام چاپی و اداری",
              "طرح های شبکه اجتماعی",
            ],
          }),
          faqSchema(faq),
        )}
      />

      <ServicePageShell
        breadcrumbs={breadcrumbs}
        eyebrow="طراحی گرافیک"
        title="طراحی گرافیک حرفه ای در هرات؛ از لوگو تا رابط کاربری"
        intro={[
          "برای بیشتر کسب و کارها، طراحی گرافیک جایی شروع می شود که یک لوگو لازم است و همان جا هم تمام می شود. مشکل بعداً پیدا می شود: تابلو یک رنگ دارد، فاکتور رنگ دیگری و سایت رنگ سوم؛ چون هیچ وقت مشخص نشده که رنگ و فونت برند دقیقاً چیست.",
          `${companyInfo.brandName} طراحی گرافیک را کنار همان سایت و سیستمی انجام می دهد که برای کسب و کار ساخته می شود، بنابراین آنچه روی کاغذ، تابلو، سایت و صفحه نرم افزار دیده می شود یک زبان بصری واحد دارد.`,
        ]}
        highlights={[
          "لوگو همراه با نسخه های افقی، عمودی و تک رنگ",
          "تعریف مشخص رنگ و فونت برای همه کاربردها",
          "طراحی رابط کاربری بر پایه کار روزمره کاربر",
          "تحویل فایل قابل ویرایش، بدون وابستگی به ما",
        ]}
        blocks={[
          {
            heading: "چه چیزهایی طراحی می شود",
            groups: [
              {
                heading: "لوگو و نشان تجاری",
                text: "طراحی لوگو با نسخه های افقی، عمودی، تک رنگ و آیکون، به همراه فاصله ایمن و حداقل اندازه مجاز استفاده.",
              },
              {
                heading: "هویت بصری",
                text: "پالت رنگ، فونت فارسی و لاتین، سبک عکس و الگوهای تکرارشونده؛ مجموعه ای که تصمیم های طراحی بعدی را ساده می کند.",
              },
              {
                heading: "اقلام اداری و چاپی",
                text: "کارت ویزیت، سربرگ، فاکتور، مهر، تابلو و بسته بندی، متناسب با همان هویت.",
              },
              {
                heading: "رابط کاربری نرم افزار",
                text: "طراحی صفحه های سیستم های اداری و مالی: ساختار فرم، ترتیب فیلدها و مسیر کاری که کاربر روزی ده ها بار تکرار می کند.",
              },
              {
                heading: "طراحی رابط سایت",
                text: "طرح صفحه های سایت شرکتی و فروشگاهی، هماهنگ با نسخه موبایل و با در نظر گرفتن راست به چپ بودن متن فارسی.",
              },
              {
                heading: "طرح های شبکه اجتماعی",
                text: "قالب های آماده پست و استوری تا انتشار محتوا هر بار به طراحی جدید نیاز نداشته باشد.",
              },
            ],
          },
          {
            heading: "طراحی راست به چپ، یک تفاوت واقعی",
            paragraphs: [
              "بیشتر قالب ها و منابع طراحی برای متن چپ به راست ساخته شده اند. وقتی همان طرح برای فارسی و دری استفاده می شود، فاصله ها، جهت آیکون ها و ترازبندی اعداد به هم می ریزد و نتیجه، طرحی است که درست به نظر نمی رسد بدون اینکه بشود گفت کجایش ایراد دارد.",
              "ما طرح را از ابتدا راست به چپ می بندیم؛ از جهت خواندن تا محل قرار گرفتن دکمه اصلی و ترتیب ستون های جدول.",
            ],
          },
          {
            heading: "مسیر کار",
            bullets: [
              "شناخت کسب و کار، مخاطب و رقبای محلی",
              "تعیین جهت بصری قبل از شروع طراحی نهایی",
              "ارائه نسخه های اولیه و دریافت بازخورد",
              "نهایی سازی و ساخت نسخه های مختلف کاربردی",
              "تحویل فایل های قابل ویرایش و راهنمای استفاده",
              "پشتیبانی برای کاربردهای جدید بعد از تحویل",
            ],
            /*
             * Points at the portfolio because the delivered websites and system
             * interfaces there are the design work this page describes. There is
             * no logo/branding case study to link yet — see the TODO below.
             */
            link: {
              href: "/portfolio",
              label: "نمونه سایت ها و رابط های طراحی شده",
            },
          },
        ]}
        serviceKey={service.key}
        faq={faq}
      />
    </>
  );
}
