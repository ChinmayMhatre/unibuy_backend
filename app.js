const express = require('express')
const dotenv = require("dotenv")
const connect = require('./config/db')
dotenv.config({path:"./config/config.env"})

const app = express()
connect()

app.get('/',(req,res)=>{
    res.send("hello")
})

app.listen(process.env.PORT,()=>{
    console.log("listening at port 5000")
})