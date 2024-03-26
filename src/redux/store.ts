import { configureStore } from "@reduxjs/toolkit";
import { productHandlingSlice } from "./slices/productHandlingSlice.ts";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        products: productHandlingSlice.reducer
    },
})

export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector