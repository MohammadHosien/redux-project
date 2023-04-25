import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";


import { getfavPost, postFav,deletefav } from "../../services/fetching";



export const favPostFetch=createAsyncThunk(
    'favPostFetching',
    async ()=>{
        const res=await getfavPost()
        return res.data
    }
)

 export const addFavPostFetching=createAsyncThunk(
    'addFavPostFetching',
    async(post)=>{
      const res=await postFav(post)
      return res.data
    }
)

export const deleteFavFetching=createAsyncThunk(
   'deleteFavPost',
   async (id)=>{
    await deletefav(id);
    return id;
   }
)

const favPostSlice=createSlice({
    name:"favPost",
    initialState:{
        fav:[]
    },
    extraReducers:(builder)=>{
        builder.addCase(favPostFetch.fulfilled,(state,action)=>{
            state.fav=action.payload;
        })
        .addCase(addFavPostFetching.fulfilled,(state,action)=>{
            state.fav.push(action.payload);
        })
        .addCase(deleteFavFetching.fulfilled,(state,action)=>{
            const filterPost=state.fav.filter(post=>post.id!==action.payload);
            state.fav=filterPost;
        })
    }
})

export default favPostSlice.reducer