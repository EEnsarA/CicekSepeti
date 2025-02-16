import {createAsyncThunk,createSlice, isPending} from "@reduxjs/toolkit"
import axios from "axios"

const CATEGORY_GET = "http://127.0.0.1:5120/api/categories";


const initialState = {
    categories:[],
    category:{},
    isAuth:false,
    loadingCategories:false
};

export const getAllCategories = createAsyncThunk("categories",async()=>{
    try{
        const response = await axios(CATEGORY_GET)
        return response.data;
    }
    catch(err)
    {
        return err.message;
    }
});


export const getCategoryById = createAsyncThunk("category",async (paramId)=>{
    try{
        const response = await axios(CATEGORY_GET + "/" + paramId)
    }
    catch(err)
    {
        return err.message
    }
});

const categorySlice = createSlice({
    name:"category",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
            .addCase(getAllCategories.pending,(state)=>{
                state.loadingCategories = true;
            })
            .addCase(getAllCategories.fulfilled,(state,action)=>{
                state.loadingCategories = false;
                state.categories = action.payload;
            })
            .addCase(getCategoryById.pending,(state)=>{
                state.loadingCategories = true;
            })
            .addCase(getCategoryById.fulfilled,(state,action)=>{
                state.loadingCategories = false;
                state.category = action.payload;
            })
    }

});

export const { } = categorySlice.actions;
export default categorySlice.reducer;

