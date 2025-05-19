import React, { useContext, useEffect, useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { ShopContext } from '../context/Shopcontext';
import { useFormik } from 'formik';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../Firebase/firebase';
import { loginvalidation } from './Schema/Loginvalidation';
import { getDoc, doc, setDoc, addDoc, collection } from 'firebase/firestore';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

import { getMessaging, getToken } from 'firebase/messaging';

const initialValues = {
  name: '',
  email: '',
  password: '',
  confirmpassword: '',
  Phone: '',
  gender: "",
}
const Login: React.FC = () => {
  const { formtype } = useContext(ShopContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);


  const { values, handleSubmit, handleChange, errors, touched } = useFormik({
    initialValues: initialValues,
    validationSchema: loginvalidation,
    onSubmit: async (values, action) => {
      console.log("values", values);
      action.resetForm();

      try {
        await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const user = auth.currentUser;
        console.log(user);
        try {
          let token = await getToken(messaging, {
            vapidKey: "BEwnmk48dqFMX2MOz3ICzVeSxdGCqCG3vLXesV2GbnmL3I5q3AHau7BKXqc1VEoq1Zvrxg6or4bLVrS18g9l4FE",
          })
          console.log("login-token", token)
          const timestamp = Date.now();
          const tokenid = `${user?.uid}_devicToken_${timestamp}`
          localStorage.setItem("Devicetokenid",tokenid);
          await setDoc(doc(db, "Device-Token", tokenid), {
            token: token,
            userId: user?.uid,
            tokenid:tokenid,
          })
        } catch (e) { return e; }

        // console.log("User sign in successfully");
      } catch (error) {

        console.log(error);
        alert("Invalid email or password");
      }
      navigate('/');
    }
  })

  const handleShowpassword = () => {
    setShowPassword(!showPassword);
    // alert(`clcik show password ${showPassword}`)
  }
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
    // alert(`clcik show password ${showConfirmPassword}`)
  }


  const messaging = getMessaging();

  // const pushDeviceToken = async () => {
  //   let token = getToken(messaging, {
  //     vapidKey: "BEwnmk48dqFMX2MOz3ICzVeSxdGCqCG3vLXesV2GbnmL3I5q3AHau7BKXqc1VEoq1Zvrxg6or4bLVrS18g9l4FE",
  //   })
  //   console.log("during loin token", token)
  //   let user = auth.currentUser;
  //   try {
  //     if (!user) return;
  //     if (user) {
  //       const timestamp = Date.now();
  //       const tokenid = `${user.uid}_devicToken_${timestamp}`
  //       await setDoc(doc(db, "Device-Token", tokenid), {
  //         token: token,
  //         userId: user.uid,
  //       })
  //     }

  //   } catch (e) { return e; }
  // }

  // useEffect(() => {
  //   pushDeviceToken();
  // }, [])

  return (
    <>
      <form className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-13 gap-4 text-gray-700 mb-40' onSubmit={handleSubmit} >
        <div className='inline-flex items-center gap-2 mb-2 mt-10'>
          <hr className='border-none h-[1.5px] w-7 bg-gray-700' />
          <p className='text-3xl font-serif' >Login</p>
          <hr className='border-none h-[1.5px] w-7 bg-gray-700' />
        </div>

        <label htmlFor='email' className='text-gray-800  mr-[320px] text-5x font-semibold'>Email :-</label>
        <input type='email' name='email' value={values.email} onChange={handleChange} placeholder='Email' className='w-full py-2 px-3 border border-gray-400' required />
        {errors.email && touched.email ? (
          <>
            <p>{errors.email}</p>
          </>
        ) : (
          ""
        )}

        <label htmlFor='password' className='text-gray-800  mr-[300px] text-5x font-semibold'>Password :-</label>
        <div className=" w-full flex justify-between  items-center  py-2 px-3 border border-gray-400"><input name='password' value={values.password} type={showPassword ? 'text' : 'password'} onChange={handleChange} placeholder='Password' required className="outline-none" />{showPassword ? <button onClick={handleShowpassword}><FaEye /></button> : <button onClick={handleShowpassword} ><FaEyeSlash /></button>}</div>
        {errors.password && touched.password ? (
          <>
            <p>{errors.password}</p>
          </>
        ) : (
          ""
        )}
        <label htmlFor='confirmpassword' className='text-gray-800  mr-[240px] text-5x font-semibold'>ConfirmPassword :-</label>
        <div className=" w-full flex justify-between  items-center  py-2 px-3 border border-gray-400"><input name='confirmpassword' value={values.confirmpassword} type={showConfirmPassword ? 'text' : 'password'} onChange={handleChange} placeholder='ConfirmPassword' required className="outline-none" />{showConfirmPassword ? <button onClick={handleShowConfirmPassword} ><FaEye /></button> : <button onClick={handleShowConfirmPassword} ><FaEyeSlash /></button>}</div>
        {errors.confirmpassword && touched.confirmpassword ? (
          <>
            <p>{errors.confirmpassword}</p>
          </>
        ) : (
          ""
        )}
        <div className='w-full flex items-center justify-between'>
          <p>Forgot Password</p>
          <Link to='/signup'>Create account</Link>
        </div>
        <button type='submit' className='w-full py-2 bg-gray-700 text-white font-semibold mt-3'>Sign In</button>

      </form>
    </>
  )
}

export default Login