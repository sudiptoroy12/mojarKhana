
import OrderData from "@/models/OrderData";
import db from "@/utils/db";
export default async function handler(req, res) {
   
      
  
    if(req.method === 'POST'){
        await db.connect() 
        let data = await OrderData.findOne({email:req.body.email})
        res.status(200).json({data});

    }
await db.disconnect()

}