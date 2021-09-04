const User = require("../models/user")

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

    return res.json({
        success:true,
        data : req.profile
    })
}