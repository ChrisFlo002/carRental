// Dashboard.jsx
import React, { useContext, useEffect, useState } from "react";
import "./dashboard.scss";
import Sidebar from "../../../components/Sidebar/sidebar.jsx";
import Header from "../../../components/Topbar/topbar.jsx";
import { AuthContext } from "../../../context/authContext.jsx";
import axios from "axios";
import PaymentsChart from "../../../components/PaymentChart/paymentChart.jsx";

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState("October");
  const [dashboardData, setDashboardData] = useState({
    totalUser: 0,
    totalBookings: 0,
    totalSales: 0,
    totalConfirmed: 0,
    bookings: [],
    payements: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);
  //fetch all the datas for the dashboard
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        //fetch all the clients
        const response1 = await axios.get(
          "http://localhost:5000/api/v1/clients/",
          { headers: { Authorization: `Bearer ${currentUser.token}` } }
        );
        console.log("Clients: ", response1.data.data);
        //fetch all the bookings
        const response2 = await axios.get(
          "http://localhost:5000/api/v1/bookings/",
          { headers: { Authorization: `Bearer ${currentUser.token}` } }
        );
        console.log("Bookings: ", response2.data.data);
        //fetch all the cars
        const response3 = await axios.get(
          "http://localhost:5000/api/v1/cars/",
          { headers: { Authorization: `Bearer ${currentUser.token}` } }
        );
        console.log("Cars: ", response3.data.data);
        //fetch all the payments
        const response4 = await axios.get(
          "http://localhost:5000/api/v1/payments/",
          { headers: { Authorization: `Bearer ${currentUser.token}` } }
        );
        console.log("Payments: ", response4.data.data);
        //set the dashboard data
        setDashboardData({
          totalUser: response1.data.data.length,
          totalBookings: response2.data.data.length,
          totalSales: response4.data.data.reduce(
            (total, payment) => total + payment.amount,
            0
          ),
          totalConfirmed: response2.data.data.filter(
            (booking) => booking.bookingStatus === "Confirmed"
          ).length,
          bookings: response2.data.data,
          payements: response4.data.data,
        });
      } catch (error) {
        alert("Error fetching data");
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <Header />
        <div className="dashboard-content">
          <h1 className="page-title">Dashboard</h1>

          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <>
              <div className="stat-cards">
                <div className="stat-card">
                  <div className="stat-info">
                    <div className="stat-label">Total Clients</div>
                    <div className="stat-value">{dashboardData.totalUser}</div>
                  </div>
                  <div className="stat-icon user-icon"></div>
                </div>

                <div className="stat-card">
                  <div className="stat-info">
                    <div className="stat-label">Total Bookings</div>
                    <div className="stat-value">
                      {dashboardData.totalBookings}
                    </div>
                  </div>
                  <div className="stat-icon order-icon"></div>
                </div>

                <div className="stat-card">
                  <div className="stat-info">
                    <div className="stat-label">Total Amount</div>
                    <div className="stat-value">
                      $ {dashboardData.totalSales}
                    </div>
                  </div>
                  <div className="stat-icon sales-icon"></div>
                </div>

                <div className="stat-card">
                  <div className="stat-info">
                    <div className="stat-label">Total Bookings Confirmed</div>
                    <div className="stat-value">
                      {dashboardData.totalConfirmed}
                    </div>
                  </div>
                  <div className="stat-icon pending-icon"></div>
                </div>
              </div>
              <div className="revenue-section">
                <div className="section-header">
                  <h2>Revenue</h2>
                  {/*<div className="dropdown">
                    <button className="dropdown-toggle">{selectedMonth}</button>
                  </div>*/}
                </div>

                <div className="revenue-chart">
                  {/* This would be replaced with an actual chart component like Chart.js or Recharts */}
                  <div className="chart-placeholder">
                    <div className="area-chart">
                      <PaymentsChart
                        data={dashboardData.payements.map((b) => ({
                          amount: b.amount,
                          date: b.datePayment,
                        }))}
                      />
                    </div>
                    {/*<div className="chart-legend">
                      <div className="legend-item">
                        <span className="legend-color sales"></span>
                        <span>Sales</span>
                      </div>
                      <div className="legend-item">
                        <span className="legend-color profit"></span>
                        <span>Date</span>
                      </div>
                    </div>*/}
                  </div>
                </div>
              </div>
              <div className="deals-section">
                <div className="section-header">
                  <h2>5 Latest Booking Details</h2>
                </div>

                <div className="bookings-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Car </th>
                        <th>Client</th>
                        <th>Payment ID</th>
                        <th>Date</th>
                        <th>With Driver</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData.bookings.length > 0
                        ? dashboardData.bookings.slice(0, 5).map((booking) => (
                            <tr key={booking._id}>
                              <td>
                                <div className="product-cell">
                                  <div className="product-image">
                                    <img
                                      src={booking.car.images[0]}
                                      alt={booking.car.plate}
                                      className="img"
                                    />
                                  </div>
                                  <div>
                                    {booking.car.brand}
                                    {booking.plate}
                                  </div>
                                </div>
                              </td>
                              <td>{booking.client.names}</td>
                              <td>{booking.paymentDetails._id}</td>
                              <td>
                                {booking.dateBooking} - {booking.returnDate}
                              </td>
                              <td>{booking.driver ? "Yes" : "No"}</td>
                              <td>$ {booking.priceBooking}</td>
                              <td>
                                <span
                                  className={`status-badge ${booking.bookingStatus}`}
                                >
                                  {booking.bookingStatus}
                                </span>
                              </td>
                            </tr>
                          ))
                        : <tr>
                        <td colSpan="yourColumnSpan">No bookings found</td>
                      </tr>}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
