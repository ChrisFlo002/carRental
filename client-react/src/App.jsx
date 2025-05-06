import React from "react";
import "./App.scss";
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./routes/Login/login.jsx";
import Signup from "./routes/Signup/signup.jsx";
import Homepage from "./routes/client/Homepage/homepage.jsx";
import DetailsPage from "./routes/client/details page/detailsPage.jsx";
import Dashboard from "./routes/Admin/Dashboard/dashboard.jsx";
import UsersContent from "./routes/Admin/Users/usersContent.jsx";
import CarsContent from "./routes/Admin/Cars/cars.jsx";
import BookingList from "./routes/Admin/Booking/bookingList.jsx";
import BranchList from "./routes/Admin/Branch/branch.jsx";
import Layout from "./routes/client/layout/layout.jsx";
import AdminLogin from "./routes/Admin/AdminLogin/adminLogin.jsx";
import AdminLayout from "./routes/Admin/Layout/adminLayout.jsx";
import Report from "./routes/Admin/Report/report.jsx";
import AddCar from "./routes/Admin/Cars/addCar/addCar.jsx";
import BranchAddForm from "./routes/Admin/Branch/newBranch/newBranch.jsx";
import AdminAddForm from "./routes/Admin/Users/NewUser/newUser.jsx";
import DetailsPageAdmin from "./routes/Admin/Cars/carsDetails/detailsAdmin.jsx";
import BookingListAgent from "./routes/Agent/bookingListAgent.jsx";
import LayoutDriver from "./routes/Driver/Layout/layoutDriver.jsx";
import MyBookingsPage from "./routes/Driver/booking page/mybookings.jsx";

function App() {
  const router = createBrowserRouter([
    //client routing
    {
      path: "/", //default
      element:<Homepage />,
    },
    {
      path: "details/:carId",
      element: <DetailsPage />,
    },
    {
      path: "/agent",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <BookingListAgent />,
        },
      ],
    },
    //for driver
    {
      path: "/driver",
      element: <LayoutDriver />,
      children: [
        {
          index: true,
          element: <MyBookingsPage />,
        },
      ],
    },

    ///for admin routing
    {
      path: "/admin",
      element: <AdminLogin />,
    },
    {
      path: "/dash",
      element: <AdminLayout />,
      children: [
        { index: true, element: <Dashboard /> },
        {
          path: "users",
          element: <UsersContent />,
        },
        {
          path: "cars",
          element: <CarsContent />,
        },
        {
          path: "bookingAdmin",
          element: <BookingList />,
        },
        {
          path: "branches",
          element: <BranchList />,
        },
        {
          path: "report",
          element: <Report />,
        },
        {
          path: "addCar",
          element: <AddCar/>,
        },
        {
          path:"addBranch",
          element: <BranchAddForm/>
        },
        {
          path:"newAdmin",
          element: <AdminAddForm/>
        },
        {
          path:"detailsAdmin/:carId",
          element: <DetailsPageAdmin/>
        }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
