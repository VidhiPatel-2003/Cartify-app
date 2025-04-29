import React, { useContext, useEffect, useState } from 'react'
import Title from '../Components/Title'
import { auth, db } from '../Firebase/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { PiMaskSadLight } from "react-icons/pi";
import { ShopContext } from '../context/Shopcontext';

interface Ordersinfo {
  size: any;
  quantity: number;
  itemid: string;
  paymentMethod: string;
  status: string;
  totalAmount: number;
  OrderDate: string;
  cart: Cart[];
}
interface Cart {
  itemid: string;
  size: string;
  quantity: number;
}

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

const Orders: React.FC = () => {

  const [showorder, setShowOrder] = useState<Ordersinfo[]>([]);
  const { currency, percentage } = useContext(ShopContext);

  const myOrder = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;
      const querySnapshot = await getDocs(query(collection(db, "orderDetail"), where("uid", "==", user.uid)));

      let orders: Ordersinfo[] = [];

      querySnapshot.forEach((doc) => {
        let data = doc.data() as Ordersinfo

        console.log("data", data)
        orders.push({
          paymentMethod: data.paymentMethod,
          status: data.status,
          totalAmount: data.totalAmount,
          OrderDate: data.OrderDate,
          cart: data.cart,
          size: undefined,
          quantity: 0,
          itemid: ''
        });
      });
      console.log("orders", orders)
      setShowOrder(orders);

    }
    catch (error) {
      console.log("in My Order Page error", error)
    }

  }
  useEffect(() => {
    myOrder()
  }, [])


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



  return (
    <>
      <div className='border-t mt-10'>
        <div className='text text-2xl mb-8'>
          <Title text1={'My'} text2={'Orders'} />
        </div>
        <div>
          {showorder.length === 0 ? <div className='flex items-center justify-center h-[50vh] '><p className=' text text-4xl text-gray-700 flex items-center gap-5'> No Order Found <PiMaskSadLight className='font font-bold text text-5xl' /></p></div> : (showorder.map((item, index) =>
            <div key={index} className='flex flex-col justify-start items-start border m-2 p-2'>
              <p className='text-center text-lg text-gray-800 font font-semibold'>Payment Method: <span className='text text-base font font-semibold text-green-800'>{item.paymentMethod}</span></p>
              <p className='text-center text-lg text-gray-800 font font-semibold'>Status:<span className='text text-base font font-semibold text-red-700'> {item.status}</span></p>
              <p className='text-center text-lg text-gray-800 font font-semibold'>Total Amount: <span className='text text-base font font-semibold text-gray-500'>{item.totalAmount}</span></p>
              {item.cart.map((cartitem, index) => {
                const productData = addCartProduct.find(
                  (product) => product._id === cartitem.itemid
                );
                if (!productData) return null;
                let totalprice = productData.price * cartitem.quantity;
                let totaldiscountprice = (
                  (productData.price -
                    productData.price * (productData.discount / 100)) *
                  cartitem.quantity
                ).toFixed(2);
                let discountPrice = (productData.price -
                  productData.price * (productData.discount / 100))
                return (
                  <div key={index} className="flex flex-row items-star mt-2">
                    <img src={productData.imageUrl} alt='' className='w-[100px] h-[100px] rounded-lg border' />
                    <div className='flex flex-col ml-[65px]'>
                      <p className='font font-semibold text text-base '>{productData.name}</p>
                      <div className=' flex flex-row gap-2'><p className='text text-gray-700 font-medium'> Qty:{cartitem.quantity}</p>
                        <p className='text text-gray-700 font-medium'>Size:{cartitem.size}</p></div>
                      <div className=' flex flex-row gap-2 text-lg text-gray-700 items-center justify-center font-medium'>Price :{productData.discount ? <div className=' flex flex-row gap-2 items-center justify-center '><p className=' text text-base font-medium'>{discountPrice}</p> <p className='line-through text font-medium text-sm text-red-800'>{productData.price}</p> <p className='text text-sm text-green-800 font-medium'>{productData.discount}{percentage} off</p></div> : <p>{productData.price}</p>}</div>
                      {cartitem.quantity > 1 ? <div className=' flex flex-row gap-2 text-lg text-gray-600 font-medium items-center '>Total Price :{productData.discount ? <p className='text text-base'>{totaldiscountprice}</p> : <p className='text text-base'>{totalprice}</p>}</div> : null}
                    </div>

                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>


    </>
  )
}

export default Orders