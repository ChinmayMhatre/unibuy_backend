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
    res.clearCookie("token")
    res.json({
        success:true,
        message:"user signout success"
    })
}


exports.isSignedIn = expressJwt({
    secret : process.env.SECRET,
    requestProperty:"auth"
})

//* middleware

exports.isAuthenticated = (req,res,next)=>{
    let checker = req.profile && req.auth && req.auth._id === req.profile._id
    if(!checker){
        return res.status(403).json({
            success:false,
            error:"ACCESS DENIED"
        })
    }
    next();
}

exports.isAdmin = (req,res,next)=>{
    if(req.profile.role === 0){
        return res.status(403).json({
            success:false,
            error:"ACCESS DENIED"
        })
    }
    next();
}
