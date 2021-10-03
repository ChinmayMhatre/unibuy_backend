const express           = require('express')
const dotenv            = require("dotenv")
dotenv.config({path:"./config/config.env"})
const connect           = require('./config/db')
const cookieParser      = require('cookie-parser')
const cors              = require('cors')

const authRoutes            = require('./routes/auth')
const userRoutes            = require('./routes/user')
const categoryRoutes        = require('./routes/category')
const productRoutes        = require('./routes/product')
const orderRoutes        = require('./routes/order')

const app               = express()


//* DB Connect 
connect()

//* Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//* Routes 
app.use('/api',authRoutes)
app.use('/api/user',userRoutes)
app.use('/api/category',categoryRoutes)
app.use('/api/product',productRoutes)
app.use('/api/order',orderRoutes)

//* server start
app.listen(process.env.PORT,()=>{
    console.log("listening at port 5000")
})