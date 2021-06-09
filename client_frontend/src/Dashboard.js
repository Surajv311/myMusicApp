import React from "react";
import Auth from "./Auth";

const Dashboard = ({ code }) => {
  const accessToken = Auth(code);
  return <div>{code}</div>;
};

export default Dashboard;
