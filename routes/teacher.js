const express = require('express');
const router = express.Router();
const Teacher = require("../models/teacher")
const Student = require("../models/student")
const Appointment = require("../models/appointment");
const Message = require('../models/message')
const session = require('express-session');

router.get("/teacher/messages/:id",async(req, res)=>{
  const id =req.params.id;
  const teachers = await Teacher.findById(id);
  const messages = await Message.find({teacher:id,status:"UnRead"});
  res.render('teacher/messages', {teachers , messages })
})
router.get('/teacher/profile/:id', async(req, res) => {
    const id =req.params.id;
    const teachers = await Teacher.findById(id);
    res.render('teacher/profile', {teachers });
  });
  router.get('/teacher/appointments/:id',async(req,res)=>{
    const id = req.params.id;
    const teachers = await Teacher.findById(id);
    const pendings = await Appointment.find({teacher:id});
    res.render("teacher/appointments",{pendings ,teachers})
})
router.get('/teacher/appointment-request/:id',async(req,res)=>{
    const id = req.params.id;
    const teachers = await Teacher.findById(id);
    const pendings = await Appointment.find({status:"Pending",teacherName:teachers.name});
    res.render("teacher/appointment-request",{pendings , teachers})
})
router.post('/appointment/reject/:id',async(req,res)=>{
  const id = req.params.id;
  const a = await Appointment.findById(id)
  const teachers = await Teacher.findById(a.teacher);
  const appointment = await Appointment.findByIdAndUpdate(id, { status: 'Rejected' }, { new: true });
  const pendings = await Appointment.find({status:"Pending",teacher:a.teacher});
  res.render('teacher/appointment-request',{pendings,teachers})
})
router.post('/appointment/approve/:id',async(req,res)=>{
  const id = req.params.id;
  const a = await Appointment.findById(id)
  const teachers = await Teacher.findById(a.teacher);
  const appointment = await Appointment.findByIdAndUpdate(id, { status: 'Approved' }, { new: true });
  const pendings = await Appointment.find({status:"Pending",teacher:a.teacher});
  res.render('teacher/appointment-request',{pendings,teachers})
})
router.post('/schedule/:id',async(req,res)=>{
  const id = req.params.id;
  const a = await Appointment.findById(id)
  const teachers = await Teacher.findById(a.teacher);
  const appointment = await Appointment.findByIdAndUpdate(id, {date:req.body.date }, { new: true });
  const pendings = await Appointment.find({status:"Pending",teacher:a.teacher});
  res.render('teacher/appointment-request',{pendings,teachers})
})
router.post('/Reead-message/:id',async(req,res)=>{
  const id = req.params.id;
  const a = await Message.findById(id)
  const teachers = await Teacher.findById(a.teacher);
  const message = await Message.findByIdAndUpdate(id, { status: 'Read' }, { new: true });
  const messages = await Message.find({status:"UnRead"});
  res.render('teacher/messages', { teachers, messages })
})
module.exports = router;