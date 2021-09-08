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
        // todo restriction on field
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
                error:"add product to db failed"
            })
        }
    })
}