import { useContext } from 'react'
import { ShopContext } from '../context/Shopcontext'
import Title from './Title'

const CartTotal = () => {

  const { getTotalAmount, currency, delivery_fee } = useContext(ShopContext)
  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title text1={"Total"} text2={"Amount"} />
      </div>
      <div className='flex flex-col gap-2 text-sm mt-18'>
        <div className='flex justify-between mt-2'>
          <p className='text-lg'>Subtotal</p>
          <p className='text-lg'>{currency}{getTotalAmount().toFixed(2)}</p>
        </div>
        <div className='flex justify-between'>
          <p>Shipping fee</p>
          <p>{currency}{(delivery_fee).toFixed(2)}</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <b className='text-2xl text-gray-700'>Total</b>
          <b className='text-2xl text-gray-700'>{currency}{getTotalAmount() === 0 ? 0 : (getTotalAmount() + delivery_fee).toFixed(2)}</b>
        </div>

      </div>
    </div>
  )
}

export default CartTotal;