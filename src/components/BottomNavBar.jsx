import React, { useContext, useState } from "react";
import { GoHome } from "react-icons/go";
import { IoNotificationsOutline, IoPersonCircleOutline } from "react-icons/io5";
import { RiMessage3Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNotifications } from "../context/NotificationContext";
import { UserContext } from "../context/UserContext";

const BottomNavBar = () => {
  const [active, setActive] = useState("home"); // Track the active tab
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { unreadCount } = useNotifications();
  const { userInfo } = useContext(UserContext);

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

        <Link to={"/notifications"}>
          <button
            className={"flex relative flex-col items-center"}
            onClick={() => handleClick("notifications")}
          >
            <IoNotificationsOutline
              className={`text-2xl ${active === "notifications" ? "text-black" : ""}`}
            />
            {userInfo && unreadCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-400 text-white text-[8px] w-3 h-3 flex items-center justify-center rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
        </Link>
        <Link to={"/messages"}>
          <button
            className={`flex flex-col items-center ${
              active === "messages" ? "text-black" : ""
            }`}
            onClick={() => handleClick("messages")}
          >
            <RiMessage3Line className="text-2xl" />
          </button>
        </Link>

        <Link to={isAuthenticated ? "/Profile" : "/Login"}>
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
