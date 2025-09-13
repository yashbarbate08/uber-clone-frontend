import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptionDataContext } from "../context/CaptionContext";


const CaptionLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { setcaption } = useContext(CaptionDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captions/login`,
        loginData
      );

      if (response.status === 200) {
        const data = response.data;

        // Save caption object from backend
        setcaption(data.caption || data.user);

        // Save token in localStorage
        localStorage.setItem("token", data.token);

        navigate("/caption-home");
      }
    } catch (err) {
      let msg =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.msg ||
        "Login failed. Try again.";
      setErrorMessage(msg);
    }

    // Clear fields
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <div className="flex flex-col justify-between h-screen ">
        <div className="ml-6 items-left">
          <img
            className="pt-5"
            src="https://pngimg.com/d/uber_PNG24.png"
            alt="Uber Logo"
            style={{ height: "80px", width: "auto" }}
          />
        </div>

        <div className="flex flex-col items-center justify-between flex-1 mt-5 ">
          <form
            onSubmit={submitHandler}
            className="flex flex-col items-left justify-between gap-3"
          >
            <h3 className="font-bold text-xl">What's our Caption's email</h3>
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

            {/* Error Message */}
            {errorMessage && (
              <p className="text-red-500 text-sm text-center">{errorMessage}</p>
            )}

            <div className="flex items-center justify-center">
              <button className="bg-black text-white px-2 py-2 w-full rounded">
                Login
              </button>
            </div>

            <p className="text-[13px] mt-5 text-center">
              Join a fleet?{" "}
              <Link
                to="/caption-singup"
                className="text-blue-500 cursor-pointer"
              >
                Register as Caption
              </Link>
            </p>
          </form>

          <Link
            to="/login"
            className="bg-[#d5622d] font-semibold px-2 py-2 rounded mb-5 text-white w-[330px] text-center"
          >
            Sign in as a User
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CaptionLogin;
