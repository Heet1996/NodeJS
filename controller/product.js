const products=[];

exports.getAddProduct=(req,res)=>{
    res.render("add-product",{path:"/admin/add-products",docTitle:'Admin'})
};
exports.postAddProduct=(req,res)=>{
    products.push({'title':req.body.title});
    res.redirect("/");
}
exports.getUserProducts=(req,res)=>{
    
    res.render("shop",{products,docTitle:'Shop',path:'/shop'});
}