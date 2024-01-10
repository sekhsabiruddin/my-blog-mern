import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import { URL } from "../../url";
import { IF } from "../../url";
import { useNavigate } from "react-router-dom";
const Postdetails = () => {
  const postId = useParams().id;
  const navigate = useNavigate();
  // console.log("post id ", postId);
  // console.log(URL);
  console.log(IF);
  // Sample data for categories
  const [post, setPost] = useState({});

  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/" + postId);
      setPost(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeletePost = async () => {
    try {
      // Assuming 'postId' is passed as a parameter or retrieved from the component's state
      await axios.delete(URL + "/api/posts/" + postId, {
        withCredentials: true,
      });

      // Additional logic after successful deletion
      console.log("Post deleted successfully");
      navigate("/");
      // You might want to update the UI or navigate to a different page here
    } catch (err) {
      console.error("Error deleting post:", err);
      // Handle the error appropriately, e.g., show a notification to the user
    }
  };
  useEffect(() => {
    fetchPost();
  }, [postId]);

  return (
    <div>
      <div className="px-8 md:px-[200px] mt-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-black md:text-3xl">
            {post.title}
          </h1>
          {/* {user?._id === post?.userId && ( */}
          <div className="flex items-center justify-center space-x-2">
            <p className="cursor-pointer">
              <BiEdit
                onClick={() => navigate("/edit/" + postId)}
                style={{ color: "green", fontSize: "1.5rem" }}
              />
            </p>
            <p className="cursor-pointer">
              <MdDelete
                onClick={handleDeletePost}
                style={{ color: "red", fontSize: "1.5rem" }}
              />
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2 md:mt-4">
          <p>@{post.username}</p>
          <div className="flex space-x-2">
            <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>
        <img src={IF + post.photo} className="w-full mx-auto mt-8" alt="" />
        <p className="mx-auto mt-8">{post.desc}</p>
        <div className="flex items-center mt-8 space-x-4 font-semibold">
          <p>Categories:</p>
          <div className="flex justify-center items-center space-x-2">
            {post.categories?.map((c, i) => (
              <div key={i} className="bg-gray-300 rounded-lg px-3 py-1">
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Postdetails;
