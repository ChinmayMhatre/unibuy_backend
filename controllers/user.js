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
    return res.json({
        success:true,
        //  todo: come back for password
        data : res.profile
    })
}