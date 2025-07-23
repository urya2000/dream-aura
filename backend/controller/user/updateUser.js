const userModel = require("../../schema/userModel");
const cloudinary = require("../../lib/cloudinaryConfig"); 
const { Readable } = require("stream");

const updateUser = async (req, res) => {
  try {
    const requestedUserId = req.params.id;
    const loggedInUser = req.user;

    if (!loggedInUser || !loggedInUser.id) {
      return res.status(401).json({ message: "Unauthorized access." });
    }

    const isSelf = requestedUserId === loggedInUser.id;
    const isAdmin = loggedInUser.role === "admin";

    if (!isSelf && !isAdmin) {
      return res.status(403).json({ message: "Forbidden: Access denied." });
    }

    // Fetch the user
    const user = await userModel.findById(requestedUserId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Handle profile picture upload
    if (req.file && req.file.buffer) {
      // If there's an old image, delete it first
      if (user.profilePicId && user.profilePicId !== "0") {
        await cloudinary.uploader.destroy(user.profilePicId);
      }

      // Upload new image to Cloudinary
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "user_profiles",
          resource_type: "image",
        },
        async (error, result) => {
          if (error) {
            return res.status(500).json({ message: "Image upload failed", error });
          }

          user.profilePicture = result.secure_url;
          user.profilePicId = result.public_id;

          // Now handle other fields
          const forbiddenFields = ["email", "password", "role"];
          const updates = req.body;

          for (let key of Object.keys(updates)) {
            if (!forbiddenFields.includes(key)) {
              user[key] = updates[key];
            }
          }

          await user.save();
          const { password, __v, ...safeUser } = user.toObject();
          res.status(200).json({
            message: "User updated with profile picture.",
            user: safeUser,
          });
        }
      );

      const bufferStream = Readable.from(req.file.buffer);
      bufferStream.pipe(stream);
    } else {
      // No image upload, just update other fields
      const forbiddenFields = ["email", "password", "role"];
      const updates = req.body;

      for (let key of Object.keys(updates)) {
        if (!forbiddenFields.includes(key)) {
          user[key] = updates[key];
        }
      }

      await user.save();
      const { password, __v, ...safeUser } = user.toObject();

      res.status(200).json({
        message: "User updated successfully.",
        user: safeUser,
      });
    }
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  updateUser,
};
