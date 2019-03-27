const {get_db}=require('../util/database');
const mongodb=require('mongodb');
const ObjectId=mongodb.ObjectID;
class User
{
    constructor(userName,email,cart)
    {
        this.userName=userName;
        this.email=email;
        this.cart=cart;
    }
    save()
    {
        let db=get_db();
        return db.collection('users')
                .insertOne(this) 
                .then((user)=>console.log(user))
    }
    addedCart(product)
    {
        //cart={items:[{...product,quantity}]}
        const updatedCart={items:[{...product,quantity:1}]};
        const db=get_db();
        return db
               .collection('users')
               .updateOne(
                   {_id:new ObjectId(this._id)},
                   {$set: {cart:updatedCart}}
               );
    }
    static findById(id)
    {
        let db=get_db();
        return db.collection('users')
                 .find({_id:new ObjectId(id)})   
                 .next()

                }               
}
module.exports=User;