// controllers/userController.js
const User = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    res.json({
      message: "Users retrieved successfully",
      users: users,
      count: users.length
    });
  } catch (err) {
    console.error('Get all users error:', err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Validate ID
    if (!userId || isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    
    const user = await User.getById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      message: "User retrieved successfully",
      user: user
    });
  } catch (err) {
    console.error('Get user by ID error:', err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, age } = req.body;
    
    // Input validation
    if (!name || !email || age === undefined || age === null) {
      return res
        .status(400)
        .json({ message: "Name, email, and age are required" });
    }
    
    if (age < 0 || age > 150) {
      return res
        .status(400)
        .json({ message: "Age must be between 0 and 150" });
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: "Please provide a valid email address" });
    }
    
    const newUser = await User.create(name.trim(), email.trim().toLowerCase(), parseInt(age));
    res.status(201).json({
      message: "User created successfully",
      user: newUser
    });
  } catch (err) {
    console.error('Create user error:', err);
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const userId = req.params.id;
    
    // Input validation
    if (!name || !email || age === undefined || age === null) {
      return res
        .status(400)
        .json({ message: "Name, email, and age are required" });
    }
    
    if (age < 0 || age > 150) {
      return res
        .status(400)
        .json({ message: "Age must be between 0 and 150" });
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: "Please provide a valid email address" });
    }
    
    const updated = await User.update(userId, name.trim(), email.trim().toLowerCase(), parseInt(age));
    if (!updated) {
      return res
        .status(404)
        .json({ message: "User not found or no changes made" });
    }
    res.json({ message: "User updated successfully" });
  } catch (err) {
    console.error('Update user error:', err);
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Validate ID
    if (!userId || isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    
    const deleted = await User.delete(userId);
    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error('Delete user error:', err);
    res.status(500).json({ message: "Internal server error" });
  }
};
