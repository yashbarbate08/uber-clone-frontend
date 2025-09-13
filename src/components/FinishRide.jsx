import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FinishRide = (props) => {
  const navigate = useNavigate();

  // ✅ Function now inside component, so it has access to props & navigate
  async function endRide() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
        {
          rideId: props.ride._id, // request body
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {

        navigate("/caption-home");
      }
    } catch (error) {
      console.error(
        "Error ending ride:",
        error.response?.data || error.message
      );
    }
  }

  return (
    <div className="relative w-full h-full bg-white rounded-t-3xl shadow-xl p-7">
      {/* Title */}
      <h2 className="font-bold text-xl text-center mt-2">Finish this Ride</h2>

      {/* Rider Info */}
      <div className="flex justify-between items-center mt-6">
        <div className="flex items-center gap-3">
          <img
            src="https://randomuser.me/api/portraits/women/65.jpg"
            alt="profile"
            className="w-12 h-12 rounded-full object-cover border"
          />
          <div>
            <h3 className="text-base font-semibold">
              {props.ride?.user.fullname.firstname +
                " " +
                props.ride?.user.fullname.lastname}
            </h3>
            <div className="flex gap-2 mt-1">
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                ApplePay
              </span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                Discount
              </span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold">${props.ride?.fare}</p>
          <p className="text-xs text-gray-500">2.2 km</p>
        </div>
      </div>

      {/* Pickup */}
      <div className="mt-5">
        <p className="text-xs text-gray-400">PICK UP</p>
        <p className="text-sm font-medium">{props.ride?.pickup}</p>
      </div>

      {/* Drop Off */}
      <div className="mt-3">
        <p className="text-xs text-gray-400">DROP OFF</p>
        <p className="text-sm font-medium">{props.ride?.destination}</p>
      </div>

      {/* Action Button */}
      <div className="flex flex-col gap-4 mt-6">
        <button
          onClick={endRide}
          className="w-full px-6 py-3 rounded-lg bg-yellow-400 text-black font-semibold shadow-md text-center hover:bg-yellow-500 transition"
        >
          Finish the Ride
        </button>
      </div>
    </div>
  );
};

export default FinishRide;
