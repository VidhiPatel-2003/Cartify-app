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



interface Profile {
  name: string,
  Phone: number,
  email: string,
  gender: string,
  id: string
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
  // id: string; // Added id property
}

interface ecommerceState {
  whishlist: WhishlistProduct[];
  orders: Ordersinfo[];
  profile: Profile | null;
  address: Placeorderinfo[];
}




const initialState: ecommerceState = {
  whishlist: [],
  orders: [],
  profile: null,
  address: [],
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

    setOrders: (state, action: PayloadAction<Ordersinfo[]>) => {
      state.orders = action.payload;
    },

    setProfile: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload;
    },

    deleteProfile: (state) => {
      state.profile = null;
    },

    setAddress: (state, action: PayloadAction<Placeorderinfo[]>) => {
      state.address = action.payload;
    },

    deleteAddress: (state, action: PayloadAction<string>) => {
      state.address = state.address.filter((item) => item.addressId !== action.payload)
    }

  }
})

export const { addWishlist, removeWhishlist, setWishlist, setOrders, setProfile, deleteProfile, setAddress,deleteAddress } = ecommerceSlice.actions;
export default ecommerceSlice.reducer;
