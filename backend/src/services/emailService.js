const nodemailer = require('nodemailer');
const { getOtpTemplate } = require('../templates/otpTemplate');

// Setup Nodemailer transporter using environment variables
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

/**
 * Sends OTP Email to the user
 * @param {string} toEmail - Recipient email
 * @param {string} userName - Name of the user
 * @param {string} otp - One-time password verification code
 * @returns {Promise<any>}
 */
exports.sendOTPEmail = async (toEmail, userName, otp) => {
  const htmlContent = getOtpTemplate(userName, otp);

  const mailOptions = {
    from: `"Coupons Mart Security" <${process.env.SMTP_USER}>`,
    to: toEmail,
    subject: `Coupons Mart - ${otp} is your verification code`,
    html: htmlContent
  };

  return transporter.sendMail(mailOptions);
};
