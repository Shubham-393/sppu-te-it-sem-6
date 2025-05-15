const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/college_admission');

// Schema + Model
const Student = mongoose.model('Student', new mongoose.Schema({
  name: String,
  email: String,
  course: String
}));

// Routes
app.get('/students', (req, res) => {
  Student.find().then(function(data) {
    res.json(data);
  });
});

app.get('/students/:id', (req, res) => {
  Student.findById(req.params.id).then(function(data) {
    res.json(data);
  });
});

app.post('/students', (req, res) => {
  Student.create(req.body).then(function(data) {
    res.json(data);
  });
});

app.put('/students/:id', (req, res) => {
  Student.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(function(data) {
    res.json(data);
  });
});

app.delete('/students/:id', (req, res) => {
  Student.findByIdAndDelete(req.params.id).then(function() {
    res.send('Deleted');
  });
});

// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});