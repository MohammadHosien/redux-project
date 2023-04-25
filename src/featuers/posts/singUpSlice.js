import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { postUser,getUser } from "../../services/fetching";

export const userAddFetch=createAsyncThunk(
'userpostFetch',
async(initial)=>{
const res= await postUser(initial)
 return res.data
}
)

export const getUserFetching=createAsyncThunk(
    'user/getFetching',
    async()=>{
      const res=await getUser();
      return res.data
    }
)

const signUpSlice=createSlice({
    name:"signUp",
    initialState:{
        user:[]
    },
    extraReducers:(builder)=>{
        builder.addCase(userAddFetch.fulfilled,(state,action)=>{
            state.user.push(action.payload)
        })
        .addCase(getUserFetching.fulfilled,(state,action)=>{
            state.user=action.payload
        })
    }
})

export default signUpSlice.reducer