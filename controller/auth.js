const User = require('../models/user');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const {validationResult}=require('express-validator');

const {
  ObjectId
} = require('mongodb');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'heet1885@gmail.com',
    pass: '9thjuly1996'
  }
});

exports.getLogin = (req, res, next) => {
  let message = req.flash('err');
  if (message.length < 1)
    message = null;
  res.render('auth/login', {
    path: '/login',
    docTitle: 'Login',
    isAuthenticated: false,
    err: message
  });
};
exports.postLogin = (req, res, next) => {

  const email = req.body.email;
  const password = req.body.password;
  let error=validationResult(req);
  if(!error.isEmpty())
  {
   return res.render('auth/login', {
    path: '/login',
    docTitle: 'Login',
    isAuthenticated: false,
    err: error.array()[0].msg
  });
  }

  User.findOne({
      email
    })
    .then(user => {
      if (!user) {

        req.flash("err", "Email not found");
        return res.redirect('/login');
      }
      return bcrypt
        .compare(password, user.password)
        .then((result) => {
          if (!result) {
            req.flash("err", "Password was incorrect");
            return res.redirect('/login');
          }

          req.session.user = user;
          req.session.isLogged = true;
          return res.redirect('/');
        })
        .catch((err) => {
          console.log(err);
        })

    })
    .catch(err=>{
      const error=new Error(err);
      error.httpStatusCode=500;    
      return next(error);      
  })  

}
exports.getSignUp = (req, res, next) => {
  let msg=req.flash("err");
  if (msg.length < 1)
  msg = null;
  res.render('auth/signup', {
    path: '/signup',
    docTitle: 'SignUp',
    isAuthenticated: false,
    err:msg,
    oldValue:{email:"",password:"",cPassword:""}
  })
}

exports.postSignUp = (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;
  var cPassword = req.body.cPassword;

  let error=validationResult(req);
  if(!error.isEmpty())
  {
   return res.status(422)
        .render('auth/signup', {
          path: '/signup',
          docTitle: 'SignUp',
          isAuthenticated: false,
          err:error.array()[0].msg,
          oldValue:{email:email,password:password,cPassword:cPassword}
        })
  }
  User.findOne({
      email: email
    })
    .then((user) => {
      if (user) {
        req.flash("err", "Email already Exist, please use another");
        return res.redirect('/signup');
      }
      return bcrypt.hash(password, 12);

    })
    .then((password) => {
      if (password) {
        let user = new User({
          email: email,
          password: password,
          cart: []
        });
        return user.save();
      } else {
        req.flash("err", "Try some other password");
        return res.redirect('/signup');
      }
    })
    .then(() => {
      res.redirect('/login');
      transporter
        .sendMail({
          from: `${email}`, // sender address
          to: `${email}`, // list of receivers
          subject: "Your account is created successfully", // Subject line
          text: "Thank You", // plain text body
          html: "<b>Please do not reply on this mail</b>" // html body
        })
        .then((info) => {
          console.log(info);

        })
        .catch((err) => console.log(err))

    })
    .catch(err=>{
      const error=new Error(err);
      error.httpStatusCode=500;    
      return next(error);      
  })  
}
exports.postLogout = (req, res, next) => {

  req.session.destroy((err) => {
    console.log(err);

  });
  res.redirect('/login');
}

exports.getResetPassword = (req, res, next) => {
  let message = req.flash('err');
  if (message.length < 1)
    message = null;
  res.render('auth/reset', {
    path: '/reset',
    docTitle: 'Reset Password',
    isAuthenticated: false,
    err: message
  });
}

exports.postResetPassword = (req, res, next) => {
  let email = req.body.email;
  let token = crypto.randomBytes(32).toString('hex');
  User.findOne({
      email: email
    })
    .then((user) => {
      if (!user) {
        req.flash("err", "No user Found with Mail-ID");
        return res.redirect('/reset');
      }
      user.resetToken = token;
      user.resetExpiration = Date.now() + 3600000;
      return user.save();

    })
    .then((user) => {
      res.redirect('login');
      transporter
        .sendMail({
          from: `${email}`, // sender address
          to: `${email}`, // list of receivers
          subject: "Reset password link", // Subject line
          text: "Please reset your password by clicking below link", // plain text body
          html: `<a target='_blank' href="http://localhost:8080/reset/${token}">Password Reset</a>` // html body
        })
    })
    .catch((err) => {
      console.log(err);
    })
    .catch(err=>{
      const error=new Error(err);
      error.httpStatusCode=500;    
      return next(error);      
  })  

}


exports.resetPassword = (req, res) => {

  let token = req.params.token;

  User.findOne({
      resetToken: token
    })
    .then((user) => {

      if (!user) {
        req.flash("err", "No user found, please reset the password again");
        return res.redirect('/reset');
      }
      let date = new Date();
      if (user.resetExpiration > date) {

        return user.save();

      } else {
        req.flash("err", "Link is no longer valid, please click on reset again");
        return res.redirect('/reset');
      }
    })
    .then((user) => {
      let message = req.flash('err');
      if (message.length < 1)
        message = null;
      res.render('auth/changePassword', {
        path: '/changePassword',
        docTitle: 'Change Password',
        isAuthenticated: false,
        err: message,
        userId: user._id.toString(),
        passwordToken:token
      });
    })
    .catch(err=>{
      const error=new Error(err);
      error.httpStatusCode=500;    
      return next(error);      
  })  

}

exports.changePassword = (req, res) => {
  let userId = req.body.userId;
  let password = req.body.password.toString();
  let cPassword = req.body.cPassword.toString();
  let passwordToken = req.body.passwordToken.toString();
  if (password !== cPassword) {
    req.flash('err', "Passwords didn't match");
    return res.redirect('/changePassword');
  }

  User.findById({
      _id: ObjectId(userId),
      resetToken: passwordToken,
      resetExpiration: {
        $gt: new Date()
      }
    })
    .then((user) => {

      if (!user) {
        req.flash("err", "No user found");
        return res.redirect('/signup');
      }
      bcrypt.hash(password, 12)
        .then((pass) => {

          user.password = pass;
          user.resetToken=null;
          user.resetExpiration = Date.now() - 36000000;
          
          return user.save()
        })
        .then((user) => {
          return res.redirect('/login')
        })
        .catch((err) => console.log(err));
    })
    .catch(err=>{
      const error=new Error(err);
      error.httpStatusCode=500;    
      return next(error);      
  })  

}