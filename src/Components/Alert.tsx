import React, { use, useContext, useEffect, useRef } from 'react'
import { auth, db } from '../Firebase/firebase';
import { signOut } from 'firebase/auth';
import { ShopContext } from '../context/Shopcontext';
import { RxCross2 } from "react-icons/rx";
import { deleteProfile } from '../Slice/EcommerceSlice';
import { useDispatch } from 'react-redux';
import { collection, deleteDoc, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { isTokenKind } from 'typescript';


interface Profile {
  name: string,
  Phone: number,
  email: string,
  gender: string,
  id: string
}


const Alert: React.FC = () => {
  const dispatch = useDispatch()
  const { setIsAlert } = useContext(ShopContext)

  const handleDelete = async () => {

    // try {
    //   let user = auth.currentUser;

    //   let userRef = await getDocs(query(collection(db, "Device-token"), where("userid", "==", user?.uid)));
    //   console.log(userRef);

    //   userRef.docs.map((item) => {
    //     let data = item.data();
    //     if (item.id === data.tokenid) {
    //       console.log("itemid", item.id, "tokenid", data.tokenid);
    //       deleteDoc(doc(db, "Device-Token", item.id));
    //     }
    //   })
    //   console.log("userRef", userRef)


    let divicetokenid = localStorage.getItem("Devicetokenid")
    if (divicetokenid) {
      deleteDoc(doc(db, "Device-Token", divicetokenid));
      localStorage.removeItem("Devicetokenid")
      await signOut(auth);
      dispatch(deleteProfile());
      setIsAlert(false);

    }
    // catch (error) { return error; }
  };




  const logoutRef = useRef<HTMLDivElement>(null);

  let onClose = () => {
    setIsAlert(false)
  }

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (logoutRef.current && !logoutRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <>

      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50"  >
        <div className=" bg-slate-200 flex flex-col rounded-xl" ref={logoutRef}>
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
