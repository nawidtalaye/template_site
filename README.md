# نواتیک — وب‌سایت

سایت معرفی خدمات **نواتیک**: نرم افزار حسابداری، دیتابیس اختصاصی، اتوماسیون مالی و طراحی سایت.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, Tailwind CSS 4 |
| Fonts | IRANYekanX FaNum, self-hosted WOFF2 |
| Carousels | Swiper 12, dynamically imported on scroll |

## اجرا

```bash
npm install
cp .env.example .env.local   # مقادیر را پر کنید
npm run dev                  # http://localhost:3000
```

```bash
npm run build     # production build
npm run start     # serve the production build
npm run lint      # ESLint (next/core-web-vitals)
npm run typecheck # tsc --noEmit
```

## متغیرهای محیطی

| متغیر | کاربرد |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | مبدا سایت؛ برای canonical، Open Graph، `sitemap.xml` و `robots.txt` |
| `LEAD_WEBHOOK_URL` | مقصد تحویل فرم‌های تماس. اگر خالی باشد، لیدها در لاگ سرور ثبت می‌شوند |

## ساختار

```
app/
  layout.tsx            متادیتا پایه، Organization/WebSite JSON-LD، preload فونت، skip link
  page.tsx              صفحه اصلی (server component؛ بخش تعاملی در HomeClient.tsx)
  HomeClient.tsx        هیرو، اسلایدر نمونه کار و تب ها (client component)
  herat/                صفحه محلی دفتر هرات (LocalBusiness)
  software-solutions/   توسعه نرم افزار اختصاصی
  database-solutions/   طراحی و توسعه دیتابس
  business-systems/     سیستم های مدیریت کسب و کار
  erp/                  نرم افزار ERP
  accounting-software/  نرم افزار حسابداری
  web-design/           طراحی سایت
  graphic-design/       طراحی گرافیک
  oil-and-gas-software/ نرم افزار نفت و گاز
  portfolio/            فهرست نمونه کارها + صفحه هر پروژه ([slug])
  blog/                 وبلاگ + صفحه هر مطلب ([slug])
  api/contact/          دریافت فرم‌ها: اعتبارسنجی + rate limit + honeypot
  sitemap.ts            نقشه سایت (فقط URLهای canonical و قابل ایندکس)
  robots.ts             robots.txt
  not-found.tsx         صفحه ۴۰۴ (noindex)
  globals.css           توکن‌های Tailwind
  legacy-base.css       استایل‌های پایه و @font-face فونت‌ها
components/
  LeadForm.tsx          رپر کلاینتی همه فرم‌ها (ارسال، وضعیت، aria-live)
  HomeSlidersInit.tsx   بارگذاری تنبل Swiper در صفحه اصلی
  JsonLd.tsx            رندر یک سند JSON-LD
  Breadcrumbs.tsx       مسیر صفحه (متناظر با BreadcrumbList)
  RelatedLinks.tsx      لینک‌های داخلی انتهای صفحات خدمات
  ServicePageShell.tsx  قالب مشترک صفحات خدمات
  PortfolioGallery.tsx  گالری نمونه کارها
lib/
  site-content.ts       اطلاعات شرکت + مختصات نقشه (تک منبع حقیقت)
  seo.ts                سازنده همه گره‌های JSON-LD
  metadata.ts           سازنده متادیتای هر صفحه (title/canonical/OG)
  services.ts           گراف خدمات: مسیر، موضوع اصلی، لینک‌های مرتبط
  case-studies.ts       شرح پروژه‌های واقعی تحویل شده
  blog-content.ts       مطالب وبلاگ
  portfolio-data.json   داده نمونه کارها
  lead.ts               اعتبارسنجی مشترک فرم
public/
  fonts/  images/  media/
```

## قواعد SEO

- هر صفحه دقیقاً یک موضوع اصلی، یک `<h1>` و یک canonical مخصوص خودش دارد.
- متادیتا فقط از طریق `buildMetadata` در `lib/metadata.ts` ساخته می‌شود.
- JSON-LD فقط از `lib/seo.ts` می‌آید و هیچ داده‌ای خارج از `companyInfo` منتشر نمی‌کند؛
  امتیاز، تعداد نظر، جایزه و آمار مشتری عمداً منتشر نمی‌شود.
- افزودن صفحه خدمات جدید یعنی افزودن یک ورودی در `lib/services.ts`؛ همان ورودی
  به صورت خودکار وارد فوتر، لینک‌های مرتبط و `sitemap.xml` می‌شود.

## نکات

- همه تصاویر محلی هستند؛ هیچ دامنه‌ای در `images.remotePatterns` مجاز نیست.
- تصاویر از `next/image` استفاده می‌کنند (AVIF/WebP خودکار). دو استثنا با کامنت مشخص شده‌اند:
  نشان اعتماد الکترونیکی و پیش‌نمایش اسکرین‌شات نمونه کار.
- فرم‌ها progressive enhancement دارند: markup سرور-رندر است و ارسال از سمت کلاینت انجام می‌شود.
- `LEAD_WEBHOOK_URL` تنظیم نشده باشد، لید در لاگ سرور می‌ماند و هرگز بی‌صدا حذف نمی‌شود.
