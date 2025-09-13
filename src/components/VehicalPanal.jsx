import React from "react";
import { BsChevronCompactDown } from "react-icons/bs";
import ubergo from "../assets/Ubergo.png";
import auto from "../assets/auto.png";
import moto from "../assets/moto.png";

const VehicalPanal = ({
  setvehiclePanal,
  setconfirmRidePanal,
  fare,
  setVehicleType, // ✅ destructured properly
}) => {
  return (
    <div>
      <div
        className="absolute cursor-pointer right-10 top-3 text-2xl"
        onClick={() => setvehiclePanal(false)}
      >
        <BsChevronCompactDown />
      </div>

      <h3 className="font-semibold flex text-center items-center justify-center text-1xl select-none">
        Choose a Vehicle
      </h3>

      <div className="w-full mt-[12px] h-0.5 border-1 border-zinc-300"></div>

      {/* UberGo */}
      <div
        onClick={() => {
          setconfirmRidePanal(true);
          setvehiclePanal(false);
          setVehicleType("car"); // ✅ works now
        }}
        className="flex gap-4 rounded-lg active:border-black p-3 items-center justify-between cursor-pointer"
      >
        <img className="w-20 h-16 object-contain" src={ubergo} alt="UberGo" />

        <div className="flex-1">
          <h4 className="font-bold text-[18px]">UberGo</h4>
          <h5 className="text-[15px] font-semibold">2 mins away</h5>
          <p className="text-[12px] text-gray-600">Affordable, comfort rides</p>
        </div>

        <h2 className="font-bold text-lg">₹{fare.car}</h2>
      </div>

      {/* Moto */}
      <div
        onClick={() => {
          setconfirmRidePanal(true);
          setvehiclePanal(false);
          setVehicleType("moto");
        }}
        className="flex gap-4 rounded-lg active:border-black p-3 items-center justify-between cursor-pointer"
      >
        <img className="w-20 h-16 object-contain" src={moto} alt="Moto" />

        <div className="flex-1">
          <h4 className="font-bold text-[18px] inline-block">Moto</h4>
          <h5 className="text-[15px] font-semibold">5 mins away</h5>
          <p className="text-[12px] text-gray-600">Affordable, comfort rides</p>
        </div>

        <h2 className="font-bold text-lg">₹{fare.moto}</h2>
      </div>

      {/* UberAuto */}
      <div
        onClick={() => {
          setconfirmRidePanal(true);
          setvehiclePanal(false);
          setVehicleType("auto");
        }}
        className="flex gap-4 rounded-lg active:border-black p-3 items-center justify-between cursor-pointer"
      >
        <img className="w-20 h-16 object-contain" src={auto} alt="UberAuto" />

        <div className="flex-1">
          <h4 className="font-bold text-[18px]">UberAuto</h4>
          <h5 className="text-[15px] font-semibold">3 mins away</h5>
          <p className="text-[12px] text-gray-600">Affordable, comfort rides</p>
        </div>

        <h2 className="font-bold text-lg">₹{fare.auto}</h2>
      </div>
    </div>
  );
};

export default VehicalPanal;
