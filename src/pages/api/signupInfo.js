


import UserInfo from "@/models/UserInfo"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import db from "@/utils/db"


export default async function handler(req, res) {
let success=false
const salt = await bcrypt.genSalt(10)
let sPassword= await bcrypt.hash(req.body.password,salt)
if(req.method === 'POST'){
    await db.connect() 
    try {
        await UserInfo.create({
            name:req.body.name,
            email:req.body.email,
            password:sPassword,
            phone:req.body.phone,
            address:req.body.address,
          
        }).then((user)=>{
            const data ={
                user:{
                    id:user["_id"]
                }
            }
         
            const token= jwt.sign(data,process.env.JWT_SECRET)
            success= true
           
            res.json({success:success,token:token})
        }).catch((error)=>{
            res.json({error:error.message})
        })
        
    }catch (error) {
        res.json({error:error.message})
    }

  }
 await db.disconnect()  
}