/**
 * The service graph. One entry per indexable service page, each with exactly one
 * primary topic. Everything that needs to know which services exist — the footer
 * navigation, the related-services strips, the sitemap and the Service JSON-LD —
 * reads this file, so a page can never become an orphan by accident.
 */

export type ServiceKey =
  | "software-solutions"
  | "database-solutions"
  | "business-systems"
  | "erp"
  | "accounting-software"
  | "web-design"
  | "graphic-design"
  | "oil-and-gas-software";

export type ServiceEntry = {
  key: ServiceKey;
  path: string;
  /** Short label for navigation and link strips. */
  navLabel: string;
  /** The single primary topic this page is allowed to target. */
  primaryTopic: string;
  /** One sentence used on link cards pointing at this page. */
  teaser: string;
  serviceType: string;
  /** Sibling services a reader of this page plausibly needs next. */
  related: ServiceKey[];
  /** Case-study slugs that prove this service was actually delivered. */
  caseStudies: string[];
  sitemapPriority: number;
};

export const services: ServiceEntry[] = [
  {
    key: "software-solutions",
    path: "/software-solutions",
    navLabel: "توسعه نرم افزار اختصاصی",
    primaryTopic: "توسعه نرم افزار اختصاصی در هرات و افغانستان",
    teaser:
      "تحلیل فرایند، طراحی دیتابیس و ساخت سیستمی که دقیقاً با روش کار کسب و کار شما بخواند.",
    serviceType: "Custom software development",
    related: ["database-solutions", "business-systems", "accounting-software"],
    caseStudies: [
      "oil-and-gas-management-system",
      "logistics-management-system",
      "restaurant-pos",
      "supermarket-management-system",
    ],
    sitemapPriority: 0.9,
  },
  {
    key: "database-solutions",
    path: "/database-solutions",
    navLabel: "طراحی و توسعه دیتابس",
    primaryTopic: "طراحی و توسعه دیتابس در هرات و افغانستان",
    teaser:
      "ساختار داده ای که گزارش درست می دهد، رشد کسب و کار را تحمل می کند و اطلاعات قدیمی را از دست نمی دهد.",
    serviceType: "Database design and development",
    related: ["software-solutions", "business-systems", "erp"],
    caseStudies: ["warehouse-management-system", "logistics-management-system"],
    sitemapPriority: 0.9,
  },
  {
    key: "business-systems",
    path: "/business-systems",
    navLabel: "سیستم های مدیریت کسب و کار",
    primaryTopic: "سیستم های مدیریتی و نرم افزارهای تجارتی افغانستان",
    teaser:
      "یک سیستم واحد برای فروش، انبار، مالی، پرسنل و گزارش مدیریتی، به جای چند فایل جدا.",
    serviceType: "Business management software",
    related: ["erp", "accounting-software", "software-solutions"],
    caseStudies: ["warehouse-management-system", "attendance-system"],
    sitemapPriority: 0.9,
  },
  {
    key: "erp",
    path: "/erp",
    navLabel: "نرم افزار ERP",
    primaryTopic: "نرم افزار ERP و سیستم یکپارچه سازمانی در افغانستان",
    teaser:
      "ماژول های مالی، انبار، فروش، خرید و منابع بشری روی یک دیتابیس مشترک و یک زنجیره گزارش.",
    serviceType: "Enterprise resource planning software",
    related: ["business-systems", "database-solutions", "accounting-software"],
    caseStudies: ["logistics-management-system", "warehouse-management-system"],
    sitemapPriority: 0.9,
  },
  {
    key: "accounting-software",
    path: "/accounting-software",
    navLabel: "نرم افزار حسابداری",
    primaryTopic: "نرم افزار حسابداری و مدیریت مالی",
    teaser:
      "ثبت سند، خزانه، انبار، حقوق و دستمزد و گزارش های مدیریتی در یک سیستم.",
    serviceType: "Accounting software",
    related: ["business-systems", "erp", "software-solutions"],
    caseStudies: ["restaurant-pos", "supermarket-management-system"],
    sitemapPriority: 0.9,
  },
  {
    key: "web-design",
    path: "/web-design",
    navLabel: "طراحی سایت",
    primaryTopic: "طراحی سایت در هرات و طراحی وبسایت افغانستان",
    teaser:
      "سایت شرکتی، فروشگاهی و خدماتی که به سیستم های داخلی کسب و کار وصل می شود.",
    serviceType: "Web design and development",
    related: ["graphic-design", "software-solutions", "business-systems"],
    caseStudies: [],
    sitemapPriority: 0.9,
  },
  {
    key: "graphic-design",
    path: "/graphic-design",
    navLabel: "طراحی گرافیک",
    primaryTopic: "طراحی گرافیک حرفه ای در هرات",
    teaser:
      "لوگو، هویت بصری، رابط کاربری و اقلام چاپی، هماهنگ با همان برندی که در سیستم و سایت دیده می شود.",
    serviceType: "Graphic design",
    related: ["web-design", "software-solutions"],
    caseStudies: [],
    sitemapPriority: 0.8,
  },
  {
    key: "oil-and-gas-software",
    path: "/oil-and-gas-software",
    navLabel: "نرم افزار نفت و گاز",
    primaryTopic: "نرم افزار تخصصی نفت و گاز افغانستان",
    teaser:
      "مدیریت واردات مواد نفتی، تانک و ذخیره، توزیع، قیمت گذاری و حسابداری شرکت های نفتی.",
    serviceType: "Petroleum and fuel management software",
    related: ["business-systems", "erp", "database-solutions"],
    caseStudies: [
      "oil-and-gas-management-system",
      "logistics-management-system",
      "warehouse-management-system",
    ],
    sitemapPriority: 0.9,
  },
];

export const serviceByKey = Object.fromEntries(
  services.map((service) => [service.key, service]),
) as Record<ServiceKey, ServiceEntry>;

export function relatedServicesFor(key: ServiceKey): ServiceEntry[] {
  return serviceByKey[key].related.map((related) => serviceByKey[related]);
}
