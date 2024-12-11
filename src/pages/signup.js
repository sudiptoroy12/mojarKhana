import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const router = useRouter()
    const[name,setName]=useState('')
    const[email,setEamil]=useState('')
    const[password,setPassword]=useState('')
    const[phone,setPhone]=useState('')
    const[address,setAddress]=useState('')


    const handleChange=(e)=>{
        if(e.target.name=="name"){
          setName( e.target.value)
       }
        else if(e.target.name=="email"){
          setEamil( e.target.value)
       }
       else if(e.target.name=="password"){
          setPassword (e.target.value)
       }
       else if(e.target.name=="phone"){
          setPhone (e.target.value)
       }
       else if(e.target.name=="address"){
          setAddress (e.target.value)
       }
      
      }
      const handleSubmit= async (e)=>{
        e.preventDefault()
        const data = {name,email,password,phone,address}
        const res = await fetch("api/signupInfo",{method:"POST",
            headers:{
           "Content-Type":"application/json"
            },
            body:JSON.stringify(data),
           })
           let response=await res.json()

           console.log(response)
           if(response.success){
           toast.success('You are signup successfully .....', {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
           
            });
            setTimeout(() => {
               router.push("/login")
          },1200);
        }
          else{
            toast.success(response.error, {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
               
                });
            }
           
      }

  return (
    <div>
    <ToastContainer
     position="top-left"
     autoClose={5000}
     hideProgressBar={false}
     newestOnTop={false}
     closeOnClick
     rtl={false}
     pauseOnFocusLoss
     draggable
     pauseOnHover
     />
    <div style={{minHeight:"90vh" }} className='flex justify-center items-center w-full '>
        <div className='container max-w-md box'>
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
                    Email address
                </label>
                <input onChange={handleChange} name='email' type='text' placeholder='Your Email Address' value={email} required className='shadow-lg appearance-none border border-gray-400 rounded w-full py-2 px-3  mt-1 focus:border-red-600 text-gray-700 focus:outline-none  dark:text-gray-100 ' >
                </input>
            </div>
       
            <div className='mb-2'>
                <label htmlFor='password' >
                   Password
                </label>
                <input onChange={handleChange}  name='password' type='password' placeholder='*****'  value={password} required className='shadow-lg appearance-none border border-gray-400 rounded w-full py-2  mt-1 px-3 focus:border-red-600 focus:outline-none text-black dark:text-gray-100 ' >
                </input>
            </div>
            <div className='mb-2'>
                <label htmlFor='phone' >
                   Phone
                </label>
                <input onChange={handleChange}  name='phone' type='phone' placeholder='Enter Your Phone No'  value={phone} required className='shadow-lg appearance-none border border-gray-400 rounded w-full py-2  mt-1 px-3 focus:border-red-600 focus:outline-none text-black dark:text-gray-100 ' >
                </input>
            </div>
            <div className='mb-2'>
                <label htmlFor='address' >
                   Address
                </label>
                <input onChange={handleChange}  name='address' type='text' placeholder='Your Address'  value={address} required className='shadow-lg appearance-none border border-gray-400 rounded w-full py-2  mt-1 px-3 focus:border-red-600 focus:outline-none text-black dark:text-gray-100 ' >
                </input>
            </div>
            <div className='flex'>
            <button  type="submit"className='bg-gray-950 text-gray-100 border font-bold rounded-lg hover:bg-gradient-to-l hover:from-teal-400 hover:via-lime-500 hover:to-lime-400 px-4 py-1 my-4  hover:text-black border-black dark:border-white'>
               
               Login 
            </button>
            <Link href={"/login"}>
            <button  type="submit" className='bg-gray-950 text-gray-100 border dark:border-white  font-bold rounded-lg hover:bg-gradient-to-l hover:from-teal-400 hover:via-lime-500 hover:to-lime-400 px-4 py-1 my-4 mx-4 hover:text-black border-black'>
               
               Have Account 
            </button></Link>
</div>
        </form>
     </div>
    </div>
    </div>
  )
}

export default Signup
