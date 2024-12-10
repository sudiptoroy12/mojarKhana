import mongoose from "mongoose";



const orderInfoSchema = new mongoose.Schema(
    {
    
        email:{type:String,required:true,unique:true},
        order_data:{type:Array,required:true},
      
    
       
    },
    {timestamps:true}

)

const OrderData= mongoose.models.OrderData|| mongoose.model("OrderData",orderInfoSchema)

export default OrderData;