import { useContext, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import BottomNavBar from "../../../components/BottomNavBar";
import Navbar from "../../../components/Navbar";
import { UserContext } from "../../../context/UserContext";
import AdPostsCard from "./AdPostsCard";
import AnalyticsCard from "./AnalyticsCard";
import EditProfile from "./EditProfile";
import SaveListsCard from "./SaveListsCard";

const UserProfile = () => {
  const { userInfo, loading } = useContext(UserContext);

  const formatMemberSince = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const [activeTab, setActiveTab] = useState("adPosts");
  const [isEditing, setIsEditing] = useState(false);

  const tabs = [
    {
      id: "adPosts",
      label: "Ad Posts",
      component: <AdPostsCard userId={userInfo?._id} />,
    },
    { id: "analytics", label: "Analytics", component: <AnalyticsCard /> },
    { id: "saveLists", label: "Save Lists", component: <SaveListsCard /> },
  ];

  const toggleEditProfile = () => {
    setIsEditing(!isEditing); // Toggle between edit and view mode
  };

  const closeEditProfile = () => {
    setIsEditing(false); // Close the edit view
  };

  return (
    <div className="mx-auto max-w-[1300px]">
      <Navbar />
      <div className="md:px-8 px-2 lg:mt-0 md:mt-6 pb-20 md:flex gap-4 font-gilroyMedium">
        {isEditing ? (
          <EditProfile onClose={closeEditProfile} /> // Show EditProfile when in edit mode
        ) : (
          <div className="md:w-1/4 w-full md:h-96 flex flex-col items-center rounded-lg md:shadow p-6">
            <div className="md:w-24 md:h-24 w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <img
                src={
                  userInfo?.avatar
                    ? `http://localhost:5000/product_images/${userInfo.avatar}`
                    : "http://localhost:5000/product_images/default_avatar.png"
                }
                alt="user"
                className="md:w-24 md:h-24 w-20 h-20 object-cover rounded-full"
              />
            </div>
            <h2 className="text-xl font-semibold">{userInfo?.name}</h2>
            <p className="text-gray-500 font-gilroyLight text-sm">
              {userInfo?.email}
            </p>
            <div className="flex items-center mt-2">
              <FaLocationDot className="text-gray-400 mr-2" />
              <span className="text-gray-500">
                {userInfo?.address || "N/A"}
              </span>
            </div>

            <div className="border-t mt-3 pt-2">
              <p className="text-sm text-gray-500">
                Member since: {formatMemberSince(userInfo?.createdAt)}
              </p>
            </div>
            <button
              onClick={toggleEditProfile}
              className="rounded-lg mt-4 bg-gray-800 w-full bg-custom text-white py-2 font-medium"
            >
              Edit Profile
            </button>
          </div>
        )}

        <div className="md:w-3/4 shadow rounded-lg pb-4">
          <div className="border-b">
            <ul className="xl:w-2/5 lg:w-3/5 flex items-center justify-between md:px-6 px-3 py-4 font-gilroy">
              {tabs.map((tab) => (
                <li
                  key={tab.id}
                  className={`cursor-pointer border rounded-3xl px-3 py-1 ${
                    activeTab === tab.id
                      ? "font-semibold text-white bg-gray-700 shadow-md"
                      : "border-gray-500"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:px-6 px-4 py-4">
            {tabs.find((tab) => tab.id === activeTab)?.component}
          </div>
        </div>
      </div>
      <BottomNavBar />
    </div>
  );
};

export default UserProfile;
