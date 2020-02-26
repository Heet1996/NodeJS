const path=require('path');
// const requestHandler=require('./route');

const express=require('express');
const app=express();
// const mongoConnect=require('./util/database').mongoConnect;
const mongoose=require('mongoose');
const session=require('express-session');
const bodyParser=require('body-parser');
const csrf=require('csurf');
const flash=require('connect-flash');

const {adminRouter}=require('./routes/admin_router');
const shopRouter=require('./routes/shop_router');
const authRouter=require('./routes/auth');
const User=require('./models/user');


const MONGODB_URI='mongodb+srv://hs_1996:23rdmay1996@cluster0-pppnf.mongodb.net/shop?retryWrites=true';
const csrfMiddleware=csrf();

const MongoDBStore=require('connect-mongodb-session')(session);
const store=new MongoDBStore({
  uri:MONGODB_URI,
  collection:'sessions'
});
// const pageErrorRouter=require('./routes/pageError');


//Below function will register in event loop and returns a server
// const server= http.createServer(requestHandler(req,res));
//Adding Static pages
app.use(express.static(path.join(__dirname,'public')));
//Registering body-parser

app.use(bodyParser.urlencoded({extended:false}));
app.use(session({secret:'my secret',resave:false,saveUninitialized:false,store:store}));
app.use(flash());
app.use(csrfMiddleware);

//Setting up View engine

app.set('view engine','ejs');
app.set('views','views');


//Adding middleware

app.use((req,res,next)=>{
    if(!req.session.user)
       return next();
    
    User.findById(req.session.user._id)
        .then((user)=>{
          req.user=user;
          next();
        })
        .catch((err)=>console.log(err));
})


//Adding middleware to send data to all View Pages
app.use((req,res,next)=>{
  res.locals.isAuthenticated=req.session.isLogged;
  res.locals.csrf_token=req.csrfToken();
  next();
});


//Router for admins
app.use('/admin',adminRouter);
//Registering for middleware
//Router for users
app.use(shopRouter);
//Router for error
// app.use(pageErrorRouter);
// const server= http.createServer(app);
app.use(authRouter);

mongoose.connect(MONGODB_URI,{ useNewUrlParser: true })
        .then(()=>{
          console.log('Connected');
          return app.listen('8080');
        })
        .catch((err)=>{
          console.log(err);
        })

