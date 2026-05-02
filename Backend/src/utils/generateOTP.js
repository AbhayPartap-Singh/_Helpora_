import crypto from "crypto";

/**
 * 🔐 Generate OTP
 * @param {number} length - number of digits (default 6)
 * @returns {string}
 */
export const generateOTP = (length = 6) => {
  const digits = "0123456789";

  let otp = "";

  // cryptographically secure random values
  const randomBytes = crypto.randomBytes(length);

  for (let i = 0; i < length; i++) {
    otp += digits[randomBytes[i] % 10];
  }

  return otp;
};