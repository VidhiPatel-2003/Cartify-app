import React, { useContext, useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { ShopContext } from '../context/Shopcontext';
import { useFormik } from 'formik';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../Firebase/firebase';
import { loginvalidation } from './Schema/Loginvalidation';
import { getDoc, doc, setDoc, addDoc, collection } from 'firebase/firestore';

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

        console.log("User sign in successfully");
      } catch (error) {

        console.log(error);
        alert("Invalid email or password");
      }
      navigate('/');
    }
  })

  const googleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      signInWithPopup(auth, provider).then(async (res) => {
        const user = res.user;
        console.log(user)

      })
    }
    catch (error) {
      console.log(error);
    }
  }
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
        <input name='password' value={values.password} type='password' onChange={handleChange} placeholder='Password' className='w-full py-2 px-3 border border-gray-400' required />
        {errors.password && touched.password ? (
          <>
            <p>{errors.password}</p>
          </>
        ) : (
          ""
        )}
        <label htmlFor='confirmpassword' className='text-gray-800  mr-[240px] text-5x font-semibold'>ConfirmPassword :-</label>
        <input name='confirmpassword' value={values.confirmpassword} type='password' onChange={handleChange} placeholder='ConfirmPassword' className='w-full py-2 px-3 border border-gray-400' required />
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
        {/* <button className='w-full py-2 bg-gray-700 text-white font-semibold mt-3 flex items-center justify-center'><FcGoogle className='text-4xl px-2' onClick={googleSignUp} />Sign in with Google</button> */}

      </form>
    </>
  )
}

export default Login