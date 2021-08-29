const User = require('../models/user')

exports.signup = async (req,res)=>{
    try {
        const user = await User.create(req.body)
    return res.status(201).json({
        success:true,
        data:{
            firstname:user.firstname,
            email:user.email,
            id:user._id
        }
    })
    } catch (error) {
        if(error.name === "ValidationError"){
            const messages = Object.values(error.errors).map(val =>val.message);
            
                return res.status(400).json({
                    success:false,
                    error:messages
                })
            }else{
                return res.status(500).json({
                    success:false,
                    error:"create failed"
                })
            }
    }
    
}

exports.signout = (req,res)=>{
    res.json({
        message:"user signout"
    })
}


