import React from "react";
import { FiHome, FiSettings, FiUser } from "react-icons/fi";
import logo2 from "/Logos/Logo2.png";

const Sidebar = () => {
  const sidebarItems = [
    { id: 1, icon: <FiHome />, label: "Dashboard" },
    { id: 2, icon: <FiUser />, label: "Users" },
    { id: 3, icon: <FiSettings />, label: "Settings" },
  ];

  return (
    <>
      <div className="main-div w-2/12 flex flex-col p-3 bg-blue-50 border-r-2 border-gray-400">
        <div className={"admin-logo"}>
          <img src={logo2} alt={"ReviveReads"} width={"140px"} />
        </div>
        <div className="mt-6 pl-4">
          <ul className="flex flex-col gap-y-5">
            {sidebarItems.map((item) => (
              <li
                key={item.id}
                className="flex items-start gap-x-1 text-gray-700 hover:cursor-pointer  "
              >
                <span className="text-2xl">{item.icon}</span>
                <h1 className="font-gilroyMedium text-xl">{item.label}</h1>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
