import { createSlice } from "@reduxjs/toolkit";

export interface Likes_n {
  id: number;
  user: number;
  post: number;
}

export interface Blog {
  id: number;
  title: string;
  content: string;
  image: string;
  category: number;
  publish_date: string;
  author: string;
  status: "p" | "d";
  slug: string;
  comments: [];
  category_name: string;
  likes: number;
  post_views: number;
  comment_count: number;
  likes_n: Likes_n[];
}

export interface Category {
  name: string;
  id: number;
}

interface InitialState {
  blogs: Blog[];
  myBlogs: Blog[];
  categories: Category[];
  details: Blog | {};
  comments: []
}

const initialState: InitialState = {
  blogs: [],
  myBlogs: [],
  categories: [],
  details: {},
  comments: [],
};

const blogSlice = createSlice({
  name: "blog",
  initialState: initialState,
  reducers: {
    setBlogs: (state, { payload }) => {
      state.blogs = payload;
    },
    setCategories: (state, { payload }) => {
      state.categories = payload;
    },
    setMyBlogs: (state, { payload }) => {
      state.myBlogs = payload;
    },
    setDetails: (state, { payload }) => {
      state.details = payload;
    },
    setComments: (state, { payload }) => {
      state.comments = payload;
    }
  },
});

export const { setBlogs, setMyBlogs, setCategories, setDetails,setComments } =
  blogSlice.actions;
export default blogSlice.reducer;
