const mongoose= require("mongoose")

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
        unique:true,
    },
    role:{
        type:String,
        default:"user"
    }
})

const user=mongoose.model("User",userSchema)
module.exports=user;