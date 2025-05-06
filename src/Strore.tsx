import { configureStore } from "@reduxjs/toolkit";
import { ecommerceSlice } from "./Slice/EcommerceSlice";

export const store = configureStore({
  reducer: {
    ecommerce: ecommerceSlice.reducer,
  },
});

export type stateType = ReturnType<typeof store.getState>
export type dispatchtype = typeof store.dispatch