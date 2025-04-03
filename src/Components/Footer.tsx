import React from 'react'
import companylogo from '../companylogo.png'
import { Link } from 'react-router-dom'
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { AiOutlineCopyright } from "react-icons/ai";


const Footer = () => {
  return (
    <>
      <div className='flex flex-col  bg-gray-700 text-white border border-gray-100 mt-5'>
        <div className='flex flex-col sm:flex-row font-normal mt-6  mb-1 py-4 px-4 justify-around '>
          <div className='flex flex-col'>
            <div className='flex flex-row font-bold text-4xl '>
              {/* <img src={companylogo} alt='company logo' className='w-16 bg-gray-700' /> */}
              <h1 className='font-bold text-blue-200'>Cartify</h1></div>
            <div> <p className='w-[500px] mt-3 text-sm'>Cartify is a dynamic online fashion store offering trendy apparel for men, women, and kids. With a user-friendly interface, secure payments, fast shipping, and hassle-free returns, shoppers can explore collections, filter styles, and enjoy exclusive discounts. Cartify ensures a seamless and enjoyable shopping experience for fashion enthusiasts worldwide.</p></div>
          </div>
          <div className='px-2  w-[120px]'>
            <p className='font-medium text-base'>Company :</p>
            <ul className='mt-2'>
              <li className='text-sm'><Link to='/'>Home</Link></li>
              <li className='text-sm'><Link to='/about'>About</Link></li>
              <li className='text-sm'><Link to='/contact'>Contact</Link></li>
            </ul>
          </div>
          <div className='px-2  w-[200px]'>
            <p className='font-medium text-base'>Contact :</p>
            <ul className='mt-2'>
              <li><div className='flex flex-row items-center justify-center '><FaPhoneAlt className='text-[15px] mr-2' /> +91 180-1800-000</div></li>
              <li><div className='flex flex-row items-center justify-center'><MdOutlineMail className='text-[19px] mr-2' /> cartif@gmail.com</div></li>
            </ul>
          </div>
        </div>
        <div className='flex flex-row items-center justify-center text-red-100'><AiOutlineCopyright /> 2025 Cartify. All rights reserved.</div>
      </div>
    </>
  )
}

export default Footer