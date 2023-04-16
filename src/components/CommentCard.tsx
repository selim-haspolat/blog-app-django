
interface Prop {
  comment: {
    post: number;
    content: string;
    id: number;
    user: string;
    time_stamp: string;
  };
}

const CommentCard = ({ comment }: Prop) => {
  console.log(comment);
  return (
    <div className="flex flex-col px-3 py-2 border w-80 md:w-[427px] border-blue-400 break-words">
      <span className="font-light text-sm">@{comment?.user}</span>
      {comment.content}
    </div>
  );
};

export default CommentCard;
