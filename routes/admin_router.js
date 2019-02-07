const express=require('express');
const router=express.Router();

let productController=require('../controller/admin');
router.get('/add-product',productController.getAddProduct);
router.post('/add-product',productController.postAddProduct);

router.get('/edit-product/:productId',productController.getEditProduct);

router.use('/products',productController.getAdminProducts);
module.exports={adminRouter:router};