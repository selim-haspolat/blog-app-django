import { createSlice } from "@reduxjs/toolkit";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export interface InitialState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: boolean;
}

const userString = localStorage.getItem("user");
const initialState: InitialState = {
  user: userString ? JSON.parse(userString) : null,
  token: userString ? JSON.parse(userString).token : null,
  loading: false,
  error: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    loginSuccess: (state, { payload: { user, key } }) => {
      state.loading = false;
      state.user = user;
      state.token = key;
    },
    registerSuccess: (state, { payload: { user, key } }) => {
      state.loading = false;
      state.user = user;
      state.token = key;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.user = null;
      state.token = null;
    },
    fetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  loginSuccess,
  registerSuccess,
  logoutSuccess,
  fetchFailure,
} = authSlice.actions;

export default authSlice.reducer;
