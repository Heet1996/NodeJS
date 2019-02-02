const fs=require('fs');
const rootDir=require('../util/path');
const path=require('path');

const getProductFromFile=clbck =>{
    fs.readFile(path.join(rootDir,'data','products.json'),(err,content)=>{
        if(!err)
        clbck(JSON.parse(content));
        else  clbck([]);

    });
}
module.exports=class Product 
{
    constructor(title,imageUrl,price,description){
        this.title=title;
        this.imageUrl=imageUrl;
        this.price=price;
        this.description=description;
    }
    save(){
        this.id=Math.random().toString();
        getProductFromFile((products)=>{
            products.push(this);
            fs.writeFile(path.join(rootDir,'data','products.json'),JSON.stringify(products),(err)=>{
                console.log(err);
            })
        })
        
    }
    static fetchAll(clbck){
        
        getProductFromFile(clbck);
        
    }
    static findByProductId(productId,cb){
        getProductFromFile(products=>{
            console.log(products);
            let product=products.find(product=> productId===product.id);
            
            cb(product);
        })
    }
}

