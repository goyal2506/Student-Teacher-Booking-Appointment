const express = require('express');
const router = express.Router();
const Teacher = require("../models/teacher")
const Student = require("../models/student")
const Admin = require("../models/admin")
const Appointment = require("../models/appointment");
const session = require('express-session');

router.get('/login', (req, res) => {
    res.render('login')
})
router.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    let user = await Student.findOne({ email, password });
    if (user) {
        if (user.status == 'Approved') {
            return res.render('student/dashboard',{user});
        }
        else {
            return res.send('Login denied: your registration is not approved yet.');
        }
    }
    user = await Teacher.findOne({ email, password });
    if (user) {
        return res.render('teacher/dashboard', { user });
    }

    user = await Admin.findOne({ email, password });
    if (user) {
        const student =await Student.find();
        return res.render('admin/dashboard',{student});
    }
    res.send('Invalid credentials');
});



router.get('/signup', (req, res) => {
    res.render("signup");
})
router.post('/signup', async (req, res) => {
    const newStudent = new Student({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        p_no: req.body.p_no,
        gender: req.body.gender,
        class: req.body.class,
    })
    await newStudent.save();
    res.redirect('login')
})

router.get('/logout', (req, res) => {
    res.redirect('/signup')
})

module.exports = router;