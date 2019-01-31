const Products=require('../models/products');
exports.getAddProduct=(req,res)=>{
    res.render("admin/add-product",{path:"/admin/add-products",docTitle:'Admin'})
};
exports.postAddProduct=(req,res)=>{
    let product=new Products(req.body.title,req.body.imageUrl,req.body.price,req.body.description);
    product.save();
    res.redirect("/");
}
//Getting Products for admin
exports.getAdminProducts=(req,res)=>{
    Products.fetchAll((products)=>{
        res.render("admin/products",{products:products,docTitle:'Product List',path:'/admin/products'});
    });
}

