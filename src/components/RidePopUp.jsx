// RidePopUp.jsx
import React from "react";
import { BsChevronCompactDown } from "react-icons/bs";
import { Link } from "react-router-dom";

const RidePopUp = (props) => {
  return (
    <div className="relative w-full bg-white rounded-2xl shadow-lg p-7 mb-2">
      {/* Drag Handle / Close Button */}
      <div
        className="absolute cursor-pointer flex justify-center items-center w-full top-2 left-0"
        onClick={() => {
          //   onClose();
          props.setridePopUpPanal(false);
          props.setcaptionDetsPanal(true);
        }}
      >
        <BsChevronCompactDown className="text-3xl text-gray-400 hover:text-black transition" />
      </div>

      {/* Content */}
      <div className="flex justify-between items-center mt-6">
        <div className="flex items-center gap-3">
          <img
            src="https://randomuser.me/api/portraits/women/65.jpg"
            alt="profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="text-sm font-semibold capitalize">
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
      <div className="mt-4">
        <p className="text-xs text-gray-400">PICK UP</p>
        <p className="text-sm font-medium capitalize">{props.ride?.pickup}</p>
      </div>

      {/* Drop Off */}
      <div className="mt-3">
        <p className="text-xs text-gray-400">DROP OFF</p>
        <p className="text-sm font-medium capitalize">
          {props.ride?.destination}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-5">
        <button
          onClick={() => {
            // onClose();
            props.setridePopUpPanal(false);
            props.setcaptionDetsPanal(true);
          }}
          className="px-6 py-2 rounded-lg bg-red-500 text-white font-medium shadow hover:bg-red-600 transition"
        >
          Ignore
        </button>
        <button
          onClick={() => {
            props.setridePopUpPanal(false);
            props.setcaptionDetsPanal(false);
            props.setconfirmRidePopUpPanal(true);
            props.confirmRide();
          }}
          className="px-6 py-2 rounded-lg bg-yellow-400 text-black font-semibold shadow hover:bg-yellow-500 transition"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default RidePopUp;
