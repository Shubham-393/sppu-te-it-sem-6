const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    course: {
        type: String,
        required: true,
        enum: ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering']
    },
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Accepted', 'Rejected'],
        default: 'Pending'
    },
    applicationDate: {
        type: Date,
        default: Date.now
    },
    documents: {
        highSchoolMarks: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        },
        entranceExamScore: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        }
    }
});

module.exports = mongoose.model('Student', studentSchema); 