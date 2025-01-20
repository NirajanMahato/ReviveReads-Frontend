import React, { useContext } from "react";
import { GoHome } from "react-icons/go";
import { IoNotificationsOutline, IoPersonCircleOutline } from "react-icons/io5";
import { RiMessage3Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useNotifications } from "../context/NotificationContext";
import { UserContext } from "../context/UserContext";

const BottomNavBar = () => {
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { unreadCount } = useNotifications();
  const { userInfo } = useContext(UserContext);

  // Navigation items configuration
  const navItems = [
    {
      path: "/",
      icon: GoHome,
      label: "Home",
      match: (path) => path === "/",
    },
    {
      path: "/notifications",
      icon: IoNotificationsOutline,
      label: "Notifications",
      match: (path) => path.startsWith("/notifications"),
      badge: userInfo && unreadCount > 0 ? unreadCount : null,
    },
    {
      path: "/messages",
      icon: RiMessage3Line,
      label: "Messages",
      match: (path) => path.startsWith("/messages"),
    },
    {
      path: isAuthenticated ? "/profile" : "/login",
      icon: IoPersonCircleOutline,
      label: "Profile",
      match: (path) => path === "/profile" || path === "/login",
    },
  ];

  // Helper function to check if item is active
  const isActive = (item) => item.match(location.pathname);

  return (
    <nav className="fixed bottom-0 left-0 w-full h-16 bg-white text-black shadow-md z-50 md:hidden">
      <div className="flex justify-around items-center h-full px-2">
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="relative flex flex-col items-center justify-center w-16 h-full"
          >
            <div
              className={`flex flex-col items-center transition-all duration-200 ${
                isActive(item) ? "transform -translate-y-1" : ""
              }`}
            >
              <item.icon
                className={`text-2xl transition-colors ${
                  isActive(item) ? "text-black" : "text-gray-500"
                }`}
              />
              <span
                className={`text-[10px] mt-0.5 transition-colors ${
                  isActive(item) ? "text-black" : "text-gray-500"
                }`}
              >
                {item.label}
              </span>
              {item.badge && (
                <span className="absolute -top-0.5 right-1 bg-red-400 text-white text-[8px] w-3 h-3 flex items-center justify-center rounded-full">
                  {item.badge}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavBar;
