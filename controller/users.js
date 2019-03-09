const Products=require('../models/products');
const Cart=require('../models/cart');
exports.getIndexPage=(req,res)=>{
    Products.findAll().then(

        (products)=>{
            
            res.render("shop/index",{products:products,docTitle:'Product List',path:'/index'});
        }
    ).catch((err)=>console.log(err));
}
exports.getUserProducts=(req,res)=>{
    
    // Products.fetchAll((products)=>{
    //     res.render("shop/product-list",{products:products,docTitle:'Product List',path:'/product-list'});
    // });
    Products.findAll().then(
        (products)=>{
            res.render("shop/product-list",{products:products,docTitle:'Product List',path:'/product-list'});
        }
    ).catch((err)=>console.log(err));
    
}
exports.getUserCart=(req,res)=>{
    // Cart.fetchAll((cart)=>{
    //     if(!cart) return;
    //     Products.fetchAll((allProducts)=>{
    //         if(!allProducts) return;
    //         let cartProducts=[];
            
    //         for (product of allProducts)
    //         {   
    //             const cartProductsData=cart.products.find((p)=>p.id===product.id);
                
    //             if(cartProductsData)
    //             {
    //                 cartProducts.push({productDetails:product,qty:cartProductsData.qty});
    //             }
            
                
    //         }
            
    //         res.render('shop/cart',{path:'/cart',docTitle:'Cart',products:cartProducts});
            
            
    //     });
        
        
    // });
    

    req.user
    .getCart()
    .then(cart =>{
        console.log(cart);
        return cart
                .getProducts()
                .then((products)=>{
                    res.render('shop/cart',{path:'/cart',docTitle:'Cart',products:products})

                })
                .catch(err=>console.log(err));
    })
    .catch(err =>console.log(err));
}
exports.postUserCart=(req,res,next)=>{
    let productId=req.body.productId;
    let fecthCart;
    let newQuantity=1;
    req.user
       .getCart()
       .then((cart)=>{
        fecthCart=cart;    
        return cart.getProducts({where : {
                id:productId
            }})
       }) 
       .then((products)=>{
            let product;
            if(products.length>0)
            product=products[0]
            
            if(product)
            {
                newQuantity+=product.cartItem.quantityItem;
                return product             
            }
               
            return Products.findById(productId)
                            

       })
       .then((product)=>{
        return fecthCart.addProduct(product,{through:{
            quantityItem:newQuantity
        }})
    })
    .then(()=>res.redirect('/cart'))
    .catch((err)=>{console.log(`Can't add Product in cart :${err}`)})
    .catch((err)=>console.log(`Can't get Cart : ${err}`))
}
exports.deleteUserCart=(req,res,next)=>{
    let productId=req.body.productId;
    req.user.getCart()
        .then((cart)=>{
            return cart.getProducts({
                where:{
                    id:productId
                }
            })
          .then((product)=>{
            return product[0].cartItem.destroy();
            
          })  
          .then(()=>res.redirect('/'))
    })
    .catch((err)=>console.log(`Can't get Cart : ${err}`))
}
exports.getCheckoutPage=(req,res,next)=>{
    res.render('shop/checkout',{path:'/checkout',docTitle:'Checkout Page'})
}

exports.getOrders=(req,res)=>{
    res.render('shop/orders',{path:'/orders',docTitle:'My Orders'});
}

exports.getProduct=(req,res)=>{
    var productId=req.params.productId;
    Products.findAll({where:{id:productId}}).then((row)=>{
        res.render('shop/product-details',{path:'/orders',product:row[0],docTitle:'My Orders'});
    }).catch((err)=>console.log(err));    
}

exports.checkout=(req,res)=>{
    
}

