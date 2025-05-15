const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://youtubepy:youtubepy@cluster0.hlekbr4.mongodb.net/user_db?retryWrites=true&w=majority&appName=Cluster0)").then(() => console.log("✅ Connected to MongoDB")).catch((err) => console.error("❌ MongoDB Error:", err));

// 4 CRUD APIs


// Create - Register User
app.post('/api/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read - Get User by Email
app.get('/api/users/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update - Update User by Email
app.put('/api/users/:email', async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete - Delete User by Email
app.delete('/api/users/:email', async (req, res) => {
  try {
    const result = await User.findOneAndDelete({ email: req.params.email });
    if (!result) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Server listen
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
