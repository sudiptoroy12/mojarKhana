
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const admin = () => {
    const router = useRouter()
    const[name,setName]=useState('')
    const[category,setCategory]=useState('')
    const[foodType,setFoodType]=useState('')
    const[price,setPrice]=useState('')
    const[description,setDescription]=useState('')
    const[img,setImg]=useState('')
    const[seen,setSeen]= useState(false)
   
 
    const PizzaOption = { regular: "", medium: "", large: "" }
    const SideOption =  { single: "", double: "" }
    const handleChange=(e)=>{
        if(e.target.name=="name"){
          setName( e.target.value)
       }
        else if(e.target.name=="category"){
          setCategory( e.target.value)
          if(e.target.value==="Pizza"){
            setPrice(PizzaOption)
          }
         else if(e.target.value==="SIDES & BEVERAGES"){
            setPrice(SideOption)
          }
         else if(e.target.value==="nan"){
            setPrice("")
          }
     
       }
       else if(e.target.name=="foodType"){
          setFoodType (e.target.value)
       }
       else if(e.target.name=="price"){
          setPrice (e.target.value)
       }
      
       else if(e.target.name=="description"){
          setDescription (e.target.value)
       }
       else if(e.target.name=="img"){
          setImg (e.target.value)
       }
      
      }
      const handleSubmit= async (e)=>{
        e.preventDefault()
        const data = {name,category,foodType,price,description,img}
      
        const res = await fetch("api/createData",{method:"POST",
            headers:{
           "Content-Type":"application/json"
            },
            body:JSON.stringify(data),
           })
           let response=await res.json()

           console.log(response)
           if(response.success){
            alert("Data created successfully")
           }
           
           
      }
      ;
      useEffect(()=>{
        if(JSON.parse(localStorage.getItem("myAdmin"))===true)
        {
            setSeen(true)
        }
      },[])
      
  return (
    <>
    {
        seen ?  <div style={{minHeight:"100vh" }} className='flex flex-col items-center  w-full mt-10 '>
        <div className='container max-w-md box '>
        <form onSubmit={handleSubmit} className='bg-gray-100  dark:bg-black dark:text-white border-gradient rounded-lg  px-8 pt-5 '>
            <div className='mb-2'>
                <label htmlFor='name' >
                    Name
                </label>
                <input onChange={handleChange} name='name' type='text' placeholder='Your Name' value={name} required className='shadow-lg appearance-none border border-gray-400 rounded w-full py-2 px-3  mt-1 focus:border-red-600 text-gray-700 focus:outline-none  dark:text-gray-100 ' >
                </input>
            </div>
            <div className='mb-2'>
                <label htmlFor='email' 
                >
                    Category
                </label>
                <select onChange={handleChange} name='category' type='text' placeholder='Foods category' style={{"-webkit-appearance":"auto"}} value={category} required className='shadow-lg appearance-none border border-gray-400 rounded w-full py-2 px-3  mt-1 focus:border-red-600 text-gray-700 focus:outline-none  dark:text-gray-100 ' >
                    <option value="nan">Select Category</option>
                    <option value="Pizza">Pizza</option>
                    <option value="SIDES & BEVERAGES">Sides & Beverages</option>
                </select>
            </div>
       
            <div className='mb-2'>
                <label htmlFor='foodType' >
                   FoodType
                </label>
                <select onChange={handleChange}  name='foodType' type='password' placeholder='Food type'  value={foodType} style={{"-webkit-appearance":"auto"}} required className='shadow-lg appearance-none border border-gray-400 rounded w-full py-2  mt-1 px-3 focus:border-red-600 focus:outline-none text-black dark:text-gray-100 ' >
                <option value="nan">Select FoodType</option>
                    <option value="Veg">Veg</option>
                    <option value="Non-Veg">Non-Veg</option>
                </select>
            </div>
     {  category!=""&& price!=""  &&  <div className='mb-2'>
            <label htmlFor='price' >
                   Price
                </label>
                {
                    price !== "" && Object.keys(price).map((key)=>{console.log(price[key]);
                        
                        return <div key={key} className='mb-2'>
                        
                              <label htmlFor={key} >
                   {key}
                </label>
                               <input value={price[key]} onChange={(e)=>{
                                    setPrice({...price,[key]:e.target.value})
                               }} 
                                name={key} type='number' placeholder={ `price of ${key}`}   required className='shadow-lg appearance-none border border-gray-400 rounded w-full py-2  mt-1 px-3 focus:border-red-600 focus:outline-none text-black dark:text-gray-100 ' >
                </input>  
                        </div>
                      
                        
                    })
                }
             
            </div>
}
            <div className='mb-2'>
                <label htmlFor='description' >
                   Description
                </label>
                <textarea onChange={handleChange}  name='description' type='text' placeholder='Foods description'  value={description} required className='shadow-lg appearance-none border border-gray-400 rounded w-full py-2  mt-1 px-3 focus:border-red-600 focus:outline-none text-black dark:text-gray-100 ' >
                </textarea>
            </div>
            <div className='mb-2'>
                <label htmlFor='img' >
                   Image
                </label>
                <input onChange={handleChange}  name='img' type='url' placeholder='Image'  value={img} required className='shadow-lg appearance-none border border-gray-400 rounded w-full py-2  mt-1 px-3 focus:border-red-600 focus:outline-none text-black dark:text-gray-100 ' >
                </input>
            </div>
            <div className='flex'>
            <button  type="submit"className='bg-gray-950 text-gray-100 border font-bold rounded-lg hover:bg-gradient-to-l hover:from-teal-400 hover:via-lime-500 hover:to-lime-400 px-4 py-1 my-4  hover:text-black border-black dark:border-white'>
               
               Create 
            </button>
            <Link href={"/login"}>
            <button  type="submit" className='bg-gray-950 text-gray-100 border dark:border-white  font-bold rounded-lg hover:bg-gradient-to-l hover:from-teal-400 hover:via-lime-500 hover:to-lime-400 px-4 py-1 my-4 mx-4 hover:text-black border-black'>
               
               Delete 
            </button></Link>
</div>
        </form>
     </div>
    </div> : <div className='text-white'>not found</div>
    }
    </>
  
  )
}

export default admin
