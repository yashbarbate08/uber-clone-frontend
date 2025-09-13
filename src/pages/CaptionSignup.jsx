import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptionDataContext } from "../context/CaptionContext";
import axios from "axios";

const CaptionSignup = () => {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [color, setColor] = useState("");
  const [plate, setPlate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { caption, setcaption } = React.useContext(CaptionDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const newCaption = {
      fullname: { firstname, lastname },
      email,
      password,
      vehicle: {
        color,
        plate: plate.toUpperCase(),
        capacity: Number(capacity),
        vehicleType,
      },
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captions/register`,
        newCaption
      );

      if (response.status === 201) {
        const data = response.data;

        // ✅ update context with backend response or fallback to newCaption
        setcaption({
          fullname: {
            firstname,
            lastname,
          },
          email,
          password,
          vehicle: {
            color,
            plate: plate.toUpperCase(),
            capacity: Number(capacity),
            vehicleType,
          },
        });

        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        navigate("/caption-home");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Signup failed. Try again.";
      setErrorMessage(msg);
    }
  };

  // const submitHandler = async (e) => {
  //   e.preventDefault();

  //   const newCaption = {
  //     fullname: {
  //       firstname: firstname,
  //       lastname: lastname,
  //     },
  //     email: email,
  //     password: password,
  //     vehicle: {
  //       color: color,
  //       plate: plate,
  //       capacity: capacity,
  //       vehicleType: vehicleType,
  //     },
  //   };

  //   setcaption(newCaption);

  //   console.log(caption);
  //   try {
  //     const response = await axios.post(
  //       `${import.meta.env.VITE_BASE_URL}/captions/register`,
  //       newCaption
  //     );

  //     if (response.status === 201) {
  //       const data = response.data;

  //       // Save only caption object (not token)
  //       // setcaption(data.user);
  //       setcaption(data.caption || data.user);

  //       // Save token
  //       localStorage.setItem("token", data.token);

  //       navigate("/caption-home");
  //     }

  //     // Reset form
  //     setfirstname("");
  //     setlastname("");
  //     setEmail("");
  //     setPassword("");
  //     setColor("");
  //     setPlate("");
  //     setCapacity("");
  //     setVehicleType("");
  //   } catch (err) {
  //     const msg = err.response?.data?.message || "Signup failed. Try again.";
  //     setErrorMessage(msg);
  //   }
  // };

  return (
    <div className="flex flex-col justify-between h-screen p-5  ">
      <div className="ml-1 items-left mt-[-30px]">
        <img
          className="pt-5"
          src="https://pngimg.com/d/uber_PNG24.png"
          alt="Uber Logo"
          style={{ height: "80px", width: "auto" }}
        />
      </div>

      <div className="flex flex-col items-center justify-between flex-1 mt-5">
        <form onSubmit={submitHandler} className="flex flex-col gap-3">
          {/* Name */}
          <div>
            <h3 className="font-base text-xl mb-2">
              What's our Caption's Name
            </h3>
            <div className="flex gap-3">
              <input
                value={firstname}
                onChange={(e) => setfirstname(e.target.value)}
                type="text"
                required
                placeholder="First Name"
                className="bg-[#eeeeee] px-2 py-2 rounded w-1/2"
              />
              <input
                value={lastname}
                onChange={(e) => setlastname(e.target.value)}
                type="text"
                required
                placeholder="Last Name"
                className="bg-[#eeeeee] px-2 py-2 rounded w-1/2"
              />
            </div>
          </div>

          {/* Email */}
          <h3 className="font-base text-xl">What's our Caption's email</h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            placeholder="email@example.com"
            className="bg-[#eeeeee] px-2 py-2 rounded w-[330px]"
          />

          {/* Password */}
          <h3 className="font-base text-xl">Enter Password</h3>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            placeholder="******"
            className="bg-[#eeeeee] px-2 py-2 rounded mb-2 w-[330px]"
          />

          {/* Vehicle Section */}

          <h3 className="font-base text-xl">Vehicle Details</h3>
          <div className="flex gap-3">
            <input
              value={color}
              onChange={(e) => setColor(e.target.value)}
              type="text"
              required
              placeholder="Vehicle Color"
              className="bg-[#eeeeee] px-2 py-2 rounded w-1/2"
            />
            <input
              value={plate.toUpperCase()}
              onChange={(e) => setPlate(e.target.value)}
              type="text"
              required
              placeholder="Plate Number"
              className="bg-[#eeeeee] px-2 py-2 rounded w-1/2"
            />
          </div>

          <div className="flex gap-3">
            <input
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              type="number"
              required
              placeholder="Capacity"
              className="bg-[#eeeeee] px-2 py-2 rounded mb-5 w-1/2"
            />
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              required
              className="bg-[#eeeeee] px-2 py-2 rounded mb-5 w-1/2"
            >
              <option value="" disabled className="text-gray-400">
                Select Vehicle
              </option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="bike">Bike</option>
            </select>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}

          {/* Submit */}
          <button className="bg-black text-white px-2 py-2 w-full rounded">
            Register
          </button>

          <p className="text-[13px] mt-1 text-center">
            Already have an account?{" "}
            <Link to="/caption-login" className="text-blue-500 cursor-pointer">
              Login
            </Link>
          </p>
        </form>

        <p className="text-xs text-gray-600 mt-2 text-center">
          By proceeding, you consent to get calls, WhatsApp, or SMS messages,
          including by automated means, from <b>Uber</b> and its affiliates to
          the number provided.
        </p>
      </div>
    </div>
  );
};

export default CaptionSignup;
