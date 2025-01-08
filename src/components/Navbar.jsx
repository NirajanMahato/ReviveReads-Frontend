import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { LuSearch } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import UserMenu from "./UserMenu";
import logo1 from "/Logos/Logo1.png";
import logo2 from "/Logos/Logo2.png";
import toast from "react-hot-toast";

const Navbar = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [isSearchBoxVisible, setIsSearchBoxVisible] = useState(false);

  // Access user info from context
  const { userInfo, loading } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const fetchbooks = async () => {
      try {
        const response = await axios.get("/api/book/get-approved-books");
        setProducts(response?.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchbooks();
  }, []);

  const filteredBooks = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  // Function to handle notification button click
  const handleNotificationClick = () => {
    if (!userInfo) {
      toast.error('Pleasr Login to continue')
    } else {
      navigate("/messages");
    }
  };

  return (
    <div className="relative w-full">
      <div className="mx-auto flex max-w-7xl items-center justify-between md:pl-8 sm:px-6 px-4 py-4">
        <div className="inline-flex items-center space-x-2 lg:w-3/12">
          <Link to={"/"}>
            <img
              src={logo2}
              className={"lg:w-36 lg:block hidden"}
              alt={"logo"}
            />
          </Link>
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
                "lg:w-64 md:w-40 w-36 h-[39px] flex items-center justify-between rounded-lg px-2 bg-gray-200"
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
                className={"animate-pulse text-xl text-gray-600 cursor-pointer"}
              >
                <LuSearch />
              </span>
            </div>
          </div>
          <div className="md:flex hidden items-center">
            <button onClick={handleNotificationClick} className="ml-5">
              <IoNotificationsOutline className="text-2xl text-gray-600 hover:text-black" />
            </button>
            <span className="border-l-2 border-gray-400 rounded-full h-7 ml-2"></span>

            {/* Conditionally render Sign Up or User Info */}
            {!loading && <UserMenu userInfo={userInfo} />}
          </div>
        </div>
      </div>

      {/* Search suggestions box */}
      {isSearchBoxVisible && search && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg z-50 rounded-b-lg">
          <ul>
            {filteredBooks.map((book) => (
              <li
                key={book._id}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer font-gilroyMedium text-gray-700"
              >
                <Link
                  to={`/products/${book._id}`}
                  onClick={() => setIsSearchBoxVisible(false)}
                  className="block w-full h-full"
                >
                  {book.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
