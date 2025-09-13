import React, { useContext, useEffect, useState } from "react";
import { CaptionDataContext } from "../context/CaptionContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CaptionProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { caption, setcaption } = useContext(CaptionDataContext);

  useEffect(() => {
    if (!token) {
      navigate("/caption-login");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/captions/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then((response) => {
        if (response.status === 200) {
          setcaption(response.data);
          setIsLoading(false);
        }
      })

      .catch((err) => {
        console.log("Caption fetch error:", err);
        localStorage.removeItem("token");
        navigate("/caption-login");
      });
  }, [token, navigate, setcaption]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default CaptionProtectedWrapper;
