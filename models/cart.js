const fs=require('fs');
const path=require('path');
const rootDir=require('../util/path');

const getProductFromCart=(cb)=>{
    fs.readFile(path.join(rootDir,'data','cart.json'),(err,content)=>{
        if(!err) 
        cb(JSON.parse(content));
        else cb({products:[],totalPrice:0});
    });
}

module.exports=class Cart
{   
    static addProduct(id,productPrice)
    {   console.log("Parent3",id);
        //Fetch the product from file
        getProductFromCart((cart)=>{
            
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

    static deleteProduct(id,productPrice)
    {
        getProductFromCart((cart)=>{
            let updatedCart={...cart};
            let product=updatedCart.products.find((p)=>p.id==id);
            updatedCart.totalPrice=updatedCart.totalPrice-productPrice*product.qty;
            updatedCart=updatedCart.products.filter((p)=>p.id!==id);
            fs.writeFile(path.join(rootDir,'data','cart.json'),JSON.stringify(updatedCart),err=>{
                console.log(err);
            });
        })
    }
    static fetchAll(cb)
    {
        getProductFromCart(cb);
    }

}