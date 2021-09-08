const Product = require("../models/product")

exports.getProductById = async (req,res,next,id)=>{
    try {
        let product = await Product.findById(id).populate("category").exec()
        req.Product = product
        next()
    } catch (error) {
        return res.status("400").json({
            success:false,
            error:"Product not Found"
        })
    }
}