import mongoose from "mongoose";



const userInfoSchema = new mongoose.Schema(
    {
        name:{type:String,required:true},
        email:{type:String,required:true,unique:true},
        password:{type:String,required:true},
        phone:{type:String,required:true},
        address:{type:String,required:true},
        isAdmin:{type:Boolean,default:false},
    
       
    },
    {timestamps:true}

)

const UserInfo= mongoose.models.UserInfo || mongoose.model("UserInfo",userInfoSchema)

export default UserInfo;