const Products=require('../models/products');
const Cart=require('../models/cart');
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
    Cart.fetchAll((cart)=>{
        let cartProducts=[];
        Products.fetchAll((products)=>{
            for (product of products)
            {   
                const cartProductsData=cart.products.find((p)=>p.id===product.id);
                
                if(cartProductsData)
                {
                    cartProducts.push({productDetails:product,qty:cartProductsData.qty});
                }
            
                
            }
            res.render('shop/cart',{path:'/cart',docTitle:'Cart',products:cartProducts});
            
        });
        
        
    })
    
}
exports.postUserCart=(req,res,next)=>{
    let productId=req.body.productId;
    console.log("Parent1",productId);
    Products.findByProductId(productId,(product)=>{
        console.log("Parent2",product.id);
        Cart.addProduct(product.id,parseInt(product.price));
        res.redirect('/cart');
    });
    
    
}
exports.deleteUserCart=(req,res,next)=>{
    let productId=req.body.productId;
    Products.fetchAll((products)=>{
       let product =products.find((p)=>p.id===productId);
       if(!product) return;
       Cart.deleteProduct(productId,product.price); 

       res.redirect('/cart');
    });
    
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

