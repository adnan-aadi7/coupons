/**
 * Generates HTML template for OTP emails
 * @param {string} name - Name of the user
 * @param {string} otp - One-time password verification code
 * @returns {string} HTML Content
 */
exports.getOtpTemplate = (name, otp) => {
  return `
    <div style="font-family: 'Manrope', 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #F8F9FA;">
      <div style="text-align: center; margin-bottom: 30px;">
        <span style="font-size: 28px; font-weight: 800; color: #1A1C1C; letter-spacing: -0.5px;">Coupons<span style="color: #FF9800;">Mart</span></span>
      </div>
      <div style="background-color: #FFFFFF; border-radius: 24px; padding: 40px; border: 1px solid #E2E8F0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
        <h1 style="font-size: 22px; font-weight: 800; color: #1A1C1C; margin-top: 0; margin-bottom: 16px;">Reset Verification Code</h1>
        <p style="font-size: 15px; color: #4A5568; line-height: 1.6; margin-bottom: 24px;">Hello ${name},</p>
        <p style="font-size: 15px; color: #4A5568; line-height: 1.6; margin-bottom: 30px;">Use the verification code below to authorize your password reset request. This code is only valid for <strong>10 minutes</strong>.</p>
        
        <div style="text-align: center; margin: 35px 0;">
          <div style="display: inline-block; background-color: #FDF4E5; border: 2px dashed #FF9800; border-radius: 16px; padding: 18px 40px; font-family: monospace; font-size: 36px; font-weight: 800; color: #FF9800; letter-spacing: 8px;">
            ${otp}
          </div>
        </div>
        
        <p style="font-size: 13px; color: #718096; line-height: 1.6; margin-bottom: 0;">If you didn't request a password reset, please ignore this email or contact support if you have concerns.</p>
      </div>
      <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #A0AEC0;">
        <p>&copy; ${new Date().getFullYear()} Coupons Mart. All rights reserved.</p>
      </div>
    </div>
  `;
};
