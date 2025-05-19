import React, { useContext, useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../Firebase/firebase'
import { collection, doc, getDoc } from 'firebase/firestore'
import { AiOutlineEdit } from "react-icons/ai";
import { ShopContext } from '../context/Shopcontext';
import { useDispatch, useSelector } from 'react-redux';
import { setProfile } from '../Slice/EcommerceSlice';

interface Profile {
  name: string,
  Phone: number,
  email: string,
  gender: string,
  id: string
}

const Myprofile: React.FC = () => {


  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const viewprofile = useSelector((state: any) => state.ecommerce.profile);

  let profiledata = () => {
    onAuthStateChanged(auth, async (user) => {

      if (user !== null) {

        const userid = user.uid;
        let userSnap = await getDoc(doc(db, 'userData', userid));
        if (userSnap.exists()) {
          let data = userSnap.data() as Profile

          dispatch(setProfile(data))
        }

        setLoading(false);
      }
    })
  }
  useEffect(() => {
    profiledata();
  })

  return (
    <>
      {viewprofile &&
        <div className='border border-gray-200 bg-slate-200 w-1/4 h-[500px] rounded-3xl m-auto text-gray-700 '>
          <div className='p-3 flex flex-col   '>
            <div className='flex   justify-center items-center h-[160px] '>
              <div className='flex flex-col justify-between'>
                <div className='flex items-center justify-center'><img src="https://static.vecteezy.com/system/resources/previews/019/879/198/non_2x/user-icon-on-transparent-background-free-png.png" className='w-[110px]' /></div>
                <div><p className=' text-4xl font-mono flex  ' >Hello,{viewprofile.name}</p></div></div>
            </div>

            <div className='flex  flex-col justify-evenly  h-[320px] '>
              <div className='flex justify-between items-center  border-b '>
                <p className=' ' ><span className='text-lg'>Name</span> : <span>{viewprofile.name}</span></p>
                <AiOutlineEdit />

              </div>

              <div className='flex justify-between items-center border-b'>
                <p className=''><span className='text-lg'>Email</span> : <span>{viewprofile.email}</span></p>
                <AiOutlineEdit />

              </div>

              <div className='flex justify-between items-center border-b'>
                <p className=''><span className='text-lg'>Phone</span> : <span>{viewprofile.Phone}</span></p>
                <AiOutlineEdit />
              </div>

              <div className='flex justify-between items-center border-b' >
                <p className=''><span className='text-lg'>Gender</span> : <span>{viewprofile.gender}</span></p>
                <AiOutlineEdit />
              </div>

            </div>
          </div>
        </div>
      }
      {loading ? <span>Loading...</span> : null}
    </>
  )
}

export default Myprofile
// border border-gray-700