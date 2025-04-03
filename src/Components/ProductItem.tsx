import React, { useContext } from 'react'
import { ShopContext } from '../context/Shopcontext';
import { Link } from 'react-router-dom';

interface Propstype {
  id: string;
  name: string;
  image: string;
  price: number
}
const ProductItem: React.FC<Propstype> = ({ id, name, image, price }) => {
  const { currency } = useContext(ShopContext);
  return (
    <>
      <Link to={`/product/${id}`} className='text-gray-600 cursor-pointer'>
        <div className='overflow-hidden'><img src={image} alt="" className='hover:scale-110  transaction ease-in-out' /></div>
        <p className='pt-3 pb-1 text-sm'>{name}</p>
        <p className='text-sm font-medium'>{currency}{price}</p>
      </Link>
    </>
  )
}

export default ProductItem
