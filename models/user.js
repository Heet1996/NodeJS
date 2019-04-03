const {get_db}=require('../util/database');
const mongodb=require('mongodb');
const ObjectId=mongodb.ObjectID;
class User
{
    constructor(userName,email,cart,_id)
    {
        this.userName=userName;
        this.email=email;
        this.cart=cart;
        this._id=_id;
    }
    save()
    {
        let db=get_db();
        return db.collection('users')
                .insertOne(this) 
                .then((user)=>console.log(user))
    }
    getCart()
    {
        const db=get_db();
        let productIds=this.cart.items.map((i)=>i.productId);

        db.collection('products')
          .find({_id:{$in:productIds}})
          .toArray()
          .then((products)=>{
            return products.map(p=>{
                return {
                    ...p,
                    quantity:this.cart.items.find((i)=>{
                        return i.productId.toString()==p._id.toString();
                    }).quantity
                }
            })
          })  
    }
    addToCart(productId)
    {   
        const findCartIndex=this.cart.items.findIndex(cp=>{
            return cp.productId==productId
        });
        let updatedCartItems=[...this.cart.items];
        let newQuantity=1;
        if(findCartIndex>=0)
        {
            newQuantity=updatedCartItems[findCartIndex].quantity+1;
            updatedCartItems[findCartIndex].quantity=newQuantity;
        }
        else
        {
            updatedCartItems.push({
                productId:new ObjectId(productId),
                quantity:newQuantity
            })
        }
        const updatedCart={items:updatedCartItems};

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