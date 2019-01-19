const express=require('express');
const router=express.Router();
const path=require('path')
const {products}=require('../routes/admin');

const rootDir=require('../util/path');
router.get("/",(req,res)=>{
    console.log(products);
    res.render("shop",{products,docTitle:'Shop'});
});

module.exports=router;