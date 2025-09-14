import React, { useState, useRef, useContext, useEffect } from "react";
import map from "../assets/map.jpg";
import { BsChevronCompactDown } from "react-icons/bs";
import { FaDotCircle } from "react-icons/fa";
import { TbSquareDotFilled } from "react-icons/tb";
// import { IoIosLogOut } from "react-icons/tb";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LocationSearchPanal from "../components/LocationSearchPanal";
import VehicalPanal from "../components/VehicalPanal";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";

import { SocketContext } from "../context/SocketContext";
import LiveTracking from "../components/LiveTracking";
import { IoIosLogOut } from "react-icons/io";

const Home = () => {
  const [showPanel, setShowPanel] = useState(false);
  const [vehiclePanal, setvehiclePanal] = useState(false);
  const [confirmRidePanal, setconfirmRidePanal] = useState(false);
  const [lookingForDriver, setlookingForDriver] = useState(false);
  const [waitingForDriver, setwaitingForDriver] = useState(false);

  const panalRef = useRef(null);
  const closeRef = useRef(null);
  const searchRef = useRef(null);
  const vehiclePanalRef = useRef(null);
  const confirmRideRef = useRef(null);
  const lookingForDriverRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const [locationDets, setlocationDets] = useState({});

  const [pickup, setpickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setride] = useState(null);

  const { socket } = useContext(SocketContext);

  const { user, setuser } = useContext(UserDataContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log("Frontend socket connected:", socket.id); // 👈 add this
  //   socket.emit("join", { userId: user._id, userType: "user" });
  // }, [user, socket]);

  useEffect(() => {
    if (!socket || !user?._id) return;

    // console.log("Frontend socket connected:", socket.id);

    socket.emit("join", {
      userId: user._id,
      userType: "user",
    });
  }, [socket, user]);

  socket.on("ride-confirmed", (ride) => {
    // console.log("Ride confirmed:");
    setwaitingForDriver(true);
    setlookingForDriver(false);
    setride(ride);
  });

  socket.on("ride-started", (ride) => {
    // console.log("Ride started:");
    setwaitingForDriver(false);
    setride(ride);
    navigate("/riding", { state: { ride } });
  });

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const handlePickupChange = async (e) => {
    setpickup(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestion`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPickupSuggestions(response.data);
    } catch {
      // handle error
      console.log("Error fetching pickup suggestions");
    }
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestion`,
        {
          params: { input: e.target.value },
          // params: { input: val },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDestinationSuggestions(response.data);
    } catch {
      // handle error
      console.log("Error fetching destination suggestions");
    }
  };

  async function findTrip() {
    setShowPanel(false);
    setvehiclePanal(true);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
        {
          params: { pickup, destination },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // console.log(response.data.fare);

      setFare(response.data.fare);

      // setlocationDets(response.data.fare);
    } catch (error) {
      console.log(error);
    }
  }

  async function createRide() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        { pickup, destination, vehicleType },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // console.log(response.data);

      // setlocationDets(response.data.ride);
    } catch (error) {
      console.log(error);
    }
  }

  // Animate bottom panel + close/search btn
  useGSAP(() => {
    gsap.to(panalRef.current, {
      height: showPanel ? "60%" : "0%",
      duration: 0.5,
      ease: "power2.inOut",
    });

    gsap.to([closeRef.current, searchRef.current], {
      opacity: showPanel ? 1 : 0,
      scale: showPanel ? 1 : 0.8,
      duration: 0.3,
      pointerEvents: showPanel ? "auto" : "none",
    });
  }, [showPanel]);

  // Animate vehicle panel
  useGSAP(() => {
    if (vehiclePanal) {
      gsap.to(vehiclePanalRef.current, {
        // y: vehiclePanal ? 0 : "100%",
        transform: "translateY(0)",
        duration: 0.5,
        ease: "power2.inOut",
      });
    } else {
      gsap.to(vehiclePanalRef.current, {
        // y: vehiclePanal ? 0 : "100%",
        transform: "translateY(100%)",
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
  }, [vehiclePanal]);

  // Animate confirm ride vehicle panel
  useGSAP(() => {
    if (confirmRidePanal) {
      gsap.to(confirmRideRef.current, {
        // y: vehiclePanal ? 0 : "100%",
        transform: "translateY(0)",
        duration: 0.5,
        ease: "power2.inOut",
      });
    } else {
      gsap.to(confirmRideRef.current, {
        // y: vehiclePanal ? 0 : "100%",
        transform: "translateY(100%)",
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
  }, [confirmRidePanal]);

  // looking for driver
  useGSAP(() => {
    if (lookingForDriver) {
      gsap.to(lookingForDriverRef.current, {
        // y: vehiclePanal ? 0 : "100%",
        transform: "translateY(0)",
        duration: 0.5,
        ease: "power2.inOut",
      });
    } else {
      gsap.to(lookingForDriverRef.current, {
        // y: vehiclePanal ? 0 : "100%",
        transform: "translateY(100%)",
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
  }, [lookingForDriver]);

  // waiting for driver
  useGSAP(() => {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        // y: vehiclePanal ? 0 : "100%",
        transform: "translateY(0)",
        duration: 0.5,
        ease: "power2.inOut",
      });
    } else {
      gsap.to(waitingForDriverRef.current, {
        // y: vehiclePanal ? 0 : "100%",
        transform: "translateY(100%)",
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
  }, [waitingForDriver]);

  // *******

  // console.log(user.fullname.firstname);
  return (
    <div className="h-screen relative overflow-hidden">
      {/* Uber Logo */}

      <img
        className="h-16 w-20 pt-5 ml-3 absolute"
        src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
        alt="Uber Logo"
      />

      {/* Map */}
      <div className="w-full h-screen">
        {/* <img src={map} alt="Map" className="w-full h-full object-cover" /> */}
        <LiveTracking />
      </div>

      <Link
        to="/user/logout"
        className="absolute top-5 right-5 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
      >
        <IoIosLogOut className="text-2xl text-black" />
      </Link>

      {/* Bottom section */}
      <div className="flex flex-col h-screen justify-end absolute top-0 w-full">
        {/* Top white card */}
        <div className="bg-white w-full h-[30%] pt-5 px-5 pb-1 rounded-t-3xl flex flex-col relative">
          {/* close btn (chevron down) */}
          <div
            ref={closeRef}
            className="absolute right-5 top-5 text-3xl cursor-pointer opacity-0 scale-0 transition-all"
            onClick={() => setShowPanel(false)}
          >
            <BsChevronCompactDown />
          </div>

          {/* form */}
          <form onSubmit={submitHandler}>
            <h4 className="text-2xl mb-3">Find a trip</h4>

            {/* Connector line */}
            <div className="line bg-gray-800 rounded-full mt-[28.5px] absolute h-9 ml-4.5 w-1"></div>

            {/* Pickup input */}
            <div className="relative">
              <FaDotCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700" />
              <input
                onClick={() => {
                  setShowPanel(true);

                  setActiveField("pickup");
                }}
                value={pickup}
                onChange={handlePickupChange}
                className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full"
                type="text"
                placeholder="Add a pick-up location"
                required
              />
            </div>

            {/* Drop input */}
            <div className="relative mt-3">
              <TbSquareDotFilled className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700" />
              <input
                onClick={() => {
                  setShowPanel(true);
                  setActiveField("destination");
                }}
                value={destination}
                onChange={handleDestinationChange}
                className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3"
                type="text"
                placeholder="Enter your destination"
                required
              />
            </div>

            {/* Search button */}
            <button
              onClick={() => findTrip()}
              ref={searchRef}
              type="submit"
              className="mt-2 w-full opacity-0 bg-black text-white font-semibold py-2 rounded-lg shadow-md"
            >
              Find a Trip
            </button>
          </form>
        </div>

        {/* Expanding search panel */}
        <div ref={panalRef} className="bg-white h-0">
          <LocationSearchPanal
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
            activeField={activeField}
            setpickup={setpickup}
            setDestination={setDestination}
            setShowPanel={setShowPanel}
            setvehiclePanal={setvehiclePanal}
            closeRef={closeRef}
          />
        </div>

        {/* Choose Vehicle Panel */}
        <div
          ref={vehiclePanalRef}
          className="bg-white w-full rounded-t-3xl px-6 py-3 fixed bottom-0 flex gap-5 flex-col mb-5 z-10 translate-y-full"
        >
          <VehicalPanal
            setvehiclePanal={setvehiclePanal}
            setconfirmRidePanal={setconfirmRidePanal}
            fare={fare}
            setVehicleType={setVehicleType} // ✅ ensure this is passed
          />
        </div>

        {/* Confirm Vehicle Ride */}
        <div
          ref={confirmRideRef}
          className="bg-white w-full rounded-t-3xl px-6 py-3 fixed bottom-0 flex gap-5 flex-col mb-5 z-10 translate-y-full"
        >
          <ConfirmRide
            createRide={createRide}
            fare={fare}
            pickup={pickup}
            destination={destination}
            vehicleType={vehicleType}
            setconfirmRidePanal={setconfirmRidePanal}
            setlookingForDriver={setlookingForDriver}
          />
        </div>

        {/* looking for driver */}
        <div
          ref={lookingForDriverRef}
          className="bg-white w-full rounded-t-3xl px-6 py-3 fixed bottom-0 flex gap-5 flex-col mb-5 z-10 translate-y-full"
        >
          <LookingForDriver
            fare={fare}
            pickup={pickup}
            destination={destination}
            vehicleType={vehicleType}
            setlookingForDriver={setlookingForDriver}
            setconfirmRidePanal={setconfirmRidePanal}
          />
        </div>

        {/* waiting for driver */}
        <div
          ref={waitingForDriverRef}
          className="bg-white w-full rounded-t-3xl px-6 py-3 fixed bottom-0 flex gap-5 flex-col mb-5 z-10 translate-y-full"
        >
          <WaitingForDriver
            setwaitingForDriver={setwaitingForDriver}
            setlookingForDriver={setconfirmRidePanal}
            ride={ride}
            // setlookingForDriver={setlookingForDriver}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

