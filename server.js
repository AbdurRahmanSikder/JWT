const express = require('express');
const { Connection } = require('mongoose');
const app = express();
const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/Authentication")
.then(() => {app.listen(3000)})
.then(() => {console.log("Connection done on port 3000")});