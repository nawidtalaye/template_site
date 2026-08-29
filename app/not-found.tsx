import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "صفحه پیدا نشد",
  robots: { index: false, follow: false },
};

const suggestions = [
  { href: "/", label: "صفحه اصلی سامانه" },
  { href: "/#features", label: "امکانات نرم‌افزار" },
  { href: "/#modules", label: "ماژول‌های تخصصی" },
  { href: "/#plans", label: "پلن‌ها و تعرفه‌ها" },
  { href: "/#contact", label: "تماس و درخواست دمو" },
];

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center gap-6 px-6 py-28 text-center bg-white text-slate-900">
      <p className="fat text-[80px] leading-none text-[#54dcc6] md:text-[120px]">۴۰۴</p>
      <h1 className="text-2xl md:text-3xl font-black fat">این صفحه پیدا نشد</h1>
      <p className="max-w-xl text-slate-600 leading-8 text-sm sm:text-base">
        صفحه مورد نظر شما به صفحه اصلی سامانه جامع نفت و گاز منتقل شده است. جهت بررسی امکانات و دریافت مشاوره، از پیوندهای زیر استفاده فرمایید.
      </p>
      <nav aria-label="پیشنهاد مسیرها" className="flex flex-wrap justify-center gap-3 mt-4">
        {suggestions.map((item) => (
          <Link key={item.href} href={item.href} className="rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-900 hover:text-white px-5 py-2.5 text-sm font-bold text-slate-700 hover:border-slate-900 transition-all">
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
