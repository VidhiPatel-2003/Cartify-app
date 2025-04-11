import React from 'react'
import Title from '../Components/Title'
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";

const Contact: React.FC = () => {
  return (
    <div>
      <div className=' text-2xl text-center pt-8 border-t'>
        <Title text1="Contact" text2="Us" />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src="https://cdn.ignitingbusiness.com/images/easyblog_images/489/6-must-have-pages-for-your-ecommerce-website.jpeg" alt='contact us' className='w-full md:max-w-[480px]' />
        <div className='flex flex-col justify-center items-start gap-6 '>
          <p className='font-semibold text-xl text-gray-600'> Our Store</p>
          <p className='text-gray-400'>1-A Business Park<br />420 - Random Choose ,Ahemdabad -380001</p>
          <div className='flex flex-row items-center justify-center text-gray-600 '><FaPhoneAlt className='text-[15px] mr-2' /> +91 180-1800-000</div>
          <div className='flex flex-row items-center justify-center text-gray-600'><MdOutlineMail className='text-[19px] mr-2' /> cartif@gmail.com</div>
          <p className='font-semibold text-xl text-gray-600'>Carreer At Forever</p>
          <p className='text-gray-400'>Join the Forever family and be part of a growing brand that's passionate about fashion, creativity, and customer satisfaction. We’re always looking for driven, style-forward individuals to help us shape the future of fashion retail. Whether you're into design, marketing, or customer service, there's a place for you here.</p>
        </div>
      </div>
    </div>
  )
}

export default Contact