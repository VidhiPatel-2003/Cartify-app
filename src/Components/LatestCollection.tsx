import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/Shopcontext'
import Title from './Title';
import ProductItem from './ProductItem';
import { collection, doc, getDocs, QueryDocumentSnapshot } from "firebase/firestore";
import { db } from '../Firebase/firebase';



const LatestCollection = () => {

  const { products, latestProduct } = useContext(ShopContext);

  return (
    <>
      <Title text1="Latest" text2="Collection" />
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 gap-y-3 mt-5'>
        {latestProduct.map((item, index) => (
          <ProductItem key={index} id={item._id} name={item.name} image={item.imageUrl} price={item.price} description={item.description} discount={item.discount} quantity={item.quantity} />
        ))}
      </div>
    </>
  )
}

export default LatestCollection