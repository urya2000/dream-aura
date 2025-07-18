const express = require("express");
const router = express.Router();
const { register, verifyOtp } = require("../controller/user/userController");
const { login } = require("../controller/user/loginController");
const {
  requestPasswordReset,
  verifyResetOtpAndChangePassword,
} = require("../controller/user/forgetPasword");
const { changePassword } = require("../controller/user/changePassword");

// Middleware to verify JWT token
const verifyToken = require("../auth/verifyToken");

// POST /api/auth/register
router.post("/register", register);

// POST /api/auth/verify-otp
router.post("/verify-otp", verifyOtp);

// POST /api/auth/login
router.post("/login", login);

// POST /api/auth/request-password-reset
router.post("/request-password-reset", requestPasswordReset);

// POST /api/auth/verify-reset-otp
router.post("/verify-reset-otp", verifyResetOtpAndChangePassword);

// POST /api/auth/change-password
router.post("/change-password/:userId", verifyToken, changePassword);

module.exports = router;
