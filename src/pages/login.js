import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Login = () => {
  const logout=()=>{
    localStorage.removeItem("myuser");
    localStorage.removeItem("myemail");
  }
    const router = useRouter()
    const[email,setEamil]=useState('')
    const[password,setPassword]=useState('')
    const handleChange=(e)=>{
        if(e.target.name=="email"){
          setEamil( e.target.value)
       }
       else if(e.target.name=="password"){
          setPassword (e.target.value)
       }
      
      }
      const handleSubmit= async (e)=>{
        e.preventDefault()
        const data = {email,password}
        const res = await fetch("api/loginInfo",{method:"POST",
            headers:{
           "Content-Type":"application/json"
            },
            body:JSON.stringify(data),
           })
           let response=await res.json()

           console.log(response)
           if(response.success){
            localStorage.setItem("myuser",response.token)
            localStorage.setItem("myemail",response.email)
           localStorage.setItem("myAdmin",JSON.parse(response.isAdmin))
      router.push("/")
           }
           
      }

  return (
    <div style={{height:"90vh" }} className='flex justify-center items-center w-full '>
        <div className='container max-w-md box'>
        <form onSubmit={handleSubmit} className='bg-gray-100 text-black dark:bg-black dark:text-white border-gradient rounded-lg shadow-2xl px-8 pt-5'>
            <div className='mb-2'>
                <label htmlFor='email' >
                    Email address
                </label>
                <input onChange={handleChange} name='email' type='text' placeholder='Your Email Address' value={email} required className='shadow-lg appearance-none border border-black dark:border-gray-200 rounded w-full py-2 px-3 mt-1  focus:border-red-500 text-gray-700 focus:outline-none   ' >
                </input>
            </div>
       
            <div className='mb-2'>
                <label htmlFor='email'>
                   Password
                </label>
                <input onChange={handleChange}  name='password' type='password' placeholder='*****'  value={password} required className='shadow-lg appearance-none border border-black dark:border-gray-200 rounded w-full py-2 px-3  mt-1  focus:border-red-500 focus:outline-none   dark:text-gray-100 ' >
                </input>
            </div>
            <div className='flex '>
            <button  type="submit" className='bg-gray-950 text-white border font-bold rounded-lg dark:border-white hover:bg-gradient-to-l hover:from-teal-400 hover:via-lime-500 hover:to-lime-400 px-4 py-1 my-4  hover:text-black border-black'>
               
               Login 
            </button>
            <Link href={"/signup"}>
            <button  type="submit" className='bg-gray-950 text-white border font-bold rounded-lg dark:border-white hover:bg-gradient-to-l hover:from-teal-400 hover:via-lime-500 hover:to-lime-400 px-4 py-1 my-4 mx-4 hover:text-black border-black'>
               
               New User 
            </button></Link>
            <Link href={"/signup"}>
            <button onClick={logout}  type="submit" className='bg-gray-950 text-white border font-bold rounded-lg dark:border-white hover:bg-gradient-to-l hover:from-teal-400 hover:via-lime-500 hover:to-lime-400 px-4 py-1 my-4 mx-4 hover:text-black border-black'>
               
               logout
            </button></Link>
</div>
        </form>
     </div>
    </div>
  )
}

export default Login
