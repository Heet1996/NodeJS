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
    constructor(title){
        this.title=title;
    }
    save(){
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
}

