import {configureStore} from "@reduxjs/toolkit"
import productReducer from "./productSlice"
import categoryReducer from "./categorySlice"
import authReducer from "./authSlice"
import cartReducer from "./cartSlice"
import userReducer from "./userSlice"

export const store = configureStore({
    reducer:{
        productList : productReducer,
        categoryList : categoryReducer,
        authInfo : authReducer,
        cartList : cartReducer,
        userList : userReducer
    }
})