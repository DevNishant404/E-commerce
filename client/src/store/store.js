import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/auth-slice/authSlice"
import adminProductSlice from "../store/admin/productSlice/productSlice"
import shopProductSlice from "../store/shop/productSlice/productSlice"
import shopCartSlice from "../store/cart/cartSlice"

const store =configureStore({
    reducer:{
        auth:authReducer,
        adminProducts:adminProductSlice,
        shopProducts:shopProductSlice,
        ShopCart:shopCartSlice
    }
})

export default store