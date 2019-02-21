const Products=require('../models/products');
const Cart=require('../models/cart');
exports.getIndexPage=(req,res)=>{
    Products.fetchAll().then(

        ([rows,fields])=>{
            console.log(rows);
            res.render("shop/index",{products:rows,docTitle:'Product List',path:'/index'});
        }
    ).catch((err)=>console.log(err));
}
exports.getUserProducts=(req,res)=>{
    
    // Products.fetchAll((products)=>{
    //     res.render("shop/product-list",{products:products,docTitle:'Product List',path:'/product-list'});
    // });
    Products.fetchAll().then(
        ([rows,fields])=>{
            res.render("shop/product-list",{products:rows,docTitle:'Product List',path:'/product-list'});
        }
    ).catch((err)=>console.log(err));
    
}
exports.getUserCart=(req,res)=>{
    Cart.fetchAll((cart)=>{
        if(!cart) return;
        Products.fetchAll((allProducts)=>{
            if(!allProducts) return;
            let cartProducts=[];
            
            for (product of allProducts)
            {   
                const cartProductsData=cart.products.find((p)=>p.id===product.id);
                
                if(cartProductsData)
                {
                    cartProducts.push({productDetails:product,qty:cartProductsData.qty});
                }
            
                
            }
            
            res.render('shop/cart',{path:'/cart',docTitle:'Cart',products:cartProducts});
            
            
        });
        
        
    });
    
    
}
exports.postUserCart=(req,res,next)=>{
    let productId=req.body.productId;
    Products.findByProductId(productId,(product)=>{
        Cart.addProduct(product.id,parseInt(product.price));
        
    });
    
    res.redirect('/cart');
}
exports.deleteUserCart=(req,res,next)=>{
    let productId=req.body.productId;
    Products.fetchAll((products)=>{
       let product =products.find((p)=>p.id===productId);
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
    Products.findByProductId(productId).then(([row])=>{
        console.log(row);
        res.render('shop/product-details',{path:'/orders',product:row[0],docTitle:'My Orders'})
    }).catch((err)=>console.log(err));    
}

