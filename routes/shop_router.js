const express=require('express');
const router=express.Router();
let userController=require('../controller/users');
router.get("/",userController.getIndexPage);
router.get("/product-list",userController.getUserProducts);
router.get("/product/:productId",userController.getProduct);
router.get("/cart",userController.getUserCart);
router.post("/cart",userController.postUserCart);
router.post("/cart-delete-item",userController.deleteUserCart);
router.use("/checkout",userController.getCheckoutPage);
router.use("/orders",userController.getOrders);
router.use("/checkout-order",userController.postOrder)

module.exports=router;