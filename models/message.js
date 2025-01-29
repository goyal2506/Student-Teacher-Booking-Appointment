const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    studentName:{type:String,required:true},
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
    message: {type:String,required:true},
    date: { type: Date},
    status: { type: String, enum: [ 'Read', 'UnRead'], default: 'UnRead' },
});

module.exports = mongoose.model('Message', messageSchema);
