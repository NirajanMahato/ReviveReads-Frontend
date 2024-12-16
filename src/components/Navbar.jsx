import React, { useEffect, useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { LuSearch } from "react-icons/lu";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo1 from "/Logos/Logo1.png";
import logo2 from "/Logos/Logo2.png";
import { products } from "/src/dummyData/dummyBooks";
import axios from "axios";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [isSearchBoxVisible, setIsSearchBoxVisible] = useState(false);
  const [userInfo, setUserInfo] = useState(""); // State to hold user info

  // Access authentication state from Redux store
  const { isAuthenticated } = useSelector((state) => state.auth);
  const authenticateToken = localStorage.getItem("token");

  // Fetch user info from backend if authenticated
  useEffect(() => {
    const fetchUserInfo = async () => {
      const userId = localStorage.getItem("id"); // Get user ID from localStorage
      if (userId && authenticateToken) { // Ensure both userId and token exist
        try {
          const response = await axios.get("http://localhost:5000/user/get-user-info", {
            headers: {
              id: userId, // Send userId in the headers
              Authorization: `Bearer ${authenticateToken}`, // Send token in the headers
            },
          });
          console.log("User data:", response.data);
          setUserInfo(response.data); // Set user info to state
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      }
    };
  
    if (isAuthenticated) {
      fetchUserInfo(); // Fetch user info when logged in
    }
  }, [isAuthenticated]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredBooks = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-full">
      <div className="mx-auto flex max-w-7xl items-center justify-between md:px-8 sm:px-6 px-4 py-4">
        <div className="inline-flex items-center space-x-2 lg:w-3/12">
          <button>
            <img
              src={logo2}
              className={"lg:w-36 lg:block hidden"}
              alt={"logo"}
            />
          </button>
          <button>
            <img
              src={logo1}
              className={"lg:hidden md:w-14 w-10"}
              alt={"logo"}
            />
          </button>
        </div>
        <div className="md:flex grow items-center justify-between lg:w-10/12">
          <div className="flex items-center justify-end w-full lg:pr-8 pr-2">
            <div
              className={
                "lg:w-64 md:w-40 w-36 h-[39px] flex items-center justify-between rounded-lg px-2     bg-gray-200"
              }
            >
              <input
                type={"search"}
                placeholder={"Search Book"}
                className={"w-full lg:pl-4 md:pl-2 bg-transparent text-center"}
                value={search}
                onChange={handleSearchChange}
                onFocus={() => setIsSearchBoxVisible(true)}
                onBlur={() => setIsSearchBoxVisible(false)}
              />
              <span
                className={
                  "animate-pulse search-span text-xl text-gray-600 cursor-pointer"
                }
              >
                <LuSearch />
              </span>
            </div>
          </div>
          <div className="md:flex hidden items-center">
            <button className="ml-5">
              <IoNotificationsOutline className="text-2xl text-gray-600 hover:text-black" />
            </button>
            <span className="border-l-2 border-gray-400 rounded-full h-7 ml-2"></span>

            {/* Conditionally render Sign Up or User Info */}
            <UserMenu userInfo={userInfo} />
          </div>
        </div>
      </div>

      {/* Search suggestions box */}
      {isSearchBoxVisible && search && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg z-50 rounded-b-lg">
          <ul>
            {filteredBooks.map((book) => (
              <li
                key={book.id}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer font-gilroyMedium text-gray-700"
              >
                {book.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
