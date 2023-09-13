const express = require("express");
const app = express();
const adminRoute = require('./routes/admin')
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require("mongoose");


app.use(morgan())
app.use(cors())
app.use(express.json())
app.use("/admin" , adminRoute)

mongoose.connect("mongodb+srv://interview1234:1234@cluster1.bn7rjnl.mongodb.net/").then((result)=>{
    console.log("mongoose is connected")
}).catch((error)=>{
    console.log('Error in connecting to mongoDB \n \n', error);
})

app.listen(4000, ()=> console.log("app is running"))
