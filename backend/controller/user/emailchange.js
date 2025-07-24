const userModel = require("../../schema/userModel");
const nodemailer = require("nodemailer");


const createOTPEmailTemplate = (otp, purpose = "verification") => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Dream Aura - Email Verification</title>
    </head>
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; margin: 0; padding: 0;">
      <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
        <div style="background:#6059C1;padding:30px 40px;text-align:center;">
          <div style="color:#fff;font-size:28px;font-weight:bold;margin-bottom:8px;letter-spacing:-0.5px;font-family:'Segoe UI',Arial,sans-serif;">Dream Aura</div>
          <p style="color:#E0E7FF;font-size:14px;margin:0;font-family:'Segoe UI',Arial,sans-serif;">Secure Payment Gateway</p>
        </div>
        <div style="padding:40px 40px 30px;">
          <h1 style="font-size:18px;color:#1F2937;margin-bottom:20px;font-weight:500;font-family:'Segoe UI',Arial,sans-serif;">Email Verification Required</h1>
          <p style="font-size:16px;color:#6B7280;margin-bottom:30px;line-height:1.7;font-family:'Segoe UI',Arial,sans-serif;">
            We received a request to verify your email address for ${purpose}.<br>
            Please use the verification code below to complete the process.
          </p>
          <div style="background:#F8FAFC;border:2px solid #E2E8F0;border-radius:12px;padding:25px;text-align:center;margin:30px 0;">
            <div style="font-size:14px;color:#64748B;margin-bottom:10px;text-transform:uppercase;letter-spacing:1px;font-weight:600;font-family:'Segoe UI',Arial,sans-serif;">Verification Code</div>
            <div style="font-size:32px;font-weight:bold;color:#6059C1;letter-spacing:8px;font-family:'Courier New',Consolas,monospace;margin:10px 0;text-shadow:0 2px 4px rgba(30,64,175,0.1);line-height:1.2;">${otp}</div>
          </div>
          <div style="background-color:#FEF3CD;border-left:4px solid #F59E0B;padding:15px 20px;margin:25px 0;border-radius:0 8px 8px 0;">
            <p style="color:#92400E;font-size:14px;margin:0;font-weight:500;font-family:'Segoe UI',Arial,sans-serif;">
              🔒 <strong>Security Notice:</strong> Never share this code with anyone. Dream Aura will never ask for your verification code via phone or email.
            </p>
          </div>
          <p style="font-size:16px;color:#6B7280;margin-bottom:0;line-height:1.7;font-family:'Segoe UI',Arial,sans-serif;">
            If you didn't request this verification, please ignore this email or contact our support team if you have concerns about your account security.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// In-memory store for email change OTPs
const emailChangeOtpStore = {};


// Nodemailer transporter (configure with your SMTP details)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "your_email@gmail.com",
    pass: process.env.EMAIL_PASS || "your_email_password",
  },
});

// 1. Request email change: send OTP to new email
const requestEmailChange = async (req, res) => {
  try {
    const { userId, newEmail } = req.body;
    // Check if new email already exists
    const existing = await userModel.findOne({ email: newEmail });
    if (existing) {
      return res.status(400).json({ message: "Email already in use." });
    }
    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    emailChangeOtpStore[newEmail] = {
      otp,
      userId,
      expires: Date.now() + 10 * 60 * 1000,
    };
    // Send OTP email
    await transporter.sendMail({
      from: process.env.EMAIL_USER || "your_email@gmail.com",
      to: newEmail,
      subject: "Dream Aura: Email Change OTP",
      html: createOTPEmailTemplate(otp, "email change"),
    });
    res.status(200).json({ message: "OTP sent to new email." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 2. Verify OTP and update email
const verifyEmailChangeOtp = async (req, res) => {
  try {
    const { userId, newEmail, otp } = req.body;
    const record = emailChangeOtpStore[newEmail];
    if (!record || record.userId !== userId) {
      return res.status(400).json({ message: "No OTP request found." });
    }
    if (record.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP." });
    }
    if (Date.now() > record.expires) {
      delete emailChangeOtpStore[newEmail];
      return res.status(400).json({ message: "OTP expired." });
    }
    // Update user's email
    await userModel.findByIdAndUpdate(userId, { email: newEmail });
    delete emailChangeOtpStore[newEmail];
    res.status(200).json({ message: "Email changed successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  requestEmailChange,
  verifyEmailChangeOtp,
};