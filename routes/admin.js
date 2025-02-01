const express = require('express');
const router = express.Router();
const Teacher = require("../models/teacher")
const Student = require("../models/student")
const Admin = require("../models/admin")
const Appointment = require("../models/appointment");
const session = require('express-session');

router.get('/admin/dashboard',(req,res)=>{
    res.render('admin/dashboard',)
})
router.get('/login/admin_profile',async(req,res)=>{
    const admins = await Admin.find();
    res.render('admin/profile',{admins})
})
router.get("/login/student-list",async(req,res)=>{
    const pendings = await Student.find({ status: 'Pending' });
    const students = await Student.find();
    res.render('admin/student-list.ejs',{students , pendings})
})
router.post('/approve/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findByIdAndUpdate(id, { status: 'Approved' }, { new: true });
        res.redirect('/login/student-list')
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/reject/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findByIdAndUpdate(id, { status: 'Rejected' }, { new: true });
        res.status(200).json({ message: 'Student rejected successfully!', student });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get("/login/teacher-list",async(req,res)=>{
    const teachers = await Teacher.find();
    res.render('admin/teacher-list.ejs',{teachers})
})
router.post('/add/teacher-list',async(req,res)=>{
    const newTeacher = new Teacher({
        name: req.body.name ,
        email: req.body.email ,
        password:req.body.password,
        specialization:req.body.specialization,
        teacher_photo:req.body.teacher_photo,
    })
    try{
        await newTeacher.save();
    }
    catch(err){
        res.send(err)
    }
    res.redirect('/login/teacher-list')
})
router.post('/teacher/:id', async (req, res) => {
      const result = await Teacher.findByIdAndDelete(req.params.id);
  });

module.exports = router;