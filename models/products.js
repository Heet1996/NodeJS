const {get_db}=require('../util/database');
class Products
{
    constructor(title,price,description,imageUrl)
    {
        this.title=title;
        this.price=price;
        this.description=description;
        this.imageUrl=imageUrl;
    }
    save()
    {
        let db=get_db();
        return db.collection('products')
          .insertOne(this)
          .then(result=>{
              console.log(result);
              
          })  
          .catch((err)=>console.log(err));
    }
}

// const Products=sequelize.define('products',{
//     id:{
//         type:Sequelize.INTEGER,
//         autoIncrement:true,
//         allowNull:false,
//         primaryKey:true
//     },
//     title:Sequelize.STRING,
//     price:{
//         type:Sequelize.DOUBLE,
//         allowNull:false
//     },
//     imageUrl:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     description:{
//         type:Sequelize.STRING
//     }
// });

module.exports=Products;