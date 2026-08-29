/**
 * Single source of truth for the Novatech team members shown on the home page.
 *
 * Only verified information lives here: name, role and the portrait file that
 * already exists in the repository. Optional fields (short description, social
 * links) are intentionally absent until real content is available.
 */

export type TeamMember = {
  /** Stable key, also used for the portrait file name. */
  slug: string;
  name: string;
  role: string;
  image: string;
  /** Intrinsic size of the source file, so Next/Image reserves the right box. */
  width: number;
  height: number;
  alt: string;
};

export const teamMembers: TeamMember[] = [
  {
    slug: "yaser-faqiri",
    name: "یاسر فقیری",
    role: "توسعه دهنده وب",
    image: "/images/team/yaser.webp",
    width: 1086,
    height: 1448,
    alt: "یاسر فقیری، توسعه دهنده وب در نواتیک",
  },
  {
    slug: "ali-ahmad-bakhtyari",
    name: "علی احمد بختیاری",
    role: "طراح دیتابیس",
    image: "/images/ali.webp",
    width: 1079,
    height: 1457,
    alt: "علی احمد بختیاری، طراح دیتابیس در نواتیک",
  },
  {
    slug: "sayed-mahdi-kazemi",
    name: "سید مهدی کاظمی",
    role: "طراح گرافیک",
    image: "/images/mahdi.webp",
    width: 1227,
    height: 1281,
    alt: "سید مهدی کاظمی، طراح گرافیک در نواتیک",
  },
];

/** Persian-Indic numerals for the sequence indicator, e.g. ۰۱. */
export function toPersianIndex(value: number): string {
  return String(value)
    .padStart(2, "0")
    .replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]);
}
