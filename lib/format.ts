const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

/** Converts Latin digits to Persian digits, optionally grouping thousands. */
export function toPersianDigits(input: number | string, grouping = false): string {
  const raw = String(input);
  const grouped = grouping ? raw.replace(/\B(?=(\d{3})+(?!\d))/g, "٬") : raw;
  return grouped.replace(/\d/g, (digit) => PERSIAN_DIGITS[Number(digit)] ?? digit);
}

/** Persian digits with a fixed number of decimals — used inside UI mockups. */
export function toPersianDecimal(value: number, decimals = 3): string {
  return toPersianDigits(value.toFixed(decimals));
}
