# نواتیک — سامانه مدیریت و حسابداری نفت و گاز

وب‌سایت تک‌صفحه‌ای معرفی **سامانه مدیریت و حسابداری نفت و گاز نواتیک**: نرم‌افزاری برای
شرکت‌های واردات، ذخیره‌سازی و پخش فرآورده‌های نفتی در افغانستان.

کل سایت یک صفحه است (`/`). مسیرهای قدیمیِ چندصفحه‌ای حذف شده‌اند و در `next.config.ts`
به بخش متناظر همین صفحه ریدایرکت (۳۰۱) می‌شوند.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router، Turbopack) |
| UI | React 19، Tailwind CSS 4 |
| Fonts | IRANYekanX FaNum، self-hosted WOFF2 |
| Icons | lucide-react |

هیچ کتابخانه انیمیشن یا اسلایدری استفاده نشده است؛ همه حرکت‌ها با CSS،
`IntersectionObserver` و `requestAnimationFrame` پیاده شده‌اند.

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
| `LEAD_WEBHOOK_URL` | مقصد تحویل فرم‌های تماس. اگر خالی باشد， لیدها در لاگ سرور ثبت می‌شوند |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | شماره مقصد در واتساپ برای ارجاع لید |

## ساختار صفحه

هر بخش یک `id` دارد که در `lib/navigation.ts` ثبت شده است؛ هدر، منوی موبایل و فوتر
همگی از همین فهرست ساخته می‌شوند.

| بخش | شناسه | توضیح |
|---|---|---|
| Hero | `#hero` | تصویر تمام‌صفحه، عنوان، یک CTA اصلی |
| معرفی | `#intro` | متن + تصویر، چهار نکته مشخص |
| ماژول‌ها | `#modules` | انتخاب‌گر ۱۰ ماژول با پنل جزئیات (تب عمودی، کلیدهای جهت‌نما) |
| توانایی‌های تخصصی | `#capabilities` | چهار محاسبه‌ای که حسابداری عمومی انجام نمی‌دهد |
| جریان کار | `#process` | عنوان چسبان + خط پیشرفت وابسته به اسکرول |
| نمای نرم‌افزار | `#showcase` | تب‌های صفحه‌های داشبورد |
| مقایسه | `#comparison` | قبل و بعد از استقرار، ردیف‌به‌ردیف |
| شاخص‌ها | `#statistics` | شمارنده با احترام به `prefers-reduced-motion` |
| بسته‌ها | `#plans` | دو دسته مشتری × سه سطح استقرار |
| مخاطبان | `#trust` | این سامانه برای چه مجموعه‌هایی ساخته شده |
| درباره ما | `#about` و `#team` | شرکت، نقل‌قول، نکات و تیم |
| تماس | `#contact` | راه‌های ارتباط + فرم درخواست دمو |

## ساختار پروژه

```
app/
  layout.tsx         متادیتا پایه، فونت محلی، Organization/WebSite JSON-LD، skip link
  page.tsx           صفحه اصلی (server component؛ JSON-LD) ← HomeClient
  HomeClient.tsx     ترتیب بخش‌ها (client component)
  globals.css        توکن‌های Tailwind، پایه، حرکت‌های reveal
  api/contact/       دریافت فرم‌ها: اعتبارسنجی + rate limit + honeypot
  sitemap.ts         نقشه سایت (فقط `/`)
  robots.ts          robots.txt
  not-found.tsx      صفحه ۴۰۴ (noindex)
components/
  Header.tsx         هدر چسبان + منوی موبایل
  Footer.tsx         فوتر با لینک‌های همان صفحه
  LeadForm.tsx       رپر کلاینتی فرم‌ها (ارسال، وضعیت، aria-live)
  JsonLd.tsx         رندر یک سند JSON-LD
  Reveal.tsx         نمایش تدریجی با IntersectionObserver
  SectionHeading.tsx الگوی مشترک سرتیتر بخش‌ها
  showcase/          هر بخش صفحه، یک فایل
lib/
  site-content.ts    اطلاعات شرکت (تک منبع حقیقت)
  showcase-content.ts متن و مسیر رسانه‌های صفحه
  navigation.ts      فهرست بخش‌ها و لینک‌ها
  seo.ts             سازنده گره‌های JSON-LD
  metadata.ts        سازنده متادیتا
  lead.ts            اعتبارسنجی مشترک فرم
public/
  images/showcase/   تصاویر صفحه (جایگزینی مستقیم فایل)
  fonts/             فونت IRANYekanX FaNum
```

## تغییر محتوا و رسانه

- **متن‌ها:** فقط `lib/showcase-content.ts`. هیچ متنی در کامپوننت‌ها hard-code نشده است.
- **تصاویر:** `public/images/showcase/`. نام فایل‌ها گویا است
  (`hero.jpg`, `intro-petroleum.jpg`, `dashboard-accounting.jpg`, …)؛ جایگزینی فایل
  با همان نام کافی است.
- **لینک‌های هدر و فوتر:** `lib/navigation.ts`.
- **اطلاعات شرکت (تلفن، آدرس، ایمیل):** `lib/site-content.ts`؛ JSON-LD هم از همین‌جا ساخته می‌شود.

## قواعد محتوا

- نام هیچ مشتری، گواهی یا جایزه‌ای منتشر نشده است. بخش `#trust` نوع مجموعه‌ها را
  می‌گوید، نه نام آن‌ها؛ درج نام و لوگو بعد از تأیید مشتری انجام می‌شود.
- آمارها فقط ویژگی‌های خود نرم‌افزار را توصیف می‌کنند (تعداد ماژول، ارزها، دمای مبنا)،
  نه نتایج ادعایی کسب‌وکار.
- هیچ `aggregateRating`، `review` یا `award` در JSON-LD منتشر نمی‌شود.

## نکات

- همه تصاویر محلی هستند؛ `images.remotePatterns` خالی است.
- تصاویر با `next/image` بار می‌شوند (AVIF/WebP خودکار).
- فرم‌ها server-rendered هستند و ارسال از سمت کلاینت انجام می‌شود.
- اگر `LEAD_WEBHOOK_URL` تنظیم نشده باشد， لید در لاگ سرور می‌ماند و بی‌صدا حذف نمی‌شود.
- حرکت‌ها به `prefers-reduced-motion` احترام می‌گذارند و با `<noscript>` هم محتوا نمایش داده می‌شود.
