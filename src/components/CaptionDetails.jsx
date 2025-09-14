import React, { useContext } from "react";
import { IoMdTime } from "react-icons/io";
import { PiNotepadLight } from "react-icons/pi";
import { SlSpeedometer } from "react-icons/sl";
import { CaptionDataContext } from "../context/CaptionContext";

const CaptionDetails = ({ setcaptionDetsPanal }) => {
  const { caption } = useContext(CaptionDataContext);

  return (
    <>
      {/* Driver Info */}
      <div>
        <div className="flex gap-3 items-center mt-5">
          <img
            className="w-10 h-10 object-cover rounded-full"
            src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?q=80&w=2070&auto=format&fit=crop"
            alt="Driver Profile"
          />
          <div className="flex justify-between w-full">
            <div>
              <h2 className="text-[15px] font-semibold">
                {caption?.fullname?.firstname || "Driver"}{" "}
                {caption?.fullname?.lastname}
              </h2>
              <h4 className="text-xs text-zinc-500">
                {caption?.vehicle?.plate || "MH00XX0000"}
              </h4>
            </div>
            <div className="flex flex-col justify-end">
              <h2 className="text-[15px] font-semibold">
                ₹{caption?.earnings || 0}
              </h2>
              <h4 className="text-xs text-zinc-500 text-end">EARNED</h4>
            </div>
          </div>
        </div>

        {/* Stats Box */}
        <div className="w-full h-32 rounded-xl mt-5 bg-[#e5c55b] flex justify-between p-6">
          {/* Time Online */}
          <div className="flex flex-col justify-center items-center gap-1">
            <IoMdTime className="text-3xl text-zinc-700" />
            <h3 className="font-semibold">{caption?.hoursOnline}</h3>
            <p className="text-[10px] uppercase text-zinc-700">Hours Online</p>
          </div>

          {/* Distance */}
          <div className="flex flex-col justify-center items-center gap-1">
            <SlSpeedometer className="text-3xl text-zinc-700" />
            <h3 className="font-semibold">{caption?.totalDistance}</h3>
            <p className="text-[10px] uppercase text-zinc-700">
              Total Distance
            </p>
          </div>

          {/* Earnings */}
          <div className="flex flex-col justify-center items-center gap-1">
            <PiNotepadLight className="text-3xl text-zinc-700" />
            <h3 className="font-semibold">{caption?.jobs}</h3>
            <p className="text-[10px] uppercase text-zinc-700">Total JOBS</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CaptionDetails;
