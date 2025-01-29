const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    p_no:{type:String,required:true},
    gender:{type:String,required:true,enum: ['male', 'female']},
    class:{type:String,required:true},
    password:{type:String,required:true},
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
});

module.exports = mongoose.model('Student', studentSchema);
