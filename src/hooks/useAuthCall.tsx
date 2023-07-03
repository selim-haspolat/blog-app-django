import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  fetchStart,
  loginSuccess,
  registerSuccess,
  logoutSuccess,
  fetchFailure,
} from "../feature/authSlice";

import { toastErrorNotify, toastSuccessNotify } from '../helper/Toastify'

const useAuthCall = () => {
  interface LoginInfo {
    username: string;
    password: string;
  }

  interface RegisterInfo {
    username: string;
    email: string;
    password: string;
    password2: string;
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const BASE_URL = "http://127.0.0.1:8000/";

  const login = async (info: LoginInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(`${BASE_URL}users/auth/login/`, info);
      navigate("/");
      toastSuccessNotify('Login succes')
      localStorage.setItem("user", JSON.stringify({...data.user, token: data.key}));
      dispatch(loginSuccess(data));
    } catch (error: any) {
      toastErrorNotify(error.message)
      dispatch(fetchFailure());
    }
  };

  const register = async (info: RegisterInfo) => {
    dispatch(fetchStart());
    try {
      let { data } = await axios.post(`${BASE_URL}users/register/`, info);
      navigate("/");
      toastSuccessNotify('Register succes')
      localStorage.setItem("user", JSON.stringify({...data.user, token: data.key}));
      dispatch(registerSuccess(data));
    } catch (error: any) {
      toastErrorNotify(error.message)
      dispatch(fetchFailure());
    }
  };

  const logout = async (token: string) => {
    dispatch(fetchStart());
    try {
      await axios.post(`${BASE_URL}users/auth/logout/`, {
        Headers: { Authorization: `Token ${token}` },
      });
      dispatch(logoutSuccess());
      localStorage.removeItem("user");
      toastSuccessNotify('Logout succes')
      navigate("/login");
    } catch (error:any) {
      toastErrorNotify(error.message)
      dispatch(fetchFailure());
    }
  };

  return { login, register, logout };
};

export default useAuthCall;
