const path=require('path');
// const requestHandler=require('./route');

const express=require('express');
const app=express();
// const mongoConnect=require('./util/database').mongoConnect;
const mongoose=require('mongoose');

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
    User.findById('5cc44b7bc17d6d5448d4f27f')
      .then(user => {
        req.user = user;
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

mongoose.connect('mongodb+srv://hs_1996:23rdmay1996@cluster0-pppnf.mongodb.net/shop?retryWrites=true',{ useNewUrlParser: true })
        .then(()=>{
          console.log('Connected');
          return app.listen('3000');
        })
        .then(()=>{
          User.findOne().then(user=>{
            if(!user)
            {
              let user=new User({name:"Heet Shah",email:"heet1@live.com",cart:{items:[]}})
             return user.save()
            }
            return;
          })
              
        })
        .then(()=>console.log("User Added"))
        .catch((err)=>{
          console.log(err);
        })

