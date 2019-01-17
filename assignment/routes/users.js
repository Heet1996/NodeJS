const express=require('express');
const path=require('path');
const router= express.Router();

const rootDir=require('../utils/path');
router.use('/users',(req,res)=>{
    res.sendFile(path.join(rootDir,"public","users_assignment3.html"));
});

module.exports=router;