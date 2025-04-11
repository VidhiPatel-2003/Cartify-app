import React from 'react'
import Title from '../Components/Title'

const About: React.FC = () => {
  return (
    <div>
      <div className=' text-2xl text-center pt-8 border-t'>
        <Title text1="About" text2="Us" />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src='https://static.vecteezy.com/system/resources/thumbnails/031/618/023/small/composition-of-shopping-day-concept-with-shopping-bags-paper-bags-and-copy-space-shopping-days-concept-by-ai-generated-free-photo.jpg' alt='About us' className='w-full md:max-w-[450px]' />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>At <span className='font-serif text-gray-900'>Cartify</span>, we believe fashion should be effortless, affordable, and expressive. We offer a carefully curated collection of stylish clothing for every occasion—whether you're dressing up or keeping it casual. Quality, comfort, and customer satisfaction are at the heart of everything we do. Shop with us and wear your style confidently.</p>
          <p>We’re more than just a clothing store—we’re a community. </p>
          <b className='text-gray-800'>Our Mission</b>
          <p> Our mission is to help you look and feel your best with pieces that match your unique style. New arrivals drop regularly, so there’s always something fresh to discover.
          </p>
        </div>
      </div>
      <div className='text-xl py-4 '>
        <Title text1='Why' text2='Choose Us' />
      </div>
      <div>
        <div className='  flex py-6 '>
          <div className='flex flex-col border py-8 sm:py-20 px-10 md:px-16 gap-5'>
            <b > Quality Assurance :-</b>
            <p>We’re committed to providing high-quality clothing made with care and attention to detail. Every item is carefully inspected to ensure it meets our standards for durability, comfort, and style—so you can shop with confidence.</p></div>
          <div className='flex flex-col border py-8 sm:py-20 px-10 md:px-16  gap-5'>
            <b>Convenience :-</b>
            <p>Shopping with us is simple and hassle-free. Enjoy a smooth online experience, secure payments, and fast delivery right to your doorstep. Need help? Our friendly support team is always here for you.</p></div>
          <div className='flex flex-col border py-8 sm:py-20 px-10 md:px-16  gap-5'>
            <b>Exceptional Customer Service :-</b>
            <p>Your satisfaction is our top priority. Our dedicated support team is here to assist you every step of the way—from questions about products to post-purchase help. We’re always just a message away.</p></div>
        </div>
      </div>
    </div>
  )
}

export default About

{/* <div className='text-4xl py-4'>
<Title text1='Why' text2='Choose Us' />
</div>
<div className='flex flex-col md:flex-row mb-20'>
<div className='border px-16 md:px-10 py-8 sm:py-20 flex flex-col gap-5'></div>
<b>quality insurance</b>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit nostrum, commodi accusamus eaque quo ipsum, aut pariatur soluta doloremque architecto voluptatum ad, quas tempore error recusandae velit ea blanditiis totam!</p>
<b>Convience</b>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit nostrum, commodi accusamus eaque quo ipsum, aut pariatur soluta doloremque architecto voluptatum ad, quas tempore error recusandae velit ea blanditiis totam!</p>
<b></b>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit nostrum, commodi accusamus eaque quo ipsum, aut pariatur soluta doloremque architecto voluptatum ad, quas tempore error recusandae velit ea blanditiis totam!</p>
</div> */}