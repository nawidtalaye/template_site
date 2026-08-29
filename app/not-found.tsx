import type { Metadata } from "next";
import Link from "next/link";
import { companyInfo } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "صفحه پیدا نشد",
  robots: { index: false, follow: false },
};

const suggestions = [
  { href: "/", label: "صفحه اصلی" },
  { href: "/software-solutions", label: "نرم افزار و دیتابیس" },
  { href: "/accounting-software", label: "نرم افزار حسابداری" },
  { href: "/web-design", label: "طراحی سایت" },
  { href: "/portfolio", label: "نمونه کارها" },
  { href: "/contact", label: "تماس با ما" },
];

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <p className="fat text-[80px] leading-none text-primary md:text-[120px]">۴۰۴</p>
      <h1 className="text-2xl md:text-3xl">این صفحه پیدا نشد</h1>
      <p className="max-w-xl text-gray-600 leading-8">
        ممکن است آدرس تغییر کرده باشد یا صفحه حذف شده باشد. از مسیرهای زیر ادامه دهید یا با
        {" "}
        {companyInfo.brandName} تماس بگیرید.
      </p>
      <nav aria-label="پیشنهاد مسیرها" className="flex flex-wrap justify-center gap-3">
        {suggestions.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-full border border-primary px-5 py-2 text-primary transition-colors duration-300 hover:bg-primary hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
