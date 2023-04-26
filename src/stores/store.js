import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "../featuers/posts/postsSlice";
import favPosttSlice from "../featuers/posts/favPostSlice";
import singUpSlice from "../featuers/posts/userSlice";
import postDbslice from "../featuers/idb/postDbslice";
import { getAllDB } from "../featuers/idb/postDbslice";

export const myStore = configureStore({
  reducer: {
    posts: postsSlice,
    fav: favPosttSlice,
    users: singUpSlice,
    idb:postDbslice
  },
});
