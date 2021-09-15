const express = require("express")
const router = express.Router()
const {getProductById,createProduct,getProduct,loadphoto,deleteProduct,updateProduct,getAllProducts,getAllUniqueCategories}                     = require("../controllers/product")
const {isSignedIn,isAuthenticated,isAdmin}                                                                                                      = require("../controllers/auth")
const {getUserById}                                                                                                                             = require("../controllers/user")


    router.param("userId",getUserById)
    router.param("productId",getProductById)

// * Routes

    router.post("/create/:userId",[isSignedIn,isAuthenticated,isAdmin],createProduct)
    router.get("/:productId",getProduct)
    router.get("/photo/:productId",loadphoto)

    //* delete route
    router.delete("/delete/:productId/:userId",[isSignedIn,isAuthenticated,isAdmin],deleteProduct)
    //* update route 
    router.put("/update/:productId/:userId",[isSignedIn,isAuthenticated,isAdmin],updateProduct)
    //* listing route
    router.get("/",getAllProducts)
    router.get("/categories",getAllUniqueCategories)

module.exports = router