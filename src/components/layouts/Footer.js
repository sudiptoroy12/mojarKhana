import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
<footer className="sticky z-30 bg-gradient-to-r from-teal-200 via-lime-500 to-lime-200 ">

      <div className="container mx-auto p-3 md:flex-row flex-col flex flex-wrap items-center">
        <Link
          href={"/"}
          className="flex font-extrabold items-center uppercase text-black"
        >
          <p className="text-3xl mx-8 md:mx-4 font-serif">Mojar Khana</p>
        </Link>

        <p className='mx-8 text-sm font-sans'>Copyright 2024 Mojar Khana</p>
       
      </div>
    
</footer>
  )
}

export default Footer
