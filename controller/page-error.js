let get400ErrorPage=(req,res,next)=>{
    res.status(404).render("error/404",{docTitle:'Page Not Found!',path:'/404'});
};

let get500ErrorPage=(req,res,next)=>{
    res.status(500).render("error/500",{docTitle:'Error!',path:'/500'});
};

module.exports={get400ErrorPage,get500ErrorPage};