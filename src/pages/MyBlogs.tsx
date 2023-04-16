import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Blog } from "../feature/blogSlice";
import BlogCard from "../components/BlogCard";
import useBlogCall from "../hooks/useBlogCall";

const MyBlogs = () => {
  const { user } = useSelector((state: any) => state.auth);
  const { myBlogs } = useSelector((state: any) => state.blog);
  const { getMyBlogs } = useBlogCall();

  useEffect(() => {
    getMyBlogs(user.id);
  }, []);

  return (
    <div className="grid xl:grid-cols-2 gap-x-5 gap-y-10 my-10 px-5">
      {[...myBlogs]
        .sort((a: Blog, b: Blog) => b.likes - a.likes)
        .map((blog: Blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
    </div>
  );
};

export default MyBlogs;
