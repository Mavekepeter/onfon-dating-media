import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.details} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-lg text-gray-600'>OUR OFFICE</p>
          <p className='text-gray-500'>Red Commercial Complex 1st Floor  <br /> P.O. Box 69825-00400 <br /> </p>
          <p className='text-gray-500'>Tel: +254 709 491 700<br />Email: info@onfonmedia.com</p>
          <p className='font-semibold text-lg text-slate-600'>CAREERS AT ONFONMEDIA</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          <button className='border border-red-500 px-8 py-4 text-sm hover:bg-rose-600 hover:text-white transition-all duration-500'>Explore jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Contact