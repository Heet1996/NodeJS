const http=require('http');
// const requestHandler=require('./route');

const express=require('express');
const app=express();

//Below function will register in event loop and returns a server
// const server= http.createServer(requestHandler(req,res));


//Registering for middleware
app.use((req,res,next)=>{
    res.send("<h1>Hello World</h1>");
    next(); //Goto next middleware
});
// const server= http.createServer(app);
//Sever is listen at this port
app.listen('3000');