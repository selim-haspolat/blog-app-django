import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setBlogs,
  setMyBlogs,
  setCategories,
  setDetails,
  setComments,
} from "../feature/blogSlice";
import { useNavigate } from "react-router-dom";

import { toastErrorNotify, toastSuccessNotify } from '../helper/Toastify'

interface PostBlogInfo {
  title: string;
  image: string;
  category: number | string;
  content: string;
  status: "d" | "p";
}

interface Category {
  id: number;
  name: string;
}

const useBlogCall = () => {
  const { token } = useSelector((state: any) => state.auth);
  const { categories } = useSelector((state: any) => state.blog);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const baseUrlInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
  });

  const blogInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers: { Authorization: `Token ${token}` },
  });

  const getBlogs = async () => {
    try {
      const { data } = await baseUrlInstance("blogs/");
      dispatch(setBlogs(data));
    } catch (error) {
      console.log(error);
    }
  };

  const getMyBlogs = async (id: number) => {
    try {
      const { data } = await blogInstance(`blogs/?author=${id}`);
      dispatch(setMyBlogs(data));
    } catch (error) {
      console.log(error);
    }
  };

  const postBlog = async (postBlogInfo: PostBlogInfo) => {
    try {
      const category = categories.filter(
        (c: Category) => c.name === postBlogInfo.category
      );
      console.log({
        ...postBlogInfo,
        category: category[0].id,
      });
      await blogInstance.post("blogs/", {
        ...postBlogInfo,
        category: category[0].id,
      });
      toastSuccessNotify('Blog post successfully')
      getBlogs();
    } catch (error) {
      console.log(error);
      toastErrorNotify('Blog post failed')
    }
  };

  const deleteBlog = async (id: string) => {
    try {
      await blogInstance.delete(`blogs/${id}/`);
      getBlogs();
      navigate("/");
      toastSuccessNotify('Blog successfully deleted')
    } catch (error) {
      toastErrorNotify('Blog delet failed')
    }
  };

  const editBlog = async (id: string, postBlogInfo: PostBlogInfo) => {
    try {
      await blogInstance.put(`blogs/${id}/`, postBlogInfo);
      getDetails(id);
      toastSuccessNotify('Blog successfully updated')
    } catch (error) {
      toastErrorNotify('Blog edit failed')
    }
  };

  const likeBlog = async (id: number, userId: number) => {
    try {
      await blogInstance.post(`likes/${id}/`);
      getBlogs();
      getMyBlogs(userId);
    } catch (error) {
      console.log(error);
    }
  };

  const getDetails = async (id: string) => {
    try {
      const { data } = await blogInstance(`blogs/${id}/`);
      dispatch(setDetails(data));
    } catch (error) {
      console.log(error);
    }
  };

  const createComment = async (
    comment: { post: string; content: string }
  ) => {
    try {
      await blogInstance.post(`comments/${comment.post}/`, comment);
      getComments(comment.post);
    } catch (error) {
      console.log(error);
    }
  };

  const getComments = async (id: string) => {
    try {
      const { data } = await blogInstance(`comments/${id}`);
      dispatch(setComments(data));
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const { data } = await baseUrlInstance.get("categories/");
      dispatch(setCategories(data));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getBlogs,
    getMyBlogs,
    postBlog,
    likeBlog,
    getCategories,
    getDetails,
    deleteBlog,
    editBlog,
    createComment,
    getComments,
  };
};

export default useBlogCall;
