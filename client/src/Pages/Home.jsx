import LeftContainer from "../Components/LeftContainer";
import PostsContainer from "../Components/PostsContainer";
import RightContainer from "../Components/RightContainer";

const Home = () => {

  return (
    <main className="py-4 lg:py-12">
      <div id="wrapper" className="container flex flex-col lg:flex-row">
        <LeftContainer />
        <PostsContainer job={true} project={true} postType={"all"}/>
        <RightContainer/>
      </div>
    </main>
  );
};

export default Home;
