import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";
import validator from "validator";
import { URL } from "../../url";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility
  const [error, setError] = useState(false);
  const [errormessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username) {
      setError(true);
      setErrorMessage("Username should be valid");
      return;
    }
    if (!email || !validator.isEmail(email)) {
      setError(true);
      setErrorMessage("Email should be valid");
      return;
    }
    if (!password || password.length < 6) {
      setError(true);
      setErrorMessage("Password length should be at least 6 characters");
      return;
    }
    try {
      const res = await axios.post(URL + "/api/auth/register", {
        username,
        email,
        password,
      });
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
      setError(false);
      navigate("/login");
    } catch (err) {
      if (err.response.status) {
        setError(true);
        setErrorMessage("Email is already registered");
      }
    }
  };

  return (
    <>
      <div className="w-full flex justify-center items-center h-[80vh] register-container">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[30%] register-outer">
          <h1 className="text-xl font-bold text-left">Create an account</h1>
          <input
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border-2 border-black outline-0"
            type="text"
            placeholder="Enter your username"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border-2 border-black outline-0"
            type="email"
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
            onClick={handleRegister}
            style={{ backgroundColor: "#0f387a" }}
            className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black btnlogin"
          >
            Register
          </button>
          {error && <h3 className="text-red-500 text-sm ">{errormessage}</h3>}
          <div className="flex justify-center items-center space-x-3">
            <p>Already have an account?</p>
            <p className="text-gray-500 hover:text-black">
              <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
