import React from "react";
import { FiArrowRight } from "react-icons/fi";
import homeImg from "../assets/home.png";
import { Link } from "react-router-dom";


const Start = () => {
return (
    <div>
        <div
            className="h-screen w-full flex flex-col justify-between"
            style={{
                backgroundImage: `url(${homeImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="ml-3">
                <img
                    className="h-15 w-20 pt-5"
                    src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
                    alt=""
                    
                />
            </div>
            <div className="bg-white px-5 py-5 ">
                <h2 className="text-2xl ">Getting Started with Uber</h2>

                <Link to='/login' className="bg-black flex flex-row items-center justify-between text-white w-full px-2 py-3 rounded mt-5">
                    <span className="w-6" /> {/* Spacer to balance layout */}
                    
                    <span className="flex-1 text-center text-xl">Continue</span>
                    <span className="flex items-center mr-5 text-3xl">
                       <FiArrowRight />
                    </span>
                </Link>
            </div>
        </div>
    </div>
);
};

export default Start;
