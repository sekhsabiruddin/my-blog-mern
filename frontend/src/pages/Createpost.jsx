import React, { useState } from "react";
import Footer from "../components/Footer";
import { UserContext } from "../context/Usercontext";
import { useContext } from "react";
import { URL } from "../../url";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Createpost.css";
const Createpost = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(UserContext);
  const [cats, setCats] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title || !desc || !file || !cats) {
      setError(true);
      return;
    }

    const post = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: cats,
    };
    console.log("post is", post);
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("img", filename);
      data.append("file", file);
      post.photo = filename;
      // console.log(data)
      //img upload
      try {
        const imgUpload = await axios.post(URL + "/api/upload", data);
        // console.log(imgUpload.data)
      } catch (err) {
        console.log(err);
      }
    }
    //post upload
    // console.log(post)
    try {
      console.log("URL", URL + "/api/posts/create");
      const res = await axios.post(URL + "/api/posts/create", post, {
        withCredentials: true,
      });
      // navigate("/posts/post/" + res.data._id);
      navigate("/");
      // console.log(res.data)
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="px-6 md:px-[200px] mt-8">
        <h1 class="font-bold md:text-2xl text-xl text-center">Create a post</h1>
        <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter post title"
            className="px-4 py-2 outline-none"
          />

          <input
            id="fileInput"
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
          />

          <div className="flex flex-col">
            <div className="flex items-center space-x-4 md:space-x-8">
              <input
                value={cats}
                onChange={(e) => setCats(e.target.value)}
                className="px-4 py-2 outline-none"
                placeholder="Enter post category"
                type="text"
              />
            </div>
          </div>
          <textarea
            rows={10}
            cols={30}
            className="px-4 py-2 outline-none"
            placeholder="Enter post description"
            onChange={(e) => setDesc(e.target.value)}
          />
          {error && (
            <small style={{ color: "red" }}>Filed should not be empty </small>
          )}
          <button
            onClick={handleCreate}
            className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg"
          >
            Create
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Createpost;
