const Products=require('../models/products');
const db=require('../util/database');
exports.getAddProduct=(req,res)=>{
    var editMode=req.query.edit;
    res.render("admin/edit-product",{path:"/admin/add-products",docTitle:'Admin',editing:editMode,product:[]});
};
exports.postAddProduct=(req,res)=>{
    let product=new Products(null,req.body.title,req.body.imageUrl,req.body.price,req.body.description);
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

exports.postEditProduct=(req,res,next)=>{
    let productId=req.body.productId;
    let title=req.body.title;
    let imageUrl=req.body.imageUrl;
    let price=req.body.price;
    let description=req.body.description;
    let product=new Products(productId,title,imageUrl,price,description);
    product.save();
}
//Getting Products for admin
exports.getAdminProducts=(req,res)=>{
    // Products.fetchAll((products)=>{
    //     res.render("admin/products",{products:products,docTitle:'Product List',path:'/admin/products'});
    // });

    Products.fetchAll().then(
        ([rows,fields])=>{
            res.render("admin/products",{products:rows,docTitle:'Product List',path:'/admin/products'});
        }
    ).catch((err)=>console.log(err));
}

//Deleting Products

exports.deleteProduct=(req,res)=>{
    let id=req.body.productId;
    Products.deleteProduct(id);
    res.redirect('/');
}