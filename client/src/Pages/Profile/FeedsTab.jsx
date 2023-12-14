import { getAllPosts } from "../../App/Features/Posts/selectors";
import Post from "../../Components/posts/Post";
import { getUserById } from "../../App/Features/Users/selectors";

const FeedsTab = ({userId}) => {
  const user = getUserById(userId)
  const posts = getAllPosts();

  return (
    <article className="w-full py-5 space-y-4">
      {
        user?.posts.length ? (
          posts.map((post) => {
            if(userId === post.userId){
             return <Post post={post} key={post._id}/>
            } 
         })
        ) : (
          <p className="text-center text-lg text-gray-shade2 font-semibold">No post Uploaded Yet</p>
        )
      }
    </article>
  );
};

export default FeedsTab;
