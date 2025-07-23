
const userModel = require("../../schema/userModel");
const cloudinary = require("../../lib/cloudinaryConfig");

const softDeleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const loggedInUser = req.user;

    const isSelf = id === loggedInUser.id;
    const isAdmin = loggedInUser.role === "admin";

    if (!isSelf && !isAdmin) {
      return res.status(403).json({ message: "Forbidden: Access denied." });
    }

    const user = await userModel.findByIdAndUpdate(
      id,
      { trash: true },
      { new: true }
    ).select("-password -__v");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User soft-deleted (trashed).", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const hardDeleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const loggedInUser = req.user;

    if (loggedInUser.role !== "admin") {
      return res.status(403).json({ message: "Only admin can delete users." });
    }

    // Find user first to get profilePicId
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Delete profile image from Cloudinary if exists
    if (user.profilePicId && user.profilePicId !== "0") {
      try {
        await cloudinary.uploader.destroy(user.profilePicId);
      } catch (cloudErr) {
        console.error("Cloudinary delete error:", cloudErr);
        // Optionally continue even if image deletion fails
      }
    }

    // Now delete user from DB
    await userModel.findByIdAndDelete(id);

    res.status(200).json({ message: "User permanently deleted, including Cloudinary image." });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  softDeleteUser,
  hardDeleteUser,
};

