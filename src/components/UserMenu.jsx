import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
const UserMenu = () => {
  const { userInfo, logout } = useContext(UserContext);

  // Determine the profile link based on role
  const profileLink =
    userInfo?.role === "admin" ? "/admin/dashboard" : "/profile";

  return (
    <div className="relative">
      {/* Show user avatar and name */}
      {userInfo && userInfo.name ? (
        <div className="flex items-center mx-3 focus:outline-none cursor-pointer dropdown dropdown-hover dropdown-bottom dropdown-end">
          <img
            src={
              userInfo?.avatar
                ? `http://localhost:5000/product_images/${userInfo.avatar}`
                : "http://localhost:5000/product_images/default_avatar.png"
            }
            alt={userInfo.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="ml-2 text-sm text-gray-700 font-gilroyMedium">
            {userInfo.name.split(" ")[0]}
          </span>

          <div
            tabIndex={0}
            className="dropdown-content menu bg-gray-100 rounded-box z-[1] w-48 p-2 shadow font-gilroyMedium"
          >
            <p className="text-lg mb-2 font-gilroyMedium pl-3">
              {userInfo.name}
            </p>
            <hr className="border-gray-300" />
            <ul>
              <li>
                <Link to={profileLink}>
                  {userInfo.role === "admin"
                    ? "Admin Dashboard"
                    : "Visit Profile"}
                </Link>
              </li>
              <li onClick={logout} className="text-red-500">
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        // Sign-in button if not logged in
        <Link to="/login">
          <button className="ml-3 bg-black text-white lg:text-sm text-xs font-gilroyMedium w-20 py-[6px] rounded-lg border-[1.8px] border-black hover:bg-white hover:text-black shadow-md transition-all duration-300">
            Sign In
          </button>
        </Link>
      )}
    </div>
  );
};

export default UserMenu;
