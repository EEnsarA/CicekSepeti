import {createAsyncThunk, createSlice, isRejectedWithValue} from "@reduxjs/toolkit"
import axios from "axios"

const CART_GET = "http://127.0.0.1:5120/api/carts";



const getCartFromLocal = ()=>{
    if(localStorage.getItem("cart"))
    {
        return JSON.parse(localStorage.getItem("cart"));
    }
    return [];
}

const initialState = {
    cart:getCartFromLocal(),
    userCart:null,
    amountCart:0,
    addedCart:null,
    removedCart:{},
    cartProducts:null,
    amountCartDb:0
};


const writeCartToLocal = (cart)=>{
    localStorage.setItem("cart",JSON.stringify(cart));
};




export const getCartByUserId = createAsyncThunk("userCart",async(paramId)=>{
    try{
        const response = await axios(CART_GET + "/" + paramId);
        return response.data;
    }
    catch(err){
        return err.message;
    }
})

export const addCartDb = createAsyncThunk("addedCart",async(addCart)=>{
    try{
        const response = await axios.post(CART_GET,addCart);
        return response.data;
    }
    catch(err){
        return err.message;
    }
})

export const removeCartDb = createAsyncThunk("removedCart",async(removeCart)=>{
  
    try{
        const response = await axios.delete(CART_GET,{data:removeCart});
        return response.data;
    }
    catch(err){
        return err.message;
    }
})

export const getCartProducts = createAsyncThunk("cartProducst",async(customerId)=>{
    try{
        const response = await axios.get(CART_GET + "/products/" +customerId);
        return response.data;
    }
    catch(err){
        return err.message;
    }
})


const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addProductToCart : (state,action)=>{
            const findProduct = state.cart.find((product)=>product.id === action.payload.id);
            if(findProduct){
                console.log(findProduct);
                const extractedCart = state.cart.filter((prd)=>prd.id != action.payload.id)
                findProduct.count += action.payload.count;
                state.cart = [...extractedCart,findProduct];
                writeCartToLocal(state.cart);
            }
            else{
                state.cart = [...state.cart,action.payload];
                writeCartToLocal(state.cart)
            }
            
        },
        removeProductToCart : (state,action)=>{
            const findProduct = state.cart && state.cart.find((prd)=>prd.id == action.payload.id);
            if(findProduct && findProduct.count <= 1)
            {
                const extractedCart = state.cart.filter((prd)=> prd.id != action.payload.id)
                state.cart = [...extractedCart];
                writeCartToLocal(state.cart);
            }
            else{
                const extractedCart = state.cart.filter((prd)=>prd.id != action.payload.id)
                findProduct.count = findProduct.count - 1;
                state.cart = [...extractedCart,findProduct];
                writeCartToLocal(state.cart);
            }
        },
        calculateCart : (state)=>{
            state.amountCart = 0;
            state.cart && state.cart.map((prd)=>{
                state.amountCart += prd.price * prd.count;
            })
            
        },
        calculateCartDb: (state)=>{
            state.amountCartDb = 0;
            state.cartProducts && state.cartProducts.map((prd)=>{
                state.amountCartDb += prd.price * prd.productCount;
            })
            
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(getCartByUserId.fulfilled,(state,action)=>{
                state.userCart = action.payload;
            })
            .addCase(addCartDb.fulfilled,(state,action)=>{
                state.addedCart = action.payload;
            })
            .addCase(removeCartDb.fulfilled,(state,action)=>{
                state.removedCart = action.payload;
            })
            .addCase(getCartProducts.fulfilled,(state,action)=>{
                state.cartProducts = action.payload;
            })
    }
})

export const { addProductToCart,removeProductToCart,calculateCart,calculateCartDb } = cartSlice.actions;
export default cartSlice.reducer;

