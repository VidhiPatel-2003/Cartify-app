import React, { createContext } from "react";
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
}

export const ShopContext = React.createContext<ShopContextType>({
  products:[],currency: "₹",
});

const ShopContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const currency = "₹";
  const value: ShopContextType = {
    currency,
    products
  }
  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  )
}
export default ShopContextProvider;
