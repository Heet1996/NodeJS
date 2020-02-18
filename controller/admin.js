const Products=require('../models/products');


exports.getAddProduct=(req,res)=>{
    var editMode=req.query.edit;
    
    res.render("admin/edit-product",
    {path:"/admin/add-products",docTitle:'Admin',editing:editMode,product:[]});
};
exports.postAddProduct=(req,res)=>{
    const title=req.body.title;
    const imageUrl=req.body.imageUrl;
    const price=req.body.price;
    const description=req.body.description;

    let user_id=req.user._id;
    // const userId=req.user._id;
    // const userId=req.user.userId;
    let product=new Products({title:title,imageUrl:imageUrl,price:price,description:description,userId:user_id});
    
    product.save()    
            .then((result)=>{
                
                res.redirect('/admin/products');
            })  
            .catch(err=>console.log(err))  
}
// //Edit Product
exports.getEditProduct=(req,res)=>{
    var editMode=req.query.edit;
    var productId=req.params.productId;
    if(!editMode)
    return res.redirect('/');
     
    Products.findById(productId)
            .then((products)=>{

                res.render("admin/edit-product",
                {path:"/admin/add-products",docTitle:'Admin',editing:editMode,product:products});
           })
           .catch((err)=>console.log(err));
};

exports.postEditProduct=(req,res,next)=>{
    let productId=req.body.productId;
    let title=req.body.title;
    let imageUrl=req.body.imageUrl;
    let price=req.body.price;
    let description=req.body.description;
    Products.findByIdAndUpdate(productId,{title,imageUrl,price,description})
            .then(()=>res.redirect('/admin/products'))
            .catch((err)=>{
                console.log(err);
            })
    
}
// // //Getting Products for admin
exports.getAdminProducts = (req, res) => {
    
    Products.find()
        // .select('title price -_id') select only title and price_id
        // .populate('userId')    populating user with the help to userId
        .then(
            (products) => {
                
                res.render("admin/products", {
                    products: products,
                    docTitle: 'Product List',
                    path: '/admin/products'
                   
                });
            }
        ).catch((err) => console.log(err));
}

// // //Deleting Products

exports.deleteProduct=(req,res)=>{
    let id=req.body.productId;
    Products.deleteOne({_id:id})
    .then(()=>res.redirect('/admin/products'))
    .catch((err)=>console.log(err));

}