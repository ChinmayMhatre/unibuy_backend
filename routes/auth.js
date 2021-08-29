const express   = require('express')
const router    = express.Router()
const { signout,signup }   = require('../controllers/auth')

router
    .route("/signout")
    .get(signout)

router
    .route('/signup')
    .post(signup)    

module.exports = router