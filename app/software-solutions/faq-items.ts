/**
 * The questions shown on /software-solutions. They live here rather than inside
 * the client component so the server page can build the FAQPage JSON-LD from the
 * exact same array the visitor reads — the schema can never drift from the
 * visible answers, which is what Google requires of FAQ markup.
 */
export type SoftwareSolutionsFaqItem = {
  question: string;
  answer: string;
};

export const softwareSolutionsFaq: SoftwareSolutionsFaqItem[] = [
  {
    question: "۱. آیا این نرم‌افزارها برای کسب‌وکار من قابل شخصی‌سازی هستند؟",
    answer: "بله، تمام نرم‌افزارهای ما (از جمله صرافی، رستوران، باربری و...) قابلیت شخصی‌سازی کامل دارند تا دقیقاً با فرآیندهای کسب‌وکار شما منطبق شوند."
  },
  {
    question: "۲. استقرار و راه‌اندازی نرم‌افزار چقدر زمان می‌برد؟",
    answer: "نرم‌افزارهای پایه معمولاً در کمتر از یک هفته نصب و آموزش داده می‌شوند. اما برای توسعه قابلیت‌های اختصاصی، پس از نیازسنجی زمان‌بندی دقیق ارائه می‌گردد."
  },
  {
    question: "۳. آیا امکان انتقال اطلاعات از سیستم‌های قبلی وجود دارد؟",
    answer: "بله، تیم فنی ما می‌تواند تمامی اطلاعات پایه (مشتریان، موجودی کالا و حساب‌ها) را از سیستم‌های قدیمی یا فایل‌های اکسل به دیتابیس جدید منتقل کند."
  },
  {
    question: "۴. هزینه خرید نرم‌افزارها چگونه محاسبه می‌شود؟",
    answer: "هزینه بسته به نوع نرم‌افزار، تعداد کاربران و نیاز به ماژول‌های اختصاصی متفاوت است. بعد از مشاوره و نیازسنجی، برآورد دقیق و شفاف خدمت شما اعلام می‌شود."
  },
  {
    question: "۵. آیا این سیستم‌ها با وب‌سایت یا فروشگاه آنلاین من هماهنگ می‌شوند؟",
    answer: "بله، در صورت نیاز تمامی نرم‌افزارها و دیتابیس‌های ما می‌توانند از طریق API به وب‌سایت، سیستم‌های حسابداری و یا فروشگاه‌های آنلاین شما متصل شوند."
  }
];
