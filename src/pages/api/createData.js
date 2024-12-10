import FoodData from "@/models/FoodData";
import db from "@/utils/db";
export default async function handler(req, res) {
    if(req.method === 'POST'){
       await db.connect()  
       try {
          
        let data=new FoodData({
            name:req.body.name,
            category:req.body.category,
            foodType:req.body.foodType,
            price:req.body.price,
            description:req.body.description,
            img:req.body.img,  
        })
        await data.save()
        res.json({success:true}) 
    
       } catch (error) {
        res.json({error:error.message}) 
       }
     
    }
    await db.disconnect()

}