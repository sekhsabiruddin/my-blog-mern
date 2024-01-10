import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";
import axios from "axios";
import { URL } from "../../url";
import { UserContext } from "../context/Usercontext";

const Login = () => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        URL + "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      setUser(res.data);
      navigate("/");
    } catch (err) {
      setError(true);
      console.error("Login Error:", err);
    }
  };

  return (
    <>
      <div className="w-full flex justify-center items-center h-[80vh] login-container">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[30%] login-outer">
          <h1 className="text-xl font-bold text-left">
            Log in to your account
          </h1>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border-2 border-black outline-0 "
            type="text"
            placeholder="Enter your email"
          />
          <div className="relative w-full">
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border-2 border-black outline-0"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </button>
          </div>

          <button
            onClick={handleLogin}
            className="w-full px-1.5 py-1.5 text-lg text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black btnlogin"
            style={{ backgroundColor: "#0f387a" }}
          >
            Log in
          </button>

          {error && (
            <h3 className="text-red-500 text-sm">Something went wrong</h3>
          )}

          <div className="flex justify-center items-center space-x-3">
            <p>New here?</p>
            <p className="text-gray-500 hover:text-black">
              <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
