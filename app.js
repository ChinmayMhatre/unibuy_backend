const express           = require('express')
const dotenv            = require("dotenv")
dotenv.config({path:"./config/config.env"})
const connect           = require('./config/db')
const cookieParser      = require('cookie-parser')
const cors              = require('cors')
const authRoutes        = require('./routes/auth')
const app               = express()


//* DB Connect 
connect()

//* Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//* Routes 
app.use('/api',authRoutes)

//* server start
app.listen(process.env.PORT,()=>{
    console.log("listening at port 5000")
})