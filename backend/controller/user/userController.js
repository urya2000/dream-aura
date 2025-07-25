const userModel = require("../../schema/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

// Helper: Create OTP Email Template
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

// In-memory OTP store (for demo; use Redis or DB for production)
const otpStore = {};

// Nodemailer transporter (configure with your SMTP details)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "your_email@gmail.com",
    pass: process.env.EMAIL_PASS || "your_email_password",
  },
});

// 1. Registration endpoint: send OTP
const register = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      city,
      state,
      country,
      pincode,
      role,
      password,
      latitude,
      longitude,
    } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email." });
    }
    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Store user data and OTP in memory
    otpStore[email] = {
      otp,
      userData: {
        name,
        email,
        phone,
        address,
        city,
        state,
        country,
        pincode,
        role,
        password: hashedPassword,
        latitude,
        longitude,
      },
      expires: Date.now() + 10 * 60 * 1000, // 10 min expiry
    };
    // Send OTP email
    await transporter.sendMail({
      from: process.env.EMAIL_USER || "your_email@gmail.com",
      to: email,
      subject: "Your OTP for Registration",
      html: createOTPEmailTemplate(otp, "registration"),
    });
    res.status(200).json({
      message: "OTP sent to email. Please verify to complete registration.",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 2. OTP verification endpoint: finalize registration
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const record = otpStore[email];
    if (!record) {
      return res
        .status(400)
        .json({ message: "No OTP request found for this email." });
    }
    if (record.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP." });
    }
    if (Date.now() > record.expires) {
      delete otpStore[email];
      return res.status(400).json({ message: "OTP expired." });
    }
    // Create user
    const user = new userModel({
      ...record.userData,
      isVerified: true,
      trash: 0,
    });
    await user.save();
    delete otpStore[email];
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "7d" }
    );
    res.status(201).json({
      message: "User registered and verified successfully.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  register,
  verifyOtp,
};
