const express                       = require('express')
const router                        = express.Router()
const { signout,signup,signin,isSignedIn }            = require('../controllers/auth')
const { check }    = require('express-validator');


router.post('/signup',
            check("firstname","Please enter a name of atleast 2 characters")
            .isLength({ min: 2 }),
            check("email","Please enter a valid email")
            .isEmail(),
            // Todo: add more validations to the password
            check("password","Please enter a password greater than 6 characters")
            .isLength({ min: 6 }),
            signup
        )  

router.post('/signin',
            check("email","Please enter a valid email")
            .isEmail(),
            // Todo: add more validations to the password
            check("password","Please enter a valid password")
            .isLength({ min: 6 }),
            signin
        )

router
    .route("/signout")
    .get(signout)    

router.get('/test',isSignedIn,(req,res)=>{
    res.send("in protected")
})

    module.exports = router