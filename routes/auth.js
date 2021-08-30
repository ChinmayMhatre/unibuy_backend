const express                       = require('express')
const router                        = express.Router()
const { signout,signup }            = require('../controllers/auth')
const { check }    = require('express-validator');


router
    .route("/signout")
    .get(signout)

router
    .use([
        check("firstname","Please enter a name of atleast 2 characters")
            .isLength({ min: 2 }),
        check("email","Please enter a valid email")
            .isEmail(),
            // Todo: add more validations to the password
        check("password","Please enter a password greater than 6 characters")
            .isLength({ min: 6 })
    ])
    .route('/signup')
    .post(signup)    

module.exports = router