import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../Dashboard/usagetest.jsx";
import UsersContent from "../Users/usersContent.jsx";
import CarsContent from "../Cars/cars.jsx";

const Router = () => {
  return (
    <Routes>
      <Route path="/dash" element={<Dashboard />} />
      <Route path="/users" element={<UsersContent />} />
      <Route path="/cars" element={<CarsContent/>} />
    </Routes>
  );
};

export default Router;
