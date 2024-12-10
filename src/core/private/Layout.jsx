import React from "react";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Sidebar />
      This is Admin Layout
      <div style={{ flexGrow: 1 }}>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
