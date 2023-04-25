import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { deletePost, EditPost, getContact,postContact } from "../../services/fetching";


export const  fetchContact=createAsyncThunk(
'post/fetchContact',
 async ()=>{
    const res=await getContact();
    return res.data 
}
)
export const addnewFetchPost=createAsyncThunk(
    'post/addnewFetchPost',
    async(initial)=>{
        const res=await postContact(initial);
        return res.data
    }
)

export const deleteFetchPost=createAsyncThunk(
    'post/deletePostFetch',
    async (id)=>{
       await deletePost(id);
       return id
    }
)
export const changeFetchPost=createAsyncThunk(
    'changeFetchPost',
    async ({id,post})=>{
       const res= await EditPost(id,post);
       return(
        {data:res.data,id:id}
       )
    }
)


const initialState={
    posts:[],
    loading:"idle",
}

const  postSlice=createSlice({
    name:"post",
    initialState,
    reducers:{
    },

    extraReducers(builder){
        builder.addCase(fetchContact.fulfilled,(state,action)=>{
            state.posts=action.payload;
            state.loading="fulfield"
        })
        .addCase(fetchContact.pending,(state)=>{
            state.loading="loading"
        })
        .addCase(addnewFetchPost.fulfilled,(state,action)=>{
            state.posts.push(action.payload);
        })
        .addCase(fetchContact.rejected,(state)=>{
            state.loading="reject";
        })
        .addCase(deleteFetchPost.fulfilled,(state,action)=>{
            const deletedPost=state.posts.filter(post=>post.id!==action.payload)
            state.posts=deletedPost
        })
        .addCase(changeFetchPost.fulfilled,(state,action)=>{
          const findingPostIndex= state.posts.findIndex(post=>post.id===action.payload.id)
          state.posts[findingPostIndex]=action.payload.data;
        })
    }
})

export default postSlice.reducer;

