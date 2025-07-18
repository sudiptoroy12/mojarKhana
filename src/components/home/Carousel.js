import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Image from "next/image";

const Carouselpic = () => {
    const imageArray = [
        {
            id:"1",
            img:"https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            id: "2",
            img:"https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            id:"3",
            img:"https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg?auto=compress&cs=tinysrgb&w=600"
        }
    ]
      
    
  return(
  <Carousel autoPlay showStatus={false} emulateTouch showThumbs={false} infiniteLoop>

    {imageArray.map((data)=>{
        return(
                <div key={data.id}  className='object-center brightness-50v relative  w-full h-[80vh] '>
        <Image src={data.img} alt="pic" fill 
            />
    </div>
        )
    })}

   
   </Carousel>)
  
}

export default Carouselpic
