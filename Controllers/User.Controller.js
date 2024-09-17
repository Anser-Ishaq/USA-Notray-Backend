const User = require("../models/User.Model");
const bcrypt = require("bcryptjs");

// @access  Public
const registerUser = async (req, res) => {
  const { username, email, password, role, privileges } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      username,
      email,
      password: hashedPassword,
      role,
      privileges,
      label: username,
      value: username,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @access  Public
const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    // Validate pagination parameters
    if (page < 1 || pageSize < 1) {
      return res
        .status(400)
        .json({ error: "Page and pageSize must be positive integers" });
    }

    const users = await User.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    // Get total count of users
    const totalUsers = await User.countDocuments();
    const totalPages = Math.ceil(totalUsers / pageSize);

    // Respond with paginated data
    res.json({
      totalUsers,
      totalPages,
      currentPage: page,
      pageSize,
      users,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await User.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User deleted successfully", user: result });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

// UPDATE USERS

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password, role, privileges } = req.body;

  try {
    // Find the user by ID
    let user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if email is already in use by another user
    if (email) {
      const existingUser = await User.findOne({ email, _id: { $ne: id } });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    // Update user details
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
    if (role) user.role = role;
    if (privileges) user.privileges = privileges;

    await user.save();
    res.status(200).json({ message: "User updated successfully", user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// UPDATE USER NAME AND EMAIL

const updateUserEmailAndName = async (req, res) => {
  const { username, email } = req.body;
  const userId = req.params.id;

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser && existingUser._id.toString() !== userId) {
      return res
        .status(400)
        .json({ message: "User with this email already exists." });
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      message: "User details updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// UPDATE USER PASSWORD

const updateUserPassword = async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  const userId = req.params.id;

  try {
    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required." });
    }
    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "New password and confirm password do not match." });
    }

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Current password is incorrect." });
    }

    // Hash new password and update user
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    for (const user of users) {
      const label = `${user.username}`;
      const value = label;
      user.label = label;
      user.value = value;

      await user.save();
    }
    res.status(200).json({ message: "Users Updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getOnlyNotaryUsers = async (req, res) => {
  try {
    const notaryUsers = await User.find(
      { role: "Notary Users" },
      "email label value _id"
    );
    res.json(notaryUsers);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching notary users" });
  }
};

module.exports = {
  registerUser,
  getUsers,
  deleteUser,
  updateUser,
  updateUserEmailAndName,
  updateUserPassword,
  updateAllUsers,
  getOnlyNotaryUsers,
};
