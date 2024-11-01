const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const User = require("../models/User");

const router = express.Router();
require("dotenv").config();
// Registration route
router.post("/register", async (req, res) => {
  try {
    const { username, password, firstname, lastname } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      password: hashedPassword,
      firstname,
      lastname,
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to register user" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("username in login route", username);
    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create and return JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("token", token);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
    console.error("Error:", error);
  }
});

// Get user details
router.get("/user", authMiddleware, async (req, res) => {
  try {
  
    // Get user details without password
    const userInfo = await User.findById(req.user.id).select("-password");
    res.json(userInfo);
  
    console.log("userInfo:", userInfo);
  
  } catch (error) {
  console.error("Error:", error);
  res.status(500).json({ error: "Failed to retrieve user" });
  }
  });
  
  // Update user details
  router.put("/user/:id", authMiddleware, async (req, res) => {
  try {
    const { firstname, lastname, username } = req.body;
  
    // Find user by id
    const user = await User.findById({_id:req.params.id});
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
  
    // Update user details
    user.firstname = firstname;
    user.lastname = lastname;
    user.username = username;
  
    // Save updated user
    const updatedUser = await user.save();
    res.json(updatedUser);
  
    console.log("User updated from to", updatedUser);
  
  } catch (error) { 
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
  }
  );

module.exports = router;
