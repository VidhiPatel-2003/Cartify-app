import React, { useState, useContext, useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { IoMdSearch } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { TbShoppingCartPlus } from "react-icons/tb";
import { RiMenu2Fill } from "react-icons/ri";
import { IoHeartOutline } from "react-icons/io5";
import { ShopContext } from '../context/Shopcontext';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase/firebase';
import Alert from './Alert';


const Navbar: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [searchVisible, setSearchVisible] = useState<boolean>(false);

  const { showSearch, setShowSearch, userInfo,
    setUserInfo, isalert, setIsAlert } = useContext(ShopContext);


  const location = useLocation();
  useEffect(() => {

    if (location.pathname.includes('collection')) {
      setSearchVisible(true);
    }
    else {
      setSearchVisible(false)
    }
  }, [location])

  const handleLogout = async () => {
    setIsAlert(true);
  }

  return (
    <>
      <div className='flex items-center justify-between py-5 font-medium'>
        <RiMenu2Fill onClick={() => setVisible(true)} className='cursor-pointer sm:hidden' />
        <Link to='/'><h1 className='text-blue-200 text-4xl'>Cartify</h1></Link>
        <ul className='hidden sm:flex gap-5 text-sm text-gray-500'>
          <NavLink to='/' className=' flex flex-col items-center gap-1  '>
            <p className='text-gray-500 sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[17px] 2xl:text-[18px]' >HOME</p>
            <hr className='w-2/4 border-none bg-black hidden' />
          </NavLink>
          <NavLink to='/collection' className=' flex flex-col items-center gap-1  '>
            <p className='text-gray-500 sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[17px] 2xl:text-[18px]'>COLLECTION</p>
            <hr className='w-2/4 border-none bg-black hidden' />
          </NavLink>
          <NavLink to='/about' className=' flex flex-col items-center gap-1  '>
            <p className='text-gray-500 sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[17px] 2xl:text-[18px]'>ABOUT US</p>
            <hr className='w-2/4 border-none bg-black hidden' />
          </NavLink>
          <NavLink to='/contact' className=' flex flex-col items-center gap-1  '>
            <p className='text-gray-500 sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[17px] 2xl:text-[18px]'>CONTACT US</p>
            <hr className='w-2/4 border-none bg-black hidden' />
          </NavLink>
        </ul>
        <div className='flex items-center gap-6'>
          {searchVisible ? <IoMdSearch className=' sm:text-[15px] md:text-[16px] lg:text-[17px] xl:text-[18px] 2xl:text-[19px]' onClick={() => setShowSearch(!showSearch)} /> : null}
          <div className='group relative'>
            <Link to='/login'>
              <FaRegUser className=' sm:text-[15px] md:text-[16px] lg:text-[17px] xl:text-[18px] 2xl:text-[19px] cursor-pointer' />
            </Link>
            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
              <div className='flex flex-col w-36 py-3 px-5 bg-slate-200 text-gray-600 rounded'>
                <Link to='/myProfile'><p className='cursor-pointer hover:text-black'>My Profile</p></Link>
                <p className='cursor-pointer hover:text-black'>Orders</p>
                <p className='cursor-pointer hover:text-black' onClick={handleLogout}>Logout</p>
              </div>
              {isalert && <Alert />}
            </div>
          </div>
          <div><IoHeartOutline className=' sm:text-[15px] md:text-[16px] lg:text-[17px] xl:text-[18px] 2xl:text-[19px]' /></div>
          <NavLink to='/cart'>
            <TbShoppingCartPlus className=' sm:text-[15px] md:text-[16px] lg:text-[17px] xl:text-[18px] 2xl:text-[19px]' />
          </NavLink>
        </div>
        <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-1/2' : 'w-0'}`}>
          <div className='flex flex-col text-gray-600'>
            <div className='flex items-center gap-4 p-3' onClick={() => setVisible(false)}>
              &lt; BACK
            </div>
            <NavLink onClick={() => setVisible(false)} to='/' className='py-3 pl-6 border h-full'>HOME</NavLink>
            <NavLink onClick={() => setVisible(false)} to='/collection' className='py-3 pl-6 border h-full'>COLLECTION</NavLink>
            <NavLink onClick={() => setVisible(false)} to='/about' className='py-3 pl-6 border h-full'>ABOUT</NavLink>
            <NavLink onClick={() => setVisible(false)} to='/contact' className='py-3 pl-6 border h-full'>CONTACT</NavLink>
          </div>
        </div>
      </div>

    </>
  )
}

export default Navbar