import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../../context/authContext.jsx";

function AdminLayout() {
  // Use the useContext hook to get access to the current user
  const { currentUser } = useContext(AuthContext);
  
  const profile = !currentUser ? null : currentUser.profil;

  //verify if there is a user and a profile
  if (!currentUser && !profile) {
    console.log("no user");
    return <Navigate to="/admin" />;
  } else if (profile !== "admin") {
    console.log("not admin");
    return <Navigate to="/admin" />;
  }
  //otherwise continue with the next operations of navigation
  else {
    return <Outlet />;
  }
}

export default AdminLayout;
