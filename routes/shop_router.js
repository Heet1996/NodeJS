const express=require('express');
const router=express.Router();
let userController=require('../controller/users');
router.get("/",userController.getIndexPage);
router.get("/product-list",userController.getUserProducts);
router.use("/cart",userController.getUserCart);
router.use("/checkout",userController.getCheckoutPage);
module.exports=router;