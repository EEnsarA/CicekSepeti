import {createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import axios from "axios"

const PRODUCT_GET = "http://127.0.0.1:5120/api/products";

const initialState = {
    products: [],
    product:{}, 
    isAuth: false, 
    loadingProducts:false
};


export const getAllProducts = createAsyncThunk("products",async()=>{
    // if(!isAuth) return ;
    try{
        const response = await axios(PRODUCT_GET)
        return response.data;
    }
    catch(err){
        return err.message;
    }
});

export const getProductById = createAsyncThunk("product",async(paramId)=>{
    try{
        const response = await axios(PRODUCT_GET+"/"+paramId);
        return response.data;
    }
    catch(err){
        return err.message;
    }
});

export const getProductsByCatId = createAsyncThunk("productsByCategory",async(paramId)=>{
    try{
        const response = await axios(PRODUCT_GET+"/bycategory/"+ paramId)
        return response.data;
    }
    catch(err){
        return err.message;
    }
})


const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{
    },
    extraReducers:(builder)=>{
     builder
         .addCase(getAllProducts.pending,(state)=>{
             state.loadingProducts = true;
         })
         .addCase(getAllProducts.fulfilled,(state,action)=>{
             state.loadingProducts = false;
             state.products = action.payload;
         })
         .addCase(getProductById.pending,(state)=>{
             state.loadingProducts = true;
         })
         .addCase(getProductById.fulfilled,(state,action)=>{
             state.loadingProducts = false;
             state.product = action.payload;
         })  
         .addCase(getProductsByCatId.pending,(state)=>{
            state.loadingProducts = true;
         })
         .addCase(getProductsByCatId.fulfilled,(state,action)=>{
            state.loadingProducts = false;
            state.products = action.payload;
         }) 
    }
 });


export const {  } = productSlice.actions;
export default productSlice.reducer;