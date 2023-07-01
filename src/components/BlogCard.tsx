import { useState } from "react";
import { Blog } from "../feature/blogSlice";
import useBlogCall from "../hooks/useBlogCall";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { toastWarnNotify } from '../helper/Toastify'


interface BlogCardProps {
  blog: Blog;
}

const trimContent = (content: string) => {
  if (content.length > 100) {
    return content.slice(0, 200) + "...";
  }
  return content;
};

const BlogCard = ({ blog }: BlogCardProps) => {
  const { likeBlog } = useBlogCall();
  const navigate = useNavigate();
  const { user } = useSelector((state: any) => state.auth);
  const [like, setLike] = useState(
    blog.likes_n.filter((l) => l?.user === user?.id).length === 1
  );
  return (
    <div className="container mx-auto rounded-md bg-gray-800 shadow-lg">
      <div className="md:flex px-4 leading-none">
        <div className="flex justify-center sm:flex-none">
          <img
            src={blog.image}
            alt="pic"
            className="h-72 w-56 rounded-lg object-cover transform -translate-y-4 border-4 border-gray-300 bg-white shadow-lg"
          />
        </div>
        <div className="flex flex-col text-gray-300 w-full">
          <p className="pt-4 text-2xl font-bold text-center">{blog?.title}</p>
          <hr className="hr-text" />
          <div className="text-md flex justify-between px-4 my-2">
            <span className="font-bold mx-auto md:mx-0">
              @{blog?.author} | {blog?.category_name}
            </span>
            <span className="font-bold" />
          </div>
          <p className="px-4 my-4 text-sm text-center md:text-left">
            {trimContent(blog?.content)}
          </p>
          <p className="flex text-md px-4 justify-center md:justify-start my-5">
            {new Date(blog?.publish_date).toLocaleDateString()}{" "}
            {new Date(blog?.publish_date).toLocaleTimeString()}
          </p>
          <div className="text-sm text-center flex-grow flex items-end justify-center">
            <button
              onClick={() => navigate(`/details/${blog?.id}`)}
              type="button"
              className="border border-gray-400 text-gray-400 rounded-md px-4 py-1.5 m-2 transition duration-300 ease select-none hover:bg-gray-900 hover:text-white focus:outline-none focus:shadow-outline"
            >
              DETAILS
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center md:justify-end gap-7 mt-3 md:mt-0 items-center px-4 mb-4 w-full">
        <div className="flex items-center justify-center gap-2 text-white">
          <i
            onClick={() => {
              if (user) {
                likeBlog(blog?.id, user.id);
                setLike(!like);
              }
              else{
                toastWarnNotify('You do not have permission to like this blog')
              }
            }}
            className={`fa-${
              like ? "solid" : "regular"
            } fa-heart text-xl cursor-pointer text-red-500 hover:text-red-600`}
          ></i>
          {blog?.likes}
        </div>
        <div className="flex items-center justify-center gap-2 text-white">
          <i className="fa-regular fa-eye text-xl text-white"></i>
          {blog?.post_views}
        </div>
        <div className="flex items-center justify-center gap-2 text-white">
          <i className="fa-regular fa-comment text-xl text-white"></i>
          {blog?.comment_count}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
