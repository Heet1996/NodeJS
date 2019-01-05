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
    res.send("<h1>Welcome to user log</h1>");
});

app.use('/',(req,res)=>{
    console.log("General log");
    res.send("<h1>Welcome to General log</h1>");
});
app.listen('8080');