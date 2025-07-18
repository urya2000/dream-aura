const userModel = require("../../schema/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

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
      },
      expires: Date.now() + 10 * 60 * 1000, // 10 min expiry
    };
    // Send OTP email
    await transporter.sendMail({
      from: process.env.EMAIL_USER || "your_email@gmail.com",
      to: email,
      subject: "Your OTP for Registration",
      text: `Your OTP for registration is: ${otp}`,
    });
    res
      .status(200)
      .json({
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
    const userData = record.userData;
    userData.isVerified = true; // Mark as verified after OTP verification
    const user = new userModel(userData);
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

// 3. Login endpoint
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful.",
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
  login,
};
