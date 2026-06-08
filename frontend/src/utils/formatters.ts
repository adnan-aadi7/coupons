/**
 * Utility functions for formatting values across the coupons app.
 */

/**
 * Formats a number as a currency string.
 * @param amount - The numeric amount to format
 * @param currency - ISO 4217 currency code (default: 'USD')
 * @param locale - Locale string (default: 'en-US')
 */
export function formatCurrency(
  amount: number,
  currency: string = "USD",
  locale: string = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Formats a discount percentage for display.
 * @param value - The discount value (0-100)
 */
export function formatDiscount(value: number): string {
  if (value <= 0) return "";
  return `${Math.round(value)}% OFF`;
}

/**
 * Formats a date to a human-readable string.
 * @param date - Date string or Date object
 * @param locale - Locale string (default: 'en-US')
 */
export function formatDate(date: string | Date, locale: string = "en-US"): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Returns a relative time string (e.g., "3 days left", "Expired").
 * @param expiryDate - The expiry date string or Date object
 */
export function formatExpiry(expiryDate: string | Date): string {
  const expiry = typeof expiryDate === "string" ? new Date(expiryDate) : expiryDate;
  const now = new Date();
  const diffMs = expiry.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "Expired";
  if (diffDays === 0) return "Expires today";
  if (diffDays === 1) return "1 day left";
  return `${diffDays} days left`;
}

/**
 * Truncates a string to a given max length, appending ellipsis if needed.
 * @param text - The text to truncate
 * @param maxLength - Maximum character length (default: 80)
 */
export function truncateText(text: string, maxLength: number = 80): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 3)}...`;
}

/**
 * Converts a number to a compact representation (e.g., 1200 -> "1.2K").
 * @param count - The number to compact
 */
export function formatCompactNumber(count: number): string {
  return new Intl.NumberFormat("en-US", { notation: "compact" }).format(count);
}
