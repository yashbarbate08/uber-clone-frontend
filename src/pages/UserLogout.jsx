import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const token = localStorage.getItem("token");

        await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("Logout failed:", error);
        navigate("/login"); // still redirect to login even if request fails
      } finally {
        // Remove token from localStorage
        localStorage.removeItem("token");

        // Redirect to login
        navigate("/login");
      }
    };

    logoutUser();
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default UserLogout;
