const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    fName:{
        type:String,
        required:true
    },
    lName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    studentNumber:{
        type:Number,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:true,
        min:6
    },
    courses:{
        type:mongoose.Schema.Types.Array,
        required:false
    }
});


module.exports = mongoose.model('User',userSchema);