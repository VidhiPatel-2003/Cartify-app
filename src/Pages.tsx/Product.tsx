import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/Shopcontext';

const Product: React.FC = () => {
  const { currency } = useContext(ShopContext)
  const { productid } = useParams();
  console.log(productid);
  return (
    <>
      <div className='flex '>
        <div className='border border-gray-50 w-1/3'>
          <img src="https://www.aachho.com/cdn/shop/files/89_4686db66-8a21-4552-83d2-cb0e8a02e9d0_1080x.jpg?v=1691220214" className='h-[600px] rounded-lg  ' />
          <div className='flex flex-row justify-evenly'>
            <img src="https://www.aachho.com/cdn/shop/files/89_4686db66-8a21-4552-83d2-cb0e8a02e9d0_1080x.jpg?v=1691220214" alt="" className='w-[110px] h-[110px] my-3 mr-3 border border-gray-700 rounded-sm' />
            <img src="https://www.aachho.com/cdn/shop/files/89_4686db66-8a21-4552-83d2-cb0e8a02e9d0_1080x.jpg?v=1691220214" alt="" className='w-[110px] h-[110px] m-3 border border-gray-700 rounded-sm' />
            <img src="https://www.aachho.com/cdn/shop/files/89_4686db66-8a21-4552-83d2-cb0e8a02e9d0_1080x.jpg?v=1691220214" alt="" className='w-[110px] h-[110px] m-3 border border-gray-700 rounded-sm' />
          </div>
        </div>
        <div className='border border-gray-300 w-1/2 m-4 p-2 '>
          <div className='  text-xl p-2 mt-4'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. At, totam est esse numquam doloribus</div>
          <div className='flex  border-b'>
            <div className='w-1/4 flex justify-center m-3 mt-5 text-red-700 text-2xl  '>{currency } 120</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Product