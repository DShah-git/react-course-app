const express = require('express');
const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../models/user')

router.use(express.json())

router.get('/',verify,async (req,res)=>{
    studentId  = req.user._id;
    await User.findById(studentId).then((result) => {
        result.password = undefined
        result._id = undefined
        res.send(result)
    }).catch((err) => {
        res.status(400).send("Not Found");
    });
})


router.get('/all',async(req,res)=>{
    await User.find().then((result) => {
        result =result.map((student)=>{
            student.password=undefined
            student._id=undefined
            return student;
        })

        res.send(result)
    }).catch((err) => {
        res.status(400).send("Not available")
    });
})


module.exports = router;