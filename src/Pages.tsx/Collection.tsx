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
  quantity: number;
  discount: number;
  categoryId: number;
  subcategoryId: number;
}
interface Productid extends Product {
  _id: string;
}


const Collection: React.FC = () => {
  const [filter, setFilter] = useState<boolean>(false);
  const { issearch, showSearch } = useContext(ShopContext);
  const [allCollection, setAllCollection] = useState<Productid[]>([]);
  const [filtercollection, setFilterCollection] = useState<Productid[]>([]);
  const [category, setCategory] = useState<number | null>(null);
  const [sorttype, setSortType] = useState<string>("relevant");
  const [subcategory, setSubCategory] = useState<number | null>(null);

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

  const filterproduct = (e?: React.ChangeEvent<HTMLInputElement>) => {
    let filteritem = allCollection.slice();

    if (issearch && showSearch) {
      filteritem = filteritem.filter((item) => item.name.toLowerCase().includes(issearch.toLowerCase()))
    }
    if (category !== null) {
      filteritem = filteritem.filter((item) => item.categoryId === category)
    }
    if (subcategory !== null) {
      filteritem = filteritem.filter((item) => item.subcategoryId === subcategory)
    }

    setFilterCollection(filteritem);
  }

  useEffect(() => {
    filterproduct()
  }, [issearch, showSearch, allCollection, category, subcategory])

  const togglecategory = (categoryId: number) => {
    // let categoryitem = allCollection.slice()
    // categoryitem = categoryitem.filter((item) => item.categoryId === categoryId)
    // setFilterCollection(categoryitem);
    setCategory(categoryId)
  }

  const togglesubcategory = (subcategoryId: number) => {
    // let subcategory = allCollection.slice()
    // subcategory = subcategory.filter((item) => item.subcategoryId === subcategoryId)
    // setFilterCollection(subcategory);
    setSubCategory(subcategoryId)
  }


  const sortitem = () => {
    const fpcost = filtercollection.slice();

    switch (sorttype) {
      case "low-high":
        setFilterCollection(fpcost.sort((a, b) => (a.discount ? a.price - (a.price * a.discount / 100) : a.price) - (b.discount ? b.price - (b.price * b.discount / 100) : b.price)))
        break;
      case "high-low":
        setFilterCollection(fpcost.sort((a, b) => (b.discount ? b.price - (b.price * b.discount / 100) : b.price) - (a.discount ? a.price - (a.price * a.discount / 100) : a.price)))
        break;
      case "relevant":
        filterproduct();
        break;
    }
  }
  useEffect(() => { sortitem() }, [sorttype])

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
                <input type='radio' name='category' className='cursor-pointer' value={'Men'} onClick={() => togglecategory(1)} />Men
              </p>
              <p className='flex gap-2'>
                <input type='radio' name='category' className='cursor-pointer' value={'Woman'} onClick={() => togglecategory(2)} />Woman
              </p>
              <p className='flex gap-2'>
                <input type='radio' name='category' className='cursor-pointer' value={'Kids'} onClick={() => togglecategory(3)} />Kids
              </p>
            </div>
          </div>
          {/* subcategory */}
          <div className={` border border-gray-200 pl-5 py-3 mt-6  my-5  ${filter ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium'>TYPE</p>
            <div className='flex flex-col text-sm text-gray-600 font-light'>
              <p className='flex gap-2'>
                <input type='radio' name='subcategory' className='cursor-pointer' value={'Topwear'} onClick={() => togglesubcategory(1)} />Topwear
              </p>
              <p className='flex gap-2'>
                <input type='radio' name='subcategory' className='cursor-pointer' value={'Bottomwear'} onClick={() => togglesubcategory(2)} />Bottomwear
              </p>
            </div>
          </div>
        </div>


        {/* All collection */}

        <div className='flex-1'>
          <div className='flex justify-between text-base sm:text-2xl mb-4  '>
            <Title text1='ALL' text2='Collection' />

            {/* sort */}
            <select onChange={(e) => setSortType(e.target.value)} className='border border-gray-200 text-sm px-2 '>
              <option value="relevant">Sort by : Relevant</option>
              <option value="low-high">Sort by : Low to High</option>
              <option value="high-low" >Sort by : High to Low</option>
            </select>
          </div>
          {/* {issearch ? <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 gap-y-3 mt-8 flex'>
            {filtercollection.length > 0 ? <>{filtercollection.map((item, index) =>
              (<ProductItem key={index} id={item._id} name={item.name} image={item.imageUrl} price={item.price} description={item.description} />)
            )}</> : <img src="https://www.jalongi.com/public/assets/images/product_not_found.jpeg" alt='product not found' className='w-full flex justify-center items-center' />}
          </div> : (<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 gap-y-3 mt-8'>
            {allCollection.map((item, index) =>
              (<ProductItem key={index} id={item._id} name={item.name} image={item.imageUrl} price={item.price} description={item.description} quantity={item.quantity} discount={item.discount} />)
            )}
          </div>)} */}
          {filtercollection.length > 0 || issearch ? <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 gap-y-3 mt-8'>
            {filtercollection.map((item, index) =>
              (<ProductItem key={index} id={item._id} name={item.name} image={item.imageUrl} price={item.price} description={item.description} quantity={item.quantity} discount={item.discount} />)
            )}
          </div> : <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 gap-y-3 mt-8'>
            {allCollection.map((item, index) =>
              (<ProductItem key={index} id={item._id} name={item.name} image={item.imageUrl} price={item.price} description={item.description} quantity={item.quantity} discount={item.discount} />)
            )}
          </div>}
        </div>
      </div>
    </>
  )
}

export default Collection

// function a(a: Productid, b: Productid): number {
//   throw new Error('Function not implemented.');
// }
