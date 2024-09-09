// auth.Controller.js
const User = require("../models/User.Model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  const { email, password } = req.body; // Assuming the client sends email and password in the request body
  console.log("login email and password", email, password);
  try {
    // Check if user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." }); // User does not exist
    }

    // Verify if the provided password matches the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." }); // Password does not match
    }

    // Generate JWT token since the user exists and the password matches
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      "8adb2800f5919d341a7cd25702cc02745e7759390b2c3332bcaf1e0c6cd268b7",
      { expiresIn: "2h" }
    );

    return res
      .status(200)
      .json({ message: "Login successful!", user: user, token });
  } catch (error) {
    return res.status(500).json({ message: "Server error." }); // Handle unexpected server errors
  }
};

module.exports = { loginUser };
