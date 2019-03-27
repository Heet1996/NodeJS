const {get_db}=require('../util/database');
const mongodb=require('mongodb');
const ObjectID=mongodb.ObjectID;

class Products
{
    constructor(title,price,description,imageUrl,id,userId)
    {
        this.title=title;
        this.price=price;
        this.description=description;
        this.imageUrl=imageUrl;
        
        this._id=id ? new ObjectID(id) : null;
        this.userId=userId;
    }
    save()
    {
        let db=get_db();
        let db_op;
        if(this._id)
        {   
            db_op=db.collection('products')
                    .updateOne({_id: new ObjectID(this._id)},{$set: this})
        }
        else{
          
          db_op=  db.collection('products')
                    .insertOne(this)
        }
        return db_op.then(result=>{
                console.log("Inserted");
              
          })  
          .catch((err)=>console.log(err));
    }
    static fetchAll()
    {   let db=get_db();
        return db.collection('products')
                 .find()
                 .toArray()
                 .then((products)=>products)
                 .catch((err)=>console.log(err))   
    }
    static findById(id)
    {
        let db=get_db();
        return db.collection('products')
                 .findOne({_id:new mongodb.ObjectID(id)})
                 .then((product)=>product)
                 .catch((err)=>console.log(err))   
    }
    static deleteById(productId)
    {
        let db=get_db();
        return db.collection('products')
                 .deleteOne({_id:new ObjectID(productId)})
                 .then((result)=>console.log("Deleted"))
                 .catch((err)=>console.log(err))

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