var express=require('express');
var app=express();

// app.use('/',(req,res,next)=>{
//     console.log("First middleware");
//     next();
// });

// app.use('/',(req,res)=>{
//     console.log("Second middleware");
//     res.send("<h1>Hey I'm second one</h1>");
// });

app.use('/users',(req,res)=>{
     console.log("Users log");
     
});
app.use('/',(req,res)=>{
    console.log("General log");
})
app.listen('8080');