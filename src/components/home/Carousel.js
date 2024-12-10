import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const Carouselpic = () => {
  return <Carousel autoPlay showStatus={false} emulateTouch showThumbs={false} infiniteLoop>
    <div style={{maxHeight: "36rem"}} className='object-center brightness-50'>
        <img src="https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=600" alt="pic" />
    </div>
    <div style={{maxHeight: "36rem"}} className='object-center brightness-50'>
        <img src="https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=600" alt="pic" />
    </div>
    <div style={{maxHeight: "36rem"}} className='object-center brightness-50'>
        <img src="https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg?auto=compress&cs=tinysrgb&w=600" alt="pic" />
    </div>
   </Carousel>
  
}

export default Carouselpic
