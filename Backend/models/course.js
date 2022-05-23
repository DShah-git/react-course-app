const mongoose = require('mongoose')
const courseSchema = new mongoose.Schema({
    courseName:{
        type:String,
        required:true,
    },
    courseCode:{
        type:Number,
        required:true,
        unique:true
    },
    availableSections:{
        type:mongoose.Schema.Types.Mixed,
        required:true
    }
})

module.exports = mongoose.model('Course',courseSchema);