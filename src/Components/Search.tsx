import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/Shopcontext'
import { IoMdSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useLocation } from 'react-router-dom';

const Search = () => {
  const { showSearch,
    setShowSearch,
    issearch,
    setIsSearch, } = useContext(ShopContext);
  const location = useLocation();
  const [visible, setVisible] = useState<boolean>(false)

  useEffect(() => {
    if (location.pathname.includes('collection')) {
      setVisible(true)
    }
    else {
      setVisible(false)
    }

  }, [location])


  return showSearch && visible ? (
    <div className='border-t border-b bg-gray-50 text-center flex items-center justify-center'>
      <div className='inline-flex items-center justify-between border border-gray-200 px-5 py-2 my-3 w-[450px] mx-3 rounded-full'>
        <input type='text' value={issearch} onChange={(e) => setIsSearch(e.target.value)} placeholder='search for latest collection' className=' mr-2 outline-none bg-inherit w-1/2 text-sm ' />
        <div>
          {issearch ? <RxCross2 className=' sm:text-[15px] md:text-[16px] lg:text-[17px] xl:text-[18px] 2xl:text-[19px]' onClick={() => setIsSearch('')} /> : <IoMdSearch className=' sm:text-[15px] md:text-[16px] lg:text-[17px] xl:text-[18px] 2xl:text-[19px]' />}

        </div>
      </div>
      <RxCross2 className='text-xl' onClick={() => setShowSearch(false)} />
    </div>
  ) : null;
}

export default Search
