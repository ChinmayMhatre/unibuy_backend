const Product               = require("../models/product")
const formidable            = require("formidable")
const _                     = require("lodash")
const fs                    = require("fs")


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

exports.createProduct = async (req,res)=>{
    let form = new formidable.IncomingForm();
    form.parse(req,async (err,fields,file)=>{
        if(err){
            return res.status(400).json({
                success:false,
                error:"something went wrong"
            })
        }

        const {name,description,price,category,stock} = fields

        if(
            !name ||
            !description ||
            !price ||
            !category ||
            !stock
        ){
            return res.status(400).json({
                success:false,
                error:"Please include all fields"
            })
        }

        let product = new Product(fields)
        if(file.photo){
            if(file.photo.size > 1024*1024*3){
                return res.status(400).json({
                    success:false,
                    error:"file size exceeded"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }
        //* save to db 
        try {
            let addedProduct = await product.save()
            return res.status(400).json({
                success:true,
                data:addedProduct
            })
        } catch (error) {
            return res.status(400).json({
                success:false,
                error:error
            })
        }
    })
}

exports.getProduct = async (req,res)=>{
    try {
        req.product.photo = undefined
        return res.status("200").json({
            success:true,
            data:req.product
        })
    } catch (error) {
        return res.status("400").json({
            success:false,
            error:"something went wrong"
        })
    }
}

exports.deleteProduct = async (req,res)=>{
    try {
        let removed = await Product.findByIdAndDelete({_id:req.Product._id})
        return res.status("200").json({
            success:true,
            data:removed
        })
    } catch (error) {
        return res.status("400").json({
            success:false,
            error:error
        })
    }
    
}

exports.updateProduct = async (req,res)=>{
    let form = new formidable.IncomingForm();
    form.parse(req,async (err,fields,file)=>{
        if(err){
            return res.status(400).json({
                success:false,
                error:"something went wrong"
            })
        }

        const {name,description,price,category,stock} = fields

        let product = req.Product
        product = _.extend(product,fields)

        if(file.photo){
            if(file.photo.size > 1024*1024*3){
                return res.status(400).json({
                    success:false,
                    error:"file size exceeded"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }
        //* save to db 
        try {
            let updatedProduct = await product.save()
            return res.status(400).json({
                success:true,
                data:updatedProduct
            })
        } catch (error) {
            return res.status(400).json({
                success:false,
                error:error
            })
        }
    })
}

//* middleware
exports.loadphoto = async (req,res,next)=>{
    if(req.product.photo.data){
        res.set("Content-Type",req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next()
}