import { FcGoogle } from "react-icons/fc";
import { ShopContext } from '../context/Shopcontext';
import { useFormik } from 'formik';
import { validation } from './Schema/Validation';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../Firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getDoc, doc, setDoc } from 'firebase/firestore';

// interface Formdata {
//   name: string;
//   email: string;
//   password: string;
// }
const initialValues = {
  name: '',
  email: '',
  password: '',
  confirmpassword: '',
  Phone: '',
  gender: "",
}


const Signup = () => {
  const { formtype } = useContext(ShopContext);
  const navigate = useNavigate();

  const { values, handleSubmit, handleChange, errors, touched, setFieldValue } = useFormik({
    initialValues: initialValues,
    validationSchema: validation,
    onSubmit: async (values, action) => {
      console.log("values", values);
      action.resetForm();
      try {
        await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const user = auth.currentUser;
        console.log(user);
        if (user) {

          await setDoc(doc(db, "userData", user.uid), {
            ...values,
            id: user.uid,
            email: user.email,
            name: values.name,
            password: values.password,
            Phone: Number(values.Phone),
            gender: values.gender,
          });
        }
        console.log("User Sign up successfully");
      } catch (error) {

        console.log(error);
        alert("Invalid email or password");
      }
     navigate('/');
    }
  });
  const googlesignin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      signInWithPopup(auth, provider).then(async (res) => {
        const user = res.user;
        console.log(user)
        if (user) {
          setFieldValue('name', user.displayName || '')
          setFieldValue('email', user.email || '')

        }
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
          <p className='text-3xl font-serif' >Sign up</p>
          <hr className='border-none h-[1.5px] w-7 bg-gray-700' />
        </div>
        <>
          <label htmlFor='name' className='text-gray-800  mr-[320px] text-5x font-semibold' >Name :-</label>
          <input type='text' name='name' value={values.name} onChange={handleChange} placeholder='Name' className='w-full py-2 px-3 border border-gray-400' required />
          {errors.name && touched.name ? (
            <>
              <p>{errors.name}</p>
            </>
          ) : (
            ""
          )}</>

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
        <label htmlFor='Phone' className='text-gray-800  mr-[290px] text-5x font-semibold'>Phone No.:-</label>
        <input name='Phone' value={values.Phone} type='tel' onChange={handleChange} placeholder='Phone' className='w-full py-2 px-3 border border-gray-400' required />
        {errors.Phone && touched.Phone ? (
          <>
            <p>{errors.Phone}</p>
          </>
        ) : (
          ""
        )}
        <label htmlFor='gender' className='text-gray-800  mr-[310px] text-5x font-semibold'>Gender.:-</label>
        <fieldset
          id="gender"
          name="gender"
          onChange={handleChange}
          className="flex justify-between"
        >

          {/* of course, add the id in fieldset as name in the input tags  */}
          <div className="mr-[140px] flex ">
            <input
              type="radio"
              name="gender"
              id="radioOption1"
              checked={values.gender === "Male"}
              value="Male"
              className=""
            />
            Male
          </div>
          <div>
            <input
              type="radio"
              name="gender"
              id="radioOption2"
              value="Female"
              checked={values.gender === "Female"}
              className=""
            />
            Female</div>
        </fieldset>
        <div className='w-full flex items-center justify-between'>
          <p>Forgot Password</p>
          <Link to='/login'>Sign in</Link>
        </div>
        <button type='submit' className='w-full py-2 bg-gray-700 text-white font-semibold mt-3'>Sign Up</button>
        <button className='w-full py-2 bg-gray-700 text-white font-semibold mt-3 flex items-center justify-center ' onClick={googlesignin}><FcGoogle className='text-4xl px-2' />Sign Up with Google</button>
       
      </form>
    </>
  )
}

export default Signup