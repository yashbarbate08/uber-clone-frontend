import React, { useRef, useState, useContext } from "react";
import axios from "axios";

import map from "../assets/map.jpg";
import { IoIosLogOut } from "react-icons/io";
import { Link } from "react-router-dom";
import CaptionDetails from "../components/CaptionDetails";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { CaptionDataContext } from "../context/CaptionContext";
import { SocketContext } from "../context/SocketContext";
import { useEffect } from "react";
import LiveTracking from "../components/LiveTracking";

const CaptionHome = () => {
  const [captionDetsPanal, setcaptionDetsPanal] = useState(true);
  const [ridePopUpPanal, setridePopUpPanal] = useState(false);
  const [confirmRidePopUpPanal, setconfirmRidePopUpPanal] = useState(false);
  const [ride, setride] = useState(null);

  const captionDetsRef = useRef(null);
  const ridePopUpPanalRef = useRef(null);
  const confirmRidePopUpPanalRef = useRef(null);

  const { caption, setcaption } = useContext(CaptionDataContext);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.emit("join", { userId: caption._id, userType: "caption" });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          // console.log({
          //   userId: caption._id,
          //   location: {
          //     ltd: position.coords.latitude,
          //     lng: position.coords.longitude,
          //   },
          // });
          socket.emit("update-location-captain", {
            userId: caption._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();

    // return () => clearInterval(locationInterval)
  }, []);

  socket.on("new-ride", (data) => {
    console.log("New ride request received:", data);
    setride(data);
    setridePopUpPanal(true);
  });

  // async function confirmRide() {
  //   // socket.emit("confirm-ride", { rideId: ride._id, userId: caption._id });

  //   try {
  //     const response = await axios.post(
  //     `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
  //     {
  //       rideId: ride._id,
  //       userId: caption._id,
  //     }
  //     );
  //     // Optionally handle response, e.g. show success or update state
  //     console.log("Ride confirmed:", response.data);
  //   } catch (error) {
  //     console.error("Error confirming ride:", error);
  //     // Optionally show error to user
  //   }

  //   setridePopUpPanal(false);
  //   setconfirmRidePopUpPanal(true);
  // }

  // console.log("Current Ride:", ride);
  // Ride popup animation
  async function confirmRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
      {
        rideId: ride._id,
        captainId: caption._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setridePopUpPanal(false);
    setconfirmRidePopUpPanal(true);
  }

  useGSAP(() => {
    if (ridePopUpPanal) {
      gsap.to(ridePopUpPanalRef.current, {
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(ridePopUpPanalRef.current, {
        y: "100%",
        duration: 0.5,
        ease: "power2.in",
      });
    }
  }, [ridePopUpPanal]);

  // Caption details panel animation
  useGSAP(() => {
    if (captionDetsPanal) {
      gsap.to(captionDetsRef.current, {
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(captionDetsRef.current, {
        y: "100%",
        duration: 0.5,
        ease: "power2.in",
      });
    }
  }, [captionDetsPanal]);

  useGSAP(() => {
    if (confirmRidePopUpPanal) {
      gsap.to(confirmRidePopUpPanalRef.current, {
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(confirmRidePopUpPanalRef.current, {
        y: "100%",
        duration: 0.5,
        ease: "power2.in",
      });
    }
  }, [confirmRidePopUpPanal]);

  return (
    <div className="h-screen relative overflow-hidden">
      {/* Uber Logo */}
      <img
        className="h-16 w-14 pt-5 ml-4 absolute top-10 left-0 z-10"
        src="https://pngimg.com/d/uber_PNG24.png"
        alt="Uber Logo"
      />

      {/* Map */}
      <div className="w-full h-screen">
        {/* <img src={map} alt="Map" className="w-full h-full object-cover" /> */}
        <LiveTracking/>
      </div>

      {/* Logout Button */}
      <Link
        to="/caption-logout"
        className="absolute top-5 right-5 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
      >
        <IoIosLogOut className="text-2xl text-black" />
      </Link>

      {/* Bottom Panel (Caption Details) */}
      <div
        ref={captionDetsRef}
        className="bg-white w-full rounded-t-3xl px-6 py-3 fixed bottom-0 flex flex-col gap-5 z-10 shadow-lg translate-y-full"
      >
        <CaptionDetails
          caption={caption}
          setcaptionDetsPanal={setcaptionDetsPanal}
        />
        <button
          onClick={() => {
            setridePopUpPanal(true);
            setcaptionDetsPanal(false);
          }}
          className="bg-yellow-400 text-black font-semibold px-6 py-2 rounded-lg shadow hover:bg-yellow-500 transition"
        >
          Show Ride Request
        </button>
      </div>

      {/* Ride PopUp Panel */}
      <div
        ref={ridePopUpPanalRef}
        className="w-full fixed bottom-0 z-20 translate-y-full"
      >
        <RidePopUp
          // onClose={() => setridePopUpPanal(false)}
          setridePopUpPanal={setridePopUpPanal}
          setcaptionDetsPanal={setcaptionDetsPanal}
          setconfirmRidePopUpPanal={setconfirmRidePopUpPanal}
          ride={ride}
          confirmRide={confirmRide}
        />
      </div>

      {/* Confirm Ride PopUp Panel */}
      <div
        ref={confirmRidePopUpPanalRef}
        className="w-full h-[70%] fixed bottom-0 z-20 translate-y-full"
      >
        <ConfirmRidePopUp
          // onClose={() => setridePopUpPanal(false)}
          setridePopUpPanal={setridePopUpPanal}
          setcaptionDetsPanal={setcaptionDetsPanal}
          setconfirmRidePopUpPanal={setconfirmRidePopUpPanal}
          ride={ride}
        />
      </div>
    </div>
  );
};

export default CaptionHome;
