import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/Shopcontext'
import Title from './Title';
import ProductItem from './ProductItem';


interface LatestproductType {
  _id: string;
  name: string;
  price: string;
  image: string;
}
const LatestCollection = () => {

  const { products } = useContext(ShopContext);
  const [latestProduct, setLatestProduct] = useState<any[]>([]);
  useEffect(() => {
    setLatestProduct(products.slice(0, 10));
  }, [])
  console.log(products);
  return (
    <>
      <Title text1="Latest" text2="Collection" />
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 gap-y-3 mt-5'>
        {latestProduct.map((item, index) => (
          <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
        ))}
      </div>
    </>
  )
}

export default LatestCollection