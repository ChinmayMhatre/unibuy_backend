const Category = require("../models/category")

exports.getCategoryById = async (req,res,next,id)=>{
    try {
        let category = await Category.findById(id).exec()
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
    let category = req.category
    category.name = req.body.name
    try {
        //? alternative
        //? let updatedcategory = await Category.findByIdAndUpdate({_id:req.category._id},{$set : {name:req.body.name}},{new:true,useFindAndModify:false})
        let updatedcategory = await category.save()
        return res.status(201).json({
            success:true,
            data:updatedcategory
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
        let category = req.category
        // ? optional method
        // ?let removedCategory = await Category.findByIdAndDelete({_id:req.category._id})
        let removedCategory = await category.remove()
        return res.status(201).json({
            success:true,
            data:`${removedCategory.name} sucessfully deleted`
        })
    } catch (error) {
        console.log(error)
        return res.status("400").json({
            success:false,
            error:`Unable to delete `
        })
    }
    
}