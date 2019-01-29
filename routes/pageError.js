const path=require('path');

const express=require('express');
var router=express.Router();

let getErrorController=require('../controller/page-error');

router.use(getErrorController);
module.exports=router;
