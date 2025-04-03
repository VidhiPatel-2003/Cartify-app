import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { ShopContext } from '../context/Shopcontext'
import ProductItem from './ProductItem';

const Bestcollection = () => {

  const { products } = useContext(ShopContext);
  const [bestseller, setBestSeller] = useState<any[]>([]);

  useEffect(() => {
    const bestproduct = products.filter((item) => (item.bestseller));
    setBestSeller(bestproduct.slice(0, 10));
  }, [])
  return (
    <>
      <Title text1='BEST' text2='Seller' />
      <div className='grid grid-col-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 gap-y-3 mt-8'>
        {bestseller.map((item, index) => (
          <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
        ))}
      </div>
    </>
  )
}

export default Bestcollection