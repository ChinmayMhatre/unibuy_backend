const express       = require("express")
const {getCategoryById,createCategory,getCategory,getAllCategories,updateCategory,removeCategory}       = require("../controllers/category")
const {isSignedIn,isAuthenticated,isAdmin}                                                              = require("../controllers/auth")
const {getUserById}                                                                                     = require("../controllers/user")
const router                                                                                            = express.Router()

// ? Will look for userId and category Id from the below request and
// ? Populate req.profile with user info and req.category with category 

router.param("userId",getUserById)
router.param("categoryId",getCategoryById)

// * Routes
// create
router.post("/create/:userId",[isSignedIn,isAuthenticated,isAdmin],createCategory);

// read
router.get("/:categoryId",getCategory)
router.get("/all",getAllCategories)

//  update
router.put("/update/:categoryId/:userId",[isSignedIn,isAuthenticated,isAdmin],updateCategory)

// delete
router.delete("/update/:categoryId/:userId",[isSignedIn,isAuthenticated,isAdmin],removeCategory)

module.exports = router