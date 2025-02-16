import {createAsyncThunk, createSlice, isRejectedWithValue} from "@reduxjs/toolkit"
import axios from "axios"

const REGISTER = "http://127.0.0.1:5120/api/users/register";
const LOGIN = "http://127.0.0.1:5120/api/users/login";
const ROLES = "http://127.0.0.1:5120/api/roles";


const initialState = {
    isAuth : false,
    token : "",
    loading: false,
    errMessage:"",
    registeredUser:null,
    currentUser: null,
    userRole:null
}


export const register = createAsyncThunk("register",async(userInfo,{rejectWithValue})=>{
    try{
        const response = await axios.post(REGISTER,userInfo);
        return response.data;
    }
    catch(err){
        console.log(err.response.data);
        return rejectWithValue(err.response.data);
    }
});

export const login = createAsyncThunk("login",async(userInfo,{rejectWithValue})=>{
    try{
        const response = await axios.post(LOGIN,userInfo);
        localStorage.setItem("token",JSON.stringify(response.data.token));
        localStorage.setItem("isAuth",true);
        return response.data;
    }
    catch(err){  
        return rejectWithValue(err.response.data);

    }
});


export const getUserRoles = createAsyncThunk("userRole",async()=>{
    try{
        const response = await axios.get(ROLES + "/user");
        return response.data;
    }
    catch(err)
    {
        return err.message;
    }
})

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setLoading : (state,action) =>{
            state.loading = action.payload;
        },
        setCurrentUser : (state,action)=>{
            state.currentUser = action.payload
            localStorage.setItem("currentUser",JSON.stringify(state.currentUser));
        },
        setIsAuth : (state,action) =>{
            state.isAuth = action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(register.pending,(state)=>{
                state.loading = true;
            })
            .addCase(register.fulfilled,(state,action)=>{
                state.loading = false;
                state.registeredUser = action.payload;
            })
            .addCase(register.rejected,(state,action)=>{
                state.errMessage = action.payload;
                state.loading = false;
            })
            .addCase(login.pending,(state)=>{
                state.loading = true;
                state.isAuth = false;
            })
            .addCase(login.fulfilled,(state,action)=>{
                state.loading = false;
                state.isAuth = true;
                state.token = action.payload;
            })
            .addCase(login.rejected,(state,action)=>{
                state.errMessage = action.payload;
                state.loading = false;
                state.isAuth = false;
            })
            .addCase(getUserRoles.pending,(state)=>{
                state.loading = true;
            })
            .addCase(getUserRoles.rejected,(state)=>{
                state.loading = false;
            })
            .addCase(getUserRoles.fulfilled,(state,action)=>{
                state.loading = false;
                state.userRole = action.payload;
            })
    }
})


export const {setLoading,setCurrentUser,setIsAuth} = authSlice.actions;
export default authSlice.reducer;