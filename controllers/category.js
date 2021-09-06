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

exports.createCategory = async (req,res) =>{
    try {
        const category = await Category.create(req.body)
        return res.status(201).json({
            success:true,
            data:category
        })
    } catch (error) {
        res.status("400").json({
            success:false,
            error:"Unable to add category"
        })
    }
}