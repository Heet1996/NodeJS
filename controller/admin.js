const Products=require('../models/products');
const {validationResult}=require('express-validator');

exports.getAddProduct=(req,res)=>{
    var editMode=req.query.edit;
    
    res.render("admin/edit-product",
    {path:"/admin/add-products",docTitle:'Admin',editing:editMode,product:[],err:''});
};
exports.postAddProduct=(req,res,next)=>{
    
    const title=req.body.title;
    const image=req.file;
    const price=req.body.price;
    const description=req.body.description;
    
    let user_id=req.user._id;
    // const userId=req.user._id;
    // const userId=req.user.userId;
    
      
    let error=validationResult(req);
    if(!image) 
    {
        return res.status(422)
                    .render("admin/edit-product",
                    {path:"/admin/add-products",docTitle:'Admin',editing:false,product:[],err:"Image is not attached"}
                    );
    }
    if(!error.isEmpty()) 
    {
        return res.status(422)
                    .render("admin/edit-product",
                    {path:"/admin/add-products",docTitle:'Admin',editing:false,product:[],err:error.array()[0].msg}
                    );
    }
    let imageUrl=image.path;
    let product=new Products({title:title,imageUrl:imageUrl,price:price,description:description,userId:user_id});
  
    product.save()    
            .then((result)=>{
                
                res.redirect('/admin/products');
            })  
            .catch(err=>{
                const error=new Error(err);
                error.httpStatusCode=500;    
                return next(error);      
            })  
}
// //Edit Product
exports.getEditProduct=(req,res,next)=>{
    var editMode=req.query.edit;
    var productId=req.params.productId;
    let user_id=req.session.user._id;
    
    if(!editMode)
    return res.redirect('/');
     
    Products.find({_id:productId})
            .then((products)=>{
                res.render("admin/edit-product",
                {path:"/admin/add-products",docTitle:'Admin',editing:editMode,product:products[0],err:''});
           })
           .catch((err)=>{
            const error=new Error(err);
            console.log("error");
            error.httpStatusCode=500;    
            return next(error);  
           });
};

exports.postEditProduct=(req,res,next)=>{
    let productId=req.body.productId;
    let title=req.body.title;
    let image=req.file;
    let price=req.body.price;
    let user_id=req.session.user._id;
    let description=req.body.description;
    let product={title,price,description};
    if(!image) 
    {
        return res.status(422)
                    .render("admin/edit-product",
                    {path:"/admin/add-products",docTitle:'Admin',editing:false,product:[],err:"Image is not attached"}
                    );
    }
    let imageUrl=image.path;
    if(image)
    product={title,imageUrl,price,description};

    Products.findOneAndUpdate({_id:productId,userId:user_id},product)
            .then(()=>res.redirect('/admin/products'))
            .catch((err)=>{
                const error=new Error(err);
                error.httpStatusCode=500;    
                return next(error);  
            })
    
}
// // //Getting Products for admin
exports.getAdminProducts = (req, res) => {
    
    let user_id=req.session.user._id;
    Products.find({userId:user_id})
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
        ).catch((err) => {
            const error=new Error(err);
            error.httpStatusCode=500;    
            return next(error);  
        });
}

// // //Deleting Products

exports.deleteProduct=(req,res)=>{
    let id=req.body.productId;
    let user_id=req.session.user._id; 

    Products.deleteOne({_id:id,userId:user_id})
    .then(()=>res.redirect('/admin/products'))
    .catch((err)=>{
        const error=new Error(err);
        error.httpStatusCode=500;    
        return next(error);  
    });

}