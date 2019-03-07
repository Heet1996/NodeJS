const http=require('http');
const path=require('path');
// const requestHandler=require('./route');

const express=require('express');
const app=express();
const sequelize=require('./util/database');

const bodyParser=require('body-parser');
const {adminRouter}=require('./routes/admin_router');
const shopRouter=require('./routes/shop_router');
const pageErrorRouter=require('./routes/pageError');

const User=require('./models/user');
const Product=require('./models/products');
const CartItem=require('./models/cartItem');
const Cart=require('./models/cart');
//Below function will register in event loop and returns a server
// const server= http.createServer(requestHandler(req,res));
//Adding Static pages
app.use(express.static(path.join(__dirname,'public')));
//Registering body-parser

app.use(bodyParser.urlencoded({extended:false}));

app.use((req, res, next) => {
    User.findById(1)
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
app.use(pageErrorRouter);
// const server= http.createServer(app);
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

User.hasOne(Cart);

Cart.belongsToMany(Product,{through:CartItem});
Product.belongsToMany(Cart,{through:CartItem});

sequelize
  // .sync({ force: true })
  .sync()
  .then(result => {
    return User.findById(1);
    // console.log(result);
  })
  .then(user => {
    if (!user) {
      return User.create({ name: 'Max', email: 'test@test.com' });
    }
    return user;
  })
  .then((user)=>{
      return user.createCart();
  })
  .then(cart => {
    // console.log(user);
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
