const express = require("express");
const router = express.Router();
const multer = require("multer");
const { register, verifyOtp } = require("../controller/user/userController");
const { login } = require("../controller/user/loginController");
const {
  requestPasswordReset,
  verifyResetOtpAndChangePassword,
} = require("../controller/user/forgetPasword");
const { changePassword } = require("../controller/user/changePassword");

const { getUserById, getall } = require("../controller/user/getUserbyId");

const { updateUser } = require("../controller/user/updateUser");
const {
  softDeleteUser,
  hardDeleteUser,
} = require("../controller/user/deleteUser");


const {requestEmailChange , verifyEmailChangeOtp} = require("../controller/user/emailchange");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware to verify JWT token
const verifyToken = require("../auth/verifyToken");

// POST /api/register
router.post("/register", register);

// POST /api/verify-otp
router.post("/verify-otp", verifyOtp);

// POST /api/login
router.post("/login", login);

// POST /api/request-password-reset
router.post("/request-password-reset", requestPasswordReset);

// POST /api/verify-reset-otp
router.post("/verify-reset-otp", verifyResetOtpAndChangePassword);

// POST /api/change-password
router.post("/change-password/:userId", verifyToken, changePassword);

// GET /api/user/:id
router.get("/user/:id", verifyToken, getUserById);

// GET /api/user
router.get("/user", verifyToken, getall);

// PUT /api/user/:id
router.put("/user/:id", verifyToken, upload.single("image"), updateUser);

// POST /api/request-email-change
router.post("/request-email-change", verifyToken, requestEmailChange);

// POST /api/verify-email-change-otp
router.post("/verify-email-change-otp", verifyToken, verifyEmailChangeOtp);

// delete soft, hard
// DELETE /api/user/soft/:id
router.put("/user/trash/:id", verifyToken, softDeleteUser);
// DELETE /api/user/hard/:id
router.delete("/user/:id", verifyToken, hardDeleteUser);

module.exports = router;
