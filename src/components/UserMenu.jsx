import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import { MdLogout } from "react-icons/md";
import { RiAccountCircleLine } from "react-icons/ri";

const UserMenu = ({ userInfo }) => {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const handleLogout = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setShowMenu(false);
    window.location.reload();
    navigate("/");
  };

  const handleClickOutside = (event) => {
    // Close the menu if clicked outside of the menu or button
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      !buttonRef.current.contains(event.target)
    ) {
      setShowMenu(false);
    }
  };

  // Close menu on outside click
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {userInfo && userInfo.name ? (
        <button
          ref={buttonRef}
          className="flex items-center mx-3 focus:outline-none"
          onClick={() => setShowMenu((prev) => !prev)} // Toggle on click
          onMouseEnter={() => setShowMenu(true)}  // Show menu on hover
          onMouseLeave={() => !showMenu && setShowMenu(false)} // Hide on hover out if not clicked
          aria-haspopup="true"
          aria-expanded={showMenu}
        >
          <img
            src={
              userInfo?.avatar
                ? `http://localhost:5000/product_images/${userInfo.avatar}`
                : 'http://localhost:5000/product_images/default_avatar.png'
            }
            alt={userInfo.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="ml-2 text-sm text-gray-700 font-gilroyMedium">
            {userInfo.name.split(" ")[0]}
          </span>
        </button>
      ) : (
        <Link to="/login">
          <button className="ml-3 bg-black text-white lg:text-sm text-xs font-gilroyMedium w-20 py-[6px] rounded-lg border-[1.8px] border-black hover:bg-white hover:text-black shadow-md transition-all duration-300">
            Sign In
          </button>
        </Link>
      )}

      {/* Dropdown Menu */}
      {showMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <div className="p-2 text-gray-800">
            <p className="text-lg mb-2 font-gilroyMedium">{userInfo.name}</p>
            <hr className="border-gray-300" />
            <Link
              to="/profile"
              className="flex items-center px-2 py-2 hover:bg-gray-100 rounded-lg transition-all duration-200"
              onClick={() => setShowMenu(false)}  // Close menu when clicked
            >
              <RiAccountCircleLine className="mr-1 text-xl"/>
              Visit Profile
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center text-left px-3 py-2 text-red-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              <MdLogout className="mr-1 text-lg"/>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
