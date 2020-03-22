const express = require('express');
const router = express.Router();
let userController = require('../controller/users');
const {
    isAuth
} = require('../middleware/isAuth');

router.get("/", userController.getIndexPage);
router.get("/product-list", userController.getUserProducts);
router.get("/product/:productId", isAuth, userController.getProduct);
router.get("/cart", isAuth, userController.getUserCart);
router.post("/cart", isAuth, userController.postUserCart);
router.post("/cart-delete-item", isAuth, userController.deleteUserCart);
// // router.use("/checkout",userController.getCheckoutPage);
router.use("/orders", isAuth, userController.getOrders);
router.use("/checkout-order", isAuth, userController.postOrder)

router.use("/orders/:orderId", isAuth, userController.getInvoice);
module.exports = router;


