import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Postdetails from "./pages/Postdetails";
import CreatePost from "./pages/Createpost";
import EditPost from "./pages/EditPost";
import Profile from "./pages/Profile";
import { UserContextProvider } from "./context/Usercontext";

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/write" element={<CreatePost />} />
          <Route exact path="/posts/post/:id" element={<Postdetails />} />
          <Route exact path="/edit/:id" element={<EditPost />} />
          <Route exact path="/profile/:id" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
