const {Order,CartProduct} = require("../models/order")

exports.getOrderById = async (req,res,next,id)=>{
    try {
        const order = await Order.findById(id).populate("products.product","name price")
        req.order = order
        next()
    } catch (error) {
        return res.status("400").json({
            success:false,
            error:"Order not Found"
        })
    }
}

exports.createOrder = async (req,res) =>{
    req.body.order.user = req.profile
    const order = new Order(req.body.order)
    try {
        const list = await order.save()
        return res.status("200").json({
            success:true,
            data:list
        })
    } catch (error) {
        return res.status("400").json({
            success:false,
            error:"Order failed"
        })
    }
    
}