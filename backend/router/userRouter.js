const express = require("express");
const router = express.Router();
const { register, verifyOtp } = require("../controller/user/userController");

// POST /api/auth/register
router.post("/register", register);

// POST /api/auth/verify-otp
router.post("/verify-otp", verifyOtp);

module.exports = router;
