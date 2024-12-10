import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { baseUrl } from '../../../baseUrl'

const Slug = (props) => {
  
    
  return (
    <div className='text-black dark:text-white flex flex-col mx-auto items-center '>
        <Link href={"/"}>
        <div className='flex justify-center items-center border rounded-full max-w-fit p-3 mt-6 mx-auto bg-gradient-to-r from-teal-400  via-lime-500 to-lime-400 hover:bg-gradient-to-l hover:from-teal-400 hover:via-lime-500 hover:to-lime-400 text-black hover:scale-110'>
        <svg xmlns="http://www.w3.org/2000/svg " className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
</svg></div>
        </Link>
        <div className='box '>
      <div className='container border-gradient mx-auto flex items-center flex-col w-96 p-3  bg-gray-100 dark:bg-black rounded-md '>
        <div className='relative w-full h-96 border-2 border-black rounded-lg '>
            <Image src={props.datas.img}
            className="rounded-xl"
            layout="fill"
            objectFit="cover"
            alt="image"
            />
        </div>
    <div className='font-bold text-lg uppercase m-4 font-serif '>{props.datas.name}</div>
    <div className='font-light px-4 font-serif mb-2'>{props.datas.description}</div>
      </div></div>

    </div>
    
  )
}

export default Slug

export async function getServerSideProps(context) {

 const {slug}=context.query

      const foodData = await fetch(baseUrl+"api/dataInfo",{method:"POST",
         headers:{
        "Content-Type":"application/json"
         },
         body:JSON.stringify({slug:slug}),
        })
    const datas = await foodData.json()
   
      

    return{
      props:{datas:datas.data ||null }
    }
  }
  

