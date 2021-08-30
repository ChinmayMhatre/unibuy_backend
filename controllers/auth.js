const User = require('../models/user')
const {validationResult } = require('express-validator');

exports.signup = async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            success:false,
            errors: errors.array() 
        });
    }
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
        return res.status(500).json({
            success:false,
            error:"create failed"
        })
    }
}

exports.signout = (req,res)=>{
    res.json({
        message:"user signout"
    })
}


