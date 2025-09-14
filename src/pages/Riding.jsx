import React, { useEffect, useContext } from "react";
import map from "../assets/map.jpg";
import { HiHome } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ubergo from "../assets/uberGo.png";
import { FaDotCircle } from "react-icons/fa";
import { TbSquareDotFilled, TbCoinRupeeFilled } from "react-icons/tb";
import { SocketContext } from "../context/SocketContext";
import LiveTracking from "../components/LiveTracking";

const Riding = () => {
  const location = useLocation();
  const { ride } = location.state || {};

  const { socket } = useContext(SocketContext);

  const navigate = useNavigate();

  // ✅ put socket listener inside useEffect with cleanup
  useEffect(() => {
    if (!socket) return;

    const handleRideEnded = () => {
      navigate("/home");
    };

    socket.on("ride-ended", handleRideEnded);

    return () => {
      socket.off("ride-ended", handleRideEnded);
    };
  }, [socket, navigate]);

  return (
    <div className="h-screen w-full relative overflow-hidden">
      {/* Uber Logo */}
      <img
        className="h-16 w-20 pt-5 ml-3 absolute top-0 left-0 z-10"
        src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
        alt="Uber Logo"
      />

      {/* Home Button */}
      <Link
        to="/home"
        className="absolute top-5 right-5 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
      >
        <HiHome className="text-2xl text-black" />
      </Link>

      {/* Map */}
      <div className="w-full h-screen">
        {/* <img src={map} alt="Map" className="w-full h-full object-cover" /> */}
        <LiveTracking/>
      </div>

      {/* Ride Info Panel */}
      <div className="bg-white rounded-t-2xl shadow-lg absolute bottom-0 left-0 w-full p-4">
        {/* Driver & Car Info */}
        <div className="flex flex-col gap-4 p-3">
          <div className="flex w-full justify-between items-center">
            <div className="flex items-center">
              <img
                className="w-14 h-14 object-cover rounded-full"
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop"
                alt="Driver Profile"
              />
              <img
                className="w-24 h-16 object-contain -ml-6"
                src={ubergo}
                alt="UberGo"
              />
            </div>
            <div className="flex flex-col items-end">
              <h3 className="text-sm">
                {ride?.caption.fullname.firstname +
                  " " +
                  ride?.caption.fullname.lastname}
              </h3>
              <h2 className="font-bold text-lg">
                {ride?.caption.vehicle.plate}
              </h2>
              <h4 className="text-xs text-gray-600">Tata Nexon Smart CNG</h4>
            </div>
          </div>

          <div className="w-full border border-zinc-300"></div>

          {/* Pickup */}
          <div className="flex gap-4 items-start">
            <FaDotCircle className="text-green-600 mt-1" />
            <div>
              <h2 className="font-bold text-lg">{ride?.pickup}</h2>
            </div>
          </div>

          <div className="w-full border border-zinc-300"></div>

          {/* Drop Location */}
          <div className="flex gap-4 items-start">
            <TbSquareDotFilled className="text-red-600 mt-1" />
            <div>
              <h2 className="font-bold text-lg">{ride?.destination}</h2>
            </div>
          </div>

          <div className="w-full border border-zinc-300"></div>

          {/* Fare */}
          <div className="flex gap-4 items-start">
            <TbCoinRupeeFilled className="text-yellow-600 mt-1" />
            <div>
              <h2 className="font-bold text-lg">₹{ride?.fare}</h2>
              <p className="text-gray-600 leading-tight">Cash</p>
            </div>
          </div>

          <button className="bg-green-500 text-white rounded-md px-3 w-full py-2">
            Make a payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Riding;
