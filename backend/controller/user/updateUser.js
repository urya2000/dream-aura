const userModel = require("../../schema/userModel");

const updateUser = async (req, res) => {
  try {
    const requestedUserId = req.params.id;
    const loggedInUser = req.user;

    // Check if user is authenticated
    if (!loggedInUser || !loggedInUser.id) {
      return res.status(401).json({ message: "Unauthorized access." });
    }

    const isSelf = requestedUserId === loggedInUser.id;
    const isAdmin = loggedInUser.role === "admin";

    if (!isSelf && !isAdmin) {
      return res.status(403).json({ message: "Forbidden: Access denied." });
    }

    // Fetch the user from DB
    const user = await userModel.findById(requestedUserId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Allowed updates only (prevent role, password, email change)
    const forbiddenFields = ["email", "password", "role"];
    const updates = req.body;

    for (let key of Object.keys(updates)) {
      if (!forbiddenFields.includes(key)) {
        user[key] = updates[key];
      }
    }

    await user.save();

    // Exclude sensitive fields in the response
    const { password, __v, ...safeUser } = user.toObject();

    res.status(200).json({
      message: "User updated successfully.",
      user: safeUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  updateUser,
};
