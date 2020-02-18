let isAuth=(req,res,next)=>{
    if(!req.session.isLogged)
        return res.redirect('/login'); 
     
    next();    
}

module.exports={isAuth};