import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

const Layout = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        This is Admin Layout
      </div>
      <div style={{ flexGrow: 1 }}>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
