import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";

const UserMenu = ({ userInfo }) => {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setShowMenu(false);
    window.location.reload();
    navigate("/");
  };

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {userInfo && userInfo.name ? (
        <button
          className="flex items-center mx-3 focus:outline-none"
          onClick={toggleMenu}
          aria-haspopup="true"
          aria-expanded={showMenu}
        >
          <img
            src={userInfo.avatar || "/default-avatar.png"}
            alt={userInfo.name}
            className="w-8 h-8 rounded-full"
          />
          <span className="ml-2 text-sm text-gray-700 font-gilroyMedium">
            {userInfo.name.split(" ")[0]}
          </span>
        </button>
      ) : (
        <Link to="/login">
          <button className="ml-3 bg-black text-white lg:text-sm text-xs font-gilroyMedium w-20 py-[6px] rounded-lg border-[1.8px] border-black hover:bg-white hover:text-black shadow-md transition-all duration-300">
            Sign up
          </button>
        </Link>
      )}

      {/* Dropdown Menu */}
      {showMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <div className="p-2 text-gray-800 font-gilroyMedium">
            <p className="text-sm mb-2">{userInfo.name}</p>
            <hr className="border-gray-300" />
            <Link
              to="/profile"
              className="block px-3 py-2 hover:bg-gray-100 rounded-lg transition-all duration-200"
              onClick={() => setShowMenu(false)}
            >
              Visit Profile
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 text-red-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
