import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useBlogCall from "../hooks/useBlogCall";
import { useSelector } from "react-redux";
import EditModal from "../components/EditModal";
import CommentCard from "../components/CommentCard";

const Details = () => {
  const { id } = useParams();
  const { details, comments } = useSelector((state: any) => state.blog);
  const { user } = useSelector((state: any) => state.auth);
  const { getDetails, deleteBlog, getComments, createComment } = useBlogCall();
  const [showModal, setShowModal] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (id) {
      getDetails(id);
      getComments(id);
    }
  }, []);

  console.log(comments);

  return (
    <div className="flex flex-col items-center my-10 px-3">
      <div>
        <img
          className="w-full mx-auto md:w-[500px] lg:w-[700px]"
          src={details.image}
          alt={details.title}
        />
        <h1 className="text-5xl text-center font-light my-5">
          {details.title}
        </h1>
        <div className="flex gap-3 items-center self-start">
          <img
            className="w-12 h-12 rounded-full"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
            alt=""
          />
          <div className="flex items-center justify-between w-full">
            <h2 className="text-3xl font-light">{details.author}</h2>
            <h2 className="text-lg">{details.category_name}</h2>
          </div>
        </div>
        <div className="my-5 md:w-[500px] lg:w-[1000px]">{details.content}</div>
        <div className="flex justify-center md:justify-end gap-7 mt-3 md:mt-0 items-center px-4 mb-4 w-full">
          <div className="flex items-center justify-center gap-2 text-black">
            <i className={`fa-solid fa-heart text-xl text-red-500`}></i>
            {details?.likes}
          </div>
          <div className="flex items-center justify-center gap-2 text-black">
            <i className="fa-regular fa-eye text-xl"></i>
            {details?.post_views}
          </div>
          <div className="flex items-center justify-center gap-2 text-black">
            <i
              onClick={() => setShowComments(!showComments)}
              className="fa-regular fa-comment text-xl cursor-pointer"
            ></i>
            {details?.comment_count}
          </div>
        </div>
      </div>
      <div>
        {showComments && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              id && createComment({ post: id, content: comment });
            }}
            className="my-3 flex flex-col"
          >
            <div className="flex gap-3 w-80 md:w-[427px]">
              <input
                placeholder="Create Comment"
                onChange={(e) => setComment(e.target.value)}
                type="text"
                className="border outline-none focus:border-blue-600 border-blue-400 p-2 w-80"
                required
              />
              <button
                type="submit"
                className="text-blue-400 border border-blue-400 px-3 hover:bg-blue-400 hover:text-white transition-colors py-2"
              >
                Comment
              </button>
            </div>
            <div className="flex flex-col gap-3 mt-3">
              {comments.map(
                (
                  comment: {
                    post: number;
                    content: string;
                    id: number;
                    user: string;
                    time_stamp: string;
                  },
                  i: number
                ) => (
                  <CommentCard key={i} comment={comment} />
                )
              )}
            </div>
            <div className="text-center">
              {(comments.length === 0) && 'No comments'}
            </div>
          </form>
        )}
      </div>
      {user.username === details.author && (
        <div className="flex gap-5">
          <button
            onClick={() => setShowModal(true)}
            className="text-green-500 hover:text-white w-32 py-1 border border-green-500 hover:bg-green-500 transition-colors  rounded"
          >
            Edit
          </button>
          <button
            onClick={() => deleteBlog(details.id)}
            className="text-red-500 hover:text-white w-32 py-1 border border-red-500 hover:bg-red-500 transition-colors  rounded"
          >
            Delete
          </button>
        </div>
      )}
      {showModal && id && (
        <EditModal id={id} showModal={showModal} setShowModal={setShowModal} />
      )}
    </div>
  );
};

export default Details;
