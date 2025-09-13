import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CaptionLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const captionLogout = async () => {
      const token = localStorage.getItem("token");

      try {
        await axios.post(`${import.meta.env.VITE_BASE_URL}/captions/logout`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("Logout failed:", error);
      } finally {
        // Always clear token & redirect
        localStorage.removeItem("token");
        navigate("/caption-login");
      }
    };

    captionLogout();
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default CaptionLogout;
