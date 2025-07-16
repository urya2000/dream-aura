const userModel = require("../../schema/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Login controller
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email." });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password." });
        }
        if (!user.isVerified) {
            return res.status(403).json({ message: "Please verify your email before logging in." });
        }
        // Update last_login
        user.last_login = new Date();
        await user.save();
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET || "secretkey",
            { expiresIn: "7d" }
        );
        res.status(200).json({
            message: "Login successful.",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                last_login: user.last_login
            },
            token
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    login
};


