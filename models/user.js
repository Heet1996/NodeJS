const mongoose=require('mongoose');
let userSchema=new mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String
    },
    cart:{
        items:[{
            productId:{type:mongoose.Schema.Types.ObjectId,ref:'Product',required:true},
            quantity:{type:Number,required:true}
        }]
    }

});
userSchema.methods.addToCart=function(productId)
{   console.log(productId);
    let cartProductIndex=this.cart.items.findIndex(cp=>cp.productId.toString().trim()==productId.toString().trim());
    let newQuantity=1;
    let updatedCartItem=[...this.cart.items];
    console.log(cartProductIndex);
    if(cartProductIndex>=0)
    {
        newQuantity=this.cart.items[cartProductIndex].quantity+1;
        updatedCartItem[cartProductIndex].quantity=newQuantity;
        
        
    }
    else{
        updatedCartItem.push({productId:productId.toString().trim(),quantity:1})
    }
    let updatedCart={items:updatedCartItem};
    this.cart=updatedCart;
    return this.save();

}
userSchema.methods.deleteFromCart=function(productId)
{
    let updatedCartItem=this.cart.items.filter(item=>{
            return item.productId.toString()!==productId.toString();   
    });
    this.cart.items=updatedCartItem;
    return this.save();
}
userSchema.methods.clearCart=function(){
    this.cart.items=[];
    return this.save();
}
module.exports=mongoose.model('User',userSchema);