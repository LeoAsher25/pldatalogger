import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  console.log("main layout");
  return (
    <div>
      <h1>Header</h1>
      <Outlet />
    </div>
  );
};

export default MainLayout;
