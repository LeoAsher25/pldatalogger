import React from "react";
import { Link } from "react-router-dom";
import ERoutePath from "src/types/routes.enum";

const Dashboard = () => {
  return (
    <div>
      <h3>Dashboard</h3>
      <Link to={ERoutePath.HOME_PAGE}>Back to home</Link>
    </div>
  );
};

export default Dashboard;
