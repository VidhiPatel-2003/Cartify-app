import React from 'react'
import { assets } from "../assest/assets";

const Policy = () => {
  return (
    <>
      <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center text-xs sm:text-sm md:text-base '>
        <div>
          <img src={assets.exchange_icon} alt='exchange icon' className='m-auto mt-7 mb-2 text-gray-600' />
          <p className='font-semibold text-gray-800'>Easy Exchange Policy</p>
          <p className='text-sm text-gray-600 '> We offer hassel free exchange policy</p>
        </div>
        <div>
          <img src={assets.quality_icon} alt='exchange icon' className='m-auto mt-7 mb-2 text-gray-600' />
          <p className='font-semibold text-gray-800'>7 Day Return Policy</p>
          <p className='text-sm text-gray-600 '> We offer hassel free exchange policy</p>
        </div>
        <div>
          <img src={assets.support_img} alt='exchange icon' className='m-auto mt-7 mb-2 text-gray-600' />
          <p className='font-semibold text-gray-800'>Best Customer Support</p>
          <p className='text-sm text-gray-600 '> We provide 24/7 customer support</p>
        </div>
      </div>
    </>
  )
}

export default Policy