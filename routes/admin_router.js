const express=require('express');
const router=express.Router();
const {check}=require('express-validator');

const {isAuth}=require('../middleware/isAuth');
let productController=require('../controller/admin');


router.get('/add-product',isAuth,productController.getAddProduct);
router.post('/add-product',
            isAuth,
            [check('title').isLength({min:6,max:14}).withMessage("Please check title length"),
             check('imageUrl').isURL().withMessage("Please enter valid URL"),
             check('price').isDecimal().withMessage("Please enter valid price value"),
             check('title').isLength({min:6,max:14}).isString().withMessage("Please check the description length")  ],
            productController.postAddProduct);

router.get('/edit-product/:productId',isAuth,productController.getEditProduct);
router.post('/edit-product',isAuth,productController.postEditProduct);

router.post('/delete-product',isAuth,productController.deleteProduct)

router.use('/products',productController.getAdminProducts);
module.exports={adminRouter:router};