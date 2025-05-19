import React, { useContext } from 'react'
import { ShopContext } from '../context/Shopcontext'
import { RxCross2 } from "react-icons/rx";
import { Link } from 'react-router-dom';

const Rate = () => {

  const { setIsAlert } = useContext(ShopContext)
  return (
    <Link to='orders'><div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className=" bg-slate-200 flex flex-col rounded-xl">
        <div className='flex justify-end mt-2 mr-2'><RxCross2 className=' sm:text-[15px] md:text-[16px] lg:text-[17px] xl:text-[18px] 2xl:text-[19px]' onClick={() => setIsAlert(false)} /></div>
        <div>
          
        </div>
      </div>
    </div></Link>
  )
}

export default Rate