import React, { useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { LuSearch } from "react-icons/lu";
import { Link } from "react-router-dom";
import logo1 from "/Logos/Logo1.png";
import logo2 from "/Logos/Logo2.png";
import { products } from "/src/dummyData/dummyBooks";

const menuItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Bookmarks",
    href: "skills",
  },
  {
    name: "About us",
    href: "projects",
  },
];

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [isSearchBoxVisible, setIsSearchBoxVisible] = useState(false);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredBooks = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-full">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 md:px-8">
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
          <div className="flex items-center justify-between w-full lg:pr-8 pr-2">
            <ul className="inline-flex space-x-8">
              {/* {menuItems.map((item) => (
                                <li key={item.name}>
                                    <Link to={item.href} spy={true} smooth={true} offset={-80} duration={700} className="lg:text-lg text-base font-gilroyMedium text-gray-500 hover:text-gray-800 hover:border-b-2 cursor-pointer">
                                        {item.name}
                                    </Link>
                                </li>
                            ))} */}
            </ul>
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
            <Link to={"/Login"}>
              <button className="ml-3 bg-black text-white lg:text-sm text-xs font-gilroyMedium w-20 py-[6px] rounded-lg border-[1.8px] border-black hover:bg-white hover:text-black shadow-md transition-all duration-300">
                Sign up
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Search suggestions box */}
      {isSearchBoxVisible && search && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg z-50 rounded-b-lg">
          <ul>
            {filteredBooks.map(book => (
              <li key={book.id} className="px-4 py-2 hover:bg-gray-200 cursor-pointer font-gilroyMedium text-gray-700">
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
