import React from "react";
import { BsChevronCompactDown } from "react-icons/bs";
import ubergo from "../assets/ConfirmUberGo1.jpg";
import auto from "../assets/auto.png";
import moto from "../assets/moto.png";
import { FaLocationDot } from "react-icons/fa6";
import { FaDotCircle } from "react-icons/fa";
import { TbSquareDotFilled } from "react-icons/tb";
import { TbCoinRupeeFilled } from "react-icons/tb";

const ConfirmRide = (props) => {
  return (
    <div>
      <div
        className="absolute cursor-pointer right-10 top-3 text-2xl"
        onClick={() => {
          props.setconfirmRidePanal(false);
          //   props.setlookingForVehicle(false);
        }}
      >
        <BsChevronCompactDown />
      </div>

      <h3 className="font-semibold flex text-center items-center justify-center text-1xl select-none">
        Confirm your Ride
      </h3>

      <div className="w-full mt-[12px] h-0.5 border-1 border-zinc-300"></div>

      {/* UberGo */}
      <div className="flex w-full flex-col  gap-4 rounded-lg active:border-black p-3 items-center justify-center cursor-pointer">
        {/* <img className="w-50 h-30 object-contain" src={ubergo} alt="UberGo" /> */}

        {props.vehicleType === "car" ? (
          <img className="w-50 h-30 object-contain" src={ubergo} alt="UberGo" />
        ) : props.vehicleType === "moto" ? (
          <img className="w-50 h-30 object-contain" src={moto} alt="Moto" />
        ) : (
          <img className="w-50 h-30 object-contain" src={auto} alt="Auto" />
        )}

        {/* <div className="w-full border-zinc-500 flex left-0 text-zinc-400" >_____________________________________</div> */}
        <div className="w-full mt-[12px] h-0.5 border-1 border-zinc-300"></div>

        <div className="w-full ">
          <div className="flex gap-4 items-center ml-1">
            <FaDotCircle />
            <div>
              <h2 className="font-semibold text-lg">{props.pickup}</h2>
              {/* <p className="text-zinc-800">{props.pickup}</p> */}
            </div>
          </div>
          <div className="w-full mt-[12px] h-0.5 border-1 border-zinc-300"></div>

          <div className="flex gap-4 items-center ml-1 mt-3">
            <TbSquareDotFilled />
            <div>
              <h2 className="font-semibold text-lg">{props.destination}</h2>
              {/* <p className="text-zinc-800 leading-tight">
                Near ambazari lake, Futala road, Nagpur.
              </p> */}
            </div>
          </div>

          <div className="w-full mt-[12px] h-0.5 border-1 border-zinc-300"></div>
          <div className="ml-1 flex gap-4 items-center mt-3">
            <TbCoinRupeeFilled />
            <div>
              <h2 className="font-bold text-lg">
                ₹{props.fare[props.vehicleType]}
              </h2>
              <p className="text-zinc-800 leading-tight">Cash</p>
            </div>
          </div>
          {/* <div className="w-full mt-[12px] h-0.5 border-1 border-zinc-300"></div> */}

          <div className="w-full mt-5">
            <button
              onClick={() => {
                props.setlookingForDriver(true);
                props.setconfirmRidePanal(false);
                props.createRide();
              }}
              className="bg-green-500 text-white rounded-md px-3 w-full py-2"
            >
              Confirm Ride
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRide;
