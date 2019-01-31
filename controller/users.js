const Products=require('../models/products');
exports.getIndexPage=(req,res)=>{
    Products.fetchAll((products)=>{
        res.render("shop/index",{products:products,docTitle:'Index Page',path:'/'});
    });
}
exports.getUserProducts=(req,res)=>{
    
    Products.fetchAll((products)=>{
        res.render("shop/product-list",{products:products,docTitle:'Product List',path:'/product-list'});
    });
    
    
}
exports.getUserCart=(req,res,next)=>{
    res.render('shop/cart',{path:'/cart',docTitle:'Cart'});
}

exports.getCheckoutPage=(req,res,next)=>{
    res.render('shop/checkout',{path:'/checkout',docTitle:'Checkout Page'})
}