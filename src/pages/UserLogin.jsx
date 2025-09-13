import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { setuser } = React.useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        userData
      );

      if (response.status === 200) {
        const data = response.data;
        setuser(data.user);
        localStorage.setItem("token", data.token);

        toast.success("Login successful! 🎉");
        navigate("/home");
      }

      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Invalid email or password!");
    }
  };

  return (
    <div className="flex flex-col justify-between h-screen ">
      <div className="ml-3 items-left">
        <img
          className="h-15 w-20 pt-5"
          src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
          alt="Uber Logo"
        />
      </div>

      <div className="flex flex-col items-center justify-between flex-1 mt-5">
        <form
          onSubmit={submitHandler}
          className="flex flex-col items-left justify-between gap-3"
        >
          <h3 className="font-bold text-xl">What's your email</h3>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            className="bg-[#eeeeee] px-2 py-2 rounded mb-5 w-[330px]"
          />

          <h3 className="font-bold text-xl">Enter Password</h3>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="******"
            className="bg-[#eeeeee] px-2 py-2 rounded mb-5 w-[330px]"
          />

          <div className="flex items-center justify-center">
            <button className="bg-black text-white px-2 py-2 w-full rounded">
              Login
            </button>
          </div>
          <p className="text-[13px] mt-1 text-center">
            New here?{" "}
            <Link to="/signup" className="text-blue-500 cursor-pointer">
              Signup
            </Link>
          </p>
        </form>

        <Link
          to="/caption-login"
          className="bg-[#10b461] font-semibold px-2 py-2 rounded mb-5 text-white w-[330px] text-center"
        >
          Sign in as Caption
        </Link>
      </div>

      {/* Toast notifications */}
      {/* <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      /> */}
    </div>
  );
};

export default UserLogin;
