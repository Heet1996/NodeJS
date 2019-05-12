const User = require('../models/user');

exports.getLogin = (req, res, next) => {
 
  res.render('auth/login', {
    path: '/login',
    docTitle: 'Login',
    isAuthenticated:false
  });
};
exports.postLogin=(req,res,next) => {

  User.findById('5cc44b7bc17d6d5448d4f27f')
        .then(user => {
          req.session.user = user;
          req.session.isLogged=true;
          res.redirect('/');
          
        })
        .catch(err => console.log(err));
        
}
exports.postLogout=(req,res,next)=>{

  req.session.destroy((err)=>{console.log("Deleted");console.log(err);res.redirect('/')})
}