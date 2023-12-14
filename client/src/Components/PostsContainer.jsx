import Post from "./posts/Post";
import { getAllPosts } from "../App/Features/Posts/selectors";
import CreatePostBar from "./CreatePostBar";

const PostsContainer = ({ job, project, postType }) => {
  const posts = getAllPosts();
  const postByJobType = posts.filter((post) => {
    if (post.type === postType) {
      return post;
    }
  });

  return (
    <>
      <article className="w-full lg:w-[50%]">
        <CreatePostBar job={job} project={project} />

        <div className="my-4 space-y-4">
          {postType === "all"
            ? posts.map((post) => <Post post={post} key={post._id} />)
            : postByJobType.map((post) => <Post post={post} key={post._id} />)}
        </div>

        {/* LIST END */}
      </article>
    </>
  );
};

export default PostsContainer;
