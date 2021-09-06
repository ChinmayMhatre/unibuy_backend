const express       = require("express")
const {getCategoryById}            = require("../controllers/category")
const {isSignedIn,isAuthenticated,isAdmin}            = require("../controllers/auth")
const {getUserById}            = require("../controllers/user")
const router        = express.Router()

// ? will look for userId and category Id from the below request and
// ? populate req.profile with user info and req.category with category 
router.param("userId",getUserById)
router.param("categoryId",getCategoryById)


module.exports = router