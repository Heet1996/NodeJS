const User = require('../models/user');
const bcrypt=require('bcrypt');

exports.getLogin = (req, res, next) => {
 
  res.render('auth/login', {
    path: '/login',
    docTitle: 'Login',
    isAuthenticated:false
  });
};
exports.postLogin=(req,res,next) => {

  const email=req.body.email;
  const password=req.body.password;
  User.findOne({email})
        .then(user => {
          if(!user)
            return res.redirect('/login');
          return bcrypt
          .compare(password,user.password)
          .then((result)=>{
            if(!result)
            return res.redirect('/login');
            
            req.session.user = user;
            req.session.isLogged=true;
            return res.redirect('/'); 
          })  
          .catch((err)=>{
              console.log(err);
          })
          
        })
        .catch(err => console.log(err));
        
}
exports.getSignUp=(req,res,next)=>{
    res.render('auth/signup',{
      path:'/signup',
      docTitle:'SugnUp',
      isAuthenticated:false
    })
}

exports.postSignUp=(req,res,next)=>{
    var email=req.body.email;
    var password=req.body.password;
    var cPassword=req.body.cPassword;
    User.findOne({email:email})
        .then((user)=>{
            if(user)
            return res.redirect('/')
            else return bcrypt.hash(password,12);  
            
        })
        .then((password)=>{
            if(password)
            {var user=new User({email:email,password:password,cart:[]});
            return user.save();
          }
        })
        .then(()=>res.redirect('/login'))
        .catch((err)=>console.log(err))
}
exports.postLogout=(req,res,next)=>{

  req.session.destroy((err)=>{
    console.log(err);
    
  });
  res.redirect('/login');
}