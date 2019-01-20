const path=require('path');

const express=require('express');
var router=express.Router();

router.use((req,res,next)=>{
    res.status(404).render("page-error");
});
module.exports=router;
