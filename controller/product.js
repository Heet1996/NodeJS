const Products=require('../models/products');
exports.getAddProduct=(req,res)=>{
    res.render("admin/add-product",{path:"/admin/add-products",docTitle:'Admin'})
};
exports.postAddProduct=(req,res)=>{
    let product=new Products(req.body.title);
    product.save();
    res.redirect("/");
}
exports.getUserProducts=(req,res)=>{
    
    Products.fetchAll((products)=>{
        res.render("shop/product-list",{products:products,docTitle:'Product List',path:'/shop'});
    });
    
    
}