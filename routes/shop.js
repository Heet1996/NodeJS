const express=require('express');
const router=express.Router();
let productController=require('../controller/product');

router.get("/",productController.getUserProducts);

module.exports=router;