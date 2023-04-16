import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/authSlice";
import blogReducer from '../feature/blogSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogReducer
  },
});

export default store;
