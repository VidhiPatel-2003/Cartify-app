import React, { useContext, useState, useEffect } from 'react'
import Title from '../Components/Title';
import { ShopContext } from '../context/Shopcontext';
import ProductItem from '../Components/ProductItem';
import { collection, doc, getDocs, QueryDocumentSnapshot } from "firebase/firestore";
import { db } from '../Firebase/firebase';
import Product from './Product';
import Search from '../Components/Search';

interface Product {
  name: string;
  imageUrl: string;
  price: number;
  description: string;
}
interface Productid extends Product {
  _id: string;
}


const Collection: React.FC = () => {
  const [filter, setFilter] = useState<boolean>(false);
  const { issearch, showSearch } = useContext(ShopContext);
  const [allCollection, setAllCollection] = useState<Productid[]>([]);
  const [filtercollection, setFilterCollection] = useState<Productid[]>([]);
  // const [category, setCategory] = useState<string[]>([]);
  // const [subcategory, setSubCategory] = useState<string[]>([]);

  const dataCollection = async () => {
    let querySnapshot = await getDocs(collection(db, "products"));
    let data: Productid[] = querySnapshot.docs.map((doc) => {

      return {
        _id: doc.id,
        ...doc.data() as Product
      }
    }
    )
    setAllCollection(data);
  }

  useEffect(() => {
    dataCollection();
  }, [])

  const filterproduct = () => {
    let filteritem = allCollection.slice();

    if (issearch && showSearch) {
      filteritem = filteritem.filter((item) => item.name.toLowerCase().includes(issearch.toLowerCase()))
    }
    setFilterCollection(filteritem);
  }

  useEffect(() => {
    filterproduct()
  }, [issearch, showSearch, allCollection])

  // const togglecategory = (e: React.ChangeEvent<HTMLInputElement>) => {

  //   if (category.includes(e.target.value)) {
  //     setCategory(prev => prev.filter((item) => item !== e.target.value))
  //   }
  //   else {
  //     setCategory(prev => [...prev, e.target.value])
  //   }
  // }

  // const togglesubcategory = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (subcategory.includes(e.target.value)) {
  //     setSubCategory(prev => prev.filter((item) => item !== e.target.value))
  //   }
  //   else {
  //     setSubCategory(prev => [...prev, e.target.value])
  //   }
  // }

  // const categoyproduct = () => {
  //   let filterproduct = products.slice();
  //   if (category.length > 0) {
  //     filterproduct = filterproduct.filter((item) => category.includes(item.category))
  //   }
  //   if (subcategory.length > 0) {
  //     filterproduct = filterproduct.filter((item) => subcategory.includes(item.category))
  //   }
  //   setAllCollection(filterproduct);
  // }


  // useEffect(() => {
  //   setAllCollection(products);
  // }, [])

  // useEffect(() => {
  //   categoyproduct();
  // }, [category, subcategory])

  // useEffect(() => { console.log("category", category) }, [category])
  // useEffect(() => { console.log("subcategory", subcategory) }, [subcategory])
  return (
    <>
      <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
        <div className='min-w-60'>
          <p onClick={() => setFilter(!filter)} className='font-medium text-gray-800 text-xl my-2 cursor-pointer flex items-center gap-2'>FILTER :-</p>
          <p className={`h-3 sm:hidden ${filter ? 'rotate-90' : ''}text-gray-300`}>	&gt;</p>
          <div className={` border border-gray-200 pl-5 py-3 mt-6  my-5 ${filter ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium'>Category</p>
            <div className='flex flex-col text-sm text-gray-600 font-light'>
              <p className='flex gap-2'>
                {/* <input type='checkbox' className='cursor-pointer' value={'Men'} onChange={togglecategory} />Men */}
                <input type='checkbox' className='cursor-pointer' value={'Men'} onClick={dataCollection} />Men
              </p>
              <p className='flex gap-2'>
                <input type='checkbox' className='cursor-pointer' value={'Woman'} />Woman
                {/* <input type='checkbox' className='cursor-pointer' value={'Woman'} onChange={togglecategory} />Woman */}

              </p>
              <p className='flex gap-2'>
                {/* <input type='checkbox' className='cursor-pointer' value={'Kids'} onChange={togglecategory} />Kids */}
                <input type='checkbox' className='cursor-pointer' value={'Kids'} />Kids
              </p>
            </div>
          </div>
          {/* subcategory */}
          <div className={` border border-gray-200 pl-5 py-3 mt-6  my-5  ${filter ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium'>TYPE</p>
            <div className='flex flex-col text-sm text-gray-600 font-light'>
              <p className='flex gap-2'>
                <input type='checkbox' className='cursor-pointer' value={'Topwear'} />Topwear
                {/* <input type='checkbox' className='cursor-pointer' value={'Topwear'} onChange={togglesubcategory} />Topwear */}
              </p>
              <p className='flex gap-2'>
                <input type='checkbox' className='cursor-pointer' value={'Bottomwear'} />Bottomwear
                {/* <input type='checkbox' className='cursor-pointer' value={'Bottomwear'} onChange={togglesubcategory} />Bottomwear */}
              </p>
            </div>
          </div>
        </div>


        {/* All collection */}

        <div className='flex-1'>
          <div className='flex justify-between text-base sm:text-2xl mb-4 '>
            <Title text1='ALL' text2='Collection' />

            {/* sort */}
            <select className='border border-gray-200 text-sm px-2 '>
              <option value="relevant">Sort by : Relevant</option>
              <option value="low-high">Sort by : Low to High</option>
              <option value="high-low" >Sort by : High to Low</option>
            </select>
          </div>
          {issearch ? <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 gap-y-3 mt-8 flex'>
            {filtercollection.length > 0 ? <>{filtercollection.map((item, index) =>
              (<ProductItem key={index} id={item._id} name={item.name} image={item.imageUrl} price={item.price} description={item.description} />)
            )}</> : <img src="https://www.jalongi.com/public/assets/images/product_not_found.jpeg" alt='product not found' className='w-full flex justify-center items-center' />}
          </div> : (<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 gap-y-3 mt-8'>
            {allCollection.map((item, index) =>
              (<ProductItem key={index} id={item._id} name={item.name} image={item.imageUrl} price={item.price} description={item.description} />)
            )}
          </div>)}
        </div>
      </div>
    </>
  )
}

export default Collection