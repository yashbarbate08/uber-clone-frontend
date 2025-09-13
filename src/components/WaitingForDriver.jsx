import React from "react";
import ubergo from "../assets/UberGo.png";
import { FaLocationDot } from "react-icons/fa6";
import { FaDotCircle } from "react-icons/fa";
import { TbSquareDotFilled } from "react-icons/tb";
import { TbCoinRupeeFilled } from "react-icons/tb";
import { BsChevronCompactDown } from "react-icons/bs";

const WaitingForDriver = (props) => {
  return (
    <div>
      <div>
        <div className="flex justify-between items-center mt-2">
          <h3 className="font-semibold flex text-center items-center justify-center text-1xl select-none">
            Meet at the pickup point
          </h3>
          <div className="flex flex-col items-center bg-zinc-800 text-white h-15 w-30 px-1 py-1 justify-center">
            <h2 className=" text-[20px]  ">{props.ride?.otp}</h2>
          
          </div>
        </div>

        <div className="w-full mt-[12px] h-0.5 border-1 border-zinc-300"></div>

        {/* UberGo */}
        <div className="flex w-full flex-col  gap-4 rounded-lg active:border-black p-3 items-center justify-center cursor-pointer">
          <div className="flex flex-row w-full justify-between items-center ">
            <div className="flex items-center">
              <img
                className="w-14 h-14 object-contain rounded-full"
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0"
                alt=""
              />
              <img
                className="w-24 h-16 object-contain -ml-6 bg-transparent" // negative margin to overlap
                src={ubergo}
                alt="UberGo"
              />
            </div>

            <div className="flex flex-col justify-center items-end w-full ">
              <h3 className="text-[14px] justify-end">
                {props.ride?.caption.fullname.firstname +
                  " " +
                  props.ride?.caption.fullname.lastname}
              </h3>
              <h2 className="font-bold text-[20px]">{props.ride?.caption.vehicle.plate}</h2>
              <h4 className="text-[10px]">OTP: {props.ride?.otp}</h4>
            </div>
          </div>
          <div className="w-full mt-[12px] h-0.5 border-1 border-zinc-300"></div>

          <div className="w-full ">
            <div className="flex gap-4 items-center ml-1">
              <FaDotCircle />
              <div>
                <h2 className="font-bold text-lg">{props.ride?.pickup}</h2>
              </div>
            </div>
            <div className="w-full mt-[12px] h-0.5 border-1 border-zinc-300"></div>

            <div className="flex gap-4 items-center ml-1 mt-3">
              <TbSquareDotFilled />
              <div>
                <h2 className="font-bold text-lg">{props.ride?.destination}</h2>
              </div>
            </div>

            <div className="w-full mt-[12px] h-0.5 border-1 border-zinc-300"></div>
            <div className="ml-1 flex gap-4 items-center mt-3">
              <TbCoinRupeeFilled />
              <div>
                <h2 className="font-bold text-lg">₹{props.ride?.fare}</h2>
                <p className="text-zinc-800 leading-tight">Cash</p>
              </div>
            </div>
            {/* <div className="w-full mt-[12px] h-0.5 border-1 border-zinc-300"></div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
