const express=require('express');
const router= express.Router();

const users=[];
router.post('/add-users',(req,res)=>{
    users.push(req.body.Name);
    res.render("assignment4.ejs");
})
router.get('/',(req,res)=>{
    res.render("assignment4.ejs");
});

module.exports={adminRouter:router,users:users};
