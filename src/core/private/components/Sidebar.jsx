import React, { useContext, createContext, useState } from "react";
import { MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
import { FiHome, FiSettings, FiUser } from "react-icons/fi";
import logo2 from "/Logos/Logo2.png";

const SidebarContext = createContext();

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);

  const sidebarItems = [
    { id: 1, icon: <FiHome />, label: "Dashboard", active: true },
    { id: 2, icon: <FiUser />, label: "Users", active: false },
    { id: 3, icon: <FiSettings />, label: "Settings", active: false },
  ];

  return (
    <aside className={`h-screen transition-all duration-300 ${expanded ? "w-60" : "w-16"}`}>
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        {/* Logo Section */}
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src={logo2}
            className={`overflow-hidden transition-all duration-300 ${expanded ? "w-32" : "w-0"}`}
            alt="ReviveReads"
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700"
          >
            {expanded ? <ChevronLeft /> : <ChevronRight />}
          </button>
        </div>

        {/* Sidebar Items */}
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-2">
            {sidebarItems.map((item) => (
              <SidebarItem
                key={item.id}
                icon={item.icon}
                text={item.label}
                active={item.active}
              />
            ))}
          </ul>
        </SidebarContext.Provider>

        {/* Profile Section */}
        <div className="border-t flex p-3 items-center">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt="Profile"
            className="w-10 h-10 rounded-md"
          />
          <div className={`overflow-hidden transition-all duration-300 ${expanded ? "w-52 ml-3" : "w-0"}`}>
            <div className="leading-4">
              <h4 className="font-semibold">Nirajan Mahato</h4>
              <span className="text-xs text-gray-600">nirajanmahato44@gmail.com</span>
            </div>
          </div>
          
          {/* <MoreVertical size={20} className={`${expanded ? "ml-2" : "ml-0"}`} /> */}
        </div>
      </nav>
    </aside>
  );
}

function SidebarItem({ icon, text, active }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 font-gilroyMedium"
            : "hover:bg-indigo-50 text-gray-600"
        }
      `}
    >
      <span className="text-2xl">{icon}</span>
      <span className={`overflow-hidden transition-all duration-300 ${expanded ? "w-32 ml-3" : "w-0"}`}>
        {text}
      </span>

      {/* Tooltip for collapsed state */}
      {!expanded && (
        <div
          className={`
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-indigo-100 text-indigo-800 text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
          `}
        >
          {text}
        </div>
      )}
    </li>
  );
}
