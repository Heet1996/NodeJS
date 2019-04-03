const path=require('path');
// const requestHandler=require('./route');

const express=require('express');
const app=express();
const mongoConnect=require('./util/database').mongoConnect;


const bodyParser=require('body-parser');
const {adminRouter}=require('./routes/admin_router');
const shopRouter=require('./routes/shop_router');
const User=require('./models/user');


// const pageErrorRouter=require('./routes/pageError');


//Below function will register in event loop and returns a server
// const server= http.createServer(requestHandler(req,res));
//Adding Static pages
app.use(express.static(path.join(__dirname,'public')));
//Registering body-parser

app.use(bodyParser.urlencoded({extended:false}));

app.use((req, res, next) => {
    User.findById('5c9a4777703f04403c3bcd26')
      .then(user => {
        req.user = new User(user.name,user.email,user.cart,user._id);
        next();
      })
      .catch(err => console.log(err));
    
  });
//Setting up View engine

app.set('view engine','ejs');
app.set('views','views');


//Router for admins
app.use('/admin',adminRouter);
//Registering for middleware
//Router for users
app.use(shopRouter);
//Router for error
// app.use(pageErrorRouter);
// const server= http.createServer(app);

mongoConnect(()=>{
  
  app.listen('3000');
  
})


