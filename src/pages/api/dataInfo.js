import FoodData from "@/models/FoodData";
import db from "@/utils/db";
export default async function handler(req, res) {
   
      
  
    if(req.method === 'POST'){
        await db.connect() 
        let data = await FoodData.findById(req.body.slug)
        res.status(200).json({ data});
    }
await db.disconnect()

}