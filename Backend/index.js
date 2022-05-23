const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
dotenv.config();

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
()=>console.log('connected to mongodb'))


//Middleware
app.use(bodyParser.json());
app.use(cors());

//import routes
const authRoute = require('./routes/auth');
const profile = require('./routes/profile')
const course = require('./routes/courses')




//Route Middleware
app.use('/api/user',authRoute);
app.use('/api/profile',profile);
app.use('/api/courses',course);







app.listen(4000,()=>console.log('Server Started'));