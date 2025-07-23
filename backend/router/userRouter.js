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

const storage = multer.memoryStorage();
const upload = multer({ storage });

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

// GET /api/user/:id
router.get("/user/:id", verifyToken, getUserById);

// GET /api/auth/user
router.get("/user", verifyToken, getall);

// PUT /api/auth/user/:id
router.put("/user/:id", verifyToken, upload.single("image"), updateUser);

// delete soft, hard
// DELETE /api/auth/user/soft/:id
router.put("/user/trash/:id", verifyToken, softDeleteUser);
// DELETE /api/auth/user/hard/:id
router.delete("/user/:id", verifyToken, hardDeleteUser);

module.exports = router;
