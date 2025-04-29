import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/Shopcontext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoIosHeartEmpty } from "react-icons/io";
import { auth, db } from '../Firebase/firebase';
import { FcLike } from "react-icons/fc";
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';

interface Propstype {
  id: string;
  name: string;
  image: string;
  price: number;
  description?: string;
  quantity?: number;
  discount?: number;
}

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
  quantity: number;
  discount: number;

}

const ProductItem: React.FC<Propstype> = ({ id, name, image, price, description, quantity, discount }) => {
  // const [discountCost, setDiscountCost] = useState<number>(0);

  const [onLike, setOnLike] = useState<boolean>(false);
  const { currency, countquantity, percentage } = useContext(ShopContext);
  const discountprice = (price - (price * ((discount ?? 0) / 100))).toFixed(2);
  const navigate = useNavigate();



  const handleLikebutton = async (productId: string) => {

    const user = auth.currentUser;
    if (!user) {
      navigate('/signup')
    }
    else {
      navigate('/wishlist')
      setOnLike(true);
      const likeProduct = `${user.uid}_likeproduct _ ${productId}`;
      await setDoc(doc(db, "whishlist", likeProduct), {
        uid: user.uid,
        id: productId,
        name: name,
        imageUrl: image,
        price: price,
        description: description,
        quantity: quantity,
        discount: discount,
        productId: productId,
      }).then(() => {
        console.log("product added to wishlist")
      }).catch((error) => {
        console.error("Error adding product to wishlist:", error);

      })

    }
  }


  return (
    <>
      {/* <Link to={`/product/${id}`} className='text-gray-600 cursor-pointer'> */}
      <div onClick={() => {
        navigate(`/product/${id}`);
        console.log('main function')
      }} style={{ position: 'relative', zIndex: 0 }} >
        <div className='  overflow-hidden '>
          <img src={image} alt="" className='hover:scale-110  transaction ease-in-out w-[270px] h-[300px]' />
          <div style={{ display: "flex", alignItems: "center", borderRadius: "50%", top: 4, marginTop: "3px" }} onClick={(e) => {
            e.stopPropagation(); //  Prevent the click from going to the parent
            if (id) {
              console.log(id);
              handleLikebutton(id);
            } else {
              console.error("Product ID is undefined");
            }
          }} >

            {onLike === true && id ? <FcLike className=' sm:text-[15px] md:text-[16px] lg:text-[17px] xl:text-[18px] 2xl:text-[19px] ' /> : <IoIosHeartEmpty className=' sm:text-[15px] md:text-[16px] lg:text-[17px] xl:text-[18px] 2xl:text-[19px] ' />}
          </div>
        </div>
        {quantity === 0 ? <p className='text text-xl text-red-800 font-semibold'>Currently unavailable</p> : null}
        <p className='pt-3 pb-1 text-base text-gray-700'>{name}</p>
        <p className='py-1 pb-1 text-sm'>{description}</p>
        {quantity === 0 ? <p className='text-sm font-medium '>{currency}{price}</p> : <>{discount ? <div className='flex gap-3 items-center'><p className='text-lg font-semibold '>{currency}{discountprice}</p>
          <p className='text-medium font-medium line-through text-gray-400'>{currency}{price}</p>
          <p className='text-sm font-bold text-green-600'>{discount}{percentage} off</p>
        </div> :
          <p className='text-sm font-medium '>{currency}{price}</p>}</>}
      </div>

      {/* </Link> */}
    </>
  )
}

export default ProductItem
