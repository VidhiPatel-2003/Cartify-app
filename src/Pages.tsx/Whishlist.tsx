import React, { useContext, useEffect, useState } from 'react'
import Title from '../Components/Title'
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../Firebase/firebase';
import { useNavigate, useParams } from 'react-router-dom';
import { get } from 'http';
import { on } from 'events';
import { onAuthStateChanged } from 'firebase/auth';
import { ShopContext } from '../context/Shopcontext';
import ProductItem from '../Components/ProductItem';
import { RxCross1 } from "react-icons/rx";

interface WhishlistProduct {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
  quantity: number;
  discount: number;
  uid: string;
  productId: string;
}

const Whishlist = () => {

  const [whishlist, setWhishlist] = useState<WhishlistProduct[]>([]);
  const navigate = useNavigate();
  const { currency, percentage } = useContext(ShopContext)


  const getWhishlist = async (uid: string) => {
    try {
      const whishRef = query(collection(db, "whishlist"), where("uid", "==", uid));
      const querySnapshot = await getDocs(whishRef);
      console.log("querySnapshot", querySnapshot);

      const whishlistData: WhishlistProduct[] = [];
      querySnapshot.forEach((doc) => {
        let data = doc.data() as WhishlistProduct;

        whishlistData.push({
          name: data.name,
          imageUrl: data.imageUrl,
          price: data.price,
          description: data.description,
          quantity: data.quantity,
          discount: data.discount,
          uid: data.uid,
          id: doc.id,
          productId: data.productId,
        });
      });

      setWhishlist(whishlistData);
      console.log("Whishlist data:", whishlistData);
      console.log("Whishlist state:", whishlist);
    } catch (error) {
      console.log("getWhishlist error", error);
    }
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User logged in:", user.uid);
        getWhishlist(user.uid);
      } else {
        console.log("No user logged in");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLikeDeletebutton = async (id: string) => {
    await deleteDoc(doc(db, "whishlist", id));
    console.log("successfully deleted from whishlist", id);

  }



  return (
    <div className='border-t mt-2'>
      <div className='text-2xl'>
        <Title text1={"My"} text2={"Wishlist"} />
      </div>
      {whishlist.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 gap-y-3 mt-8" >
          {whishlist.map((item) => (

            <div key={item.id} onClick={() => {
              navigate(`/product/${item.productId}`)
              console.log("item id", item.id)
            }} >
              <div className='  overflow-hidden  relative z-0' style={{ position: 'relative', zIndex: 0 }}  >
                <img src={item.imageUrl} alt="" className='hover:scale-110  transaction ease-in-out w-[270px] h-[300px]' />
                <div style={{ display: "flex", alignItems: "center", borderRadius: "50%", top: 4, marginTop: "3px", position: "absolute", left: 4, zIndex: 99999999 }} onClick={(e) => {
                  e.stopPropagation(); //  Prevent the click from going to the parent
                  if (item.id) {
                    console.log(item.id);
                    handleLikeDeletebutton(item.id);
                  } else {
                    console.error("Product ID is undefined");
                  }
                }} ><RxCross1 /></div>
              </div>
              {item.quantity === 0 ? <p className='text text-xl text-red-800 font-semibold'>Currently unavailable</p> : null}
              <p className='pt-3 pb-1 text-base text-gray-700'>{item.name}</p>
              <p className='py-1 pb-1 text-sm'>{item.description}</p>
              {item.quantity === 0 ? <p className='text-sm font-medium '>{currency}{item.price}</p> : <>{item.discount ? <div className='flex gap-3 items-center'><p className='text-lg font-semibold '>{currency}{(item.price - (item.price * (item.quantity / 100)))}</p>
                <p className='text-medium font-medium line-through text-gray-400'>{currency}{item.price}</p>
                <p className='text-sm font-bold text-green-600'>{item.discount}{percentage} off</p>
              </div> :
                <p className='text-sm font-medium '>{currency}{item.price}</p>}</>}
            </div>

          ))}
        </div>

      ) : (
        <div>
          <img src='https://tampcol.com/public/assets/images/product_not_found2.png' />
        </div>
      )}
    </div>
  )
}

export default Whishlist