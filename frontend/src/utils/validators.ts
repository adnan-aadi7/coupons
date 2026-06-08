/**
 * Validation helper utilities for forms and user inputs.
 */

/**
 * Validates an email address format.
 */
export function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

/**
 * Validates a coupon code — alphanumeric, 4-20 characters.
 */
export function isValidCouponCode(code: string): boolean {
  const re = /^[A-Z0-9]{4,20}$/i;
  return re.test(code.trim());
}

/**
 * Validates that a URL is a properly formed HTTP(S) URL.
 */
export function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * Validates a phone number (international format support).
 */
export function isValidPhone(phone: string): boolean {
  const re = /^\+?[1-9]\d{6,14}$/;
  return re.test(phone.replace(/[\s\-().]/g, ""));
}

/**
 * Returns validation error message or null if valid.
 */
export function validateRequired(value: string, fieldName: string): string | null {
  if (!value || value.trim() === "") {
    return `${fieldName} is required.`;
  }
  return null;
}

/**
 * Validates password strength: min 8 chars, 1 uppercase, 1 number.
 */
export function isStrongPassword(password: string): { valid: boolean; message: string } {
  if (password.length < 8) {
    return { valid: false, message: "Password must be at least 8 characters long." };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: "Password must contain at least one uppercase letter." };
  }
  if (!/\d/.test(password)) {
    return { valid: false, message: "Password must contain at least one number." };
  }
  return { valid: true, message: "Password is strong." };
}
