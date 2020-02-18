const express=require('express');
const router=express.Router();
const {isAuth}=require('../middleware/isAuth');


let productController=require('../controller/admin');


router.get('/add-product',isAuth,productController.getAddProduct);
router.post('/add-product',isAuth,productController.postAddProduct);

router.get('/edit-product/:productId',isAuth,productController.getEditProduct);
router.post('/edit-product',isAuth,productController.postEditProduct);

router.post('/delete-product',isAuth,productController.deleteProduct)

router.use('/products',productController.getAdminProducts);
module.exports={adminRouter:router};