const express=require('express');
var router=express.Router();

let getErrorController=require('../controller/page-error');

router.get('/500',getErrorController.get500ErrorPage);
router.use(getErrorController.get400ErrorPage);


module.exports=router;
