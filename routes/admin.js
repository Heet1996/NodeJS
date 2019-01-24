const express=require('express');
const router=express.Router();

let productController=require('../controller/product');
router.get('/add-product',productController.getAddProduct);
router.post('/add-product',productController.postAddProduct);

module.exports={adminRouter:router};