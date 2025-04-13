const mongoose=require("mongoose")

const cartSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true,
    },
    items:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"product",
                require:true
            },
            quantity:{
                type:Number,
                rerquire:true,
                min:1,
            }
        }
    ]

},{
    timestamps:true
})

module.exports=mongoose.model("Cart",cartSchema)