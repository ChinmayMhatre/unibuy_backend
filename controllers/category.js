const Category = require("../models/category")

exports.getCategoryById = async (req,res,next,id)=>{
    try {
        let category = Category.findById(id)
        req.category = category
        next()
    } catch (error) {
        res.status("400").json({
            success:false,
            error:"Not Found"
        })
    }
}