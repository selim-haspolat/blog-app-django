import React, { useEffect } from "react";
import useBlogCall from "../hooks/useBlogCall";
import BlogCard from "../components/BlogCard";
import { useSelector } from "react-redux";
import { Blog } from "../feature/blogSlice";

const Main = () => {
  const { getBlogs } = useBlogCall();

  const { blogs } = useSelector((state: any) => state.blog);

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div className="grid xl:grid-cols-2 gap-x-5 gap-y-10 my-10 px-5">
      {[...blogs]
        ?.sort((a: Blog, b: Blog) => b.likes - a.likes)
        ?.map((blog: Blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
    </div>
  );
};

export default Main;
