import type { ServiceKey } from "@/lib/services";

/**
 * Case studies for systems Novatech has actually built and delivered. The
 * screenshots, capability lists and summaries here come from the project's own
 * portfolio data — nothing is invented.
 *
 * Deliberately absent from every entry: client names, contract values, user
 * counts, percentage improvements and delivery dates. None of that is recorded
 * anywhere in the project, and a case study is worth nothing if part of it is
 * guessed. `outcome` describes what the delivered system does for the operator,
 * not a measured result.
 */

export type CaseStudy = {
  slug: string;
  /** Card title, breadcrumb label and default H1. Kept neutral — no client name. */
  title: string;
  /**
   * Overrides the H1 where the card needs a short neutral project name but the
   * page itself should lead with what was actually done. Falls back to `title`.
   */
  pageHeading?: string;
  /** Overrides the generated `<title>`. Falls back to `title | نمونه کار برند`. */
  seoTitle?: string;
  /** Overrides the meta description. Falls back to `summary`. */
  seoDescription?: string;
  /** Sector the system was built for. */
  industry: string;
  /** Where the operator works. */
  location: string;
  /** Card and meta description. */
  summary: string;
  /** The operational problem this class of business has before a system exists. */
  problem: string[];
  /** What Novatech built. */
  solution: string[];
  /** Capabilities actually implemented in the delivered system. */
  capabilities: string[];
  /** What changes in day-to-day operation once the system is in use. */
  outcome: string[];
  /**
   * The operational chain the system follows, in order. Rendered as a numbered
   * flow. Optional: only projects whose value comes from an end-to-end chain
   * need it.
   */
  workflow?: { step: string; text: string }[];
  /**
   * How the architecture was shaped around the operator's real process. Used
   * where the engineering decisions are themselves the story.
   */
  approach?: {
    heading: string;
    paragraphs: string[];
    bullets?: string[];
    /** One contextual link out of the section. */
    link?: { href: string; label: string };
  };
  /**
   * Omitted when the project has no screenshot that may be published. The page
   * then renders labelled placeholders instead of borrowing another system's
   * screenshot, which would misrepresent what was delivered.
   */
  desktopImage?: string;
  desktopImageAlt?: string;
  mobileImage?: string;
  mobileImageAlt?: string;
  /**
   * Shape of `desktopImage`. Screenshots are wide and fill the hero frame;
   * the product posters are portrait, so the page narrows the frame for them
   * instead of cropping the poster down to a 16:9 strip of its header.
   */
  imageOrientation?: "landscape" | "portrait";
  /**
   * Captions for the screenshots this project is still waiting on. Each one
   * renders a placeholder frame naming the screen that belongs there.
   */
  pendingScreenshots?: string[];
  services: ServiceKey[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "logistics-management-system",
    title: "سیستم مدیریت لجستیک و باربری",
    industry: "لجستیک، باربری و حمل و نقل",
    location: "افغانستان",
    summary:
      "صدور بارنامه، مدیریت ناوگان و رانندگان و پیگیری وضعیت مرسوله از مبدا تا مقصد در یک سامانه.",
    problem: [
      "در یک شرکت باربری، بارنامه دستی نوشته می شود، وضعیت مرسوله با تماس تلفنی پیگیری می شود و هزینه هر سفر بعد از پایان کار و از روی حافظه حساب می شود.",
      "پاسخ دادن به مشتری که می پرسد بار کجاست، به تماس با راننده وابسته می ماند.",
    ],
    solution: [
      "مرسوله، بارنامه، وسیله و راننده به عنوان موجودیت های مستقل در دیتابیس تعریف شدند تا هر سفر قابل ردیابی و هر هزینه قابل انتساب باشد.",
      "روی این ساختار، صدور خودکار بارنامه و صفحه پیگیری وضعیت مرسوله ساخته شد.",
    ],
    capabilities: [
      "صدور سریع و خودکار بارنامه",
      "مدیریت ناوگان و رانندگان",
      "پیگیری وضعیت مرسولات از مبدا تا مقصد",
      "گزارش گیری هزینه و درآمد هر سفر",
    ],
    outcome: [
      "وضعیت هر مرسوله و هزینه هر سفر بدون تماس تلفنی و بدون محاسبه دستی از سیستم قابل استخراج است.",
    ],
    desktopImage: "/images/portfolio/novatech-logistics-management-system.webp",
    desktopImageAlt:
      "معرفی نرم افزار کارگو و مدیریت لجستیک نواتیک برای شرکت های باربری",
    imageOrientation: "portrait",
    services: ["software-solutions", "business-systems", "oil-and-gas-software"],
  },
  {
    slug: "restaurant-pos",
    title: "نرم افزار فروش و مدیریت رستوران (POS)",
    industry: "رستوران و خدمات غذایی",
    location: "افغانستان",
    summary:
      "ثبت سفارش با رابط لمسی، ارتباط سالن با آشپزخانه، کنترل موجودی مواد اولیه و گزارش فروش شیفتی.",
    problem: [
      "در رستوران، سفارش روی کاغذ به آشپزخانه می رود، مصرف مواد اولیه ثبت نمی شود و فروش شیفت شب و روز با هم مخلوط می شود.",
      "در پایان ماه معلوم نیست تفاوت بین فروش و مصرف مواد از کجا آمده است.",
    ],
    solution: [
      "رابط لمسی ثبت سفارش برای سالن ساخته شد که سفارش را مستقیم به آشپزخانه منتقل می کند و کاغذ را از مسیر حذف می کند.",
      "هر آیتم منو به مواد اولیه اش وصل شد تا فروش، موجودی انبار را به صورت خودکار کم کند و اختلاف قابل ردیابی باشد.",
    ],
    capabilities: [
      "ثبت سفارش سریع با رابط لمسی",
      "ارتباط مستقیم سالن با آشپزخانه",
      "مدیریت موجودی مواد اولیه",
      "گزارش فروش روزانه و شیفتی",
    ],
    outcome: [
      "فروش هر شیفت و مصرف مواد اولیه در همان سیستم ثبت می شود، بنابراین اختلاف انبار قابل پیگیری است.",
    ],
    desktopImage: "/images/portfolio/novatech-restaurant-pos-system.webp",
    desktopImageAlt:
      "معرفی نرم افزار رستورانت نواتیک برای مدیریت سفارش، فروش و حسابات",
    imageOrientation: "portrait",
    services: ["software-solutions", "accounting-software", "business-systems"],
  },
  {
    slug: "travel-agency-system",
    title: "سیستم مدیریت آژانس مسافرتی",
    industry: "آژانس مسافرتی و خدمات سفر",
    location: "افغانستان",
    summary:
      "مدیریت تور و بلیط، بایگانی اطلاعات مسافران و حسابداری اختصاصی خدمات مسافرتی.",
    problem: [
      "اطلاعات مسافر، بلیط، تور و پرداخت در آژانس معمولاً در چند فایل و چند دفتر جدا نگه داشته می شود.",
      "پیگیری اینکه کدام مسافر چقدر پرداخت کرده و کدام قسط باقی مانده، به بازبینی دستی نیاز دارد.",
    ],
    solution: [
      "مسافر، سفر، بلیط و سند مالی در یک دیتابیس به هم وصل شدند تا سابقه هر مسافر و وضعیت مالی او از یک نقطه قابل خواندن باشد.",
      "حسابداری متناسب با مدل درآمد آژانس — کمیسیون، پیش پرداخت و اقساط — روی همین ساختار پیاده شد.",
    ],
    capabilities: [
      "ثبت و مدیریت اطلاعات تور و پرواز",
      "بایگانی اطلاعات مسافران",
      "حسابداری اختصاصی خدمات مسافرتی",
      "صدور فاکتور و پیگیری اقساط",
    ],
    outcome: [
      "سابقه سفر و وضعیت مالی هر مسافر در یک صفحه در دسترس است و پیگیری اقساط دیگر به بازبینی دفترها وابسته نیست.",
    ],
    desktopImage: "/images/portfolio/novatech-travel-agency-system.webp",
    desktopImageAlt:
      "معرفی نرم افزار شرکت های سیاحتی و تکت فروشی نواتیک",
    imageOrientation: "portrait",
    services: ["software-solutions", "business-systems", "accounting-software"],
  },
  {
    slug: "attendance-system",
    title: "نرم افزار حضور و غیاب و مدیریت کارکرد",
    industry: "منابع بشری و اداری",
    location: "افغانستان",
    summary:
      "ثبت خودکار تردد و شیفت، مدیریت مرخصی و اضافه کاری و اتصال به محاسبه حقوق پایان ماه.",
    problem: [
      "ثبت دستی ورود و خروج پرسنل باعث می شود محاسبه کارکرد در پایان ماه به چند روز کار اداری تبدیل شود.",
      "مرخصی و اضافه کاری معمولاً جدا از کارکرد نگه داشته می شود و در محاسبه حقوق دوباره دستی وارد می شود.",
    ],
    solution: [
      "تردد، شیفت، مرخصی و اضافه کاری در یک ساختار واحد ثبت می شوند تا کارکرد ماه به صورت محاسبه شده و نه دستی به دست بیاید.",
      "خروجی کارکرد مستقیماً به محاسبه حقوق وصل شد تا داده دو بار وارد نشود.",
    ],
    capabilities: [
      "ثبت خودکار ترددها و شیفت ها",
      "مدیریت مرخصی ها و اضافه کاری",
      "محاسبه کارکرد و حقوق پایان ماه",
      "گزارش گیری برای مدیر منابع بشری",
    ],
    outcome: [
      "کارکرد ماهانه از داده ثبت شده تولید می شود و ورود دوباره اطلاعات برای حقوق و دستمزد لازم نیست.",
    ],
    desktopImage: "/images/portfolio/novatech-attendance-system.webp",
    desktopImageAlt:
      "معرفی نرم افزار حضور و غیاب نواتیک برای مکاتب و سازمان ها",
    imageOrientation: "portrait",
    services: ["business-systems", "erp", "software-solutions"],
  },
  {
    /*
     * The hero here is the product poster for the system, not an in-app
     * screenshot: no screenshot of the delivered system is cleared for
     * publication. The operator is not named — no client disclosure is on
     * record.
     */
    slug: "oil-and-gas-management-system",
    title: "سیستم مدیریت عملیات نفت و گاز",
    pageHeading: "طراحی و توسعه نرم افزار تخصصی مدیریت نفت و گاز",
    seoTitle: "طراحی نرم افزار نفت و گاز در افغانستان | نمونه پروژه نواتیک",
    seoDescription:
      "نمونه ای از طراحی و توسعه سیستم تخصصی نفت و گاز توسط نواتیک؛ مدیریت قرارداد، بارگیری، حمل، مخزن، فروش، مصارف و گزارش های مالی در یک سیستم یکپارچه.",
    industry: "واردات و توزیع مواد نفتی",
    location: "افغانستان",
    summary:
      "سیستم اختصاصی مدیریت عملیات شرکت های واردکننده و توزیع کننده مواد نفتی؛ از قرارداد و بارگیری تا مخزن، فروش، مصارف و گزارش سود و زیان.",
    problem: [
      "در بسیاری از شرکت های واردات و توزیع مواد نفتی، اطلاعات یک محموله بین چند جای مختلف پخش است: قرارداد و اسناد حمل در فایل کاغذی، مقدار بارگیری و تخلیه در یک اکسل، حساب مشتری و تحویل دهنده در دفتر حسابداری و مصارف مسیر در یادداشت های جداگانه.",
      "تا وقتی این اطلاعات کنار هم گذاشته نشود، پاسخ دادن به سوال های اصلی کار سخت است: این قرارداد تا امروز چقدر اجرا شده، بهای تمام شده این محموله با کرایه و گمرک چند شد، موجودی واقعی هر تانک چقدر است، حساب این شریک و این مشتری کجاست و در نهایت روی این محموله سود کردیم یا زیان.",
      "این وضعیت در همه شرکت ها یکسان نیست؛ اما هر جا اطلاعات عملیاتی و مالی در دو مسیر جدا ثبت شود، جمع بندی آن معمولاً به پایان ماه موکول می شود و تصمیم مدیر بر پایه عددهای قدیمی گرفته می شود.",
    ],
    solution: [
      "نواتیک یک سیستم اختصاصی طراحی کرد که همین زنجیره عملیاتی را در یک بستر یکپارچه به هم وصل می کند. نقطه شروع، طراحی ساختار داده ای بود که یک محموله را به عنوان یک واحد قابل ردیابی تعریف می کند؛ نه چند رکورد جدا در چند سیستم.",
      "با این ساختار، هر رویداد — امضای قرارداد، بارگیری، صدور اسناد حمل، تخصیص تانکر، تخلیه در مخزن، فروش و ثبت مصارف — به همان محموله وصل می شود. در نتیجه بهای تمام شده و سود و زیان از روی اسناد واقعی همان محموله ساخته می شود و نیازی به تخمین دستی ندارد.",
      "حساب های مشتری، تحویل دهنده و شرکا روی همان دیتابیس تعریف شدند تا دریافت و پرداخت، اعتبار و مانده حساب با عملیات یک جا دیده شود.",
    ],
    capabilities: [
      "ثبت و پیگیری قرارداد خرید و میزان اجرای آن",
      "مدیریت خرید و بارگیری محموله",
      "ثبت اسناد حمل و بارنامه (CMR)",
      "مدیریت تانکر، راننده و مسیر حمل",
      "ثبت تخلیه و ورود به مخزن",
      "موجودی مخزن و ذخیره سازی به تفکیک محصول",
      "ثبت مصارف مسیر، گمرک و کرایه روی همان محموله",
      "فروش نقدی و اعتباری و قیمت گذاری",
      "حساب مشتریان و تحویل دهندگان",
      "حساب شرکا و سهم هر شریک",
      "ثبت دریافت و پرداخت",
      "ثبت و پیگیری کسری و افت",
      "گزارش سود و زیان به تفکیک محموله",
      "گزارش های مدیریتی از وضعیت عملیات",
    ],
    workflow: [
      {
        step: "قرارداد",
        text: "ثبت قرارداد خرید با تحویل دهنده، مقدار، نرخ و شرایط؛ از این نقطه به بعد هر رویداد به همین قرارداد وصل می ماند.",
      },
      {
        step: "بارگیری",
        text: "ثبت مقدار بارگیری شده در مبدا و اسناد مربوط به آن به عنوان اولین نقطه اندازه گیری محموله.",
      },
      {
        step: "حمل",
        text: "تخصیص تانکر و راننده، صدور و ثبت اسناد حمل و بارنامه و پیگیری محموله در مسیر.",
      },
      {
        step: "تخلیه",
        text: "ثبت مقدار تخلیه شده در مقصد و نگهداری اختلاف آن با مقدار بارگیری به عنوان یک داده مستقل.",
      },
      {
        step: "مخزن",
        text: "ورود محموله به مخزن و به روز شدن موجودی ذخیره سازی به تفکیک نوع محصول.",
      },
      {
        step: "فروش",
        text: "فروش نقدی یا اعتباری از موجودی مخزن، با ثبت اثر آن روی حساب مشتری.",
      },
      {
        step: "مصارف",
        text: "ثبت کرایه، گمرک و سایر مصارف مسیر روی همان محموله تا بهای تمام شده واقعی ساخته شود.",
      },
      {
        step: "گزارش سود",
        text: "محاسبه سود و زیان محموله از اختلاف فروش و بهای تمام شده، و گزارش مدیریتی از وضعیت عملیات.",
      },
    ],
    approach: {
      heading: "طراحی براساس جریان واقعی عملیات",
      paragraphs: [
        "این سیستم از روی یک قالب آماده ساخته نشده است. کار با بررسی جریان واقعی عملیات شروع می شود و ساختار سیستم بر اساس همان چیده می شود؛ چون در این صنعت روش کار دو شرکت به ندرت کاملاً شبیه هم است.",
        "به همین دلیل معماری سیستم قابل تطبیق با شرایط هر مجموعه طراحی می شود:",
      ],
      bullets: [
        "ساختار قرارداد و شیوه اجرای مرحله ای آن",
        "کار هم زمان با چند ارز و نرخ تبدیل متغیر",
        "ساختار شراکت و نحوه محاسبه سهم هر شریک",
        "مدل مخزن و نقاط ذخیره سازی و فاصله جغرافیایی آن ها",
        "روند حمل و اسنادی که در مسیر رد و بدل می شود",
        "نیازهای حسابداری و شکل گزارش هایی که مدیر لازم دارد",
      ],
      link: {
        href: "/database-solutions",
        label: "طراحی و توسعه دیتابس",
      },
    },
    outcome: [
      "اطلاعات عملیاتی و مالی یک محموله در یک جا جمع است، بنابراین بررسی وضعیت یک قرارداد به جمع کردن چند فایل نیاز ندارد.",
      "مصارف مسیر روی همان محموله ثبت می شود و بهای تمام شده از روی اسناد واقعی ساخته می شود، نه از روی تخمین.",
      "موجودی مخزن و کسری هر مرحله قابل پیگیری است و مشخص می ماند اختلاف در کدام نقطه ایجاد شده.",
      "حساب مشتری، تحویل دهنده و شریک از یک منبع خوانده می شود و مانده هر کدام در همان لحظه در دسترس است.",
      "گزارش سود و زیان به تفکیک محموله گرفته می شود، بنابراین مدیر لازم نیست تا بسته شدن دفاتر پایان دوره منتظر بماند.",
    ],
    desktopImage: "/images/portfolio/novatech-oil-and-gas-management-system.webp",
    desktopImageAlt:
      "معرفی نرم افزار تانگ تیل نواتیک برای مدیریت پمپ استیشن و عملیات نفت و گاز",
    imageOrientation: "portrait",
    services: [
      "oil-and-gas-software",
      "software-solutions",
      "database-solutions",
    ],
  },
  {
    /*
     * Hero is the product poster for the system; no in-app screenshot of the
     * delivered installation is cleared for publication. The operator is not
     * named — no client disclosure is on record.
     */
    slug: "warehouse-management-system",
    title: "سیستم مدیریت گدام و انبار",
    pageHeading: "طراحی و توسعه نرم افزار مدیریت گدام",
    seoTitle: "نرم افزار مدیریت گدام و انبار در افغانستان | نمونه پروژه نواتیک",
    seoDescription:
      "نمونه ای از طراحی نرم افزار مدیریت گدام توسط نواتیک؛ ثبت ورود و خروج کالا، موجودی به تفکیک گدام، حواله انبار و گزارش لحظه ای موجودی.",
    industry: "انبارداری و توزیع",
    location: "افغانستان",
    summary:
      "ثبت ورود و خروج کالا، موجودی به تفکیک گدام، حواله انبار و گزارش لحظه ای موجودی در یک سامانه واحد.",
    problem: [
      "در بیشتر گدام ها، ورود و خروج کالا در دفتر یا یک فایل اکسل ثبت می شود و موجودی واقعی فقط بعد از شمارش فیزیکی معلوم می شود.",
      "وقتی یک کالا در چند گدام نگهداری می شود، پاسخ به این سوال که «از این جنس چقدر و کجا داریم» به تماس با مسئول هر گدام نیاز دارد.",
    ],
    solution: [
      "کالا، گدام، حواله ورود و حواله خروج به عنوان موجودیت های مستقل در دیتابیس تعریف شدند تا هر حرکت کالا یک سند داشته باشد و موجودی از روی همان اسناد محاسبه شود، نه از روی شمارش دستی.",
      "روی همین ساختار، ثبت سریع حواله و گزارش موجودی به تفکیک گدام و کالا ساخته شد تا وضعیت انبار در هر لحظه از خود سیستم خوانده شود.",
    ],
    capabilities: [
      "ثبت حواله ورود و خروج کالا",
      "موجودی به تفکیک گدام و کالا",
      "انتقال کالا بین گدام ها",
      "حداقل موجودی و هشدار کسری",
      "حساب تامین کننده و مشتری",
      "گزارش گردش کالا و موجودی لحظه ای",
    ],
    outcome: [
      "موجودی هر گدام از روی اسناد ثبت شده ساخته می شود و برای دانستن وضعیت انبار نیازی به شمارش فیزیکی نیست.",
      "مسیر حرکت هر کالا بین گدام ها قابل پیگیری است و مشخص می ماند کسری در کدام مرحله ایجاد شده.",
    ],
    desktopImage: "/images/portfolio/novatech-warehouse-management-system.webp",
    desktopImageAlt: "معرفی نرم افزار مدیریت گدام و انبار نواتیک",
    imageOrientation: "portrait",
    services: ["software-solutions", "business-systems", "erp"],
  },
  {
    /*
     * Hero is the product poster for the system; no in-app screenshot of the
     * delivered installation is cleared for publication. The operator is not
     * named — no client disclosure is on record.
     */
    slug: "supermarket-management-system",
    title: "نرم افزار سوپرمارکت و فروشگاه",
    pageHeading: "طراحی و توسعه نرم افزار مدیریت سوپرمارکت",
    seoTitle: "نرم افزار سوپرمارکت و فروشگاه در افغانستان | نمونه پروژه نواتیک",
    seoDescription:
      "نمونه ای از طراحی نرم افزار سوپرمارکت توسط نواتیک؛ فروش با بارکد، کنترل موجودی، حساب مشتریان و تامین کنندگان و گزارش فروش روزانه.",
    industry: "خرده فروشی و سوپرمارکت",
    location: "افغانستان",
    summary:
      "فروش با بارکد، کنترل موجودی و تاریخ انقضا، حساب مشتریان و تامین کنندگان و گزارش فروش روزانه فروشگاه.",
    problem: [
      "در یک سوپرمارکت، فروش روی صندوق ثبت می شود اما موجودی جدا نگه داشته می شود؛ در نتیجه معلوم نیست کدام جنس رو به اتمام است و کدام جنس مدت هاست حرکت نکرده.",
      "قیمت گذاری و سود هر قلم هم وقتی روشن نیست که قیمت خرید در جای دیگری از فروش نگهداری شود.",
    ],
    solution: [
      "کالا، بارکد، خرید، فروش و حساب طرف حساب روی یک دیتابیس واحد تعریف شدند تا هر فروش موجودی را به صورت خودکار کم کند و سود هر قلم از قیمت خرید واقعی همان کالا ساخته شود.",
      "صندوق فروش با ورودی بارکد طراحی شد تا سرعت ثبت در ساعت شلوغی کمتر از کار دستی نباشد.",
    ],
    capabilities: [
      "فروش سریع با بارکد و صندوق فروش",
      "کنترل موجودی و هشدار کسری",
      "پیگیری تاریخ انقضا",
      "قیمت گذاری و محاسبه سود هر قلم",
      "حساب مشتریان و تامین کنندگان",
      "گزارش فروش روزانه و شیفتی",
    ],
    outcome: [
      "موجودی فروشگاه با هر فروش به روز می شود، بنابراین سفارش خرید بر اساس عدد واقعی گرفته می شود نه حدس.",
      "سود هر قلم و فروش هر شیفت از همان سیستم قابل گزارش گیری است.",
    ],
    desktopImage: "/images/portfolio/novatech-supermarket-management-system.webp",
    desktopImageAlt:
      "معرفی نرم افزار مدیریت سوپرمارکت نواتیک با فروش، موجودی و حسابات",
    imageOrientation: "portrait",
    services: ["software-solutions", "accounting-software", "business-systems"],
  },
  {
    /*
     * Hero is the product poster for the system; no in-app screenshot of the
     * delivered installation is cleared for publication. The operator is not
     * named — no client disclosure is on record.
     */
    slug: "tailoring-management-system",
    title: "نرم افزار کارگاه خیاطی",
    pageHeading: "طراحی و توسعه نرم افزار مدیریت کارگاه های خیاطی",
    seoTitle: "نرم افزار کارگاه خیاطی در افغانستان | نمونه پروژه نواتیک",
    seoDescription:
      "نمونه ای از طراحی نرم افزار کارگاه خیاطی توسط نواتیک؛ ثبت سفارش و اندازه مشتری، پیگیری مراحل دوخت، کارکرد خیاط و حساب مشتری.",
    industry: "تولید پوشاک و کارگاه خیاطی",
    location: "افغانستان",
    summary:
      "ثبت سفارش و اندازه مشتری، پیگیری مراحل دوخت، محاسبه کارکرد خیاط و حساب مشتری در یک سیستم.",
    problem: [
      "در کارگاه خیاطی، اندازه مشتری روی کاغذ نوشته می شود، تاریخ تحویل در ذهن می ماند و کارکرد هر خیاط آخر ماه از روی حافظه حساب می شود.",
      "وقتی چند سفارش هم زمان در جریان است، مشخص کردن اینکه هر کدام در کدام مرحله است و کدام سفارش به تحویل نزدیک شده کار ساده ای نیست.",
    ],
    solution: [
      "سفارش، مشتری، اندازه، مرحله دوخت و خیاط به هم وصل شدند تا هر سفارش یک پرونده داشته باشد و وضعیت آن از یک صفحه خوانده شود.",
      "کارکرد هر خیاط به سفارش هایی که انجام داده وصل شد تا محاسبه دستمزد از روی کار ثبت شده انجام شود، نه از روی یادداشت.",
    ],
    capabilities: [
      "ثبت سفارش و اندازه های مشتری",
      "پیگیری مراحل دوخت و وضعیت هر سفارش",
      "تاریخ تحویل و یادآوری سفارش های نزدیک به موعد",
      "محاسبه کارکرد و دستمزد خیاط",
      "حساب مشتری، بیعانه و باقی مانده",
      "گزارش سفارش ها و درآمد کارگاه",
    ],
    outcome: [
      "سابقه و اندازه هر مشتری در سیستم می ماند و برای سفارش بعدی دوباره گرفته نمی شود.",
      "وضعیت هر سفارش و کارکرد هر خیاط بدون یادداشت جداگانه از سیستم قابل استخراج است.",
    ],
    desktopImage: "/images/portfolio/novatech-tailoring-management-system.webp",
    desktopImageAlt: "معرفی نرم افزار مدیریت کارگاه های خیاطی نواتیک",
    imageOrientation: "portrait",
    services: ["software-solutions", "business-systems", "accounting-software"],
  },
];

export const caseStudyBySlug = Object.fromEntries(
  caseStudies.map((study) => [study.slug, study]),
) as Record<string, CaseStudy>;

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudyBySlug[slug];
}

export function caseStudiesForService(key: ServiceKey): CaseStudy[] {
  return caseStudies.filter((study) => study.services.includes(key));
}
