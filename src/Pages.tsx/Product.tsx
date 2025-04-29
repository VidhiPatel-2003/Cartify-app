import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom'
import { ShopContext } from '../context/Shopcontext';
import shopping_logo from '../shopping_logo-removebg-preview.png'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../Firebase/firebase';

interface ProductType {
  description: string;
  imageUrl: string;
  price: number;
  sizeId: string;
  quantity: number;
  discount: number;

}
interface Productid extends ProductType {
  _id: string;
}

const Product: React.FC = () => {
  const { currency, Addtocart, goCart, percentage } = useContext(ShopContext)
  const [displaydetail, setDisplayDetail] = useState<Productid | null>(null);

  const [size, setSize] = useState<string | null>(null);
  const [availablesize, setAvailableSize] = useState<string[]>([]);
  const { productid } = useParams<{ productid: string }>();
  const navigate = useNavigate()
  console.log(productid);

  const displayProduct = async () => {
    try {
      if (!productid) return;
      const querySnapshot = await getDoc(doc(db, "products", productid))
      if (querySnapshot.exists()) {
        setDisplayDetail({
          ...(querySnapshot.data() as ProductType),
          _id: querySnapshot.id,
        });

      } else {
        console.log("doesnot found details")
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    displayProduct();
  }, [])

  useEffect(() => {
    if (!displaydetail?.sizeId) return;
    if (displaydetail?.sizeId) {
      const sizesArray = displaydetail.sizeId
        .toLowerCase()
        .replace("csize:", "")
        .split(",")
        .map(s => s.trim());

      setAvailableSize(sizesArray);
    }

  }, [displaydetail])
  console.log("size", size);

  const handleClick = () => {
    if (typeof displaydetail?._id !== "string" || typeof size !== "string") return;
    {
      if (goCart.includes(displaydetail?._id)) {
        navigate('/addcart')
      } else {
        Addtocart(displaydetail?._id, size)
      }
    }
    navigate('/addcart')
  }

  return (
    <>
      <div className='flex  p-2 flex-col sm:flex-row gap-4'>
        <div className=' Md:w-1/3 p-2 '>
          <img src={displaydetail?.imageUrl}
            className='h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full  rounded-lg  ' />
          <div className='flex  justify-evenly'>
            <img src={displaydetail?.imageUrl} alt="" className=' w-[120px] sm: w-[70px ] sm:h-[70px] md:w-[90px] md:h-[90px] lg:w-[110px] lg:h-[110px]  m-3 border border-gray-200 rounded-sm' />
            <img src={displaydetail?.imageUrl} alt="" className='w-[120px] sm: w-[70px ] sm:h-[70px] md:w-[90px] md:h-[90px] lg:w-[110px] lg:h-[110px]  m-3 border border-gray-200 rounded-sm' />
            <img src={displaydetail?.imageUrl} alt="" className='w-[120px] sm: w-[70px ] sm:h-[70px] md:w-[90px] md:h-[90px] lg:w-[110px] lg:h-[110px]  m-3 border border-gray-200 rounded-sm' />
          </div>
        </div>
        <div className='border border-gray-300 sm:w-1/2  mt-3 sm:m-4  '>
          <div className='m-9'>
            <div className='  text-xl p-2 mt-4'>{displaydetail?.description}</div>
            <div className='flex  border-b'>
              {displaydetail?.quantity === 0 ?
                <div className='w-[200px] flex justify-center m-3 mt-5 '><p className='text-2xl text-red-700 line-through mr-2 ' >{currency} {displaydetail?.price}</p><p className='text-green-700 flex items-center text-xl font font-semibold'>Out of stock</p>
                </div>

                : <div className='flex items-center m-3 mt-8 gap-2 '>
                  {displaydetail?.discount ? <div className='flex gap-5 items-center'><p className='flex justify-center  text-red-700 text-2xl  '>{currency}{(displaydetail.price - (displaydetail.price * (displaydetail.discount / 100))).toFixed(2)}</p>
                    <div className=' text-medium font-medium line-through text-gray-400'>{currency} {displaydetail?.price} </div>
                    <p className='text-lg font-bold text-green-600'>{displaydetail.discount}{percentage} off</p>
                  </div> :
                    <div className='w-1/4 flex  justify-center m-3 mt-5 text-red-700 text-2xl  '>{currency} {displaydetail?.price} </div>}
                </div>}
            </div>
            {availablesize.length > 0 && <div className='flex my-6 h-[150px] '>
              <p className='text-lg text-gray-500 gap-3 mr-3 md:mr-9 ml-2 flex items-center justify-center'>size</p>
              <div className='flex items-center justify-center cursor-pointer'>
                {availablesize.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => setSize(item)}

                    className={`font font-semibold text-base lg:text-lg  sm:w-[30px] p-1 w-[40px] md:w-[35px] md:p-1.5 lg:w-[40px] mx-1 md:mx-2  cursor-pointer flex items-center justify-center ${size === item ? " border border-5 border-blue-600 text-blue-600 " : "border border-gray-200"
                      }`}
                  >
                    {item.toUpperCase()}
                  </div>
                ))}

              </div>
            </div>}
            {/* <div>{displaydetail?.sizeId}</div> */}
            {displaydetail?.quantity !== 0 ? <>{displaydetail && <div className='flex  h-[150px] sm:h-[200px] justify-evenly items-center  m-4 sm:m-7 gap-2'>
              <div onClick={handleClick} className=' bg-gray-700 text-white  w-[180px] h-[45px] text-xl sm:w-[210px]  sm:h-[50px] sm:text-lg flex items-center justify-center cursor-pointer'><img src={shopping_logo} className=' h-10 sm:h-11' /> {goCart.includes(displaydetail?._id) ? "Go To Cart" : "Add To Cart"}</div>
              <Link to='/placeorder'><div className=' bg-gray-700 text-white w-[180px] h-[45px] text-xl  sm:w-[180px] sm:h-[50px] sm:text-lg flex items-center justify-center cursor-pointer'>Buy Now</div></Link>
            </div>}</> : null}
          </div>
        </div>
      </div>

    </>
  )
}

export default Product



