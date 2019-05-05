const mongoose=require('mongoose');

let orderSchema=new mongoose.Schema({
    products:[{
        product:{
            type:Object,
            require:true
        },
        quantity:{
            type:Number,
            required:true
        }
    }],
    user:{
        name:{
            type:String,
            required:true    
        },
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'User'
        }
    }
});

module.exports=mongoose.model('Order',orderSchema);