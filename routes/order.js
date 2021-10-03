const express = require("express")
const router = express.Router()
const {isSignedIn,isAuthenticated,isAdmin}                                                                                                      = require("../controllers/auth")
const {getUserById,pushOrderInPurchaseList}                                                                                                                             = require("../controllers/user")
const {updateInventory} = require("../controllers/product")
const {getOrderById,createOrder} = require("../controllers/order")

//* params

router.param("userId",getUserById)
router.param("orderId",getOrderById)

//* Routes

//? create
router.post("/create/:userId",
            [isSignedIn,
            isAuthenticated,
            pushOrderInPurchaseList,
            updateInventory],
            createOrder)
            
//? read

module.exports = router