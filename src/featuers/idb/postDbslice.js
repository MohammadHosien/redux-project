import { createSlice } from "@reduxjs/toolkit";
import { openDB } from "idb";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../../public/sw";


export const getAllDB = createAsyncThunk("postDb/getAllDB", async () => {
  const promiseDb = await db;
  const tx=promiseDb.getAll("contacts")
  return tx
});

 export const addDB = createAsyncThunk("postDb/adddb", async (contact) => {
  const promiseDb = await db;
  const tx = await promiseDb
    .transaction("contacts", "readwrite")
    .objectStore("contacts")
    .put(contact);
  return promiseDb
    .transaction("contacts", "readwrite")
    .objectStore("contacts")
    .get(tx);
});

export const  deleteAll=createAsyncThunk('postDb/deleteAll',async()=>{
    const promiseDb=await db;
    promiseDb.transaction('contacts','readwrite').objectStore('contacts').clear()
})



const postDb = createSlice({
  name: "postDb",
  initialState: {
    postDb: [],
    status: "idle",
  },
  extraReducers: (builder) => {
    builder.addCase(getAllDB.fulfilled, (state, action) => {
      state.status="ful"
      state.postDb = action.payload;
    });
    builder.addCase(addDB.fulfilled, (state, action) => {
       state.postDb.push(action.payload)
    });
    builder.addCase(deleteAll.fulfilled,(state)=>{
        state.postDb=[];
    })
    builder.addCase(getAllDB.pending,(state)=>{
        state.status="loading"
    })
  },
});

export default postDb.reducer;
