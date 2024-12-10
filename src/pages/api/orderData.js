
import OrderData from "@/models/OrderData";
import db from "@/utils/db";
export default async function handler(req, res) {
   
      
  
    if(req.method === 'POST'){
        await db.connect() 
        try {
           const data = req.body.order_data;
           await data.splice(0,0,{order_date:req.body.order_date})
           let id = await OrderData.findOne({email:req.body.email})
           if(id===null){
            await OrderData.create({
                email:req.body.email,
                order_data:[data]
            }).then(()=>{
                res.json({success:true})
            })
           }
           else{
            await OrderData.findOneAndUpdate({email:req.body.email},{$push:{order_data:req.body.order_data}}).then(()=>{
                res.json({success:true})
            })
           }
        } catch (error) {
           res.json({error:error.message}) 
        }
      
       
    }
 await db.disconnect()

}