import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { GoClockFill } from "react-icons/go";
import { MdLocalShipping, MdOutlineBookmarkAdd } from "react-icons/md";
import { RiMessage3Line } from "react-icons/ri";
import Navbar from "../../../components/Navbar";

const ProductDetails = () => {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <>
      <Navbar />
      <div className="flex md:px-8 px-6 lg:mt-3 md:mt-3 mt-10 pb-6">
        <div className="w-1/3">
          <div className="flex justify-center rounded-lg  py-8">
            <img
              src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcStgMdaLms8GEoheBM4iutawr2UqbOOwu9z2RVLOrhqC2UZJsAn"
              alt="book"
              className="rounded-lg object-cover w-80 h-96"
            />
          </div>
          <div className="flex justify-start gap-3 pl-10">
            <img
              src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcStgMdaLms8GEoheBM4iutawr2UqbOOwu9z2RVLOrhqC2UZJsAn"
              alt="book"
              className="rounded-lg object-cover w-16 h-16"
            />
            <img
              src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcStgMdaLms8GEoheBM4iutawr2UqbOOwu9z2RVLOrhqC2UZJsAn"
              alt="book"
              className="rounded-lg object-cover w-16 h-16"
            />
            <img
              src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcStgMdaLms8GEoheBM4iutawr2UqbOOwu9z2RVLOrhqC2UZJsAn"
              alt="book"
              className="rounded-lg object-cover w-16 h-16"
            />
          </div>
        </div>
        <div className="w-2/3 pl-8 pr-2">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              The Great Gatsby (First Edition)
            </h1>
            <h1 className="text-xl font-gilroyMedium text-gray-500 mt-1 pl-1">
              रू. 200
            </h1>
          </div>

          <div className="border-t border-b border-gray-200 py-3 my-3">
            <div className="flex items-center space-x-4">
              <img
                className="h-12 w-12 rounded-full"
                src="https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
                alt="Seller profile"
              />
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Sold by <b>Nirajan Mahato</b>
                </h3>

                <p className="text-xs text-gray-500">
                  Member since 2019 • Kalopul, Kathmandu
                </p>
              </div>
            </div>
          </div>

          <div className="">
            <h2 className="text-xl font-gilroySemiBold text-gray-900">
              Book Details
            </h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 font-gilroyMedium mt-1">
              <div>
                <p className="text-sm text-gray-500">Condition</p>
                <p className="text-sm font-medium text-gray-900">Very Good</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Format</p>
                <p className="text-sm font-medium text-gray-900">Hardcover</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Publication Year</p>
                <p className="text-sm font-medium text-gray-900">1925</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">ISBN</p>
                <p className="text-sm font-medium text-gray-900">
                  978-0743273565
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Pages</p>
                <p className="text-sm font-medium text-gray-900">180</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Publisher</p>
                <p className="text-sm font-medium text-gray-900">
                  Charles Scribner's Sons
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 mt-6 lg:pr-14">
            <button className="rounded-lg shadow-lg flex items-center justify-center w-1/2 bg-black text-white py-3">
              <MdOutlineBookmarkAdd className="md:text-xl  mr-1" />
              Save
            </button>
            <button className="rounded-lg shadow-lg flex items-center justify-center w-1/2 bg-green-600 text-white py-3">
              <RiMessage3Line className="md:text-xl  mr-1" />
              Chat Now
            </button>
          </div>

          <div className="text-sm mt-3 font-gilroyMedium text-gray-500">
            <span className="flex items-center">
              <GoClockFill />
              <h1 className="pl-1">Posted 2 days ago</h1>
            </span>
            <span className="flex items-center">
              <MdLocalShipping />
              <h1 className="pl-1">
                Shipping: रू. 60 • Delivery in 1-3 business days
              </h1>
            </span>
          </div>

          <div className="flex border-b mt-4 mb-4">
            <button
              onClick={() => setActiveTab("description")}
              className={`mr-4 pb-2 text-lg font-gilroyMedium ${
                activeTab === "description"
                  ? "text-gray-900 font-gilroySemiBold border-b-2 border-gray-900"
                  : "text-gray-700 border-b-2 border-transparent"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("location")}
              className={`pb-2 text-lg font-gilroyMedium ${
                activeTab === "location"
                  ? "text-gray-900 font-gilroySemiBold border-b-2 border-gray-900"
                  : "text-gray-700 border-b-2 border-transparent"
              }`}
            >
              Location
            </button>
          </div>

          {activeTab === "description" && (
            <div className="p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600">
                First edition, first printing of F. Scott Fitzgerald's
                masterpiece. Book is in very good condition with minimal wear to
                the corners and spine. Original dust jacket is not present.
                Pages are clean with no markings or annotations. A beautiful
                copy of this classic American novel.
              </p>
            </div>
          )}

          {activeTab === "location" && (
            <div className="p-6 rounded-lg border border-gray-200">
              <div className="relative h-48 rounded-lg overflow-hidden">
                <img
                  src="https://ai-public.creatie.ai/gen_page/map_placeholder_1280x720.png"
                  alt="Location Map"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                <div className="absolute flex items-center bottom-4 left-4 bg-white px-3 py-1 rounded-full text-sm">
                  <FaLocationDot className="mr-1" />
                  Kathmandu, Nepal (2.5 KM away)
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
