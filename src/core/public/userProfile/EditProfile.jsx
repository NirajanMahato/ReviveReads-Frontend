import React, { useContext } from "react";
import { RxCross2 } from "react-icons/rx";
import { UserContext } from "../../../context/UserContext";

const EditProfile = ({ onClose }) => {
  const { userInfo } = useContext(UserContext);

  return (
    <div className="md:w-1/4 w-full flex flex-col rounded-lg md:shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Edit Profile</h2>
        <button
          onClick={onClose} // Trigger the function passed as a prop to close the edit view
          className="text-gray-500 hover:text-gray-700 text-xl"
        >
          <RxCross2 />
        </button>
      </div>
      <div className="flex items-center mb-6">
        <div className="relative w-24 h-24">
          <img src={userInfo?.avatar} alt="user" />
          <button className="absolute bottom-3 right-3 w-5 h-5 flex items-center justify-center bg-gray-700 text-white p-1 rounded-full">
            <span className="text-sm">+</span>
          </button>
        </div>
        <p className="ml-4 text-gray-500">Your profile is incomplete.</p>
      </div>

      <form className="space-y-4 w-full">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            placeholder="Address"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition duration-200"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
