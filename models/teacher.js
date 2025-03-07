const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    specialization: { type: String ,required:true},
    password:{type:String,required:true},
    teacher_photo:{type:String,required:true},
});

module.exports = mongoose.model('Teacher', teacherSchema);
