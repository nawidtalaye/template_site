# نواتیک — معرفی سامانه مدیریت و حسابداری نفت و گاز

وب‌سایت تک‌صفحه‌ای معرفی **سامانه مدیریت و حسابداری نفت و گاز نواتیک**؛ محصولی از شرکت
نرم‌افزاری نواتیک (هرات، افغانستان). تمام محتوا در یک صفحه روایت می‌شود: از معرفی محصول
تا ماژول‌ها، نمای نرم‌افزار، پلن‌ها و فرم درخواست تماس.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19، Tailwind CSS 4 (CSS-first tokens در `app/globals.css`) |
| Fonts | IRANYekanX FaNum، self-hosted WOFF2 (۵ وزن) |
| Icons | lucide-react |
| Motion | سیستم داخلی: IntersectionObserver + CSS custom properties + rAF |

هیچ کتابخانه انیمیشن خارجی استفاده نشده است. تمام حرکت‌ها با سیستم داخلی پروژه
(`components/motion`) اجرا می‌شوند تا وابستگی و حجم جاوااسکریپت پایین بماند.

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
| `NEXT_PUBLIC_SITE_URL` | مبدأ سایت؛ برای canonical، Open Graph، `sitemap.xml` و `robots.txt` |
| `LEAD_WEBHOOK_URL` | مقصد تحویل فرم‌های تماس. اگر خالی باشد، لیدها در لاگ سرور ثبت می‌شوند |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | در صورت تنظیم، بعد از ثبت فرم پیام واتساپ آماده باز می‌شود |

## ساختار

```
app/
  layout.tsx            فونت IRANYekanX، RTL، skip link، JSON-LD سازمان
  page.tsx              متادیتا و JSON-LD صفحه (Server Component)
  HomeClient.tsx        ترکیب بخش‌های صفحه
  globals.css           توکن‌های برند، پایه، سیستم حرکت، scrim هیرو
  api/contact/          دریافت فرم‌ها: اعتبارسنجی + rate limit + honeypot
  not-found.tsx         صفحه ۴۰۴ (noindex)
  sitemap.ts            نقشه سایت (فقط /)
  robots.ts             robots.txt
components/
  Header.tsx            نوار ثابت: شفاف روی هیرو، سفید بعد از اسکرول، اسکرول‌اسپای
  Footer.tsx            فوتر با پیوندهای داخلی (فقط anchorهای موجود)
  LeadForm.tsx          ارسال، اعتبارسنجی و وضعیت فرم‌ها (Context)
  motion/               Reveal، RevealLine، Counter، Parallax، ScrollProgress
  ui/
    Glyph.tsx           آیکون بُعد‌دار (بدون قاب و سایه)
    SectionHeading.tsx  سربرگ مشترک بخش‌ها
    PhoneField.tsx      فیلد شماره تلفن با وضعیت اعتبارسنجی
    SubmitButton.tsx    دکمه اصلی فرم‌ها
    ClientMark.tsx      نشان‌های انتزاعی مشتریان (جایگزین با لوگوی واقعی)
    mockups/            صفحه‌های نمونه نرم‌افزار (کد، نه تصویر)
  showcase/             بخش‌های صفحه:
    Hero · Intro · Features · Modules · Industry · Statistics ·
    HowItWorks · ProductShowcase · Benefits · Plans · Customers · About · FinalCta
lib/
  showcase-content.ts   تمام متن، اعداد، آدرس تصویر/ویدیو — برای ویرایش آسان
  site-content.ts       اطلاعات شرکت (تک منبع حقیقت)
  seo.ts                سازنده همه گره‌های JSON-LD
  metadata.ts           سازنده متادیتا
  lead.ts               اعتبارسنجی مشترک فرم (کلاینت و سرور)
  format.ts             تبدیل ارقام به فارسی
public/
  videos/               hero-oil-gas.mp4 / .webm (لوپ سینمایی پالایشگاه)
  images/showcase/      hero-poster، intro، industry، benefits
```

## بخش‌های صفحه و anchorها

`#hero` · `#intro` · `#features` · `#modules` · `#industry` · `#statistics` ·
`#process` · `#showcase` · `#benefits` · `#plans` · `#customers` · `#about` · `#contact`

منوی بالا، منوی موبایل و فوتر همه از همین anchorها استفاده می‌کنند
(`navItems` در `lib/showcase-content.ts`).

## جایگزینی محتوا و رسانه

- **متن و اعداد:** فقط `lib/showcase-content.ts` را ویرایش کنید؛ هیچ کامپوننتی متن
  سخت‌کد‌شده ندارد.
- **تصویرها:** `public/images/showcase/` — نام فایل‌ها گویا هستند
  (`hero-poster.jpg`, `intro-operations.jpg`, `industry-depot.jpg`,
  `industry-finance.jpg`, `industry-pipeline.jpg`, `benefits-operations.jpg`).
- **ویدیو:** `public/videos/hero-oil-gas.mp4` و `.webm` را جایگزین کنید؛
  ویژگی‌ها: muted، loop، playsInline، autoplay، با poster در `hero-poster.jpg`.
- **لوگوی مشتریان:** نشان‌های فعلی در `components/ui/ClientMark.tsx` انتزاعی و
  نمونه هستند.
- **نمای نرم‌افزار:** صفحه‌ها در `components/ui/mockups/views.tsx` با کد ساخته
  شده‌اند (جدول، نمودار، اعداد) تا با محصول واقعی هماهنگ شوند.

## ارقام نمونه

اعداد بخش‌های «آمار»، «پلن‌ها» و «مشتریان» نمونه هستند و در خود صفحه هم این موضوع
ذکر شده است؛ بعد از تأیید شما با اطلاعات واقعی جایگزین می‌شوند.

## قواعد پروژه

- هر بخش دقیقاً یک `<h2>` دارد و عنوان اصلی صفحه یک `<h1>` است.
- JSON-LD فقط از `lib/seo.ts` می‌آید و هیچ داده‌ای خارج از `companyInfo` منتشر نمی‌کند؛
  امتیاز، تعداد نظر، جایزه و آمار تأییدنشده عمداً منتشر نمی‌شود.
- فونت تنها از مسیر `next/font/local` بارگذاری می‌شود (`--font-iranyekan-next`) و
  `font-sans` به آن اشاره دارد؛ فونت عمومی جایگزین آن نیست.
- رنگ‌ها همان پالت برند است (`#54dcc6`, `#0f766e`, خاکستری‌های slate) و در
  `app/globals.css` به صورت توکن تعریف شده‌اند.
- حرکت‌ها به `prefers-reduced-motion` احترام می‌گذارند و محتوا بدون جاوااسکریپت
  نیز در DOM وجود دارد.
- مسیرهای قدیمی سایت چندصفحه‌ای از طریق `redirects()` در `next.config.ts` به
  بخش متناظر همین صفحه هدایت می‌شوند (۳۰۱).
