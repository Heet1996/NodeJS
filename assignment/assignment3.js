const path=require('path');
const express=require('express');

const app=express();

const routers=require('./utils/path');
const assignmentRouter=require('./routes/assignment3');
const userRouter=require('./routes/users');

app.use(express.static(path.join(__dirname,'public')));
app.use(userRouter);
app.use(assignmentRouter);
app.listen('3000','localhost')