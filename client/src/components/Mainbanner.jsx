import React from 'react'
import { assets } from '../assets/assets'

const Mainbanner = () => {
  return (
    <div className="w-full">
  {/* Large screens */}
  <img 
    src={assets.banner} 
    alt="banner" 
    className="hidden md:block w-full max-w-[2047px] h-120 rounded-lg mx-auto mt-9 mb-12 object-cover" 
  />
  
  <img 
    src={assets.bannerSmall || assets.banner} 
    alt="banner" 
    className="block md:hidden w-full h-56 rounded-md mx-auto mt-6 mb-8 object-cover" 
  />
</div>

    
  )
}

export default Mainbanner
