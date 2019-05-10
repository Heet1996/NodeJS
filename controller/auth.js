exports.getLogin = (req, res, next) => {
  console.log(req.session.isLogged);
  res.render('auth/login', {
    path: '/login',
    docTitle: 'Login'
  });
};
exports.postLogin=(req,res,next) => {
  req.session.isLogged=true;
  res.redirect('/');
}