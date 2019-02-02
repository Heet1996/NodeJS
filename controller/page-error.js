let getErrorPage=(req,res,next)=>{
    res.status(404).render("page-error",{docTitle:'Page Error',path:''});
};
module.exports=getErrorPage;