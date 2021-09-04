const User = require("../models/user")
const Order = require("../models/order")

exports.getUserById = async (req,res,next,id)=>{
    try {
        let user = await User.findById(id).exec()    
        if(!user){
            return res.status(404).json({
                success:false,
                error:"User not found"
            })
        }
        req.profile = user
        next()
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:"server error"
        })
    }
    
}

exports.getUser = async (req,res)=>{
    req.profile.salt = undefined;
    req.profile.encrypt_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;

    return res.status(200).json({
        success:true,
        data : req.profile
    })
}

exports.updateUser = async (req,res)=>{
    if(req.body.hasOwnProperty("salt")){
        return res.status(403).json({
            success:false,
            error:"you can't do that"
        })
    }
    if(req.body.hasOwnProperty("encrypt_password")){
        return res.status(403).json({
            success:false,
            error:"you can't do that"
        })
    }
    try {
        let user = await User.findByIdAndUpdate({_id:req.profile._id},
            req.body,
            {new:true,useFindAndModify:false}
            )
            console.log("HEllo")
            user.salt = undefined;
            user.encrypt_password = undefined;
            user.createdAt = undefined;
            user.updatedAt = undefined;
        return res.status(200).json({
            success:true,
            data : user
        })    
    } catch (error) {
        return res.status(400).json({
            success:false,
            error:"something went wrong"
        })
    }
}

exports.userPurchaseList = async (req,res)=>{
    try {
        let order = await Order.find({user:req.profile._id}).populate("user","_id name")
        res.status(200).json({
            sucess:true,
            data:order
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            error:"something went wrong"
        })
    }
    
}