const mongoose=require('mongoose');
let userSchema=new mongoose.Schema({
    name:{
        required:String,
        type:String
    },
    email:{
        required:true,
        type:String
    },
    cart:{
        items:[{
            productId:{type:mongoose.Schema.Types.ObjectId,required:true},
            quantity:{type:Number,required:true}
        }]
    }

})
module.exports=mongoose.model('user',userSchema);