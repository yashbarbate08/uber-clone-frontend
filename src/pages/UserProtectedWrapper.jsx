

import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";

const UserProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isLoading, setisLoading] = useState(true);
  const { setuser } = useContext(UserDataContext);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.status === 200) {
          setuser(response.data);
          setisLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [token, navigate, setuser]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-black">
        <img
          src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
          alt="Uber Logo"
          className="w-40 animate-pulse"
        />
      </div>
    );
  }

  return <>{children}</>;
};

export default UserProtectedWrapper;
