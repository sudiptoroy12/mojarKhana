import React, { useEffect, useState } from 'react'
import Image from 'next/image'

const orders = () => {
    const [datas,setDatas]=useState([])

    const fetchdata=async()=>{
        const email = localStorage.getItem("myemail")
        
        
        const data = {email}
        const res = await fetch("api/myorderInfo",{method:"POST",
            headers:{
           "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
           })
           let response=await res.json()
    
           setDatas(response.data.order_data)
    }
    useEffect(()=>{
        fetchdata()
    },[])
  
    
  return (
    <div className='text-black dark:text-white flex flex-col mx-auto items-center '>
     {
        datas.map((orderdata,index)=>{
            return(<div key={index}>{orderdata.map((data,index)=>{
                return( 
                    <div key={index} className="box  ">
                    <div className=' font-bold text-2xl dark:bg-black  bg-gray-100 rounded-md '>
                    {data.order_date?(<div className='p-4 border-2 border-black    rounded-lg'>{data.order_date} <hr className=''/></div>) : ( <div className='border-gradient p-4  '>  <div className='relative w-80 h-80 border-2 border-black rounded-lg'>
            <Image src={data.img}
            className="rounded-xl"
            fill
             sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw"
           
            alt="image"
            />
        </div>
        <div className='font-bold text-lg uppercase my-4 items-center flex flex-col font-serif '>{data.name}</div>
        <div className='flex justify-between pb-4'>
    <div className='font-light px-4 font-serif '>{data.qty}</div>
    <div className='font-light px-4 font-serif '>{data.size}</div>
    <div className='font-light px-4 '>{data.price}৳</div>
      </div>
        </div> )}
               </div></div>)
            })}
          </div>)
        })
     }
    </div>
  )
}

export default orders
