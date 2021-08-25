const express       = require('express')
const dotenv        = require("dotenv")
const connect       = require('./config/db')
const cookieParser  = require('cookie-parser')
const cors           = require('cors')
const app           = express()
dotenv.config({path:"./config/config.env"})

//* DB Connect 
connect()

//* Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//* Routes 
app.get('/',(req,res)=>{
    res.send("hello")
})

app.listen(process.env.PORT,()=>{
    console.log("listening at port 5000")
})