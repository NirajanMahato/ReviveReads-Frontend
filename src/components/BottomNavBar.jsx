import React, { useState } from "react";
import { GoHome } from "react-icons/go";
import { IoPersonCircleOutline } from "react-icons/io5";
import { LuSearch } from "react-icons/lu";
import { RiMessage3Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const BottomNavBar = () => {
  const [active, setActive] = useState("home"); // Track the active tab

  const handleClick = (tab) => {
    setActive(tab);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full h-16 bg-white text-black shadow-md z-50 md:hidden pt-1 border-t-[0.1px] border-gray-300">
      <div className="flex justify-around items-center py-2 text-gray-600">
        <Link to={"/"}>
          <button
            className={`flex flex-col items-center $`}
            onClick={() => handleClick("home")}
          >
            <GoHome
              className={`text-2xl ${active === "home" ? "text-black" : ""}`}
            />
          </button>
        </Link>

        <Link to={"/Search"}>
          <button
            className={"flex flex-col items-center"}
            onClick={() => handleClick("search")}
          >
            <LuSearch
              className={`text-2xl ${active === "search" ? "text-black" : ""}`}
            />
          </button>
        </Link>

        <button
          className={`flex flex-col items-center ${
            active === "add" ? "text-black" : ""
          }`}
          onClick={() => handleClick("add")}
        >
          <RiMessage3Line className="text-2xl" />
        </button>

        <Link to={"/Login"}>
          <button
            className={`flex flex-col items-center ${
              active === "profile" ? "text-black" : ""
            }`}
            onClick={() => handleClick("profile")}
          >
            <IoPersonCircleOutline className="text-2xl" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BottomNavBar;
