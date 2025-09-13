import React, { useRef, useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import map from "../assets/map.jpg";
import { FaChevronUp } from "react-icons/fa6";
import FinishRide from "../components/FinishRide";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const CaptionRiding = () => {
  const [finishRidePanal, setFinishRidePanal] = useState(false);
  const finishRidePanalRef = useRef(null);
  const location = useLocation();
  const rideData = location.state?.ride;

  console.log("rideData:" + rideData);

  useGSAP(() => {
    if (finishRidePanal) {
      gsap.to(finishRidePanalRef.current, {
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(finishRidePanalRef.current, {
        y: "100%",
        duration: 0.5,
        ease: "power2.in",
      });
    }
  }, [finishRidePanal]);
  return (
    <div className="h-screen relative">
      {/* Uber Logo */}
      <img
        className="h-16 w-14 pt-5 ml-4 absolute top-0 left-0 z-10"
        src="https://pngimg.com/d/uber_PNG24.png"
        alt="Uber Logo"
      />

      {/* Map */}
      <div className="w-full h-[80%]">
        <img src={map} alt="Map" className="w-full h-full object-cover" />
      </div>

      {/* Logout Button */}
      <Link
        to="/caption-logout"
        className="absolute top-5 right-5 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
      >
        <IoIosLogOut className="text-2xl text-black" />
      </Link>

      {/* Bottom Panel */}
      <div
        onClick={() => {
          setFinishRidePanal(true);
        }}
        className="w-full min-h-[20%] flex flex-col gap-3 items-center bg-amber-300 rounded-t-2xl shadow-lg p-4"
      >
        {/* Chevron */}
        <div className="cursor-pointer text-2xl">
          <FaChevronUp />
        </div>

        {/* Ride finish */}
        <div className="flex justify-between items-center w-full">
          <h3 className="font-bold text-xl">4 Km away</h3>

          <button className="bg-green-600 text-white rounded-md px-4 py-2">
            Complete Ride
          </button>
        </div>
      </div>

      <div
        ref={finishRidePanalRef}
        className="w-full h-[60%] fixed bottom-0 z-20 translate-y-full"
      >
        <FinishRide ride={rideData} setFinishRidePanal={setFinishRidePanal} />
      </div>
    </div>
  );
};

export default CaptionRiding;
