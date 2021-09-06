const express       = require("express")
const {getCategoryById,createCategory}            = require("../controllers/category")
const {isSignedIn,isAuthenticated,isAdmin}            = require("../controllers/auth")
const {getUserById}            = require("../controllers/user")
const router        = express.Router()

// ? Will look for userId and category Id from the below request and
// ? Populate req.profile with user info and req.category with category 

router.param("userId",getUserById)
router.param("categoryId",getCategoryById)

// * Routes

router.post("/create/:userId",[isSignedIn,isAuthenticated,isAdmin],createCategory);



module.exports = router