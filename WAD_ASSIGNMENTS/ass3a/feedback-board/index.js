// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');

dotenv.config();
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// MongoDB Connection
mongoose.connect("mongodb+srv://youtubepy:youtubepy@cluster0.hlekbr4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
).then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// Schema
const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now }
});
const Feedback = mongoose.model('Feedback', feedbackSchema);

// Routes
app.post('/submit-feedback', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    await Feedback.create({ name, email, message });
    res.send(`<h2>Thank you for your feedback!</h2><a href="/">Go back</a>`);
  } catch (err) {
    res.status(500).send('Something went wrong');
  }
});

app.get('/feedbacks', async (req, res) => {
  const feedbacks = await Feedback.find().sort({ date: -1 });
  let html = '<h2>All Feedbacks</h2><ul>';
  feedbacks.forEach(fb => {
    html += `<li><strong>${fb.name}</strong>: ${fb.message} (${fb.email})</li>`;
  });
  html += '</ul><a href="/">Go back</a>';
  res.send(html);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
