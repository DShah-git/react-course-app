const express = require('express');
const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.use(express.json())

router.post('/register',async (req,res)=>{
    
    
    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send('Email Already Exist')

    const studentNumberExist = await User.findOne({studentNumber:req.body.studentNumber});
    if(studentNumberExist) return res.status(400).send('Student Number Already Exist')
    

    //Hash password

    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(req.body.password,salt);

    const user = new User({
        fName:req.body.fName,
        lName:req.body.lName,
        email:req.body.email,
        studentNumber:req.body.studentNumber,
        address:req.body.address,
        password:hashPassword,
        courses:[]
    });


    await user.save().then((result) => {
        res.send("Registered")
    }).catch((err) => {
        res.status(400).send(err)
    });;
    
});

router.post('/login', async (req,res)=>{
    
    const student = await User.findOne({studentNumber:req.body.studentNumber});
    if(!student) return res.status(400).send("Student number not registered")

    checkPassword = await bcrypt.compare(req.body.password,student.password)
    if(!checkPassword) return res.status(400).send("Incorrect password")

    //Create and assign token
    const token = jwt.sign({_id:student._id},process.env.TOKEN_SECRET);

    res.send(token);
})


module.exports = router;
