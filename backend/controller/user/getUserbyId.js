const userModel = require("../../schema/userModel");

const getUserById = async (req, res) => {
  try {
    const requestedUserId = req.params.id;
    const loggedInUser = req.user;

    // Check if user is authenticated
    if (!loggedInUser || !loggedInUser.id) {
      return res.status(401).json({ message: "Unauthorized access." });
    }

    // Allow if user is requesting their own data or has admin role
    const isSelf = requestedUserId === loggedInUser.id;
    const isAdmin = loggedInUser.role === "admin";

    if (!isSelf && !isAdmin) {
      return res.status(403).json({ message: "Forbidden: Access denied." });
    }

    // Fetch user without password and __v fields
    const user = await userModel
      .findById(requestedUserId)
      .select("-password -__v");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      message: "User retrieved successfully.",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getall = async (req, res) => {
  const user = req.user;

  // ✅ Check for admin role
  if (!user || user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admins only." });
  }

  try {
    const users = await userModel.find().select("-password -__v");

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }

    res.status(200).json({
      message: "Users retrieved successfully.",
      users,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  getUserById,
  getall,
};
