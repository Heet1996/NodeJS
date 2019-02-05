const fs=require('fs');
const path=require('path');
const rootDir=require('../util/path');
module.exports=class Cart
{
    static addProduct(id,productPrice)
    {   console.log("Parent3",id);
        //Fetch the product from file
        fs.readFile(path.join(rootDir,'data','cart.json'),(err,content)=>{
            let cart={products:[],totalPrice:0};
            if(!err)
            {
                cart=JSON.parse(content);
            }
            //Analyze the array product
            let existingProduct=cart.products.find((p)=>p.id===id);
            let existingProductIndex=cart.products.findIndex((p)=>p.id===id);
            if(existingProduct)
            {
               let updatedProduct={...existingProduct};
                updatedProduct.qty+=1;
                cart.products=[...cart.products];
                cart.products[existingProductIndex]=updatedProduct;
            } 
            else{
                let updatedProduct={id:id,qty:1};
                cart.products=[...cart.products,updatedProduct];
            }   
            cart.totalPrice+=productPrice;
            //Writeback
            fs.writeFile(path.join(rootDir,'data','cart.json'),JSON.stringify(cart),err=>{
                console.log(err);
            });
        })
        

        
    }
}