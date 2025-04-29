import React, { useContext } from 'react'
import Title from '../Components/Title'
import CartTotal from '../Components/CartTotal'
import { Link } from 'react-router-dom'
import Addcart from './Addcart'
import { ShopContext } from '../context/Shopcontext'

const ReusableCart = () => {

  const { cartData } = useContext(ShopContext)
  return (
    <div className='border-t mt-14'>
      <div className='text text-2xl mb-8'>
        <Title text1={"Your"} text2={"Cart"} />
      </div>
      <div >
        <Addcart />
      </div>
      {cartData.length > 0 && <div className='flex justify-end m-6'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end '>
            <Link to='/placeorder'><button className='bg-black text-white my-5 py-3 text-lg  w-[250px]'>Proceed To Check</button></Link>
          </div>
        </div>
      </div>}
    </div>
  )
}

export default ReusableCart;