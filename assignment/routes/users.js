const express=require('express');
const router= express.Router();


const users=require('./assignment4').users;

router.use('/users',(req,res)=>{
    console.log(users);
    res.render("users_assignment4",{users});
});

module.exports=router;