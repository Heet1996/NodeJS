const Products = require('../models/products');
// const Cart=require('../models/cart');
const Orders = require('../models/order');
exports.getIndexPage = (req, res) => {

    Products.find({}).then(

        (products) => {

            res.render("shop/index", {
                products: products,
                docTitle: 'Product List',
                path: '/index'
            });
        }
    ).catch((err) => console.log(err));
}
exports.getUserProducts = (req, res) => {

    // Products.fetchAll((products)=>{
    //     res.render("shop/product-list",{products:products,docTitle:'Product List',path:'/product-list'});
    // });
    Products.find({}).then(
        (products) => {
            res.render("shop/product-list", {
                products: products,
                docTitle: 'Product List',
                path: '/product-list'
            });
        }
    ).catch((err) => console.log(err));

}
exports.getUserCart = (req, res) => {

    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {

            let products = user.cart.items;
            console.log(products);
            res.render('shop/cart', {
                path: '/cart',
                docTitle: 'Cart',
                products: products
            })
        })
        .catch(err => console.log(err));
}
exports.postUserCart = (req, res, next) => {
    let productId = req.body.productId;
    console.log(productId);
    req.user
        .addToCart(productId)
        .then((result) => res.redirect('/cart'))
        .catch((err) => console.log(err))


    // req.user
    //    .getCart()
    //    .then((cart)=>{
    //     fecthCart=cart;    
    //     return cart.getProducts({where : {
    //             id:productId
    //         }})
    //    }) 
    //    .then((products)=>{
    //         let product;
    //         if(products.length>0)
    //         product=products[0]

    //         if(product)
    //         {
    //             newQuantity+=product.cartItem.quantityItem;
    //             return product             
    //         }

    //         return Products.findById(productId)


    //    })
    //    .then((product)=>{
    //     return fecthCart.addProduct(product,{through:{
    //         quantityItem:newQuantity
    //     }})
    // })
    // .then(()=>res.redirect('/cart'))
    // .catch((err)=>{console.log(`Can't add Product in cart :${err}`)})
    // .catch((err)=>console.log(`Can't get Cart : ${err}`))
}
exports.deleteUserCart = (req, res, next) => {
    let productId = req.body.productId;
    req.user
        .deleteFromCart(productId)
        .then(() => res.redirect('/cart'))
}
// exports.getCheckoutPage=(req,res,next)=>{
//     res.render('shop/checkout',{path:'/checkout',docTitle:'Checkout Page'})
// }

exports.getOrders = (req, res) => {
    Orders.find({'user.userId':req.user._id})
            .then((orders)=>{
                res.render('shop/orders', {
                    path: '/orders',
                    docTitle: 'My Orders',
                    orders: orders
                })
            })
            .catch((err) => console.log(err))
   

}

exports.getProduct = (req, res) => {
    var productId = req.params.productId;
    Products.findById(productId).then((row) => {
        res.render('shop/product-details', {
            path: '/orders',
            product: row,
            docTitle: 'My Orders'
        });
    }).catch((err) => console.log(err));
}

exports.postOrder = (req, res) => {

    req.user
       .populate('cart.items.productId')
       .execPopulate() 
       .then((user)=>{
           
            let products=user.cart.items.map(i=>{
                console.log(i.productId._doc);
                return  {quantity:i.quantity,product:{...i.productId._doc}}
            });
            let order=new Orders({
                user:{
                    name:req.user.name,
                    userId:req.user
                },
                products:products
                    
                
            })
             
            return order.save();
       })
       .then(()=>req.user.clearCart())
        .then(result => {
            res.redirect('/orders');
        })
        .catch((err) => console.log(err))
}