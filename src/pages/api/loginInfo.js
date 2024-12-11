


import UserInfo from "@/models/UserInfo"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import db from "@/utils/db"



export default async function handler(req, res) {
let success=false

if(req.method === 'POST'){
    await db.connect() 
    try {
        let{email,password}=req.body
        const user = await UserInfo.findOne({email})
        if(!user){
            return res.status(400).json({success,error:"Invalid ID"})
        }
        const comparePass=await bcrypt.compare(password,user.password)
        if(!comparePass){
            return res.status(400).json({success,error:"Invalid password"})
        }

     
            const data ={
                user:{
                    id:user["_id"]
                }
            }
           
            const token= jwt.sign(data, process.env.JWT_SECRET)
            success= true
           
            res.json({success:success,token:token,email:user.email,isAdmin:user.isAdmin})
        }
        
    catch (error) {
        res.json({success:false,error:error.message})
    }
 
  }
 await db.disconnect() 
}