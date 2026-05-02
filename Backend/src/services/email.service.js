import nodemailer from "nodemailer";

/**
  TRANSPORTER
 */
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/**
 * 🔍 VERIFY CONNECTION (optional but useful)
 */
export const verifyEmailConnection = async () => {
  try {
    await transporter.verify();
    console.log("✅ Email server is ready");
  } catch (error) {
    console.error("❌ Email server error:", error.message);
  }
};


/**
 * 📤 GENERIC EMAIL SENDER
 */
export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const mailOptions = {
      from: `"Support Team" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("📨 Email sent:", info.messageId);

    return info;

  } catch (error) {
    console.error("❌ Email send error:", error.message);
    throw new Error("Email could not be sent");
  }
};


/**
 * 🔐 SEND OTP EMAIL (Helper)
 */
export const sendOTPEmail = async (email, otp) => {
  const subject = "Verify Your Email";

  const text = `Your OTP is ${otp}. It expires in 5 minutes.`;

  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>Email Verification</h2>
      <p>Your OTP code is:</p>
      <h1 style="letter-spacing: 3px;">${otp}</h1>
      <p>This code will expire in <b>5 minutes</b>.</p>
      <p>If you didn’t request this, ignore this email.</p>
    </div>
  `;

  return sendEmail({
    to: email,
    subject,
    text,
    html
  });
};