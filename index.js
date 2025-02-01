const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const Student = require("./models/student")
const Teacher = require("./models/teacher")
const Admin = require("./models/admin");
const Appointment = require("./models/appointment");
const studentRoutes = require('./routes/student');
const teacherRoutes = require('./routes/teacher');
const adminRoutes = require('./routes/admin');
const Message = require('./models/message')
const login_signupRoutes = require('./routes/login-signup')
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(
    session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 30 * 60 * 1000 }
    })
  );
mongoose.connect("mongodb://localhost:27017/appointment-system")
.then(()=>{
    console.log("mongo connected")
})
.catch(()=>{
    console.log("not connected")
})

app.use('/', studentRoutes);
app.use('/', adminRoutes);
app.use('/', teacherRoutes);
app.use('/', login_signupRoutes)



app.get('/',(req,res)=>{
    res.render('home')
})

app.listen("1234",()=>{
    console.log("server started at 1234")
})