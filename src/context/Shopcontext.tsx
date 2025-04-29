import React, { createContext, useEffect, useState } from "react";
import { products } from "../assest/assets";
import { toast } from "react-toastify";
import { string } from "yup";
import { updateDoc, doc, increment, setDoc, query, collection, where, getDocs, deleteDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../Firebase/firebase";
import { count } from "console";
import { onAuthStateChanged } from "firebase/auth";
import Product from "../Pages.tsx/Product";
import { useParams } from "react-router-dom";

interface ProductType {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string[];
  category: string;
  subCategory: string;
  sizes: string[];
  date: number;
  bestseller: boolean;

}
// interface Carttype {
//   id: string,
//   name: string,
//   description: string,
//   imageUrl: string,
//   price: string,

// }
interface Cartitem {
  [itemid: string]: {
    [size: string]: number
  }
}

interface ShopContextType {
  products: ProductType[],
  currency: string;
  percentage: string;
  showSearch: boolean;
  issearch: string;
  setIsSearch: React.Dispatch<React.SetStateAction<string>>;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
  formtype: string;
  setFormType: React.Dispatch<React.SetStateAction<string>>;
  userInfo: Profile | null,
  setUserInfo: React.Dispatch<React.SetStateAction<Profile | null>>;
  isalert: boolean,
  setIsAlert: React.Dispatch<React.SetStateAction<boolean>>;
  cartitem: Cartitem,
  setCartItem: React.Dispatch<React.SetStateAction<Cartitem>>;
  Addtocart: (itemid: string, size: string) => void;
  Deletecart: (itemid: string, size: string) => void;
  goCart: string[],
  setGoCart: React.Dispatch<React.SetStateAction<string[]>>;
  countquantity: number,
  setCountQuantity: React.Dispatch<React.SetStateAction<number>>;
  addcartdata: () => Promise<CartItemType[]>;
  cartData: CartItemType[];
  setCartData: React.Dispatch<React.SetStateAction<CartItemType[]>>;
  getcartcount: () => Promise<void>;
  addCartProduct: Cartid[],
  setAddCartProduct: React.Dispatch<React.SetStateAction<Cartid[]>>;
  delivery_fee: number;
  getTotalAmount: () => number;
  totalAmount: number, setTotalAmount: React.Dispatch<React.SetStateAction<number>>;
  displaydetail: Productid | null,
  setDisplayDetail: React.Dispatch<React.SetStateAction<Productid | null>>;
  displayProduct: () => void;
  latestProduct: Latestid[],
  setLatestProduct: React.Dispatch<React.SetStateAction<Latestid[]>>;
}
interface Profile {
  name: string,
  Phone: number,
  email: string,
  gender: string,
  id: string,

}

interface Latest {
  name: string;
  imageUrl: string;
  price: number;
  description: string;
  discount: number;
  quantity: number;
}

interface Latestid extends Latest {
  _id: string;
}


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


export const ShopContext = React.createContext<ShopContextType>({
  products: [], currency: "₹",
  percentage: "%",
  showSearch: false,
  issearch: '',
  setIsSearch: () => { },
  setShowSearch: () => { },
  formtype: "Sign Up",
  setFormType: () => { },
  userInfo: null,
  setUserInfo: () => { },
  isalert: false,
  setIsAlert: () => { },
  cartitem: {},
  setCartItem: () => { },
  Addtocart: () => { },
  Deletecart: () => { },
  goCart: [],
  setGoCart: () => { },
  countquantity: 0,
  setCountQuantity: () => { },
  addcartdata: async () => await addcartdata(),
  cartData: [],
  setCartData: () => { },
  getcartcount: async () => { },
  addCartProduct: [],
  setAddCartProduct: () => { },
  getTotalAmount: () => 0,
  delivery_fee: 0,
  totalAmount: 0, setTotalAmount: () => { },
  displaydetail: null,
  setDisplayDetail: () => { },
  displayProduct: () => { },
  latestProduct: [],
  setLatestProduct: () => { },

});

const ShopContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [issearch, setIsSearch] = useState<string>('');
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [formtype, setFormType] = useState<string>("Sign Up");
  const [userInfo, setUserInfo] = useState<Profile | null>(null)
  const [isalert, setIsAlert] = useState<boolean>(false);
  const [cartitem, setCartItem] = useState<Cartitem>({});
  const [goCart, setGoCart] = useState<string[]>([]);
  const [countquantity, setCountQuantity] = useState<number>(0);
  const [cartData, setCartData] = useState<CartItemType[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [displaydetail, setDisplayDetail] = useState<Productid | null>(null);



  const [latestProduct, setLatestProduct] = useState<Latestid[]>([]);
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
    setLatestProduct(data.slice(0, 5));
  }

  useEffect(() => {
    Latestproduct();
  }, [])

  const Addtocart = async (itemid: string, size: string) => {
    if (!size) {
      toast.error("Select Product Size")
      return;
    }
    let cartData = structuredClone(cartitem);

    if (cartData[itemid]) {
      if (cartData[itemid][size]) {
        cartData[itemid][size] += 1
      } else {
        cartData[itemid][size] = 1
      }
    } else {
      cartData[itemid] = {}
      cartData[itemid][size] = 1
    }
    setCartItem(cartData);
    if (!goCart.includes(itemid)) {
      setGoCart((prev) => [...prev, itemid])
    }

    const user = auth.currentUser;
    if (!user) { return; }
    const cartid = `${user.uid}_${itemid}_${size}`
    console.log('gfgfdgfd')
    await setDoc(doc(db, "cart", cartid), {
      userid: user.uid,
      itemid: itemid,
      size: size,
      quantity: cartData[itemid][size],
    })

    await getcartcount();

  }

  useEffect(() => {
    console.log("cartitem", cartitem);
  }, [cartitem])




  const Deletecart = async (itemid: string, size: string) => {
    const user = auth.currentUser;
    if (!user) { return; }
    const cartid = `${user.uid}_${itemid}_${size}`
    await deleteDoc(doc(db, "cart", cartid))
    await getcartcount();
  }

  const addcartdata = async (): Promise<CartItemType[]> => {
    console.log("cartdata", cartData)
    const user = auth.currentUser;
    if (!user) return [];
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
    });
    setCartData(tempData);
    return tempData;
  }
  const getcartcount = async (): Promise<void> => {
    const user = auth.currentUser;
    if (!user) {
      setCountQuantity(0);
      return;
    }

    const querydata = query(collection(db, "cart"), where("userid", "==", user.uid));
    const snapshot = await getDocs(querydata);

    const tempData: CartItemType[] = [];
    let total = 0;

    snapshot.forEach((doc) => {
      const data = doc.data();
      let quantity = data.quantity || 1;
      total += quantity;
      tempData.push({
        itemid: data.itemid,
        size: data.size,
        quantity
      });

    });

    setCartData(tempData);
    setCountQuantity(total);

  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getcartcount();
        addcartdata();

      } else {
        setCountQuantity(0);
        setCartData([]);

      }
    });

    return () => unsubscribe();
  }, []);


  const getTotalAmount = (): number => {

    let total = 0;
    cartData.forEach((item) => {
      let product = addCartProduct.find((product) => product._id === item.itemid)
      if (product) {
        let discountprice = ((product.price - (product.price * (product.discount / 100))) * item.quantity)
        let price = product.price * item.quantity;
        total += product.discount ? discountprice : price;
      }
    })
    setTotalAmount(total);
    console.log("total amount", total)
    return total;
  }


  //  Set  Product detail

  const { productid } = useParams<{ productid: string }>();

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

  // end Product detail 

  const currency = "₹";
  const delivery_fee = 0;
  const percentage = "%"
  const value: ShopContextType = {
    delivery_fee,
    currency,
    products: products.map(product => ({
      ...product,
      imageUrl: product.image[0] || "",
      sizeId: product.sizes[0] || "",
      quantity: 0,
      discount: 0
    })),
    showSearch,
    setShowSearch,
    issearch,
    setIsSearch,
    formtype,
    setFormType,
    userInfo,
    setUserInfo,
    isalert,
    setIsAlert,
    cartitem,
    setCartItem,
    Addtocart,
    goCart,
    setGoCart,
    countquantity,
    setCountQuantity,
    Deletecart,
    percentage,
    addcartdata,
    cartData,
    setCartData,
    getcartcount,
    addCartProduct,
    setAddCartProduct,
    getTotalAmount,
    totalAmount,
    setTotalAmount,
    displaydetail,
    setDisplayDetail,
    displayProduct,
    latestProduct,
    setLatestProduct,

  }
  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  )
}
export default ShopContextProvider;
function addcartdata(): CartItemType[] | PromiseLike<CartItemType[]> {
  throw new Error("Function not implemented.");
}

