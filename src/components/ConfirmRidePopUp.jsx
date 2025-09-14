import React, { useState } from "react";
import { BsChevronCompactDown } from "react-icons/bs";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ConfirmRidePopUp = (props) => {
  const [OTP, setOTP] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // console.log("OTP submitted:", OTP);

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
      {
        params: {
          rideId: props.ride._id,
          otp: OTP,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status === 200) {
      // console.log("caption riding");
      // props.setconfirmRidePopUpPanal(false);
      // props.setridePopupPanel(false);
      navigate("/caption-riding", { state: { ride: props.ride } });
    }
  };

  return (
    <div className="relative w-full h-full bg-white rounded-t-3xl shadow-xl p-7">
      {/* Title */}
      <h2 className="font-bold text-xl text-center mt-2">
        Confirm this ride to start
      </h2>

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

      {/* Action Buttons */}
      <form
        onSubmit={(e) => {
          submitHandler(e);
        }}
      >
        <div className="flex flex-col gap-4 mt-6">
          <input
            value={OTP}
            onChange={(e) => setOTP(e.target.value)}
            required
            type="number"
            className="bg-[#eee] pl-10 pr-4 py-2 w-full font-mono rounded-md"
            placeholder="Enter OTP"
          />

          <button
            onClick={() => {
              props.setridePopUpPanal(false);
              props.setcaptionDetsPanal(false);
              props.setconfirmRidePopUpPanal(false);
            }}
            className="w-full px-6 py-3 rounded-lg bg-yellow-400 text-black font-semibold shadow-md text-center hover:bg-yellow-500 transition"
          >
            Accept & Start Ride
          </button>

          <button
            onClick={() => {
              props.setridePopUpPanal(false);
              props.setconfirmRidePopUpPanal(false);
              props.setcaptionDetsPanal(true);
            }}
            className="w-full px-6 py-3 rounded-lg bg-red-500 text-white font-medium shadow-md hover:bg-red-600 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConfirmRidePopUp;
