import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import './report.scss';
import Sidebar from '../../../components/Sidebar/sidebar';

const Report = () => {
  // States for different report types
  const [revenueData, setRevenueData] = useState({
    totalRevenue: 0,
    revenueByDay: []
  });
  
  const [bookingsData, setBookingsData] = useState({
    totalBookings: 0,
    bookingsByDay: []
  });
  
  const [driverStatusData, setDriverStatusData] = useState({
    withDriver: 0,
    withoutDriver: 0
  });
  
  const [topCars, setTopCars] = useState([]);
  const [topClients, setTopClients] = useState([]);
  
  // Filter states
  const [timeframe, setTimeframe] = useState('monthly');
  const [month, setMonth] = useState(new Date().getMonth() + 1); // Current month (1-12)
  const [year, setYear] = useState(new Date().getFullYear());
  
  // Loading states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28BFF'];

  // Fetch data when filters change
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Prepare the query parameters
        let params = { timeframe };
        if (timeframe === 'monthly' && month && year) {
          params.month = month;
          params.year = year;
        }
        
        // Fetch revenue data
        const revenueResponse = await axios.get('http://localhost:5000/api/v1/reports/revenue', { params });
        setRevenueData(revenueResponse.data.data);
        
        // Fetch bookings data
        const bookingsResponse = await axios.get('http://localhost:5000/api/v1/reports/bookings', { params });
        setBookingsData(bookingsResponse.data.data);
        
        // Fetch driver status data
        const driverStatusResponse = await axios.get('http://localhost:5000/api/v1/reports/driver-status', { params });
        setDriverStatusData(driverStatusResponse.data.data);
        
        // Fetch top cars
        const topCarsResponse = await axios.get('http://localhost:5000/api/v1/reports/top-cars', { params: { limit: 3 } });
        setTopCars(topCarsResponse.data.data);
        
        // Fetch top clients
        const topClientsResponse = await axios.get('http://localhost:5000/api/v1/reports/top-clients', { params: { limit: 3 } });
        setTopClients(topClientsResponse.data.data);
        
        setLoading(false);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching report data');
        setLoading(false);
      }
    };
    
    fetchData();
  }, [timeframe, month, year]);

  // Format revenue data for charts
  const formatRevenueChartData = () => {
    return revenueData.revenueByDay?.map(item => ({
      date: item._id,
      revenue: item.revenue
    })) || [];
  };

  // Format bookings data for charts
  const formatBookingsChartData = () => {
    return bookingsData.bookingsByDay?.map(item => ({
      date: item._id,
      bookings: item.count
    })) || [];
  };

  // Format driver status data for pie chart
  const formatDriverStatusData = () => {
    return [
      { name: 'With Driver', value: driverStatusData.withDriver || 0 },
      { name: 'Without Driver', value: driverStatusData.withoutDriver || 0 }
    ];
  };

  // Month names for dropdown
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Generate year options (current year and 5 years back)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 6 }, (_, i) => currentYear - i);

  return (
    <div className="report-page">
      <div className="page-layout">
        <div className="sidebar-container">
          <Sidebar/>
        </div>
        
        <div className="main-content">
          <div className="report-header">
            <h1>Reports</h1>
            
            <div className="filters">
              <div className="filter-group">
                <label>Timeframe:</label>
                <select 
                  value={timeframe} 
                  onChange={(e) => setTimeframe(e.target.value)}
                  className="filter-select"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              
              {timeframe === 'monthly' && (
                <>
                  <div className="filter-group">
                    <label>Month:</label>
                    <select 
                      value={month} 
                      onChange={(e) => setMonth(parseInt(e.target.value))}
                      className="filter-select"
                    >
                      {months.map((name, index) => (
                        <option key={index} value={index + 1}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="filter-group">
                    <label>Year:</label>
                    <select 
                      value={year} 
                      onChange={(e) => setYear(parseInt(e.target.value))}
                      className="filter-select"
                    >
                      {yearOptions.map(year => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}
            </div>
          </div>
          
          {loading ? (
            <div className="loading">Loading report data...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <div className="report-content">
              {/* Revenue Section */}
              <div className="report-card">
                <h2>Revenue</h2>
                <div className="card-content">
                  <div className="stat-box">
                    <span className="stat-value">
                      ${revenueData.totalRevenue?.toLocaleString() || 0}
                    </span>
                    <span className="stat-label">Total Revenue</span>
                  </div>
                  
                  <div className="chart-container">
                    <h3>Revenue Trend</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart
                        data={formatRevenueChartData()}
                        margin={{ top: 5, right: 30, left: 20, bottom: 50 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="date" 
                          angle={-45} 
                          textAnchor="end" 
                          height={70} 
                          tick={{fontSize: 12}}
                        />
                        <YAxis />
                        <Tooltip formatter={(value) => ['$' + value.toLocaleString(), 'Revenue']} />
                        <Legend />
                        <Bar dataKey="revenue" fill="#0088FE" name="Revenue" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              {/* Bookings Section */}
              <div className="report-card">
                <h2>Bookings</h2>
                <div className="card-content">
                  <div className="stat-box">
                    <span className="stat-value">
                      {bookingsData.totalBookings?.toLocaleString() || 0}
                    </span>
                    <span className="stat-label">Total Bookings</span>
                  </div>
                  
                  <div className="chart-container">
                    <h3>Bookings Trend</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart
                        data={formatBookingsChartData()}
                        margin={{ top: 5, right: 30, left: 20, bottom: 50 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="date" 
                          angle={-45} 
                          textAnchor="end" 
                          height={70} 
                          tick={{fontSize: 12}}
                        />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="bookings" fill="#00C49F" name="Bookings" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              {/* Driver Status Section */}
              <div className="report-card">
                <h2>Bookings by Driver Status</h2>
                <div className="card-content">
                  <div className="stat-boxes">
                    <div className="stat-box">
                      <span className="stat-value">
                        {driverStatusData.withDriver?.toLocaleString() || 0}
                      </span>
                      <span className="stat-label">With Driver</span>
                    </div>
                    <div className="stat-box">
                      <span className="stat-value">
                        {driverStatusData.withoutDriver?.toLocaleString() || 0}
                      </span>
                      <span className="stat-label">Without Driver</span>
                    </div>
                  </div>
                  
                  <div className="chart-container pie-chart">
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={formatDriverStatusData()}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {formatDriverStatusData().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [value, 'Bookings']} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Top Cars Section */}
              <div className="report-card">
                <h2>Top 3 Most Rented Cars of all time</h2>
                <div className="card-content">
                  <div className="top-items-container">
                    {topCars.length > 0 ? (
                      topCars.map((item, index) => (
                        <div key={index} className="top-item">
                          <div className="rank">{index + 1}</div>
                          <div className="item-details">
                            <h4>{item.car?.brand} {item.car?.model}</h4>
                            <p>
                              <strong>Registration:</strong> {item.car?.plate}
                            </p>
                            <p>
                              <strong>Total Bookings:</strong> {item.bookingCount}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No car rental data available</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Top Clients Section */}
              <div className="report-card">
                <h2>Top Clients</h2>
                <div className="card-content">
                  <div className="top-items-container">
                    {topClients.length > 0 ? (
                      topClients.map((item, index) => (
                        <div key={index} className="top-item">
                          <div className="rank">{index + 1}</div>
                          <div className="item-details">
                            <h4>{item.client?.name}</h4>
                            <p>
                              <strong>Email:</strong> {item.client?.email}
                            </p>
                            <p>
                              <strong>Phone:</strong> {item.client?.phone}
                            </p>
                            <p>
                              <strong>Total Bookings:</strong> {item.bookingCount}
                            </p>
                            <p>
                              <strong>Total Spent:</strong> ${item.totalSpent?.toLocaleString() || 0}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No client data available</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Report;