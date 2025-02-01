const express = require('express');
const router = express.Router();
const Teacher = require("../models/teacher")
const Student = require("../models/student")
const Appointment = require("../models/appointment");
const Message = require('../models/message')
const session = require('express-session');

router.get('/student/dashboard',(req,res)=>{
  res.render('student/dashboard')
})
router.get('/student/profile/:id', async(req, res) => {
    const id =req.params.id;
    const students = await Student.findById(id);
    res.render('student/student-profile', {students });
  });
router.get('/student/appointment/:id',async(req,res)=>{
    const id =req.params.id;
    const appointments = await Appointment.find({ student:id });
    const studentName = await Student.findById(id)
    
    res.render('student/appointment',{appointments,studentName })
})
router.get('/student/book-appointment/:id',async(req,res)=>{
    const id =req.params.id;
    const studentInfo = await Student.findById(id)
    const teachers = await Teacher.find();
    res.render('student/book-appointment',{teachers , studentInfo})
})

router.post('/student/book-appointment/:id',async(req,res)=>{
  const id =req.params.id;
    const studentInfo = await Student.findById(id)
    const teachers = await Teacher.find();
    const newApppointment = new Appointment({
            student:req.body.student,
            studentName:req.body.studentName,
            teacherName:req.body.teacherName,
            teacher:req.body.teacher,
            purpose:req.body.purpose,
            date:req.body.date,

        })
        await newApppointment.save();
       res.render('student/book-appointment',{teachers , studentInfo})
})
router.get('/student/teacher-list/:id',async(req,res)=>{
  const id =req.params.id;
  const studentInfo = await Student.findById(id)
  const teachers = await Teacher.find();
  res.render('student/teacher',{teachers ,studentInfo})
})
router.get('/student/message/:id',async(req,res)=>{
  const id =req.params.id;
  const studentInfo = await Student.findById(id)
  const teachers = await Teacher.findById(req.query.t_id);
  res.render('student/message',{studentInfo,teachers})
})
router.post('/student/message/:id',async(req,res)=>{
  const id =req.params.id;
  const studentInfo = await Student.findById(id)
  const teachers = await Teacher.find();
  const newMessage = new Message({
    student:req.body.student,
    studentName:req.body.studentName,
    teacher:req.body.teacher,
    message:req.body.message,
    date:new Date(),

})
await newMessage.save();
  res.render('student/teacher',{studentInfo,teachers})
})

module.exports = router;
