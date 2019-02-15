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
    {   
        //Fetch the product from file
        getProductFromCart((cart)=>{
            
            //Analyze the array product
            let existingProductIndex=cart.products.findIndex((p)=>p.id===id);
            let existingProduct=cart.products[existingProductIndex];
            if(existingProduct)
            {
                let updatedProduct={...existingProduct};
                updatedProduct.qty+=1;
                cart.products=[...cart.products];
                cart.products[existingProductIndex]=updatedProduct;
            } 
            else{
                console.log("Hey");
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
            if(!product) return;
            updatedCart.totalPrice=updatedCart.totalPrice-productPrice*product.qty;
            updatedCart.products=updatedCart.products.filter((p)=>p.id!==id);
            
            if(!updatedCart) updatedCart={products:[],totalPrice:0};
            
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