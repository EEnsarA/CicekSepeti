import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"

const USERS_GET ="http://127.0.0.1:5120/api/users";
const PRODUCT_GET = "http://127.0.0.1:5120/api/products";

const initialState = {
    users:[],
    dealers:[],
    user:null,
    loading: false,
    dealerProducts:[],
}


export const getAllUsers = createAsyncThunk("users",async()=>{
    try{
        const token = JSON.parse(localStorage.getItem("token"));     
        const response = await axios.get(USERS_GET,{
            headers:{Authorization: `Bearer ${token}`}
        });
        return response.data;
    }
    catch(err){
        return err.message;
    }
});

export const getUserById = createAsyncThunk("user",async(userId)=>{
    try{
        const token  = JSON.parse(localStorage.getItem("token"));
        const response = await axios.get(USERS_GET + userId,{
            headers:{Authorization:`Bearer ${token}`}
        });
        return response.data;
    }
    catch(err){
        return err.message;
    }
})

export const getDealers = createAsyncThunk("dealers",async()=>{
    try
    {
        const token  = JSON.parse(localStorage.getItem("token"));
        const response = await axios.get(USERS_GET + "/dealers",{
            headers:{Authorization:`Bearer ${token}`}
        })
        return response.data;
    }
    catch(err){
        return err.message;
    }
})

export const getProductsByDealerId = createAsyncThunk("productsByDealer",async(paramId)=>{
    try{
        const response = await axios(PRODUCT_GET + "/bydealer/" + paramId);
        return response.data;
    }
    catch(err)
    {
        return err.message;
    }
})




const userSlice = createSlice({
    name:"user",
    initialState,
    reducers : {},
    extraReducers: (builder)=>{
        builder
            .addCase(getAllUsers.pending,(state)=>{
                state.loading = true;
            })
            .addCase(getAllUsers.fulfilled,(state,action)=>{
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(getAllUsers.rejected,(state)=>{
                
            })
            .addCase(getUserById.pending,(state)=>{
                state.loading = true;
            })
            .addCase(getUserById.fulfilled,(state,action)=>{
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(getUserById.rejected,(state)=>{
                state.loading = false;
            })
            .addCase(getDealers.pending,(state)=>{
                state.loading = true;
            })
            .addCase(getDealers.rejected,(state)=>{
                state.loading = false;
            })
            .addCase(getDealers.fulfilled,(state,action)=>{
                state.loading = false;
                state.dealers = action.payload;
            })
            .addCase(getProductsByDealerId.pending,(state)=>{
                state.loading = true;
             })
             .addCase(getProductsByDealerId.fulfilled,(state,action)=>{
                state.loading = false;
                state.dealerProducts = action.payload;
             })      
    }
})


export const {} = userSlice.actions;
export default userSlice.reducer;