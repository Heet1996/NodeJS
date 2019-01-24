const path=require('path');
const express=require('express');


const bodyParser=require('body-parser');
const app=express();


const {adminRouter}=require('./routes/assignment4');
const userRouter=require('./routes/users');
//Settingup View Engine
app.set('view engine','ejs');
app.set('views','public');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(userRouter);
app.use(adminRouter);
app.listen('3000','localhost')