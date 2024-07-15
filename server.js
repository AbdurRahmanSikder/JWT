const express = require('express');
const { Connection } = require('mongoose');
const app = express();
const mongoose = require('mongoose');
const router = require('./routes/userRoute.js')

app.use('/api', router);




mongoose.connect("mongodb://127.0.0.1:27017/Authentication")
.then(() => {app.listen(3000)})
.then(() => {console.log("Server listen on port 3000")});

app.use('/',(req,res)=>{res.send("Hello world")});