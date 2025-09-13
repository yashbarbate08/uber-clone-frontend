import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

const UserSignup = () => {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const { user, setuser } = useContext(UserDataContext);

  useEffect(() => {
    if (user?.email) {
      console.log("Updated user:", user);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const newUser = {
      fullname: { firstname, lastname },
      email,
      password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser
      );

      if (response.status === 201) {
        const data = response.data;
        console.log("Signup Response:", data);

        // use the values the user just filled
        setuser({
          fullname: {
            firstname,
            lastname,
          },
          email,
          password,
        });

        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        navigate("/home");
      }

      // clear input fields
      setfirstname("");
      setlastname("");
      setEmail("");
      setPassword("");
    } catch (error) {
      const msg = error.response?.data?.message || "Signup failed. Try again.";
      setErrorMessage(msg);
    }
  };

  // console.log("Signup Response:", response.data);
  // console.log("Profile Response:", data);

  return (
    <div className="flex flex-col justify-between h-screen p-5">
      <div className="items-left">
        <img
          className="h-15 w-20 pt-5"
          src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
          alt="Uber Logo"
        />
      </div>

      <div className="flex flex-col items-center justify-between flex-1 mt-5">
        <form
          onSubmit={submitHandler}
          className="flex flex-col items-left justify-between gap-3"
        >
          <div>
            <h3 className="font-base text-xl mb-2">What's your Name</h3>
            <div className="flex flex-row gap-3">
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

          <h3 className="font-base text-xl">What's your email</h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            placeholder="email@example.com"
            className="bg-[#eeeeee] px-2 py-2 rounded w-[330px]"
          />

          <h3 className="font-base text-xl">Enter Password</h3>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            placeholder="******"
            className="bg-[#eeeeee] px-2 py-2 rounded mb-5 w-[330px]"
          />

          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}

          <div className="flex items-center justify-center">
            <button className="bg-black text-white px-2 py-2 w-full rounded">
              Create account
            </button>
          </div>
          <p className="text-[13px] mt-1 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 cursor-pointer">
              Login
            </Link>
          </p>
        </form>

        <p className="text-xs text-gray-600 mt-2">
          By proceeding, you consent to get calls, WhatsApp or SMS messages,
          including by automated means, from <b>Uber</b> and its affiliates to
          the number provided.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
