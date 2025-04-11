import React, { useContext } from 'react'
import { ShopContext } from '../context/Shopcontext';
import { Link } from 'react-router-dom';

interface Propstype {
  id: string;
  name: string;
  image: string;
  price: number;
  description?: string;
}
const ProductItem: React.FC<Propstype> = ({ id, name, image, price, description }) => {
  const { currency } = useContext(ShopContext);
  return (
    <>
      <Link to={`/product/${id}`} className='text-gray-600 cursor-pointer'>
        <div className='overflow-hidden'><img src={image} alt="" className='hover:scale-110  transaction ease-in-out w-[270px] h-[300px]' /></div>
        <p className='pt-3 pb-1 text-base text-gray-700'>{name}</p>
        <p className='py-1 pb-1 text-sm'>{description}</p>
        <p className='text-sm font-medium'>{currency}{price}</p>
      </Link>
    </>
  )
}

export default ProductItem
