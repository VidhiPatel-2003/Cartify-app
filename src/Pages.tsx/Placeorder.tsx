import { Formik, useFormik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { placeordervalidation } from './Schema/Placeordervalidation';
import { auth, db } from '../Firebase/firebase';
import { collection, doc, getDocs, getDoc, query, setDoc, where, updateDoc, deleteDoc, writeBatch } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Title from '../Components/Title';
// import CartTotal from '../Components/CartTotal';
import Addcart from './Addcart';
import CartTotal from '../Components/CartTotal';
import { ShopContext } from '../context/Shopcontext';
import { useDispatch, useSelector } from 'react-redux';
import { setAddress, deleteAddress } from '../Slice/EcommerceSlice';

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
interface Placeorderinfo {
  Phone: number;
  address: string;
  city: string;
  email: string;
  gender: string;
  name: string;
  pincode: string;
  state: string;
  addressId: string;
}
const initialValues = {
  name: '',
  email: '',
  Phone: '',
  gender: "",
  address: " ",
  city: " ",
  state: " ",
  pincode: " ",
}
const Placeorder: React.FC = () => {
  const { cartData, totalAmount } = useContext(ShopContext)
  // const [placeorderuserinfo, setPlaceOrderUserInfo] = useState<Placeorderinfo[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState<Placeorderinfo | null>(null);
  const [allCollection, setAllCollection] = useState<Productid[]>([]);

  const dispatch = useDispatch();
  const AddressInfo = useSelector((state: { ecommerce: { address: Placeorderinfo[] } }) => state.ecommerce.address)

  const navigate = useNavigate();
  const { values, handleChange, handleSubmit, errors, touched, setValues } = useFormik({
    initialValues: initialValues,
    validationSchema: placeordervalidation,
    onSubmit: async (values, action) => {
      console.log(values)
      action.resetForm();
      try {
        const user = auth.currentUser;
        if (!user) {
          console.log("placeorder-0");
          navigate('/signup')
        }
        if (user) {
          const timestamp = Date.now();
          const addressId = `${user.uid}_${timestamp}`;
          await setDoc(doc(db, "address", addressId), {

            uid: user.uid,
            ...values
          }
          )
        }
        setVisible(false);

      } catch (error) {
        console.log("set placerorder get error", error)
      }
    }
  });

  const getuserinfo = async () => {

    const user = auth.currentUser;

    if (!user) {
      console.log("placeorder-9");
      navigate('/signup')
    }

    if (user) {
      let querySnapshot = await getDoc(doc(db, "userData", user.uid))

      if (querySnapshot.exists()) {
        let data = querySnapshot.data()

        setValues(prev => ({
          ...prev,
          name: data.name || '',
          email: data.email || '',
          Phone: data.Phone || '',
          gender: data.gender || '',
        }));
      }
    }
  }
  useEffect(() => {
    getuserinfo();
  }, []);

  console.log("selected address", selectedAddress);


  const getaddress = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const timestamp = Date.now();
      const addressId = `${user.uid}_${timestamp}`;

      const querySnapshot = await getDocs(query(collection(db, "address"), where("uid", "==", user.uid)));

      const addresses: Placeorderinfo[] = [];
      querySnapshot.forEach((doc) => {
        let data = doc.data() as Placeorderinfo
        let addressId = doc.id;
        console.log("data", data)
        addresses.push({
          city: data.city,
          pincode: data.pincode,
          Phone: data.Phone,
          address: data.address,
          email: data.email,
          gender: data.gender,
          name: data.name,
          state: data.state,
          addressId: addressId,
        });
      });
      // console.log("before address", placeorderuserinfo)
      // setPlaceOrderUserInfo(addresses);
      dispatch(setAddress(addresses));

    } catch (error) {
      console.log("get placeorder error", error);
    }
  }
  useEffect(() => {
    getaddress();
  }, [])


  const handlePlaceorder = async () => {
    try {

      const user = auth.currentUser;
      if (!user) { console.log("placeorder"); navigate('/signup') }

      if (user) {
        const timestamp = Date.now();
        const addressId = `${user.uid}_${timestamp}`;
        const orderId = `${user.uid}_${timestamp}`;
        const orderRef = doc(db, "orderDetail", orderId);

        for (let item in cartData) {
          const productRef = doc(db, "products", cartData[item].itemid)
          const productSnap = await getDoc(productRef);

          if (productSnap.exists()) {
            const productData = productSnap.data() as Product;
            const currentquantity = productData.quantity || 0;

            await updateDoc(productRef, {
              quantity: currentquantity - cartData[item].quantity,
            })
          }
        }


        await setDoc(orderRef, {
          uid: user.uid,
          orderId: orderId,
          cart: cartData,
          addressId: selectedAddress?.addressId,

          totalAmount: totalAmount,
          address: {
            address: selectedAddress?.address,
            city: selectedAddress?.city,
            state: selectedAddress?.state,
            pincode: selectedAddress?.pincode,
            Phone: selectedAddress?.Phone,
            name: selectedAddress?.name,
          },
          status: "pending",
          paymentMethod: "Cash on delivery",
          OrderDate: new Date(),
          createdAt: new Date().toISOString(),
        });

      }
      await clearCart();

      toast.success("Order placed successfully", { position: "top-center", autoClose: 1500, });
      navigate('/orders')

    } catch (error) {
      console.log("placeorder error", error)
    }
  }

  const clearCart = async () => {
    const user = auth.currentUser;
    if (!user) return;
    const cartdata = await getDocs(query(collection(db, "cart"), where("userid", "==", user.uid)));
    let batch = writeBatch(db);
    cartdata.forEach((doc) => {
      batch.delete(doc.ref);
    })
    await batch.commit();
  }

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

  const handleDeleteAddress = (): void => {

    localStorage.setItem("SelectedAdressid", selectedAddress?.addressId || '')
    let addressid = localStorage.getItem("SelectedAdressid")
  
    if (addressid) {
      deleteDoc(doc(db, "address", addressid))
      dispatch(deleteAddress(addressid))
      localStorage.removeItem(addressid);
    }
  }

  return (
    <>
      <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14  min-h-[80vh] border-t  '>
        <div className='flex flex-col gap-4 w-full sm:max-w-[480px] '>
          <div className='text-xl sm:text-2xl my-3'>
            <Title text1={"Delivery"} text2={'Information'} />
          </div>
          <div className='flex flex-col gap-3  '>
            {AddressInfo.length > 0 ? (<><div >{AddressInfo.map((item) => (
              <><div className='flex gap-3 my-2' key={item.addressId}><input type='radio' name='address' id={item.addressId} className='flex flex-row' onClick={() => setSelectedAddress(item)} />
                <label htmlFor={item.addressId}><div className='flex flex-col border px-4 py-2  w-[600px] h-auto' style={{ position: 'relative', zIndex: 0 }} >
                  <div className=' text text-lg  text-gray-700 font font-bold'>{item.name} {item.Phone}</div>
                  <div>{item.address} ,{item.city} ,{item.state}-{item.pincode}</div><br /><br />
                  <div className='text-white text-xl font-semibold bg-orange-600 w-1/4 flex items-center justify-center my-2 h-10' style={{ position: 'absolute', zIndex: 999999, bottom: 0 }} onClick={handleDeleteAddress} >Remove</div>
                </div></label>
              </div>

              </>
            ))}</div>
              {visible === false && <div className='mx-7 px-2 flex flex-row border items-center  w-[450px] h-[50px]' onClick={() => setVisible(true)}>
                <p className='text text-2xl  pr-2   text-blue-700 flex items-center'>+</p>
                <p className='text text-lg    text-blue-700'>Add New Address</p>
              </div>}
              {visible && <form className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-13 gap-4 text-gray-700 mb-40 ' onSubmit={handleSubmit} >

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
                </fieldset >
                <label htmlFor='address' className='text-gray-800  mr-[300px] text-5x font-semibold' >Address :-</label>
                <input type='text' name='address' value={values.address} onChange={handleChange} placeholder='Address' className='w-full py-2 px-3 border border-gray-400' required />
                {
                  errors.address && touched.address ? (
                    <>
                      <p>{errors.address}</p>
                    </>
                  ) : (
                    ""
                  )
                }
                <label htmlFor='city' className='text-gray-800  mr-[340px] text-5x font-semibold' >City:-</label>
                <input type='text' name='city' value={values.city} onChange={handleChange} placeholder='city' className='w-full py-2 px-3 border border-gray-400' required />
                {
                  errors.city && touched.city ? (
                    <>
                      <p>{errors.city}</p>
                    </>
                  ) : (
                    ""
                  )
                }
                <label htmlFor='pincode' className='text-gray-800  mr-[300px] text-5x font-semibold' >Pincode :-</label>
                <input type='text' name='pincode' value={values.pincode} onChange={handleChange} placeholder='pincode' className='w-full py-2 px-3 border border-gray-400' required />
                {
                  errors.pincode && touched.pincode ? (
                    <>
                      <p>{errors.pincode}</p>
                    </>
                  ) : (
                    ""
                  )
                }
                <label htmlFor='state' className='text-gray-800  mr-[320px] text-5x font-semibold' >State :-</label>
                <input type='text' name='state' value={values.state} onChange={handleChange} placeholder='state' className='w-full py-2 px-3 border border-gray-400' required />
                {
                  errors.state && touched.state ? (
                    <>
                      <p>{errors.state}</p>
                    </>
                  ) : (
                    ""
                  )
                }
                <div className='flex justify-end   w-[390px]'>
                  <button type='submit' className=' flex justify-end text text-xl text-white bg-gray-700  m-3 px-5 py-1'>Save</button>
                  <button onClick={() => setVisible(false)} className=' flex justify-end text text-xl text-white bg-gray-700  m-3 px-3 py-1' >Cancel</button></div>
              </form>}</>) :


              (
                <form className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-13 gap-4 text-gray-700 mb-40' onSubmit={handleSubmit} >

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
                  </fieldset >
                  <label htmlFor='address' className='text-gray-800  mr-[300px] text-5x font-semibold' >Address :-</label>
                  <input type='text' name='address' value={values.address} onChange={handleChange} placeholder='Address' className='w-full py-2 px-3 border border-gray-400' required />
                  {
                    errors.address && touched.address ? (
                      <>
                        <p>{errors.address}</p>
                      </>
                    ) : (
                      ""
                    )
                  }
                  <label htmlFor='city' className='text-gray-800  mr-[340px] text-5x font-semibold' >City:-</label>
                  <input type='text' name='city' value={values.city} onChange={handleChange} placeholder='city' className='w-full py-2 px-3 border border-gray-400' required />
                  {
                    errors.city && touched.city ? (
                      <>
                        <p>{errors.city}</p>
                      </>
                    ) : (
                      ""
                    )
                  }
                  <label htmlFor='pincode' className='text-gray-800  mr-[300px] text-5x font-semibold' >Pincode :-</label>
                  <input type='text' name='pincode' value={values.pincode} onChange={handleChange} placeholder='pincode' className='w-full py-2 px-3 border border-gray-400' required />
                  {
                    errors.pincode && touched.pincode ? (
                      <>
                        <p>{errors.pincode}</p>
                      </>
                    ) : (
                      ""
                    )
                  }
                  <label htmlFor='state' className='text-gray-800  mr-[320px] text-5x font-semibold' >State :-</label>
                  <input type='text' name='state' value={values.state} onChange={handleChange} placeholder='state' className='w-full py-2 px-3 border border-gray-400' required />
                  {
                    errors.state && touched.state ? (
                      <>
                        <p>{errors.state}</p>
                      </>
                    ) : (
                      ""
                    )
                  }
                  <button type='submit' className='text text-white text-xl bg-black items-center w-[300px] h-10 my-2'>Save</button>

                </form>
              )}
          </div>
        </div>
        <div className='mt-8  '>
          <div className='mt-8 w-[800px] px-10'>
            <Addcart />

          </div>
          <div className='flex justify-end px-10 '>
            <div className=' flex '>
              <CartTotal />
            </div>

          </div>
          <div className='flex justify-end px-10 my-9 text-green-800 font font-bold'><div className='flex text text-3xl'>Only Cash On Delivery</div></div>

          <div className='flex justify-end px-10 ' >
            <button onClick={handlePlaceorder} className=' flex bg-black text-white my-5 py-3 text-lg  w-[250px] justify-center items-center'>Place Order</button>
          </div>
        </div>

      </div>
    </>
  )
}

export default Placeorder


