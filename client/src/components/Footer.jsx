import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
const Footer = () => {
    const navigate = useNavigate()
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

            <div>
                <img className='mb-5 w-40' src={assets.onfonlogo} alt="" />
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>At onfonmedia, 
                we are dedicated to providing compassionate and expert care for your furry friends. 
                From routine check-ups to specialized heart felt attentions and affections , we are here to ensure you live a happy, 
                healthy lives.</p>
            </div> 

             <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Private policy</li>
                </ul>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <div className='flex flex-col'>
               <img src={assets.whatapp}   onClick={() => window.open('https://wa.me/254708462058', '_blank')}className='w-10 h-10'   alt="" />
                </div>
               

                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+254-240-909-011</li>
                    <li>onfonm@gmail.com</li>
                </ul>
            </div>

            

        </div>

        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2025 @ onfonmedia - All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer