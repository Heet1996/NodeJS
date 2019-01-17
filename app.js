const http=require('http');
const path=require('path');
// const requestHandler=require('./route');

const express=require('express');
const app=express();

const bodyParser=require('body-parser');
const adminRouter=require('./routes/admin');
const shopRouter=require('./routes/shop');
const pageErrorRouter=require('./routes/pageError');
//Below function will register in event loop and returns a server
// const server= http.createServer(requestHandler(req,res));
//Adding Static pages
app.use(express.static(path.join(__dirname,'public')));
//Reistering body-parser

app.use(bodyParser.urlencoded({extended:false}));

//Router for admins
app.use('/admin',adminRouter);
//Registering for middleware
//Router for users
app.use(shopRouter);
//Router for error
app.use(pageErrorRouter);
// const server= http.createServer(app);
//Sever is listen at this port
app.listen('3000');