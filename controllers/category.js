const Category = require("../models/category")

exports.getCategoryById = async (req,res,next,id)=>{
    try {
        let category = Category.findById(id)
        req.category = category
        next()
    } catch (error) {
        return res.status("400").json({
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
        return res.status("400").json({
            success:false,
            error:"Unable to add category"
        })
    }
}

exports.getCategory = async (req,res)=>{
    return res.status(200).json({
        success:true,
        data : req.category
    })
}

exports.getAllCategories = async (req,res)=>{
    try {
        let categories = await Category.find()
        return res.status(201).json({
            success:true,
            data:categories
        })
    } catch (error) {
        return res.status("400").json({
            success:false,
            error:"Unable to get all categories"
        })
    }
}

exports.updateCategory = async (req,res)=>{
    try {
        let category = await Category.findByIdAndUpdate({_id:req.category._id},
                                        {$set : {name:req.body.name}},
                                        {new:true,useFindAndModify:false})
        return res.status(201).json({
            success:true,
            data:category
        })
    } catch (error) {
        return res.status("400").json({
            success:false,
            error:"Unable to update category"
        })
    }
}

exports.removeCategory = async (req,res)=>{
    try {
        let category = req.category;
        let removedCategory = await category.remove()
        return res.status(201).json({
            success:true,
            data:`${removedCategory.name} sucessfully deleted`
        })
    } catch (error) {
        return res.status("400").json({
            success:false,
            error:`Unable to delete ${category.name}`
        })
    }
    
}