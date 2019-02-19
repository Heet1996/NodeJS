// const fs=require('fs');
// const rootDir=require('../util/path');
// const path=require('path');
const db=require('../util/database');
const Cart=require('./cart');

// const getProductFromFile=clbck =>{
//     fs.readFile(path.join(rootDir,'data','products.json'),(err,content)=>{
//         if(!err)
//         clbck(JSON.parse(content));
//         else  clbck([]);

//     });
// }

module.exports=class Product 
{
    constructor(id,title,imageUrl,price,description){
        this.id=id;
        this.title=title;
        this.imageUrl=imageUrl;
        this.price=price;
        this.description=description;
    }
    save(){
        
        // getProductFromFile((products)=>{
        //     if(this.id){
        //         const existingProductIndex=products.findIndex((id)=>id===this.id);
        //         const updatedProducts=[...products];
        //         updatedProducts[existingProductIndex]=this;
        //         fs.writeFile(path.join(rootDir,'data','products.json'),JSON.stringify(updatedProducts),(err)=>{
        //             console.log(err);
        //         })
        //     }
        //     else{
        //         this.id=Math.random().toString();
        //         products.push(this);
        //         fs.writeFile(path.join(rootDir,'data','products.json'),JSON.stringify(products),(err)=>{
        //             console.log(err);
        //         })
        //     }
        // })
        
    }
    static fetchAll(){
        
        // getProductFromFile(clbck);

        return db.execute('SELECT * FROM products');

    }
    static deleteProduct(id)
    {
        // getProductFromFile((products)=>{
        //     const updatedProducts=products.filter((p)=>p.id!==id);
        //     const product=products.find(p=>p.id==id);
        //     fs.writeFile(path.join(rootDir,'data','products.json'),JSON.stringify(updatedProducts),(err)=>{
        //         if(!err)
        //         {
        //             Cart.deleteProduct(id,product.price);
        //         }
        //         console.log(err);
        //     });
        // });
    }
    static findByProductId(productId,cb){
        // getProductFromFile(products=>{
        //     let product=products.find(product=> productId===product.id);
            
        //     cb(product);
        // })
    }
}

