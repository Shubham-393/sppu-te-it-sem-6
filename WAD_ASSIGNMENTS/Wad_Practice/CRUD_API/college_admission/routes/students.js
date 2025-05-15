const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// GET all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET single student by ID
router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST new student
router.post('/', async (req, res) => {
    const student = new Student({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        course: req.body.course,
        documents: {
            highSchoolMarks: req.body.documents.highSchoolMarks,
            entranceExamScore: req.body.documents.entranceExamScore
        }
    });

    try {
        const newStudent = await student.save();
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT update student
router.put('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Update fields
        if (req.body.name) student.name = req.body.name;
        if (req.body.email) student.email = req.body.email;
        if (req.body.phone) student.phone = req.body.phone;
        if (req.body.course) student.course = req.body.course;
        if (req.body.status) student.status = req.body.status;
        if (req.body.documents) {
            if (req.body.documents.highSchoolMarks) {
                student.documents.highSchoolMarks = req.body.documents.highSchoolMarks;
            }
            if (req.body.documents.entranceExamScore) {
                student.documents.entranceExamScore = req.body.documents.entranceExamScore;
            }
        }

        const updatedStudent = await student.save();
        res.json(updatedStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE student
router.delete('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        await student.deleteOne();
        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 