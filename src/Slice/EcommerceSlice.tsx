import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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

interface Cart {
  itemid: string;
  size: string;
  quantity: number;
}
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

interface ecommerceState {
  whishlist: WhishlistProduct[];
  orders: Ordersinfo[];
}

const initialState: ecommerceState = {
  whishlist: [],
  orders:[],
}

export const ecommerceSlice = createSlice({
  name: "ecommerce",
  initialState,
  reducers: {
    setWishlist: (state, action: PayloadAction<WhishlistProduct[]>) => {
      state.whishlist = action.payload;
    },
    addWishlist: (state, action: PayloadAction<WhishlistProduct>) => {
      state.whishlist.push(action.payload);
    },
    removeWhishlist: (state, action: PayloadAction<string>) => {
      state.whishlist = state.whishlist.filter((item) => item.id !== action.payload);
    },

    setOrders :(state, action: PayloadAction<Ordersinfo[]>) => {
      state.orders = action.payload;
    },
  }
})

export const { addWishlist, removeWhishlist, setWishlist,setOrders } = ecommerceSlice.actions;
export default ecommerceSlice.reducer;
