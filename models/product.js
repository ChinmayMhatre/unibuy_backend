const mongoose  = require('mongoose')
const Schema    = mongoose.Schema

const productSchema = new Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxLength:32
    },
    description:{
        type:String,
        trim:true,
        required:true,
        maxLength:2000
    },
    price:{
        type:Number,
        required:true,
        maxLength:32,
        trim:true
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category',
        require:true
    },
    stock:{
        type:Number,
    },
    sold:{
        type:Number,
        default:0
    },
    photo:{
        data:Buffer,
        contentType:String
    }
},{timestamps:true})

module.exports = mongoose.model('Product',productSchema)