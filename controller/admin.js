const Products=require('../models/products');
exports.getAddProduct=(req,res)=>{
    res.render("admin/edit-product",{path:"/admin/add-products",docTitle:'Admin'})
};
exports.postAddProduct=(req,res)=>{
    let product=new Products(req.body.title,req.body.imageUrl,req.body.price,req.body.description);
    product.save();
    res.redirect("/");
}
//Edit Product
exports.getEditProduct=(req,res)=>{
    var editMode=req.query.edit;
    var productId=req.params.productId;
    if(!editMode)
    return res.redirect('/');
    
    Products.findByProductId(productId,(product)=>{
         res.render("admin/edit-product",{path:"/admin/add-products",docTitle:'Admin',editing:editMode,product:product});
    });
};
//Getting Products for admin
exports.getAdminProducts=(req,res)=>{
    Products.fetchAll((products)=>{
        res.render("admin/products",{products:products,docTitle:'Product List',path:'/admin/products'});
    });
}

