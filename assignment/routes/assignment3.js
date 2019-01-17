const express=require('express');
const path=require('path');
const router= express.Router();

const rootDir=require('../utils/path');
router.use('/',(req,res)=>{
    res.sendFile(path.join(rootDir,"public","assignment3.html"));
});

module.exports=router;