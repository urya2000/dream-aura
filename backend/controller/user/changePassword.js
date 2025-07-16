const userModel = require("../../schema/userModel");
const bcrypt = require("bcryptjs");

// Change password controller
const changePassword = async (req, res) => {
  try {
    const { old_password, new_password } = req.body;
    // Accept userId from params, or fallback to req.user.id (from JWT middleware)
    const userId = req.params.id || (req.user && req.user.id);
    if (!userId) {
      return res.status(400).json({ message: "User ID not provided." });
    }
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }
    const isMatch = await bcrypt.compare(old_password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect." });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(new_password, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Password changed successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  changePassword,
};
