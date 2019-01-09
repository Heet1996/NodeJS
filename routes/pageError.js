const path=require('path');

const express=require('express');
var router=express.Router();

router.use((req,res,next)=>{
    res.status(404).sendFile(path.join(__dirname,"../","views","page-error.html"));
});
module.exports=router;
