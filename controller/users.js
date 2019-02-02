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

exports.getOrders=(req,res)=>{
    res.render('shop/orders',{path:'/orders',docTitle:'My Orders'});
}

exports.getProduct=(req,res)=>{
    var productId=req.params.productId;
    Products.findByProductId(productId,(product)=>{
        res.render('shop/product-details',{path:'/orders',product:product,docTitle:'My Orders'})
    })
    
}