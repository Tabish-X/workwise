import { useState } from "react";
import Author from "./Author";
import Comments from "./Comments";
import { useSelector } from "react-redux";
import { getAuthUser } from "../../App/Features/LoginedUser/authSlice";
import Likes from "./Likes";

const Post = ({ post }) => {
  const [view, setView] = useState(null);
  const authUser = useSelector(getAuthUser)
  const [commentContainer, setCommentContainer] = useState(false);
  const {
    createdAt,
    likes,
    desc,
    title,
    type,
    skills,
    comments,
    price,
    userId,
    availability,
    _id,
  } = post;

  return (
    <>
      <div
        className="p-4 bg-white-pure border border-b-2 relative rounded-sm"
        key={_id}
      >
        {/* author of post */}
        <Author post={post} />

        {/* for prices and some buttons */}
        <div className="mt-8 text-left ">
          {/* buttons */}
          <div className="space-x-2 text-white-pure text-sm">
            <button className="py-1 px-2 bg-green-400 rounded-md hover:bg-green-500 transition-colors duration-150">
              <i className="fa-solid fa-bookmark text-white-pure"></i>
            </button>
            <button className="py-1 px-2 bg-red-400 rounded-md hover:bg-red-500 transition-colors duration-150">
              <i className="fa-solid fa-envelope text-white-pure"></i>
            </button>

            {type === "project" && (
              <button className="py-1 px-2 bg-blue-400 rounded-md hover:bg-blue-500 transition-colors duration-150">
                Bid Now
              </button>
            )}
          </div>
          <div className="mt-2">
            <h3 className="font-semibold capitalize">{title}</h3>
            <div className="flex gap-4 mt-2">
              {type === "job" && (
                <p className=" text-sm py-1 px-2 bg-blue-400 text-white-pure rounded-md capitalize">
                  {availability}
                </p>
              )}
              <h3 className="font-semibold capitalize text-sm mt-1">{price}</h3>
            </div>
          </div>
        </div>

        {/* //post paragraph */}
        <div className="mt-4 ">
          <p
            className={`${
              view === _id ? "line-clamp-0" : "line-clamp-3"
            } text-sm text-gray-para`}
          >
            {desc}
          </p>

          {desc.length > 200 &&
            (view !== _id ? (
              <button
                className={`text-sm text-theme-secondary font-semibold`}
                onClick={() => setView(_id)}
              >
                View more
              </button>
            ) : (
              <button
                className={`text-sm text-theme-secondary font-semibold`}
                onClick={() => setView(null)}
              >
                view less
              </button>
            ))}
        </div>
        {/* //skills */}
        <div className="py-6 flex flex-wrap w-full gap-3 border-b-[1px]">
          {skills.map((skill, i) => (
            <p
              className="py-1 text-sm px-4 text-gray-shade2 capitalize bg-white-gray rounded-full"
              key={i}
            >
              {skill}
            </p>
          ))}
        </div>
        {/* like comments */}
        <div className="flex items-center justify-between pt-4 pb-2 px-4">
          <Likes post={post}/>
          <span
            className="text-sm text-gray-shade2 cursor-pointer transition-colors hover:text-gray-600"
            onClick={() => setCommentContainer(true)}
          >
            <i className="fa-solid fa-message mr-2"></i>
            Comments {comments.length}
          </span>
        </div>
        {commentContainer && (
          <Comments enable={setCommentContainer} post={post}/>
        )}
      </div>
    </>
  );
};

export default Post;
