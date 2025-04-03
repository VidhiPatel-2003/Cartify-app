import React from 'react'

const Mainphoto: React.FC = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400 my-8  gap-10'>
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 '>
        <div className='text-[]'>
          <div className='flex items-center gap-0.5'>
            <p className='w-3  border-none sm:w-6 bg-black h-[1px]'></p>
            <p className='w-3 border-none sm:w-6 bg-black h-[1px]'></p>
            <p className='font-[65px] text-sm md:text-sm lg:text-base gap-2 '>OUR ALL TIME FAVORITE</p>
          </div>
          <h1 className=' font-serif text-3xl text-gray-800 leading-relaxed lg:text-5xl sm:py-3'>Summer Collection</h1>
          <div className='flex items-center gap-0.5'>
            <p className='pl-[210px] text-sm   md:text-sm lg:text-base  gap-2 '>DISCOVER MORE</p>
            <p className='w-3 sm:w-6 bg-black h-[1px]'></p>
            <p className='w-3 sm:w-6 bg-black h-[1px]'></p>
          </div>
        </div>
      </div>
      <img src='https://digitalscholar.in/wp-content/uploads/2022/09/seo-tips-for-fashion-e-commerce-website.jpg' alt='A Girl With Shopping Trolly' className='w-full sm:w-1/2' />
    </div>
  )
}

export default Mainphoto