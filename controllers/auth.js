const User = require('../models/user')
const {validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');


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

exports.signin = (req,res)=>{
    const {email,password} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            success:false,
            errors: errors.array() 
        });
    }
        User.findOne({email},(error,user)=>{
            if(error ||!user){
                return res.status(400).json({
                    success:false,
                    error:"User does not exist"
                })
            }
            if(!user.authenticate(password)){
                return res.status(400).json({
                    success:false,
                    error:"Email and Password do not match"
                })
            }
            //* create token 
            const token = jwt.sign({_id:user._id},process.env.SECRET)

            //* put token inside the cookie
            res.cookie("token",token,{expire:new Date() + 9999})

            //* send response to frontend
            const {_id,firstname,email,role} = user;
            res.status(200).json({
                success:true,
                token,
                user:{
                    _id,
                    firstname,
                    email,
                    role
                }
            })
        })
    
}


exports.signout = (req,res)=>{
    res.json({
        message:"user signout"
    })
}


