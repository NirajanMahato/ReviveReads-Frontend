import React from "react";
import { LuSearch } from "react-icons/lu";
import notAvailable from "/BG/notAvailable.svg"

const AdPostsCard = () => {
  return (
    <>
      <div className="font-gilroy">
        <div className={"md:w-10/12 w-11/12 py-2 border-solid border rounded-lg border-gray-500 mt-6 flex items-center justify-between p-4"}>
          <input type={"Text"} placeholder={"Search Books"} className="w-full"/>
          <span className={"text-2xl text-gray-600 cursor-pointer"}>
            <LuSearch />
          </span>
        </div>
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-center">
            <img
              src={notAvailable}
              alt="No Ads Available"
              className="w-40 mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold">No Ads Available</h2>
            <p className="text-gray-500 mb-4">
              Start selling by posting your first ad
            </p>
            <button className="bg-gray-800 text-white px-4 py-2 rounded-md">
              Post New Ad
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdPostsCard;

