import axios from "axios";
import Footer from "../components/Footer";
import HomePosts from "../components/Homepost";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../context/Usercontext";
import { URL } from "../../url";
import Loader from "../components/Loader";

const Home = () => {
  const { search } = useLocation();
  console.log(search);

  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);
  console.log("user is", user);

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(`${URL}/api/posts/${search}`);
      console.log(res.data);
      setPosts(res.data);
      if (res.data && res.data.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search]);

  return (
    <>
      <div className="px-8 md:px-[200px] min-h-[80vh]">
        {!noResults ? (
          posts &&
          posts.map((post) => (
            <Link
              key={post._id}
              to={user ? `/posts/post/${post._id}` : "/login"}
            >
              <HomePosts post={post} />
              <hr />
            </Link>
          ))
        ) : (
          <h3 className="text-center font-bold mt-16">No Posts Available</h3>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
