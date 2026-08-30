/**
 * Single source of truth for in-page navigation.
 *
 * The site is one page, so the header, the mobile menu and the footer all read
 * from the same list. Adding a section means editing this file only.
 */

export type NavItem = {
  href: string;
  label: string;
  shortLabel?: string;
};

/** Primary links shown in the sticky header. */
export const headerNav: NavItem[] = [
  { href: "#hero", label: "خانه" },
  { href: "#intro", label: "معرفی" },
  { href: "#modules", label: "ماژول‌ها" },
  { href: "#process", label: "فرآیند" },
  { href: "#showcase", label: "داشبورد" },
  { href: "#plans", label: "بسته‌ها" },
  { href: "#about", label: "درباره ما" },
  { href: "#contact", label: "تماس" },
];

/** Secondary links used by the footer only. */
export const footerSecondaryNav: NavItem[] = [
  { href: "#capabilities", label: "تفاوت با حسابداری عمومی" },
  { href: "#comparison", label: "قبل و بعد از استقرار" },
  { href: "#statistics", label: "شاخص‌های سامانه" },
  { href: "#trust", label: "مناسب چه مجموعه‌هایی" },
  { href: "#team", label: "تیم نواتیک" },
];

/** Every anchored section on the page, in document order. */
export const sectionIds = [
  "hero",
  "intro",
  "modules",
  "capabilities",
  "process",
  "showcase",
  "comparison",
  "statistics",
  "plans",
  "trust",
  "about",
  "team",
  "contact",
] as const;
