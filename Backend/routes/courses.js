const express = require('express');
const router = require('express').Router();
const verify = require('./verifyToken');
const Course = require('../models/course');
const User = require('../models/user')

router.use(express.json())

router.get('/courses',verify,async (req,res)=>{
    AllCourses = await Course.find();
    res.send(AllCourses);
})

router.post('/registercourse',verify,async(req,res)=>{
    //get student
    var studentId  = req.user._id;
    var student; 
    await User.findById(studentId).then((result) => {
        student = result
    }).catch((err) => {
        return res.send(err)
    });

    //get request
    var courseId = req.body.courseId;
    var section = req.body.section;
    var courseCode = req.body.courseCode;
    var courseName = req.body.courseName;
    
    //check if course already registered
    for(var i=0;i<student.courses.length;i++){
        var courseInfo = student.courses[i].split(',');
        if(courseInfo[0] == courseId)
            return res.status(400).send("Course Already Added")
            
    }

    var registeredCourse = courseId+","+section+","+courseCode+","+courseName

    student.courses.push(registeredCourse);

    await student.save().then((result) => {
        return res.send(result)
    }).catch((err) => {
        return res.status(400).send(err);
    });
})


router.post('/courseSection',async(req,res)=>{
    id =req.body.courseId;
    await Course.findById(id).then((result) => {
        return res.send(result.availableSections)
    }).catch((err) => {
        return res.status(400).send(err)
    });
})


router.post('/unregistercourse',verify,async(req,res)=>{
    //get student
    var studentId  = req.user._id;
    var student; 
    await User.findById(studentId).then((result) => {
        student = result
    }).catch((err) => {
        return res.send(err)
    });

    //get request
    var courseId = req.body.courseId;
    //check if course is registered
    for(var i=0;i<student.courses.length;i++){
        var courseInfo = student.courses[i].split(',');
        console.log(courseInfo[0])
        if(courseInfo[0] == courseId)
        {
            student.courses.splice(i,1)
            await student.save().then((result) => {
                return res.send(result)
            }).catch((err) => {
                return res.status(400).send(err)
            });
        }   
    }

    res.status(400).send("Course Not Found")

})



router.post('/changeSection',verify,async(req,res)=>{
    //get student
    var studentId  = req.user._id;
    var student; 
    await User.findById(studentId).then((result) => {
        student = result
    }).catch((err) => {
        return res.send(err)
    });


    var courseIndex = req.body.index;
    var section = req.body.section;

    var course = student.courses[courseIndex].split(',');
    course[1] = section;
    course = course.join(",");
    student.courses[courseIndex] = course;

    await student.save().then((result) => {
        return res.send(result)
    }).catch((err) => {
        return res.status(400).send(err);
    });


})



module.exports = router;