
const userModel = require("../../schema/userModel");

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

    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User permanently deleted." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  softDeleteUser,
  hardDeleteUser,
};

