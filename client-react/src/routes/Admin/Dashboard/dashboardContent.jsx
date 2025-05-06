import React, {useState} from "react";

export default function DashboardContent() {
  const [selectedMonth, setSelectedMonth] = useState("October");
  // Mock data for the dashboard
  const dashboardData = {
    totalUser: 40689,
    totalOrder: 10293,
    totalSales: "$89,000",
    totalPending: 2040,
    deals: [
      {
        id: 1,
        product: "Apple Watch",
        location: "6096 Mariposa Landing",
        date: "12.09.2019 - 12:53 PM",
        price: 423,
        amount: "$24,295",
        status: "Delivered",
      },
      // Additional deals would be added here
    ],
  };
  return (
    <div>
      <div className="dashboard-content">
        <h1 className="page-title">Dashboard</h1>

        <div className="stat-cards">
          <div className="stat-card">
            <div className="stat-info">
              <div className="stat-label">Total User</div>
              <div className="stat-value">{dashboardData.totalUser}</div>
            </div>
            <div className="stat-icon user-icon"></div>
          </div>

          <div className="stat-card">
            <div className="stat-info">
              <div className="stat-label">Total Order</div>
              <div className="stat-value">{dashboardData.totalOrder}</div>
            </div>
            <div className="stat-icon order-icon"></div>
          </div>

          <div className="stat-card">
            <div className="stat-info">
              <div className="stat-label">Total Bookings</div>
              <div className="stat-value">{dashboardData.totalSales}</div>
            </div>
            <div className="stat-icon sales-icon"></div>
          </div>

          <div className="stat-card">
            <div className="stat-info">
              <div className="stat-label">Total Pending</div>
              <div className="stat-value">{dashboardData.totalPending}</div>
            </div>
            <div className="stat-icon pending-icon"></div>
          </div>
        </div>

        <div className="revenue-section">
          <div className="section-header">
            <h2>Revenue</h2>
            <div className="dropdown">
              <button className="dropdown-toggle">{selectedMonth}</button>
            </div>
          </div>

          <div className="revenue-chart">
            {/* This would be replaced with an actual chart component like Chart.js or Recharts */}
            <div className="chart-placeholder">
              <div className="area-chart"></div>
              <div className="chart-legend">
                <div className="legend-item">
                  <span className="legend-color sales"></span>
                  <span>Sales</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color profit"></span>
                  <span>Profit</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="deals-section">
          <div className="section-header">
            <h2>Deals Details</h2>
            <div className="dropdown">
              <button className="dropdown-toggle">{selectedMonth}</button>
            </div>
          </div>

          <div className="deals-table">
            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Location</th>
                  <th>Date - Time</th>
                  <th>Price</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.deals.map((deal) => (
                  <tr key={deal.id}>
                    <td>
                      <div className="product-cell">
                        <div className="product-image"></div>
                        <div>{deal.product}</div>
                      </div>
                    </td>
                    <td>{deal.location}</td>
                    <td>{deal.date}</td>
                    <td>{deal.price}</td>
                    <td>{deal.amount}</td>
                    <td>
                      <span
                        className={`status-badge ${deal.status.toLowerCase()}`}
                      >
                        {deal.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
