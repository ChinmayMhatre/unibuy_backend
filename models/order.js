const mongoose      = require('mongoose')
const Schema        = mongoose.Schema
const {ObjectId}    = Schema.Types 

const cartProductSchema = new Schema({
    product:{
        type:ObjectId,
        ref:'Product'
    },
    name: String,
    count: Number,
    price: Number
})

const CartProduct = mongoose.model('CartProduct',cartProductSchema)

const orderSchema = new Schema({
    products:[cartProductSchema],
    transaction_id:{},
    amount :{type:Number},
    address: String,
    updated: Date,
    user: {
        type:ObjectId,
        ref:'User'
    }
},{timestamps:true})

const Order = mongoose.model('Order',orderSchema)

module.exports = {Order,CartProduct}