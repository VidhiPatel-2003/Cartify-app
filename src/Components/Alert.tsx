import React, { useContext } from 'react'
import { auth } from '../Firebase/firebase';
import { signOut } from 'firebase/auth';
import { ShopContext } from '../context/Shopcontext';
import { RxCross2 } from "react-icons/rx";

const Alert: React.FC = () => {
  const { setIsAlert } = useContext(ShopContext)
  const handleDelete = async () => {
    try {
      await signOut(auth);
      setIsAlert(false)
    }
    catch (error) {
      console.log("logout error", error);
    }
  }
  return (
    <>

      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
        <div className=" bg-slate-200 flex flex-col rounded-xl">
          <div className='flex justify-end mt-2 mr-2'><RxCross2 className=' sm:text-[15px] md:text-[16px] lg:text-[17px] xl:text-[18px] 2xl:text-[19px]' onClick={() => setIsAlert(false)} /></div>
          <div className=" text-lg p-4">
            Are you sure you want to logout?
          </div>
          <div className=" flex flex-row justify-end px-5">
            <div
              className="border  border-gray-200 bg-slate-900 text-white px-4 py-2 cursor-pointer rounded-xl"
              onClick={handleDelete}
            >
              Delete
            </div>
            <div
              className="border border-gray-200 bg-slate-900 text-white px-4 py-2 cursor-pointer rounded-xl"
              onClick={() => setIsAlert(false)}
            >
              Cancel
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Alert
