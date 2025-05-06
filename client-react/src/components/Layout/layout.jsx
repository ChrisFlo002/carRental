import React from "react";
import Router from "../../routes/Admin/Router/route.jsx";
import Sidebar from "../Sidebar/sidebar.jsx";
import Header from "../Topbar/topbar.jsx";
import './layout.scss'

const Layout = () => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main__layout">
        <Header userName="Jane Patrick" userRole="Admin" />

        <div className="content">
          <Router />
        </div>
      </div>
    </div>
  );
};

export default Layout;
