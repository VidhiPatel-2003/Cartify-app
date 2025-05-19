import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/Shopcontext'

import { getDocs, collection, doc, updateDoc, increment, getDoc, setDoc, query, where, getDocFromCache } from 'firebase/firestore';
import { auth, db } from '../Firebase/firebase';
import { HiMiniShoppingBag } from "react-icons/hi2";
import { toast } from 'react-toastify';
import { assets } from '../assest/assets';
import { useNavigate } from 'react-router-dom';



type CartItemType = {
  itemid: string;
  size: string;
  quantity: number;
};
interface Carttype {
  name: string;
  imageUrl: string;
  price: number;
  description: string;
  sizeId: string;
  quantity: number;
  discount: number;
}

interface Cartid extends Carttype {
  _id: string;
}

const Addcart = () => {
  const { currency, cartitem, setCartItem, countquantity, setCountQuantity, Deletecart, percentage, addcartdata, cartData, setCartData } = useContext(ShopContext);
  const navigate = useNavigate();
  // const [cartData, setCartData] = useState<CartItemType[]>([]);
  const [addCartProduct, setAddCartProduct] = useState<Cartid[]>([]);

  const Latestproduct = async () => {
    let querySnapshot = await getDocs(collection(db, "products"));
    let data: Cartid[] = querySnapshot.docs.map((doc) => {

      return {
        _id: doc.id,
        ...doc.data() as Carttype
      }
    }
    )
    setAddCartProduct(data);
  }

  useEffect(() => {
    Latestproduct();
  }, [])

  useEffect(() => {
    const addcart = async () => {
      console.log("cartdata", cartData)
      const user = auth.currentUser;
      if (!user) return;
      const querydata = query(collection(db, "cart"), where("userid", "==", user.uid))

      const snapshot = await getDocs(querydata);


      const tempData: CartItemType[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        console.log("cartdata for id", data)
        tempData.push({
          itemid: data.itemid,
          size: data.size,
          quantity: data.quantity,
        })

      })
      setCartData(tempData)
      Latestproduct();

    }
    addcart();

  }, [])
  console.log("cartdata", cartData)


  //  quantity increment 

  const handleIncrese = async (id: string, size: string) => {

    const user = auth.currentUser;
    if (!user) return;
    const cartRef = await getDoc(doc(db, "products", id))
    const productdata = cartRef.data();
    // console.log("productdata", productdata)
    const cartid = `${user.uid}_${id}_${size}`
    const updatedcart = await Promise.all(cartData.map(async (item) => {
      if (productdata?.quantity > item.quantity) {
        if (item.itemid === id && item.size === size) {
          await updateDoc(doc(db, "cart", cartid), {
            quantity: item.quantity + 1
          });
          return { ...item, quantity: item.quantity + 1 };
        }
      } else {
        toast.error(`This ${productdata?.name} is UNAVAILABLE`, {
          position: "top-center",
          autoClose: 1500,
        })
      }
      return item;
    }));

    setCartData(updatedcart);
  }

  // quantity decrement


  const handleDecrese = async (id: string, size: string) => {
    const user = auth.currentUser;
    if (!user) return;
    const cartid = `${user.uid}_${id}_${size}`

    const updatedcart = await Promise.all(cartData.map(async (item) => {
      if (item.itemid === id && item.size === size && item.quantity > 1) {
        await updateDoc(doc(db, "cart", cartid), {
          quantity: item.quantity - 1
        });
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    }));

    setCartData(updatedcart);
  }

  return (
    <>


      {cartData.length > 0 ? (<div>
        {cartData.map((item, index) => {
          const productData = addCartProduct.find(
            (product) => product._id === item.itemid
          );
          if (!productData) return;

          let totalprice = productData.price * item.quantity;
          let totaldiscountprice = ((productData.price - (productData.price * (productData.discount / 100))) * item.quantity).toFixed(2);
          let discountprice = (productData.price - (productData.price * ((productData.discount ?? 0) / 100))).toFixed(2);
          return (
            <div key={index} className=" border-t  py-4  border-b mb-4 rounded  grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid.cols-[4fr_2fr_0.5fr] items-center gap-5">
              <div className="w-[120px] h-[100px] bg-white rounded-lg flex items-center justify-center overflow-hidden ">
                <img src={productData.imageUrl} alt='' className="min-w-[120px] min-h-[100px] object-contain" />
              </div>
              <div className=' w-[350px] sm:w-[400px] md:w-[450px] lg:w-[500px] xl:w-[600px] '>
                <p className='text-xs sm:text-base font-medium'>{productData.name}</p>
                <p className='text-sm sm:text-lg font-medium'>{productData.description}</p>
                <div className='flex flex-col '>
                  <div className='flex gap-4 items-center mt-2'>{productData.discount ? <div className='flex gap-3 items-center'><p className='text text-xl text-red-700 font-semibold '>{currency}{discountprice}</p>
                    <p className='text-medium font-medium line-through text-gray-400'>{currency}{productData.price}</p>
                    <p className='text-sm font-bold text-green-600'>{productData.discount}{percentage} off</p>
                  </div> : <p className='text text-xl text-red-700 font-semibold'>{currency}{productData.price}</p>}
                    <p className='text text-lg  text-gray-700 font-medium'> Size : {item.size.toUpperCase()}</p></div>

                  <div className='flex  gap-4 items-center mt-2 '><p className='text text-xl text-gray-700 '>TotalPrice</p>: {productData.discount ? <p className='text-xl font-medium text-green-800'>{currency}{totaldiscountprice}</p> : <p className='text-xl font-medium text-green-800'>{currency}{(totalprice.toFixed(2))}</p>}</div>
                </div>
                <div className=' flex w-[320px] justify-between items-center mt-4'>
                  <div className=' flex text bg-gray-800 w-20 text-center  text-white h-9 items-center justify-center roundes-lg border cursor-pointer ' onClick={() => Deletecart(item.itemid, item.size)}>Remove</div>
                  <div className=' flex  justify-center items-center w-[90px] h-[40px] sm:w-[120px] sm:h-[45px] md:w-[150px] md:h-[50px] lg:w-[180px] lg:h-[60px] '>
                    <div className=' flex items-center justify-center w-10 text-center leading-4 aspect-square rounded-full text  text-2xl  font-semibold border' onClick={() => handleDecrese(item.itemid, item.size)}>-</div>
                    <p className='border w-12 h-8 flex items-center justify-center mx-2'>{item.quantity}</p>
                    <div className='  flex items-center justify-center w-10 text-center leading-4 border  aspect-square rounded-full text   text-2xl font-semibold' onClick={() => handleIncrese(item.itemid, item.size)}>+</div>
                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>) :
        (<div>
          {/* <img src='https://tampcol.com/public/assets/images/product_not_found2.png' /> */}
          <div className='flex flex-col justify-center items-center h-[60vh]'>
            <HiMiniShoppingBag className='text-[400px] text-gray-100 ' />
            <div className='text-2xl font-medium my-2'>Cart is empty</div>
            <p>You don't have any products in your Cart yet.</p>
            <button className='bg-slate-600 w-52 h-14 mt-3 text-white' onClick={() => { navigate('/collection') }}>View Products</button>
          </div>
        </div>)}

    </>
  )
}

export default Addcart

