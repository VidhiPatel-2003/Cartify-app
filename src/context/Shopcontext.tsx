import React, { createContext, useState } from "react";
import { products } from "../assest/assets";

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

interface ShopContextType {
  products: ProductType[],
  currency: string;
  showSearch: boolean;
  issearch: string;
  setIsSearch: React.Dispatch<React.SetStateAction<string>>;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
  formtype: string;
  setFormType: React.Dispatch<React.SetStateAction<string>>;
  userInfo: Profile | null,
  setUserInfo: React.Dispatch<React.SetStateAction<Profile | null>>;
  isalert:boolean,
  setIsAlert: React.Dispatch<React.SetStateAction<boolean>>;
}
interface Profile {
  name: string,
  Phone: number,
  email: string,
  gender: string,
  id: string,
  
}

export const ShopContext = React.createContext<ShopContextType>({
  products: [], currency: "₹",
  showSearch: false,
  issearch: '',
  setIsSearch: () => { },
  setShowSearch: () => { },
  formtype: "Sign Up",
  setFormType: () => { },
  userInfo: null,
  setUserInfo: () => { },
  isalert:false,
  setIsAlert:()=>{},
});

const ShopContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [issearch, setIsSearch] = useState<string>('');
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [formtype, setFormType] = useState<string>("Sign Up");
  const [userInfo, setUserInfo] = useState<Profile | null>(null)
    const [isalert, setIsAlert] = useState<boolean>(false);
  const currency = "₹";
  const value: ShopContextType = {
    currency,
    products,
    showSearch,
    setShowSearch,
    issearch,
    setIsSearch,
    formtype,
    setFormType,
    userInfo,
    setUserInfo,
    isalert,
    setIsAlert
  }
  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  )
}
export default ShopContextProvider;
