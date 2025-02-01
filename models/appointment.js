const mongoose = require('mongoose');
const student = require('./student');

const appointmentSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    studentName: {type:String,required:true},
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher'},
    teacherName: {type:String,required:true},
    purpose: {type:String,required:true},
    date: { type: Date, required: true },
    status: { type: String, default: 'Pending', enum: ['Pending', 'Approved', 'Rejected']},
});

module.exports = mongoose.model('Appointment', appointmentSchema);
